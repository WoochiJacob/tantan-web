import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';

interface ICheck {
    register: any;
    setValue: any;
    required: boolean;
    label: string;
    value: boolean;
    title?: string;
    disabled?: boolean;
}
function Radio({
    register,
    setValue,
    required,
    label,
    value,
    title,
    disabled,
}: ICheck) {
    const [isChecked, setChecked] = useState<boolean>(false);

    const change = (e: any) => {
        setValue(label, e.target.checked, { shouldValidate: true });
        setChecked(e.target.checked);
    };

    useEffect(() => {
        setChecked(value);
    }, [value]);

    return (
        <CheckBox>
            <CheckBoxHidden
                {...register(label, { required })}
                type="checkbox"
                onChange={change}
                disabled={disabled}
            />
            <CheckBoxStyle
                checked={isChecked}
                disabled={disabled || false}
            />
            {title && <Title>{title}</Title>}
        </CheckBox>
    );
}

const CheckBox = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const CheckBoxHidden = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;

const CheckBoxStyle = styled.div<{checked: boolean, disabled: boolean}>`
    width: 20px;
    height: 20px;
    background-color: ${(props) => (props.checked ? colors.Black200 : colors.White100)};
    border: 2px solid ${(props) => (props.disabled ? colors.BlueGray400 : colors.Black100)};;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .2s ease;
    cursor: pointer;

    &::before {
        display: ${(props) => (props.checked ? 'block' : 'none')};
        content: '';
        width: 12px;
        height: 12px;
        background-image: url('/img/common/ic_checked.svg');
        transition: .2s ease;
    }
`;

const Title = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    margin-left: 10px;
`;

export default Radio;
