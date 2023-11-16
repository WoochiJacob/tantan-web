import React from 'react';

// components
import AboutMainVisual from '@components/about/AboutMainVisual';
import AboutDropMarket from '@components/about/AboutDropMarket';
import AboutDenassanceInfo from '@components/about/AboutDenassanceInfo';
import AboutStep1 from '@components/about/AboutStep1';
import AboutStep2 from '@components/about/AboutStep2';
import AboutStep3 from '@components/about/AboutStep3';
import AboutLoadmap from '@components/about/AboutLoadmap';
import AboutInformation from '@components/about/AboutInformation';
import AboutComunity from '@components/about/AboutComunity';
import AboutComplete from '@components/about/AboutComplete';

function About() {
    return (
        <>
            {/* 메인 비쥬얼 */}
            <AboutMainVisual />

            {/* 탄탄이란 무엇인가 */}
            <AboutDenassanceInfo />

            {/* 드랍 마켓 프리미엄 */}
            <AboutDropMarket />

            {/* setp1 */}
            <AboutStep1 />

            {/* setp2 */}
            <AboutStep2 />

            {/* setp3 */}
            <AboutStep3 />

            {/* 사용방법 */}
            <AboutInformation />

            {/* 로드맵 */}
            <AboutLoadmap />

            {/* 커뮤니티 */}
            <AboutComunity />

            {/* Complete */}
            <AboutComplete />
        </>
    );
}

export default About;
