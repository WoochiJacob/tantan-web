import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useKeenSlider } from 'keen-slider/react';
import { Store } from 'react-notifications-component';
import { Axios } from '@utils/api';
import 'keen-slider/keen-slider.min.css';
import { useTranslation } from 'react-i18next';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// Interface
import { IModal } from '@interface/home';
import { ISlideCard } from '@interface/common';

function HomeMainVisualSlide({ toggle }: IModal) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [nfts, setNft] = useState<ISlideCard[]>([]);
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const [loaded, setLoaded] = useState(true);
    let nftCount = 0;
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

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const progress = useCallback((supply: number, quantity: number): number => {
        const perc = ((supply - quantity) / supply) * 100;
        const percParseInt = parseInt(perc.toString(), 10);

        if (!percParseInt) return 0;
        return percParseInt;
    }, []);

    const loadNFTs = async () => {
        const formData = new FormData();
        formData.append('select', 'all');

        try {
            const { data } = await Axios('smarketlist', formData);

            if (data) {
                setNft(Object.values(data));
                nftCount = Object.values(data).length;
            }
        } catch (error) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundSlide'),
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
        <SlideContainer>
            <NavigationWrapper>
                {nfts.length > 0 && (
                    <KeenSlider
                        ref={sliderRef}
                        className="keen-slider"
                    >
                        {nfts.map(((card: ISlideCard) => (
                            <KeenSliderItem
                                key={`${card.asset_id}-${card.market_id}`}
                                className="keen-slider__slide"
                            >
                                <TicketIcon>
                                    <Images
                                        src="/img/common/ic_premium_badge.svg"
                                    />
                                </TicketIcon>
                                <CardWrapper>
                                    <LabelBox>
                                        {card.adult_gb.toString() === '1' && (
                                            <AdultIcon
                                                src="/img/common/ic_adult.svg"
                                                alt="adult"
                                            />
                                        )}
                                    </LabelBox>
                                    <Thumnail
                                        onClick={() => navigate(`/marketplace/${card.contract_address}/${card.asset_id}`)}
                                    >
                                        <CardImage src={card.more_info_url ? card.more_info_url : card.market_thumbnail} />
                                    </Thumnail>
                                    <CardDetail>
                                        <Profile>
                                            <ProfileWrap>
                                                <ProfileCircle>
                                                    <ProfileImage src={card.user_profileImg || '/img/common/img_default_profile.png'} />
                                                </ProfileCircle>
                                                {card.creator_vip_gb === 1 && <CertificationImage src="/img/main/ic_home_certify.svg" />}

                                            </ProfileWrap>
                                        </Profile>
                                        <CreatorInfo>
                                            <Creator>
                                                <span>{t('Home.homeSlideCreator')}</span>
                                                {card.user_name}
                                            </Creator>
                                            <Title>{card.market_name}</Title>
                                        </CreatorInfo>

                                        {/* 판매율 */}
                                        <ProgressBox>
                                            {card.supply > 1 && (
                                                <>
                                                    <ProgressTextBox>
                                                        <QuantityPercent>
                                                            {progress(card.supply, card.quantity) || 0}
                                                            <span>%</span>
                                                        </QuantityPercent>
                                                        <Price>
                                                            <SymbolIcon src={`/img/main/ic_slide_${card.market_symbol}.svg`} />
                                                            {card.price.toLocaleString()}
                                                            <span>{card.market_symbol}</span>
                                                        </Price>
                                                    </ProgressTextBox>
                                                    <SupplyQuantityProgressBar>
                                                        <ProgressBar perc={progress(card.supply, card.quantity)} />
                                                    </SupplyQuantityProgressBar>

                                                </>
                                            )}
                                        </ProgressBox>

                                        <CardButton
                                            onClick={() => navigate(`/marketplace/${card.contract_address}/${card.asset_id}`)}
                                            disabled={card.is_end === 1}
                                        >
                                            {card.market_symbol === 'KRW' && (
                                                <div>
                                                    {card.is_end === 1 ? t('Home.homeSlideOrderComplete') : '토스 간편 결제하기'}
                                                </div>
                                            )}

                                            {card.market_symbol !== 'KRW' && (
                                                <div>
                                                    {card.is_end === 1 ? t('Home.homeSlideOrderComplete') : t('Home.homeSlideOrder')}
                                                </div>
                                            )}

                                        </CardButton>
                                    </CardDetail>
                                </CardWrapper>
                            </KeenSliderItem>
                        )))}
                        {loaded && nfts.length > 1 && (
                            <ArrowButtonBox>
                                <ArrowButton
                                    disabled={currentSlide === 0}
                                    onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
                                >
                                    <Arrows
                                        left
                                        src="/img/main/ic_main_arrows.png"
                                    />
                                </ArrowButton>

                                <ArrowButton
                                    disabled={currentSlide === nfts.length - 1}
                                    onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
                                >
                                    <Arrows
                                        left={false}
                                        src="/img/main/ic_main_arrows.png"
                                    />
                                </ArrowButton>
                            </ArrowButtonBox>
                        )}
                    </KeenSlider>
                )}
            </NavigationWrapper>
            {nfts.length > 1 && (
                <DotsBox className="dots">
                    {nfts.map((card: ISlideCard, idx: number) => (
                        <Dot
                            key={`${card.asset_id}-${idx}`}
                            onClick={() => {
                                instanceRef.current?.moveToIdx(idx);
                            }}
                            active={currentSlide === idx}
                        />
                    ))}
                </DotsBox>
            )}

            {nfts.length === 0 && (
                <SlideSkeleton>
                    <SlideBoxSkeleton>
                        <SkeletonTheme
                            baseColor={colors.BlueGray400}
                            highlightColor={colors.BlueGray200}
                        >
                            <Skeleton
                                width={590}
                                height={704}
                            />
                        </SkeletonTheme>
                    </SlideBoxSkeleton>
                </SlideSkeleton>
            )}
        </SlideContainer>
    );
}

const SlideContainer = styled.div`
    color: ${colors.White100};
    flex-basis: 590px;
    width: 590px;
`;

const NavigationWrapper = styled.div`
    position: relative;
    z-index: 1;
`;

const KeenSlider = styled.div`
    position: relative;
    z-index: 1;
`;

const KeenSliderItem = styled.div`
    height: 704px;
    background-color: ${colors.Orange100};
    border-radius: 16px;
`;

const CardWrapper = styled.div`
    width: 560px;
    height: 674px;
    background-color: ${colors.White100};
    border-radius: 0 315px 315px 0;
    overflow: hidden;

`;

const Thumnail = styled.div`
    height: 451px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    background-color: ${colors.BlueGray400};
`;

const CardImage = styled('img')`
    width: 100%;
`;

const CardDetail = styled.div`
    padding: 0 140px 24px 34px;
`;

const Profile = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 58px;
    height: 29px;
`;

const ProfileWrap = styled.div`
    position: relative;
    top: -25px;
    background-color: ${colors.White100};
    border-radius: 50%;
`;

const ProfileCircle = styled.div`
    width: 60px;
    height: 60px;
    border: 3px solid ${colors.White100};
    background-color: ${colors.Black200};
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileImage = styled('img')`
    width: 58px;
    height: 58px;
    object-fit: cover;
`;

const CertificationImage = styled('img')`
    width: 16px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 0;
`;

const CreatorInfo = styled.div`
    font-size: 13px;
`;

const Title = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    font-weight: 500;
    margin-top: 10px;
    height: 50px;
`;

const Creator = styled.div`
    font-size: 13px;
    color: ${colors.Black100};

    span {
        color: ${colors.WarmGray500};
        margin-right: 8px;
    }
`;

const CardButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};
    cursor: pointer;
    transition: all .2s ease;
    border: 0;
    margin-top: 6px;
    background-color: ${rgba(colors.Orange100, 0.15)};
    width: 162px;
    height: 58px;
    border-radius: 29px;

    &::after {
        width: 8px;
        height: 16px;
        background-image: url('/img/main/ic_category_arrow_orange.svg');
        background-repeat: no-repeat;
        cursor: pointer;
        transition: all .2s ease;
        content: '';
        display: block;
        margin-left: 5px;
    }

    &:hover {
        transition: all .2s ease;
        background-color: ${colors.Orange100};
        color: ${colors.White100};

        &::after {
            background-image: url('/img/main/ic_category_arrow.svg');
            transition: all .2s ease;
            background-repeat: no-repeat;
        }
    }

    &:disabled {
        background-color: ${colors.BlueGray500};
        background-repeat: no-repeat;
        cursor: not-allowed;
        border: 0;
        color: ${colors.White100};

        &::after {
            background-image: url('/img/main/ic_category_arrow.svg');
            background-repeat: no-repeat;
            transition: all .2s ease;
        }
    }
`;

const ArrowButtonBox = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 138px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 0;
`;

const ArrowButton = styled.div<{disabled: boolean}>`
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${rgba(colors.White100, 0)};
    border-radius: 50%;
    cursor: pointer;
    transition: all .2s ease;
    opacity: 0.6;

    &:hover {
        transition: all .2s ease;
        background-color: ${rgba(colors.White100, 0.15)};
        opacity: 1;
    }
`;

const Arrows = styled('img')<{left: boolean}>`
    transform: rotate(${(props) => (props.left ? 0 : '180deg')});
`;

const DotsBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
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

const GuideText = styled.div`
    font-size: 13px;
    opacity: 0.4;
    margin-left: 6px;
    transition: all .2s ease;
`;
const GuideBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 16px;
    margin-top: 39px;
`;

const MainVisualGuide = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    &::before {
        width: 18px;
        height: 18px;
        content: '';
        background-image: url('/img/main/ic_guid_modal.svg');
        opacity: 0.4;
        transition: all .2s ease;
    }

    &:hover {
        &::before {
            transition: all .2s ease;
            background-image: url('/img/main/ic_guid_modal_hover.svg');
            opacity: 1;
        }

        & div {
            transition: all .2s ease;
            color: ${colors.White100};
            opacity: 1;
        }
    }
`;

const LabelBox = styled.div`
    position: absolute;
    left: 34px;
    top: 28px;
    display: flex;
    align-items: center;

    span {
        margin-right: 6px !important;
    }
`;

const AdultIcon = styled('img')`
    width: 28px;
    margin-right: 8px;
`;

const TicketIcon = styled.div`
    position: absolute;
    top: 28px;
    right: 34px;
`;

const Images = styled('img')`
    width: 80px;
`;

const SupplyQuantityProgressBar = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${colors.BlueGray400};
    border-radius: 999px;
    overflow: hidden;
`;

const ProgressBar = styled.div<{perc: number}>`
    width: ${(props) => (props.perc ? `${props.perc}%` : 0)};
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, #F7941D 0%, #F0DC2D 100%);
`;

const QuantityPercent = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    font-weight: 500;

    span {
        font-size: 13px;
        font-weight: 00;
    }
`;

const ProgressBox = styled.div`
    flex-basis: 100%;
    min-height: 31px;
`;

const ProgressTextBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
`;

const Price = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    font-weight: 500;
    display: flex;
    align-items: center;

    span {
        font-size: 13px;
        font-weight: 00;
    }
`;

const SymbolIcon = styled('img')`
    width: 18px;
    margin-right: 4px;
`;

const SlideSkeleton = styled.div`
    width: 590px;
    height: 704px;
    border-radius: 16px;
    overflow: hidden;
    background-color: ${colors.Orange100};
`;

const SlideBoxSkeleton = styled.div`
    width: 560px;
    height: 674px;
    border-radius: 0 315px 315px 0;
    overflow: hidden;
`;

export default HomeMainVisualSlide;
