import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';

function GuideInput() {
    return (
        <Coninater>
            <ImageSection>
                <Images
                    onClick={() => window.open('https://forms.gle/xmxny3Jt7AzXkKz9A')}
                    src="/img/guide/img_guide_input.png"
                    width={536}
                    alt="이미지"
                />
            </ImageSection>
            <StepSection>
                <StepBox>
                    <Step>5</Step>
                    <Title>
                        작품 정보 입력
                    </Title>
                    <Description>
                        이름과 설명 등 작품의 필수정보를 입력하고 유의사항에 동의하시면,
                        {' '}
                        <span>상품 판매하기</span>
                    </Description>
                    <InfoText>
                        * 작품 또는 창작자 홍보를 위해 외부 링크를 추가하실 수도 있습니다.(선택)
                    </InfoText>
                    <ListGroupItem>
                        <Orderby>1</Orderby>
                        <ListWaop>
                            카테고리
                            <Red>
                                (필수)
                            </Red>
                        </ListWaop>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Orderby>2</Orderby>
                        <ListWaop>
                            작품명
                            <Red>
                                (필수)
                            </Red>
                        </ListWaop>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Orderby>3</Orderby>
                        <ListWaop>
                            작품설명
                            <Red>
                                (필수)
                            </Red>
                        </ListWaop>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Orderby>4</Orderby>
                        <ListWaop>
                            발행수량
                            <Red>
                                (필수)
                            </Red>
                        </ListWaop>
                    </ListGroupItem>
                </StepBox>
            </StepSection>
        </Coninater>
    );
}

const Images = styled('img')`
    cursor: pointer;
`;

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
    padding-right: 58px;
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

const Red = styled.span`
    color: ${colors.Red100};
    line-height: 1.7;
`;

export default GuideInput;
