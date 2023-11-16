import React, { useMemo } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

interface ISelectOptions {
    value: string;
    name: string;
    id: number;
}

interface ISelect {
    label: string;
    required: boolean;
    placeholder: string;
    register: any;
    options: any;
    error: boolean;
    valueLength: number;
    errorMessage: string;
    getValue: any;
}
function Select({
    register,
    label,
    required,
    placeholder,
    options,
    error,
    valueLength,
    errorMessage,
    getValue,
}: ISelect) {
    const status = useMemo(() => {
        if (valueLength > 0) {
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
    }, [error, valueLength]);

    return (
        <SelectBox>
            <SelectStyled
                {...register(label, { required })}
                border={status.color}
                background={status.background}
                fontColor={getValue === ''}
            >
                {placeholder !== '' && <option value="">{placeholder}</option>}

                {options.map((option: ISelectOptions) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.name}
                    </option>
                ))}
            </SelectStyled>
            {error && <Error>{errorMessage}</Error>}
        </SelectBox>
    );
}

const SelectStyled = styled.select<{border: string, background: string, fontColor: boolean}>`
    -webkit-appearance: none;
        -moz-appearance: none;
            appearance: none;
    width: 100%;
    border: 0;
    border-bottom: 1px solid ${(props) => (props.border)};
    background-color: ${(props) => (props.background)};
    height: 50px;
    padding: 0 12px;
    font-size: 14px;
    color: ${(props) => (props.fontColor ? colors.WarmGray400 : colors.Black100)};

    &:focus, &:active, &:focus-visible {
        border: 0;
        border-bottom: 1px solid ${(props) => (props.border)};
        outline: 0;
    }

    option {
        color: ${colors.Black100};
    }
`;

const SelectBox = styled.div`
    position: relative;

    &::before {
        width: 12px;
        height: 12px;
        background-image: url('/img/common/ic_select.png');
        background-size: cover;
        content: '';
        display: block;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translate(0, -50%);
    }
`;

const Error = styled.div`
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    font-size: 12px;
    color: ${colors.Red100};
`;

export default Select;
