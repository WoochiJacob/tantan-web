import React, { useState, useEffect, useCallback } from 'react';

import {
    Axios, TossPaymentsApi, getSignResult, CaverOption,
} from '@utils/api';
import styled from '@emotion/styled/macro';
import { getContractABI, getSupplyContractABI } from '@utils/help';
import qs from 'qs';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { colors, fonts } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { useRecoilValue, useRecoilState } from 'recoil';
import Decimal from 'decimal.js';
import { rgba } from 'emotion-rgba';
import { IAssetsDetail, IMintState } from '@interface/assets';
import { Store } from 'react-notifications-component';
import { prepare } from 'klip-sdk';
import {
    useChain,
} from '@utils/interact';

// recoil
import { UserAddress, Chain, KlipKey } from '@recoil/auth';

// Components
import Input from '@components/common/ui/Input';
import CreateCheckBox from '@components/common/ui/CreateCheckBox';
import OrderModalContainer from '@components/detail/modals/OrderModalContainer';
import Select from '@components/common/ui/Select';

const Caver = require('caver-js');

type OrderData = {
    notice: boolean;
    policy: boolean;
    shipping_addr: string;
    shipping_addr2: string;
    zip_code: string;
    option1: string;
    option2: string;
}

interface ITossOrder {
    assets: IAssetsDetail;
    quantity: number;
    isFirst: boolean;
    gb: string;
}

function TossPaymentsComplete() {
    const { t } = useTranslation();
    const [orderInfo, setOrderInfo] = useState<ITossOrder | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [isPostModal, setPostModal] = useState<boolean>(false);
    const [requsetKey, setRequestKey] = useRecoilState<string>(KlipKey);
    const [showOriginImage, setShowOriginImage] = useState<boolean>(false);
    const [isFormSave, setFormSave] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const caver = new Caver(new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', CaverOption));
    const [mintLoading, setMintLoading] = useState<IMintState>({
        addAssets: false,
        minting: false,
        addMarket: false,
    });
    const userAddress = useRecoilValue(UserAddress);
    const chainId = useRecoilValue(Chain);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const amount = searchParams.get('amount');
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');

    const {
        register, setValue, getValues, watch, formState: { isValid, errors },
    } = useForm<OrderData>({
        mode: 'onChange',
    });

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    const handlePost = (e) => {
        e.preventDefault();

        setPostModal(true);
    };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setValue('shipping_addr', fullAddress, { shouldValidate: true });
        setValue('zip_code', data.zonecode, { shouldValidate: true });

        setPostModal(false);
    };

    const handleLink = (type: string) => {
        const link = type === 'notice'
            ? 'https://conuts.zendesk.com/hc/ko/articles/18114045177241-%EB%94%94%EB%84%A4%EC%83%81%EC%8A%A4-%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8'
            : 'https://conuts.zendesk.com/hc/ko/articles/18114012410393-%EB%94%94%EB%84%A4%EC%83%81%EC%8A%A4-%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80';

        window.open(link);
    };

    const OrderRequest = async () => {
        setIsDisabled(true);
        if (!orderInfo) {
            setIsDisabled(false);
            return;
        }
        const totalPrice = orderInfo.assets.price ? new Decimal(orderInfo.assets.price).mul(orderInfo.quantity).toString() : 0;
        if (Number(totalPrice) !== Number(amount)) {
            Store.addNotification({
                ...notiOption,
                title: '오류',
                message: '최종 가격이 맞지 않습니다.',
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            setIsDisabled(false);
            return;
        }

        // 로그인 토큰 가져오기
        const token = `Bearer ${localStorage.getItem('token')}` || '';

        // 로그인 토큰 정보가 없으면 로그인 화면으로
        if (!localStorage.getItem('token')) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.notiTitle'),
                message: t('Notification.loginNoti'),
                type: 'default',
                container: 'top-left',
                insert: 'top',
            });
            window.location.assign(`/login?location=${window.location.pathname}`);
            setIsDisabled(false);
            return;
        }
        try {
            const reseponse = await prepare.signMessage({
                bappName: 'TanTan',
                value: 'Tosspayments Order',
            });

            if (reseponse.request_key && reseponse.request_key !== '') {
                setRequestKey(reseponse.request_key);

                const timerId = setInterval(async () => {
                    try {
                        const { data } = await getSignResult(reseponse.request_key);

                        if (data.result) {
                            setRequestKey('');
                            clearInterval(timerId);

                            const formData = new FormData();
                            const txId = await sendTransaction(orderInfo.assets);

                            await setFormSave(Boolean(true));

                            // 상태에 맞는 모달 세팅
                            setMintLoading({
                                addAssets: true,
                                minting: false,
                                addMarket: false,
                            });

                            formData.append('wallet_address', userAddress.address);
                            formData.append('blockchain', 'klaytn');
                            formData.append('message', 'Order Items');
                            formData.append('token_id', orderInfo.assets.token_id);
                            formData.append('contract_address', orderInfo.assets.contract_address);
                            formData.append('owner_address', orderInfo.assets.owner_address);
                            formData.append('shipping_addr', getValues('shipping_addr'));
                            formData.append('shipping_addr2', getValues('shipping_addr2'));
                            formData.append('option1', getValues('option1'));
                            formData.append('option2', getValues('option2'));
                            formData.append('zip_code', getValues('zip_code'));
                            formData.append('quantity', orderInfo.quantity.toString());
                            formData.append('market_id', orderInfo.assets.market_id.toString());
                            formData.append('tx_id', txId);
                            formData.append('toss_ordernum', orderId || '');

                            const tossPaymentsData = {
                                paymentKey,
                                amount: Number(amount),
                                orderId,
                            };

                            try {
                                const { data: tossPay } = await TossPaymentsApi(tossPaymentsData);

                                if (tossPay.status === 'DONE') {
                                    try {
                                        const { success } = await Axios('buyitem', formData, token);

                                        setMintLoading({
                                            addAssets: true,
                                            minting: true,
                                            addMarket: true,
                                        });

                                        if (success) {
                                            const params = qs.stringify({
                                                ...orderInfo,
                                                shipping_addr: getValues('shipping_addr'),
                                                shipping_addr2: getValues('shipping_addr2'),
                                                zip_code: getValues('zip_code'),
                                            });

                                            localStorage.setItem('orderComplete', params);

                                            setTimeout(() => {
                                                navigate('/order-complete');
                                            }, 2000);
                                        }
                                    } catch (error) {
                                        setFormSave(false);
                                        Store.addNotification({
                                            ...notiOption,
                                            title: t('Notification.notiTitle'),
                                            message: t('Notification.cancelOrder'),
                                            type: 'danger',
                                            container: 'top-left',
                                            insert: 'top',
                                        });
                                    }
                                }
                            } catch (error) {
                                setIsDisabled(false);
                                setFormSave(false);
                                Store.addNotification({
                                    ...notiOption,
                                    title: '토스',
                                    message: '오류가 발생하였습니다. 다시 시도해주세요.',
                                    type: 'danger',
                                    container: 'top-left',
                                    insert: 'top',
                                });
                            }
                        }
                    } catch (error) {
                        Store.addNotification({
                            ...notiOption,
                            title: t('Notification.errorTitle'),
                            message: t('Notification.cancelSign'),
                            type: 'danger',
                            container: 'top-left',
                            insert: 'top',
                        });
                        setIsDisabled(false);
                        setRequestKey('');
                        clearInterval(timerId);
                    }
                }, 1000);
            }
        } catch (error) {
            setIsDisabled(false);
            setFormSave(false);
            setRequestKey('');
            Store.addNotification({
                ...notiOption,
                title: '오류',
                message: '오류가 발생하였습니다. 다시 시도해주세요.',
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
        }
    };

    const sendTransaction = async (assets: IAssetsDetail) => {
        let txId;

        if (!orderInfo) {
            return '';
        }

        if (orderInfo.quantity > 1) {
            txId = await sendMultiTransaction(assets);
            return txId;
        }

        txId = await sendSingleTransaction(assets);
        return txId;
    };

    const sendSingleTransaction = async (assets: IAssetsDetail) => {
        if (!orderInfo) {
            return '';
        }

        const senderPrivateKey = process.env.REACT_APP_FEE_PRIVATE_KEY;
        const keyring = caver.wallet.keyring.createFromPrivateKey(senderPrivateKey);
        caver.wallet.add(keyring);
        caver.klay.accounts.wallet.add(
            caver.klay.accounts.createWithAccountKey(keyring.address, keyring.key.privateKey),
        );
        const myContract = new caver.klay.Contract(getSupplyContractABI(assets.supply).abi, process.env.REACT_APP_KLAYTN_SINGLE_CONTRACT_ADDRESS);

        try {
            const tx = await myContract.methods.setKrwOrder(
                assets.uuid_market,
                assets.token_id,
                assets.metadata_url,
                ((assets.market_quantity - orderInfo.quantity) <= 0) || assets.owner_is_end_count <= 0,
                userAddress.address,
            ).send({
                from: keyring.address,
                gas: 600000000,
            });

            return tx.transactionHash;
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    const sendMultiTransaction = async (assets: IAssetsDetail) => {
        if (!orderInfo) {
            return '';
        }
        const senderPrivateKey = process.env.REACT_APP_FEE_PRIVATE_KEY;
        const keyring = caver.wallet.keyring.createFromPrivateKey(senderPrivateKey);
        caver.wallet.add(keyring);
        caver.klay.accounts.wallet.add(
            caver.klay.accounts.createWithAccountKey(keyring.address, keyring.key.privateKey),
        );
        const myContract = new caver.klay.Contract(getContractABI(useChain[chainId]).abi, process.env.REACT_APP_KLAYTN_CONTRACT_ADDRESS);

        const tx = await myContract.methods.setKRWOrderRestore(
            assets.uuid_market,
            assets.token_id,
            assets.metadata_url,
            orderInfo.quantity,
            ((assets.market_quantity - orderInfo.quantity) <= 0) || assets.owner_is_end_count <= 0,
            userAddress.address,
        ).send({
            from: keyring.address,
            gas: 600000000,
        });

        return tx.transactionHash;
    };

    const totalPrice = useCallback((price: number, quantity: number): string => {
        const calcPrice = new Decimal(price).mul(quantity).toString();

        if (!calcPrice) return '0';

        return Number(calcPrice).toLocaleString();
    }, []);

    // NFT 정보 불러오기
    const getAssets = async (setOrder: any) => {
        // api 호출을 위한 정보 가져오기
        const getLocalStorage = localStorage.getItem('loginState');
        try {
            const { data } = await Axios(`assetdetail/${setOrder.assetId}`, getLocalStorage);
            const getData: IAssetsDetail[] | null = Object.values(data.assetList_data) || null;

            // NFT 상세 정보 저장
            if (getData) {
                const nftDetail = getData.filter((_market, index) => index === (getData.length - 1));

                setOrderInfo({
                    assets: nftDetail[0],
                    quantity: Number(setOrder.quantity),
                    isFirst: setOrder.isFirst === 'true',
                    gb: setOrder.gb,
                });

                setLoading(false);
            }
        } catch (error) {
            // 오류 메시지
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundList'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
        }
    };

    // 모달이 뜰때 브라우저 스크롤 숨기기
    useEffect(() => {
        if (isPostModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isPostModal]);

    useEffect(() => {
        const getLocalStorage = localStorage.getItem('tossPaymentsOrderInfo') || '';

        if (getLocalStorage !== '') {
            const setOrder = qs.parse(getLocalStorage, {
                ignoreQueryPrefix: true,
            });

            getAssets(setOrder);
        }
    }, []);

    useEffect(() => {
        if (userAddress) {
            setValue('shipping_addr', userAddress.shipping_addr || '', { shouldValidate: true });
            setValue('shipping_addr2', userAddress.shipping_addr2 || '', { shouldValidate: true });
            setValue('zip_code', userAddress.zip_code || '', { shouldValidate: true });
        }
    }, [userAddress]);

    // 모달이 뜰때 브라우저 스크롤 숨기기
    useEffect(() => {
        if (showOriginImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showOriginImage]);

    useEffect(() => {
        if (requsetKey === '' || !requsetKey) {
            setIsDisabled(false);
        }
    }, [requsetKey]);

    return (
        <>
            {!isLoading && (
                <Container>
                    <OrderHead>
                        <OrderInfoTitle>
                            NFT Order Info
                            {' '}
                            <span>구매 정보 확인</span>
                        </OrderInfoTitle>
                        <PayMentsNotice>
                            결제를 진행해 주세요 10분 후에는 결제요청이 취소됩니다.
                        </PayMentsNotice>
                    </OrderHead>

                    {orderInfo && orderInfo.assets && (
                        <AssetsContainer>
                            <AssetsInformation>
                                {/* 유저 프로필 */}
                                <UserInformation>
                                    <CreatorUser>
                                        <CreatorImages>
                                            <CreatorProfile
                                                src={orderInfo.assets.creator_user_profileImg ? orderInfo.assets.creator_user_profileImg : '/img/common/img_default_profile.png'}
                                            />
                                        </CreatorImages>
                                        <CreatorInfo>
                                            <CreatorTitle isVip={!!(orderInfo.assets.creator_vip_gb === 1)}>{t('AssetsDetail.creator')}</CreatorTitle>
                                            <CreatorName>{orderInfo.assets.creator_user_name}</CreatorName>
                                        </CreatorInfo>
                                    </CreatorUser>
                                </UserInformation>

                                {/* NFT 프리뷰 */}
                                <Preview onClick={() => setShowOriginImage(true)}>
                                    {!orderInfo.assets.asset_animation && (
                                        <ImageWrap>
                                            <ImageBox src={orderInfo.assets.asset_thumbnail} />
                                        </ImageWrap>
                                    )}

                                    {orderInfo.assets.asset_animation && orderInfo.assets.more_info_url && (
                                        <VideoFile
                                            loop
                                            autoPlay
                                            controls
                                            controlsList="nodownload"
                                            poster={orderInfo.assets.more_info_url}
                                        >
                                            <source
                                                src={orderInfo.assets.asset_thumbnail}
                                                type="video/mp4"
                                            />
                                        </VideoFile>
                                    )}
                                </Preview>
                            </AssetsInformation>
                            <AssetsCheckBox>
                                <AssetsCheckTitle>
                                    결제방식
                                    <OrderType>
                                        토스페이먼츠
                                    </OrderType>
                                </AssetsCheckTitle>

                                <FromCheckContents>
                                    <AssetTitle>{orderInfo.assets.asset_name}</AssetTitle>
                                    {orderInfo.assets.market_quantity > 1 && (
                                        <AssetSupply>
                                            전체 상장수량
                                            <span>{Number(orderInfo.assets.market_quantity).toLocaleString()}</span>
                                        </AssetSupply>
                                    )}
                                    <FromCheckDescriptionBox>
                                        <PriceBox>
                                            <PriceTitle>단가</PriceTitle>
                                            <Price>
                                                <PriceUnderLine>
                                                    {Number(orderInfo.assets.price).toLocaleString()}
                                                    <span>{orderInfo.assets.symbol}</span>
                                                </PriceUnderLine>
                                            </Price>
                                        </PriceBox>
                                        <PriceBox>
                                            <PriceTitle>수량</PriceTitle>
                                            <Price>
                                                <PriceUnderLine>
                                                    {orderInfo.quantity.toLocaleString()}
                                                </PriceUnderLine>
                                            </Price>
                                        </PriceBox>
                                    </FromCheckDescriptionBox>
                                    <TotalPriceBox>
                                        <TotalTitle>총 금액</TotalTitle>
                                        <TotalPrice>
                                            {totalPrice(Number(orderInfo.assets.price), orderInfo.quantity)}
                                            <span>{orderInfo.assets.symbol}</span>
                                        </TotalPrice>
                                    </TotalPriceBox>

                                    <ShippingBox>
                                        <ShppingTitle>
                                            <span>(필수)</span>
                                            배송지 정보입력
                                        </ShppingTitle>
                                        <ShppingDescription>
                                            해당 상품은 실물형 상품으로 상품 배송을 위한 배송정보를 반드시
                                            입력하셔야 됩니다.
                                        </ShppingDescription>

                                        {!getValues('shipping_addr') && (
                                            <ShppingButton onClick={handlePost}>
                                                주소검색
                                            </ShppingButton>
                                        )}
                                        {getValues('shipping_addr') && (
                                            <>
                                                <ShippingAddressBox>
                                                    <ShippingAddress>
                                                        <span>
                                                            {getValues('zip_code')}
                                                        </span>
                                                        {getValues('shipping_addr')}
                                                    </ShippingAddress>
                                                    <ShippingAddressEdit onClick={handlePost}>
                                                        주소수정
                                                    </ShippingAddressEdit>
                                                </ShippingAddressBox>

                                                <ShppingDetailTitle>상세주소</ShppingDetailTitle>
                                                <ShippingOrignAddress>
                                                    <Input
                                                        register={register}
                                                        required
                                                        minLength={0}
                                                        maxLength={50}
                                                        valueLength={watch('shipping_addr2') ? watch('shipping_addr2').length : 0}
                                                        getValue={getValues('shipping_addr2')}
                                                        setValue={setValue}
                                                        error={!!errors.shipping_addr2}
                                                        placeholder="상세주소를 입력해주세요."
                                                        errorMessage="상세주소를 입력해주세요."
                                                        label="shipping_addr2"
                                                        type="shipping_address"
                                                        pattern={/$/}
                                                        patternMessage="상세주소를 입력해주세요."
                                                    />
                                                </ShippingOrignAddress>
                                            </>
                                        )}
                                    </ShippingBox>

                                    {orderInfo.gb === '88888888' && (
                                        <>
                                            <ShppingDetailTitle>사이즈</ShppingDetailTitle>
                                            <Select
                                                register={register}
                                                label="option1"
                                                required
                                                getValue={getValues('option1')}
                                                placeholder="사이즈를 선택해주세요"
                                                options={[
                                                    {
                                                        name: 'M',
                                                        value: 'M',
                                                    },
                                                    {
                                                        name: 'L',
                                                        value: 'L',
                                                    },
                                                ]}
                                                error={!!errors.option1}
                                                valueLength={watch('option1') ? watch('option1').length : 0}
                                                errorMessage="사이즈를 선택해주세요"
                                            />

                                            <ShppingDetailTitle>색상</ShppingDetailTitle>
                                            <Select
                                                register={register}
                                                label="option2"
                                                required
                                                getValue={getValues('option2')}
                                                placeholder="색상을 선택해주세요"
                                                options={[
                                                    {
                                                        name: 'Burgundy',
                                                        value: 'Burgundy',
                                                    },
                                                    {
                                                        name: 'Gray',
                                                        value: 'Gray',
                                                    },
                                                    {
                                                        name: 'Navy',
                                                        value: 'Navy',
                                                    },
                                                ]}
                                                error={!!errors.option2}
                                                valueLength={watch('option2') ? watch('option2').length : 0}
                                                errorMessage="색상을 선택해주세요"
                                            />
                                        </>
                                    )}

                                    <SectionTitle>
                                        상품의 특성상 결제 후에는 환불이 불가능합니다.
                                    </SectionTitle>
                                    <CheckedBox>
                                        <CheckBoxName>
                                            {t('AssetsDetail.noticeCheckTitle')}
                                            <CheckRequired>
                                                (
                                                {t('AssetsDetail.checkRequired')}
                                                )
                                                <CheckBoxDetail onClick={() => handleLink('notice')}>
                                                    {t('AssetsDetail.checkDetail')}
                                                </CheckBoxDetail>
                                            </CheckRequired>
                                        </CheckBoxName>
                                        <CreateCheckBox
                                            register={register}
                                            required
                                            label="notice"
                                            value={getValues('notice')}
                                            setValue={setValue}
                                        />
                                    </CheckedBox>
                                    <CheckedBox>
                                        <CheckBoxName>
                                            {t('AssetsDetail.policyCheckTitle')}
                                            <CheckRequired>
                                                (
                                                {t('AssetsDetail.checkRequired')}
                                                )
                                                <CheckBoxDetail onClick={() => handleLink('policy')}>
                                                    {t('AssetsDetail.checkDetail')}
                                                </CheckBoxDetail>
                                            </CheckRequired>
                                        </CheckBoxName>
                                        <CreateCheckBox
                                            register={register}
                                            required
                                            label="policy"
                                            value={getValues('policy')}
                                            setValue={setValue}
                                        />
                                    </CheckedBox>
                                    <ButtonGroup>
                                        <ModifyButton onClick={() => navigate(`/marketplace/${orderInfo.assets.contract_address}/${orderInfo.assets.asset_id}`)}>
                                            {t('CreateModal.cancel')}
                                        </ModifyButton>
                                        <CheckButton
                                            onClick={OrderRequest}
                                            disabled={!isValid || isDisabled || !getValues('shipping_addr')}
                                        >
                                            {t('CreateModal.confirm')}
                                        </CheckButton>
                                    </ButtonGroup>
                                </FromCheckContents>

                            </AssetsCheckBox>
                        </AssetsContainer>
                    )}

                    {/* 구매 버튼 클릭시 나오는 모달 */}
                    {(isFormSave) && (
                        <OrderModalContainer
                            isFormSave={isFormSave}
                            mintLoading={mintLoading}
                        />
                    )}

                    {orderInfo && showOriginImage && (
                        <OriginImageContainer onClick={() => setShowOriginImage(false)}>
                            <OriginImageBox>
                                {!orderInfo.assets.asset_animation && (
                                    <ImageWrap>
                                        <ImageBox src={orderInfo.assets.asset_thumbnail} />
                                    </ImageWrap>
                                )}

                                {orderInfo.assets.asset_animation && orderInfo.assets.more_info_url && (
                                    <VideoFile
                                        loop
                                        autoPlay
                                        controls
                                        controlsList="nodownload"
                                        poster={orderInfo.assets.more_info_url}
                                    >
                                        <source
                                            src={orderInfo.assets.asset_thumbnail}
                                            type="video/mp4"
                                        />
                                    </VideoFile>
                                )}
                            </OriginImageBox>
                        </OriginImageContainer>
                    )}
                </Container>
            )}

            {isPostModal && (
                <PostModal onClick={() => setPostModal(false)}>
                    <ModalContain>
                        <DaumPostcodeEmbed
                            onComplete={handleComplete}
                        />
                    </ModalContain>
                </PostModal>
            )}
        </>
    );
}

const PostModal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: ${rgba(colors.Black200, 0.8)};
    z-index: 9999999;
`;

const ModalContain = styled.div`
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const Container = styled.div`
    width: 1280px;
    padding: 78px 20px 127px 20px;
    margin: 0 auto;
`;

const OrderHead = styled.div`
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.Black100};
`;

const OrderInfoTitle = styled.div`
    font-size: 38px;
    font-family: ${fonts.Tinos};
    color: ${colors.Black100};

    span {
        font-size: 20px;
    }
`;

const AssetsContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const AssetsCheckBox = styled.div`
    padding-top: 44px;
    flex-basis: 440px;
`;

const AssetsInformation = styled.div`
    flex-basis: 580px;
    padding-top: 36px;
`;

const AssetsCheckTitle = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 4px;
    border-bottom: 1px solid ${colors.WarmGray200};
`;

const OrderType = styled.div`
    font-size: 13px;
    color: ${colors.Blue100};
`;

const FromCheckContents = styled.div`
    margin-top: 20px;
`;

const PayMentsNotice = styled.div`
    font-size: 13px;
    color: ${colors.BlueGray700};
`;

const FromCheckDescriptionBox = styled.div`
    width: 100%;
    background-color: ${colors.BlueGray350};
    border-radius: 8px;
    padding: 19px 20px;
    position: relative;
    margin-top: 20px;
`;

const AssetTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
`;

const AssetSupply = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: ${rgba(colors.Black100, 0.6)};

    span {
        margin-left: 4px;
        color: ${colors.Black100};
    }
`;

const PriceBox = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:first-of-type {
        margin: 0;
    }
`;

const PriceTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
`;

const Price = styled.div`
    position: relative;

    &::before {
        width: 106%;
        height: 6px;
        background-color: #F3D65E;
        display: block;
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 2;
    }
`;

const PriceUnderLine = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    position: relative;
    z-index: 3;

    span {
        margin-left: 4px;
    }
`;

const TotalPriceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0 20px;
    background-color: ${colors.White100};
    border: 1px solid ${colors.Black200};
    border-radius: 12px;
    margin-top: 8px;
`;

const TotalTitle = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const TotalPrice = styled.div`
    font-size: 32px;
    color: ${colors.Black100};
    font-weight: 500;

    span {
        font-size: 16px;
        margin-left: 6px;
    }
`;

const SectionTitle = styled.div<{icon?: string}>`
    font-size: 14px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid ${colors.WarmGray200};
    margin-top: 89px;
    margin-bottom: 16px;
`;

const ButtonGroup = styled.div`
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ModifyButton = styled.div`
    flex-basis: 188px;
    
    height: 58px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    

    &:hover {
        background-color: ${colors.BlueGray200};
    }
`;

const CheckButton = styled.button`
    flex-basis: 242px;
    height: 58px;
    border: 1px solid ${colors.Black200};
    background-color: ${colors.Black200};
    color: ${colors.White100};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

    &:disabled {
        background-color: ${colors.BlueGray500};
        cursor: not-allowed;
        border: 0;
    }
`;

const CheckedBox = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14px;
`;

const CheckBoxName = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    display: flex;
    flex-direction: column;
`;

const CheckBoxDetail = styled.span`
    margin-left: 12px;
    font-size: 13px;
    color: ${colors.WarmGray500};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        color: ${colors.Black100};
    }
`;

const CheckRequired = styled.span`
    color: ${colors.Red100};
    font-size: 13px;
`;

const UserInformation = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 21px;
`;

const CreatorUser = styled.div`
    display: flex;
    align-items: flex-start;
    cursor: pointer;
`;

const CreatorImages = styled.div`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${colors.Black200};
`;

const CreatorProfile = styled('img')`
    width: 34px;
    height: 34px;
    object-fit: cover;
`;

const CreatorInfo = styled.div`
    margin-left: 10px;

    span {
        font-family: ${fonts.Tinos};
        font-size: 13px;
        color: ${colors.Black100};
    }
`;

const CreatorName = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
`;

const CreatorTitle = styled.span<{isVip: boolean}>`
    font-family: ${fonts.Tinos};
    font-size: 13px;
    color: ${colors.BlueGray700};
    display: flex;

    &::before {
        width: 14px;
        height: 14px;
        background-image: url('/img/common/ic_user_verify.svg');
        display: block;
        content: '';
        margin-right: 4px;
        display: ${(props) => (props.isVip ? 'block' : 'none')};
    }
`;

const Preview = styled.div`
    background-color: ${colors.White100};
    border: 1px solid ${colors.BlueGray500};
    border-radius: 12px;
    padding: 10px;
    cursor: pointer;
`;

const ImageWrap = styled.div`
    width: 100%;
    min-height: 560px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ImageBox = styled('img')`
    width: 100%;
`;

const VideoFile = styled.video`
    width: 100%;
`;

const OriginImageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: ${rgba(colors.Black200, 0.9)};
    z-index: 10001;
    overflow-y: auto;
`;

const OriginImageBox = styled.div`
    width: 800px;
    height: 100%;
    margin: 100px 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
`;

const ShippingBox = styled.div`
    margin-top: 64px;
`;

const ShppingTitle = styled.div`
    font-size: 14px;
    font-weight: 500;

    span {
        color: ${colors.Red100};
        margin-right: 4px;
    }
`;

const ShppingDescription = styled.div`
    margin-top: 8px;
    font-size: 14px;
    font-weight: 300;
    padding-bottom: 16px;
    margin-bottom: 16px;
    border-bottom: 1px solid ${colors.WarmGray200};
`;

const ShppingButton = styled.button`
    border: 1px solid ${colors.BlueGray500};
    border-radius: 8px;
    width: 120px;
    height: 50px;
    background-color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    &:hover {
        background-color: ${colors.BlueGray500};
    }
`;

const ShippingAddressBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const ShippingAddress = styled.div`
    flex-basis: calc(100% - 55px);
    font-size: 16px;
    padding-right: 5px;

    span {
        margin-right: 4px;
    }
`;

const ShippingAddressEdit = styled.div`
    flex-basis: 55px;
    font-weight: 300;
    cursor: pointer;
`;

const ShppingDetailTitle = styled.div`
    margin-top: 32px;

    font-size: 14px;
    color: ${colors.Black100};
`;

const ShippingOrignAddress = styled.div`
    margin-top: 5px;
    margin-bottom: 10px;
`;

export default TossPaymentsComplete;
