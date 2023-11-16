import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { Axios } from '@utils/api';
import { Store } from 'react-notifications-component';
import { IBasicCard, IPaginationPrams } from '@interface/common';
import qs from 'qs';
import { useNavigate, useLocation } from 'react-router-dom';
import { CategoryListItem } from '@utils/common/category';
import { useTranslation } from 'react-i18next';

// Components
import PageNavigation from '@components/common/ui/PageNavigation';
import CardSkeleton from '@components/common/ui/CardSkeleton';
import CategoryEmpty from '@components/common/CategoryEmpty';
import BasicCard from '@components/common/BasicCard';

interface ITab {
    title: string;
    active: boolean;
    type: string;
}

function MarketPlace() {
    const { t } = useTranslation();
    const [nfts, setNft] = useState<IBasicCard[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [pagination, setPagination] = useState<number>(() => 1);
    const [pagenationInfo, setPagenationInfo] = useState<IPaginationPrams | null>(null);
    const navigate = useNavigate();
    const [tabItems, setTabItems] = useState<ITab[]>(CategoryListItem());
    const location = useLocation();

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
            await navigate(`/marketplace?category=${newTabItems.type}&page=${page}`);

            loadCategory();
        }
    };

    const handleChangeTab = async (item: ITab) => {
        const newTabItems = tabItems.map((tabItem: ITab): ITab => {
            const current = JSON.parse(JSON.stringify(tabItem));
            current.active = false;

            if (item.type === current.type) {
                current.active = true;
            }

            return current;
        });

        setTabItems(newTabItems);
        setPagination(1);
        setPagenationInfo(null);
        setNft([]);

        await navigate(`/marketplace?category=${item.type}&page=1`);

        loadCategory();
    };

    const loadCategory = async () => {
        setLoaded(false);
        const formData = new FormData();
        formData.append('select', 'all');

        const getParams = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        if (getParams.category && getParams.category !== 'All') {
            formData.append('category', getParams.category.toString());
        }

        if (getParams.page) {
            setPagination(Number(getParams.page));
        }

        try {
            const { data, success } = await Axios(
                `marketlist?page=${getParams.page ? getParams.page : 1}`,
                formData
            );

            setLoaded(true);

            if (success && data !== '') {
                const getData: IBasicCard[] | null = Object.values(data.marketlist_data) || null;
                if (getData) {
                    await setPagenationInfo(data.pagination_info);
                    setNft(getData);
                }
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

            if (!getParams.category && current.type === 'All') {
                current.active = true;
            }

            if (getParams.category === current.type) {
                current.active = true;
            }

            return current;
        });
        setTabItems(newTabItems);
        loadCategory();
    }, [location]);

    return (
        <Container>
            <Title>마켓플레이스</Title>
            <SubTitle>탄탄 마켓플레이스에서 가장 핫한 상품을 만나보세요.</SubTitle>

            <AssetsTab>
                {tabItems.map((item, index) => (
                    <TabItem
                        key={`marketplace-tab-${item.type}-${index}`}
                        active={item.active}
                        onClick={() => handleChangeTab(item)}
                    >
                        {item.title}
                    </TabItem>
                ))}
            </AssetsTab>

            {loaded &&
                tabItems.map((item, index) => (
                    <CardBox key={`card-section-${index}`}>
                        {item.active && (
                            <NFTCardWrapper key={`card-${index}`}>
                                {nfts.map((card: IBasicCard, index) => (
                                    <BasicCard
                                        key={`card-${index}-${card.asset_id}`}
                                        card={card}
                                        size={5}
                                    />
                                ))}
                            </NFTCardWrapper>
                        )}
                    </CardBox>
                ))}

            {!loaded && (
                <>
                    <CardSkeletonWrap>
                        <CardSkeleton />
                    </CardSkeletonWrap>
                    <CardSkeletonWrap>
                        <CardSkeleton />
                    </CardSkeletonWrap>
                    <CardSkeletonWrap>
                        <CardSkeleton />
                    </CardSkeletonWrap>
                    <CardSkeletonWrap>
                        <CardSkeleton />
                    </CardSkeletonWrap>
                </>
            )}

            {loaded && pagenationInfo && pagenationInfo.last_page > 1 && (
                <PageNavigation
                    activePage={pagination}
                    itemsCountPerPage={20}
                    totalItemsCount={pagenationInfo.total}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            )}

            {nfts.length === 0 && <CategoryEmpty title="마켓플레이스에 등록된 상품이 없습니다." />}
        </Container>
    );
}

const Container = styled.div`
    width: 1600px;
    padding: 60px 0 100px 0;
    margin: 0 auto;
    position: relative;
    z-index: 2;
`;

const Title = styled.div`
    font-size: 28px;
    font-weight: 700;
`;

const SubTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    margin-top: 4px;
`;

const CardBox = styled.div``;

const AssetsTab = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
`;

const TabItem = styled.div<{ active: boolean }>`
    flex-basis: 116px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: ${(props) => (props.active ? colors.Orange100 : colors.Black100)};
    border: 1px solid ${(props) => (props.active ? colors.Orange100 : colors.BlueGray400)};
    border-radius: 999px;
    margin-right: 8px;
    cursor: pointer;

    &:hover {
        background-color: ${colors.BlueGray300};
    }
`;

const NFTCardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 40px -14px 0 -14px;
`;

const CardSkeletonWrap = styled.div`
    margin-top: 44px;
`;

export default MarketPlace;
