import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';

function GuideCreate() {
    return (
        <Coninater>
            <StepSection>
                <StepBox>
                    <Step>4</Step>
                    <Title>상품 등록</Title>
                    <Description>
                        상품의
                        {' '}
                        <span>이미지</span>
                        {' '}
                        또는
                        {' '}
                        <span>오디오, 영상</span>
                        을 업로드해 주세요.
                    </Description>
                </StepBox>
            </StepSection>
            <ImageSection>
                <Images
                    src="/img/guide/img_guide_create.png"
                    width={584}
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
    padding: 73px 0;
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    background: ${colors.BlueGray300};
    height: 636px;
`;

const ImageSection = styled.div`
    padding-right: 58px;
    padding-left: 75px;
    flex-basis: 50%;
`;

const StepBox = styled.div`
    padding-right: 264px;
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
    margin-top: 42px;
    font-size: 24px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const Description = styled.div`
    margin-top: 8px;
    font-size: 14px;
    color: ${colors.Black100};

    span {
        color: ${colors.Orange100};
    }
`;

export default GuideCreate;
