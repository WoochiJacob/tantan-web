import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
// import { colors } from '@styles/ui_palette';
import { colors } from '@styles/ui_palette';
import { Axios } from '@utils/api';
import { Store } from 'react-notifications-component';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import CardSkeleton from '@components/common/ui/CardSkeleton';
import { IBasicCard } from '@interface/common';
import CreativeChallengeCard from '@components/common/CreativeChallengeCard';

interface IDetailInformation {
    creatorAddress: string;
    tokenId: number;
}

function AssestsInfomation({
    creatorAddress, tokenId,
}: IDetailInformation) {
    const { t } = useTranslation();
    const [nfts, setNft] = useState<IBasicCard[]>([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const loadCategory = async () => {
        await setLoaded(false);
        setNft([]);

        const formData = new FormData();
        formData.append('address', creatorAddress);
        formData.append('co_gb', 'challenge');

        try {
            const { data, success } = await Axios('coassetdetail', formData);

            setLoaded(true);
            if (success && data !== '') {
                const getData: IBasicCard[] | null = Object.values(data.coassetlist_data) || null;
                if (getData) {
                    const marketList = getData.filter((market) => market.asset_id !== tokenId);
                    const marketListUnit = marketList.slice(0, 4);

                    setNft(marketListUnit);
                }
            }
        } catch (error) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundList'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
        }
    };

    useEffect(() => {
        loadCategory();
    }, []);

    return (
        <Container>
            {nfts.length > 0 && (
                <CreatorOther>
                    <Title>
                        {t('AssetsDetail.creatorOtherAssets')}
                        <CreatorMoreBtn
                            onClick={() => navigate(`/premium-market/${creatorAddress}?tab=challenge&page=1`)}
                        >
                            {t('AssetsDetail.moreButton')}
                        </CreatorMoreBtn>
                    </Title>

                    {loaded && (
                        <CreateOtherGroup>
                            {nfts.map((card: IBasicCard) => (
                                <CreativeChallengeCard
                                    key={card.asset_id}
                                    card={card}
                                    size={4}
                                />
                            ))}
                        </CreateOtherGroup>
                    )}

                    {!loaded && (
                        <>
                            <CardSkeletonWrap>
                                <CardSkeleton />
                            </CardSkeletonWrap>
                            <CardSkeletonWrap>
                                <CardSkeleton />
                            </CardSkeletonWrap>
                        </>
                    )}
                </CreatorOther>
            )}
        </Container>
    );
}

const Container = styled.div`
    width: 1280px;
    margin: 60px auto 180px auto;
    padding: 0 20px;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const CardSkeletonWrap = styled.div`
    margin-top: 18px;
`;

const CreatorOther = styled.div`
    margin-top: 80px;
`;

const CreateOtherGroup = styled.div`
    display: flex;
    margin: 0 -14px;
    margin-top: 18px;
`;

const CreatorMoreBtn = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    cursor: pointer;

    &::after {
        width: 7px;
        height: 14px;
        content: '';
        display: block;
        background-image: url('/img/assets_detail/ic_asset_more.svg');
        margin-left: 4px;
    }

    &:hover {
        text-decoration: underline;
    }
`;

export default AssestsInfomation;
