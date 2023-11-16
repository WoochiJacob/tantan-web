import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { nl2br } from '@utils/help';
import { useNavigate } from 'react-router-dom';
import { IPremiumCard } from '@interface/common';

interface CardInterfaces {
    card: IPremiumCard;
    size: number;
    isMain: boolean;
}

function PremiumCard({ card, size, isMain }: CardInterfaces) {
    const navigate = useNavigate();

    return (
        <CradWrap
            size={size}
            isMain={isMain}
        >
            <CradContent onClick={() => navigate(`/premium-market/${card.wallet_address}`)}>
                <ThumnailBox>
                    <PremiumBedgeImage src="/img/common/ic_premium_badge.svg" />
                    <Thumnail src={card.image_profile ? card.image_profile : '/img/common/img_default_profile.png'} />
                </ThumnailBox>
                <ContentsBody>
                    <ContentsBackground background={card.image_profile ? card.image_profile : '/img/common/img_default_profile.png'} />
                    <ContentsDeem>
                        <CreatorBox>
                            <CreatorInfo>
                                <CreatorName>Creator</CreatorName>
                                <CreatorNameBox>
                                    {card.user_name}
                                </CreatorNameBox>
                            </CreatorInfo>
                            <BottomTopArrow src="/img/common/ic_bottom_top_arrows.svg" />
                        </CreatorBox>

                        <DisplayBox>
                            <Description dangerouslySetInnerHTML={{ __html: card.user_bio ? nl2br(card.user_bio) : '' }} />
                            <MarketButton>
                                자세히 보기
                            </MarketButton>
                        </DisplayBox>
                    </ContentsDeem>
                </ContentsBody>
            </CradContent>
        </CradWrap>
    );
}

const CradWrap = styled.div<{size: number, isMain: boolean}>`
    width: calc(100% / ${(props) => (props.size)});
    position: relative;
    padding: ${(props) => (props.isMain ? '0' : '0 17px 40px 17px')};
`;

const MarketButton = styled.div`
    width: 100%;
    margin-top: 40px;
    display: flex;
    background-color: transparent;
    align-items: center;
    justify-content: space-between;;
    color: ${colors.White100};
    cursor: pointer;

    &::after {
        background-image: url('/img/premium-market/ic_premium_arrow.svg');
        width: 14px;
        height: 14px;
        content: '';
    }
`;

const ThumnailBox = styled.div`
    height: 492px;
    overflow: hidden;
    background-color: ${colors.BlueGray400};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Thumnail = styled('img')`
    height: 100%;
`;

const ContentsDeem = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${rgba(colors.Black100, 0.15)};
    z-index: 3;
    padding: 27px 26px 39px 26px;
`;

const CreatorName = styled.div`
    color: ${rgba(colors.White100, 0.5)};
    font-size: 14px;
    font-family: ${fonts.Tinos};
`;

const Description = styled.div`
    margin-top: 20px;
    color: ${colors.White100};
    font-size: 14px;
    font-weight: 300;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 6; //원하는 라인수
    -webkit-box-orient: vertical;
    height: 125px;
    overflow: hidden;
`;

const CreatorNameBox = styled.div`
    margin-top: 2px;
    color: ${colors.White100};
    font-size: 16px;
    font-weight: 500;
`;

const PremiumBedgeImage = styled('img')`
    position: absolute;
    left: 16px;
    top: 16px;
`;

const ContentsBody = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 92px;
    overflow: hidden;
    border-radius: 12px;
    transition: all .2s linear;
`;

const ContentsBackground = styled.div<{background: string}>`
    background-image: url(${(props) => (props.background)});
    background-position: center bottom;
    filter: blur(8px);
    width: 100%;
    height: 92px;
    overflow: hidden;
    transform: scale(1.4);
    transition: all .2s linear;
`;

const DisplayBox = styled.div`
    display: none;
`;

const CreatorBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BottomTopArrow = styled('img')`
    width: 14px;
`;

const CreatorInfo = styled.div``;

const CradContent = styled.div`
    border-radius: 12px;
    overflow: hidden;
    background-color: ${colors.BlueGray200};
    transition: all .3s linear;
    position: relative;
    cursor: pointer;

    &:hover {
        ${ContentsBody} {
            transition: all .3s linear;
            height: 302px;
        }

        ${ContentsBackground} {
            transition: all .3s linear;
            height: 302px;
            filter: blur(16px);
        }

        ${DisplayBox} {
            display: block;
        }

        ${BottomTopArrow} {
            display: none;
        }
    }
`;

export default PremiumCard;
