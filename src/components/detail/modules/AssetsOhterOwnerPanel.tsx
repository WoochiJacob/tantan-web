import { useMemo } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { IOwnerList } from '@interface/assets';
import { useNavigate } from 'react-router-dom';

interface IAssetsOtherOwnerPanel {
    ownerList: IOwnerList[] | null;
    setOwnerListModal: any;
}

function AssetsOhterOwnerPanel({ ownerList, setOwnerListModal }: IAssetsOtherOwnerPanel) {
    const navigate = useNavigate();
    // 오너리스트 최저가 순으로 자르기
    const getOwnerLists = useMemo(():any => {
        if (!ownerList) return null;

        const saleMarketFilter = ownerList.filter((market) => market.is_display !== 0);

        return saleMarketFilter.slice(0, 3);
    }, [ownerList]);

    return (
        <AssetsOtherOwner>
            <OtherOwnerTitleBox>
                <OtherOwnerTitle>
                    판매자
                </OtherOwnerTitle>

                {/* 다른 판매자 모달 버튼 */}
                <OtherOwnerMoreButton
                    onClick={() => setOwnerListModal(true)}
                >
                    다른 판매자 더 보기
                </OtherOwnerMoreButton>
            </OtherOwnerTitleBox>

            {getOwnerLists && getOwnerLists.length > 0 && (
                <OtherOwnerLinstGroup>
                    {/* 오너리스트 최저가 3개만 보여준다. */}
                    {getOwnerLists.map((ownerList: any, index: number) => (
                        <OtherOwnerListItem
                            key={ownerList.nft_asset_id}
                            index={index}
                            onClick={() => navigate(`/marketplace/${ownerList.contract_address}/${ownerList.nft_asset_id}`)}
                        >
                            <UserProfile>
                                <Profile src={ownerList.image_profile} />
                            </UserProfile>
                            <OwverInfomationBox>
                                <OwverPrice>
                                    <Price>
                                        {ownerList.price.toLocaleString()}
                                        <span>{ownerList.token_type === 'KRW' ? 'KRW' : 'CONUT'}</span>
                                    </Price>

                                    {index === 0 && <MinPriceLabel src="/img/assets_detail/ic_min_pirce_label.svg" />}
                                </OwverPrice>
                                <OwverSupply>
                                    판매중인 수량
                                    {' '}
                                    {ownerList.quantity.toLocaleString()}
                                </OwverSupply>
                                <OwverName>
                                    <UserName>
                                        {ownerList.user_name}
                                    </UserName>
                                    <EndData>
                                        {ownerList.expiration_date ? ownerList.expiration_date.split(' ')[0] : '-'}
                                    </EndData>
                                </OwverName>
                            </OwverInfomationBox>
                        </OtherOwnerListItem>
                    ))}
                </OtherOwnerLinstGroup>
            )}

            {(!getOwnerLists || getOwnerLists.length === 0) && (
                <OwnerListEmptyBox>
                    현재 판매중인
                    {' '}
                    <span>판매자</span>
                    가 없습니다.
                </OwnerListEmptyBox>
            )}
        </AssetsOtherOwner>
    );
}

const OwnerListEmptyBox = styled.div`
    width: 100%;
    height: 246px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 14px;
    font-size: 13px;

    span {
        color: ${colors.Red100};
        font-weight: 500;
        margin-left: 2px;
    }
`;

const AssetsOtherOwner = styled.div`
    margin-top: 28px;
`;

const OtherOwnerTitleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const OtherOwnerTitle = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const OtherOwnerLinstGroup = styled.div`
    margin-top: 8px;
`;

const OtherOwnerListItem = styled.div<{index: number}>`
    display: flex;
    height: 100px;
    border: 1px solid ${(props) => (props.index === 0 ? colors.Orange100 : 'transparent')};
    background-color: ${colors.White100};
    padding: 16px;
    border-radius: 8px;
    margin-top: 8px; 
    margin-bottom: 6px;
    cursor: pointer;

    &:hover {
        border-color: ${colors.Orange100};
    }

    &:first-of-type {
        margin-top: 0;
    }
`;

const OtherOwnerMoreButton = styled.div`
    font-size: 14px;
    color: ${colors.BlueGray700};
    cursor: pointer;
    display: flex;
    align-items: center;

    &::after {
        width: 6px;
        height: 12px;
        content: '';
        display: block;
        background-image: url('/img/assets_detail/ic_asset_more.svg');
        background-size: contain;
        margin-left: 4px;
    }

    &:hover {
        text-decoration: underline;
        color: ${colors.BlueGray800};

        &::after {
            background-image: url('/img/assets_detail/ic_asset_more_hover.svg');
        }
    }
`;

const UserProfile = styled.div`
    flex-basis: 34px;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${colors.Black200};
`;

const Profile = styled('img')`
    width: 34px;
    height: 34px;
    object-fit: cover;
`;

const OwverInfomationBox = styled.div`
    padding-left: 16px;
    flex-basis: calc(100% - 34px);
    display: flex;
    flex-direction: column;
`;

const OwverPrice = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Price = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${colors.Black100};
    height: 20px;

    span {
        font-size: 12px;
        margin-left: 4px;
        font-weight: 400;
    }
`;

const MinPriceLabel = styled('img')`
    width: 80px;
`;

const OwverSupply = styled.div`
    font-size: 12px;
    color: ${colors.BlueGray700};
    margin-top: 4px;
`;

const OwverName = styled.div`
    margin-top: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const UserName = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
`;

const EndData = styled.div`
    font-size: 13px;
    color: ${colors.BlueGray700};
`;

export default AssetsOhterOwnerPanel;
