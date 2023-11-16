import qs from 'qs';
import { Axios, loginExpire } from '@utils/api';
import { Store } from 'react-notifications-component';
import axios from 'axios';

// Notification Options
const notiOption = {
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
        duration: 2000,
    },
};

// Klip Connect
export const connectKlipWallet = async (request_key: string) => {
    let walletAdress = {
        address: '',
        status: '',
        balance: '',
        token: '',
        user_name: '',
        user_email: '',
        image_profile: '',
        vip_gb: '0',
    };

    const timerId = setInterval(() => {
        axios
            .get( // result
                `https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`,
            )
            // eslint-disable-next-line consistent-return
            .then(async (res: any): Promise<any> => {
                if (res.data.result) {
                    const getAddress = res.data.result.klaytn_address.toLowerCase();
                    const requestKey = request_key;

                    // LOGIN PRAMS
                    const params = qs.stringify({
                        wallet_address: getAddress,
                        blockchain: 'klaytn',
                        signature: requestKey,
                        expire: loginExpire,
                    });

                    // LOGIN API
                    try {
                        const { data } = await Axios('register', params);

                        localStorage.setItem('loginState', params);
                        localStorage.setItem('token', data.token);

                        walletAdress = {
                            address: getAddress,
                            status: 'succese',
                            balance: '1',
                            token: data.token,
                            user_name: data.user_name,
                            user_email: data.user_email,
                            image_profile: data.image_profile,
                            vip_gb: data.vip_gb.toString(),
                        };
                    } catch (error) {
                        return {
                            address: '',
                            status: 'error',
                            balance: '',
                            token: '',
                            user_name: '',
                            user_email: '',
                            image_profile: '',
                            vip_gb: '0',
                        };
                    }

                    clearInterval(timerId);
                }
            });
        return walletAdress;
    }, 1000);
    return walletAdress;
};

// Logout 함수
export const Logout = async (t: any) => {
    const token = `Bearer ${localStorage.getItem('token')}` || '';

    try {
        const { success } = await Axios('logout', null, token);

        if (success) {
            localStorage.removeItem('loginState');
            localStorage.removeItem('token');

            Store.addNotification({
                ...notiOption,
                title: t('Notification.notiTitle'),
                message: t('Notification.logoutSuccese'),
                type: 'default',
                container: 'top-left',
                insert: 'top',
            });

            window.location.assign('/main');
        }
    } catch (error) {
        console.log(error);
    }
};

// 탄탄에서 사용중인 네트워크
export const useChain = {
    // [`${process.env.REACT_APP_NETWORK === 'mainnet' ? '0x1' : '0x4'}`]: {
    //     id: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '0x1' : '0x4'}`,
    //     name: 'Ethereum',
    //     symbol: 'ETH',
    //     decimals: 18,
    //     contract: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '0xaD659f3e7321B137649B013Fc14e463dfF1e77D0' : '0x0309ce5D68Ef02c11889Bb7cf2f5fec9c5Ea412E'}`,
    //     chainId: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '1' : '4'}`,
    //     networkName: `${process.env.REACT_APP_NETWORK === 'mainnet' ? 'mainnet' : 'rinkeby'}`,
    // },
    // [`${process.env.REACT_APP_NETWORK === 'mainnet' ? '0x89' : '0x13881'}`]: {
    //     id: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '0x89' : '0x13881'}`,
    //     name: 'Polygon',
    //     symbol: 'MATIC',
    //     decimals: 18,
    //     contract: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '0xaD659f3e7321B137649B013Fc14e463dfF1e77D0' : '0x0a0A51E1B3ab381164be6e30a3c00760DC04A626'}`,
    //     chainId: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '137' : '8001'}`,
    //     networkName: `${process.env.REACT_APP_NETWORK === 'mainnet' ? 'polygon' : 'mumbai'}`,
    // },
    [`${process.env.REACT_APP_NETWORK === 'mainnet' ? '0x2019' : '0x2019'}`]: {
        id: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '0x2019' : '0x2019'}`,
        name: 'Klaytn',
        symbol: 'KRW',
        decimals: 18,
        contract: `${process.env.REACT_APP_KLAYTN_CONTRACT_ADDRESS}`,
        chainId: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '8217' : '8217'}`,
        networkName: `${process.env.REACT_APP_NETWORK === 'mainnet' ? 'klaytn' : 'baobab'}`,
    },
    [`${process.env.REACT_APP_NETWORK === 'mainnet' ? '0x2019' : '0x2019'}`]: {
        id: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '0x2019' : '0x2019'}`,
        name: 'Klaytn',
        symbol: 'KLAY',
        decimals: 18,
        contract: `${process.env.REACT_APP_KLAYTN_CONTRACT_ADDRESS}`,
        chainId: `${process.env.REACT_APP_NETWORK === 'mainnet' ? '8217' : '8217'}`,
        networkName: `${process.env.REACT_APP_NETWORK === 'mainnet' ? 'klaytn' : 'baobab'}`,
    },
};

// 네트워크 정보
export const networks = {
    chainId: process.env.REACT_APP_NETWORK === 'mainnet' ? '0x1' : '0x4',
    chainName: process.env.REACT_APP_NETWORK,
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
    rpcUrls: [`https://${process.env.REACT_APP_NETWORK === 'mainnet' ? '' : 'rinkeby.'}infura.io/v3/`],
    blockExplorerUrls: [`https://${process.env.REACT_APP_NETWORK === 'mainnet' ? '' : 'rinkeby.'}etherscan.io`],

};
