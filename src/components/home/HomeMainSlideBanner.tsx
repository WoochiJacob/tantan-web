import React from 'react';
import styled from '@emotion/styled/macro';
import Slider from 'react-slick';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

function HomeMainSlideBanner() {
    const settings = {
        initialSlide: 0,
        dots: true,
        autoplay: true,
        fade: true,
        speed: 2000,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Contain>
            <CustomSlick
                {...settings}
            >
                <BannerImage src="/img/home/slide/img_banner_01.png" />

                <BannerImage src="/img/home/slide/img_banner_02.png" />
            </CustomSlick>
        </Contain>
    );
}

const Contain = styled.div`
    flex-basis: 1054px;
    height: 220px;
    overflow: hidden;
`;

const BannerImage = styled('img')`
    width: 100%;
`;

const CustomSlick = styled(Slider)`
    height: 220px;
    overflow: hidden;

    .slick-dots {
        display: flex !important;
        padding-left: 60px;
        bottom: 20px;

        & li {
            margin: 0 8px;
        }

        & li,
        & li button {
            width: 8px;
            height: 8px;
            border-radius: 50%;

            &:before {
                display: none;
            }
        }

        & li button {
            background-color: ${rgba(colors.White100, 0.3)};
        }

        & li.slick-active,
        & li.slick-active button {
            width: 16px;
            height: 8px;
            border-radius: 999px;

            &:before {
                display: none;
            }
        }
        
        & li.slick-active button {
            background-color: ${colors.White100};
        }
    }
`;

export default HomeMainSlideBanner;
