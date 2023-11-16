import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { Axios } from '@utils/api';
import { Store } from 'react-notifications-component';
import { useTranslation } from 'react-i18next';

// Interface
import { IBasicCard } from '@interface/common';

// Components
import CreativeChallengeCard from '@components/common/CreativeChallengeCard';
import CardSkeleton from '@components/common/ui/CardSkeleton';
import CategoryEmpty from '@components/common/CategoryEmpty';

function HomeCreativeChallenge() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [nfts, setNft] = useState<IBasicCard[]>([]);
    const [loaded, setLoaded] = useState(false);

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const loadNFTs = async () => {
        const formData = new FormData();
        formData.append('select', 'challenge');

        try {
            const { data } = await Axios('marketlist', formData);
            setLoaded(true);

            if (data !== '') {
                const getData: IBasicCard[] | null = Object.values(data.marketlist_data) || null;
                if (getData) {
                    const marketList = getData.filter((market) => market.is_display === 1 && market.is_end === 0);
                    const marketListUnit = marketList.slice(0, 10);

                    setNft(marketListUnit);
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
        loadNFTs();
    }, []);

    return (
        <Container>
            <TitleContain>
                <Title>크리에이티브 챌린지</Title>
                <Information>
                    <SubTitle>
                        내 상상 속 아이디어가 히트상품으로!
                    </SubTitle>
                    <MoreButton onClick={() => navigate('/creative-challenge')}>
                        더보기
                        <MoreArrow />
                    </MoreButton>
                </Information>
            </TitleContain>

            {loaded && nfts.length > 0 && (
                <CardWrap>
                    {nfts.map((card: IBasicCard) => (
                        <CreativeChallengeCard
                            key={card.asset_id}
                            card={card}
                            size={5}
                        />
                    ))}
                </CardWrap>
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
                <CategoryEmpty title="등록된 아이디어가 없어요." />
            )}

        </Container>
    );
}

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
    padding-bottom: 52px;
    padding-top: 60px;
    border-top: 1px solid ${colors.BlueGray400};
`;

const TitleContain = styled.div`
    width: 1600px;
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${colors.Black100};
    font-weight: 700;
`;

const Information = styled.div`
    margin-top: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const SubTitle = styled.div`
    font-size: 14px;
    color: ${rgba(colors.Black100, 0.7)};
`;

const MoreArrow = styled.div`
    width: 8px;
    height: 14px;
    background: url('img/main/ic_gray_arrow.svg');
    margin-left: 4px; 
`;

const MoreButton = styled.div`
    font-size: 14px;
    font-weight: 500
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    transition: all .2s ease;
    cursor: pointer;

    &:hover {
        color: ${colors.Black100};
        text-decoration: underline;

        ${MoreArrow} {
            background: url('img/main/ic_black_arrow.svg');
        }
    }
`;

const CardWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 20px -10px 0 -10px;
`;

const CardSkeletonWrap = styled.div`
    margin-top: 20px;
`;

export default HomeCreativeChallenge;
