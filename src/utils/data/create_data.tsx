export interface ICreateItems {
    chain: string;
    name: string;
    type: string;
}

export interface ICreateSelectItems {
    name: string;
    value: string;
}

export interface ICreateFormData {
    title: string;
    link: string;
    minLength: number;
    maxLength: number;
    label: string;
    type: string;
    message: string;
    required: boolean;
    items: ICreateItems[];
    select: ICreateSelectItems[];
}

export const createFormData = (t: any): ICreateFormData[] => [
    {
        title: t('Create.categoryInputTitle'),
        link: '',
        minLength: 0,
        maxLength: 0,
        label: 'category',
        type: 'select',
        message: t('Create.categoryInputMessage'),
        required: true,
        items: [],
        select: [
            {
                name: '가스',
                value: '가스',
            },
            {
                name: '풍력',
                value: '풍력',
            },
            {
                name: '수력',
                value: '수력',
            },
            {
                name: '쿡스토브',
                value: '쿡스토브',
            },
            {
                name: '태양열',
                value: '태양열',
            },
            {
                name: 'CORSIA',
                value: 'CORSIA',
            },
            {
                name: 'REDD+',
                value: 'REDD+',
            },
        ],
    },
    {
        title: t('Create.nameInputTitle'),
        link: '',
        minLength: 1,
        maxLength: 100,
        label: 'name',
        type: 'text',
        message: t('Create.nameInputMessage'),
        required: true,
        items: [],
        select: [],
    },
    // {
    //     title: '판매상품 목록',
    //     link: '',
    //     minLength: 1,
    //     maxLength: 300,
    //     label: 'product_list',
    //     type: 'text',
    //     message: t('Create.nameInputMessage'),
    //     required: true,
    //     items: [],
    //     select: [],
    // },
    {
        title: t('Create.chainInputTitle'),
        link: '',
        minLength: 0,
        maxLength: 0,
        label: 'symbol',
        type: 'radio',
        message: '',
        required: false,
        items: [
            // {
            //     chain: 'ETH',
            //     name: t('Create.chainType'),
            //     type: 'ERC-721',
            // },
            // {
            //     chain: 'MATIC',
            //     name: '폴리곤',
            //     type: 'ERC-1155',
            // },
            {
                chain: 'KLAY',
                name: '클레이튼',
                type: 'KIP-37',
            },
            {
                chain: 'KRW',
                name: '토스',
                type: 'KRW',
            },
        ],
        select: [],
    },
    {
        title: t('Create.descriptionInputTitle'),
        link: '',
        minLength: 5,
        maxLength: 1000,
        label: 'description',
        type: 'textarea',
        message: t('Create.descriptionInputMessage'),
        required: true,
        items: [],
        select: [],
    },
    {
        title: t('Create.linkInputTitle'),
        link: '',
        minLength: 0,
        maxLength: 100,
        label: 'external_link',
        type: 'text',
        message: t('Create.linkInputMessage'),
        required: false,
        items: [],
        select: [],
    },
    {
        title: '발행수량',
        link: '',
        minLength: 1,
        maxLength: 7,
        label: 'supply',
        type: 'number-input',
        message: '발행수량을 입력 해주세요.',
        required: true,
        items: [],
        select: [],
    },
    {
        title: t('Create.createFeeInputTitle'),
        link: '',
        minLength: 0,
        maxLength: 0,
        label: 'royalty_fee',
        type: 'select',
        message: '',
        required: false,
        items: [],
        select: [
            {
                name: '0%',
                value: '0',
            },
            {
                name: '5%',
                value: '5',
            },
            {
                name: '10%',
                value: '10',
            },
            {
                name: '15%',
                value: '15',
            },
            {
                name: '20%',
                value: '20',
            },
        ],
    },
    {
        title: '',
        link: '',
        minLength: 0,
        maxLength: 100,
        label: 'adult_gb',
        type: 'checkbox',
        message: '',
        required: false,
        items: [],
        select: [],
    },
];

export const challengeCreateFormData = (): ICreateFormData[] => [
    {
        title: '카테고리',
        link: '',
        minLength: 0,
        maxLength: 0,
        label: 'category',
        type: 'select',
        message: '카테고리를 선택하세요.',
        required: true,
        items: [],
        select: [
            {
                name: '가스',
                value: '가스',
            },
            {
                name: '풍력',
                value: '풍력',
            },
            {
                name: '수력',
                value: '수력',
            },
            {
                name: '쿡스토브',
                value: '쿡스토브',
            },
            {
                name: '태양열',
                value: '태양열',
            },
            {
                name: 'CORSIA',
                value: 'CORSIA',
            },
            {
                name: 'REDD+',
                value: 'REDD+',
            },
        ],
    },
    {
        title: '작품명',
        link: '',
        minLength: 1,
        maxLength: 100,
        label: 'name',
        type: 'text',
        message: '작품명을 입력하세요.',
        required: true,
        items: [],
        select: [],
    },
    {
        title: '작품설명',
        link: '',
        minLength: 5,
        maxLength: 1000,
        label: 'description',
        type: 'textarea',
        message: '5 ~ 1000자의 작품설명을 입력하세요.',
        required: true,
        items: [],
        select: [],
    },
    // {
    //     title: '참여기간',
    //     link: '',
    //     minLength: 0,
    //     maxLength: 0,
    //     label: 'expiration_date',
    //     type: 'select',
    //     message: '참여기간을 선택하세요.',
    //     required: true,
    //     items: [],
    //     select: [
    //         // {
    //         //     name: '1일',
    //         //     value: '1',
    //         // },
    //         // {
    //         //     name: '7일',
    //         //     value: '7',
    //         // },
    //         // {
    //         //     name: '30일',
    //         //     value: '30',
    //         // },
    //         // {
    //         //     name: '90일',
    //         //     value: '90',
    //         // },
    //         // {
    //         //     name: '180일',
    //         //     value: '180',
    //         // },
    //         {
    //             name: '365일',
    //             value: '365',
    //         },
    //     ],
    // },
    {
        title: '외부링크',
        link: '',
        minLength: 0,
        maxLength: 100,
        label: 'external_link',
        type: 'text',
        message: '외부링크를 입력해주세요.',
        required: false,
        items: [],
        select: [],
    },
    // {
    //     title: '',
    //     link: '',
    //     minLength: 0,
    //     maxLength: 100,
    //     label: 'adult_gb',
    //     type: 'checkbox',
    //     message: '',
    //     required: false,
    //     items: [],
    //     select: [],
    // },
];

export const marketSaleFormData = (t: any): ICreateFormData[] => [
    {
        title: '상장수량',
        link: '',
        minLength: 1,
        maxLength: 7,
        label: 'quantity',
        type: 'number-input',
        message: '상장수량을 입력 해주세요.',
        required: true,
        items: [],
        select: [],
    },
    {
        title: '판매기간',
        link: '',
        minLength: 0,
        maxLength: 0,
        label: 'expiration_date',
        type: 'select',
        message: '',
        required: true,
        items: [],
        select: [
            {
                name: '1일',
                value: '1',
            },
            {
                name: '7일',
                value: '7',
            },
            {
                name: '30일',
                value: '30',
            },
            {
                name: '90일',
                value: '90',
            },
            {
                name: '180일',
                value: '180',
            },
            {
                name: '365일',
                value: '365',
            },
        ],
    },
    {
        title: t('Create.createFeeInputTitle'),
        link: '',
        minLength: 0,
        maxLength: 100,
        label: 'external_link',
        type: 'text',
        message: t('Create.linkInputMessage'),
        required: false,
        items: [],
        select: [],
    },
    {
        title: t('Create.priceInputTitle'),
        link: '',
        minLength: 1,
        maxLength: 5,
        label: 'price',
        type: 'price-input',
        message: t('Create.priceInputMessage'),
        required: true,
        items: [],
        select: [],
    },
];
