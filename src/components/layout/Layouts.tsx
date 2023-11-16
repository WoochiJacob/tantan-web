import React, {
    useEffect, useCallback, useState, useMemo,
} from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import qs from 'qs';
import { useRecoilState } from 'recoil';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { colors } from '@styles/ui_palette';
import { Axios, AwsS3, CaverOption } from '@utils/api';
import { checkUserInfo, transparentHeader } from '@utils/help';
import {
    Logout, useChain,
} from '@utils/interact';
import { useTranslation } from 'react-i18next';

// Components
import Header from '@components/layout/header/Header';
import Footer from '@components/layout/footer/Footer';
import QrModal from '@components/layout/QrModal';
import ServerChecked from '@components/common/ServerChecked';
// recoil
import {
    UserAddress, Chain, LocalseType, KlipKey,
} from '@recoil/auth';

const Caver = require('caver-js');

function Layouts() {
    const { t, i18n } = useTranslation();
    const caver = new Caver(new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', CaverOption));
    const [, setUserAddress] = useRecoilState(UserAddress);
    const [requestKey] = useRecoilState<string>(KlipKey);
    const [, setLocaleType] = useRecoilState(LocalseType);
    const [chainId] = useRecoilState(Chain);
    const [isLoading, setisLoading] = useState(false);
    const [isServer, setServer] = useState<boolean>(false);
    const [serverMessage, setServerMessage] = useState<string>('');
    const { pathname } = useLocation();

    // 새로고침시 로그인 여부 체크하는 함수
    const checkLogin = useCallback(async () => {
        const getLocalStorage = localStorage.getItem('loginState');
        const localeLocaltroage = localStorage.getItem('locale');

        // 로컬 스토리지 체크
        if (localeLocaltroage) {
            setLocaleType(localeLocaltroage);
            i18n.changeLanguage(localeLocaltroage);
        }

        if (getLocalStorage) {
            // 로컬스토리지 데이터가 있으면 JSON형식으로 파싱
            const loginState = qs.parse(getLocalStorage, {
                ignoreQueryPrefix: true,
            });

            // 로그인 세션 6시간 체크
            if (Number(loginState.expire) < Date.now()) {
                setisLoading(true);
                Logout(t);
                return;
            }

            // 로컬스토리지 데이터에 지갑주소가 없으면 함수 return
            if (!loginState.wallet_address) {
                setisLoading(true);
                return;
            }
            // 지갑 잔액 가져오기
            const balance = await caver.klay.getBalance(loginState.wallet_address);

            // LOGIN API
            try {
                const { data } = await Axios('register', getLocalStorage);

                localStorage.setItem('loginState', getLocalStorage);
                localStorage.setItem('token', data.token);
                const isCheckUserInfo = checkUserInfo(data);

                // 로그인 데이터 Recoil에 저장해준다.
                setUserAddress({
                    address: loginState.wallet_address.toString().toLowerCase(),
                    status: 'succese',
                    balance: caver.utils.convertFromPeb(balance, 'KLAY'),
                    token: data.token,
                    user_name: data.user_name,
                    user_email: data.user_email,
                    image_profile: data.image_profile,
                    vip_gb: data.vip_gb.toString(),
                    shipping_name: data.shipping_name,
                    phone_num: data.phone_num,
                    shipping_addr: data.shipping_addr,
                    shipping_addr2: data.shipping_addr2,
                    zip_code: data.zip_code,
                    isCertification: isCheckUserInfo,
                    adult: data.adult,
                    birth: data.birth,
                    name: data.name,
                    foreigner: data.foreigner,
                    gender: data.gender,
                });

                setisLoading(true);
            } catch (error) {
                setisLoading(false);
                Store.addNotification({
                    title: t('Notification.errorTitle'),
                    message: t('Notification.tryMessage'),
                    type: 'danger',
                    insert: 'top',
                    container: 'top-left',
                    animationIn: ['animate__animated', 'animate__fadeIn'],
                    animationOut: ['animate__animated', 'animate__fadeOut'],
                    dismiss: {
                        duration: 5000,
                    },
                });
            }
        } else {
            setisLoading(true);
        }
    }, []);

    const handleServerCheck = async () => {
        try {
            // S3에서 현제 서버 점검중인지 체크
            const data = await AwsS3();

            // 서버 점검중이면 서버점검 UI로 바꿔주는 함수 실행
            if (data) {
                setServer(data.staus);
                setServerMessage(data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const hadleInit = async () => {
        // 서버 상태 체크
        await handleServerCheck();

        // 서버 상태 체크 이상 없으면
        if (!isServer) {
            // 로그인체크
            checkLogin();
        }
    };

    const getContentsHeight = useMemo(() => {
        if (transparentHeader(pathname)) {
            return 0;
        }

        if (!useChain[chainId]) {
            return 124;
        }
        return 80;
    }, [pathname]);

    useEffect(() => {
        // 가장먼저 실행하는 함수
        hadleInit();
    }, []);

    return (
        <LayoutBlock>
            {!isServer && isLoading && (
                <>
                    {/* HEADER 영역 */}
                    <Header />

                    {/* 네트워크 체크 베너 */}
                    {!useChain[chainId] && (
                        <OtherNetworkBanner>
                            <NetworkBannerBox>
                                <NetworkText>
                                    <BannerIcon src="/img/common/ic_network_banner.svg" />
                                    {t('Header.useNotMainnet')}
                                </NetworkText>
                                <NetworkMoreBtn>
                                    <NetworkChangeBtn>
                                        {t('Header.changeMainnet')}
                                        <BannerIconArrow src="/img/common/ic_network_arrow.svg" />
                                    </NetworkChangeBtn>
                                </NetworkMoreBtn>
                            </NetworkBannerBox>
                        </OtherNetworkBanner>
                    )}

                    {/* BODY 영역 */}
                    <BodySection height={getContentsHeight}>
                        <ReactNotifications />
                        <Outlet />
                    </BodySection>

                    {/* FOOTER 영역 */}
                    <Footer />
                </>
            )}

            {/* 서버 점검중 UI */}
            {isServer && (
                <>
                    <ReactNotifications />
                    <ServerChecked message={serverMessage} />
                </>
            )}

            {requestKey !== '' && (
                <QrModal />
            )}
        </LayoutBlock>
    );
}

const LayoutBlock = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;

const BodySection = styled.div<{height: number}>`
    padding-top: ${(props) => (`${props.height}px`)};
`;

const OtherNetworkBanner = styled.div`
    width: 100%;
    height: 44px;
    background-color: ${colors.Orange100};
    position: fixed;
    top: 80px;
    left: 0;
    z-index: 999;
`;

const NetworkBannerBox = styled.div`
    width: 1280px;
    height: 44px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${colors.White100};
`;

const BannerIcon = styled('img')`
    width: 20px;
    margin-right: 8px;
`;

const NetworkText = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const NetworkMoreBtn = styled.div`
    align-items: center;
    display: flex;
    justify-content: flex-end;
`;

const NetworkChangeBtn = styled.div`
    cursor: pointer;
    color: ${colors.White100};
    align-items: center;
    display: flex;

    &:hover {
        text-decoration: underline;
    }
`;

const BannerIconArrow = styled('img')`
    width: 7px;
    margin-left: 5px;
`;

export default Layouts;
