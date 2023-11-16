import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import 'react-loading-skeleton/dist/skeleton.css';

function HistorySkeleton() {
    return (
        <Container>

            <SkeletonTheme
                baseColor={colors.BlueGray400}
                highlightColor={colors.BlueGray300}
            >
                <Box>
                    <Skeleton
                        height={30}
                    />
                </Box>

                <Box>
                    <Skeleton
                        height={30}
                    />
                </Box>

                <Box>
                    <Skeleton
                        height={30}
                    />
                </Box>

                <Box>
                    <Skeleton
                        height={30}
                    />
                </Box>

                <Box>
                    <Skeleton
                        height={30}
                    />
                </Box>

                <Box>
                    <Skeleton
                        height={30}
                    />
                </Box>

                <Box>
                    <Skeleton
                        height={30}
                    />
                </Box>

                <Box>
                    <Skeleton
                        height={30}
                    />
                </Box>

            </SkeletonTheme>

        </Container>

    );
}
const Container = styled.div`
    padding: 15px;
`;

const Box = styled.div`
    margin: 15px 0;
`;

export default HistorySkeleton;
