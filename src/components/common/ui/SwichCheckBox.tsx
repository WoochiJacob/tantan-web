import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';

interface ICheck {
    register: any;
    setValue: any;
    required: boolean;
    label: string;
    value: boolean;
}
function SwichCheckBox({
    register,
    setValue,
    required,
    label,
    value,
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
            />
            <CheckBoxStyle checked={isChecked} />
        </CheckBox>
    );
}

const CheckBox = styled.label`
    display: flex;
    /* align-items: center; */
    cursor: pointer;
`;

const CheckBoxHidden = styled.input`
    position: absolute;
    opacity: 0;
    cursor: pointer;
`;

const CheckBoxStyle = styled.div<{checked : boolean}>`
    width: 48px;
    height: 26px;
    border-radius: 999px;
    background-color: ${(props) => (props.checked ? colors.Green100 : colors.White100)};
    border: 1px solid ${(props) => (props.checked ? colors.Green100 : colors.BlueGray500)};
    display: flex;
    align-items: center;
    transition: all .4s ease;
    cursor: pointer;
    position: relative;
    padding: 4px;

    &::before {
        display: block;
        content: '';
        width: 18px;
        height: 18px;
        transition: all .4s ease;
        background-color: ${(props) => (props.checked ? colors.White100 : colors.BlueGray500)};
        border-radius: 50%;
        transform: translateX(${(props) => (props.checked ? '20px' : 0)});
    }
`;

export default SwichCheckBox;
