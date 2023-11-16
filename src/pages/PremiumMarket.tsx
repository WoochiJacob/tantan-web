import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import PremiumCard from '@components/common/PremiumCard';
import { Axios } from '@utils/api';
import { IPremiumCard, IPaginationPrams } from '@interface/common';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { useTranslation } from 'react-i18next';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

import CategoryEmpty from '@components/common/CategoryEmpty';
import PageNavigation from '@components/common/ui/PageNavigation';

function PremiumMarket() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [nfts, setNft] = useState<IPremiumCard[]>([]);
    const [pagenationInfo, setPagenationInfo] = useState<IPaginationPrams | null>(null);
    const [pagination, setPagination] = useState<number>(() => 1);
    const [loaded, setLoaded] = useState(false);
    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const handlePageChange = async (page: number) => {
        setPagination(page);
        window.scrollTo(0, 370);

        await navigate(`/premium-market?page=${page}`);

        loadNFTs();
    };

    const loadNFTs = async () => {
        setLoaded(false);
        const formData = new FormData();
        formData.append('vip_gb', '1');

        const getParams = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        if (getParams.page) {
            setPagination(Number(getParams.page));
        }

        try {
            const { data } = await Axios(`vipuserlist?page=${getParams.page ? getParams.page : 1}`, formData);

            if (data) {
                setNft(Object.values(data.userInfo.data));
                setLoaded(true);
                await setPagenationInfo(data.userInfo);
            }
        } catch (error) {
            setLoaded(true);
            setNft([]);
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundMarketList'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
        }
    };

    useEffect(() => {
        loadNFTs();
    }, []);

    return (
        <PremiumContainer>
            <TitleSection />
            <Container>
                <Title>핫한 크리에이터?</Title>
                <SubTitle>
                    탄탄만의 까다로운 기준에 따라 엄선된 크리에이터, 파트너 업체의 상품이 판매되는 공간입니다.
                    <br />
                    핫한 크리에이터에 검증된 가치를 가장 먼저 만나보세요.
                </SubTitle>
                {loaded && nfts.length !== 0 && (
                    <PremiumCardBox>
                        {nfts.map((card: IPremiumCard) => (
                            <PremiumCard
                                key={card.id}
                                card={card}
                                size={3}
                                isMain={false}
                            />
                        ))}
                    </PremiumCardBox>
                )}
            </Container>

            {loaded && nfts.length === 0 && (
                <CategoryEmpty title={t('PremiumMarket.emptyMarket')} />
            )}

            {loaded && pagenationInfo && pagenationInfo.last_page > 1 && (
                <PageNavigation
                    activePage={pagination}
                    itemsCountPerPage={6}
                    totalItemsCount={pagenationInfo.total}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange}
                />
            )}
        </PremiumContainer>
    );
}

const PremiumContainer = styled.div`
    padding-bottom: 222px;
`;

const Container = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
`;

const Title = styled.div`
    margin-top: 24px;
    font-size: 18px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const SubTitle = styled.div`
    margin-top: 4px;
    font-size: 14px;
    font-weight: 400;
    color: ${rgba(colors.Black100, 0.7)};
    line-height: 1.4;
`;

const TitleSection = styled.div`
    background-image: url('/img/premium-market/img_premium_banner.png');
    width: 100%;
    height: 550px;
`;

const PremiumCardBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -17.5px;
    margin-top: 24px;
`;

export default PremiumMarket;
