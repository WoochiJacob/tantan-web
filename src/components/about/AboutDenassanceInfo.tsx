import React from 'react';
import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useTranslation } from 'react-i18next';
import { nl2br } from '@utils/help';

function AboutDenassanceInfo() {
    const { t } = useTranslation();

    return (
        <ContainerSection>
            <Container>
                <TitleBox>
                    <Title>
                        {t('About.aboutWhatis')}
                    </Title>
                    <Description>
                        {t('About.aboutWhatisDescription')}
                    </Description>
                    <Tag>
                        <span>#</span>
                        {t('About.aboutCommunity')}
                        {' '}
                        <span>#</span>
                        {t('About.aboutFandom')}
                        {' '}
                        <span>#</span>
                        {t('About.aboutCreators')}
                        {' '}
                        <span>#</span>
                        {t('About.aboutWeb3')}
                    </Tag>
                </TitleBox>
                <Images src="/img/about/ic_long_arrow.png" />
                <TitleBox>
                    <KRTitle>
                        <KRTitleTextTitle dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutConutsquare')) }} />
                        <KRTitleText dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutInformation_01')) }} />

                    </KRTitle>
                    <KRDescription dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutInformation_02')) }} />
                </TitleBox>
            </Container>
        </ContainerSection>
    );
}

const ContainerSection = styled.div`
    background-color: ${colors.BlueGray200};
`;

const Container = styled.div`
    width: 1280px;
    padding: 140px 20px 180px 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const TitleBox = styled.div``;

const Title = styled.div`
    font-size: 32px;
    color: ${colors.Black100};
    font-family: ${fonts.Tinos};
`;

const Description = styled.div`
    margin-top: 34px;
    font-size: 14px;
    color: ${rgba(colors.Black100, 0.4)};
`;

const KRTitle = styled.div`
    font-size: 24px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const KRTitleTextTitle = styled.span`
    color: ${colors.Orange100};
`;

const KRTitleText = styled.span``;

const KRDescription = styled.div`
    margin-top: 24px;
    font-size: 14px;
    color: ${colors.WarmGray600};
    line-height: 1.5;
`;

const Tag = styled.div`
    margin-top: 8px;
    font-size: 16px;
    color: ${colors.Black100};

    span {
        color: ${colors.Orange100};
    }
`;

const Images = styled('img')`
    width: 153px;
`;

export default AboutDenassanceInfo;
