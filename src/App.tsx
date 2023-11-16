import React, { useMemo, useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import { Route, Routes, useLocation } from 'react-router-dom';

import Layouts from '@components/layout/Layouts';
// import Home from '@pages/Home';
import Main from '@pages/Main';
import About from '@pages/About';
import Create from '@pages/Create';
import ChallengeCreate from '@pages/ChallengeCreate';
import Guide from '@pages/Guide';
import Login from '@pages/Login';
import Join from '@pages/Join';
import Swap from '@pages/Swap';
import Marketplace from '@pages/Marketplace';
import CreativeChallenge from '@pages/CreativeChallenge';
import PremiumMarket from '@pages/PremiumMarket';
import OrderComplete from '@pages/OrderComplete';
import CreativeChallengeComplete from '@pages/CreativeChallengeComplete';
import TossPaymentsComplete from '@pages/TossPaymentsComplete';
import Error404 from '@pages/404';
import MarketDetail from '@pages/MarketDetail';
import CreativeChallengeDetail from '@pages/CreativeChallengeDetail';
import Mypage from '@pages/Mypage';
import PremiumMarketDetail from '@pages/PremiumMarketDetail';
import MypageEdit from '@pages/MypageEdit';
import MarketSale from '@pages/MarketSale';

import { I18nextProvider } from 'react-i18next';
import { isMobile } from 'react-device-detect';
import { createI18n } from './locales/i18n';

declare global {
    interface Window {
        IMP: any;
    }
}

function App() {
    const i18n = useMemo(() => createI18n({ locale: 'ko' }), []);
    const location = useLocation();

    useEffect(() => {
        document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        if (isMobile && window.location.hostname !== 'localhost') {
            window.location.assign(`//m.${window.location.host}`);
        }
    }, []);

    return (
        <RecoilRoot>
            <I18nextProvider i18n={i18n}>
                <Routes>
                    <Route element={<Layouts />}>
                        <Route path="/" element={<Main />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/create" element={<Create />} />
                        <Route path="/challenge-create" element={<ChallengeCreate />} />
                        <Route path="/guide" element={<Guide />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/join" element={<Join />} />
                        <Route path="/swap" element={<Swap />} />
                        <Route path="/marketplace" element={<Marketplace />} />
                        <Route path="/premium-market" element={<PremiumMarket />} />
                        <Route path="/creative-challenge" element={<CreativeChallenge />} />
                        <Route
                            path="/premium-market/:wallert_address"
                            element={<PremiumMarketDetail />}
                        />
                        <Route path="/toss-payments-complete" element={<TossPaymentsComplete />} />
                        <Route
                            path="/creative-challenge-complete"
                            element={<CreativeChallengeComplete />}
                        />
                        <Route path="/order-complete" element={<OrderComplete />} />
                        <Route path="/marketplace/:contract/:tokenId" element={<MarketDetail />} />
                        <Route
                            path="/creative-challenge/:tokenId"
                            element={<CreativeChallengeDetail />}
                        />
                        <Route path="/mypage/:wallert_address" element={<Mypage />} />
                        <Route path="/mypage/edit" element={<MypageEdit />} />
                        <Route path="/market-sale/:contract/:tokenId" element={<MarketSale />} />

                        <Route path="/*" element={<Error404 />} />
                    </Route>
                </Routes>
            </I18nextProvider>
        </RecoilRoot>
    );
}

export default App;
