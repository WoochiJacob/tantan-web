import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Axios } from '@utils/api';
import { useRecoilValue } from 'recoil';
import { Store } from 'react-notifications-component';
import { IAssetsDetail } from '@interface/assets';
import { useTranslation } from 'react-i18next';

// recoil
import { UserAddress } from '@recoil/auth';

// Components
import MarketSaleAssets from '@components/market-sale/MarketSaleAssets';
import styled from '@emotion/styled';
import MarketSkeleton from '@components/common/ui/MarketSkeleton';

function MarketSale() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userAddress = useRecoilValue(UserAddress);
    const params = useParams();
    const { tokenId } = params;
    const [nftAssets, setNftAssets] = useState<IAssetsDetail[] | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    const getAssets = async (id: number) => {
        const getLocalStorage = localStorage.getItem('loginState');
        setLoading(true);
        try {
            const { data } = await Axios(`assetdetail/${id}`, getLocalStorage);
            const getData: IAssetsDetail[] | null = Object.values(data.assetList_data) || null;

            if (getData) {
                const nftDetail = getData.filter((_market, index) => index === (getData.length - 1));
                const assetsOwnerAddress = nftDetail.find((_assets, index) => index === 0)?.owner_address || '';

                if (assetsOwnerAddress !== userAddress.address) {
                    window.location.assign('/main');
                }

                setNftAssets(nftDetail);
                setLoading(false);
            }
        } catch (error) {
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

    useEffect(() => {
        if (tokenId) {
            getAssets(Number(tokenId));
        }
    }, [tokenId]);

    useEffect(() => {
        if (!userAddress.isCertification) {
            Store.addNotification({
                ...notiOption,
                title: '회원정보 입력',
                message: '판매에 필요한 필수항목을 입력해주세요.',
                type: 'danger',
                container: 'top-left',
                insert: 'top',
                dismiss: {
                    duration: 5000,
                },
            });
            navigate(`/mypage/edit?login=true&location=${window.location.pathname}`);
        }
    }, []);

    return (
        <>
            {!isLoading && nftAssets && nftAssets.map((nft: IAssetsDetail) => (
                <MarketSaleAssets
                    key={nft.token_id}
                    nftAssets={nft}
                />
            ))}
            {isLoading && (
                <LoadingBox>
                    <MarketSkeleton />
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

export default MarketSale;
