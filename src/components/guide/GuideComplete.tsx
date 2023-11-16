import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';

function GuideCheck() {
    return (
        <Coninater>
            <ImageSection>
                <SectionImage
                    src="/img/guide/img_guide_complete.png"
                    width={1092}
                    height={880}
                    alt="이미지"
                />
            </ImageSection>
            <StepSection>
                <StepBox>
                    <TitleImage
                        src="/img/guide/img_guide_complete_emoji.png"
                        width={205}
                        height={168}
                        alt="이미지"
                    />
                    <Description>
                        바로 지금, 탄탄에서
                        <br />
                        당신의 상품 판매되고 있습니다!
                    </Description>
                </StepBox>
            </StepSection>
        </Coninater>
    );
}

const SectionImage = styled('img')``;

const TitleImage = styled('img')``;

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
    flex-basis: 50%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StepBox = styled.div`
    padding-left: 130px;
`;

const Description = styled.div`
    margin-top: 23px;
    font-size: 24px;
    color: ${colors.White100};
    line-height: 1.7;
    font-weight: 500;

    span {
        color: ${colors.Orange100};
    }
`;

export default GuideCheck;
