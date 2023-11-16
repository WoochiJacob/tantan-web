import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';

function GuideMetamask() {
    return (
        <Coninater>
            <StepSection>
                <StepBox>
                    <Step>2</Step>
                    <Title>클립(Klip)지갑 연결하기</Title>
                    <Description>
                        탄탄에서 거래를 하기 위해서는 필수로 암호화폐 지갑 클립(Klip)을
                        <br />
                        연결해야 합니다.
                    </Description>

                    <ListGroupItem>
                        <Orderby>1</Orderby>
                        <ListWaop>
                            <Orange>앱스토어, 구글플레이스토어</Orange>
                            에서
                            {' '}
                            <Orange>‘클립’</Orange>
                            {' '}
                            검색하여 앱 설치를 합니다.
                        </ListWaop>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Orderby>2</Orderby>
                        <ListWaop>
                            카카오톡 연동으로 별 다른 가입절차 없이
                            <br />
                            <Orange>‘동의하고 계속하기’</Orange>
                            {' '}
                            버튼을 누른 후 가입을 진행합니다.
                        </ListWaop>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Orderby>3</Orderby>
                        <ListWaop>
                            <Orange>6자리 핀번호(비밀번호)</Orange>
                            설정 해주면 클립 지갑 생성 완료입니다.
                        </ListWaop>
                    </ListGroupItem>
                </StepBox>

            </StepSection>
            <ImageSection>
                <Images
                    src="/img/guide/img_guide_klip.png"
                    width={391}
                    height={502}
                    alt="이미지"
                />
            </ImageSection>
        </Coninater>
    );
}

const Images = styled('img')``;

const Coninater = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;

`;

const StepSection = styled.div`
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const ImageSection = styled.div`
    padding: 73px 0;
    padding-right: 58px;
    padding-left: 75px;
    flex-basis: 50%;
    background: ${colors.BlueGray300};
`;

const StepBox = styled.div`
    padding-right: 58px;
`;

const Step = styled.div`
    font-size: 34px;
    color: ${colors.Black100};
    font-family: ${fonts.Tinos};
    position: relative;

    &:before {
        width: 31px;
        height: 1px;
        display: block;
        background: ${colors.Orange100};
        content: '';
        transform: rotate(-45deg);
        position: absolute;
        bottom: 6px;
        left: 5px;
    }
`;

const Title = styled.div`
    margin-top: 23px;
    font-size: 24px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const Description = styled.div`
    margin-top: 34px;
    font-size: 14px;
    color: ${colors.Black100};
`;

const ListWaop = styled.div``;

const Orderby = styled.div`
    width: 24px;
    flex-basis: 24px;
    height: 24px;
    background: ${colors.Orange100};
    color: ${colors.White100};
    border-radius: 50%;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    content: '';
    margin-right: 10px;
`;

const ListGroupItem = styled.div`
    margin-top: 34px;
    font-size: 14px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
`;

const Orange = styled.span`
    color: ${colors.Orange100};
`;

export default GuideMetamask;
