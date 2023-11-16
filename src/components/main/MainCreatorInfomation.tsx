import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const CreatorArr = () => [
    {
        id: 1,
        imgae: '/img/main/img_creator_info_01.png',
    },
    {
        id: 2,
        imgae: '/img/main/img_creator_info_02.png',
    },
];

function HomeMainVisual() {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [, setLoaded] = useState(true);
    const slides = CreatorArr();
    const nftCount = 2;
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            loop: true,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            created() {
                setLoaded(true);
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
                    }, 8000);
                }
                slider.on('created', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;

                        if (nftCount > 1) {
                            nextTimeout();
                        }
                    });

                    if (nftCount > 1) {
                        nextTimeout();
                    }
                });
                slider.on('dragStarted', clearNextTimeout);
                slider.on('animationEnded', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;

                        if (nftCount > 1) {
                            nextTimeout();
                        }
                    });

                    if (nftCount > 1) {
                        nextTimeout();
                    }
                });
                slider.on('updated', () => {
                    slider.container.addEventListener('mouseover', () => {
                        mouseOver = true;
                        clearNextTimeout();
                    });
                    slider.container.addEventListener('mouseout', () => {
                        mouseOver = false;

                        if (nftCount > 1) {
                            nextTimeout();
                        }
                    });

                    if (nftCount > 1) {
                        nextTimeout();
                    }
                });
            },
        ],
    );

    return (
        <HomeMainVisualSection>
            <Title>무엇이든 물어보세요.</Title>
            <SubTitleBox>
                <SubTitle>탄탄 프리미엄 컬렉션에서 상품을 판매하세요.</SubTitle>
                <CreatorButton onClick={() => window.open('https://forms.gle/xmxny3Jt7AzXkKz9A')}>파트너 크리에이터 신청하기</CreatorButton>
            </SubTitleBox>
            <KeenSlider
                ref={sliderRef}
                className="keen-slider"
            >
                {slides.map((card: any, idx: number) => (
                    <KeenSliderItem
                        key={`${idx}-${card.id}`}
                        className="keen-slider__slide"
                    >
                        <SlideImage
                            src={card.imgae}
                        />

                    </KeenSliderItem>
                ))}
                <DotsBox className="dots">
                    {slides.map((card: any, idx: number) => (
                        <Dot
                            key={`${card.id}-${idx}`}
                            onClick={() => {
                                instanceRef.current?.moveToIdx(idx);
                            }}
                            active={currentSlide === idx}
                        />
                    ))}
                </DotsBox>
            </KeenSlider>
        </HomeMainVisualSection>
    );
}

const HomeMainVisualSection = styled.section`
    width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    padding-top: 60px;
`;

const KeenSlider = styled.div`
    margin-top: 24px;
    position: relative;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${colors.Black100};
    font-weight: 700;
`;

const SubTitleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CreatorButton = styled.div`
    width: 220px;
    height: 58px;
    border-radius: 999px;
    border: 1px solid ${colors.Black200};
    color: ${colors.Black200};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
        background-color: ${colors.BlueGray300};
    }
`;

const SubTitle = styled.div`
    font-size: 14px;
    color: ${colors.BlueGray700};
    margin-top: 12px;
`;

const KeenSliderItem = styled.div`
    width: 100%;
`;

const SlideImage = styled('img')`
    width: 100%;
`;

const DotsBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%, 0);
`;

const Dot = styled.div<{active: boolean}>`
    height: 8px;
    background-color: ${colors.White100};
    margin: 0 4px;
    cursor: pointer;
    width: ${(props) => (props.active ? '16px' : '8px')};
    border-radius: ${(props) => (props.active ? '4px' : '50%')};
    opacity: ${(props) => (props.active ? 1 : '0.2')};
`;

export default HomeMainVisual;
