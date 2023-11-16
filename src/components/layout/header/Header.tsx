import React, { useState, useMemo } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { transparentHeader } from '@utils/help';
import { useRecoilValue, useRecoilState } from 'recoil';
import useScroll from '@components/common/utils/useScroll';
import { useTranslation } from 'react-i18next';
import { useChain } from '@utils/interact';

// recoil
import { UserAddress, LocalseType, Chain } from '@recoil/auth';

// Components
import Wallets from '@components/layout/header/Wallets';
import { Languages } from '@root/src/locales/i18n';

function Header() {
    // 번역팩
    const { i18n } = useTranslation();

    // 번역 리스트
    const languages = ['en', 'ko', 'ch', 'hk'];

    // 현제 번역 타입
    const [localeType, setLocaleType] = useRecoilState<string>(LocalseType);

    const navigate = useNavigate();
    const [isWallet, setIsWallet] = useState<boolean>(false);
    const userAddress = useRecoilValue(UserAddress);
    const chainId = useRecoilValue(Chain);
    const { pathname } = useLocation();

    // 스크롤 Y 값
    const { y } = useScroll();

    // 번역 팩 바꿔주기
    const handleChangeLanguage = (lang: Languages) => {
        i18n.changeLanguage(lang);
        setLocaleType(lang);
        localStorage.setItem('locale', lang);
    };

    // 로고 링크
    const handleLogo = () => navigate('/');

    // 마이 페이지 링크 분기처리
    const handdleLink = async (action: string) => {
        // 로그인 안되어있으면 로그인 페이지로
        if (userAddress.address === '') {
            window.location.assign(`/login?location=${window.location.pathname}`);
            return;
        }

        navigate(action === 'create' ? '/create' : `/mypage/${userAddress.address}`);
    };

    // 지갑 사이드 바 이벤트
    const handleShowWallet = () => {
        // 로그인 안되어있으면 로그인 페이지로
        if (userAddress.address === '') {
            window.location.assign(`/login?location=${window.location.pathname}`);
            return;
        }

        setIsWallet(true);
    };

    const getHeaderType = useMemo(() => {
        if (transparentHeader(pathname) && y < 200) {
            return 'transparent';
        }

        if (transparentHeader(pathname) && y < 200) {
            return colors.White100;
        }

        return rgba(colors.White100, 0.75);
    }, [pathname, y]);

    return (
        <>
            <Headers type={getHeaderType} isMain={transparentHeader(pathname)} yScroll={y}>
                <Container>
                    {/* 로고 */}
                    <Logo>
                        <LogoImage type={getHeaderType} onClick={handleLogo} />
                    </Logo>
                    {/* GNB */}
                    <GnbList>
                        {/* Premium Market */}
                        {/* <GnbItem type={getHeaderType} icon="premium">
                            <Link to="/premium-market">핫한 크리에이터</Link>
                        </GnbItem> */}

                        {/* Market Place */}
                        <GnbItem type={getHeaderType}>
                            <Link to="/marketplace">마켓플레이스</Link>
                        </GnbItem>

                        {/* Creative Challenge */}
                        {/* <GnbItem type={getHeaderType}>
                            <Link to="/creative-challenge">크리에이티브 챌린지</Link>
                        </GnbItem> */}

                        {/* 공지사항 */}
                        <GnbItem type={getHeaderType}>
                            <a
                                href="https://conuts.zendesk.com/hc/ko/categories/18111212206361-%EA%B3%B5%EC%A7%80%EC%82%AC%ED%95%AD"
                                target="_blank"
                                rel="noreferrer"
                            >
                                공지사항
                            </a>
                        </GnbItem>
                        {/* 공지사항 */}
                        <GnbItem type={getHeaderType}>
                            <a
                                href="https://conuts.zendesk.com/hc/ko/requests/new"
                                target="_blank"
                                rel="noreferrer"
                            >
                                1:1문의
                            </a>
                        </GnbItem>
                    </GnbList>
                    <WalletBox>
                        {userAddress.address !== '' && (
                            <>
                                {/* 민팅 Create 버튼 */}
                                <Create onClick={() => handdleLink('create')}>
                                    <CreateImage
                                        src="/img/layout/header/ic_create.svg"
                                        width={18}
                                        height={18}
                                        alt="create"
                                    />
                                    <CreateText>상품만들기</CreateText>
                                </Create>

                                {/* 지갑 연결 */}
                                <Wallet onClick={() => handdleLink('wallet')}>
                                    {/* 로그인 후 올바른 네트워크 일 경우 */}
                                    {userAddress.address !== '' && useChain[chainId] && (
                                        <WalletAfterLogin>
                                            <MyPageImage
                                                src="/img/layout/header/ic_join_black.svg"
                                                alt="wallet"
                                            />
                                        </WalletAfterLogin>
                                    )}
                                </Wallet>

                                {/* 유저 프로필 */}
                                <Wallet type="user" onClick={handleShowWallet}>
                                    {/* 로그인 후 올바른 네트워크 일 경우 */}
                                    {userAddress.address !== '' && useChain[chainId] && (
                                        <WalletAfterLogin>
                                            <MyPageImage
                                                src="/img/layout/header/ic_login_black.svg"
                                                alt="wallet"
                                            />
                                        </WalletAfterLogin>
                                    )}
                                </Wallet>
                            </>
                        )}

                        {userAddress.address === '' && (
                            <>
                                {/* 민팅 Create 버튼 */}
                                <Register
                                    type={getHeaderType}
                                    action="join"
                                    onClick={() => navigate('/join')}
                                >
                                    회원가입
                                </Register>
                                <Register
                                    type={getHeaderType}
                                    action="login"
                                    onClick={() => navigate('/login')}
                                >
                                    로그인
                                </Register>
                            </>
                        )}

                        {/* 번역 */}
                        <LocaleBox>
                            {/* 선택된 번역 */}
                            <Locales type={getHeaderType}>{localeType.toUpperCase()}</Locales>

                            {/* 번역 드랍다운 */}
                            <LocaleDropBox>
                                {languages.map((lang) => (
                                    <LocalseItems
                                        key={lang}
                                        onClick={() => handleChangeLanguage(lang)}
                                    >
                                        <LocalseItemsText>{lang.toUpperCase()}</LocalseItemsText>
                                    </LocalseItems>
                                ))}
                            </LocaleDropBox>
                        </LocaleBox>
                    </WalletBox>
                </Container>
            </Headers>

            {/* 지갑 사이드 바 */}
            {isWallet && <Wallets setIsWallet={setIsWallet} />}
        </>
    );
}

const CreateImage = styled('img')`
    transition: all 0.2s linear;
`;

const MyPageImage = styled('img')``;

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
`;

const Headers = styled.header<{ type: string; isMain: boolean; yScroll: number }>`
    width: 100%;
    height: 80px;
    position: fixed;
    backdrop-filter: blur(16px);
    background-color: ${(props) => props.type};
    box-shadow: ${(props) =>
        props.isMain && props.yScroll < 200
            ? '0'
            : `0px 4px 5px 0px ${rgba(colors.Black100, 0.05)}`};
    border-bottom: ${(props) =>
        props.isMain && props.yScroll < 200 ? '0' : `1px solid ${rgba(colors.White100, 0.2)}`};
    left: 0;
    top: 0;
    z-index: 1000;
`;

const Logo = styled.div`
    flex-basis: 177px;
    width: 177px;
    position: relative;
`;

const LogoImage = styled.div<{ type: string }>`
    cursor: pointer;
    background-image: url('/img/layout/header/ic_brand_logo.png');
    background-repeat: no-repeat;
    background-position: center center;
    width: 177px;
    height: 32px;
    background-size: contain;
`;

const GnbList = styled.div`
    flex-basis: calc(100% - 477px);
    width: calc(100% - 477px);
    padding-left: 80px;
    display: flex;
    align-items: center;
`;

const GnbItem = styled.div<{ type: string; icon?: string }>`
    font-size: 15px;
    font-weight: 400;
    margin-right: 40px;
    display: flex;
    align-items: center;

    &::before {
        width: 20px;
        height: 20px;
        margin-right: 4px;
        display: ${(props) => (props.icon ? 'block' : 'none')};
        content: url(${(props) => `/img/layout/header/ic_${props.icon}.svg`});
    }

    a {
        color: ${colors.Black100};
        transition: all 0.2s ease;
        font-weight: 500;
        font-size: 15px;

        &:hover {
            text-decoration: underline;
            transition: all 0.2s ease;
        }
    }
`;

const WalletBox = styled.div`
    flex-basis: 40%;
    min-height: 80px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    position: relative;
`;

const CreateText = styled.span`
    color: ${colors.White100};
    margin-left: 4px;
    font-weight: 500;
    transform: scale(0);
    position: absolute; ;
`;

const Create = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    overflow: hidden;
    border-radius: 20px;
    color: ${colors.White100};
    transition: all 0.2s linear;
    position: relative;

    &::after {
        width: 100%;
        height: 100%;
        content: '';
        display: block;
        background: linear-gradient(135deg, #f63369 0%, #8140e6 100%);
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        animation: AnimationName 3s linear infinite;
        animation-direction: alternate;
        background-size: 200% 150%;

        @keyframes AnimationName {
            0% {
                background-position: 30%;
            }
            50% {
                background-position: 70%;
            }
            100% {
                background-position: 30%;
            }
        }
    }

    &:hover {
        width: 117px;
        transition: all 0.2s linear;

        ${CreateText} {
            transform: scale(1);
            position: static;
            transition-delay: 0.2s;
        }

        ${CreateImage} {
            transform: rotate(-90deg);
            /* transition-delay: .2s; */
        }
    }
`;

// const ConutSwap = styled.div`
//     background-image: url('/img/layout/header/img_conut_swap.svg');
//     width: 120px;
//     height: 40px;
//     color: ${colors.Black200};
//     font-size: 15px;
//     font-weight: 500;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;;
//     padding-right: 20px;
//     padding-left: 6px;
//     cursor: pointer;
//     margin-left: 12px;
//     position: relative;

//     &::before {
//         display: block;
//         content:url('/img/layout/header/ic_conut_swap.svg');
//         width: 24px;
//         height: 24px;
//     }

//     &::after {
//         display: block;
//         content:url('/img/layout/header/img_conut_swap_comming.svg');
//         width: 79px;
//         height: 30px;
//         position: absolute;
//         top: calc(100% + 4px);
//         left: 50%;
//         transform: translate(-50%, 0);
//     }

//     &:hover {
//         text-decoration: underline;
//     }
// `;

const Register = styled.div<{ type: string; action: string }>`
    width: 120px;
    background: ${(props) =>
        props.action === 'join'
            ? 'linear-gradient(90deg, #2F9AEA 0%, #853AE5 100%)'
            : 'linear-gradient(90deg, #F5286E -5.38%, #FAAA2D 116.92%)'};
    height: 40px;
    color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 999px;
    padding-right: 20px;
    padding-left: 4px;
    cursor: pointer;
    margin-left: 12px;

    &::before {
        display: block;
        content: url(${(props) => `/img/layout/header/ic_${props.action}.svg`});
        width: 40px;
        height: 40px;
    }

    &:hover {
        text-decoration: underline;
    }
`;

const Wallet = styled.div<{ type?: string }>`
    cursor: pointer;
    margin-left: ${(props) => (props.type ? '4px' : '8px')};
`;

const WalletAfterLogin = styled.div`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;

    &:hover {
        transition: all 0.2s ease;
        background: ${rgba(colors.White100, 0.1)};
    }
`;

const LocaleDropBox = styled.div`
    position: absolute;
    width: 68px;
    right: -14px;
    top: 100%;
    border: 1px solid ${colors.White100};
    background-color: ${colors.Black200};
    display: none;

    &::before {
        width: 8px;
        height: 8px;
        content: '';
        display: block;
        border: 1px solid ${colors.White100};
        background-color: ${colors.Black200};
        transform: rotate(45deg);
        position: absolute;
        top: -4px;
        left: 50%;
        margin-left: -4px;
        z-index: 1;
    }

    &::after {
        width: 16px;
        height: 16px;
        content: '';
        display: block;
        border: 1px solid ${colors.Black200};
        background-color: ${colors.Black200};
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -8px;
        z-index: 1;
    }
`;

const LocalseItems = styled.div`
    font-size: 14px;
    color: ${colors.White100};
    cursor: pointer;
    text-align: center;
    background-color: ${colors.Black200};
    padding: 0 7px;
    position: relative;
    z-index: 2;

    &:last-of-type {
        border: 0;
    }

    &:hover {
        background-color: ${rgba(colors.White100, 0.15)};
    }
`;

const LocalseItemsText = styled.div`
    padding: 5px 0;
    border-bottom: 1px solid ${rgba(colors.White100, 0.3)};
`;

const Locales = styled.div<{ type: string }>`
    font-size: 14px;
    flex: 1;
    color: ${colors.Black100};
    cursor: pointer;
`;

const LocaleBox = styled.div`
    position: relative;
    height: 40px;
    width: 40px;
    margin-left: 22px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    text-align: center;

    &:hover {
        background-color: ${rgba(colors.Black200, 0.1)};

        ${LocaleDropBox} {
            display: block;
        }
    }
`;

export default Header;
