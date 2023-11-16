import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { nl2br } from '@utils/help';

function CreateInfo() {
    return [
        {
            id: 1,
            name: '로그인',
            contents: '웹3.0 지갑을 연결하면 자동으로 계정이 생성됩니다 지금 바로 연결해 보세요.',
            button: 'https://conuts.zendesk.com/hc/ko/articles/18113470860953-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%ED%81%B4%EB%A6%BD-Klip-%EC%A7%80%EA%B0%91-%EC%95%88%EB%82%B4-%ED%9C%B4%EB%8C%80%ED%8F%B0%EB%B3%B8%EC%9D%B8%EC%9D%B8%EC%A6%9D-',
        },
        {
            id: 2,
            name: '컬렉션',
            contents: '컬렉션을 통해 효과적으로 상품을 정리하고, 판매할 수 있어요.',
            button: 'https://conuts.zendesk.com/hc/ko/articles/18113549855129-%EC%BB%AC%EB%A0%89%EC%85%98%EC%9D%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80%EC%9A%94-',
        },
        {
            id: 3,
            name: '판매등록',
            contents: 'Create를 이용해 상품을 바로 만들어 보세요. 상품의 정보만 입력하면 판매 준비 끝.',
            button: 'https://conuts.zendesk.com/hc/ko/articles/18113566896153-%EC%83%81%ED%92%88-%EC%83%9D%EC%84%B1-%EB%B0%8F-%ED%8C%90%EB%A7%A4%EB%93%B1%EB%A1%9D',
        },
    ];
}

function HomeInformation() {
    const createInfo = CreateInfo();

    return (
        <Section>
            <Container>
                <Title>무엇이든 물어보세요.</Title>

                <InfoWrap>
                    {createInfo.map((info: any) => (
                        <InfoItem
                            key={info.id}
                            onClick={() => window.open(info.button)}
                        >
                            <TextBox>
                                <Name>{info.name}</Name>
                                <Contents dangerouslySetInnerHTML={{ __html: nl2br(info.contents) }} />
                            </TextBox>
                            <Icons src="/img/main/ic_info_arrow.svg" />

                        </InfoItem>
                    ))}
                </InfoWrap>
            </Container>
        </Section>
    );
}

const Section = styled.div`
    padding-top: 60px;
    border-top: 1px solid ${colors.BlueGray400};
`;

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${colors.Black100};
    font-weight: 700;
    text-align: center;
`;

const InfoWrap = styled.div`
    margin-top: 14px;
`;

const Contents = styled.div`
    margin-top: 6px;
    color: ${colors.Black100};
    font-size: 14px;
    font-weight: 300;
`;

const InfoItem = styled.div`
    width: 925px;
    height: 100px;
    margin: 0 auto;
    border-bottom: 1px solid ${colors.BlueGray400};
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    &:hover {
        ${Contents} {
            text-decoration: underline;
        }   
    }
`;

const Name = styled.div`
    color: ${colors.Black100};
    font-size: 18px;
    font-weight: 500;
`;

const TextBox = styled.div``;

const Icons = styled('img')``;

export default HomeInformation;
