import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';

// Interface
import { IProfileInfo } from '@interface/mypage';

// recoil
import { UserAddress } from '@recoil/auth';

interface ICreatorTop {
    userProfile: IProfileInfo;
    wallert_address: string;
}

function CreatorTop({ userProfile, wallert_address }: ICreatorTop) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userAddress = useRecoilValue(UserAddress);
    return (
        <CreatorInfo>
            <CreatorName>
                <span>{t('MyPage.creator')}</span>
                {userProfile.profileInfo.user_name}
            </CreatorName>
            <CreatorSetting>
                {userAddress.address === wallert_address && (
                    <SettingButton
                        width={170}
                        black={false}
                        onClick={() => navigate('/mypage/edit')}
                    >
                        {t('MyPage.modifyProfile')}
                    </SettingButton>
                )}
            </CreatorSetting>
        </CreatorInfo>
    );
}

const CreatorSetting = styled.div`
    flex-basis: 50%;
    display: flex;
    align-items: center;
    padding-left: 70px;
`;

const SettingButton = styled.div<{width: number, black: boolean}>`
    background-color: ${colors.White100};
    color: ${colors.Black100};
    width: 149px;
    border: 1px solid ${colors.BlueGray500};
    height: 48px;
    border-radius: 8px;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &::before {
        width: 17px;
        height: 17px;
        background-image: url("/img/myPage/ic_edit.svg");
        background-size: contain;
        display: block;
        content: '';
        margin-right: 11px;
    }

    &:hover {
        color: ${colors.Black200};
        background-color: ${colors.BlueGray500};
    }
`;

const CreatorInfo = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CreatorName = styled.div`
    color: ${colors.Black100};
    display: flex;
    flex-direction: column;
    font-size: 24px;
    flex-basis: 50%;

    span {
        color: ${colors.Black100};
        font-size: 16px;
        font-family: ${fonts.Tinos};
        margin-bottom: 6px;
    }
`;

export default CreatorTop;
