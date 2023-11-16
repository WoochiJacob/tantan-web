import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { IAssetsDetail } from '@interface/assets';

interface IAssetsRoyaltyPanel {
    nftAssets: IAssetsDetail;
}

function AssetsRoyaltyPanel({ nftAssets }: IAssetsRoyaltyPanel) {
    return (
        <>
            <OrderNotiTitle>구매시 유의사항</OrderNotiTitle>
            <OrderNotice>
                <OrderNotiItem>
                    크리에이터 수수료
                    {' '}
                    {nftAssets.royalty}
                    %.

                </OrderNotiItem>
                <OrderNotiItem>
                    구매와 관련된 모든 과정은 블록체인에 기록됩니다.
                </OrderNotiItem>
                <OrderNotiItem>
                    일반 신용 · 체크카드 및 간편결제수단으로 결제 가능합니다.
                </OrderNotiItem>
            </OrderNotice>
        </>
    );
}

const OrderNotiTitle = styled.div`
    margin-top: 24px;
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const OrderNotice = styled.div`
    margin-top: 8px;
`;

const OrderNotiItem = styled.div`
    font-size: 13px;
    font-weight: 300;
    margin-bottom: 4px;
    position: relative;
    padding-left: 14px;
    color: ${colors.Black100};

    &::before {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        content: '';
        background-color: ${colors.Black100};
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
    }
`;

export default AssetsRoyaltyPanel;
