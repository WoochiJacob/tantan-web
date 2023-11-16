/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useParams } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import { Axios, getSignResult, CaverOption } from '@utils/api';
import { IAssetsDetail, IOwnerList } from '@interface/assets';
import { useTranslation } from 'react-i18next';
import { pfpGB, encrypt, recover, getContractABI } from '@utils/help';

import { useChain } from '@utils/interact';
import { colors } from '@styles/ui_palette';
import { useRecoilState, useRecoilValue } from 'recoil';
import { prepare } from 'klip-sdk';
import { KlipKey, UserAddress, Chain } from '@recoil/auth';

// Components
import DetailAssets from '@components/detail/DetailAssets';
import PFPAssets from '@components/detail/PFPAssets';
import SingleAssets from '@components/detail/SingleAssets';
import MultiAssets from '@components/detail/MultiAssets';
import AssestsInfomation from '@components/detail/AssestsInfomation';
import DetailSkeleton from '@components/common/ui/DetailSkeleton';

const Caver = require('caver-js');

function MarketDetail() {
    const { t } = useTranslation();
    const parma = useParams();
    const { tokenId } = parma;
    const chainId = useRecoilValue(Chain);
    const [nftAssets, setNftAssets] = useState<IAssetsDetail[] | null>(null);
    const [ownerList, setOwnerList] = useState<IOwnerList[] | null>(null);
    const [isFirst, setIsFirst] = useState<boolean>(true);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [, setRequestKey] = useRecoilState<string>(KlipKey);
    const userAddress = useRecoilValue(UserAddress);
    const caver = new Caver(
        new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', CaverOption)
    );

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    // NFT 정보 불러오기
    const getAssets = async (id: number) => {
        // 로딩 보여주기
        setLoading(true);
        // api 호출을 위한 정보 가져오기
        const getLocalStorage = localStorage.getItem('loginState');
        try {
            const { data } = await Axios(`assetdetail/${id}`, getLocalStorage);
            const getData: IAssetsDetail[] | null = Object.values(data.assetList_data) || null;
            const getOwnerList: IOwnerList[] | null = Object.values(data.poly_marketlist) || null;

            // NFT 상세 정보 저장
            if (getData) {
                const nftDetail = getData.filter((_market, index) => index === getData.length - 1);
                const ownerAdress =
                    nftDetail.find((_market, index) => index === 0)?.owner_address || '';

                const owner_is_end_count = await loadSaleCont(ownerAdress);
                const newNftDetail = nftDetail.map((markets) => {
                    const newMarket = markets;
                    newMarket.owner_is_end_count = owner_is_end_count;

                    return newMarket;
                });

                setNftAssets(newNftDetail);
                // NFT상세 정보 저장 완료하면 로딩화면 바꿔주기
                setLoading(false);
            }

            // NFT 다른 판매자 정보 저장
            if (getOwnerList) {
                const ownerListSort = getOwnerList.sort((a: any, b: any) => a.price - b.price);
                setOwnerList(ownerListSort);
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

    // 유저가 판매중인 수량 가오기
    const loadSaleCont = async (ownerAdress: string) => {
        const formData = new FormData();
        formData.append('address', ownerAdress);
        formData.append('co_gb', 'creator');

        try {
            const { data } = await Axios('coassetdetail', formData);

            return data.owner_is_end_count || 0;
        } catch (error) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundList'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });

            return 0;
        }
    };

    const handleMarketCancel = async (nft: IAssetsDetail) => {
        const token = `Bearer ${localStorage.getItem('token')}` || '';

        const reseponse = await prepare.signMessage({
            bappName: 'TanTan',
            value: 'CancelMarket',
        });

        if (reseponse.request_key && reseponse.request_key !== '') {
            setRequestKey(reseponse.request_key);
            const timerId = setInterval(async () => {
                try {
                    const { data: signData } = await getSignResult(reseponse.request_key);

                    if (signData.result) {
                        const { signature } = signData.result;
                        const getRecover = await recover(
                            'CancelMarket',
                            signature,
                            userAddress.address
                        );
                        const recoverPrams = encrypt(
                            getRecover,
                            process.env.REACT_APP_SIGNATURE_KEY
                        );
                        const formData = new FormData();

                        formData.append('blockchain', 'klaytn');
                        formData.append('signature', signature);
                        formData.append('message', 'CancelMarket');
                        formData.append('signature_param', recoverPrams);
                        formData.append('is_display', '0');
                        formData.append('is_end', '1');
                        formData.append('contract_address', nft.contract_address);
                        formData.append('wallet_address', nft.owner_address);
                        formData.append('token_id', nft.token_id);
                        formData.append('quantity', nft.market_quantity.toString());
                        formData.append('uuid_market', nft.uuid_market);
                        formData.append('type_trade', nft.type_trade.toString());
                        formData.append('token_type', nft.token_type);
                        formData.append('order_recipt', nft.order_recipt);
                        formData.append('order_signature', nft.order_signature);

                        clearInterval(timerId);
                        setRequestKey('');

                        try {
                            const { success } = await Axios('market-cancel', formData, token);

                            if (success) {
                                await sendTransaction();
                                Store.addNotification({
                                    ...notiOption,
                                    title: '완료',
                                    message: '마켓이 취소 되었습니다.',
                                    type: 'default',
                                    container: 'top-left',
                                    insert: 'top',
                                });

                                window.location.reload();
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

    const sendTransaction = async () => {
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

        const tx = await myContract.methods.deleteApprovalForAll(userAddress.address).send({
            from: keyring.address,
            gas: 6000000,
        });

        return tx.transactionHash;
    };

    // 토큰 아이디가 바뀌면 새로 NFT 정보 불러오기
    useEffect(() => {
        if (tokenId) {
            getAssets(Number(tokenId));
        }
    }, [tokenId]);

    return (
        <>
            {!isLoading &&
                nftAssets &&
                nftAssets.map((nft: IAssetsDetail) => (
                    <AssetsDetailKeyBox key={`container-${nft.token_id}`}>
                        <AssetsDetailContainer>
                            <Container>
                                {/* 왼쪽 NFT 상세 */}
                                <DetailAssets key={`detail-${nft.token_id}`} nftAssets={nft} />

                                {/* 단일 판매 */}
                                {nft.supply === 1 && !pfpGB(nft.pfp_gb) && (
                                    <SingleAssets
                                        key={`single-${nft.token_id}`}
                                        nftAssets={nft}
                                        isFirst={isFirst}
                                        handleMarketCancel={handleMarketCancel}
                                    />
                                )}

                                {/* PFP 판매 */}
                                {nft.supply === 1 && pfpGB(nft.pfp_gb) && (
                                    <PFPAssets
                                        key={`single-${nft.token_id}`}
                                        nftAssets={nft}
                                        ownerList={ownerList}
                                        isFirst={isFirst}
                                        handleMarketCancel={handleMarketCancel}
                                    />
                                )}

                                {/* 대량 판매 */}
                                {nft.supply > 1 && (
                                    <MultiAssets
                                        key={`multi-${nft.token_id}`}
                                        nftAssets={nft}
                                        ownerList={ownerList}
                                        isFirst={isFirst}
                                        handleMarketCancel={handleMarketCancel}
                                    />
                                )}
                            </Container>
                        </AssetsDetailContainer>

                        {/* NFT 히스토리 */}
                        <AssestsInfomation
                            key={`information-${nft.token_id}`}
                            creatorAddress={nft.creator_address}
                            symbol={nft.symbol}
                            tokenId={Number(tokenId)}
                            setIsFirst={setIsFirst}
                        />
                    </AssetsDetailKeyBox>
                ))}
            {isLoading && (
                <LoadingBox>
                    <DetailSkeleton />
                </LoadingBox>
            )}
        </>
    );
}

const LoadingBox = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
`;

const AssetsDetailKeyBox = styled.div``;

const AssetsDetailContainer = styled.div`
    padding-bottom: 30px;
    border-bottom: 12px solid ${colors.BlueGray300};
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
`;

export default MarketDetail;
