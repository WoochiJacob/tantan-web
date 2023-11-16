/* eslint-disable operator-linebreak */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { IAssetsDetail } from '@interface/assets';
import { rgba } from 'emotion-rgba';
import { pfpGB } from '@utils/help';

interface IAssetsTitlePanel {
    nftAssets: IAssetsDetail;
}

function AssetsTitlePanel({ nftAssets }: IAssetsTitlePanel) {
    const [endTime, setEndTime] = useState<boolean>(false);

    const symbolText = (chain: string) => {
        if (chain === 'KRW') return '원화';

        if (chain === 'ETH') return '이더리움';

        return '클레이튼';
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
        <>
            {/* 판매 상태 */}
            <AssetsStatusBox>
                <AssetsStatus>
                    {/* 심볼 */}
                    <AssetsSymbol src={`/img/assets_detail/ic_${nftAssets.symbol}_icon.svg`} />

                    <AssetsSymbolText>{symbolText(nftAssets.symbol)}</AssetsSymbolText>

                    {nftAssets.price !== 0 && (
                        <StateLabel
                            isDisplay={
                                nftAssets.is_display === 0 ||
                                !nftAssets.is_display ||
                                nftAssets.symbol === 'ETH' ||
                                endTime
                            }
                        >
                            {nftAssets.is_display === 0 ||
                            !nftAssets.is_display ||
                            nftAssets.symbol === 'ETH' ||
                            endTime
                                ? '판매완료'
                                : '판매중'}
                        </StateLabel>
                    )}

                    {nftAssets.price === 0 && <StateLabel isDisplay>AirDrop</StateLabel>}
                </AssetsStatus>
                {nftAssets.adult_gb.toString() === '1' && (
                    <AdultIcon src="/img/common/ic_adult.svg" />
                )}
            </AssetsStatusBox>
            {!pfpGB(nftAssets.pfp_gb) && (
                <AssetsSupplyBox>
                    <AssetsSupply>
                        전체 발행수량
                        <span>{nftAssets.supply.toLocaleString()}</span>
                    </AssetsSupply>

                    {nftAssets.asset_quantity > 0 && (
                        <AssetsSupply>
                            상장가능 잔고
                            <span>{nftAssets.asset_quantity.toLocaleString()}</span>
                        </AssetsSupply>
                    )}

                    {nftAssets.market_quantity > 0 && (
                        <AssetsSupply>
                            판매중인 수량
                            <span>{nftAssets.market_quantity.toLocaleString()}</span>
                        </AssetsSupply>
                    )}
                </AssetsSupplyBox>
            )}
        </>
    );
}

const AssetsSupplyBox = styled.div`
    margin-top: 21px;
    display: flex;
    align-items: center;
    padding-bottom: 8px;
    border-bottom: 1px solid ${colors.BlueGray400};
`;

const AssetsSymbol = styled('img')`
    width: 28px;
    margin-right: 6px;
`;

const AssetsSymbolText = styled.div`
    flex-basis: 60px;
    width: 60px;
    height: 30px;
    border-radius: 4px;
    background-color: ${colors.White100};
    color: ${colors.Black200};
    border: 1px solid ${colors.BlueGray400};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
    font-size: 13px;
`;

const AssetsStatus = styled.div`
    display: flex;
    align-items: center;
`;

const StateLabel = styled.div<{ isDisplay: boolean }>`
    flex-basis: 60px;
    width: 60px;
    height: 30px;
    border-radius: 4px;
    background-color: ${(props) =>
        props.isDisplay ? rgba(colors.BlueGray500, 0.3) : rgba(colors.Red200, 0.05)};
    color: ${(props) => (props.isDisplay ? colors.BlueGray500 : colors.Red200)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
    font-size: 13px;
`;

const AssetsSupply = styled.div`
    flex-basis: 33.33%;
    font-size: 14px;
    color: ${colors.BlueGray700};
    margin-right: 10px;

    span {
        font-size: 14px;
        color: ${colors.Black100};
        display: block;
        margin-top: 8px;
    }
`;

const AdultIcon = styled('img')`
    width: 28px;
`;

const AssetsStatusBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export default AssetsTitlePanel;
