import { atom } from 'recoil';
import { IConnectWallet } from '@interface/auth';

export const UserAddress = atom<IConnectWallet>({
    key: 'userAddressKey',
    default: {
        address: '',
        status: '',
        balance: '',
        token: '',
        user_name: '',
        user_email: '',
        image_profile: '',
        vip_gb: '',
        shipping_name: '',
        phone_num: '',
        isCertification: false,
        adult: 0,
        birth: '',
        name: '',
        foreigner: 0,
        gender: 0,
        shipping_addr: '',
        shipping_addr2: '',
        zip_code: '',
    },
});

export const Chain = atom<string>({
    key: 'Chain',
    default: '0x2019',
});

export const LocalseType = atom<string>({
    key: 'LocalseType',
    default: 'ko',
});

export const KlipKey = atom<string>({
    key: 'KlipKey',
    default: '',
});
