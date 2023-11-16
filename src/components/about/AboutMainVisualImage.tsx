import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { rgba } from 'emotion-rgba';

const SlideArr = [
    {
        imgae: '/img/about/img_main_01.png',
        profile: '/img/about/img_profile_01.png',
        name: 'Jacob',
        description: '빛의 신비함을 색채로 표현한 크리에이터 다양한 색감에서 오는 영감을 놓치지 않고 비너스상에 투영했습니다. 구상과 추상의 중간인 반추상으로 형상화된 그의 그림은 동적인 정서를 담아냅니다.',
        tokenId: 1,
    },
    {
        imgae: '/img/about/img_main_02.png',
        profile: '/img/about/img_profile_02.png',
        name: '더원(The One)',
        description: '허스키한 목소리와 애절한 음색, 폭발적인 가창력에풍부한 감성이 더해진 명품 발라드로 대중들의사랑을 받아온 대한민국 대표 보컬리스트 더 원.숨겨둔 미공개곡을 소장할 수 있는 단 한번의 기회!더원을 가까이에서 만나는 ‘골든티켓’의 주인은?',
        tokenId: 2,
    },
    {
        imgae: '/img/about/img_main_03.png',
        profile: '/img/about/img_profile_03.png',
        name: 'BCM2022 부산콘텐츠마켓',
        description: '다채로운 콘텐츠를 통한 위로와 회복의 공감대를 제공하고, ‘우리의 이야기가 세계의 이야기’가 되는 글로벌 방송영상 비즈니스 축제의 장! 2022년 6월 부산에서 개최되는 제 16회 부산콘텐츠마켓 2022를 기념하는 BCM2022의 포스터입니다.',
        tokenId: 3,
    },
];

function AboutMainVisualImage() {
    const slideCard = SlideArr;
    const [slideLoaded, setSlideLoaded] = useState(false);
    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
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
                    }, 3000);
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

    useEffect(() => {
        setTimeout(() => {
            setSlideLoaded(true);
        }, 100);
    }, []);

    return (
        <SlideContainer>
            <NavigationWrapper>
                {slideLoaded && (
                    <KeenSlider
                        ref={sliderRef}
                        className="keen-slider"
                    >
                        {slideCard.map(((card: any) => (
                            <KeenSliderItem
                                key={card.tokenId}
                                className="keen-slider__slide"
                            >
                                <CradWrap size={1}>
                                    <CradContent>
                                        <ThumnailBox>
                                            <Labels>
                                                <LabelIcon
                                                    src="/img/about/ic_label_live.svg"
                                                    alt="live"
                                                />
                                                <LabelIcon
                                                    src="/img/about/ic_label_hot.svg"
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
                            </KeenSliderItem>
                        )))}
                    </KeenSlider>
                )}
            </NavigationWrapper>
        </SlideContainer>
    );
}

const LabelIcon = styled('img')`
    width: 60px;
    margin-right: 10px;
`;

const SlideContainer = styled.div`
    color: ${colors.White100};
    flex-basis: 474px;
    width: 474px;
    padding-top: 100px;
`;

const NavigationWrapper = styled.div`
    width: 100%;
    background-image: url('/img/about/img_main_bg.png');
    background-repeat: no-repeat;
    padding-top: 102px;
    padding-left: 136px;
`;

const KeenSlider = styled.div``;

const KeenSliderItem = styled.div`
    width: 329px !important;
    height: 561px;
    border-radius: 12px;
    overflow: hidden;
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

    span {
        margin-right: 8px !important;
    }
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

export default AboutMainVisualImage;
