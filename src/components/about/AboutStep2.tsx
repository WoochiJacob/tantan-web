import React from 'react';
import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';
import { nl2br } from '@utils/help';

function AboutStep2() {
    const { t } = useTranslation();

    return (
        <SctionBg>
            <AboutStroyContents>
                <AboutTitleBox>
                    <Step>2</Step>
                    <MainTitle>
                        {t('About.aboutSectionTitle_02')}
                    </MainTitle>
                    <SubTitle>
                        <SubtitleActiveText>{t('About.aboutSectionContents_03')}</SubtitleActiveText>
                        <SubtitleText dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutSectionContents_04')) }} />
                    </SubTitle>
                </AboutTitleBox>
            </AboutStroyContents>
        </SctionBg>
    );
}

const SctionBg = styled.div`
    background-color: ${colors.BlueGray400};
    padding: 90px 0;
`;

const AboutTitleBox = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
    padding-left: 975px;
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
    background-image: url('/img/about/img_home_story2.png');
    background-repeat: no-repeat;
    background-position: left top;
    height: 746px;
    width: 100%;
`;

const SubtitleActiveText = styled.span`
    color: ${colors.Orange100};
`;

const SubtitleText = styled.span``;

export default AboutStep2;
