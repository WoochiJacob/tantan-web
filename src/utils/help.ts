import Decimal from 'decimal.js';
import { Store } from 'react-notifications-component';
import CryptoJS from 'crypto-js';
import { IConnectWallet } from '@interface/auth';

// ABI 메인넷 테스트넷 공용
import MultiABI from '@contracts/KlaytnKIP37Modify.json';
import SingleABI from '@contracts/KlaytnKIP17.json';
import { CaverOption } from './api';

const Caver = require('caver-js');

const caver = new Caver(new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', CaverOption));

interface IUseChain {
    id: string;
    name: string;
    symbol: string;
    decimals: number;
    contract: string;
    chainId: string;
    networkName: string;
}

const notiOption = {
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
        duration: 2000,
    },
};

// Chunk
export const chunk = (array: any[], size: number) => {
    const chunked:any[] = [];
    let index = 0;

    while (index < array.length) {
        chunked.push(array.slice(index, index + size));
        index += size;
    }

    return chunked;
};

// 수수료 계산식
export const getFee = (price: number, fee: number): string => (new Decimal(price).mul(fee)).toString();
// 수수료끼리 더하기
export const getSellerPrice = (price: number, createFee: number, serviceFee: number): string => {
    const addFee = new Decimal(createFee).add(serviceFee);
    const getSellerPrice = new Decimal(price).sub(addFee);

    return getSellerPrice.toString();
};

// nl2br
export const nl2br = (str: string) => str.replace(/\n/g, '<br />');

// symbol 한국어
export const krSymbol = (chain: string) => {
    if (chain === 'ETH') return '이더리움';

    if (chain === 'CONUT' || chain === 'KRW') return '클레이튼';

    return '이더리움';
};

// 주소 자리수 별로 잘라주기
export const sliceAddress = (address: string) => `${address.substring(0, 6)}...${address.slice(-4)}`;

// 현재 체인 정보를 주면 그에 맞는 컨트랙트 ABI를 리턴해준다.
export const getContractABI = (chain: IUseChain) => {
    if (chain.networkName === 'baobab') return MultiABI;

    return MultiABI;
};

export const getSupplyContractABI = (supply: number) => {
    if (supply > 1) return MultiABI;

    return SingleABI;
};

export const feeDalegate = async (adress: string, fee: string) => {
    try {
        // 이벤트 이미터 사용
        const senderPrivateKey = process.env.REACT_APP_FEE_PRIVATE_KEY;
        const sender = caver.wallet.keyring.createFromPrivateKey(senderPrivateKey);
        caver.wallet.add(sender);

        const feeDelegatedTx = caver.transaction.feeDelegatedValueTransfer.create({
            from: sender.address,
            to: adress,
            value: caver.utils.toPeb(fee, 'KLAY'),
            gas: 50000,
        });
        await caver.wallet.sign(sender.address, feeDelegatedTx);

        const rlpEncoded = feeDelegatedTx.getRLPEncoding();
        const feeDelegateTxFromRLPEncoding = caver.transaction.feeDelegatedValueTransfer.create(rlpEncoded);
        feeDelegateTxFromRLPEncoding.feePayer = sender.address;

        await caver.wallet.signAsFeePayer(sender.address, feeDelegateTxFromRLPEncoding);
        await caver.rpc.klay.sendRawTransaction(feeDelegateTxFromRLPEncoding.getRLPEncoding());

        return true;
    } catch (error) {
        Store.addNotification({
            ...notiOption,
            title: '오류',
            message: 'GasFee 대납 오류.',
            type: 'danger',
            container: 'top-left',
            insert: 'top',
        });
        return false;
    }
};

export const recover = async (message: string, signature: string, address: string) => {
    const singAdress = await caver.utils.recover(message, signature, false);

    return singAdress === address ? 'complete' : 'noncomplete';
};

export const encrypt = (data, key) => CryptoJS.AES.encrypt(JSON.stringify(data), key);

export const checkUserInfo = (user: IConnectWallet): boolean => {
    if (!user.shipping_addr || user.shipping_addr === '') return false;
    if (!user.phone_num || user.phone_num === '') return false;
    if (!user.shipping_addr || user.shipping_addr === '') return false;
    if (!user.user_email || user.user_email === '') return false;
    if (!user.birth || user.birth === '') return false;
    if (!user.name || user.name === '') return false;

    return true;
};

export const pfpGB = (gb: number) => gb === 99999999 || gb === 88888888;

export const transparentHeader = (_pathname: string) => !(_pathname);
