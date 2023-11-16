import React from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors } from '@styles/ui_palette';

function HomeBannerSection() {
    const navigate = useNavigate();

    return (
        <Container>
            <Section>
                <SubTitle>상상은 현실이 된다!</SubTitle>
                <Title>
                    탄탄과 함께 상상을
                    <br />
                    현실로 만들어보세요
                </Title>

                <Description>
                    아이디어만 있다면 누구나 참여할 수 있어요.
                    <br />
                    크리에이터님의 상상을 현실로 만들어 보세요.
                </Description>

                <Button onClick={() => navigate('/challenge-create')}>
                    크리에이티브 챌린지 참여
                </Button>
            </Section>
        </Container>
    );
}

const Container = styled.div`
    padding-top: 69px;
    height: 400px;
    width: 100%;
    background: url('/img/main/img_creative_banner.png'); 
`;

const Section = styled.div`
    width: 1600px;
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${colors.Black100};
    font-weight: 700;
    line-height: 1.2;
    margin-top: 12px;
`;

const SubTitle = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
`;

const Description = styled.div`
    margin-top: 32px;
    font-size:14px;
    color: ${colors.Black100};
    font-weight: 300;
`;

const Button = styled.div`
    width: 200px;
    height: 58px;
    margin-top: 32px;
    border-radius: 999px;
    border: 1px solid ${colors.Black100};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export default HomeBannerSection;
