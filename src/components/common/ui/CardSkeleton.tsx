import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import 'react-loading-skeleton/dist/skeleton.css';

function CardSkeleton() {
    return (
        <Container>
            <Wrapper>
                <CardBox>
                    <CardItem>
                        <SkeletonTheme
                            baseColor={colors.BlueGray400}
                            highlightColor={colors.BlueGray300}
                        >
                            <Images>
                                <Skeleton
                                    height={180}
                                />
                            </Images>
                            <Contents>
                                <ProfileBox>
                                    <Profile>
                                        <Skeleton
                                            circle
                                            width={28}
                                            height={28}
                                        />
                                    </Profile>
                                    <Name>
                                        <Skeleton
                                            width={100}
                                            height={20}
                                        />
                                    </Name>
                                </ProfileBox>
                                <Line>
                                    <Skeleton
                                        height={20}
                                    />
                                </Line>
                                <Line>
                                    <Skeleton
                                        width={150}
                                        height={20}
                                    />
                                </Line>
                            </Contents>
                        </SkeletonTheme>
                    </CardItem>
                </CardBox>
                <CardBox>
                    <CardItem>
                        <SkeletonTheme
                            baseColor={colors.BlueGray400}
                            highlightColor={colors.BlueGray300}
                        >
                            <Images>
                                <Skeleton
                                    height={180}
                                />
                            </Images>
                            <Contents>
                                <ProfileBox>
                                    <Profile>
                                        <Skeleton
                                            circle
                                            width={28}
                                            height={28}
                                        />
                                    </Profile>
                                    <Name>
                                        <Skeleton
                                            width={100}
                                            height={20}
                                        />
                                    </Name>
                                </ProfileBox>
                                <Line>
                                    <Skeleton
                                        height={20}
                                    />
                                </Line>
                                <Line>
                                    <Skeleton
                                        width={150}
                                        height={20}
                                    />
                                </Line>
                            </Contents>
                        </SkeletonTheme>
                    </CardItem>
                </CardBox>
                <CardBox>
                    <CardItem>
                        <SkeletonTheme
                            baseColor={colors.BlueGray400}
                            highlightColor={colors.BlueGray300}
                        >
                            <Images>
                                <Skeleton
                                    height={180}
                                />
                            </Images>
                            <Contents>
                                <ProfileBox>
                                    <Profile>
                                        <Skeleton
                                            circle
                                            width={28}
                                            height={28}
                                        />
                                    </Profile>
                                    <Name>
                                        <Skeleton
                                            width={100}
                                            height={20}
                                        />
                                    </Name>
                                </ProfileBox>
                                <Line>
                                    <Skeleton
                                        height={20}
                                    />
                                </Line>
                                <Line>
                                    <Skeleton
                                        width={150}
                                        height={20}
                                    />
                                </Line>
                            </Contents>
                        </SkeletonTheme>
                    </CardItem>
                </CardBox>
                <CardBox>
                    <CardItem>
                        <SkeletonTheme
                            baseColor={colors.BlueGray400}
                            highlightColor={colors.BlueGray300}
                        >
                            <Images>
                                <Skeleton
                                    height={180}
                                />
                            </Images>
                            <Contents>
                                <ProfileBox>
                                    <Profile>
                                        <Skeleton
                                            circle
                                            width={28}
                                            height={28}
                                        />
                                    </Profile>
                                    <Name>
                                        <Skeleton
                                            width={100}
                                            height={20}
                                        />
                                    </Name>
                                </ProfileBox>
                                <Line>
                                    <Skeleton
                                        height={20}
                                    />
                                </Line>
                                <Line>
                                    <Skeleton
                                        width={150}
                                        height={20}
                                    />
                                </Line>
                            </Contents>
                        </SkeletonTheme>
                    </CardItem>
                </CardBox>
                <CardBox>
                    <CardItem>
                        <SkeletonTheme
                            baseColor={colors.BlueGray400}
                            highlightColor={colors.BlueGray300}
                        >
                            <Images>
                                <Skeleton
                                    height={180}
                                />
                            </Images>
                            <Contents>
                                <ProfileBox>
                                    <Profile>
                                        <Skeleton
                                            circle
                                            width={28}
                                            height={28}
                                        />
                                    </Profile>
                                    <Name>
                                        <Skeleton
                                            width={100}
                                            height={20}
                                        />
                                    </Name>
                                </ProfileBox>
                                <Line>
                                    <Skeleton
                                        height={20}
                                    />
                                </Line>
                                <Line>
                                    <Skeleton
                                        width={150}
                                        height={20}
                                    />
                                </Line>
                            </Contents>
                        </SkeletonTheme>
                    </CardItem>
                </CardBox>

            </Wrapper>
        </Container>

    );
}
const Container = styled.div`
    margin: 0 -14px;
`;

const Wrapper = styled.div`
    display: flex;
`;

const CardBox = styled.div`
    padding: 0 14px;
    flex-basis: 20%;
    border-radius: 12px;
    /* overflow: hidden; */
`;

const CardItem = styled.div`
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.1);
`;

const Images = styled.div``;

const Line = styled.div`
    margin: 2px 0;
`;

const ProfileBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`;

const Profile = styled.div`
    margin-right: 10px;
`;

const Name = styled.div`
`;

const Contents = styled.div`
    /* border: 1px solid ${colors.BlueGray500};
    border-top: 0; */
    height: 112px;
    padding: 12px;
    background-color: ${colors.White100};
`;

export default CardSkeleton;
