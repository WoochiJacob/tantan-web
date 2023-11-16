import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';

function GuideCheck() {
    return (
        <Coninater>
            <StepSection>
                <StepBox>
                    <Step>9</Step>
                    <Title>상품 판매</Title>
                    <Description>
                        전체 발행한 수량 중
                        {' '}
                        <span>상장수량(판매할수량)</span>
                        ,
                        <br />
                        <span>판매기간, 판매가격</span>
                        을 입력 후 판매등록하기
                    </Description>
                    <ListGroupItem>
                        <Orderby>1</Orderby>
                        <ListWaop>
                            상장수량 입력
                        </ListWaop>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Orderby>2</Orderby>
                        <ListWaop>
                            판매기간(1일, 7일, 30일, 90일, 365일)
                        </ListWaop>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Orderby>3</Orderby>
                        <ListWaop>
                            판매가격
                        </ListWaop>
                    </ListGroupItem>
                </StepBox>
            </StepSection>
            <ImageSection>
                <SctionImage
                    src="/img/guide/img_guide_check.png"
                    alt="이미지"
                />
            </ImageSection>
        </Coninater>
    );
}

const SctionImage = styled('img')`
    width: 1060px;
`;

const Coninater = styled.div`
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 80px 0 120px;
    /* background: ${colors.BlueGray300}; */
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
    padding-left: 103px;
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

const ListWaop = styled.div``;

const Orderby = styled.div`
    width: 24px;
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
    margin-bottom: 20px;
    font-size: 14px;
    color: ${colors.Black100};
    display: flex;
    align-items: baseline;
`;

export default GuideCheck;
