import React from 'react';
import styled from '@emotion/styled/macro';
import { fonts, common, colors } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';
import { nl2br } from '@utils/help';

function AboutStep1() {
    const { t } = useTranslation();

    return (
        <AboutMainVisual>
            <Container>
                <Title>
                    {t('About.aboutSectionMainTitle')}
                </Title>
                <Description>
                    {t('About.aboutSectionMainDesc')}
                </Description>
            </Container>
            <AboutStroyContents>
                <AboutTitleBox>
                    <Step>1</Step>
                    <MainTitle>
                        쉽고 간편하게 카카오 클립(Klip)
                        <br />
                        지갑으로 로그인 후 토스 결제
                    </MainTitle>
                    <SubTitle>
                        <SubtitleActiveText dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutSectionContents_01')) }} />
                        <SubtitleText dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutSectionContents_02')) }} />
                    </SubTitle>
                </AboutTitleBox>
            </AboutStroyContents>
        </AboutMainVisual>
    );
}

const AboutMainVisual = styled.section`
    background-color: ${colors.White100};
    background-repeat: no-repeat;
    width: 100%;
    padding: 80px 0 100px 0;
`;

const Container = styled.div`
    width: ${common.contents};
    margin: 0 auto;
    padding: 0 20px;
`;

const Title = styled.div`
    font-size: 36px;
    color: ${colors.Black100};
    font-family: ${fonts.Tinos};
    text-align: center;
`;

const Description = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    text-align: center;
    margin-top: 24px;
`;

const AboutTitleBox = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
`;

const MainTitle = styled.div`
    font-size: 24px;
    color: ${colors.Black100};
    margin-top: 16px;
    font-weight: 500;
`;

const SubTitle = styled.div`
    margin-top: 24px;
    font-size: 14px;
    color: ${colors.Black100};
    line-height: 1.7;
`;

const Step = styled.div`
    font-size: 34px;
    color: ${colors.Black100};
    font-family: ${fonts.Tinos};
    position: relative;

    &:before {
        width: 31px;
        height: 1px;
        display: block;
        background: ${colors.Orange100};
        content: '';
        transform: rotate(-45deg);
        position: absolute;
        bottom: 6px;
        left: 5px;
    }

`;

const AboutStroyContents = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 80px;
    background-image: url('/img/about/img_home_story.png');
    background-repeat: no-repeat;
    background-position: right 150px top;
    height: 462px;
`;

const SubtitleActiveText = styled.span`
    color: ${colors.Orange100};
`;

const SubtitleText = styled.span``;

export default AboutStep1;
