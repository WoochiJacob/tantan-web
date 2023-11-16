import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useNavigate } from 'react-router-dom';

const Categories = () => [
    {
        id: 1,
        imgae: '/img/main/img_category_1.svg',
        name: '가스',
        value: '가스',
    },
    {
        id: 2,
        imgae: '/img/main/img_category_2.svg',
        name: '풍력',
        value: '풍력',
    },
    {
        id: 3,
        imgae: '/img/main/img_category_3.svg',
        name: '수력',
        value: '수력',
    },
    {
        id: 4,
        imgae: '/img/main/img_category_4.svg',
        name: '쿡스토브',
        value: '쿡스토브',
    },
    {
        id: 5,
        imgae: '/img/main/img_category_5.svg',
        name: '태양열',
        value: '태양열',
    },
    {
        id: 4,
        imgae: '/img/main/img_category_4.svg',
        name: 'CORSIA',
        value: 'CORSIA',
    },
    {
        id: 5,
        imgae: '/img/main/img_category_5.svg',
        name: 'REDD+',
        value: 'REDD+',
    },
    {
        id: 6,
        imgae: '/img/main/img_category_6.svg',
        name: '전체',
        value: '',
    },
];

function HomeCategory() {
    const categories = Categories();
    const navigate = useNavigate();

    return (
        <Container>
            <Section>
                <Title>카테고리</Title>

                <CategoryWrap>
                    {categories.map((category: any) => (
                        <CategoryItemGroup
                            key={category.id}
                            onClick={() => navigate(`/marketplace?category=${category.value}`)}
                        >
                            <CategoryImageBox>
                                <CategoryImage src={category.imgae} />
                            </CategoryImageBox>
                            <CategoryName>{category.name}</CategoryName>
                        </CategoryItemGroup>
                    ))}
                </CategoryWrap>
            </Section>
        </Container>
    );
}

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
`;

const Section = styled.div`
    padding: 40px 0 60px 0;
`;

const Title = styled.div`
    font-size: 28px;
    color: ${colors.Black100};
    font-weight: 700;
`;

const CategoryWrap = styled.div`
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CategoryName = styled.div`
    text-align: center;
    color: ${colors.Black100};
    font-size: 16px;
    margin-top: 8px;
`;

const CategoryItemGroup = styled.div`
    width: 100px;
    cursor: pointer;

    &:hover {
        ${CategoryName} {
            text-decoration: underline;
        }
    }
`;

const CategoryImageBox = styled.div`
    width: 80px;
    height: 84px;
    background-color: ${colors.BlueGray300};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
`;

const CategoryImage = styled('img')`
    width: 44px;
`;

export default HomeCategory;
