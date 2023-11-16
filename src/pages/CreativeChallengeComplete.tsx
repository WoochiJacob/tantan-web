import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled/macro';

import { colors } from '@styles/ui_palette';

function CreativeChallengeComplete() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const tokenId = searchParams.get('tokenId');

    useEffect(() => {
        if (!tokenId) {
            navigate('/');
        }
    }, []);

    return (
        <Container>
            <ComplteBox>
                <SubTitle>다 끝났어요!</SubTitle>
                <Title>내 상상 속 아이디어가 히트상품으로!</Title>
                <CompleteImage src="/img/creative_challenge/img_complete.png" />
                <Description>내가 올린 아이디어 확인해보세요.</Description>
                <CompleteButton onClick={() => navigate(`/creative-challenge/${tokenId}`)}>
                    아이디어 확인하기
                </CompleteButton>
            </ComplteBox>
        </Container>
    );
}

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px 0 200px 0;
`;

const ComplteBox = styled.div`
    text-align: center;
`;

const SubTitle = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
`;

const Title = styled.div`
    font-size: 28px;
    color: ${colors.Black100};
    font-weight: 700;
`;

const CompleteImage = styled('img')`
    width: 294px;
    margin-top: 24px;
`;

const Description = styled.div`
    margin-top: 28px;
    font-size: 16px;
    font-weight: 300;
`;

const CompleteButton = styled.div`
    width: 214px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    color: ${colors.White100};
    background-color: ${colors.Black100};
    margin: 0 auto;
    margin-top: 12px;
    cursor: pointer;
`;

export default CreativeChallengeComplete;
