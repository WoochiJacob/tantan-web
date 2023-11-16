import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';

function GuideCheck() {
    return (
        <Coninater>
            <ImageSection>
                <Images
                    src="/img/guide/img_guide_create_button.png"
                    width={910}
                    height={480}
                    alt="이미지"
                />
            </ImageSection>
            <StepSection>
                <StepBox>
                    <Step>3</Step>
                    <Title>상품 만들기</Title>
                    <Description>
                        탄탄에 로그인 후 상품을 만들기 위해서
                        화면 우측 상단에 있는
                        {' '}
                        <Orange>&apos;Create&apos;</Orange>
                        {' '}
                        버튼을 클릭하세요.
                        <br />
                        <Gray>
                            * 상품을 만들기 위해서는 반드시
                            {' '}
                            <Orange>로그인</Orange>
                            부터 하셔야 됩니다.
                        </Gray>
                    </Description>
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
    background: ${colors.Black200};
`;

const StepSection = styled.div`
    padding: 73px 0;
    flex-basis: 50%;
    height: 538px;
    display: flex;
    align-items: center;
`;

const ImageSection = styled.div`
    padding-right: 81px;
    padding-left: 75px;
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StepBox = styled.div`
`;

const Step = styled.div`
    font-size: 34px;
    color: ${colors.White100};
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
    color: ${colors.White100};
    font-weight: 500;
`;

const Description = styled.div`
    margin-top: 34px;
    font-size: 14px;
    color: ${colors.WarmGray400};
    line-height: 1.7;
`;

const Orange = styled.span`
    color: ${colors.Orange100};    
`;

const Gray = styled.span`
    color${colors.WarmGray500};
`;

export default GuideCheck;
