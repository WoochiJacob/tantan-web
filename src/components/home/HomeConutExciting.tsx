import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function HomeConutExciting() {
    return (
        <Container>
            <Title>
                익사이팅 <span>탄탄</span>
            </Title>
            <ExcitingSection>
                <ExcitingBox>
                    <BoxWrap data-aos="flip-left" type="gray">
                        <StepSectionImageBox>
                            <StepSectionImage src="/img/home/img_step_01_image.png" />
                            <ImgaeTextBox>
                                <StepTextImage src="/img/home/img_step_01_text.png" />
                            </ImgaeTextBox>
                        </StepSectionImageBox>
                    </BoxWrap>
                    <BoxWrap type="transparent">
                        <StepSectionImageBox>
                            <StepTitle src="/img/home/img_step_01.png" />

                            <StepSectionTitle>
                                WEB3 인큐베이팅 플랫폼
                                <br />
                                크리에이터 챌린지 서비스
                                <br />
                                배당형상품(STO상품)
                                <br />
                            </StepSectionTitle>

                            <Description>
                                지역경제 활성화 소상공인, 청년 크리에이터
                                <br />
                                (웹툰/웹소설, 싱어송라이터, 디지털아트, 캐릭터디자인 등)를
                                <br />
                                응원합니다.
                            </Description>
                        </StepSectionImageBox>
                    </BoxWrap>
                    <BoxWrap type="transparent" />
                </ExcitingBox>
                <ExcitingBox>
                    <BoxWrap type="transparent">
                        <AnimationBox>
                            <CloudImage src="/img/home/img_cloud.png" />
                        </AnimationBox>
                    </BoxWrap>
                    <BoxWrap data-aos="flip-left" type="gray">
                        <StepSectionImageBox>
                            <StepSectionImage src="/img/home/img_step_02_image.png" />
                            <ImgaeTextBox>
                                <StepTextImage src="/img/home/img_step_02_text.png" />
                            </ImgaeTextBox>
                        </StepSectionImageBox>
                    </BoxWrap>
                    <BoxWrap type="transparent">
                        <StepSectionImageBox>
                            <StepTitle src="/img/home/img_step_02.png" />

                            <StepSectionTitle>
                                블록체인으로 융합상품을
                                <br />
                                개인이 소유함을 증명하고,
                                <br />
                                투자가치를 제고
                            </StepSectionTitle>

                            <Description>
                                유일하고, 희소하고, 특별단독구성, 미래가치를
                                <br />
                                담보합니다.
                            </Description>
                        </StepSectionImageBox>
                    </BoxWrap>
                </ExcitingBox>
                <ExcitingBox>
                    <BoxWrap data-aos="flip-left" type="gray">
                        <StepSectionImageBox>
                            <StepSectionImage src="/img/home/img_step_03_image.png" />
                            <ImgaeTextBox>
                                <StepTextImage src="/img/home/img_step_03_text.png" />
                            </ImgaeTextBox>
                        </StepSectionImageBox>
                    </BoxWrap>
                    <BoxWrap type="transparent">
                        <StepSectionImageBox>
                            <StepTitle src="/img/home/img_step_03.png" />

                            <StepSectionTitle>
                                Mixed Reality 마켓플레이스
                                <br />
                                TanTan
                            </StepSectionTitle>

                            <Description>
                                실물과 결합된 최초, 실거래가 발생하는
                                <br />
                                마켓플레이스입니다.
                            </Description>
                        </StepSectionImageBox>
                    </BoxWrap>
                    <BoxWrap type="transparent">
                        <AnimationBox2>
                            <CloudImage src="/img/home/img_cloud.png" />
                        </AnimationBox2>
                    </BoxWrap>
                </ExcitingBox>
                <ExcitingBox>
                    <BoxWrap type="transparent" />
                    <BoxWrap data-aos="flip-left" type="gray">
                        <StepSectionImageBox>
                            <StepSectionImage src="/img/home/img_step_04_image.png" />
                            <ImgaeTextBox>
                                <StepTextImage src="/img/home/img_step_04_text.png" />
                            </ImgaeTextBox>
                        </StepSectionImageBox>
                    </BoxWrap>
                    <BoxWrap type="transparent">
                        <StepSectionImageBox>
                            <StepTitle src="/img/home/img_step_04.png" />

                            <StepSectionTitle>E2E, P2E</StepSectionTitle>

                            <Description>
                                특별한 실물상품을 사용자가 사용하고, 무형미래가치
                                <br />
                                상품을 개인 소유하고/증명하고, 투자가치를 제고합니다.
                            </Description>
                        </StepSectionImageBox>
                    </BoxWrap>
                </ExcitingBox>
            </ExcitingSection>
        </Container>
    );
}

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 80px;
`;

const Title = styled.div`
    font-size: 28px;
    font-weight: 400px;
    color: ${colors.Black200};

    span {
        font-weight: 700;
    }
`;

const ExcitingSection = styled.div`
    margin-top: 38px;
`;

const ExcitingBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 40px;
`;

const BoxWrap = styled.div<{ type: string }>`
    background-color: ${(props) =>
        props.type === 'transparent' ? props.type : rgba(colors.BlueGray500, 0.11)};
    flex-basis: 498px;
    height: 300px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 5;
`;

const StepSectionImageBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 300px;
`;

const StepSectionImage = styled('img')`
    width: 276px;
    margin: 0 auto;
    margin-top: 42px;
`;

const ImgaeTextBox = styled.div`
    width: 206px;
    margin: 0 auto;
    margin-top: 24px;
`;

const StepTextImage = styled('img')`
    width: 100%;
`;

const StepTitle = styled('img')`
    width: 108px;
`;

const StepSectionTitle = styled.div`
    background: linear-gradient(107.56deg, #32a08c 0%, #3c5cdf 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
    font-size: 24px;
    font-weight: 700;
    margin-top: 36px;
`;

const Description = styled.div`
    font-size: 16px;
    font-weight: 300;
    line-height: 1.3;
    color: ${colors.Black200};
    margin-top: 12px;
`;

const AnimationBox = styled.div`
    position: absolute;
    top: 0;
    left: -50%;
    transform: translateY(0);
    animation: cloud ease-in-out infinite;
    animation-duration: 3s;
    z-index: 0;
`;

const AnimationBox2 = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(0);
    animation: cloud ease infinite;
    animation-duration: 3s;
    z-index: 0;

    @keyframes cloud {
        0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
        50% {
            -webkit-transform: translateY(10%);
            transform: translateY(10%);
        }
        100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
        }
    }
`;

const CloudImage = styled('img')``;

export default HomeConutExciting;
