/* eslint-disable no-restricted-globals */
import React, { useCallback } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { IAssetsDetail } from '@interface/assets';
import Decimal from 'decimal.js';

interface IAssetsTitlePanel {
    nftAssets: IAssetsDetail;
    quantity: number;
    setQuantity: any;
}

function AssetsQuantityPanel({ nftAssets, quantity, setQuantity }: IAssetsTitlePanel) {
    const handleQuantity = (event: any, getQuantity?: number) => {
        // getQuantity가 없는경우 이벤트에서 value를 가져온다.
        if (!getQuantity) {
            // type 숫자로 만들어주기
            const target = Number(event.target.value);

            // 음수가 나올수 없기때문에 1보다 작으면 무조건 1
            if (target < 1) {
                setQuantity(1);
                return;
            }

            // 수량을 넘을수 없기때문에 발행한 수량보다 많으면,
            // 발행한 수량으로 넣어준다.
            if (target > nftAssets.market_quantity) {
                setQuantity(nftAssets.market_quantity);
                return;
            }

            // 이상없으면 받은 값을 세팅
            setQuantity(target);
            return;
        }

        // 음수가 나올수 없기때문에 1보다 작으면 무조건 1
        if (getQuantity < 1) {
            setQuantity(1);
            return;
        }

        // 수량을 넘을수 없기때문에 발행한 수량보다 많으면,
        // 발행한 수량으로 넣어준다.
        if (getQuantity > nftAssets.market_quantity) {
            setQuantity(nftAssets.market_quantity);
            return;
        }

        // 이상없으면 받은 값을 세팅
        setQuantity(getQuantity);
    };

    const totalPrice = useCallback((price: number, quantity: number): string => {
        const calcPrice = new Decimal(price).mul(quantity).toString();

        if (!calcPrice) return '0';

        return Number(calcPrice).toLocaleString();
    }, []);

    return (
        <>
            {/* 수량 입력 */}
            <AssetsQuantityBox>
                {/* 마이너스 버튼 */}
                <QuantityIconsBox
                    onClick={() => handleQuantity(event, quantity - 1)}
                    disabled={quantity === 1}
                >
                    <QuantityIcons src="/img/assets_detail/ic_minus.svg" />
                </QuantityIconsBox>

                {/* 수량 인풋 */}
                <QuantityInputBox>
                    <QuantityInputNumber>
                        <QuantityInput
                            type="number"
                            value={quantity}
                            onInput={() => handleQuantity(event)}
                        />
                    </QuantityInputNumber>
                    <QuantityLine>/</QuantityLine>
                    <Quantity>{nftAssets.market_quantity.toLocaleString()}</Quantity>
                </QuantityInputBox>

                {/* 플러스 버튼 */}
                <QuantityIconsBox
                    onClick={() => handleQuantity(event, quantity + 1)}
                    disabled={quantity === nftAssets.market_quantity}
                >
                    <QuantityIcons src="/img/assets_detail/ic_plus.svg" />
                </QuantityIconsBox>
            </AssetsQuantityBox>

            {/* 총 가격 */}
            <AssetsTotalPrice>
                <TotalTitle>최종 구매가</TotalTitle>
                <TotalPrice>
                    {nftAssets.price ? (totalPrice(nftAssets.price, quantity)) : 0}
                    <span>
                        {nftAssets.symbol}
                    </span>
                </TotalPrice>
            </AssetsTotalPrice>
        </>
    );
}

const AssetsTotalPrice = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4px;
    padding-bottom: 11px;
    border-bottom: 1px solid ${colors.Black100};
`;

const TotalTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
`;

const TotalPrice = styled.div`
    display: flex;
    align-items: baseline;
    font-size: 24px;
    font-weight: 500;
    color: ${colors.Black100};
    
    
    span {
        font-size: 13px;
        margin-left: 4px;
    }
`;

const AssetsQuantityBox = styled.div`
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const QuantityInputBox = styled.div`
    flex-basis: calc(100% - 116px);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    border-radius: 8px;
`;

const QuantityInput = styled.input`
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;

    width: 100%;
    border: 0;
    text-align: right;
    padding-right: 10px;
    font-size: 16px;
    font-weight: 500;
    color: ${colors.Black200};

    &:focus, &:active, &:focus-visible {
        border: 0;
        outline: 0;
    }

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const QuantityInputNumber = styled.div`
    flex-basis: calc(50% - 15px);
`;

const QuantityLine = styled.div`
    flex-basis: 15px;
    font-size: 16px;
    font-weight: 500;
    color: ${colors.BlueGray500};
`;

const Quantity = styled.div`
    flex-basis: calc(50% - 15px);
    font-size: 16px;
    font-weight: 500;
    color: ${colors.BlueGray500};
`;

const QuantityIcons = styled('img')`
    width: 13px;
`;

const QuantityIconsBox = styled.button`
    flex-basis: 48px;
    height: 48px;
    margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    cursor: pointer;
    border: 0;
    background-color: ${colors.White100};

    &:hover {
        background-color: ${colors.BlueGray300};
    }
`;

export default AssetsQuantityPanel;
