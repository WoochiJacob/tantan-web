import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { nl2br } from '@utils/help';
import { useTranslation } from 'react-i18next';

const SlideArr = () => [
    {
        id: 3,
        title: '플랫폼 서비스 확장\n멀티체인 지원',
        years: '2023',
        items: [
            '카카오 클립(Klip) 간편 로그인 개발',
            '토스(Toss) 간편 결제 개발',
            '커뮤니티 활성화',
        ],
    },
    {
        id: 4,
        title: '서비스 고도화 및 안정화',
        years: '2023',
        items: [
            '카카오 클립(Klip) 간편 로그인 지원',
            '토스(Toss) 간편 결제 지원',
            '탄탄 상품 판매',
            '크라우드펀딩 서비스 오픈',
            '플랫폼 제휴 확대',
        ],
    },
    {
        id: 1,
        title: '플랫폼 서비스 확장\n멀티체인 지원',
        years: '2024',
        items: [
            '크라우드펀딩 서비스 개발',
            '부동산 서비스 개발',
            'P2E',
            '추가 거래 기능 활성화',
            '탄탄 모바일 앱 개발',
        ],
    },
    {
        id: 2,
        title: '모바일 앱 출시\n서비스 고도화 및 안정화',
        years: '2024',
        items: [
            '탄탄 모바일 앱 출시',
            '사용자 중심의 거래 경험 고도화',
        ],
    },
];

function AboutLoadmap() {
    const { t } = useTranslation();
    const slideCard = SlideArr();
    const [slideLoaded, setSlideLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
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
        <SectionBackground>
            <Container>
                <TitleBox>
                    <Title>{t('About.aboutLoadMapTitle')}</Title>
                    <Description>
                        <DescriptionActiveText dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutLoadMapDescription_01')) }} />
                        <DescriptionText dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutLoadMapDescription_02')) }} />
                    </Description>
                </TitleBox>
                <LoadMapSection>
                    <SlideContainer>
                        <NavigationWrapper>
                            <KeenSlider
                                ref={sliderRef}
                                className="keen-slider"
                            >
                                {slideCard.map(((load: any) => (
                                    <KeenSliderItem
                                        key={load.id}
                                        className="keen-slider__slide"
                                    >
                                        <LoadTitleBox>
                                            <LoadMapTitle>
                                                {load.id}
                                                {t('About.aboutLoadMapSection')}
                                            </LoadMapTitle>
                                            <LoadMapYears>
                                                {load.years}
                                                {t('About.aboutLoadMapYears')}
                                            </LoadMapYears>
                                        </LoadTitleBox>
                                        <LoadName dangerouslySetInnerHTML={{ __html: nl2br(load.title) }} />
                                        {load.items.map((item: any) => (
                                            <LoadItems
                                                key={item}
                                            >
                                                -
                                                {' '}
                                                {item}
                                            </LoadItems>
                                        ))}
                                    </KeenSliderItem>
                                )))}
                            </KeenSlider>
                            {slideLoaded && instanceRef.current && instanceRef.current.track.details && (
                                <ArrowButtonGroup>
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
                                </ArrowButtonGroup>
                            )}
                        </NavigationWrapper>
                    </SlideContainer>
                </LoadMapSection>
            </Container>
        </SectionBackground>
    );
}

const SectionBackground = styled.div`
    background-color: ${colors.BlueGray200};
    padding-top: 80px;
    padding-bottom: 100px;
    background-image: url('/img/about/img_loadmap.svg');
    height: 700px;
    background-repeat: no-repeat;
    background-position: left 330px;
`;

const Container = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

const TitleBox = styled.div`
    flex-basis: calc(100% - 586px);
    padding-top: 40px;
`;

const Title = styled.div`
    font-size: 36px;
    color: ${colors.Black100};
`;

const Description = styled.div`
    margin-top: 24px;
    font-size: 16px;
    color: ${colors.Black100};
    line-height: 1.5;
`;

const DescriptionText = styled.span``;

const DescriptionActiveText = styled.span`
    color: ${colors.Orange100};
`;

const LoadMapSection = styled.div`
    padding-right: 186px;
`;

const SlideContainer = styled.div`
    flex-basis: 430px;
    width: 430px;
    position: relative;
`;

const NavigationWrapper = styled.div`
    position: relative;
`;

const KeenSlider = styled.div`
    min-height: 520px;
    position: relative;
`;

const KeenSliderItem = styled.div`
    min-height: 520px;
    background-color: ${colors.White100};
    border: 4px solid ${colors.Orange100};
    border-radius: 20px;
    width: 400px !important;
    min-width: 400px !important;
    margin: 0 15px !important;
    padding: 63px 50px;
    padding-bottom: 0;
`;

const LoadTitleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LoadMapTitle = styled.div`
    font-size: 20px;
    color: ${colors.Black100};
`;

const LoadMapYears = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
`;

const LoadName = styled.div`
    margin-top: 24px;
    font-size: 20px;
    color: ${colors.Black100};
    font-weight: 500;
    padding-bottom: 24px;
`;

const LoadItems = styled.div`
    margin: 10px 0;
    font-size: 14px;
    color: ${colors.Black100};
`;

const ArrowButton = styled.div<{disabled: boolean, left: boolean}>`
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
`;

const Arrows = styled('img')<{left: boolean}>`
    width: 32px;    
    transform: rotate(${(props) => (props.left ? 0 : '180deg')});
`;

const ArrowButtonGroup = styled.div`
    display: flex;
    width: 152px;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    left: calc(100% + 34px);
    bottom: 0;
`;

export default AboutLoadmap;
