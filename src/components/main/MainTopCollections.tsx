import React from 'react';
import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

const TopCollection = [
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '92.0',
        tokenId: 1,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '92.0',
        tokenId: 2,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '92.0',
        tokenId: 3,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '92.0',
        tokenId: 4,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '92.0',
        tokenId: 5,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '92.0',
        tokenId: 6,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '-92.0',
        tokenId: 7,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '-92.0',
        tokenId: 8,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '-92.0',
        tokenId: 9,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '0',
        tokenId: 10,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '-92.0',
        tokenId: 11,
    },
    {
        imgae: '/img/main/jacob.jpg',
        name: 'Jacob',
        minPrice: 7.98,
        maxPrice: 16000.10,
        diff: '-92.0',
        tokenId: 12,
    },
];

function HomeTopCollections() {
    const topCollections = TopCollection;

    const setDiff = (diff: number): any => {
        const returnValue = {
            color: '',
            diff: '',
        };

        if (Number(diff) > 0) {
            returnValue.color = colors.Green100;
            returnValue.diff = `+${diff}%`;
        } else if (Number(diff) < 0) {
            returnValue.color = colors.Red100;
            returnValue.diff = `${diff}%`;
        } else {
            returnValue.color = colors.White100;
            returnValue.diff = '-';
        }

        return returnValue;
    };

    return (
        <Container>
            <CollectionTop>
                <Title>Top Collections Over</Title>
                <CollectionFilter>
                    <CollectionSelect>
                        <option>지난 7일간</option>
                        <option>지난 7일간</option>
                        <option>지난 7일간</option>
                    </CollectionSelect>
                </CollectionFilter>
            </CollectionTop>

            <CollectionWrap>
                {topCollections.map((collection: any, index) => (
                    <CollectionItemGroup key={collection.tokenId}>
                        <CollectionItem>
                            <Rank>{index + 1}</Rank>
                            <ProfileWrap>
                                <CollectionProfile src={collection.imgae} />
                            </ProfileWrap>
                            <CollectionInfo>
                                <CollectionName>
                                    <Name>{collection.name}</Name>
                                    <Diff color={setDiff(collection.diff).color}>
                                        {`${setDiff(collection.diff).diff}`}
                                    </Diff>
                                </CollectionName>
                                <CollectionPrice>
                                    <PriceName>최소가격</PriceName>
                                    <Price>{collection.maxPrice}</Price>
                                </CollectionPrice>
                                <CollectionPrice>
                                    <PriceName>최대가격</PriceName>
                                    <Price>{collection.maxPrice}</Price>
                                </CollectionPrice>
                            </CollectionInfo>
                        </CollectionItem>
                    </CollectionItemGroup>
                ))}
            </CollectionWrap>

            <MarketPlaceMoreButton>
                더보기
            </MarketPlaceMoreButton>
        </Container>
    );
}

const Container = styled.div`
    width: 1280px;
    padding: 80px 20px 100px 20px;
    border-bottom: 1px solid ${colors.BlueGray700};
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 32px;
    font-family: ${fonts.Tinos};
    color: ${colors.Orange100};
`;

const CollectionWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 24px -25px 0 -25px;
`;

const CollectionTop = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CollectionFilter = styled.div`
    position: relative;

    &::after {
        background-image: url('/img/main/ic_select.png');
        width: 8px;
        height: 6px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
        content: '';
        display: block;
    }
`;

const CollectionSelect = styled.select`
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;

    border: 0;
    cursor: pointer;
    border-bottom: 2px solid ${colors.White100};
    color: ${colors.White100};
    width: 200px;
    height: 48px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    background-color: transparent;
    position: relative;

    &:focus-visible,
    &:focus-within,
    &:focus,
    &:active {
        border: 0;
        outline: 0;
        border-bottom: 2px solid ${colors.White100};
    }

    option {
        color: ${colors.Black100};
    }
`;

// const SelectOption = styled.option`
//     color: ${colors.Black100};
// `;

const CollectionItemGroup = styled.div`
    padding: 0 25px;
    width: 33.33%;
`;

const CollectionItem = styled.div`
    padding: 20px 0;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${rgba(colors.White100, 0.15)};
`;

const Rank = styled.div`
    font-size: 14px;
    color: ${colors.White100};
    flex-basis: 52px;
    display: flex;
    align-items: center;
    justify-content: left;
`;

const ProfileWrap = styled.div`
    flex-basis: 80px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
`;

const CollectionProfile = styled('img')`
    width: 100%;
`;

const CollectionInfo = styled.div`
    flex-basis: calc(100% - 132px);
    width: calc(100% - 132px);
    padding-left: 22px;
`;

const CollectionName = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`;

const Name = styled.div`
    font-size: 16px;
    color: ${colors.White100};
`;

const Diff = styled.div<{color: string}>`
    font-size: 16px;
    color: ${(props) => (props.color)};
`;

const CollectionPrice = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 9px;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

const PriceName = styled.div`
    font-size: 14px;
    color: ${rgba(colors.White100, 0.5)};
    margin-right: 12px;
`;

const Price = styled.div`
    font-size: 14px;
    color: ${colors.White100};

    span {
        margin-left: 5px;
    }
`;

const MarketPlaceMoreButton = styled.div`
    margin: 0 auto;
    margin-top: 76px;
    border: 1px solid ${colors.BlueGray500};
    background-color: ${colors.Black100};
    padding: 0 25px;
    border-radius: 29px;
    font-size: 14px;
    color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 250px;
    height: 58px;
    cursor: pointer;
    transition: all .2s ease;

    &::before {
        width: 8px;
        height: 8px;
        content: '';
    }

    &::after {
        width: 8px;
        height: 14px;
        content: '';
        background-image: url('/img/main/ic_more_button_white.svg');
        transition: all .2s ease;
    }

    &:hover {
        background-color: ${colors.BlueGray500};
        transition: all .2s ease;
        color: ${colors.Black100};

        &::after {
            width: 8px;
            height: 14px;
            content: '';
            background-image: url('/img/main/ic_more_button.svg');
            transition: all .2s ease;
        }   
    }
`;

export default HomeTopCollections;
