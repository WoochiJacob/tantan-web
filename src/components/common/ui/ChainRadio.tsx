import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';

interface IRadio {
    register: any;
    name: string;
    value: string;
    type: string;
    onChangeEvent: () => void
}
function Radio({
    register,
    name,
    value,
    type,
    onChangeEvent,
}: IRadio) {
    return (
        <RadioBox>
            <RadioHidden
                autoComplete="off"
                type="radio"
                name="blockChain"
                value={value}
                onChange={() => onChangeEvent()}
            />
            <RadioStyle checked={value === register.value}>
                <div>
                    <ChainIcon>
                        <Images src={`/img/common/ic_symbol_${value}.png`} />
                    </ChainIcon>
                    <Name>{name}</Name>
                    <Type>{type}</Type>
                </div>
            </RadioStyle>
        </RadioBox>
    );
}

const RadioBox = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 16px;
`;

const RadioHidden = styled.input`
    position: absolute;
    opacity: 0;
`;

const ChainIcon = styled.div`
    width: 36px;
    min-height: 45px;
    display: flex;
    align-items: center;
    margin: 0 auto;
`;

const Images = styled('img')`
    width: 100%;
`;

const Name = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black100};
    margin-top: 5px;
`;

const Type = styled.div`
    font-size: 12px;
    color: ${colors.BlueGray700};
    margin-top: 2px;
`;

const RadioStyle = styled.div<{checked : boolean}>`
    width: 100px;
    height: 120px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid ${(props) => (props.checked ? colors.Black100 : colors.BlueGray500)};
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
        background-image: url('/img/common/ic_chain_radio_checked.svg');
        width: 30px;
        height: 30px;
        background-repeat: no-repeat;
        content: '';
        display: ${(props) => (props.checked ? 'block' : 'none')};
        position: absolute;
        right: -1px;
        top: -1px;
    }
`;

export default Radio;
