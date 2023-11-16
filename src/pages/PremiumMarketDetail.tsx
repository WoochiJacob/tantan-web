import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { useParams } from 'react-router-dom';
import { Axios } from '@utils/api';
import { Store } from 'react-notifications-component';
import { colors } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';

// Components
import CreatorTop from '@components/myPage/CreatorTop';
import CreatorInfo from '@components/myPage/CreatorInfo';
import CreatorSalseAssets from '@components/premium-market/CreatorSalseAssets';
import MypageSkeleton from '@components/common/ui/MypageSkeleton';

// Interface
import { IProfileInfo } from '@interface/mypage';

function PremiumMarketDetail() {
    const { t } = useTranslation();
    const param = useParams();
    const { wallert_address } = param;
    const [userProfile, setProfile] = useState<IProfileInfo | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const loadUserProfile = async () => {
        if (!wallert_address) {
            return;
        }
        const formData = new FormData();

        formData.append('wallet_address', wallert_address.toString());
        formData.append('blockchain', 'klaytn');

        try {
            const { data } = await Axios('profileinfo', formData);

            if (data) {
                setProfile(data);
                setLoaded(true);
            }
        } catch (error) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundUserInfo'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
        }
    };

    useEffect(() => {
        if (wallert_address) {
            loadUserProfile();
        }
    }, [wallert_address]);

    return (
        <>
            {loaded && userProfile && (
                <>
                    <MyPageBanner banner={userProfile.profileInfo.image_banner || '/img/myPage/img_default_banner.png'} />
                    <Container>
                        <CreatorProfile>
                            <ProfileImage>
                                <Images
                                    src={userProfile.profileInfo.image_profile || '/img/common/img_default_profile.png'}
                                    alt="프로필 이미지"
                                />
                            </ProfileImage>
                        </CreatorProfile>
                    </Container>

                </>
            )}

            {loaded && userProfile && (
                <LineContainer>
                    <Lines>
                        {/* 상단 유저정보 */}
                        {wallert_address && (
                            <CreatorTop
                                wallert_address={wallert_address.toString()}
                                userProfile={userProfile}
                            />
                        )}

                        {/* 유저 상세 정보 */}
                        <CreatorInfo userProfile={userProfile} />

                        {/* 서비스 카드 탭 */}
                        {wallert_address && (
                            <CreatorSalseAssets
                                wallert_address={wallert_address.toString()}
                            />
                        )}
                    </Lines>
                </LineContainer>
            )}
            {!loaded && (
                <MypageSkeleton />
            )}
        </>
    );
}

const MyPageBanner = styled.div<{banner: string}>`
    background-image: url(${(props) => (props.banner)});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    height: 220px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    margin-top: 80px;
`;

const Container = styled.div`
    width: 1280px;
    padding: 155px 20px 27px 20px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
`;

const LineContainer = styled.div`
    width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
`;

const Lines = styled.div`
    margin: 0 -40px;
    padding: 0 40px;
    border-left: 1px solid ${colors.BlueGray400};
    padding-bottom: 180px;
`;

const ProfileImage = styled.div`
    width: 122px;
    height: 122px;
    border-radius: 50%;
    border: 3px solid ${colors.White100};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: ${colors.Black200};
`;

const Images = styled('img')`
    width: 122px;
    height: 122px;
    object-fit: cover;
`;

const CreatorProfile = styled.div`
    display: flex;
    justify-content: space-between;
`;

export default PremiumMarketDetail;
