import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';
import { UserAddress } from '@recoil/auth';
import { useRecoilValue } from 'recoil';

// Data
import { challengeCreateFormData, ICreateFormData } from '@utils/data/create_data';

// Components
import Input from '@components/common/ui/Input';
import NumberInput from '@components/common/ui/NumberInput';
import TextArea from '@components/common/ui/TextArea';
import Select from '@components/common/ui/Select';
import CreateCheckBox from '@components/common/ui/CreateCheckBox';

interface ICreateForm {
    register: any;
    errors: any;
    setValue: any;
    getValues: any;
    watch: any;
}

function CreateForm({
    register,
    errors,
    setValue,
    getValues,
    watch,
}: ICreateForm) {
    const { t } = useTranslation();
    const createForm:ICreateFormData[] = challengeCreateFormData();
    const userAddress = useRecoilValue(UserAddress);

    return (
        <>
            {createForm.map((form: ICreateFormData) => (
                <FormBox
                    key={form.label}
                    type={form.type}
                >

                    {/* TITLE FORM */}
                    {(form.type !== 'price-input' && form.type !== 'checkbox') && (
                        <>
                            <TitleBox>
                                {/* TITLE */}
                                <Title>
                                    {form.required && (
                                        <span>
                                            (
                                            {t('Create.createRequired')}
                                            )
                                        </span>
                                    )}
                                    {form.title}
                                </Title>

                                <TitleInfo>
                                    {/* TITLE SIDE */}
                                    {(form.type === 'text' || form.type === 'textarea') && (
                                        <LengthCheck>
                                            {watch(form.label) ? watch(form.label).length : 0}
                                            {' '}
                                            /
                                            {' '}
                                            {t('Create.createMaxText')}
                                            {' '}
                                            {form.maxLength}
                                            {t('Create.createMaxUnit')}
                                        </LengthCheck>
                                    )}
                                </TitleInfo>
                            </TitleBox>
                            {form.label === 'category' && (
                                <CategoryInfo>
                                    아이디어를 올릴 카테고리를 선택해주세요.
                                </CategoryInfo>
                            )}

                        </>
                    )}

                    {/* TEXT FORM */}
                    {form.type === 'text' && (
                        <Input
                            register={register}
                            required={form.required}
                            minLength={form.minLength}
                            maxLength={form.maxLength}
                            valueLength={watch(form.label) ? watch(form.label).length : 0}
                            getValue={getValues(form.label)}
                            setValue={setValue}
                            error={!!errors[form.label]}
                            placeholder={form.message}
                            errorMessage={form.message}
                            label={form.label}
                            type={form.type}
                        />
                    )}

                    {/* TEXT FORM */}
                    {form.type === 'number-input' && (
                        <NumberInputBox>
                            <MaxSupply>
                                최대 100,000개
                            </MaxSupply>
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
                                maxLimit={100000}
                            />
                        </NumberInputBox>
                    )}

                    {/* TEXTAREA FORM */}
                    {form.type === 'textarea' && (
                        <TextArea
                            register={register}
                            label={form.label}
                            required={form.required}
                            minLength={form.minLength}
                            maxLength={form.maxLength}
                            type={form.type}
                            placeholder={form.message}
                            height={200}
                            setValue={setValue}
                            valueLength={watch(form.label) ? watch(form.label).length : 0}
                            error={!!errors[form.label]}
                            errorMessage={form.message}
                        />
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

                    {/* CHECBOX FORM */}
                    {form.type === 'checkbox' && (
                        <CheckedBox>
                            <AdultTitleBox>
                                <AdultIcon src="/img/create/ic_create_adult.svg" />
                                <AdultTitle>
                                    성인인증이 필요한 콘텐츠인가요?
                                </AdultTitle>
                            </AdultTitleBox>
                            <CreateCheckBox
                                register={register}
                                required={form.required}
                                label={form.label}
                                value={getValues(form.label)}
                                setValue={setValue}
                                disabled={userAddress.adult === 0}
                            />
                        </CheckedBox>
                    )}
                </FormBox>
            ))}
        </>
    );
}

const FormBox = styled.div<{type: string}>`
    padding-bottom: ${(props) => (props.type === 'checkbox' ? '50px' : '50px')};
    border-bottom: ${(props) => (props.type === 'checkbox' ? '1px' : '0')} solid ${colors.BlueGray400};
    margin-bottom: ${(props) => (props.type === 'checkbox' ? '24px' : '0')};
`;

const TitleBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const Title = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    font-weight: 500;

    span {
        color: ${colors.Red100};
        margin-right: 4px;
    }
`;

const TitleInfo = styled.div`
    padding-left: 4px;
    flex: 1;
`;

const LengthCheck = styled.div`
    display: flex;
    justify-content: flex-end;
    font-size: 13px;
    color: ${colors.BlueGray700};
    float: right;
    font-weight: 300;
`;

const CategoryInfo = styled.div`
    margin-bottom: 10px;
    color: ${colors.BlueGray700};
    font-size: 14px;
`;

const CheckedBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NumberInputBox = styled.div`
    position: relative;
`;

const MaxSupply = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    position: absolute;
    top: 50%;
    left: 12px;
    z-index: 2;
    transform: translate(0, -50%);
`;

const AdultTitleBox = styled.div`
    display: flex;
    align-items: center;
`;

const AdultIcon = styled('img')`
    width: 28px;
    margin-right: 8px;
`;

const AdultTitle = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};
    position: relative;

    &:before {
        width: 100%;
        display: block;
        content: '성인인증이 필요한 콘텐츠일 경우 체크박스를 선택해주세요.';
        font-size: 13px;
        color: ${colors.BlueGray700};
        position: absolute;
        top: calc(100% + 6px);
        left: 0;
        white-space: nowrap;
        font-weight: 300;
    }
`;

export default CreateForm;
