import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';

interface IRadio {
    register: any;
    name: string;
    value: string;
    label: string;
}
function Radio({
    register,
    name,
    value,
    label,
}: IRadio) {
    return (
        <RadioBox>
            <RadioHidden
                autoComplete="off"
                type="radio"
                name={label}
                value={value.toString()}
            />
            <RadioStyle checked={value === register.value} />
            {name}
        </RadioBox>
    );
}

const RadioBox = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-left: 24px;
`;

const RadioHidden = styled.input`
    position: absolute;
    opacity: 0;
`;

const RadioStyle = styled.div<{checked : boolean}>`
    width: 20px;
    height: 20px;
    background-color: ${colors.White100};
    border-radius: 50%;
    border: 1px solid ${(props) => (props.checked ? colors.Black200 : colors.BlueGray700)};
    margin-right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
        display: ${(props) => (props.checked ? 'block' : 'none')};
        content: '';
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${colors.Black200};
        transition: .4s ease;
    }
`;

export default Radio;
