/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

function HomeConutInformation() {
    return (
        <Section>
            <Container>
                <InformationBox>
                    <Title>
                        재미있고 짧은 형식의 <span>인큐베이팅 플랫폼 탄탄</span>
                    </Title>
                    <Description>
                        탄탄은 TikTok, Instagram의 짧은 동영상(쇼츠)처럼 새롭고 재미있는 콘텐츠를
                        사용자에게 제공하며,
                        <br />
                        콘텐츠 제작자는 탄탄 생태계의 콘텐츠 제작에 기여함으로써 수익을 창출할 수
                        있는 새로운 수단을 갖게 됩니다.
                        <br />
                        탄탄은 상품을 쉽게 생성하고 거래할 수 있는 새로운 멀티체인 스트리밍 소셜
                        네트워크 플랫폼을 지향합니다.
                    </Description>
                    <Button>자세히 보기</Button>
                </InformationBox>
                <InformationImageBox>
                    <InformationImage src="/img/home/img_information.png" />
                </InformationImageBox>
            </Container>
        </Section>
    );
}

const Section = styled.div`
    background-color: ${colors.Green200};
    padding: 80px 0;
`;

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InformationBox = styled.div`
    flex-basis: calc(100% - 604px);
`;

const Description = styled.div`
    margin-top: 16px;
    font-weight: 300;
    color: ${rgba(colors.White100, 0.6)};
    font-size: 14px;
    line-height: 1.5;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${colors.White100};
    font-weight: 400;

    span {
        font-weight: 700;
    }
`;

const Button = styled.div`
    width: 160px;
    height: 48px;
    background-color: ${rgba(colors.White100, 0.05)};
    border-radius: 999px;
    color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 37px;
    font-size: 14px;
    font-weight: 400;
    cursor: pointer;

    &:hover {
        background-color: ${rgba(colors.White100, 0.15)};
    }
`;

const InformationImageBox = styled.div`
    flex-basis: 604px;
`;

const InformationImage = styled('img')`
    width: 100%;
`;

export default HomeConutInformation;
