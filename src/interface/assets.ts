export interface IOrderHistory {
    history_id: number;
    nft_market_id: number;
    user_img_profile: string | null;
    user_name: string;
    wallet_address: string;
    user_bio: string;
    event: string;
    price: string | null;
    instagram_id: string | null;
    created_at: string;
    token_type: string | null;
    to_address: null | string;
    from_address: null | string;
    symbol: string;
}

export interface IAssetsDetail {
    pfp_gb: number;
    itemdetail_image_url: string;
    product_list: string;
    market_supply: number;
    creator_user_name: string;
    owner_user_name: string;
    owner_user_profileImg: string;
    asset_id: number;
    user_name: string;
    user_profileImg: string | null;
    asset_thumbnail: string;
    asset_animation: null | string;
    asset_name: string;
    asset_description: string;
    price: number;
    supply: number;
    asset_quantity: number;
    is_mint: number;
    is_freeze: number;
    is_market_display: number;
    royalty: number;
    category: string;
    external_link: string;
    contract_address: string;
    creator_user_bio: string;
    token_id: string;
    token_num: number;
    type: number;
    asset_type: string;
    metadata_url: string;
    service_fee: null | string;
    is_display: number;
    type_trade: number;
    start_at: string;
    expiration_date: string;
    is_end: number;
    market_quantity: number;
    token_type: string;
    uuid_market: string;
    order_signature: string;
    order_recipt: string;
    owner_address: string;
    creator_address: string;
    market_id: number;
    blockchain: string;
    more_info_url: null | string;
    init_count: number;
    nft_type: number;
    symbol: string;
    original_asset: null | string;
    proof_origin: null | string;
    ownership: string;
    issuer_nft: string;
    guarantee_issue: null | string;
    serial_number: null | string;
    creator_vip_gb: number;
    creator_user_profileImg: string;
    adult_gb: string;
    owner_is_end_count: number;
}

export interface IMintState {
    addAssets: boolean;
    minting: boolean;
    addMarket: boolean;
}

export interface IOwnerList {
    slice(arg0: number, arg1: number): unknown;
    image_original_url: string;
    name: string;
    asset_type: string;
    category: string;
    contract_address: string;
    created_at: string;
    expiration_date: string;
    id: number;
    is_display: number;
    is_end: number;
    minimum_bid: number;
    nft_asset_id: number;
    order_recipt: string;
    order_signature: string;
    price: number;
    price_reserve: number;
    quantity: number;
    seller_address: string;
    slide_gb: number;
    start_at: string;
    supply: number;
    token_id: string;
    token_type: string;
    tx_id: null | string;
    type_trade: number;
    updated_at: string;
    uuid_market: string;
    user_name: string;
    image_profile: string | null;
}
