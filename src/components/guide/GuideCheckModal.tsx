import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';

function GuideCheckModal() {
    return (
        <Coninater>
            <StepSection>
                <StepBox>
                    <Step>6</Step>
                    <Title>상품 정보확인</Title>
                    <Description>
                        등록정보 최종 확인 및 동의사항 체크 후
                        {' '}
                        <span>확인 버튼</span>
                        을 클릭해 주세요.
                    </Description>
                </StepBox>
            </StepSection>
            <ImageSection>
                <SctionImage
                    src="/img/guide/img_guide_check_modal.png"
                    alt="이미지"
                />
            </ImageSection>
        </Coninater>
    );
}

const SctionImage = styled('img')`
    width: 500px;
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
    padding-left: 209px;
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

export default GuideCheckModal;
