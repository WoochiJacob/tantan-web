import { atom } from 'recoil';
import { IAssetsDetail } from '@interface/assets';

interface ITossOrder {
    assets: IAssetsDetail;
    quantity: number;
}

export const TossOrderInfo = atom<ITossOrder | null>({
    key: 'TossOrderInfo',
    default: null,
});
