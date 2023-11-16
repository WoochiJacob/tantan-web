import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { chunk } from '@utils/help';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { rgba } from 'emotion-rgba';
import { useTranslation } from 'react-i18next';

const SlideArr = [
    {
        imgae: '/img/about/img_premium_05.png',
        profile: '/img/about/ic_profile_premiu_05.png',
        name: 'iHQ 맛있는 녀석들',
        description: '유민상, 김민경, 문세윤, 김태원, 홍윤화 ‘뚱5’로 돌아온 ‘원조 먹방 예능’ ‘맛’을 아는 녀석들의 더 맛있게 먹는 방법! 침샘자극! 식욕폭발! 멘탈어택!하게 만드는 꿀먹방의 달콤한 유혹이 시작된다!',
        tokenId: 5,
    },
    {
        imgae: '/img/about/img_premium_06.png',
        profile: '/img/about/ic_profile_premiu_05.png',
        name: 'iHQ 돈쭐내러 왔습니다2',
        description: '먹피아 조직의 위대(胃大)한 프로젝트 이영자·제이쓴과 함께 착한 사장님들을 구하기 위해 뭉친 전국의 먹피아 요원들! 위대(胃大)한 먹방으로 음식은 물론 사장님의 근심도 해치우는 특별한 하루!',
        tokenId: 6,
    },
    {
        imgae: '/img/about/img_premium_07.png',
        profile: '/img/about/ic_profile_premiu_05.png',
        name: 'iHQ 자급자족 원정대',
        description: '전국 방방곡곡 지역 상생 프로젝트! 이만기, 윤택, 허안나, 이상준 생활형 히어로 4남매가 자급자족 CAR를 타고 지역을 방문해 주민들과 먹고, 자고, 일하며 지역의 관광지, 명물, 특산품 등을 알린다!',
        tokenId: 7,
    },
    {
        imgae: '/img/about/img_premium_08.png',
        profile: '/img/about/ic_profile_premiu_05.png',
        name: 'iHQ 주주총회',
        description: '일주일에 한 번, 은밀한 주(酒)주총회가 열린다? ‘술 마시다가 한번쯤 궁금했을 오늘의 안건’부터 ‘세상에서 가장 맛있게 술 마시는 법’ 까지! 애주가 3남매 이종혁, 장동민, 송해나가 알려주는 건강한 음주 문화를 위한 술에 대한 모든 것!',
        tokenId: 8,
    },
    {
        imgae: '/img/about/img_premium_01.png',
        profile: '/img/about/ic_profile_premiu_01.png',
        name: 'Heon',
        description: '작품 시리즈에 사용된 ‘유리구슬’의 물성, 투명한 구슬의 성질과 빛의 흐름과 연관된 시각적 다변성을 표현한 작품입니다. 색의 혼합과 바닥면에 반사되는 투명한 구슬의 형상으로 역동적인 순간의 단면을 포착해냅니다.',
        tokenId: 1,
    },
    {
        imgae: '/img/about/img_premium_02.png',
        profile: '/img/about/ic_profile_premiu_02.png',
        name: 'Daniel',
        description: '하늘 위의 구름이 움직이는 순간을 포착한 작품으로, 작가의 자연에 대한 관찰과 통찰력을 드러내고 있습니다. 하얀색과 푸른색 물감의 강약 조절로 붓의 터치에 따른 구름의 결을 표현합니다.',
        tokenId: 2,
    },
    {
        imgae: '/img/about/img_premium_03.png',
        profile: '/img/about/ic_profile_premiu_03.png',
        name: 'layla',
        description: '배경 전면에 입체적으로 표현된 원형의 보드와 나뭇잎을 구성하여 3d 렌더링한 작품입니다. 원색의 사용을 배제한 마일드한 색채로 열대의 트로피컬한 감각을 나타내고 있습니다.',
        tokenId: 3,
    },
    {
        imgae: '/img/about/img_premium_04.png',
        profile: '/img/about/ic_profile_premiu_04.png',
        name: 'Vitor',
        description: '컬러풀한 색을 활용한 도형 위에 불투명한 유리가 덮인 듯한 효과를 나타낸 작품입니다. 강렬한 원색 위에 겹쳐진 영역에서 표현되는 색의 교차와 번짐으로 몽환적인 분위기를 연출합니다.',
        tokenId: 4,
    },
];

function AboutMainVisualSlide() {
    const { t } = useTranslation();
    const slideCard = SlideArr;
    const chunkSize = 4;
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [slideLoaded, setSlideLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            rtl: true,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            created() {
                setSlideLoaded(true);
            },
        },
        [
            (slider) => {
                let timeout: ReturnType<typeof setTimeout>;
                let mouseOver = false;
                function clearNextTimeout() {
                    clearTimeout(timeout);
                }
                function nextTimeout() {
                    clearTimeout(timeout);
                    if (mouseOver) return;
                    timeout = setTimeout(() => {
                        slider.next();
                    }, 4000);
                }
                slider.on('created', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;
                        nextTimeout();
                    });
                    nextTimeout();
                });
                slider.on('dragStarted', clearNextTimeout);
                slider.on('animationEnded', nextTimeout);
                slider.on('updated', nextTimeout);
            },
        ],
    );

    return (
        <DropMarketSection>
            <Container>
                <NavigationWrapper>
                    <KeenSlider
                        ref={sliderRef}
                        className="keen-slider"
                    >
                        {chunk(slideCard, chunkSize).map(((chunkCard: any, index: number) => (
                            <KeenSliderBox
                                key={`chunk-${index}`}
                                className="keen-slider__slide"
                            >
                                <Title>
                                    {index === 0 ? t('About.aboutPremiumMarket') : t('About.aboutMarketplace')}
                                </Title>
                                <Information>
                                    <SubTitle>
                                        {
                                            index === 0
                                                ? t('About.aboutPremiumMarketDesc')
                                                : t('About.aboutMarketplaceDesc')
                                        }
                                    </SubTitle>
                                </Information>
                                <CardSection>
                                    {chunkCard.map((card: any) => (
                                        <CradWrap
                                            size={4}
                                            key={card.tokenId}
                                        >
                                            <CradContent>
                                                <ThumnailBox>
                                                    <Labels>
                                                        <LabelIcon
                                                            src="/img/main/ic_label_live.svg"
                                                            alt="live"
                                                        />
                                                        <LabelIcon
                                                            src="/img/main/ic_label_hot.svg"
                                                            alt="hot"
                                                        />
                                                    </Labels>
                                                    <Thumnail src={card.imgae} />
                                                </ThumnailBox>
                                                <ContentsBody>
                                                    <ContentsBackground background={card.imgae} />
                                                    <ContentsDeem>
                                                        <Profile>
                                                            <ProfileImageBox>
                                                                <ProfileImage src={card.profile} />
                                                            </ProfileImageBox>
                                                            <CreatorName>{card.name}</CreatorName>
                                                        </Profile>
                                                        <Description>
                                                            {card.description}
                                                        </Description>
                                                    </ContentsDeem>
                                                </ContentsBody>
                                            </CradContent>
                                        </CradWrap>
                                    ))}
                                </CardSection>
                            </KeenSliderBox>
                        )))}
                    </KeenSlider>
                    {slideLoaded && instanceRef.current && instanceRef.current.track.details && (
                        <>
                            <ArrowButton
                                left
                                disabled={currentSlide === 0}
                                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                            >
                                <Arrows
                                    left
                                    src="/img/main/ic_drop_market_arrow.png"
                                />
                            </ArrowButton>

                            <ArrowButton
                                left={false}
                                disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
                                onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                            >
                                <Arrows
                                    left={false}
                                    src="/img/main/ic_drop_market_arrow.png"
                                />
                            </ArrowButton>
                        </>
                    )}
                </NavigationWrapper>
                <PremiumMarketText>
                    {t('About.aboutMarketNoti')}
                </PremiumMarketText>
            </Container>
        </DropMarketSection>
    );
}

const DropMarketSection = styled.div`
    background-color: ${colors.BlueGray350};
`;

const Container = styled.div`
    width: 1280px;
    padding: 80px 20px 100px 20px;
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 32px;
    font-family: ${fonts.Tinos};
    color: ${colors.Black100};
    text-align: center;
`;

const Information = styled.div`
    margin-top: 24px;
`;

const SubTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    text-align: center;
`;

const NavigationWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

const KeenSlider = styled.div`
    width: 1268px !important;
    height: 684px;
    position: relative;
    z-index: 1;
    margin: 0 -14px;
`;

const KeenSliderBox = styled.div`
    overflow: inherit !important;
`;

const CardSection = styled.div`
    display: flex;
    align-items: center;
    margin-top: 44px;
`;

const ArrowButton = styled.div<{disabled: boolean, left: boolean}>`
    position: absolute;
    top: 48%;
    left: ${(props) => (props.left ? '-47px' : 'inherit')};
    right: ${(props) => (props.left ? 'inherit' : '-47px')};
    transform: translate(0, -50%);
    width: 78px;
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.White100};
    border-radius: 50%;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
    cursor: pointer;
    z-index: 2;
`;

const Arrows = styled('img')<{left: boolean}>`
    transform: rotate(${(props) => (props.left ? 0 : '180deg')});
`;

const PremiumMarketText = styled.div`
    font-size: 14px;
    text-align: center;
    color: ${colors.BlueGray700};
`;

const CradWrap = styled.div<{size: number}>`
    padding: 0 14px;
    padding-bottom: 44px;
    width: calc(100% / ${(props) => (props.size)});
`;

const Labels = styled.div`
    position: absolute;
    left: 16px;
    top: 20px;
    display: flex;
    align-items: center;
`;

const LabelIcon = styled('img')`
    width: 60px;
    margin-right: 10px;
`;

const CradContent = styled.div`
    border-radius: 12px;
    overflow: hidden;
    background-color: ${colors.BlueGray200};
    transition: all .1s ease;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
    position: relative;
`;

const ThumnailBox = styled.div`
    height: 240px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Thumnail = styled('img')`
    width: 100%;
`;

const ContentsBody = styled.div`
    width: 100%;
    height: 280px;
    overflow: hidden;
    position: relative;
`;

const ContentsBackground = styled.div<{background: string}>`
    background-image: url(${(props) => (props.background)});
    background-position: center center;
    filter: blur(16px);
    opacity: 0.9;
    width: 100%;
    height: 280px;
    overflow: hidden;
    transform: scale(1.8);
`;

const ContentsDeem = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${rgba(colors.Black100, 0.25)};
    z-index: 3;
    padding: 13px 16px 25px 16px;
    display: flex;
    flex-direction: column;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileImageBox = styled.div`
    border-radius: 50%;
    width: 28px;
    height: 28px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileImage = styled('img')`
    width: 28px;
`;

const CreatorName = styled.div`
    color: ${colors.White100};
    margin-left: 6px;
    font-size: 13px;
`;

const Description = styled.div`
    margin-top: 24px;
    color: ${colors.BlueGray400};
    font-size: 14px;
    line-height: 1.5;
`;

export default AboutMainVisualSlide;
