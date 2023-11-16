import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useRecoilValue } from 'recoil';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import Decimal from 'decimal.js';

// recoil
import { UserAddress } from '@recoil/auth';
import { rgba } from 'emotion-rgba';

// Components
import CreateCheckBox from '@components/common/ui/CreateCheckBox';

interface IFormCheckModal {
    formCheckCallback: any;
    submitData: any;
    quantity: number;
}

type OrderData = {
    notice: boolean;
    policy: boolean;
}

function FormCheckModal({ formCheckCallback, submitData, quantity }: IFormCheckModal) {
    const { t } = useTranslation();
    const userAddress = useRecoilValue(UserAddress);

    const {
        register, setValue, getValues, formState: { isValid },
    } = useForm<OrderData>({
        mode: 'onChange',
    });

    const handleLink = (type: string) => {
        const link = type === 'notice'
            ? 'https://conuts.zendesk.com/hc/ko/articles/18114045177241-%EB%94%94%EB%84%A4%EC%83%81%EC%8A%A4-%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8'
            : 'https://conuts.zendesk.com/hc/ko/articles/18114012410393-%EB%94%94%EB%84%A4%EC%83%81%EC%8A%A4-%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80';

        window.open(link);
    };

    return (
        <>
            <ModalHeader>{t('CreateModal.checkAssetsModal')}</ModalHeader>
            <FromCheckContents>
                {userAddress.balance < submitData.price && <MintInfoText>{t('CreateModal.checkAssetsOrderNoti_01')}</MintInfoText>}
                {userAddress.balance > submitData.price && <MintInfoText>{t('CreateModal.checkAssetsOrderNoti_02')}</MintInfoText>}
                <AssetTitle>{submitData.asset_name}</AssetTitle>
                <AssetSupply>
                    전체 발행수량
                    <span>{submitData.supply}</span>
                </AssetSupply>
                <FromCheckDescriptionBox>
                    <PriceBox>
                        <PriceTitle>단가</PriceTitle>
                        <Price>
                            <PriceUnderLine>
                                {submitData.price}
                                <span>{submitData.symbol}</span>
                            </PriceUnderLine>
                        </Price>
                    </PriceBox>
                    <PriceBox>
                        <PriceTitle>수량</PriceTitle>
                        <Price>
                            <PriceUnderLine>
                                {quantity}
                            </PriceUnderLine>
                        </Price>
                    </PriceBox>
                </FromCheckDescriptionBox>
                <TotalPriceBox>
                    <TotalTitle>총 금액</TotalTitle>
                    <TotalPrice>
                        {submitData.price ? new Decimal(submitData.price).mul(quantity).toString() : 0}
                        <span>{submitData.symbol}</span>
                    </TotalPrice>
                </TotalPriceBox>
                <CheckedBox>
                    <CheckBoxName>
                        {t('AssetsDetail.noticeCheckTitle')}
                        <CheckRequired>
                            (
                            {t('AssetsDetail.checkRequired')}
                            )
                            <CheckBoxDetail onClick={() => handleLink('notice')}>
                                {t('AssetsDetail.checkDetail')}
                            </CheckBoxDetail>
                        </CheckRequired>
                    </CheckBoxName>
                    <CreateCheckBox
                        register={register}
                        required
                        label="notice"
                        value={getValues('notice')}
                        setValue={setValue}
                    />
                </CheckedBox>
                <CheckedBox>
                    <CheckBoxName>
                        {t('AssetsDetail.policyCheckTitle')}
                        <CheckRequired>
                            (
                            {t('AssetsDetail.checkRequired')}
                            )
                            <CheckBoxDetail onClick={() => handleLink('policy')}>
                                {t('AssetsDetail.checkDetail')}
                            </CheckBoxDetail>
                        </CheckRequired>
                    </CheckBoxName>
                    <CreateCheckBox
                        register={register}
                        required
                        label="policy"
                        value={getValues('policy')}
                        setValue={setValue}
                    />
                </CheckedBox>
                <ButtonGroup>
                    <ModifyButton onClick={() => formCheckCallback('modify')}>
                        {t('CreateModal.cancel')}
                    </ModifyButton>
                    <CheckButton
                        onClick={() => formCheckCallback('complete')}
                        disabled={userAddress.balance < submitData.price || !isValid}
                    >
                        {t('CreateModal.confirm')}
                    </CheckButton>
                </ButtonGroup>
            </FromCheckContents>
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

const FromCheckContents = styled.div`
    margin-top: 21px;
`;

const FromCheckDescriptionBox = styled.div`
    width: 100%;
    background-color: ${colors.BlueGray350};
    border-radius: 8px;
    padding: 19px 20px;
    position: relative;
    margin-top: 20px;
`;

const AssetTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    margin-top: 20px;
`;

const AssetSupply = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: ${rgba(colors.Black100, 0.6)};

    span {
        margin-left: 4px;
        color: ${colors.Black100};
    }
`;

const PriceBox = styled.div`
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:first-of-type {
        margin: 0;
    }
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

    span {
        margin-left: 4px;
    }
`;

const TotalPriceBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
    padding: 0 20px;
    background-color: ${colors.White100};
    border: 1px solid ${colors.Black200};
    border-radius: 12px;
    margin-top: 20px;
    margin-bottom: 164px;
`;

const TotalTitle = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    font-weight: 500;
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

const ButtonGroup = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ModifyButton = styled.div`
    flex-basis: 188px;
    
    height: 58px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    

    &:hover {
        background-color: ${colors.BlueGray200};
    }
`;

const CheckButton = styled.button`
    flex-basis: 242px;
    height: 58px;
    border: 1px solid ${colors.Black200};
    background-color: ${colors.Black200};
    color: ${colors.White100};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

    &:disabled {
        background-color: ${colors.BlueGray500};
        cursor: not-allowed;
        border: 0;
    }
`;

const MintInfoText = styled.div`
    font-size: 13px;
    color: ${colors.Red100};
`;

const CheckedBox = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14px;
`;

const CheckBoxName = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    display: flex;
    flex-direction: column;
`;

const CheckBoxDetail = styled.span`
    margin-left: 12px;
    font-size: 13px;
    color: ${colors.WarmGray500};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        color: ${colors.Black100};
    }
`;

const CheckRequired = styled.span`
    color: ${colors.Red100};
    font-size: 13px;
`;

export default FormCheckModal;
