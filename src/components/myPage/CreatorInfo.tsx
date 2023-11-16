import React, { useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { nl2br } from '@utils/help';
import { useTranslation } from 'react-i18next';
import ReactTooltip from 'react-tooltip';

// Interface
import { IProfileInfo } from '@interface/mypage';

// Components
import AssetsModalContainer from '@components/detail/modals/AssetsModalContainer';

interface ICreatorInfo {
    userProfile: IProfileInfo;
}

function CreatorInfo({ userProfile }: ICreatorInfo) {
    const { t } = useTranslation();
    const [descriptionModal, setDescriptionModal] = useState<boolean>(false);
    const userTotalData = userProfile;

    const totalPrice = (price: any): number | string => (Number(price[0].sumpp) ? Number(price[0].sumpp).toFixed(0) : 0);

    return (
        <CreatorDetailInfo>
            <ReactTooltip />
            <DetailInfoBox isLeft>
                <DetailTitle>{t('MyPage.myStatus')}</DetailTitle>
                <AssetInfoBox>
                    <AssetInfo>
                        <AssetTitle>창작한 상품</AssetTitle>
                        <Assets isUnit={false}>
                            {userTotalData && userTotalData.CounT ? userTotalData.CounT : 0}
                        </Assets>
                    </AssetInfo>
                    <AssetInfo>
                        <AssetTitle>
                            {t('MyPage.maxPrice')}
                            <ToolTip
                                src="/img/main/ic_drop_market_guide.svg"
                                data-tip="판매중 포함"
                            />
                        </AssetTitle>
                        <Assets isUnit>
                            {userTotalData && userTotalData.MaxP ? userTotalData.MaxP.toFixed(3) : 0}
                        </Assets>
                    </AssetInfo>
                    <AssetInfo>
                        <AssetTitle>
                            {t('MyPage.firstPrice')}
                            <ToolTip
                                src="/img/main/ic_drop_market_guide.svg"
                                data-tip="판매중 포함"
                            />

                        </AssetTitle>
                        <Assets isUnit>
                            {userTotalData && userTotalData.MinP ? userTotalData.MinP.toFixed(3) : 0}
                        </Assets>
                    </AssetInfo>
                    <AssetInfo>
                        <AssetTitle>{t('MyPage.totalPrice')}</AssetTitle>
                        <Assets isUnit>
                            {userTotalData && totalPrice(userTotalData.SumP)}
                        </Assets>
                    </AssetInfo>
                </AssetInfoBox>
            </DetailInfoBox>
            <DetailInfoBox isLeft={false}>
                <DetailTitle>{t('MyPage.creatorInfomation')}</DetailTitle>
                <CreatorDescriptionBox>
                    <CreatorDescription dangerouslySetInnerHTML={{ __html: nl2br(userProfile.profileInfo.user_bio || '-') }} />
                </CreatorDescriptionBox>
                {userProfile.profileInfo.user_bio && (
                    <CreatorDescriptionMore
                        onClick={() => setDescriptionModal(true)}
                    >
                        {t('MyPage.moreButton')}
                    </CreatorDescriptionMore>
                )}
            </DetailInfoBox>

            {descriptionModal && (
                <AssetsModalContainer
                    title={t('MyPage.creatorInfomation')}
                    contents={userProfile.profileInfo.user_bio || ''}
                    setDescriptionModal={setDescriptionModal}
                />
            )}
        </CreatorDetailInfo>
    );
}

const ToolTip = styled('img')`
    width: 14px;
    margin-left: 4px;
    cursor: pointer;
`;

const CreatorDetailInfo = styled.div`
    margin-top: 44px;
    display: flex;
    justify-content: space-between;
`;

const DetailInfoBox = styled.div<{isLeft: boolean}>`
    flex-basis: 50%;
    width: 50%;
    word-break: keep-all;
    padding-left: ${(props) => (props.isLeft ? 0 : '70px')};
    padding-right: ${(props) => (props.isLeft ? '70px' : 0)};
`;

const DetailTitle = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    min-height: 20px;
    min-width: 20px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.BlueGray400};
    
`;

const AssetInfoBox = styled.div`
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const AssetInfo = styled.div`
    flex-basis: 25%;
`;

const AssetTitle = styled.div`
    font-size: 13px;
    color: ${colors.BlueGray700};
    display: flex;
    align-items: center;
`;

const Assets = styled.div<{isUnit: boolean}>`
    margin-top: 12px;
    font-size: 20px;
    font-weight: 500;
    color: ${colors.Black100};
    display: flex;
    align-items: center;

    &::before {
        display: ${(props) => (props.isUnit ? 'block' : 'none')};
        width: 19px;
        height: 19px;
        content: '';
        background-image: url('/img/common/ic_mypage_symbol.svg');
        background-size: contain;
        background-repeat: no-repeat;
        margin-right: 4px;
    }
`;

const CreatorDescription = styled.div`
    margin-top: 15px;
    font-size: 14px;
    color: ${colors.Black100};
    line-height: 1.5;
`;

const CreatorDescriptionBox = styled.div`
    max-height: 100px;
    overflow: hidden;
`;

const CreatorDescriptionMore = styled.div`
    font-size: 14px;
    margin-top: 12px;
    color: ${colors.Black100};
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 70px;

    &::after {
        width: 7px;
        height: 14px;
        content: '';
        display: block;
        background-image: url('/img/assets_detail/ic_asset_more.svg');
        margin-left: 4px;
    }

    &:hover {
        text-decoration: underline;
    }
`;

export default CreatorInfo;
