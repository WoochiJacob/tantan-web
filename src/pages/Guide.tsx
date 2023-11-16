import React from 'react';

// Components
import GuideMain from '@components/guide/GuideMain';
import GuideMetamask from '@components/guide/GuideMetamask';
import GuideCreateInfo from '@components/guide/GuideCreateInfo';
import GuideCreat from '@components/guide/GuideCreat';
import GuideInput from '@components/guide/GuideInput';
import GuideCheck from '@components/guide/GuideCheck';
import GuideCheckModal from '@components/guide/GuideCheckModal';
import GuideSignModal from '@components/guide/GuideSignModal';
import GuideKlipCertify from '@components/guide/GuideKlipCertify';
import GuideComplete from '@components/guide/GuideComplete';

function Guide() {
    return (
        <>
            {/* STEP 1 */}
            <GuideMain />

            {/* STEP 2 */}
            <GuideMetamask />

            {/* STEP 3 */}
            <GuideCreateInfo />

            {/* STEP 4 */}
            <GuideCreat />

            {/* STEP 5 */}
            <GuideInput />

            {/* STEP 6 */}
            <GuideCheckModal />

            {/* STEP 7 */}
            <GuideSignModal />

            {/* STEP 8 */}
            <GuideKlipCertify />

            {/* STEP 9 */}
            <GuideCheck />

            {/* Complete */}
            <GuideComplete />
        </>
    );
}

export default Guide;
