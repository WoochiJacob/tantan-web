import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';

function GuideKlipCertify() {
    return (
        <Coninater>
            <StepSection>
                <StepBox>
                    <Step>8</Step>
                    <Title>서명 요청, 전송 요청</Title>
                    <Description>
                        연결된 클립 지갑의 비밀번호를 입력하여
                        {' '}
                        <span>상품 등록 서명, 승인하기</span>
                    </Description>
                </StepBox>
            </StepSection>
            <ImageSection>
                <SctionImage
                    src="/img/guide/img_klip_sign.png"
                    alt="이미지"
                />
            </ImageSection>
        </Coninater>
    );
}

const SctionImage = styled('img')`
    width: 620px;
`;

const Coninater = styled.div`
    padding: 60px 0 100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${colors.BlueGray300};
`;

const StepSection = styled.div`
    padding: 73px 0;
    flex-basis: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 538px;
`;

const ImageSection = styled.div`
    padding-right: 81px;
    padding-left: 259px;
    flex-basis: 60%;
`;

const StepBox = styled.div`
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
    margin-top: 20px;
    font-size: 24px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const Description = styled.div`
    margin-top: 36px;
    margin-bottom: 34px;
    font-size: 14px;
    color: ${colors.Black100};
    line-height: 1.7;

    span {
        color: ${colors.Orange100};
    }
`;

export default GuideKlipCertify;
