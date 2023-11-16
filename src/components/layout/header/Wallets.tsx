import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useRecoilValue } from 'recoil';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Store } from 'react-notifications-component';
import { Logout, useChain } from '@utils/interact';
import { sliceAddress } from '@utils/help';
import { useTranslation } from 'react-i18next';

// recoil
import { UserAddress, Chain } from '@recoil/auth';

interface IWallet {
    setIsWallet: any
}

function Wallet({
    setIsWallet,
}: IWallet) {
    const { t } = useTranslation();
    const userAddress = useRecoilValue(UserAddress);
    const chainId = useRecoilValue(Chain);

    const CopyNoti = () => {
        Store.addNotification({
            title: t('Notification.succeseTitle'),
            message: t('Notification.copyMessage'),
            type: 'default',
            insert: 'top',
            container: 'top-left',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
                duration: 1000,
            },
        });
    };

    const handleLogout = () => {
        setIsWallet(false);
        Logout(t);
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <WalletContainer>
            <MyWalletBox>
                <MyWallet>
                    <WalletTitle>
                        {t('Header.myWallet')}
                        <CloseButton
                            src="/img/layout/header/ic_wallet_close.svg"
                            onClick={() => setIsWallet(false)}
                        />
                    </WalletTitle>
                    <UserProfile>
                        <ProfileImageBox>
                            <ProfileImage src={userAddress.image_profile ? userAddress.image_profile : '/img/common/img_default_profile.png'} />
                        </ProfileImageBox>
                        <TitleSection>
                            <span>{t('Header.creator')}</span>
                            {userAddress.user_name}
                        </TitleSection>
                    </UserProfile>
                    <WalletAdddress>
                        <TitleSection>
                            {t('Header.walletAddress')}
                        </TitleSection>
                        <AdddressBox>
                            <Address>{sliceAddress(userAddress.address)}</Address>
                            <CopyToClipboard
                                text={userAddress.address}
                                onCopy={CopyNoti}
                            >
                                <Copy src="/img/layout/header/ic_clip.svg" />
                            </CopyToClipboard>
                        </AdddressBox>
                    </WalletAdddress>
                    <WalletAdddress>
                        <AdddressBox>
                            <CoinIcon src={`/img/layout/header/ic_${useChain[chainId].name}.svg`} />
                            <BalancePrice>
                                {Number(userAddress.balance).toFixed(4)}
                                <span>{useChain[chainId].symbol === 'KRW' ? 'KLAY' : useChain[chainId].symbol}</span>
                            </BalancePrice>
                        </AdddressBox>
                        <InfoText>
                            {t('Header.myAssetsInfo')}
                        </InfoText>
                    </WalletAdddress>
                    <LogoutBox>
                        <LogoutText onClick={handleLogout}>{t('Header.logaout')}</LogoutText>
                    </LogoutBox>
                </MyWallet>
            </MyWalletBox>
        </WalletContainer>
    );
}

const WalletContainer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    backdrop-filter: blur(16px);
    background-color: ${rgba(colors.Black200, 0.4)};
    z-index: 1001;
    display: flex;
    justify-content: flex-end;
    transition: all 5s ease;
    padding: 35px 40px;
`;

const MyWalletBox = styled.div`
    width: 428px;
    overflow: hidden;
    animation-duration: .3s;
    animation-name: slide;
    border-radius: 8px;
    background-image: url('/img/layout/header/img_wallets_bg.png');
    background-position: center top;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${colors.Black200};

    @keyframes slide {
        from {
            margin-right: -428px;
        }
        to {
            margin-right: 0;
        }
    }
`;

const MyWallet = styled.div`
    width: 438px;
    height: 100%;
    overflow-y: auto;
    padding: 27px 40px;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const WalletTitle = styled.div`
    font-size: 24px;
    color: ${colors.White100};
    font-family: ${fonts.Tinos};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CloseButton = styled('img')`
    width: 32px;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const UserProfile = styled.div`
    margin-top: 60px;
    padding-bottom: 44px;
    border-bottom: 2px solid ${rgba(colors.White100, 0.2)};
`;

const ProfileImage = styled('img')`
    width: 100%;
`;

const ProfileImageBox = styled.div`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const TitleSection = styled.div`
    margin-top: 44px;
    color: ${colors.White100};
    display: flex;
    flex-direction: column;
    font-size: 14px;

    span {
        color: ${colors.White100};
        font-size: 13px;
        font-family: ${fonts.Tinos};
        margin-bottom: 4px;
    }
`;

const WalletAdddress = styled.div`
    margin-bottom: 64px;
`;

const AdddressBox = styled.div`
    width: 100%;
    padding: 16px 12px;
    margin-top: 4px;
    height: 40px;
    color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${rgba(colors.White100, 0.1)};
`;

const Address = styled.div`
    width: 177px;
    line-clamp: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;  /* 말줄임 적용 */
    height: 19px;
`;

const CoinIcon = styled('img')`
    width: 21px;
`;

const Copy = styled('img')`
    width: 20px;
    cursor: pointer;
`;

const InfoText = styled.div`
    margin-top: 9px;
    color: ${rgba(colors.White100, 0.5)};
    font-size: 13px;
    margin-bottom: 64px;
`;

const BalancePrice = styled.div`
    font-size: 24px;
    color: ${colors.White100};
    font-weight: 600;

    span {
        font-size: 14px;
        color: ${colors.White100};
        font-weight: 400;
        margin-left: 5px;
    }
`;

const LogoutBox = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${colors.Black200};
    margin-top: auto;
`;

const LogoutText = styled.div`
    font-size: 14px;
    color: ${rgba(colors.White100, 0.4)};
    cursor: pointer;

    &:hover {
        color: ${rgba(colors.White100, 0.8)};
        text-decoration: underline;
    }
`;

export default Wallet;
