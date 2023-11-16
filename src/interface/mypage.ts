export interface IProfile {
    imp_unique_key: string;
    adult: string;
    birth: string;
    foreigner: string;
    gender: string;
    name: string;
    created_at: string;
    id: number;
    image_banner: string | null;
    image_profile: string | null;
    instagram_id: string | null;
    instagram_link: string | null;
    updated_at: string;
    user_bio: string | null;
    user_email: string | null;
    user_id: number | null;
    user_name: string;
    m_rec_gb: number;
    shipping_addr: string | null;
    shipping_addr2: string | null;
    shipping_name: string | null;
    phone_num: string | null;
    zip_code: string | null;
}

export interface IUserTotal {
    CounT: number | null;
    MaxP: number | null;
    SumP: number | null;
}

export interface IProfileInfo {
    profileInfo: IProfile;
    wallet_address: string;
    CounT: number | null;
    MaxP: number | null;
    SumP: number | null;
    FirstP: number | null;
    MinP: number | null;
}
