export interface ICreateItems {
    minLength?: number;
    maxLength?: number;
    label?: string;
    type?: string;
    required?: boolean;
    icons?: string;
    defaultAddress?: string;
    id?: number;
    value?: string;
    name?: string;
}

export interface ICreateSelectItems {
    name: string;
    value: string;
}

export interface IProfileEditFormData {
    title: string;
    minLength: number;
    maxLength: number;
    label: string;
    type: string;
    message: string;
    required: boolean;
    items: ICreateItems[];
    select: ICreateSelectItems[];
    pattern: RegExp;
    patternMessage: string;
}

export const profileEditFormData = (t: any): IProfileEditFormData[] => [
    {
        title: t('ProfileEdit.nameInputTitle'),
        minLength: 1,
        maxLength: 20,
        label: 'user_name',
        type: 'text',
        message: t('ProfileEdit.nameInputMessage'),
        required: true,
        items: [],
        select: [],
        pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9_-]{2,20}$/,
        patternMessage: t('ProfileEdit.nameInputPlaceholder'),
    },
    {
        title: t('ProfileEdit.addressInputTitle'),
        minLength: 0,
        maxLength: 0,
        label: 'address',
        type: 'address',
        message: '',
        required: false,
        items: [],
        select: [],
        pattern: /$/,
        patternMessage: '',
    },
    {
        title: t('ProfileEdit.descriptionInputTitle'),
        minLength: 0,
        maxLength: 500,
        label: 'user_bio',
        type: 'textarea',
        message: t('ProfileEdit.descriptionInputPlaceholder'),
        required: false,
        items: [],
        select: [],
        pattern: /$/,
        patternMessage: '',
    },
    // {
    //     title: 'SNS 링크',
    //     minLength: 0,
    //     maxLength: 500,
    //     label: 'snsLink',
    //     type: 'sns',
    //     message: t('ProfileEdit.descriptionInputPlaceholder'),
    //     required: false,
    //     items: [
    //         {
    //             minLength: 1,
    //             maxLength: 20,
    //             label: 'user_site',
    //             type: 'text',
    //             required: false,
    //             icons: 'user_site',
    //             defaultAddress: 'Yoursite.com',
    //         },
    //         {
    //             minLength: 1,
    //             maxLength: 20,
    //             label: 'user_twitter',
    //             type: 'text',
    //             required: false,
    //             icons: 'user_twitter',
    //             defaultAddress: 'https://twitter.com/',
    //         },
    //         {
    //             minLength: 1,
    //             maxLength: 20,
    //             label: 'user_discord',
    //             type: 'text',
    //             required: false,
    //             icons: 'user_discord',
    //             defaultAddress: 'https://discord.gg/',
    //         },
    //         {
    //             minLength: 1,
    //             maxLength: 20,
    //             label: 'user_instagram',
    //             type: 'text',
    //             required: false,
    //             icons: 'user_instagram',
    //             defaultAddress: 'https://instagram.com/',
    //         },
    //         {
    //             minLength: 1,
    //             maxLength: 20,
    //             label: 'user_medium',
    //             type: 'text',
    //             required: false,
    //             icons: 'user_medium',
    //             defaultAddress: 'https://medium.com/@',
    //         },
    //         {
    //             minLength: 1,
    //             maxLength: 20,
    //             label: 'user_telegram',
    //             type: 'text',
    //             required: false,
    //             icons: 'user_telegram',
    //             defaultAddress: 'https://t.me/',
    //         },
    //     ],
    //     select: [],
    //     pattern: /$/,
    //     patternMessage: '',
    // },
    {
        title: t('ProfileEdit.emailInputTitle'),
        minLength: 0,
        maxLength: 50,
        label: 'user_email',
        type: 'text',
        message: t('ProfileEdit.emailInputMessage'),
        required: true,
        items: [],
        select: [],
        pattern: /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i,
        patternMessage: t('ProfileEdit.emailInputPlaceholder'),
    },
    // {
    //     title: '배송 받는분 이름',
    //     minLength: 0,
    //     maxLength: 10,
    //     label: 'shipping_name',
    //     type: 'text',
    //     message: '배송받는 분의 이름 입력해주세요.',
    //     required: true,
    //     items: [],
    //     select: [],
    //     pattern: /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{2,10}$/,
    //     patternMessage: '특수문자 제외 2~10자 이내로 입력해주세요.',
    // },
    // {
    //     title: '배송 받는분 휴대폰 번호',
    //     minLength: 0,
    //     maxLength: 11,
    //     label: 'phone_num',
    //     type: 'text',
    //     message: '배송받는 분의 휴대폰 번호를 입력해주세요.',
    //     required: true,
    //     items: [],
    //     select: [],
    //     pattern: /^[0-9]{2,11}$/,
    //     patternMessage: '숫자로만 입력이 가능합니다.',
    // },
    {
        title: '배송지 정보',
        minLength: 1,
        maxLength: 20,
        label: 'user_certification',
        type: 'button',
        message: t('ProfileEdit.nameInputMessage'),
        required: true,
        items: [],
        select: [],
        pattern: /$/,
        patternMessage: t('ProfileEdit.nameInputPlaceholder'),
    },
    {
        title: '배송지 정보 입력',
        minLength: 0,
        maxLength: 50,
        label: 'shipping_addr2',
        type: 'shipping_address',
        message: '상세주소를 입력해주세요.',
        required: true,
        items: [],
        select: [],
        pattern: /$/,
        patternMessage: '상세주소를 입력해주세요.',
    },
    {
        title: '마케팅 및 서비스 관련 정보, 이용약관, 개인정보 수신 동의.',
        minLength: 0,
        maxLength: 0,
        label: 'm_rec_gb',
        type: 'checkbox',
        message: '',
        required: false,
        items: [
            {
                id: 1,
                value: '',
                name: t('ProfileEdit.marketingInputAgree'),
            },
        ],
        select: [],
        pattern: /$/,
        patternMessage: '',
    },
];
