import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';

// components
import MainMainVisual from '@components/main/MainVisual';
// import MainPremiumMarket from '@components/main/MainPremiumMarket';
import MainMarketPlace from '@components/main/MainMarketPlace';
// import MainCreativeChallenge from '@components/main/MainCreativeChallenge';
// import MainBannerSection from '@components/main/MainBannerSection';
import MainCategory from '@components/main/MainCategory';
import MainInformation from '@components/main/MainInformation';
import MainNoticeModals from '@components/main/MainNoticeModals';

function Main() {
    const [isNoticeModal, setNoticeModal] = useState<boolean>(false);
    const modalExpire = Date.now() + 21600000 * 4;

    const handleNoticeModal = (action: string) => {
        if (action === 'day') {
            localStorage.setItem('modalExpire', modalExpire.toString());
            setNoticeModal(false);
            return;
        }

        setNoticeModal(false);
    };

    useEffect(() => {
        const getModalExpire = localStorage.getItem('modalExpire');

        if (getModalExpire && Number(getModalExpire) > Date.now()) {
            setNoticeModal(false);
        } else {
            setNoticeModal(true);
        }
    }, []);

    return (
        <>
            {/* 메인 비쥬얼 */}
            <MainMainVisual />

            {/* 프리미엄 마켓 */}
            {/* <MainPremiumMarket /> */}

            <SectionBackground>
                {/* 마켓 플레이스 */}
                <MainMarketPlace />

                {/* 크리에이티브 챌린지 */}
                {/* <MainCreativeChallenge /> */}

                {/* 베너영역 */}
                {/* <MainBannerSection /> */}

                {/* 카테고리 */}
                <MainCategory />

                {/* 사용방법 */}
                <MainInformation />
            </SectionBackground>

            {isNoticeModal && <MainNoticeModals handleNoticeModal={handleNoticeModal} />}
        </>
    );
}

const SectionBackground = styled.div`
    background-color: ${colors.White100};
    padding-top: 60px;
    margin: 0 auto;
`;

export default Main;
