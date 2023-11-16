import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import 'react-loading-skeleton/dist/skeleton.css';

function MarketSkeleton() {
    return (
        <>
            <ResellTitleBox>
                <CreateTitle>Product Sale</CreateTitle>
            </ResellTitleBox>
            <Container>
                <LeftWrapper>
                    <SkeletonTheme
                        baseColor={colors.BlueGray400}
                        highlightColor={colors.BlueGray300}
                    >

                        <Skeleton
                            height={30}
                        />

                        <Thumbnail>
                            <Skeleton
                                height={580}
                            />
                        </Thumbnail>

                    </SkeletonTheme>
                </LeftWrapper>
                <RightWrapper>
                    <OrderPabel>
                        <SkeletonTheme
                            baseColor={colors.BlueGray400}
                            highlightColor={colors.BlueGray300}
                        >
                            <Skeleton
                                height={18}
                            />
                            <Line margin={12}>
                                <Skeleton
                                    width={300}
                                    height={26}
                                />
                            </Line>
                            <Line margin={12}>
                                <Skeleton
                                    width={150}
                                    height={40}
                                />
                            </Line>
                            <Line margin={12}>
                                <Skeleton
                                    width={67}
                                    height={19}
                                />
                            </Line>
                            <Line margin={14}>
                                <Skeleton
                                    height={74}
                                />
                            </Line>
                            <Line margin={10}>
                                <Skeleton
                                    height={74}
                                />
                            </Line>
                            <Line margin={10}>
                                <Skeleton
                                    height={74}
                                />
                            </Line>
                            <Line margin={10}>
                                <Skeleton
                                    width={350}
                                    height={20}
                                />
                            </Line>
                            <Line margin={10}>
                                <Skeleton
                                    width={200}
                                    height={20}
                                />
                            </Line>
                        </SkeletonTheme>
                    </OrderPabel>
                </RightWrapper>
            </Container>
        </>

    );
}

const Thumbnail = styled.div`
    width: 100%;
    padding: 10px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 12px;
    margin-top: 40px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LeftWrapper = styled.div`
    padding-top: 60px;
    flex-basis: 580px;
`;

const RightWrapper = styled.div`
    padding-top: 60px;
    flex-basis: 580px;
`;

const OrderPabel = styled.div``;

const Line = styled.div<{margin: number}>`
    margin-top: ${(props) => (`${props.margin}px`)};
`;

const ResellTitleBox = styled.div`
    width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    margin-top: 78px;
`;

const CreateTitle = styled.div`
    font-size: 38px;
    font-family: ${fonts.Tinos};
    color: ${colors.Black100};
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.Black100};
`;

export default MarketSkeleton;
