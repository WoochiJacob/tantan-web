import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { getFee, getSellerPrice, getContractABI } from '@utils/help';
import { conutsquareServiceFee } from '@root/market_address_config';
import { Store } from 'react-notifications-component';
import { Axios, CaverOption, getSignResult } from '@utils/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { IAssetsDetail, IMintState } from '@interface/assets';
import { prepare } from 'klip-sdk';
import { useChain } from '@utils/interact';
import Decimal from 'decimal.js';
import { useTranslation } from 'react-i18next';

// recoil
import { UserAddress, Chain, KlipKey } from '@recoil/auth';

// Components
import OrderModalContainer from '@components/detail/modals/OrderModalContainer';
import AssetsTitlePanel from '@components/detail/modules/AssetsTitlePanel';
import AssetsRoyaltyPanel from '@components/detail/modules/AssetsRoyaltyPanel';
import AssetsOrderPanel from '@components/detail/modules/AssetsOrderPanel';

const Caver = require('caver-js');

interface AssetsDetail {
    nftAssets: IAssetsDetail;
    isFirst: boolean;
    handleMarketCancel: (nft: IAssetsDetail) => void;
}

function SingleAssets({ nftAssets, isFirst, handleMarketCancel }: AssetsDetail) {
    const { t } = useTranslation();
    const [isRoyalty, setRoyalty] = useState<boolean>(false);
    const [isFormCheck, setFormCheck] = useState<boolean>(false);
    const [, setRequestKey] = useRecoilState<string>(KlipKey);
    const caver = new Caver(
        new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', CaverOption)
    );
    const [isFormSave, setFormSave] = useState<boolean>(false);
    const [mintLoading, setMintLoading] = useState<IMintState>({
        addAssets: false,
        minting: false,
        addMarket: false,
    });

    const userAddress = useRecoilValue(UserAddress);
    const chainId = useRecoilValue(Chain);
    const navigate = useNavigate();

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    // 체크 모달에서 체크 했는지 확인하는 함수
    const formCheckCallback = async (action: string) => {
        await setFormCheck(Boolean(false));

        if (action === 'complete') {
            await setFormSave(Boolean(true));
            setOrder(nftAssets);
        }
    };

    // 구매 함수
    const setOrder = async (nft: IAssetsDetail) => {
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
            return;
        }

        // 크리에이터 수수료 계산
        const getRolyalty = nft.royalty / 100;

        // 총 가격
        const totalPrice = new Decimal(nft.price).mul(nftAssets.market_quantity).toString();

        // 크리에이터 수수료 계산
        const calcCreateFee = getFee(Number(totalPrice), Number(getRolyalty));

        // 회사 수수료 계산
        const calcServiceFee = getFee(Number(totalPrice), Number(conutsquareServiceFee));

        // 구매가격
        const price = caver.utils.convertToPeb(totalPrice, 'KLAY');

        // 크리에이터 수수료
        const createFee = caver.utils.convertToPeb(calcCreateFee.toString(), 'KLAY');

        // 회사 수수료
        const serviceFee = caver.utils.convertToPeb(calcServiceFee.toString(), 'KLAY');

        // 판매가자 가져가는 돈 [구매가격 - (크리에니이터수수료 + 회사수수료)]
        const sellerPrice = caver.utils.convertToPeb(
            getSellerPrice(Number(totalPrice), Number(calcCreateFee), Number(calcServiceFee)),
            'KLAY'
        );

        const getAbi = getContractABI(useChain[chainId]).abi.find((abi) => abi.name === 'setOrder');
        const catractPrams = [
            nft.uuid_market,
            nft.token_id,
            nftAssets.market_quantity, // 구매 수량
            createFee,
            serviceFee,
            sellerPrice,
            nft.metadata_url,
            true,
        ];

        const parsePrams = JSON.stringify(catractPrams);
        const parseAbi = JSON.stringify(getAbi);

        try {
            const reseponse = await prepare.executeContract({
                bappName: 'TanTan',
                abi: parseAbi,
                params: parsePrams,
                to: process.env.REACT_APP_KLAYTN_CONTRACT_ADDRESS,
                from: userAddress.address,
                value: price,
            });

            if (reseponse.request_key && reseponse.request_key !== '') {
                setRequestKey(reseponse.request_key);

                const timerId = setInterval(async () => {
                    try {
                        const { data } = await getSignResult(reseponse.request_key);

                        if (data.result) {
                            await setFormSave(Boolean(true));

                            // 상태에 맞는 모달 세팅
                            setMintLoading({
                                addAssets: true,
                                minting: false,
                                addMarket: false,
                            });

                            const formData = new FormData();
                            const txId = data.result.tx_hash;
                            formData.append('wallet_address', userAddress.address);
                            formData.append('blockchain', 'klaytn');
                            formData.append('message', 'Order Items');
                            formData.append('token_id', nftAssets.token_id);
                            formData.append('contract_address', nftAssets.contract_address);
                            formData.append('owner_address', nftAssets.owner_address);
                            formData.append('quantity', nftAssets.market_quantity.toString());
                            formData.append('market_id', nftAssets.market_id.toString());
                            formData.append('tx_id', txId.toString());
                            formData.append('toss_ordernum', '');

                            setRequestKey('');
                            clearInterval(timerId);

                            try {
                                const { success } = await Axios('buyitem', formData, token);

                                setMintLoading({
                                    addAssets: true,
                                    minting: true,
                                    addMarket: true,
                                });

                                if (success) {
                                    setTimeout(() => {
                                        navigate(`/mypage/${userAddress.address}?tab=owner`);
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
                        Store.addNotification({
                            ...notiOption,
                            title: t('Notification.errorTitle'),
                            message: t('Notification.cancelSign'),
                            type: 'danger',
                            container: 'top-left',
                            insert: 'top',
                        });
                        setRequestKey('');
                        clearInterval(timerId);
                    }
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <StickyBox>
                <SingleContainer>
                    {/* 판매기간 / 제목 / 가격 */}
                    <AssetsTitlePanel nftAssets={nftAssets} />

                    {/* 상황별 구매버튼 */}
                    <AssetsOrderPanel
                        assetId={nftAssets.asset_id}
                        isFirst={isFirst}
                        nftAssets={nftAssets}
                        setFormCheck={setFormCheck}
                        handleMarketCancel={handleMarketCancel}
                        quantity={nftAssets.market_quantity}
                    />

                    {/* 외부링크 / 크리에이터 수수료 */}
                    <AssetsRoyaltyPanel nftAssets={nftAssets} />
                </SingleContainer>
            </StickyBox>

            {/* 구매 버튼 클릭시 나오는 모달 */}
            {(isRoyalty || isFormCheck || isFormSave) && (
                <OrderModalContainer
                    isRoyalty={isRoyalty}
                    isFormCheck={isFormCheck}
                    isFormSave={isFormSave}
                    setRoyalty={setRoyalty}
                    formCheckCallback={formCheckCallback}
                    submitData={nftAssets}
                    mintLoading={mintLoading}
                    quantity={nftAssets.market_quantity}
                />
            )}
        </>
    );
}

const StickyBox = styled.div`
    flex-basis: 396px;
    margin-top: 45px;
    position: relative;
`;

const SingleContainer = styled.div`
    position: sticky;
    left: 0;
    top: 112px;
    z-index: 999;
    padding-left: 32px;
`;

export default SingleAssets;
