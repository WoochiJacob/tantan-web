import axios from 'axios';

const baseUrl = process.env.REACT_APP_API;
export const Axios = async (api: string, param?: any, token?: string) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Accept: 'application/json',
        withCredentials: true,
        Authorization: token || '',
    };

    const { data } = await axios.post(`https://${baseUrl}/api/${api}`, param, { headers });
    return data;
};

export const AwsS3 = async () => {
    const timestamp = new Date().getTime();
    const headers = {
        'Access-Control-Allow-Origin': '*',
    };

    const { data } = await axios.get(`//dev-version.s3.ap-northeast-2.amazonaws.com/${process.env.REACT_APP_MODE}/version.json?timestamp=${timestamp}`, { headers });
    return data;
};

export const TossPaymentsApi = async (param: any) => {
    const tossSecretKey = process.env.REACT_APP_TOSS_PAYMENTS_SECRET_KEY?.toString() || '';
    const base64Encoding = btoa(`${tossSecretKey}:`);
    const headers = {
        Authorization: `Basic ${base64Encoding}`,
        'Content-Type': 'application/json',
    };

    const tossData = await axios.post('https://api.tosspayments.com/v1/payments/confirm', param, { headers });

    return tossData;
};

export const getSignResult = async (request_key: string) => {
    const data = await axios.get(`https://a2a-api.klipwallet.com/v2/a2a/result?request_key=${request_key}`);

    return data;
};

export const loginExpire = Date.now() + 21600000;

export const CaverOption = {
    headers: [
        { name: 'Authorization', value: `Basic ${Buffer.from(`${process.env.REACT_APP_KAS_ACCESS_ID}:${process.env.REACT_APP_KAS_SECRET_KEY}`).toString('base64')}` },
        { name: 'x-chain-id', value: 8217 },
    ],
};
