/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useParams, useNavigate } from 'react-router-dom';
import { Store } from 'react-notifications-component';
import { Axios, getSignResult } from '@utils/api';
import { IAssetsDetail } from '@interface/assets';
import { useTranslation } from 'react-i18next';
import { encrypt, recover } from '@utils/help';
import { colors } from '@styles/ui_palette';
import { useRecoilState, useRecoilValue } from 'recoil';
import { prepare } from 'klip-sdk';
import { KlipKey, UserAddress } from '@recoil/auth';

// Components
import DetailCreative from '@components/creative-detail/DetailCreative';
import BookmarkPanel from '@components/creative-detail/BookmarkPanel';

import CreativeInfomation from '@components/creative-detail/CreativeInfomation';
import DetailSkeleton from '@components/common/ui/DetailSkeleton';

function CreativeChallengeDetail() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const parma = useParams();
    const { tokenId } = parma;
    const [nftAssets, setNftAssets] = useState<IAssetsDetail[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [, setRequestKey] = useRecoilState<string>(KlipKey);
    const userAddress = useRecoilValue(UserAddress);

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

            // NFT 상세 정보 저장
            if (getData) {
                const nftDetail = getData.filter((_market, index) => index === getData.length - 1);
                const newNftDetail = nftDetail.map((markets) => {
                    const newMarket = markets;
                    return newMarket;
                });

                setNftAssets(newNftDetail);
                // NFT상세 정보 저장 완료하면 로딩화면 바꿔주기
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
                                Store.addNotification({
                                    ...notiOption,
                                    title: '완료',
                                    message: '아이디어 등록 취소',
                                    type: 'default',
                                    container: 'top-left',
                                    insert: 'top',
                                });

                                navigate('/');
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
                                <DetailCreative key={`detail-${nft.token_id}`} nftAssets={nft} />

                                {/* 응원하기 */}
                                <BookmarkPanel
                                    key={`bookmark-${nft.token_id}`}
                                    nftAssets={nft}
                                    handleMarketCancel={handleMarketCancel}
                                />
                            </Container>
                        </AssetsDetailContainer>

                        {/* 크리에이터의 다른 아이디어 */}
                        <CreativeInfomation
                            key={`information-${nft.token_id}`}
                            creatorAddress={nft.creator_address}
                            tokenId={Number(tokenId)}
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

export default CreativeChallengeDetail;
