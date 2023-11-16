import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
// import { colors } from '@styles/ui_palette';
import { IOrderHistory } from '@interface/assets';
import { colors } from '@styles/ui_palette';
import { Axios } from '@utils/api';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import CardSkeleton from '@components/common/ui/CardSkeleton';
import HistorySkeleton from '@components/common/ui/HistorySkeleton';
import { IBasicCard, IPaginationPrams } from '@interface/common';
import BasicCard from '@components/common/BasicCard';
import PageNavigation from '@components/common/ui/PageNavigation';

interface IDetailInformation {
    creatorAddress: string;
    tokenId: number;
    setIsFirst: any;
    symbol: string;
}

function AssestsInfomation({ creatorAddress, tokenId, symbol, setIsFirst }: IDetailInformation) {
    const { t } = useTranslation();
    const [nftAssetsInfo, setNftAssetsInfo] = useState<null | IOrderHistory[]>(null);
    const [isDetailLoading, setDetailLoading] = useState<boolean>(true);
    const [nfts, setNft] = useState<IBasicCard[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [pagination, setPagination] = useState<number>(() => 1);
    const [pagenationInfo, setPagenationInfo] = useState<IPaginationPrams | null>(null);
    const navigate = useNavigate();

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const handleScanLink = (contract: string | null, symbol: string) => {
        if (!contract) {
            return;
        }

        if (symbol === 'KLAY' || symbol === 'KRW') {
            window.open(`https://scope.klaytn.com/account/${contract}`);
        }
    };

    const handlePageChange = async (page: number) => {
        setPagination(page);

        getAssetsList(tokenId, page);
    };

    const getAssetsList = async (id: number, page: number) => {
        const getLocalStorage = localStorage.getItem('loginState');
        setDetailLoading(true);
        try {
            const { data } = await Axios(`assetdetailInfo/${id}?page=${page}`, getLocalStorage);
            const getIsFirst = !!Object.values(data.histroy_data).find(
                (history: any) => history.event === 'buy'
            );

            setIsFirst(!getIsFirst);
            setNftAssetsInfo(Object.values(data.histroy_data));
            setPagenationInfo(data.pagination_info);
            setDetailLoading(false);
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

    const loadCategory = async () => {
        await setLoaded(false);
        setNft([]);

        const formData = new FormData();
        formData.append('address', creatorAddress);
        formData.append('co_gb', 'premium_market');

        try {
            const { data, success } = await Axios('coassetdetail', formData);

            setLoaded(true);
            if (success && data !== '') {
                const getData: IBasicCard[] | null = Object.values(data.coassetlist_data) || null;
                if (getData) {
                    const marketList = getData.filter((market) => market.asset_id !== tokenId);
                    const marketListUnit = marketList.slice(0, 4);

                    setNft(marketListUnit);
                }
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
        loadCategory();
    }, []);

    useEffect(() => {
        if (tokenId) {
            getAssetsList(Number(tokenId), 1);
        }
    }, [tokenId]);
    return (
        <Container>
            <Title>{t('AssetsDetail.orderHistory')}</Title>

            <OrderHistoryGroup>
                <Headers>
                    <Contents width={15}>{t('AssetsDetail.historyDate')}</Contents>
                    <Contents width={8}>{t('AssetsDetail.historyEvent')}</Contents>
                    <Contents width={10}>Amount</Contents>
                    <Contents width={30}>{t('AssetsDetail.historyFrom')}</Contents>
                    <Contents width={30}>{t('AssetsDetail.historyTo')}</Contents>
                </Headers>
                <BodyBox>
                    {!isDetailLoading &&
                        nftAssetsInfo &&
                        nftAssetsInfo.map((history) => (
                            <Bodys key={history.history_id}>
                                <Contents width={15}>{history.created_at}</Contents>
                                <Contents width={8}>
                                    {history.event ? history.event.toLocaleUpperCase() : '-'}
                                </Contents>
                                <Contents width={10}>
                                    {history.price
                                        ? `${history.price.toLocaleString()} ${history.symbol}`
                                        : '-'}
                                </Contents>
                                <Contents
                                    width={30}
                                    underline
                                    onClick={() => handleScanLink(history.from_address, symbol)}
                                >
                                    {history.from_address
                                        ? history.from_address
                                        : 'Tantan Contract'}
                                </Contents>
                                <Contents
                                    width={30}
                                    underline
                                    onClick={() => handleScanLink(history.to_address, symbol)}
                                >
                                    {history.to_address ? history.to_address : 'Tantan Contract'}
                                </Contents>
                            </Bodys>
                        ))}

                    {isDetailLoading && <HistorySkeleton />}
                </BodyBox>
            </OrderHistoryGroup>

            {!isDetailLoading && pagenationInfo && pagenationInfo.last_page !== 1 && (
                <PagenationContain>
                    <PageNavigation
                        activePage={pagination}
                        itemsCountPerPage={8}
                        totalItemsCount={pagenationInfo.total}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </PagenationContain>
            )}

            {nfts.length > 0 && (
                <CreatorOther>
                    <Title>
                        {t('AssetsDetail.creatorOtherAssets')}
                        <CreatorMoreBtn
                            onClick={() => navigate(`/premium-market/${creatorAddress}`)}
                        >
                            {t('AssetsDetail.moreButton')}
                        </CreatorMoreBtn>
                    </Title>

                    {loaded && (
                        <CreateOtherGroup>
                            {nfts.map((card: IBasicCard) => (
                                <BasicCard key={card.asset_id} card={card} size={4} />
                            ))}
                        </CreateOtherGroup>
                    )}

                    {!loaded && (
                        <>
                            <CardSkeletonWrap>
                                <CardSkeleton />
                            </CardSkeletonWrap>
                            <CardSkeletonWrap>
                                <CardSkeleton />
                            </CardSkeletonWrap>
                        </>
                    )}
                </CreatorOther>
            )}
        </Container>
    );
}

const PagenationContain = styled.div`
    margin-top: 30px;
`;

const Container = styled.div`
    width: 1280px;
    margin: 60px auto 180px auto;
    padding: 0 20px;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const OrderHistoryGroup = styled.div`
    margin-top: 21px;
    border-radius: 12px;
    border: 1px solid ${colors.BlueGray500};
    overflow: hidden;
`;

const Headers = styled.div`
    background-color: ${colors.BlueGray300};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
`;

const Bodys = styled.div`
    background-color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    &:hover {
        background-color: ${colors.BlueGray300};
    }
`;

const BodyBox = styled.div``;

const Contents = styled.div<{ width: number; underline?: boolean }>`
    flex-basis: ${(props) => `${props.width}%`};
    flex-shrink: 0;
    height: 52px;
    display: flex;
    align-items: center;
    text-decoration: ${(props) => (props.underline ? 'underline' : 'none')};
    cursor: ${(props) => (props.underline ? 'pointer' : 'default')};
    font-size: 14px;
    text-align: center;
`;

const CardSkeletonWrap = styled.div`
    margin-top: 18px;
`;

const CreatorOther = styled.div`
    margin-top: 80px;
`;

const CreateOtherGroup = styled.div`
    display: flex;
    margin: 0 -14px;
    margin-top: 18px;
`;

const CreatorMoreBtn = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    cursor: pointer;

    &::after {
        width: 7px;
        height: 14px;
        content: '';
        display: block;
        background-image: url('/img/assets_detail/ic_asset_more.svg');
        margin-left: 4px;
    }

    &:hover {
        text-decoration: underline;
    }
`;

export default AssestsInfomation;
