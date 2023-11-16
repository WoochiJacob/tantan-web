export interface IConnectWallet {
    address: string;
    status: string;
    balance: string;
    token: string;
    user_name: string;
    user_email: string;
    image_profile: string
    vip_gb: string;
    shipping_name: string;
    phone_num: string;
    isCertification: boolean;
    adult: number;
    birth: string;
    name: string;
    foreigner: number;
    gender: number;
    shipping_addr: string;
    shipping_addr2: string;
    zip_code: string;
}

export interface IChain {
    [key: string]: {
        icon: string;
        name: string;
    }
}
