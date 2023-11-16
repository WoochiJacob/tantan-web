import React, { useMemo } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

interface IInput {
    label: string;
    required: boolean;
    minLength: number;
    maxLength: number;
    valueLength: number;
    title: string;
    unit: string;
    errorMessage: string;
    error: boolean;
    setValue: any;
    register: any;
    placeholder: string;
}
function Input({
    label,
    required,
    minLength,
    maxLength,
    valueLength,
    unit,
    title,
    errorMessage,
    error,
    setValue,
    register,
    placeholder,
}: IInput) {
    const handleKeyUp = (event: any) => {
        const { value } = event.target;

        if (value.length === 1) {
            const newValue = value.replace(' ', '');
            setValue(label, newValue);
        }

        const rgex = /[^0-9.]/g;

        if (rgex.test(value)) {
            const newValue = value.replace(rgex, '');
            setValue(label, newValue);
        }
        if (value.split('.').length > 2) {
            setValue(label, '');
        }
    };

    const handleZeroValidation = (event: any) => {
        const { value } = event.target;

        if (unit === 'KRW') {
            if (Number(value) < 1000) {
                setValue(label, '', { shouldValidate: true });
            }

            if (Number(value) > 2000000) {
                setValue(label, '', { shouldValidate: true });
            }
        } else {
            if (Number(value) <= 0.0009) {
                setValue(label, '', { shouldValidate: true });
            }

            if (Number(value) > 99999) {
                setValue(label, '', { shouldValidate: true });
            }
        }
    };

    const status = useMemo(() => {
        if (valueLength > minLength) {
            return {
                color: colors.Black200,
                background: colors.White100,
            };
        }
        if (error) {
            return {
                color: colors.Red100,
                background: rgba(colors.Red100, 0.03),
            };
        }

        return {
            color: colors.BlueGray500,
            background: colors.White100,
        };
    }, [error, minLength, valueLength]);

    return (
        <InputBox
            border={status.color}
            background={status.background}
        >
            <InputStyled
                {...register(label, { required, minLength, maxLength })}
                type="text"
                minLength={minLength}
                maxLength={maxLength}
                onInput={handleKeyUp}
                onBlur={handleZeroValidation}
                autoComplete="off"
                placeholder={placeholder}
            />

            <Title>
                <UnitImage src={`/img/common/ic_symbol_${unit}.png`} />
                {title}
            </Title>
            <Unit>{unit}</Unit>
            {error && <Error>{errorMessage}</Error>}
        </InputBox>

    );
}

const InputBox = styled.div<{border: string, background: string}>`
    width: 100%;
    padding: 0 80px 10px 0;
    border-bottom: 2px solid ${colors.Black200};
    background-color: ${(props) => (props.background)};
    position: relative;
`;

const Error = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    font-size: 12px;
    color: ${colors.Red100};
`;

const Unit = styled.div`
    position: absolute;
    bottom: 15px;
    right: 0;
    font-size: 20px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const UnitImage = styled('img')`
    width: 35px;
    margin-right: 4px;
`;

const Title = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    font-size: 16px;
    font-weight: 500;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
`;

const InputStyled = styled.input`
    border: 0;
    width: 100%;
    text-align: right;
    font-size: 32px;
    font-weight: 500;
    color: ${colors.Black100};
    background-color: transparent;
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;

    &:focus, &:active, &:focus-visible {
        border: 0;
        outline: 0;
    }
    
    &::placeholder {
        color: ${colors.WarmGray300};
        font-size: 24px;
        font-weight: 400;
    }

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

export default Input;
