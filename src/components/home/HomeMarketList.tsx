import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useNavigate } from 'react-router-dom';

function HomeMarketList() {
    const navigate = useNavigate();
    const marketList = [
        {
            id: 'entertainment',
            name: '엔터테인먼트',
        },
        {
            id: 'webtoon',
            name: '웹툰',
        },
        {
            id: 'fantasy',
            name: 'S-판타지',
        },
        {
            id: 'game',
            name: '디지털아이템',
        },
        {
            id: 'supermarket',
            name: '슈퍼마켓',
        },
        {
            id: 'empty',
            name: '',
        },
    ];

    const hadleLink = (name: string) => {
        if (name === '') {
            return;
        }

        navigate(`/marketplace?category=${name}&page=1`);
    };

    return (
        <Contain>
            {marketList.map((card) => (
                <CardBox
                    key={card.id}
                    onClick={() => hadleLink(card.name)}
                >
                    <MarketCard
                        bg={card.id}
                    >
                        <CardItemImage
                            src={`/img/home/img_item_${card.id}.png`}
                        />
                    </MarketCard>

                    {card.name !== '' && (
                        <CardButtonBox>
                            <CategoryName>
                                {card.name}
                            </CategoryName>
                            <CategoryButton>
                                Play
                            </CategoryButton>
                        </CardButtonBox>
                    )}

                </CardBox>
            ))}
        </Contain>
    );
}

const Contain = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const CategoryButton = styled.div`
    width: 96px;
    height: 40px;
    background-color: ${rgba(colors.Black100, 0.03)};
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 700;
    color: ${colors.Black100};

    &::after {
        width: 20px;
        height: 20px;
        content: url('/img/home/ic_card_arrow.png');
        margin-left: 7px;
    }
`;

const CardBox = styled.div`
    flex-basis: 498px;
    margin-bottom: 12px;

    &:hover {
        ${CategoryButton} {
            color: ${colors.White100};
            background-color: ${colors.Black100};

            &::after {
                content: url('/img/home/ic_card_arrow_hover.png');
            }
        }
    }
`;

const MarketCard = styled.div<{bg: string}>`
    width: 498px;
    height: 310px;
    background-image: url(${(props) => (`/img/home/img_card_${props.bg}.png`)});
    background-repeat: no-repeat;
    background-size: contain; 
    display: flex;
    justify-content: center;
    cursor: ${(props) => (props.bg === 'empty' ? 'default' : 'pointer')};
    align-items: ${(props) => (props.bg === 'empty' ? 'flex-end' : 'center')};
    padding-bottom: ${(props) => (props.bg === 'empty' ? 0 : '50px')};
`;

const CardItemImage = styled('img')``;

const CardButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 6px;
`;

const CategoryName = styled.div`
    font-size: 20px;
    font-weight: 700;
    color: ${colors.Black200};
`;

export default HomeMarketList;
