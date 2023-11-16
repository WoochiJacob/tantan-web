import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import { useTranslation } from 'react-i18next';

interface INoticeModal {
    handleNoticeModal: (action: string) => void;
}

function HomeNoticeModals({ handleNoticeModal } :INoticeModal) {
    const { t } = useTranslation(); // default ns 'common'
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const nftCount = 2;
    const slideItems = [
        {
            id: 1,
            image: '/img/events/img_event_08.png',
            link: '',
        },
    ];
    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
        {
            initial: 0,
            loop: true,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel);
            },
            created() {
                // setLoaded(true);
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
                    }, 3000);
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

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <>
            <Container onClick={() => handleNoticeModal('default')} />
            <Modals>
                <ModalHead>
                    {t('Home.homeNoticeModalTitle')}
                    <CloseButton onClick={() => handleNoticeModal('default')} />
                </ModalHead>
                <ModalBody>
                    <KeenSlider
                        ref={sliderRef}
                        className="keen-slider"
                    >
                        {slideItems.map((item) => (
                            <KeenSliderItem
                                key={item.id}
                                className="keen-slider__slide"
                            >
                                <SlideImage
                                    src={item.image}
                                    onClick={() => window.location.assign(item.link)}
                                />
                            </KeenSliderItem>
                        ))}
                    </KeenSlider>

                    {slideItems.length > 1 && (
                        <DotsBox className="dots">
                            {slideItems.map((item, idx) => (
                                <Dot
                                    key={`${item.id}-${idx}`}
                                    onClick={() => {
                                        instanceRef.current?.moveToIdx(idx);
                                    }}
                                    active={currentSlide === idx}
                                />
                            ))}
                        </DotsBox>
                    )}
                    <ConfirmButton onClick={() => handleNoticeModal('default')}>
                        {t('Home.homeNoticeModalConfirm')}
                    </ConfirmButton>
                    <NoShowButton onClick={() => handleNoticeModal('day')}>
                        {t('Home.homeNoticeModalDaysBtn')}
                    </NoShowButton>
                </ModalBody>
            </Modals>
        </>
    );
}

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10001;
    background-color: ${rgba(colors.Black200, 0.8)};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modals = styled.div`
    width: 500px;
    background-color: ${colors.White100};
    border-radius: 12px;
    min-height: 512px;
    padding: 30px;
    padding-top: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10002;
`;

const KeenSlider = styled.div``;

const KeenSliderItem = styled.div`
    width: 100%;
    height: 440px;
    cursor: pointer;
`;

const SlideImage = styled('img')`
    width: 100%;
`;

const ModalHead = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${colors.Black100};
    padding: 16px 0;
    border-bottom: 1px solid ${colors.WarmGray200};
    text-align: center;
    position: relative;
`;

const ModalBody = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
`;

const CloseButton = styled.div`
    width: 32px;
    height: 32px;
    background-image: url('/img/main/modal/ic_modal_close.svg');
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
    transition: all .2s ease;

    &:hover {
        transition: all .2s ease;
        background-image: url('/img/main/modal/ic_modal_close_black.svg');
    }
`;

const ConfirmButton = styled.div`
    margin-top: 24px;
    width: 100%;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.Orange100};
    border-radius: 8px;
    font-size: 16px;
    color: ${colors.White100};
    cursor: pointer;
`;

const NoShowButton = styled.div`
    margin-top: 12px;
    width: 100%;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    font-size: 16px;
    color: ${colors.Black100};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

const DotsBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;

const Dot = styled.div<{active: boolean}>`
    height: 8px;
    background-color: ${colors.Black100};
    margin: 0 4px;
    cursor: pointer;
    width: ${(props) => (props.active ? '16px' : '8px')};
    border-radius: ${(props) => (props.active ? '4px' : '50%')};
    opacity: ${(props) => (props.active ? 1 : '0.2')};
`;

export default HomeNoticeModals;
