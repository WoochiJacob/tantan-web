import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { nl2br } from '@utils/help';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

import CreateCheckBox from '@components/common/ui/CreateCheckBox';

interface IFormCheckModal {
    formCheckCallback: any;
    submitData: any;
}

type OrderData = {
    notice: boolean;
    policy: boolean;
}

function FormCheckModal({ formCheckCallback, submitData }: IFormCheckModal) {
    const {
        register, setValue, getValues, formState: { isValid },
    } = useForm<OrderData>({
        mode: 'onChange',
    });
    const { t } = useTranslation();
    // const getPrice = useMemo(() => {
    //     const unit = 100000000;
    //     const price = Number(submitData.price);
    //     const createFee = price * (Number(submitData.royalty_fee) / 100);
    //     const serviceFee = price * 0.025;
    //     const TotalPrice = price - (createFee + serviceFee);
    //     const calcPrice = Math.round(TotalPrice * unit) / unit;

    //     return calcPrice;
    // }, []);

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
                <MintInfoText>{t('CreateModal.checkAssetsNoti')}</MintInfoText>
                <AssetsDataBox>
                    <AssetsBox>
                        <AssetsDataTitle>
                            {t('CreateModal.categoryModal')}
                            {' '}
                            {'>'}
                            {' '}
                            {submitData.category}
                        </AssetsDataTitle>
                    </AssetsBox>
                    <AssetsBox>
                        <AssetsDataTitle>
                            {t('CreateModal.checkAssetsTitle')}
                        </AssetsDataTitle>
                        <AssetsData>{submitData.name}</AssetsData>
                    </AssetsBox>
                    <AssetsBox>
                        <AssetsDataTitle>
                            {t('CreateModal.checkAssetsDesc')}
                        </AssetsDataTitle>
                        <AssetsData dangerouslySetInnerHTML={{ __html: nl2br(submitData.description) }} />
                    </AssetsBox>
                    <AssetsBox>
                        <AssetsDataTitle>
                            {t('CreateModal.checkAssetsLink')}
                        </AssetsDataTitle>
                        <AssetsData>
                            {submitData.external_link === '' ? '-' : submitData.external_link}
                        </AssetsData>
                    </AssetsBox>
                </AssetsDataBox>
                <FromCheckDescriptionBox>
                    <PriceBox>
                        <PriceTitle>
                            발행수량
                        </PriceTitle>
                        <Price>
                            <PriceUnderLine>
                                {submitData.supply}
                            </PriceUnderLine>
                        </Price>
                    </PriceBox>
                    <PriceBox>
                        <PriceTitle>
                            {t('CreateModal.createFee')}
                        </PriceTitle>
                        <Price>
                            <PriceUnderLine>
                                {Number(submitData.royalty_fee)}
                                %
                            </PriceUnderLine>
                        </Price>
                    </PriceBox>
                    <PriceBox>
                        <PriceTitle>
                            {t('CreateModal.serviceFee')}
                        </PriceTitle>
                        <Price>
                            <PriceUnderLine>
                                2.5%
                            </PriceUnderLine>
                        </Price>
                    </PriceBox>
                </FromCheckDescriptionBox>
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
                        {t('CreateModal.modify')}
                    </ModifyButton>
                    <CheckButton
                        onClick={() => formCheckCallback('complete')}
                        disabled={!isValid}
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
    margin-top: 27px;
`;

const AssetsDataBox = styled.div`
    margin-top: 20px;
    max-height: 200px;
    overflow-y: auto;
`;

const AssetsBox = styled.div`
    margin-top: 32px;

    &:first-of-type {
        margin-top: 0;
    }
`;

const AssetsDataTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const AssetsData = styled.div`
    font-size: 14px;
    color: ${colors.BlueGray700};
    margin-top: 12px;
    width: 100%;
    word-break: break-all;
`;

const FromCheckDescriptionBox = styled.div`
    width: 100%;
    background-color: ${colors.BlueGray350};
    border-radius: 8px;
    padding: 19px 20px;
    position: relative;
    margin-top: 42px;
    margin-bottom: 58px;
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
`;

const ButtonGroup = styled.div`
    margin-top: 40px;
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
    border: 0;
    background-color: ${colors.Black200};
    color: ${colors.White100};
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    

    &:hover {
        background-color: ${colors.Black200};
    }

    &:disabled {
        background-color: ${colors.BlueGray500};
        cursor: not-allowed;
    }
`;

const MintInfoText = styled.div`
    margin-top: 22px;
    font-size: 14px;
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
