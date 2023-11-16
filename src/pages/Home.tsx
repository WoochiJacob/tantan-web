import React from 'react';
import styled from '@emotion/styled/macro';

// components
import HomeMain from '@components/home/HomeMain';
import HomeMainSlideBanner from '@components/home/HomeMainSlideBanner';
import HomeMarketList from '@components/home/HomeMarketList';
import HomeConutInformation from '@components/home/HomeConutInformation';
import HomeConutExciting from '@components/home/HomeConutExciting';

function Home() {
    return (
        <>
            <Container>
                <HeroSection>
                    <HomeMain />
                    <HomeMainSlideBanner />
                </HeroSection>

                <HomeMarketList />

            </Container>

            <HomeConutInformation />

            <HomeConutExciting />
        </>
    );
}

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
    padding-top: 40px;
    padding-bottom: 72px;
`;

const HeroSection = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 40px;
`;

export default Home;
