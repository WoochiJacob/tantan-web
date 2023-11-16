import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';

function GuideSignModal() {
    return (
        <Coninater>
            <ImageSection>
                <Images
                    src="/img/guide/img_guide_qr.png"
                    width={500}
                    alt="이미지"
                />
            </ImageSection>
            <StepSection>
                <StepBox>
                    <Step>7</Step>
                    <Title>
                        지갑 연결하기
                    </Title>
                    <Description>
                        이름과 설명 등 작품의 필수정보를 입력하고 유의사항에 동의하시면,
                        <br />
                        <span>상품을 거래, 보관할 클립지갑 연결하기</span>
                    </Description>
                    <InfoText>
                        * 작품 또는 창작자 홍보를 위해 외부 링크를 추가하실 수도 있습니다. (선택)
                    </InfoText>
                </StepBox>
            </StepSection>
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
    padding: 69px 0;
    flex-basis: 50%;
    height: 538px;
`;

const ImageSection = styled.div`
    padding: 69px 0;
    padding-right: 93px;
    padding-left: 75px;
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
    margin-top: 42px;
    font-size: 24px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const Description = styled.div`
    margin-top: 8px;
    font-size: 14px;
    color: ${colors.Black100};
    line-height: 1.7;

    span {
        color: ${colors.Orange100};
    }
`;

const InfoText = styled.div`
    font-size: 14px;
    color: ${colors.BlueGray700};
    margin-top: 4px;
    margin-bottom: 34px;
`;

export default GuideSignModal;
