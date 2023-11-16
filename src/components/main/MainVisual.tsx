import React, {
    useState, useEffect, useCallback,
} from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors, fonts } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { nl2br } from '@utils/help';
import { Store } from 'react-notifications-component';
import { Axios } from '@utils/api';
import { useTranslation } from 'react-i18next';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import Slider from 'react-slick';

// Interface
import { ISlideCard } from '@interface/common';

function HomeMainVisual() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [nfts, setNft] = useState<ISlideCard[]>([]);
    const [customeSlider, setCustomeSliderf] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isSound, setSound] = useState<boolean>(false);
    const [loaded, setLoaded] = useState(false);

    const settings = {
        initialSlide: 0,
        beforeChange: (_slide, newSlide) => setCurrentSlide(newSlide),
        dots: true,
        autoplay: true,
        fade: true,
        speed: 2000,
        autoplaySpeed: 6000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const unmuted = () => {
        setSound(true);
        const player: any = document.getElementById('vid');
        player.muted = false;
    };

    const muted = () => {
        setSound(false);
        const player: any = document.getElementById('vid');
        player.muted = true;
    };

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const handleClick = () => {
        const { contract_address, asset_id } = nfts[currentSlide];

        navigate(`/marketplace/${contract_address}/${asset_id}`);
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
                setLoaded(true);
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
        <HomeMainVisualSection>
            {loaded && nfts.length > 0 && (
                <CustomSlick
                    ref={setCustomeSliderf}
                    {...settings}
                >
                    {nfts.map(((card: ISlideCard) => (
                        <SlickSliderItem
                            key={`${card.asset_id}-${card.market_id}`}
                        >
                            {card.more_info_url2 && card.slide_ani_gb === 1 && (
                                <VideoFile
                                    id="vid"
                                    loop
                                    autoPlay
                                    controls
                                    muted
                                    controlsList="nodownload"
                                    poster={card.more_info_url2}
                                >
                                    <source
                                        src="/img/test.mp4"
                                        type="video/mp4"
                                    />
                                </VideoFile>
                            )}

                            {card.more_info_url2 && card.slide_ani_gb === 0 && (
                                <ImageFile bg={card.more_info_url2} />
                            )}
                            <SlideContainer>
                                <ContainerBox>
                                    <CardContents>
                                        {card.market_main_slide_name && <Title dangerouslySetInnerHTML={{ __html: nl2br(card.market_main_slide_name) }} />}
                                        <ProfileBox>
                                            <Profile>
                                                <Images src={card.user_profileImg || '/img/common/img_default_profile.png'} />
                                                {card.creator_vip_gb !== 1 && <CertificationImage src="/img/main/ic_home_certify.svg" />}
                                            </Profile>
                                            <UserName>
                                                Creator
                                                <span>{card.user_name}</span>
                                            </UserName>
                                        </ProfileBox>
                                        <ProgressBox>
                                            {card.supply > 1 && (
                                                <>
                                                    <ProgressTextBox>
                                                        <QuantityPercent>
                                                            {progress(card.supply, card.quantity) || 0}
                                                            <span>%</span>
                                                        </QuantityPercent>
                                                        <Price>
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
                                            onClick={handleClick}
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
                                    </CardContents>

                                    {card.more_info_url2 && card.slide_ani_gb === 1 && (
                                        <SoundBox>
                                            {!isSound && (
                                                <Muted
                                                    src="/img/main/ic_sound_off.svg"
                                                    onClick={unmuted}
                                                />
                                            )}
                                            {isSound && (
                                                <Unmuted
                                                    src="/img/main/ic_sound_on.svg"
                                                    onClick={muted}
                                                />
                                            )}
                                        </SoundBox>
                                    )}

                                    {customeSlider && nfts.length > 1 && (
                                        <ArrowButtonBox>
                                            <ArrowButton
                                                onClick={customeSlider.slickPrev}
                                            >
                                                <Arrows
                                                    left
                                                    src="/img/layout/header/ic_arrows.svg"
                                                />
                                            </ArrowButton>

                                            <ArrowButton
                                                onClick={customeSlider.slickNext}
                                            >
                                                <Arrows
                                                    left={false}
                                                    src="/img/layout/header/ic_arrows.svg"
                                                />
                                            </ArrowButton>
                                        </ArrowButtonBox>
                                    )}
                                </ContainerBox>
                            </SlideContainer>
                        </SlickSliderItem>
                    )))}
                </CustomSlick>
            )}
            {nfts.length === 0 && (
                <SkeletonTheme
                    baseColor={colors.BlueGray400}
                    highlightColor={colors.BlueGray200}
                >
                    <Skeleton
                        width="100%"
                        height="930px"
                    />
                </SkeletonTheme>
            )}
        </HomeMainVisualSection>
    );
}

const CustomSlick = styled(Slider)`
    height: 930px;
    overflow: hidden;

    .slick-dots {
        bottom: 86px;

        & li {
            margin: 0;
        }

        & li,
        & li button {
            width: 64px;
            height: 2px;
            overflow: hidden;

            &:before {
                display: none;
            }
        }

        & li button {
            background-color: ${rgba(colors.White100, 0.3)};
        }

        & li.slick-active,
        & li.slick-active button {
            width: 64px;
            height: 3px;
            overflow: hidden;

            &:before {
                display: none;
            }
        }
        
        & li.slick-active button {
            background-color: ${colors.White100};
        }
    }
`;

const VideoFile = styled.video`
    height: 100%;
`;

const ImageFile = styled.div<{bg: string}>`
    background-image: url(${(props) => (props.bg)});
    width: 100%;
    height: 930px;
    background-position: center center;
    background-repeat: no-repeat; 
`;

const HomeMainVisualSection = styled.section`
    width: 100%;
    height: 930px;
    overflow: hidden;
`;

const SlideContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`;

const ContainerBox = styled.div`
    width: 1600px;
    height: 930px;
    overflow: hidden;
    margin: 0 auto;
    padding-bottom: 190px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const CardContents = styled.div`
    margin-top: auto;
`;

const Title = styled.div`
    font-size: 28px;
    font-weight: 500;
    line-height: 1.2;
    color: ${colors.White100};
    display: -webkit-box;
    -webkit-line-clamp: 2; //원하는 라인수
    -webkit-box-orient: vertical;
    height: 80px;
    overflow: hidden;
`;

const ProfileBox = styled.div`
    display: flex;
    align-items: center;
    margin-top: 12px;
`;

const Profile = styled.div`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-right: 14px;
`;

const CertificationImage = styled('img')`
    width: 16px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: -6px;
`;

const Images = styled('img')`
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid ${colors.White100};
`;

const UserName = styled.div`
    font-size: 14px;
    color: ${rgba(colors.White100, 0.8)};
    font-family: ${fonts.Tinos};

    span {
        font-family: 'inherit';
        font-size: 14px;
        color: ${colors.White100};
        margin-left: 4px;
    }
`;

const SoundBox = styled.div`
    position: absolute;
    bottom: 90px;
    right: 144px;
`;

const Muted = styled('img')`
    cursor: pointer;
`;

const Unmuted = styled('img')`
    cursor: pointer;
`;

const ProgressBox = styled.div`
    width: 360px;
    min-height: 31px;
    margin-top: 32px;
`;

const SupplyQuantityProgressBar = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${rgba(colors.BlueGray400, 0.3)};
    border-radius: 999px;
    overflow: hidden;
`;

const ProgressBar = styled.div<{perc: number}>`
    width: ${(props) => (props.perc ? `${props.perc}%` : 0)};
    height: 1px;
    border-radius: 999px;
    background: linear-gradient(90deg, #F7941D 0%, #F0DC2D 100%);
`;

const QuantityPercent = styled.div`
    font-size: 16px;
    color: ${colors.White100};
    font-weight: 500;

    span {
        font-size: 13px;
        font-weight: 400;
        margin-left: 2px;
    }
`;

const ProgressTextBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
`;

const Price = styled.div`
    font-size: 16px;
    color: ${colors.White100};
    display: flex;
    align-items: center;

    span {
        font-size: 13px;
        margin-left: 4px;
    }
`;

const CardButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.White100};
    cursor: pointer;
    transition: all .2s ease;
    border: 0;
    margin-top: 24px;
    background-color: ${rgba(colors.White100, 0.1)};
    width: 184px;
    height: 64px;
    border-radius: 999px;

    &:hover {
        background-color: ${rgba(colors.White100, 0.1)};
    }

    &:disabled {
        background-color: ${rgba(colors.White100, 0.1)};
        cursor: not-allowed;
        border: 0;
        color: ${colors.White100};
        background-image: url('/img/main/ic_category_arrow.svg');
        background-repeat: no-repeat; 
        transition: all .2s ease;
    }
`;

const SlickSliderItem = styled.div`
    width: 100%;
    height: 930px;
    overflow: hidden;
    position: relative;
`;

const ArrowButtonBox = styled.div`
    position: absolute;
    bottom: 90px;
    right: 0;
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 0;
`;

const ArrowButton = styled.div`
    width: 60px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .2s ease;
    background-color: transparent;
    border: 1px solid ${colors.White100};

    &:last-of-type {
        border-left: 0;
    }

    &:hover {
        transition: all .2s ease;
        background-color: ${rgba(colors.White100, 0.1)};
    }
`;

const Arrows = styled('img')<{left: boolean}>`
    transform: rotate(${(props) => (props.left ? 0 : '180deg')});
`;

export default HomeMainVisual;
