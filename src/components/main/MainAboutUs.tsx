import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { nl2br } from '@utils/help';

const CreateInfo = () => [
    {
        id: 1,
        imgae: '/img/main/ic_platform_info_1.svg',
        name: '간편하게',
        contents: '블록체인의 불편함을 줄였습니다.\n웹3.0 지갑만 연동하면 로그인 완료!\n융합상품의 판매ㆍ구매부터, 수수료 관리까지\n가능한 올인원 서비스를 제공합니다.',
    },
    {
        id: 2,
        imgae: '/img/main/ic_platform_info_2.svg',
        name: '정직하게',
        contents: '융합상품의 대중화와 생태계 활성화를 이끌기 위해\n낮은 플랫폼 수수료(2.5%)로 이전에 없던 유일무이한\n혁신적인 융합상품을 제공합니다.',
    },
    {
        id: 3,
        imgae: '/img/main/ic_platform_info_3.svg',
        name: '다채롭게',
        contents: '예술작품, 엔터테인먼트, 국내·외 유명 콘텐츠 및\n부동산(서비스 예정)까지 아우르는 융합상품을 개발해 \n웹3.0 시대와 메타버스 인프라를 위한 플랫폼으로\n거듭나겠습니다.',
    },
];

function HomeAboutUs() {
    const createInfo = CreateInfo();

    return (
        <Container>
            <Section>
                <Title>다시 태어나다</Title>
                <InfoWrap>
                    {createInfo.map((info: any) => (
                        <InfoItem
                            key={info.id}
                        >
                            <InfoContents>
                                <InfoIcon src={info.imgae} />
                                <Name>
                                    {info.name}
                                </Name>
                                <Contents dangerouslySetInnerHTML={{ __html: nl2br(info.contents) }} />
                            </InfoContents>
                        </InfoItem>
                    ))}
                </InfoWrap>
            </Section>
        </Container>
    );
}

const Container = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
`;

const Section = styled.div`
    padding-bottom: 140px;
`;

const Title = styled.div`
    font-size: 24px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const InfoWrap = styled.div`
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const InfoItem = styled.div`
`;

const InfoContents = styled.div`
    min-height: 181px;
    display: flex;
    flex-direction: column;
`;

const InfoIcon = styled('img')`
    width: 80px;
`;

const Name = styled.div`
    margin-top: 24px;
    color: ${colors.Black100};
    font-size: 18px;
`;

const Contents = styled.div`
    margin-top: 12px;
    color: ${colors.BlueGray700};
    line-height: 1.5;
    font-size: 14px;
    word-break: keep-all;
`;

export default HomeAboutUs;
