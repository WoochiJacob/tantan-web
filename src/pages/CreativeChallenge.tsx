import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { Axios } from '@utils/api';
import { Store } from 'react-notifications-component';
import { IBasicCard, IPaginationPrams } from '@interface/common';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { ChallengeListItem } from '@utils/common/category';
import { useTranslation } from 'react-i18next';
import { rgba } from 'emotion-rgba';

// Components
import PageNavigation from '@components/common/ui/PageNavigation';
import CardSkeleton from '@components/common/ui/CardSkeleton';
import CategoryEmpty from '@components/common/CategoryEmpty';
import CreativeChallengeCard from '@components/common/CreativeChallengeCard';

interface ITab {
    title: string;
    active: boolean;
    type: string;
}

function CreativeChallenge() {
    const { t } = useTranslation();
    const [nfts, setNft] = useState<IBasicCard[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [pagination, setPagination] = useState<number>(() => 1);
    const [pagenationInfo, setPagenationInfo] = useState<IPaginationPrams | null>(null);
    const navigate = useNavigate();
    const [tabItems, setTabItems] = useState<ITab[]>(ChallengeListItem());

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
            await navigate(`/creative-challenge?category=${newTabItems.type}&page=${page}`);

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

        await navigate(`/creative-challenge?category=${item.type}&page=1`);

        loadCategory();
    };

    const loadCategory = async () => {
        setLoaded(false);
        const formData = new FormData();
        formData.append('select', 'challenge');

        const getParams = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        if (getParams.category && getParams.category !== '전체') {
            formData.append('category', getParams.category.toString());
        }

        if (getParams.page) {
            setPagination(Number(getParams.page));
        }

        try {
            const { data, success } = await Axios(`marketlist?page=${getParams.page ? getParams.page : 1}`, formData);

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

            if (!getParams.category && current.type === '') {
                current.active = true;
            }

            if (getParams.category === current.type) {
                current.active = true;
            }

            return current;
        });
        setTabItems(newTabItems);
        loadCategory();
    }, []);

    return (
        <>
            <CreativeChallengeSection>
                <VisualBox>
                    <VisualSubTitle>상상은 현실이 된다!</VisualSubTitle>
                    <VisualTitle>
                        탄탄과 함께 상상을
                        <br />
                        현실로 만들어보세요
                    </VisualTitle>
                    <VisualDescription>
                        아이디어만 있다면 누구나 참여할 수 있어요
                        <br />
                        크리에이터님의 상상을 현실로 만들어 보세요.
                    </VisualDescription>
                    <VisualMoreInfo onClick={() => window.open('https://conuts.zendesk.com/hc/ko/articles/18113986104601-%EB%94%94%EB%84%A4%EC%83%81%EC%8A%A4-%ED%81%AC%EB%A6%AC%EC%97%90%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%B1%8C%EB%A6%B0%EC%A7%80-2023')}>
                        크리에이티브 챌린지 자세히 알아보기
                    </VisualMoreInfo>
                    <VisualCreateButton onClick={() => navigate('/challenge-create')}>
                        크리에이티브 챌린지 참여
                    </VisualCreateButton>
                </VisualBox>
            </CreativeChallengeSection>
            <Container>
                <Title>크리에이티브 챌린지</Title>
                <SubTitle>내 상상 속 아이디어가 히트상품으로!</SubTitle>

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

                {loaded && tabItems.map((item, index) => (
                    <CardBox key={`card-section-${index}`}>
                        {item.active && !(item.type === 'Collectibles' || item.type === 'Entertainment')
                        && (
                            <NFTCardWrapper key={`card-${index}`}>
                                {nfts.map((card: IBasicCard, index) => (
                                    <CreativeChallengeCard
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
                        itemsCountPerPage={12}
                        totalItemsCount={pagenationInfo.total}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                )}

                {nfts.length === 0 && (
                    <CategoryEmpty
                        title="등록된 아이디어가 없어요."
                    />
                )}

            </Container>
        </>
    );
}

const CreativeChallengeSection = styled.div`
    width: 100%;
    height: 800px;
    background-image: url('/img/creative_challenge/img_creative_visual.png');
    background-position: center center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    padding-bottom: 169px;
`;

const VisualBox = styled.div`
    width: 1600px;
    margin: 0 auto;
    margin-top: auto;
`;

const VisualSubTitle = styled.div`
    font-size: 16px;
    font-weight: 400;
    color: ${colors.Black100};
`;

const VisualTitle = styled.div`
    font-size: 38px;
    font-weight: 700;
    line-height: 1.2;
    margin-top: 12px;
`;

const VisualDescription = styled.div`
    margin-top: 32px;
    font-size: 14px;
    font-weight: 400;
    color: ${rgba(colors.Black100, 0.7)};
`;

const VisualMoreInfo = styled.div`
    margin-top: 12px;
    font-size: 14px;
    font-weight: 400;
    color: ${colors.Black100};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const VisualCreateButton = styled.div`
    width: 200px;
    height: 58px;
    border-radius: 999px;
    border: 1px solid ${colors.Black100};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.Black100};
    cursor: pointer;
    margin-top: 60px;

    &:hover {
        background-color: ${colors.Black100};
        color: ${colors.White100}
    }
`;

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

const TabItem = styled.div<{active: boolean}>`
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

export default CreativeChallenge;
