import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import moment from 'moment';
import { colors } from '@styles/ui_palette';
import { useNavigate } from 'react-router-dom';
import { IAssetsDetail } from '@interface/assets';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { Store } from 'react-notifications-component';
import {
    useChain,
} from '@utils/interact';
import qs from 'qs';
import { tossPaymentsOrder } from '@utils/common/toss_payments';

// recoil
import { UserAddress, Chain } from '@recoil/auth';

interface IAssetsTitlePanel {
    nftAssets: IAssetsDetail;
    assetId: number;
    setFormCheck: any;
    quantity: number;
    isFirst: boolean;
    handleMarketCancel: (nft: IAssetsDetail) => void;
}

interface ITossOrder {
    assets: IAssetsDetail;
    quantity: number;
}

function AssetsSingleOrderPanel({
    nftAssets, assetId, setFormCheck, quantity, handleMarketCancel, isFirst,
}: IAssetsTitlePanel) {
    const { t } = useTranslation();
    const userAddress = useRecoilValue(UserAddress);
    const chainId = useRecoilValue(Chain);
    const navigate = useNavigate();
    const [cancelDisabled, setCancelDisabled] = useState<boolean>(false);
    const [endTime, setEndTime] = useState<boolean>(false);

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    // 토스 간편 결제
    const handleTossPaments = ({ assets, quantity }: ITossOrder) => {
        if (!userAddress.isCertification) {
            Store.addNotification({
                ...notiOption,
                title: '회원정보 입력',
                message: '구매에 필요한 필수항목을 입력해주세요.',
                type: 'danger',
                container: 'top-left',
                insert: 'top',
                dismiss: {
                    duration: 5000,
                },
            });
            navigate(`/mypage/edit?login=true&location=${window.location.pathname}`);
            return;
        }

        if (assets.adult_gb.toString() === '1' && userAddress.adult.toString() === '0') {
            Store.addNotification({
                ...notiOption,
                title: '성인인증 컨텐츠',
                message: '미성년자는 구매하실수 없습니다.',
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        if ((chainId && !useChain[chainId]) || (useChain[chainId].symbol !== nftAssets.symbol)) {
            const changeChain = Object.values(useChain).find((chain) => chain.symbol === nftAssets.symbol);

            if (changeChain) {
                return;
            }
        }

        if (assets.symbol !== 'KRW') {
            setFormCheck(true);
            return;
        }

        // Recoil에 저장해줘야
        // 주문완료페이지에서 데이터를 보여줄수 있음
        const params = qs.stringify({
            assetId,
            quantity,
            isFirst,
            gb: assets.pfp_gb,
        });
        localStorage.setItem('tossPaymentsOrderInfo', params);

        // 토스 결제창 실행
        tossPaymentsOrder({
            id: `${assets.market_id}-${assets.asset_id}-${quantity}-${moment().format('YYYY-MM-DD-HH_mm_ss')}`,
            totalPrice: assets.price * Number(quantity),
            asset_name: assets.asset_name,
            user_name: userAddress.name,
        });
    };

    // 마켓 취소 이벤트
    const handleCancel = async (nft: IAssetsDetail) => {
        // 클릭하면 버튼 비활성화
        setCancelDisabled(true);

        try {
            // 취소 함수
            await handleMarketCancel(nft);

            // 취소가 완료되면 버튼 활성화
            setCancelDisabled(false);
        } catch (error) {
            // 취소가 완료되면 버튼 활성화
            setCancelDisabled(false);
        }
    };

    useEffect(() => {
        if (nftAssets.expiration_date) {
            const nowTime = new Date().getTime();
            const assetTime = new Date(nftAssets.expiration_date.split(' ')[0]).getTime();

            if (nowTime > assetTime) {
                setEndTime(true);
            }
        }
    }, []);

    return (
        <Container>
            {/* 구매 버튼 */}
            {nftAssets.price !== 0 && userAddress.address !== '' && nftAssets.is_display === 1 && userAddress.address !== nftAssets.owner_address && (
                <OrderBox>
                    {(!endTime && nftAssets.symbol !== 'ETH') && (
                        <Order
                            type="button"
                            onClick={() => handleTossPaments({
                                assets: nftAssets,
                                quantity,
                            })}
                        >
                            {nftAssets.symbol === 'KRW'
                                ? '구매하기'
                                : t('AssetsDetail.orderButton')}

                        </Order>
                    )}
                    {(endTime || nftAssets.symbol === 'ETH') && (
                        <Order
                            type="button"
                            disabled
                        >
                            판매기간 종료
                        </Order>
                    )}
                </OrderBox>

            )}

            {/* 로그인 전 구매 버튼 */}
            {nftAssets.price !== 0 && userAddress.address === '' && nftAssets.is_display === 1 && userAddress.address !== nftAssets.owner_address && (
                <OrderBox>
                    <Order
                        type="button"
                        onClick={() => window.location.assign(`/login?location=${window.location.pathname}`)}
                    >
                        {t('AssetsDetail.loginButton')}
                    </Order>
                </OrderBox>
            )}

            {/* 내서비스인 경우 */}
            {nftAssets.price !== 0 && nftAssets.is_display === 1 && userAddress.address === nftAssets.owner_address && (
                <OrderBox>
                    <Order
                        type="button"
                        onClick={() => handleCancel(nftAssets)}
                        disabled={cancelDisabled}
                    >
                        판매취소
                    </Order>
                </OrderBox>
            )}

            {/* 판매 완료된 경우 */}
            {nftAssets.price !== 0 && nftAssets.is_display === 0 && userAddress.address !== nftAssets.owner_address && (
                <OrderBox>
                    <Order disabled>
                        {t('AssetsDetail.saleCompleteButton')}
                    </Order>
                </OrderBox>
            )}

            {/* 재판매 버튼 */}
            {(!nftAssets.is_display || nftAssets.is_display === 0) && userAddress.address === nftAssets.owner_address && (
                <OrderBox>
                    <Order
                        type="button"
                        onClick={() => navigate(`/market-sale/${nftAssets.contract_address}/${nftAssets.asset_id}`)}
                    >
                        {t('AssetsDetail.resellButton')}
                    </Order>
                </OrderBox>
            )}
        </Container>
    );
}

const Container = styled.div``;

const OrderBox = styled.div`
    margin-top: 12px;
`;

const Order = styled.button`
    width: 93px;
    height: 40px;
    border-radius: 4px;
    font-size: 14px;
    border: 1px solid ${colors.BlueGray500};
    background-color: ${colors.White100};
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:disabled {
        background-color: ${colors.BlueGray500};
        cursor: not-allowed;
    }

    &:hover {
        background-color: ${colors.BlueGray300};
    }
`;

export default AssetsSingleOrderPanel;
