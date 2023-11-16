import React, { useEffect, useState, useCallback } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors } from '@styles/ui_palette';
import { IAssetsDetail } from '@interface/assets';
import qs from 'qs';
import Decimal from 'decimal.js';
import { UserAddress } from '@recoil/auth';
import { useRecoilValue } from 'recoil';

interface ITossOrder {
    assets: IAssetsDetail | null;
    quantity: number;
    isFirst: boolean;
    shipping_addr: string;
    shipping_addr2: string;
    zip_code: string;
}

function OrderComplete() {
    const [orderInfo, setOrderInfo] = useState<ITossOrder | null>(null);
    const userAddress = useRecoilValue(UserAddress);
    const navigate = useNavigate();

    const totalPrice = useCallback((price: number, quantity: number): string => {
        const calcPrice = new Decimal(price).mul(quantity).toString();

        if (!calcPrice) return '0';

        return Number(calcPrice).toLocaleString();
    }, []);

    useEffect(() => {
        const getLocalStorage = localStorage.getItem('orderComplete') || '';

        if (getLocalStorage !== '') {
            const setOrder = qs.parse(getLocalStorage, {
                ignoreQueryPrefix: true,
            });

            setOrderInfo({
                assets: Object(setOrder.assets),
                quantity: Number(setOrder.quantity),
                isFirst: setOrder.isFirst === 'true',
                shipping_addr: String(setOrder.shipping_addr),
                shipping_addr2: String(setOrder.shipping_addr2),
                zip_code: String(setOrder.zip_code),
            });
        } else {
            navigate('/');
        }
    }, []);
    return (
        <Container>
            {orderInfo && orderInfo.assets && (
                <OrderForm>
                    <Title>결제완료</Title>

                    <OrderBox>
                        <OrderBoxHeader>
                            <OrderTitleBox>
                                <OrderPayTitle>결제수단</OrderPayTitle>
                                <OrderPay>토스페이먼츠</OrderPay>
                            </OrderTitleBox>
                        </OrderBoxHeader>
                        <OrderBoxBody>
                            <OrderImageBox>
                                <OrderImage type="left" src="/img/order/img_order.svg" />
                                <OrderImage type="right" src="/img/order/img_order.svg" />
                            </OrderImageBox>
                            <PriceBox>
                                <PriceTitle>총 결제 금액</PriceTitle>
                                <TotalPrice>
                                    {totalPrice(Number(orderInfo.assets.price), orderInfo.quantity)}
                                    <span>{orderInfo.assets.symbol}</span>
                                </TotalPrice>
                            </PriceBox>
                            <ProductBox>
                                <ProductTitle>상품명</ProductTitle>
                                <ProductItems main>{orderInfo.assets.asset_name}</ProductItems>
                            </ProductBox>
                            {/* <ProductBox>
                                <ProductTitle>구매 상품 목록</ProductTitle>
                                <ProductItems>
                                    - 제이준 코스메틱 화장품 3종세트, 컬렉션카드, 탄탄,
                                    메타버트 콘서트 초대권, 영상 응원 메시지, 추화정 PFP캐릭터
                                </ProductItems>
                            </ProductBox> */}
                            <ProductBox>
                                <ProductTitle>배송주소</ProductTitle>
                                <ProductItems>
                                    {orderInfo.zip_code} {orderInfo.shipping_addr}{' '}
                                    {orderInfo.shipping_addr2}
                                </ProductItems>
                            </ProductBox>
                            <CustumerCenter>
                                *배송지 정보 수정 시 고객만족센터로 문의 또는 02 3780 1390으로 문의
                                주시기 바랍니다.
                            </CustumerCenter>
                            <CheckButton
                                onClick={() => navigate(`/mypage/${userAddress.address}?tab=owner`)}
                            >
                                확인
                            </CheckButton>
                        </OrderBoxBody>
                    </OrderBox>
                </OrderForm>
            )}
        </Container>
    );
}

const Container = styled.div`
    background-color: ${colors.BlueGray300};
    padding-top: 74px;
    padding-bottom: 254px;
`;

const OrderForm = styled.div`
    width: 498px;
    margin: 0 auto;
`;

const Title = styled.div`
    font-size: 32px;
    font-weight: 500;
`;

const OrderBox = styled.div`
    margin-top: 21px;
`;

const OrderBoxHeader = styled.div`
    border: 1px solid ${colors.BlueGray500};
    border-bottom: 0;
    border-radius: 11px 11px 0 0;
    background-color: ${colors.BlueGray300};
    padding: 0 22px;
`;

const OrderTitleBox = styled.div`
    border-bottom: 1px solid ${colors.WarmGray200};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 21px;
    padding-bottom: 8px;
`;

const OrderBoxBody = styled.div`
    border: 1px solid ${colors.BlueGray500};
    padding: 36px 24px;
    border-radius: 0 0 11px 11px;
    border-top: 0;
    background-color: ${colors.White100};
    position: relative;
`;

const OrderImageBox = styled.div`
    width: 498px;
    position: absolute;
    top: 100px;
    left: -1px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const OrderImage = styled('img')<{ type: string }>`
    width: 8px;
    transform: ${(props) => (props.type === 'left' ? 'rotate(0)' : 'rotate(180deg)')};
`;

const OrderPayTitle = styled.div``;

const OrderPay = styled.div`
    color: ${colors.Blue100};
`;

const PriceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 26px;
    margin-bottom: 32px;
    border-bottom: 1px dashed ${colors.BlueGray500};
`;

const PriceTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
`;

const TotalPrice = styled.div`
    font-size: 32px;
    font-weight: 500;

    span {
        font-size: 16px;
        font-weight: 400;
        margin-left: 4px;
    }
`;

const ProductBox = styled.div`
    margin-top: 28px;
`;

const ProductTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
`;

const ProductItems = styled.div<{ main?: boolean }>`
    margin-top: 8px;
    font-size: ${(props) => (props.main ? '18px' : '14px')};
    font-weight: ${(props) => (props.main ? '500' : '300')};
`;

const CustumerCenter = styled.div`
    font-size: 14px;
    font-weight: 300;
    margin-top: 8px;
`;

const CheckButton = styled.div`
    width: 200px;
    height: 58px;
    background-color: ${colors.Black200};
    border-radius: 8px;
    color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    cursor: pointer;
    margin-top: 95px;
`;

export default OrderComplete;
