import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import 'react-loading-skeleton/dist/skeleton.css';

function ProfileEditSkeleton() {
    return (
        <Container>
            <SkeletonTheme
                baseColor={colors.BlueGray400}
                highlightColor={colors.BlueGray300}
            >
                <Skeleton
                    width={500}
                    height={33}
                />

                <Skeleton
                    width={500}
                    height={33}
                />

                <Skeleton
                    width={500}
                    height={33}
                />
            </SkeletonTheme>
        </Container>

    );
}
const Container = styled.div`
    flex-basis: 50%;
    display: flex;
    justify-content: flex-end;
    padding-right: 120px;
    padding-top: 80px;
`;

export default ProfileEditSkeleton;
