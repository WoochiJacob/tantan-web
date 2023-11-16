import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import 'react-loading-skeleton/dist/skeleton.css';
import CardSkeleton from '@components/common/ui/CardSkeleton';

function MypageSkeleton() {
    return (
        <>
            <Skeleton
                height={220}
            />
            <Container>

                <SkeletonTheme
                    baseColor={colors.BlueGray400}
                    highlightColor={colors.BlueGray300}
                >
                    <Line margin={113}>
                        <Skeleton
                            width={200}
                            height={19}
                        />
                    </Line>
                    <Line margin={10}>
                        <Skeleton
                            width={300}
                            height={24}
                        />
                    </Line>
                    <Line margin={40}>
                        <Skeleton
                            width={620}
                            height={113}
                        />
                    </Line>
                    <Line margin={60}>
                        <Skeleton
                            height={60}
                        />
                    </Line>
                </SkeletonTheme>

                <CardSkeletonWrap>
                    <CardSkeleton />
                </CardSkeletonWrap>
                <CardSkeletonWrap>
                    <CardSkeleton />
                </CardSkeletonWrap>

            </Container>
        </>

    );
}

const CardSkeletonWrap = styled.div`
    margin-top: 44px;
`;

const Container = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
    padding-bottom: 120px;
`;

const Line = styled.div<{margin: number}>`
    margin-top: ${(props) => (`${props.margin}px`)};
`;

export default MypageSkeleton;
