/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

interface INumberInput {
    label: string;
    required: boolean;
    minLength: number;
    maxLength: number;
    valueLength: number;
    type: string;
    placeholder: string;
    errorMessage: string;
    error: boolean;
    setValue: any;
    register: any;
    pattern?: RegExp | '';
    patternMessage?: string;
    getValue: any;
    maxLimit: number;
}
function NumberInput({
    label,
    required,
    minLength,
    maxLength,
    valueLength,
    type,
    placeholder,
    errorMessage,
    error,
    setValue,
    register,
    pattern,
    patternMessage,
    getValue,
    maxLimit,
}: INumberInput) {
    const [patternError, setPatternError] = useState<boolean>(true);
    const [status, setStatus] = useState({
        color: colors.BlueGray500,
        background: colors.White100,
        type: 'normal',
    });

    const handleKeyUp = (event: any) => {
        const { value } = event.target;
        const setInputVaue = value.replace(',', '');

        if (type === 'number') {
            const rgex = /[^0-9]/g;
            const newValue = setInputVaue.replace(rgex, '');
            setValue(label, newValue);
        }

        if (pattern) {
            const patternTest = pattern.test(setInputVaue);

            setPatternError(patternTest);
        }

        if (setInputVaue.length === 1) {
            const newValue = setInputVaue.replace(' ', '');
            setValue(label, newValue);
        }

        if (Number(setInputVaue) > maxLimit) {
            setValue(label, maxLimit.toLocaleString());
            return;
        }

        if (Number(setInputVaue) < 1) {
            setValue(label, 1);
            return;
        }

        if (Number(setInputVaue)) {
            setValue(label, Number(setInputVaue).toLocaleString());
        }

        statusFunc();
    };

    const statusFunc = () => {
        if (error || (!patternError && pattern)) {
            setStatus({
                color: colors.Red100,
                background: rgba(colors.Red100, 0.03),
                type: 'error',
            });
            return;
        }
        if (valueLength >= minLength || getValue > 0) {
            setStatus({
                color: required ? colors.Green100 : colors.Black200,
                background: required ? rgba(colors.Green100, 0.03) : colors.White100,
                type: 'sucesse',
            });

            return;
        }

        setStatus({
            color: colors.BlueGray500,
            background: colors.White100,
            type: 'normal',
        });
    };

    useEffect(() => {
        statusFunc();
    }, [error, getValue]);

    return (
        <NumberInputBox
            border={status.color}
            background={status.background}
        >
            <NumberInputStyled
                {...register(label, {
                    required, minLength, maxLength, pattern,
                })}
                type="text"
                minLength={minLength}
                maxLength={maxLength}
                placeholder={placeholder}
                onInput={handleKeyUp}
                autoComplete="off"
            />

            {error && patternError && <Error>{errorMessage}</Error>}
            {!patternError && <Error>{patternMessage}</Error>}
        </NumberInputBox>

    );
}

const NumberInputBox = styled.div<{border: string, background: string}>`
    width: 100%;
    height: 50px;
    padding: 8px 12px;
    border-bottom: 1px solid ${(props) => (props.border)};
    background-color: ${(props) => (props.background)};
    position: relative;
    padding-right: 12px;
`;

const Error = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    font-size: 12px;
    color: ${colors.Red100};
`;

const NumberInputStyled = styled.input`
    border: 0;
    width: 100%;
    height: 32px;
    text-align: right;
    font-size: 32px;
    font-weight: 500;
    padding: 0;
    background-color: transparent;
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;

    &:focus, &:active, &:focus-visible {
        border: 0;
        outline: 0;
    }

    &[type="number"]::-webkit-outer-spin-button,
    &[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    &::placeholder {
        color: ${colors.WarmGray400};
    }

    &:disabled {
        color: ${colors.Black100};
    }
`;

export default NumberInput;
