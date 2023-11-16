import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import Slider from 'react-slick';

import { useTranslation } from 'react-i18next';

import { Axios } from '@utils/api';
import { IPremiumCard } from '@interface/common';
import { Store } from 'react-notifications-component';

// Components
import PremiumCard from '@components/common/PremiumCard';
import CardSkeleton from '@components/common/ui/CardSkeleton';
import CategoryEmpty from '@components/common/CategoryEmpty';

function HomePremiumMarket() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [customeSlider, setCustomeSliderf] = useState<any>(null);
    const [nfts, setNft] = useState<IPremiumCard[]>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const settings = {
        dots: false,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const loadNFTs = async () => {
        const formData = new FormData();
        formData.append('vip_gb', '1');

        try {
            const { data } = await Axios('vipuserlist', formData);

            if (data) {
                setNft(Object.values(data.userInfo.data));
                setLoaded(true);
            }
        } catch (error) {
            setLoaded(true);
            setNft([]);
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundPremiumMarketList'),
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
        <PremiumMarketSection>
            <TitleContain>
                <Title>핫한 크리에이터를 만나보세요.</Title>
                <Information>
                    <SubTitle>
                        탄탄에서 가장 핫한 크리에이터를 만나보세요.
                    </SubTitle>
                    <MoreButton onClick={() => navigate('/premium-market')}>
                        더보기
                        <MoreArrow />
                    </MoreButton>
                </Information>
            </TitleContain>

            <CardContain>
                {customeSlider && (
                    <ArrowBox>
                        <NextArrow onClick={customeSlider.slickPrev}>
                            <Arrow
                                type="left"
                                src="/img/main/ic_slick_arrow.svg"
                            />
                        </NextArrow>
                        <NextArrow onClick={customeSlider.slickNext}>
                            <Arrow
                                type="right"
                                src="/img/main/ic_slick_arrow.svg"
                            />
                        </NextArrow>
                    </ArrowBox>
                )}
                <Section>
                    <Container>
                        {loaded && nfts.length > 0 && (
                            <CustomSlick
                                ref={setCustomeSliderf}
                                {...settings}
                            >
                                {nfts.map(((card: IPremiumCard) => (
                                    <SlideItems key={card.id}>
                                        <PremiumCard
                                            card={card}
                                            size={1}
                                            isMain
                                        />
                                    </SlideItems>
                                )))}
                            </CustomSlick>
                        )}

                        {!loaded && (
                            <NavigationWrapper>
                                <CardSkeleton />
                            </NavigationWrapper>
                        )}

                        {loaded && nfts.length === 0 && (
                            <CategoryEmpty title="프리미엄 컬렉션이 없습니다." />
                        )}

                    </Container>
                </Section>
            </CardContain>
        </PremiumMarketSection>
    );
}

const CustomSlick = styled(Slider)`
    margin-top: 20px;
    height: 492px;
    overflow: hidden;
`;

const Section = styled.div`
    width: 1600px;
    margin: 0 auto;
    overflow: hidden;
`;

const PremiumMarketSection = styled.div`
    background-color: ${colors.BlueGray200};
    padding: 60px 0;
    position: relative;
`;

const Container = styled.div`
    width: 1820px;
    margin: 0 auto;
`;

const NavigationWrapper = styled.div`
    position: relative;
    z-index: 1;
    margin-top: 20px;
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

const SlideItems = styled.div`
    padding-right: 20px;
`;

const CardContain = styled.div`
    position: relative;
`;

const ArrowBox = styled.div`
    width: 1752px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NextArrow = styled.div`
    width: 60px;
    height: 60px;
    border: 1px solid ${colors.BlueGray500};
    background-color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: ${colors.BlueGray400};
    }
`;

const Arrow = styled('img')<{type: string}>`
    transform: rotate(${(props) => (props.type === 'right' ? '180deg' : 0)});
`;

export default HomePremiumMarket;
