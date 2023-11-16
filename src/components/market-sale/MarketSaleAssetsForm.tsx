import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';

// Data
import { marketSaleFormData, ICreateFormData } from '@utils/data/create_data';
import { IAssetsDetail } from '@interface/assets';

// Components
import PriceInput from '@components/common/ui/PriceInput';
import NumberInput from '@components/common/ui/NumberInput';
import Select from '@components/common/ui/Select';

interface IMarketSaleForm {
    register: any;
    errors: any;
    setValue: any;
    getValues: any;
    watch: any;
    nftAssets: IAssetsDetail;
}

function MarketSaleAssets({
    register,
    errors,
    setValue,
    getValues,
    watch,
    nftAssets,
}: IMarketSaleForm) {
    const { t } = useTranslation();
    const marketSaleForm:ICreateFormData[] = marketSaleFormData(t);

    return (

        <>
            {marketSaleForm.map((form: ICreateFormData) => (
                <InputFormBox
                    key={form.label}
                >
                    {form.type !== 'price-input' && (
                        <FromTitle>{form.title}</FromTitle>
                    )}

                    {form.type === 'number-input' && (
                        <NumberInputBox>
                            <NumberInput
                                register={register}
                                required={form.required}
                                minLength={form.minLength}
                                maxLength={form.maxLength}
                                valueLength={watch(form.label) ? watch(form.label).length : 0}
                                getValue={getValues(form.label)}
                                setValue={setValue}
                                error={!!errors[form.label]}
                                placeholder="0"
                                errorMessage={form.message}
                                label={form.label}
                                type="number"
                                maxLimit={nftAssets.asset_quantity}
                            />
                        </NumberInputBox>
                    )}

                    {/* SELECT FORM */}
                    {form.type === 'select' && (
                        <Select
                            register={register}
                            label={form.label}
                            required={form.required}
                            getValue={getValues(form.label)}
                            placeholder={form.message}
                            options={form.select}
                            error={!!errors[form.label]}
                            valueLength={watch(form.label) ? watch(form.label).length : 0}
                            errorMessage={form.message}
                        />
                    )}

                    {form.type === 'text' && (
                        <ExternalLink
                            isLink={false}
                        >
                            {nftAssets.royalty}
                            %
                        </ExternalLink>
                    )}

                    {form.type === 'price-input' && (
                        <>
                            <PriceInput
                                register={register}
                                required
                                minLength={1}
                                maxLength={nftAssets.symbol === 'KRW' ? 7 : 5}
                                valueLength={watch(form.label) ? watch(form.label).length : 0}
                                setValue={setValue}
                                error={!!errors.price}
                                unit={nftAssets.symbol}
                                title={t('AssetsDetail.orderPrice')}
                                errorMessage={t('AssetsDetail.orderPriceMessage')}
                                placeholder={nftAssets.symbol === 'KRW' ? '1,000 ~ 2,000,000' : '1 ~ 99,999'}
                                label={form.label}
                            />
                            <ServiceFeeInfo>{t('AssetsDetail.serviceFeeInfo')}</ServiceFeeInfo>
                        </>
                    )}
                </InputFormBox>
            ))}
        </>

    );
}

const FromTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const ExternalLink = styled.div<{isLink: boolean}>`
    margin-top: 10px;
    background-color: ${colors.BlueGray300};
    border-radius: 8px;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    font-size: 14px;
    color: ${colors.Black100};
    text-decoration: ${(props) => (props.isLink ? 'underline;' : 'none')};
    cursor: pointer;
`;

const ServiceFeeInfo = styled.div`
    margin-top: 30px;
    margin-bottom: 53px;
    font-size: 14px;
    color: ${colors.BlueGray700};
`;

const InputFormBox = styled.div`
    margin: 40px 0;
`;

const NumberInputBox = styled.div`
    position: relative;
    margin-top: 10px;
`;

export default MarketSaleAssets;
