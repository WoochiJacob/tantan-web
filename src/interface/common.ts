export interface IBasicCard {
    asset_id: number;
    asset_type: string;
    blockchain: string;
    category: string;
    contract_address: string;
    creator_address: string;
    expiration_date: string;
    external_link: string | null;
    init_count: number;
    is_display: number;
    is_end: number;
    market_animation: null
    market_description: string;
    market_id: number;
    market_name: string;
    market_thumbnail: string;
    market_symbol: string;
    owner_address: string;
    price: number;
    quantity: number;
    royalty_fee: number;
    start_at: string;
    supply: number;
    token_id: string;
    token_type: string;
    type_trade: number;
    user_name: string;
    user_profileImg: null;
    creator_name: string;
    owner_profileImg: string;
    more_info_url: string | null;
    creator_vip_gb: number;
    adult_gb: string;
    slide_gb: string;
    creator_profileImg: string;
}

export interface IPremiumCard {
    id: number;
    wallet_address: string;
    blockchain: string;
    uuid_user: string;
    deposit_fund: null;
    remember_token: null;
    is_certified: number;
    created_at: string;
    updated_at: string;
    vip_gb: number;
    user_name: string;
    image_profile: null;
    user_bio: string;
}

export interface ISlideCard {
    market_symbol: string;
    asset_id: number;
    market_id: number;
    market_thumbnail: string;
    market_animation: string | null;
    market_name: string;
    market_main_slide_name: string;
    market_description: string;
    user_profileImg: string | null;
    user_name: string;
    price: number;
    supply: number;
    quantity: number;
    is_end:number;
    is_display: number;
    start_at: string;
    expiration_date: string;
    category: string;
    contract_address: string;
    creator_address: string;
    token_id: string;
    token_type: string;
    type_trade:number;
    owner_address: string;
    external_link: string;
    royalty_fee: number;
    blockchain: string;
    asset_type: string;
    init_count: number;
    creator_vip_gb: number;
    more_info_url: string;
    more_info_url2: string;
    adult_gb: string;
    slide_ani_gb: number;
}

export interface IPaginationPrams {
    current_page: number;
    data: any;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null
    to: number;
    total: number;
}
