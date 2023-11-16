import { loadTossPayments } from '@tosspayments/payment-sdk';

const clientKey = process.env.REACT_APP_TOSS_PAYMENTS_Client_Key?.toString() || '';

interface ITossOrder {
    id: string;
    totalPrice: number;
    asset_name: string;
    user_name: string;
}

export async function tossPaymentsOrder({
    id, totalPrice, asset_name, user_name,
}: ITossOrder) {
    const tossPayments = await loadTossPayments(clientKey);

    tossPayments.requestPayment('카드', { // 결제 수단 파라미터
        // 결제 정보 파라미터
        amount: totalPrice,
        orderId: id,
        orderName: asset_name,
        customerName: user_name,
        successUrl: `${window.location.origin}/toss-payments-complete`,
        failUrl: `${window.location.origin}`,
    });
}
