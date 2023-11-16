import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import 'react-loading-skeleton/dist/skeleton.css';

function MypageEditSkeleton() {
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
                            height={113}
                        />
                    </Line>
                    <Line margin={60}>
                        <Skeleton
                            height={60}
                        />
                    </Line>
                    <Line margin={10}>
                        <Skeleton
                            width={300}
                            height={24}
                        />
                    </Line>
                    <Line margin={10}>
                        <Skeleton
                            width={300}
                            height={24}
                        />
                    </Line>
                    <Line margin={60}>
                        <Skeleton
                            height={60}
                        />
                    </Line>
                    <Line margin={10}>
                        <Skeleton
                            width={300}
                            height={24}
                        />
                    </Line>
                </SkeletonTheme>

            </Container>
        </>

    );
}

const Container = styled.div`
    width: 500px;
    padding: 0 20px;
    margin: 0 auto;
    padding-bottom: 120px;
`;

const Line = styled.div<{margin: number}>`
    margin-top: ${(props) => (`${props.margin}px`)};
`;

export default MypageEditSkeleton;
