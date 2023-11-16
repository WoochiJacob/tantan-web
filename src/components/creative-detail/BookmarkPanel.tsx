import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { IAssetsDetail } from '@interface/assets';

// recoil
import { UserAddress } from '@recoil/auth';

interface AssetsDetail {
    nftAssets: IAssetsDetail;
    handleMarketCancel: (nft: IAssetsDetail) => void;
}

function BookmarkPanel({ nftAssets, handleMarketCancel }: AssetsDetail) {
    const userAddress = useRecoilValue(UserAddress);
    const navigate = useNavigate();

    return (
        <StickyBox>
            <SingleContainer>
                <StatusLabelBox>
                    준비중
                </StatusLabelBox>
                <StatusText>
                    크리에이터의 아이디어를 응원해주세요.
                </StatusText>
                <BookmarkeImage src="/img/creative_challenge/img_bookmark.png" />

                <BookmarkeText>
                    <span>0</span>
                    {' '}
                    명이 아이디어를 응원 중이에요.
                </BookmarkeText>

                <BookmarkButton>
                    응원하기

                    <CommingSoon>출시예정</CommingSoon>
                </BookmarkButton>

                {userAddress.address === nftAssets.owner_address
                && (
                    <ModifyBox>
                        <ModifyBoxButton
                            type="modify"
                            onClick={() => navigate(`/challenge-create?type=edit&tokenId=${nftAssets.asset_id}`)}
                        >
                            수정하기

                        </ModifyBoxButton>
                        <ModifyBoxButton
                            type="delete"
                            onClick={() => handleMarketCancel(nftAssets)}
                        >
                            삭제하기

                        </ModifyBoxButton>
                    </ModifyBox>
                )}

            </SingleContainer>
        </StickyBox>
    );
}

const StickyBox = styled.div`
    flex-basis: 396px;
    margin-top: 45px;
    position: relative;
`;

const SingleContainer = styled.div`
    position: sticky;
    left: 0;
    top: 112px;
    z-index: 999;
    padding-left: 32px;
    text-align: center;
`;

const StatusLabelBox = styled.div`
    width: 60px;
    height: 30px;
    background-color: ${rgba(colors.Green100, 0.1)};
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: ${colors.Green100};
    font-size: 13px;
`;

const StatusText = styled.div`
    color: ${colors.Black100};
    font-weight: 500;
    margin-top: 16px;
    font-size: 16px;
`;

const BookmarkeImage = styled('img')`
    width: 168px;
    margin-top: 32px;
`;

const BookmarkeText = styled.div`
    margin-top: 30px;
    font-size: 13px;
    font-weight: 300;
    color: ${colors.Black100};

    span {
        font-weight: 500;
    }
`;

const ModifyBox = styled.div`
    margin-top: 12px;
`;

const ModifyBoxButton = styled.div<{type: string}>`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-bottom: 12px;
    font-size: 16px;
    cursor: pointer;
    font-weight: ${(props) => (props.type === 'modify' ? '500' : '400')};
    color: ${(props) => (props.type === 'modify' ? colors.Black100 : rgba(colors.Black100, 0.5))};
    height: ${(props) => (props.type === 'modify' ? '58px' : 'inherit')};
    border: 1px solid ${(props) => (props.type === 'modify' ? colors.BlueGray400 : 'transparent')};

    &:hover {
        background-color: ${(props) => (props.type === 'modify' ? colors.BlueGray300 : 'transparent')};
        color: ${colors.Black100};
        text-decoration: ${(props) => (props.type === 'modify' ? 'none' : 'underline')};
    }
`;

const BookmarkButton = styled.div`
    width: 100%;
    height: 58px;
    background-color: ${colors.White100};
    border: 1px solid ${colors.BlueGray400};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    font-size: 16px;
    font-weight: 500;
    color: ${colors.BlueGray500};
    position: relative;

    &::before {
        width: 20px;
        height: 20px;
        content: url('/img/creative_challenge/ic_bookmark.svg');
        margin-right: 4px;
    }
`;

const CommingSoon = styled.div`
    width: 90px;
    height: 36px;
    background-color: ${colors.Orange100};
    color: ${colors.White100};
    border-radius: 4px;
    position: absolute;
    right: -12px;
    top: -18px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 400;

    &::before {
        /* width: 14px; */
        content: url('/img/creative_challenge/ic_bookmark_arrow.svg');
        position: absolute;
        left: 0;
        top: 100%;
        margin-top: -9px;
    }
`;

export default BookmarkPanel;
