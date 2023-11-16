import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { nl2br } from '@utils/help';
import { rgba } from 'emotion-rgba';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CreateInfo = (t:any) => [
    {
        id: 1,
        imgae: '/img/main/img_step_1.png',
        name: t('About.aboutNftInfoSectionItemTitle_01'),
        contents: t('About.aboutNftInfoSectionItem_01'),
        button: true,
        connect: true,
    },
    {
        id: 2,
        imgae: '/img/main/img_step_2.png',
        name: t('About.aboutNftInfoSectionItemTitle_02'),
        contents: t('About.aboutNftInfoSectionItem_02'),
        button: true,
        connect: false,
    },
    {
        id: 3,
        imgae: '/img/main/img_step_3.png',
        name: t('About.aboutNftInfoSectionItemTitle_03'),
        contents: t('About.aboutNftInfoSectionItem_03'),
        button: true,
        connect: false,
    },
];

function AboutInformation() {
    const { t } = useTranslation();
    const createInfo = CreateInfo(t);

    return (
        <SectionBackground>
            <Container>
                <Title>{t('About.aboutNftInfoSectionTitle')}</Title>
                <SubTitle>{t('About.aboutNftInfoSectionDesc')}</SubTitle>

                <Guide>
                    <Link to="/guide">{t('About.aboutNftInfoSectionGuide')}</Link>
                </Guide>

                <InfoWrap>
                    {createInfo.map((info: any) => (
                        <InfoItem
                            key={info.id}
                        >
                            <InfoContents>
                                <InfoIcon src={info.imgae} />
                                <Step>
                                    0
                                    {info.id}
                                </Step>
                                <Name>{info.name}</Name>
                                <Contents dangerouslySetInnerHTML={{ __html: nl2br(info.contents) }} />
                            </InfoContents>
                        </InfoItem>
                    ))}

                </InfoWrap>
            </Container>
        </SectionBackground>
    );
}

const SectionBackground = styled.div`
    background-color: ${colors.Black100};
    padding-top: 80px;
    padding-bottom: 140px;
`;

const Container = styled.div`
    width: 1280px;
    padding: 80px 20px 0 20px;
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 36px;
    color: ${colors.White100};
    text-align: center;
`;

const SubTitle = styled.div`
    margin-top: 24px;
    color: ${colors.White100};
    font-size: 14px;
    text-align: center;
`;

const Guide = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-top: 24px;

    &::before {
        transition: all .2s ease;
        width: 20px;
        height: 20px;
        background-image: url('/img/about/ic_guide.svg');
        content: '';
    }

    a {
        transition: all .2s ease;
        color: ${rgba(colors.White100, 0.3)};
        margin-left: 5px;
        font-size: 14px;
    }

    &:hover {
        &::before {
            transition: all .2s ease;
            background-image: url('/img/about/ic_guide_hover.svg');
        }

        a {
            transition: all .2s ease;
            text-decoration: underline;
            color: ${colors.White100};
        }
    }
`;

const InfoWrap = styled.div`
    margin: 44px -25px 0 -25px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const InfoItem = styled.div`
    flex-basis: 33.33%;
    width: 33.33%;
    padding: 0 25px;
`;

const InfoContents = styled.div`
    background-color: ${colors.Black200};
    border-radius: 12px;
    min-height: 460px;
    text-align: center;
    padding-top: 52px;
    display: flex;
    flex-direction: column;
`;

const InfoIcon = styled('img')`
    width: 80px;
    min-height: 80px;
    margin: 0 auto;
`;

const Step = styled.div`
    margin-top: 14px;
    font-size: 14px;
    color: ${colors.Orange100};
`;

const Name = styled.div`
    margin-top: 8px;
    color: ${colors.White100};
    font-size: 18px;
`;

const Contents = styled.div`
    margin-top: 18px;
    color: ${colors.BlueGray600};
    line-height: 1.5;
    font-size: 13px;
    word-break: keep-all;
`;

export default AboutInformation;
