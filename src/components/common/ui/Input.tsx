/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

interface IInput {
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
}
function Input({
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
}: IInput) {
    const [patternError, setPatternError] = useState<boolean>(true);
    const [status, setStatus] = useState({
        color: colors.BlueGray500,
        background: colors.White100,
        type: 'normal',
    });

    const handleKeyUp = (event: any) => {
        const { value } = event.target;

        if (type === 'number') {
            const rgex = /[^0-9]/g;
            const newValue = value.replace(rgex, '');
            setValue(label, newValue);
        }

        if (pattern) {
            const patternTest = pattern.test(value);

            setPatternError(patternTest);
        }

        if (value.length === 1) {
            const newValue = value.replace(' ', '');
            setValue(label, newValue);
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

        if (valueLength > minLength) {
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
        <InputBox
            border={status.color}
            background={status.background}
        >
            <InputStyled
                {...register(label, {
                    required, minLength, maxLength, pattern,
                })}
                type={type}
                minLength={minLength}
                maxLength={maxLength}
                placeholder={placeholder}
                onInput={handleKeyUp}
                autoComplete="off"
            />

            {error && patternError && <Error>{errorMessage}</Error>}
            {!patternError && <Error>{patternMessage}</Error>}

            {required && (
                <>
                    {(error || (!patternError && pattern)) && (
                        <StatusIcon src="/img/common/ic_input_error.svg" />
                    )}

                    {!(error || (!patternError && pattern)) && valueLength > minLength && (
                        <StatusIcon src="/img/common/ic_input_sucesse.svg" />
                    )}

                </>
            )}
        </InputBox>

    );
}

const InputBox = styled.div<{border: string, background: string}>`
    width: 100%;
    height: 50px;
    padding: 15px 12px;
    border-bottom: 1px solid ${(props) => (props.border)};
    background-color: ${(props) => (props.background)};
    position: relative;
    padding-right: 40px;
`;

const Error = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    font-size: 12px;
    color: ${colors.Red100};
`;

const InputStyled = styled.input`
    border: 0;
    width: 100%;
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
`;

const StatusIcon = styled('img')`
    width: 16px;
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translate(0, -50%);
`;

export default Input;
