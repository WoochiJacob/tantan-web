/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';

const CreateInfo = (t: any) => [
    {
        id: 1,
        image: '/img/about/ic_twiiter.svg',
        hover: '/img/about/ic_twiiter_hover.svg',
        background: '#1da1f2',
        name: t('About.aboutTwitter'),
        link: 'https://twitter.com/tantanNFT',
    },
    {
        id: 2,
        image: '/img/about/ic_discode.svg',
        hover: '/img/about/ic_discode_hover.svg',
        background: '#5865f1',
        name: t('About.aboutDiscord'),
        link: 'https://discord.com/invite/sqQSK54ZY2',
    },
    // {
    //     id: 3,
    //     image: '/img/about/ic_instargram.svg',
    //     hover: '/img/about/ic_instargram_hover.svg',
    //     background: 'linear-gradient(48deg, #fd5, #fd5 10%, #ff543e 48%, #c837ab 97%)',
    //     name: t('About.aboutIntstargram'),
    //     link: 'https://www.instagram.com/tantanNFT',
    // },
    {
        id: 4,
        image: '/img/about/ic_naver_blog.svg',
        hover: '/img/about/ic_naver_blog_hover.svg',
        background: '#00c63b',
        name: t('About.aboutNaverBlog'),
        link: 'https://blog.naver.com/tantan',
    },
    // {
    //     id: 5,
    //     image: '/img/about/ic_midium.svg',
    //     hover: '/img/about/ic_midium_hover.svg',
    //     background: '#1c1b1a',
    //     name: t('About.aboutMedium'),
    //     link: 'https://medium.com/@tantan.io',
    // },
    {
        id: 6,
        image: '/img/about/ic_telegram.svg',
        hover: '/img/about/ic_telegram_hover.svg',
        background: '#229ed9',
        name: t('About.aboutTelegram'),
        link: 'https://t.me/tantanNFT',
    },
];

function AboutComunity() {
    const { t } = useTranslation();
    const createInfo = CreateInfo(t);

    return (
        <SectionBackground>
            <Container>
                <Title>{t('About.aboutSnsTitle')}</Title>
                <SubTitle>{t('About.aboutSnsDesc')}</SubTitle>
                <ComunityGroup>
                    {createInfo.map((sns: any) => (
                        <InfoItem key={sns.id}>
                            <InfoContents
                                bg={sns.background}
                                image={sns.image}
                                hover={sns.hover}
                                onClick={() => window.open(sns.link)}
                            >
                                <ComunityItem>
                                    <ComunityName>{sns.name}</ComunityName>
                                    {t('About.aboutSnsMoreDetail')}
                                </ComunityItem>
                            </InfoContents>
                        </InfoItem>
                    ))}
                </ComunityGroup>
            </Container>
        </SectionBackground>
    );
}

const SectionBackground = styled.div`
    background-color: ${colors.BlueGray350};
    padding: 100px 0;
`;

const Container = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 24px;
    color: ${colors.Black100};
    text-align: center;
`;

const SubTitle = styled.div`
    margin-top: 24px;
    color: ${colors.Black100};
    font-size: 16px;
    text-align: center;
`;

const ComunityGroup = styled.div`
    margin: 54px -10px 0 -10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;

const InfoItem = styled.div`
    flex-basis: 16.66%;
    width: 16.66%;
    padding: 0 10px;
`;

const InfoContents = styled.div<{ bg: string; image: string; hover: string }>`
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
    border: 1px solid ${colors.BlueGray500};
    background-color: ${colors.White100};
    border-radius: 20px;
    text-align: center;
    cursor: pointer;
    min-height: 170px;
    color: ${colors.Black100};
    padding-top: 24px;
    transition: all 0.2s ease;

    a {
        color: ${colors.BlueGray700};
        font-size: 14px;
        display: flex;
        align-items: center;
        margin: 0 auto;
        justify-content: center;

        &::after {
            width: 7px;
            height: 14px;
            display: block;
            background-image: url('/img/about/ic_sns_more.png');
            content: '';
            margin-left: 4px;
        }
    }

    &::before {
        background-image: url(${(props) => `${props.image}`});
        width: 48px;
        height: 48px;
        margin: 0 auto;
        display: block;
        content: '';
        transition: all 0.2s ease;
    }

    &:hover {
        background: ${(props) => props.bg};
        color: ${colors.White100};
        transition: all 0.2s ease;

        &::before {
            background-image: url(${(props) => `${props.hover}`});
            transition: all 0.2s ease;
        }

        a {
            color: ${colors.White100};
            font-size: 14px;

            &::after {
                background-image: url('/img/about/ic_sns_more_hover.png');
            }
        }
    }
`;

const ComunityItem = styled.div``;

const ComunityName = styled.div`
    text-align: center;
    margin-top: 15px;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
`;

export default AboutComunity;
