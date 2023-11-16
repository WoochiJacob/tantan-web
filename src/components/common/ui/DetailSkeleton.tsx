import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import 'react-loading-skeleton/dist/skeleton.css';

function DetailSkeleton() {
    return (
        <Container>
            <LeftWrapper>
                <SkeletonTheme
                    baseColor={colors.BlueGray400}
                    highlightColor={colors.BlueGray300}
                >
                    <Skeleton
                        height={80}
                    />
                    <Line margin={24}>
                        <Skeleton
                            height={4}
                        />
                    </Line>
                    <Line margin={6}>
                        <Skeleton
                            height={30}
                        />
                    </Line>
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

    );
}

const Thumbnail = styled.div`
    width: 100%;
    padding: 10px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 12px;
    margin-top: 6px;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`;

const LeftWrapper = styled.div`
    padding-top: 63px;
    flex-basis: 580px;
`;

const RightWrapper = styled.div`
    padding-top: 32px;
    flex-basis: 452px;
`;

const OrderPabel = styled.div`
    padding: 32px 28px 28px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 24px;
    border: 1px solid rgb(238, 238, 238);
    border-radius: 16px;
    position: sticky;
    left: 0px;
    top: 112px;
    z-index: 999;
    height: 609px;
`;

const Line = styled.div<{margin: number}>`
    margin-top: ${(props) => (`${props.margin}px`)};
`;

export default DetailSkeleton;
