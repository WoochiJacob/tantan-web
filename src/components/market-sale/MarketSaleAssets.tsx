import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors, fonts } from '@styles/ui_palette';
import { useForm } from 'react-hook-form';
import { Store } from 'react-notifications-component';
import { Axios, getSignResult, CaverOption } from '@utils/api';
import { useRecoilValue, useRecoilState } from 'recoil';
import { IAssetsDetail } from '@interface/assets';
import { useChain } from '@utils/interact';

import { prepare } from 'klip-sdk';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

// recoil
import { UserAddress, Chain, KlipKey } from '@recoil/auth';

// Components
import CreateModalContainer from '@components/create/CreateModalContainer';
import MarketSaleAssetsForm from '@components/market-sale/MarketSaleAssetsForm';
import { encrypt, recover, getContractABI, getSupplyContractABI } from '@utils/help';

const Caver = require('caver-js');

interface AssetsDetail {
    nftAssets: IAssetsDetail;
}

interface IListData {
    marketId: number;
    tokenId: number;
    quantity: number;
    tokenUri: string;
    seller: string;
}

type CreateData = {
    category: string;
    name: string;
    file: string;
    more_info_file: string | null;
    symbol: string;
    description: string;
    external_link: string;
    royalty_fee: string;
    price: string;
    expiration_date: string | number;

    // Default Data
    type: number;
    supply: string;
    network_id: string;
    asset_blockchain: number;
    nft_type: number;
    quantity: string;
};

function MarketSaleAssets({ nftAssets }: AssetsDetail) {
    const { t } = useTranslation();
    const chainId = useRecoilValue(Chain);
    const [, setRequestKey] = useRecoilState<string>(KlipKey);
    const caver = new Caver(
        new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', CaverOption)
    );

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors, isValid },
    } = useForm<CreateData>({
        mode: 'onChange',
        defaultValues: {
            asset_blockchain: Number(useChain[chainId].chainId) || 0,
            category: nftAssets.category,
            description: nftAssets.asset_description,
            external_link: nftAssets.external_link,
            file: nftAssets.asset_thumbnail
                ? nftAssets.asset_thumbnail
                : nftAssets.asset_animation || '',
            more_info_file: nftAssets.more_info_url || null,
            name: nftAssets.asset_name,
            network_id: useChain[chainId].networkName,
            quantity: nftAssets.asset_quantity.toLocaleString(),
            royalty_fee: nftAssets.royalty.toString(),
            supply: nftAssets.supply.toLocaleString(),
            symbol: nftAssets.symbol,
            type: useChain[chainId].name === 'Polygon' ? 1 : 0,
            nft_type: 1,
            expiration_date: 30,
        },
    });

    const [isMarketFormCheck, setFormCheck] = useState<boolean>(false);
    const [isFormSave, setFormSave] = useState<boolean>(false);
    const [mintLoading, setMintLoading] = useState({
        addAssets: false,
        minting: false,
        addMarket: false,
    });
    const [submitData, setSubmitData] = useState<CreateData | null>(null);
    const userAddress = useRecoilValue(UserAddress);
    const navigate = useNavigate();

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    const onSubmit = async (createData: any) => {
        if ((chainId && !useChain[chainId]) || useChain[chainId].symbol !== createData.symbol) {
            const changeChain = Object.values(useChain).find(
                (chain) => chain.symbol === createData.symbol
            );

            if (changeChain) {
                return;
            }
        }

        const createFormData = {
            ...createData,
            supply: Number(createData.supply.replace(',', '')),
            quantity: Number(createData.quantity.replace(',', '')),
        };

        await setSubmitData(createFormData);
        setFormCheck(true);
    };

    const formCheckCallback = async (action: string) => {
        await setFormCheck(false);

        if (action === 'complete') {
            if (!submitData) return;

            const dateNow = moment();

            const listData = {
                contract_address: nftAssets.contract_address,
                token_id: nftAssets.token_id,
                price: submitData.price,
                price_reserve: submitData.price,
                supply: nftAssets.supply,
                quantity: submitData.quantity,
                category: nftAssets.category,
                start_at: dateNow.format(),
                expiration_date: Number(submitData.expiration_date),
                token_type: nftAssets.symbol === 'KRW' ? 'krw' : 'klay',
                creator_address: nftAssets.creator_address,
                is_display: 1,
                type_trade: 0,
                is_end: 0,
            };

            onListing(listData);
        }
    };

    const onListing = async (listingData: any) => {
        const token = `Bearer ${localStorage.getItem('token')}` || '';

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

        setMintLoading({
            addAssets: true,
            minting: false,
            addMarket: false,
        });

        const reseponse = await prepare.signMessage({
            bappName: 'TanTan',
            value: 'Product Listing',
        });

        if (reseponse.request_key && reseponse.request_key !== '') {
            setRequestKey(reseponse.request_key);
            const timerId = setInterval(async () => {
                try {
                    const { data: signData } = await getSignResult(reseponse.request_key);

                    if (signData.result) {
                        setFormSave(true);

                        const { signature } = signData.result;
                        const getRecover = await recover(
                            'Product Listing',
                            signature,
                            userAddress.address
                        );
                        const recoverPrams = encrypt(
                            getRecover,
                            process.env.REACT_APP_SIGNATURE_KEY
                        );
                        const formData = new FormData();

                        formData.append('wallet_address', userAddress.address);
                        formData.append('blockchain', 'klaytn');
                        formData.append('signature', signature);
                        formData.append('signature_param', recoverPrams);
                        formData.append('message', 'Product Listing');
                        formData.append('order_signature', signature);
                        formData.append('order_recipt', 'Product Listing');

                        Object.keys(listingData).forEach((key: string) => {
                            formData.append(key, listingData[key]);
                        });

                        setRequestKey('');
                        clearInterval(timerId);

                        try {
                            setMintLoading({
                                addAssets: true,
                                minting: true,
                                addMarket: false,
                            });

                            const { success, data } = await Axios(
                                'market-enrollment',
                                formData,
                                token
                            );

                            if (success) {
                                const ListData = {
                                    marketId: data.market.uuid_market,
                                    tokenId: data.market.token_id,
                                    quantity: data.market.quantity,
                                    tokenUri: data.asset.uri_metadata,
                                    seller: data.wallet_address,
                                };
                                sendTransaction(ListData);
                                setMintLoading({
                                    addAssets: true,
                                    minting: true,
                                    addMarket: true,
                                });

                                setTimeout(() => {
                                    navigate(`/mypage/${userAddress.address}`);
                                }, 3000);
                            }
                        } catch (error: any) {
                            setFormSave(false);
                            setRequestKey('');
                            clearInterval(timerId);
                            if (error.response.data) {
                                Store.addNotification({
                                    ...notiOption,
                                    title: t('Notification.errorTitle'),
                                    message: error.response.data.message,
                                    type: 'danger',
                                    container: 'top-left',
                                    insert: 'top',
                                });
                            }
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
    };

    const sendTransaction = async (marekt: IListData) => {
        let txId;

        if (nftAssets.asset_quantity > 1) {
            txId = await sendMultyTransaction(marekt);

            return txId;
        }

        txId = await sendSingleTransaction(marekt);

        return txId.transactionHash;
    };

    const sendSingleTransaction = async (marekt: IListData) => {
        const senderPrivateKey = process.env.REACT_APP_FEE_PRIVATE_KEY;
        const keyring = caver.wallet.keyring.createFromPrivateKey(senderPrivateKey);
        caver.wallet.add(keyring);
        caver.klay.accounts.wallet.add(
            caver.klay.accounts.createWithAccountKey(keyring.address, keyring.key.privateKey)
        );

        const myContract = new caver.klay.Contract(
            getSupplyContractABI(nftAssets.asset_quantity).abi,
            process.env.REACT_APP_KLAYTN_SINGLE_CONTRACT_ADDRESS
        );

        const tx = await myContract.methods
            .setListing(marekt.marketId, marekt.tokenId, marekt.tokenUri, marekt.seller)
            .send({
                from: keyring.address,
                gas: 6000000,
            });

        return tx.transactionHash;
    };

    const sendMultyTransaction = async (marekt: IListData) => {
        const senderPrivateKey = process.env.REACT_APP_FEE_PRIVATE_KEY;
        const keyring = caver.wallet.keyring.createFromPrivateKey(senderPrivateKey);
        caver.wallet.add(keyring);
        caver.klay.accounts.wallet.add(
            caver.klay.accounts.createWithAccountKey(keyring.address, keyring.key.privateKey)
        );

        const myContract = new caver.klay.Contract(
            getContractABI(useChain[chainId]).abi,
            process.env.REACT_APP_KLAYTN_CONTRACT_ADDRESS
        );

        const tx = await myContract.methods
            .setListing(
                marekt.marketId,
                marekt.tokenId,
                marekt.quantity,
                marekt.tokenUri,
                marekt.seller
            )
            .send({
                from: keyring.address,
                gas: 6000000,
            });

        return tx.transactionHash;
    };

    return (
        <AssetsDetailContainer>
            <ResellTitleBox>
                <CreateTitle>Product Sale</CreateTitle>
            </ResellTitleBox>
            <Container>
                <NftPreview>
                    <AssetsDetailTitle>
                        <AssetsTitle>{nftAssets.asset_name}</AssetsTitle>
                    </AssetsDetailTitle>
                    <Preview>
                        {!nftAssets.asset_animation && (
                            <ImageWrap>
                                <ImageBox src={nftAssets.asset_thumbnail} />
                            </ImageWrap>
                        )}

                        {nftAssets.asset_animation && nftAssets.more_info_url && (
                            <VideoFile
                                loop
                                autoPlay
                                controls
                                controlsList="nodownload"
                                poster={nftAssets.more_info_url}
                            >
                                <source src={nftAssets.asset_thumbnail} type="video/mp4" />
                            </VideoFile>
                        )}
                    </Preview>
                </NftPreview>
                <NftDetail>
                    <AssetsBreadcrumbs>
                        <BreadCrumb
                            onClick={() => navigate(`/marketplace?category=${nftAssets.category}`)}
                        >
                            {t('AssetsDetail.categroy')} {'>'} {nftAssets.category}
                        </BreadCrumb>
                    </AssetsBreadcrumbs>
                    <SellerProfileBox>
                        <UserType>{t('AssetsDetail.creator')}</UserType>
                        <SellerProfile
                            onClick={() => navigate(`/mypage/${nftAssets.creator_address}`)}
                        >
                            <ProfileImage>
                                <Images
                                    src={
                                        nftAssets.creator_user_profileImg
                                            ? nftAssets.creator_user_profileImg
                                            : '/img/common/img_default_profile.png'
                                    }
                                />
                            </ProfileImage>
                            <SellerName>{nftAssets.creator_user_name}</SellerName>
                        </SellerProfile>
                    </SellerProfileBox>
                    <AssetsSupply>
                        <FromTitle>전체 발행수량</FromTitle>
                        <Supply>
                            {nftAssets.asset_quantity.toLocaleString()} <span>/</span>{' '}
                            {nftAssets.supply.toLocaleString()}
                        </Supply>
                    </AssetsSupply>
                    <FormContainer onSubmit={handleSubmit(onSubmit)}>
                        <MarketSaleAssetsForm
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            getValues={getValues}
                            watch={watch}
                            nftAssets={nftAssets}
                        />

                        <ResellButtonGroup>
                            <CancelButton
                                onClick={() =>
                                    navigate(
                                        `/marketplace/${nftAssets.contract_address}/${nftAssets.asset_id}`
                                    )
                                }
                            >
                                {t('AssetsDetail.resellCancel')}
                            </CancelButton>
                            <Submit
                                type="submit"
                                value={t('AssetsDetail.resellSale')}
                                disabled={!isValid}
                            />
                        </ResellButtonGroup>
                    </FormContainer>
                </NftDetail>
            </Container>

            {(isMarketFormCheck || isFormSave) && (
                <CreateModalContainer
                    isMarketFormCheck={isMarketFormCheck}
                    isFormSave={isFormSave}
                    formCheckCallback={formCheckCallback}
                    submitData={submitData}
                    mintLoading={mintLoading}
                    saveTitle="Product Market Sale"
                />
            )}
        </AssetsDetailContainer>
    );
}

const AssetsDetailContainer = styled.div`
    padding-bottom: 60px;
`;

const ResellTitleBox = styled.div`
    width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    margin-top: 78px;
`;

const CreateTitle = styled.div`
    font-size: 38px;
    font-family: ${fonts.Tinos};
    color: ${colors.Black100};
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.Black100};
`;

const Container = styled.div`
    display: flex;
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
    margin-top: 60px;
`;

const NftPreview = styled.div`
    flex-basis: 580px;
    width: 580px;
    flex-shrink: 0;
`;

const AssetsDetailTitle = styled.div`
    display: flex;
    padding-bottom: 14px;
    border-bottom: 1px solid ${colors.BlueGray500};
    height: 45px;
`;

const AssetsTitle = styled.div`
    flex-basis: calc(100% - 70px);
    width: calc(100% - 70px);
    font-size: 18px;
    font-weight: 500;
    line-height: 1.3;
    word-break: break-all;
`;

const Preview = styled.div`
    margin-top: 40px;
    background-color: ${colors.White100};
    border: 1px solid ${colors.BlueGray500};
    border-radius: 12px;
    padding: 10px;
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

const AssetsBreadcrumbs = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid ${colors.BlueGray500};
    height: 45px;
`;

const BreadCrumb = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    cursor: pointer;
`;

const NftDetail = styled.div`
    flex-basis: calc(100% - 580px);
    padding-left: 100px;
`;

const SellerProfileBox = styled.div`
    margin-top: 40px;
`;

const SellerProfile = styled.div`
    display: flex;
    align-items: center;
    margin-top: 7px;
`;

const UserType = styled.div`
    font-size: 16px;
    color: ${colors.Black200};
    font-family: ${fonts.Tinos};
`;

const ProfileImage = styled.div`
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: ${colors.Black200};
`;

const Images = styled('img')`
    width: 28px;
    height: 28px;
    object-fit: cover;
`;

const SellerName = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    margin-left: 8px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const FromTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const Submit = styled.input`
    margin: 32px 0;
    width: calc(100% - 214px);
    flex-basis: calc(100% - 214px);
    height: 58px;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background-color: ${colors.Black200};
    color: ${colors.White100};
    cursor: pointer;

    &:disabled {
        background-color: ${colors.BlueGray300};
        color: ${colors.BlueGray500};
        cursor: not-allowed;
    }
`;

const FormContainer = styled.form`
    flex-basis: 100%;
    margin-top: 56px;
`;

const ResellButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CancelButton = styled.div`
    flex-basis: 190px;
    width: 190px;
    height: 58px;
    border: 1px solid ${colors.BlueGray500};
    background-color: ${colors.White100};
    border-radius: 8px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.Black100};
    cursor: pointer;

    &:hover {
        background-color: ${colors.BlueGray200};
    }
`;

const AssetsSupply = styled.div`
    margin-top: 47px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Supply = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};

    span {
        font-weight: 400;
        color: ${colors.BlueGray500};
        margin: 0 4px;
        text-align: center;
    }
`;

export default MarketSaleAssets;
