import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { Axios } from '@utils/api';
import { Store } from 'react-notifications-component';
import { IBasicCard, IPaginationPrams } from '@interface/common';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useTranslation } from 'react-i18next';

// Components
import PageNavigation from '@components/common/ui/PageNavigation';
import BasicCard from '@components/common/BasicCard';
import CreativeChallengeCard from '@components/common/CreativeChallengeCard';
import CardSkeleton from '@components/common/ui/CardSkeleton';
import CategoryEmpty from '@components/common/CategoryEmpty';

interface ITab {
    title: string;
    unit: number;
    active: boolean;
    type: string;
}

interface ICreatorAssets {
    wallert_address: string
}

const useTabData = () => [
    {
        title: '창작한 상품',
        unit: 90,
        active: true,
        type: 'creator',
    },
    {
        title: '보유한 상품',
        unit: 90,
        active: false,
        type: 'owner',
    },
    {
        title: '크리에이티브 첼린지',
        unit: 90,
        active: false,
        type: 'challenge',
    },
];

function CreatorAssets({ wallert_address }: ICreatorAssets) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [nfts, setNft] = useState<IBasicCard[]>([]);
    const [pagination, setPagination] = useState<number>(1);
    const [pagenationInfo, setPagenationInfo] = useState<IPaginationPrams | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [tabItems, setTabItems] = useState<ITab[]>(useTabData());
    const [currentTab, setCurrentTab] = useState<ITab>({
        title: '창작한 상품',
        unit: 90,
        active: true,
        type: 'creator',
    });

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const handlePageChange = async (page: number) => {
        setPagination(page);

        window.scrollTo(0, 370);
        const newTabItems = tabItems.find((tabItem: ITab) => tabItem.active);

        if (newTabItems) {
            await navigate(`/mypage/${wallert_address}?tab=${newTabItems.type}&page=${page}`);

            loadNFTs();
        }
    };

    const handleChangeTab = async (item: ITab) => {
        const newTabItems = tabItems.map((tabItem: ITab): ITab => {
            const current = JSON.parse(JSON.stringify(tabItem));
            current.active = false;

            if (item.type === current.type) {
                current.active = true;

                setCurrentTab(item);
            }

            return current;
        });

        setTabItems(newTabItems);
        setPagination(1);
        setPagenationInfo(null);
        setNft([]);

        await navigate(`/mypage/${wallert_address}?tab=${item.type}&page=1`);

        loadNFTs();
    };

    const loadNFTs = async () => {
        setLoaded(false);
        const formData = new FormData();

        const getParams = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        formData.append('address', wallert_address);
        formData.append('co_gb', getParams.tab ? getParams.tab.toString() : 'creator');

        if (getParams.page) {
            setPagination(Number(getParams.page));
        }

        try {
            const { data, success } = await Axios(`coassetdetail?page=${getParams.page || 1}`, formData);

            setLoaded(true);
            if (success && data !== '') {
                const getData: IBasicCard[] | null = Object.values(data.coassetlist_data) || null;
                if (getData) {
                    await setPagenationInfo(data.pagination_info);
                    setNft(getData);
                }
            } else {
                setNft([]);
            }
        } catch (error) {
            setLoaded(true);
            setNft([]);
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundMarketList'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
        }
    };

    useEffect(() => {
        const getParams = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        const newTabItems = tabItems.map((tabItem: ITab): ITab => {
            const current = JSON.parse(JSON.stringify(tabItem));
            current.active = false;

            if (!getParams.tab && current.type === 'creator') {
                current.active = true;
            }

            if (getParams.tab === current.type) {
                current.active = true;

                setCurrentTab(current);
            }

            return current;
        });

        setTabItems(newTabItems);

        loadNFTs();
    }, []);

    return (
        <Container>
            <AssetsTab>
                {tabItems.map((item) => (
                    <TabItem
                        key={item.title}
                        active={item.active}
                        onClick={() => handleChangeTab(item)}
                    >
                        {item.title}
                    </TabItem>
                ))}
            </AssetsTab>

            {loaded && nfts.length > 0 && (
                <NFTCardWrapper>
                    <>
                        {currentTab.type === 'challenge' && (
                            <>
                                {nfts.map((card: IBasicCard) => (
                                    <CreativeChallengeCard
                                        key={card.asset_id}
                                        card={card}
                                        size={4}
                                    />
                                ))}
                            </>
                        )}

                        {currentTab.type !== 'challenge' && (
                            <>
                                {nfts.map((card: IBasicCard) => (
                                    <BasicCard
                                        key={card.asset_id}
                                        card={card}
                                        size={4}
                                    />
                                ))}
                            </>
                        )}
                    </>
                </NFTCardWrapper>
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

            {loaded && nfts.length === 0 && (
                <CategoryEmpty title={t('MyPage.emptyMyNft')} />
            )}

            {loaded && pagenationInfo && pagenationInfo.last_page > 1 && (
                <PageNavigation
                    activePage={pagination}
                    itemsCountPerPage={8}
                    totalItemsCount={pagenationInfo.total}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            )}

        </Container>
    );
}

const Container = styled.div`
    margin-top: 91px;
`;

const AssetsTab = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${colors.BlueGray400};
`;

const CardSkeletonWrap = styled.div`
    margin-top: 24px;
`;

const TabItem = styled.div<{active: boolean}>`
    flex-basis: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 14px;
    color: ${colors.Black100};
    border-bottom: 2px solid ${(props) => (props.active ? colors.Black200 : 'transparent')};
    height: 60px;
    cursor: pointer;

    &:hover {
        background-color: ${colors.BlueGray300};
    }
`;

const NFTCardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 48px -14px 0 -14px;
`;

export default CreatorAssets;
