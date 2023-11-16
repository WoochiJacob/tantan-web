import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useNavigate } from 'react-router-dom';
import { IBasicCard } from '@interface/common';

interface CardInterfaces {
    card: IBasicCard;
    size: number;
}

function CreativeChallengeCard({ card, size }: CardInterfaces) {
    const navigate = useNavigate();

    const getThumbnail = (card): string => {
        if (card.market_animation || !card.market_thumbnail) {
            return card.more_info_url;
        }

        return card.market_thumbnail;
    };

    return (
        <CradWrap size={size}>
            <CradContent
                onClick={() => navigate(`/creative-challenge/${card.asset_id}`)}
            >
                <ThumbnailBox bg={getThumbnail(card)}>
                    <DeemBox>
                        <CreativeChallengeButton>응원하기</CreativeChallengeButton>
                    </DeemBox>
                </ThumbnailBox>
                <ProfileBox>
                    <ProfileImageBox>
                        <ProfileImage src={card.owner_profileImg ? card.owner_profileImg : '/img/common/img_default_profile.png'} />
                    </ProfileImageBox>
                    <CardInfoBox>
                        <Name>{card.creator_name}</Name>
                        <Title>{card.market_name}</Title>
                        <DetailInfo>
                            <Category>{card.category}</Category>
                            <Bookmark>응원 0</Bookmark>
                        </DetailInfo>
                    </CardInfoBox>
                </ProfileBox>
            </CradContent>
        </CradWrap>
    );
}

const CradWrap = styled.div<{size: number}>`
    padding: 0 14px;
    padding-bottom: 20px;
    width: calc(100% / ${(props) => (props.size)});
    position: relative;
`;

const DeemBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${rgba(colors.Black200, 0.7)};
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .4s ease;
    opacity: 0;
`;

const CreativeChallengeButton = styled.div`
    width: 140px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border: 1px solid ${colors.White100};
    color: ${colors.White100};
    font-size: 14px;
    font-weight: 700;
`;

const CradContent = styled.div`
    transition: all .4s ease;
    cursor: pointer;

    &:hover {
        ${DeemBox} {
            opacity: 1;
            transition: all .4s ease;
        }
    }
`;

const ThumbnailBox = styled.div<{bg: string}>`
    width: 100%;
    height: 200px;
    background-image: url(${(props) => (`${props.bg}`)});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
`;

const ProfileBox = styled.div`
    display: flex;
    margin-top: 6px;
`;

const ProfileImageBox = styled.div`
    background-color: ${colors.Black200};
    border-radius: 50%;
    width: 52px;
    height: 52px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border: 1px solid ${colors.BlueGray400};
`;

const ProfileImage = styled('img')`
    width: 52px;
    height: 52px;
    object-fit: cover;
`;

const CardInfoBox = styled.div`
    flex-basis: calc(100% - 52px);
    padding-left: 4px;
`;

const Name = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: ${rgba(colors.Black100, 0.5)};
`;

const Title = styled.div`
    margin-top: 2px;
    font-weight: 500;
    font-size: 14px;
    display: -webkit-box;
    -webkit-line-clamp: 1; //원하는 라인수
    -webkit-box-orient: vertical;
    width: 225px;
    height: 18px;
    overflow: hidden;
`;

const DetailInfo = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;
`;

const Category = styled.div`
    font-size: 14px;
    color: ${colors.BlueGray700};
    font-weight: 300;
    display: flex;
    align-items: center;

    &:after {
        width: 4px;
        height: 4px;
        display: block;
        content: '';
        border-radius: 50%;
        background-color: ${colors.BlueGray400};
        margin: 0 4px;
    }
`;

const Bookmark = styled.div`
    font-size: 14px;
    color: ${colors.BlueGray700};
    font-weight: 300;
`;

export default CreativeChallengeCard;
