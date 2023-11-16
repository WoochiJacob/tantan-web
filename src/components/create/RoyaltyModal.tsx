import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';

interface IRoyaltyModal {
    setRoyalty: any;
}

function RoyaltyModal({ setRoyalty }: IRoyaltyModal) {
    const { t } = useTranslation();

    return (
        <>
            <ModalHeader>{t('CreateModal.createFeeModal')}</ModalHeader>
            <RoyaltyContents>
                <RoyaltyTitleSection>
                    <RoyaltyTitle>
                        {t('CreateModal.createFeeModal')}
                        ?
                    </RoyaltyTitle>
                    <RoyaltyMore
                        onClick={() => window.open('https://conuts.zendesk.com/hc/ko/articles/18113608677657-%ED%81%AC%EB%A6%AC%EC%97%90%EC%9D%B4%ED%84%B0-%EC%88%98%EC%88%98%EB%A3%8C')}
                    >
                        {t('CreateModal.createFeeMore')}
                    </RoyaltyMore>
                </RoyaltyTitleSection>
                <RoyaltyInfo>
                    {t('CreateModal.createFeeDesc')}
                </RoyaltyInfo>
                <RoyaltyDescriptionBox>
                    <RoyaltyExmapleTitle>{t('CreateModal.firstOrderPrice')}</RoyaltyExmapleTitle>
                    <PriceBox>
                        <PriceTitle>{t('CreateModal.createExample')}</PriceTitle>
                        <Price>
                            <PriceUnderLine>
                                1 KLAY
                            </PriceUnderLine>
                        </Price>
                    </PriceBox>
                    <PriceBox>
                        <PriceTitle>{t('CreateModal.createFee')}</PriceTitle>
                        <Price>
                            <PriceUnderLine>
                                10% = 0.1 KLAY
                            </PriceUnderLine>
                        </Price>
                    </PriceBox>
                    <PriceBox>
                        <PriceTitle>{t('CreateModal.serviceFee')}</PriceTitle>
                        <Price>
                            <PriceUnderLine>
                                2.5% = 0.025 KLAY
                            </PriceUnderLine>
                        </Price>
                    </PriceBox>
                    <TotalPriceBox>
                        <TotalTitle>{t('CreateModal.userGetPrice')}</TotalTitle>
                        <TotalPrice>
                            0.875
                            <span>KLAY</span>
                        </TotalPrice>
                    </TotalPriceBox>
                </RoyaltyDescriptionBox>
                <RoyaltyButton onClick={() => setRoyalty(false)}>{t('CreateModal.confirm')}</RoyaltyButton>
            </RoyaltyContents>
        </>
    );
}

const ModalHeader = styled.div`
    padding: 18px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid ${colors.BlueGray500};
    color: ${colors.Black100};
`;

const RoyaltyContents = styled.div`
    margin-top: 27px;
`;

const RoyaltyTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const RoyaltyInfo = styled.div`
    margin-top: 14px;
    font-size: 14px;
    color: ${colors.BlueGray700};
`;

const RoyaltyDescriptionBox = styled.div`
    width: 100%;
    background-color: ${colors.BlueGray350};
    border-radius: 8px;
    padding: 17px 30px 90px 30px;
    position: relative;
    margin-top: 23px;
    min-height: 226px;
`;

const RoyaltyExmapleTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const PriceBox = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const PriceTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
`;

const Price = styled.div`
    position: relative;

    &::before {
        width: 106%;
        height: 6px;
        background-color: #F3D65E;
        display: block;
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 2;
    }
`;

const PriceUnderLine = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    position: relative;
    z-index: 3;
`;

const TotalPriceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    bottom: 9px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 104%;
    height: 70px;
    padding: 0 20px;
    background-color: ${colors.White100};
    border: 1px solid ${colors.Black200};
    border-radius: 12px;
`;

const TotalTitle = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const RoyaltyTitleSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const RoyaltyMore = styled.div`
    font-size: 14px;
    color: ${colors.BlueGray700};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        color: ${colors.Black100};
    }
`;

const TotalPrice = styled.div`
    font-size: 32px;
    color: ${colors.Black100};
    font-weight: 500;

    span {
        font-size: 16px;
        margin-left: 6px;
    }
`;

const RoyaltyButton = styled.div`
    margin-top: 79px;
    height: 58px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    

    &:hover {
        background-color: ${colors.BlueGray200};
    }
`;

export default RoyaltyModal;
