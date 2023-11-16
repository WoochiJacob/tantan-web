import React from 'react';
import styled from '@emotion/styled/macro';
import { fonts, colors } from '@styles/ui_palette';

function AboutStep3() {
    return (
        <AboutMainVisual>
            <AboutStroyContents>
                <AboutTitleBox>
                    <Step>3</Step>
                    <MainTitle>
                        블록체인기술의 선도
                    </MainTitle>
                    <SubTitle>
                        <SubtitleText>
                            청년 크리에이터의 작품부터 엔터테인먼트,
                            <br />
                            국내외 유명 콘텐츠 및 부동산까지(서비스예정)
                            <br />
                        </SubtitleText>
                        <SubtitleActiveText>
                            웹3.0 시대와 메타버스 인프라를 구축.
                        </SubtitleActiveText>
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
    background-image: url('/img/about/img_home_story3.png');
    background-repeat: no-repeat;
    background-position: right -120px top;
    height: 560px;
    width: 100%;
`;

const SubtitleActiveText = styled.span`
    color: ${colors.Orange100};
`;

const SubtitleText = styled.span``;

export default AboutStep3;
