import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

interface ITextArea {
    label: string;
    required: boolean;
    minLength: number;
    maxLength: number;
    type: string;
    register: any;
    placeholder: string;
    height: number;
    setValue: any;
    valueLength: number;
    error: boolean;
    errorMessage: string;
}
function TextArea({
    register,
    label,
    required,
    minLength,
    maxLength,
    type,
    placeholder,
    height,
    setValue,
    valueLength,
    error,
    errorMessage,
}: ITextArea) {
    const [status, setStatus] = useState({
        color: colors.BlueGray500,
        background: colors.White100,
        type: 'normal',
    });

    const onlyText = (event: any) => {
        const { value } = event.target;

        if (value.length === 1) {
            const newValue = value.replace(' ', '');
            setValue(label, newValue);
        }

        statusFunc();
    };

    useEffect(() => {
        statusFunc();
    }, [error]);

    const statusFunc = () => {
        if (error) {
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

    return (
        <TextareaBox>
            <TextareaStyled
                border={status.color}
                background={status.background}
                {...register(label, { required, minLength })}
                autoComplete="off"
                type={type}
                minLength={minLength}
                placeholder={placeholder}
                textHeight={height}
                maxLength={maxLength}
                onInput={onlyText}
                rows={2}
            />
            {error && <Error>{errorMessage}</Error>}
        </TextareaBox>
    );
}

const TextareaStyled = styled.textarea<{textHeight: number, border: string, background: string}>`
    width: 100%;
    border: 1px solid ${(props) => (props.border)};
    background-color: ${(props) => (props.background)};
    border-radius: 8px;
    height: ${(props) => `${props.textHeight}px`};
    padding: 15px 12px;
    resize: none;
    font-size: 14px;

    &:focus, &:active, &:focus-visible {
        border: 1px solid ${(props) => (props.border)};
        outline: 0;
    }

    &::placeholder {
        color: ${colors.WarmGray400};
    }
`;

const TextareaBox = styled.div`
    position: relative;
`;

const Error = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    font-size: 12px;
    color: ${colors.Red100};
`;

export default TextArea;
