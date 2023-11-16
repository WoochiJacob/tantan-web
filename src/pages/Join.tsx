/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { Store } from 'react-notifications-component';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { prepare } from 'klip-sdk';
import { Axios, loginExpire, getSignResult, CaverOption } from '@utils/api';
import { checkUserInfo } from '@utils/help';

import qs from 'qs';

// recoil
import { UserAddress, KlipKey } from '@recoil/auth';

const Caver = require('caver-js');

function Join() {
    const { t } = useTranslation();
    const [, setRequestKey] = useRecoilState<string>(KlipKey);
    const [, setUserAddress] = useRecoilState(UserAddress);

    const caver = new Caver(
        new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', CaverOption)
    );
    const navigate = useNavigate();

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    const handdleLogin = async () => {
        try {
            const reseponse = await prepare.auth({
                bappName: 'TanTan',
            });

            if (reseponse.request_key && reseponse.request_key !== '') {
                setRequestKey(reseponse.request_key);

                const timerId = setInterval(async () => {
                    try {
                        const { data } = await getSignResult(reseponse.request_key);

                        if (data.result) {
                            const getAddress = data.result.klaytn_address.toLowerCase();
                            const requestKey = reseponse.request_key;

                            // LOGIN PRAMS
                            const params = qs.stringify({
                                wallet_address: getAddress,
                                blockchain: 'klaytn',
                                signature: requestKey,
                                expire: loginExpire,
                            });

                            const balance = await caver.klay.getBalance(getAddress);

                            setRequestKey('');
                            clearInterval(timerId);

                            // LOGIN API
                            try {
                                const { data } = await Axios('register', params);

                                localStorage.setItem('loginState', params);
                                localStorage.setItem('token', data.token);
                                const isCheckUserInfo = checkUserInfo(data);

                                setUserAddress({
                                    address: getAddress,
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

                                Store.addNotification({
                                    ...notiOption,
                                    title: t('Notification.notiTitle'),
                                    message: t('Notification.addToInformation'),
                                    type: 'default',
                                    insert: 'top',
                                    container: 'top-left',
                                });
                                navigate('/mypage/edit?login=true');

                                return;
                            } catch (error) {
                                setUserAddress({
                                    address: '',
                                    status: 'error',
                                    balance: '',
                                    token: '',
                                    user_name: '',
                                    user_email: '',
                                    image_profile: '',
                                    vip_gb: '0',
                                    shipping_name: '',
                                    phone_num: '',
                                    shipping_addr: '',
                                    shipping_addr2: '',
                                    zip_code: '',
                                    isCertification: false,
                                    adult: 0,
                                    birth: '',
                                    name: '',
                                    foreigner: 0,
                                    gender: 0,
                                });
                            }
                        }
                    } catch (error) {
                        Store.addNotification({
                            ...notiOption,
                            title: t('Notification.errorTitle'),
                            message: t('Notification.cancelSign'),
                            type: 'danger',
                            container: 'top-left',
                            insert: 'top',
                        });
                        setRequestKey('');
                        clearInterval(timerId);
                    }
                }, 1000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <LoginBox>
                <Title>회원가입</Title>
                <Description>
                    클립(Klip)지갑 연결 후
                    <br />
                    탄탄의 다양한 서비스를 경험하세요!
                </Description>

                <LoginCard onClick={handdleLogin}>
                    <ImageWrap>
                        <MetamaskLogo src="/img/login/klip_logo.svg" />
                    </ImageWrap>
                    <LoginButton>클립지갑 연결하기</LoginButton>
                </LoginCard>

                <JoinInfoBox>별도의 앱 설치 없이 바로 회원가입이 가능합니다.</JoinInfoBox>
            </LoginBox>
        </Container>
    );
}

const JoinInfoBox = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    font-weight: 300;
    margin-top: 12px;
    text-align: center;
`;

const MetamaskLogo = styled('img')`
    width: 100%;
`;

const Container = styled.div`
    width: 1280px;
    padding: 170px 20px 408px 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const LoginBox = styled.div``;

const Title = styled.div`
    font-size: 40px;
    font-weight: 700;
    text-align: center;
    color: ${colors.Black100};
`;

const Description = styled.div`
    font-size: 20px;
    color: ${colors.Black100};
    margin-top: 12px;
    font-weight: 300;
    text-align: center;
`;

const LoginButton = styled.div`
    color: ${colors.White100};
    height: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;

    &::after {
        background-image: url('/img/login/ic_login_arrow.svg');
        width: 7px;
        height: 14px;
        content: '';
        transition: all 0.2s ease;
        display: block;
        margin-left: 8px;
    }
`;

const LoginCard = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #3382ff;
    border-radius: 8px;
    width: 456px;
    height: 96px;
    margin: 0 auto;
    padding: 0 20px;
    margin-top: 40px;
    cursor: pointer;

    &:hover {
        background-color: #3078e9;

        ${LoginButton} {
            text-decoration: underline;
        }
    }
`;

const ImageWrap = styled.div`
    width: 59px;
    height: 28px;
`;

export default Join;
