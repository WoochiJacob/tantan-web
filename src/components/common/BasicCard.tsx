import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useNavigate } from 'react-router-dom';
import { IBasicCard } from '@interface/common';

interface CardInterfaces {
    card: IBasicCard;
    size: number;
}

function BasicCard({ card, size }: CardInterfaces) {
    const navigate = useNavigate();
    const [endTime, setEndTime] = useState<boolean>(false);

    const progress = useCallback((supply: number, quantity: number): number => {
        const perc = ((supply - quantity) / supply) * 100;
        const percParseInt = parseInt(perc.toString(), 10);

        if (!percParseInt) return 0;
        return percParseInt;
    }, []);

    useEffect(() => {
        if (card.expiration_date) {
            const nowTime = new Date().getTime();
            const assetTime = new Date(card.expiration_date.split(' ')[0]).getTime();

            if (nowTime > assetTime) {
                setEndTime(true);
            }
        }
    }, []);

    return (
        <CradWrap size={size}>
            <CradContent
                onClick={() => navigate(`/marketplace/${card.contract_address}/${card.asset_id}`)}
            >
                <Thumnail>
                    <ThumnailBox bg={card.more_info_url ? card.more_info_url : card.market_thumbnail} />
                    <CardLabel>
                        {!!(card.adult_gb) && card.adult_gb.toString() === '1' && <LabelIcon src="/img/common/ic_adult.svg" />}
                        {!!(card.slide_gb) && card.slide_gb.toString() === '1' && <LabelIcon src="/img/common/ic_hot.svg" />}
                    </CardLabel>

                    <DeemBox />

                    {/* 전체 발행수량 */}
                    <SupplyBox>
                        {/* 판매율 */}
                        {card.supply > 1 && (
                            <ProgressBox>
                                <QuantityPercent>
                                    {progress(card.supply, card.quantity) || 0}
                                    %
                                </QuantityPercent>
                                <SupplyQuantityProgressBar>
                                    <ProgressBar perc={progress(card.supply, card.quantity)} />
                                </SupplyQuantityProgressBar>
                            </ProgressBox>
                        )}
                    </SupplyBox>
                </Thumnail>
                <ContentsBody>
                    {/* 프로필 사진 */}
                    <Profile>
                        <ProfileImageBox>
                            <ProfileImage src={card.creator_profileImg ? card.creator_profileImg : '/img/common/img_default_profile.png'} />
                        </ProfileImageBox>
                    </Profile>

                    {/* 크이에이터 이름 */}
                    <CreateText>{card.creator_name}</CreateText>

                    {/* NFT 제목 */}
                    <MarketTitle>
                        {card.market_name}
                    </MarketTitle>

                    {/* 현재가 */}
                    <PriceBox>
                        {(card.is_end === 0 && !endTime) && (
                            <Price>
                                {card.market_symbol !== 'KRW' && <Symbol src={`/img/common/ic_market_${card.market_symbol}.png`} />}
                                {card.price.toLocaleString()}
                                <span>{card.market_symbol}</span>
                            </Price>
                        )}
                        {(card.is_end === 1 || endTime) && (
                            <SaleEnd>
                                판매종료
                            </SaleEnd>
                        )}
                    </PriceBox>
                </ContentsBody>
            </CradContent>
        </CradWrap>
    );
}

const Symbol = styled('img')`
    width: 20px;
    margin-right: 4px;
`;

const CradWrap = styled.div<{size: number}>`
    padding: 0 14px;
    padding-bottom: 20px;
    width: calc(100% / ${(props) => (props.size)});
    position: relative;
`;

const CardLabel = styled.div`
    position: absolute;
    left: 12px;
    top: 12px;
`;

const LabelIcon = styled('img')`
    margin-right: 8px;
`;

const Thumnail = styled.div`
    position: relative;
    height: 200px;
    overflow: hidden;
`;

const DeemBox = styled.div`
    width: 100%;
    height: 48px;
    background: linear-gradient(0deg, rgba(1, 10, 20, 0.4) 0%, rgba(1, 10, 20, 0) 100%);
    position: absolute;
    bottom: 0;
    left: 0;
`;

const ThumnailBox = styled.div<{bg: string}>`
    height: 200px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.BlueGray400};
    background-image: url(${(props) => (`${props.bg}`)});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    position: relative;
    transition: all .2s linear;
`;

const CradContent = styled.div`
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.08) 0px 6px 18px 0px, inset 0px -3px 0px rgba(0, 0, 0, 0.02);
    cursor: pointer;
    transition: all .4s ease;

    &:hover {
        /* box-shadow: rgba(0, 0, 0, 0.08) 0px 6px 18px 0px, inset 0px -3px 0px rgba(0, 0, 0, 0.02); */
        /* transition: all .2s ease; */

        ${ThumnailBox} {
            transform: scale(1.1);
            transition: all .2s linear;
        }
    }
`;

const MarketTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};
    display: -webkit-box;
    -webkit-line-clamp: 1; //원하는 라인수
    -webkit-box-orient: vertical;
    height: 18px;
    margin-top: 2px;
    overflow: hidden;
`;

const ContentsBody = styled.div`
    background-color: ${colors.White100};
    width: 100%;
    padding: 16px 12px;
    display: flex;
    flex-direction: column;
    position: relative;
`;

const Profile = styled.div`
    position: absolute;
    top: -36px;
    left: 13px;
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
    border: 2px solid ${colors.BlueGray400};
`;

const ProfileImage = styled('img')`
    width: 52px;
    height: 52px;
    object-fit: cover;
`;

const CreateText = styled.div`
    line-clamp: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  /* 말줄임 적용 */
    height: 19px;
    width: 170px;
    font-size: 14px;
    margin-top: 6px;
    color: ${rgba(colors.Black100, 0.5)};
`;

const PriceBox = styled.div`
    margin-top: 8px;
    min-height: 19px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 16px;
`;

const Price = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    font-weight: 500;

    span {        
        margin-left: 2px;
    }
`;

const SaleEnd = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    min-height: 20px;
`;

const SupplyBox = styled.div`
    display: flex;
    align-items: flex-end;
    margin-top: 5px;
    width: 214px;
    min-height: 26px;
    position: absolute;
    bottom: 6px;
    right: 12px;
`;

const SupplyQuantityProgressBar = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${colors.BlueGray400};
    border-radius: 999px;
    overflow: hidden;
`;

const ProgressBar = styled.div<{perc: number}>`
    width: ${(props) => (props.perc ? `${props.perc}%` : 0)};
    height: 1px;
    border-radius: 999px;
    background: linear-gradient(90deg, #F7941D 0%, #F0DC2D 100%);
`;

const QuantityPercent = styled.div`
    font-size: 13px;
    margin-bottom: 4px;
    color: ${colors.White100};
`;

const ProgressBox = styled.div`
    width: 214px;
    background-color: linear-gradient(0deg, rgba(1, 10, 20, 0.3) 0%, rgba(1, 10, 20, 0) 100%);
`;

export default BasicCard;
