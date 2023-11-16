/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled/macro';
import { useForm } from 'react-hook-form';
import { colors } from '@styles/ui_palette';
import { Axios, getSignResult } from '@utils/api';
import { Store } from 'react-notifications-component';
import { IProfileInfo } from '@interface/mypage';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { recover, encrypt } from '@utils/help';
import { useTranslation } from 'react-i18next';
import { useRecoilValue, useRecoilState } from 'recoil';
import { prepare } from 'klip-sdk';
import { rgba } from 'emotion-rgba';

// recoil
import { UserAddress, KlipKey } from '@recoil/auth';

// Components
import CreateEditForm from '@components/myPage/edit/CreateEditForm';
import MypageEditSkeleton from '@components/common/ui/MypageEditSkeleton';

type ProfileEditData = {
    user_name: string;
    user_email: string;
    user_bio: string;
    m_rec_gb: boolean;
    user_site: string;
    user_twitter: string;
    user_discord: string;
    user_instagram: string;
    user_medium: string;
    user_telegram: string;
    shipping_addr: string | null;
    shipping_addr2: string | null;
    shipping_name: string | null;
    phone_num: string | null;
    zip_code: string | null;
    adult: number;
    birth: string | null;
    foreigner: number;
    gender: number;
    name: string | null;
    imp_unique_key: string | null;
};

function ProfileEdit() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = searchParams.get('location');
    const isLogin = Boolean(searchParams.get('login'));
    const userAddress = useRecoilValue(UserAddress);
    const [profileInfo, setProfileInfo] = useState<IProfileInfo | null>(null);
    const [, setRequestKey] = useRecoilState<string>(KlipKey);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { isValid, errors },
    } = useForm<ProfileEditData>({
        mode: 'onChange',
        defaultValues: {
            user_site: '',
            user_twitter: '',
            user_discord: '',
            user_instagram: '',
            user_medium: '',
            user_telegram: '',
            shipping_addr: null,
            shipping_addr2: null,
            shipping_name: null,
            phone_num: null,
            zip_code: null,
            m_rec_gb: true,
        },
    });

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    const onSubmit = async (data: ProfileEditData) => {
        const token = `Bearer ${localStorage.getItem('token')}` || '';

        if (!localStorage.getItem('token')) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.notiTitle'),
                message: t('Notification.loginNoti'),
                type: 'default',
                container: 'top-left',
                insert: 'top',
            });
            // window.location.assign(`/login?location=${window.location.pathname}`);
            return;
        }
        const reseponse = await prepare.signMessage({
            bappName: 'TanTan',
            value: 'ChUserInfo',
        });

        if (reseponse.request_key && reseponse.request_key !== '') {
            setRequestKey(reseponse.request_key);
            const timerId = setInterval(async () => {
                try {
                    const { data: signData } = await getSignResult(reseponse.request_key);

                    if (signData.result) {
                        const { signature } = signData.result;
                        const getRecover = await recover(
                            'ChUserInfo',
                            signature,
                            userAddress.address
                        );
                        const recoverPrams = encrypt(
                            getRecover,
                            process.env.REACT_APP_SIGNATURE_KEY
                        );
                        const formData = new FormData();

                        if (profileInfo) {
                            if (data.user_name !== profileInfo.profileInfo.user_name) {
                                formData.append('user_name', data.user_name);
                            }

                            if (data.user_email !== profileInfo.profileInfo.user_email) {
                                formData.append('user_email', data.user_email);
                            }

                            const marketing = data.m_rec_gb ? 2 : 1;

                            formData.append('m_rec_gb', marketing.toString());

                            formData.append('wallet_address', profileInfo.wallet_address);
                            formData.append('blockchain', 'klaytn');
                            formData.append('signature', signature);
                            formData.append('signature_param', recoverPrams);
                            formData.append('user_bio', data.user_bio);
                            formData.append('user_site', data.user_site);
                            formData.append('user_twitter', data.user_twitter);
                            formData.append('user_discord', data.user_discord);
                            formData.append('user_instagram', data.user_instagram);
                            formData.append('user_medium', data.user_medium);
                            formData.append('user_telegram', data.user_telegram);
                            formData.append(
                                'shipping_addr',
                                data.shipping_addr ? data.shipping_addr : ''
                            );
                            formData.append(
                                'shipping_addr2',
                                data.shipping_addr2 ? data.shipping_addr2 : ''
                            );
                            formData.append(
                                'shipping_name',
                                data.shipping_name ? data.shipping_name : ''
                            );
                            formData.append('phone_num', data.phone_num ? data.phone_num : '');
                            formData.append('zip_code', data.zip_code ? data.zip_code : '');
                            formData.append('message', 'ChUserInfo');

                            formData.append('adult', data.adult ? data.adult.toString() : '');
                            formData.append('birth', data.birth ? data.birth : '');
                            formData.append(
                                'foreigner',
                                data.foreigner ? data.foreigner.toString() : ''
                            );
                            formData.append('gender', data.gender ? data.gender.toString() : '');
                            formData.append('name', data.name ? data.name : '');
                            formData.append(
                                'imp_unique_key',
                                data.imp_unique_key ? data.imp_unique_key : ''
                            );
                        }

                        clearInterval(timerId);
                        setRequestKey('');

                        try {
                            const { data } = await Axios('profile', formData, token);

                            if (data && profileInfo) {
                                if (location) {
                                    window.location.assign(location);
                                    return;
                                }

                                window.location.assign(`/mypage/${profileInfo.wallet_address}`);
                            }
                        } catch (error: any) {
                            if (error.response.data.data) {
                                if (error.response.data.data.error === 'email') {
                                    Store.addNotification({
                                        title: t('Notification.errorTitle'),
                                        message: t('Notification.useNotEmail'),
                                        type: 'danger',
                                        insert: 'top',
                                        container: 'top-left',
                                        animationIn: ['animate__animated', 'animate__fadeIn'],
                                        animationOut: ['animate__animated', 'animate__fadeOut'],
                                        dismiss: {
                                            duration: 5000,
                                        },
                                    });

                                    setValue('user_email', '', { shouldValidate: true });
                                    return;
                                }

                                if (error.response.data.data.error === 'name') {
                                    Store.addNotification({
                                        title: t('Notification.errorTitle'),
                                        message: t('Notification.useNotName'),
                                        type: 'danger',
                                        insert: 'top',
                                        container: 'top-left',
                                        animationIn: ['animate__animated', 'animate__fadeIn'],
                                        animationOut: ['animate__animated', 'animate__fadeOut'],
                                        dismiss: {
                                            duration: 5000,
                                        },
                                    });
                                    setValue('user_name', '', { shouldValidate: true });
                                    return;
                                }
                            }

                            Store.addNotification({
                                title: t('Notification.errorTitle'),
                                message: t('Notification.profileFail'),
                                type: 'danger',
                                insert: 'top',
                                container: 'top-left',
                                animationIn: ['animate__animated', 'animate__fadeIn'],
                                animationOut: ['animate__animated', 'animate__fadeOut'],
                                dismiss: {
                                    duration: 5000,
                                },
                            });
                        }
                    }
                } catch (error) {
                    Store.addNotification({
                        ...notiOption,
                        title: t('Notification.errorTitle'),
                        message: t('Notification.cancelSign'),
                        type: 'danger',
                        container: 'top-left',
                        insert: 'top',
                    });
                    setRequestKey('');
                    clearInterval(timerId);
                }
            }, 1000);
        }
    };

    const getProfileInfo = useCallback(async () => {
        const token = `Bearer ${localStorage.getItem('token')}` || '';

        if (!localStorage.getItem('token')) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.notiTitle'),
                message: t('Notification.loginNoti'),
                type: 'default',
                container: 'top-left',
                insert: 'top',
            });
            window.location.assign(`/login?location=${window.location.pathname}`);
            return;
        }
        const getLocalStorage = localStorage.getItem('loginState') || null;

        if (!token || !getLocalStorage) {
            Store.addNotification({
                title: t('Notification.errorTitle'),
                message: t('Notification.loginNoti'),
                type: 'danger',
                insert: 'top',
                container: 'top-left',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                    duration: 5000,
                },
            });

            window.location.assign(`/login?location=${window.location.pathname}`);
            return;
        }
        try {
            const { data } = await Axios('profileinfo', getLocalStorage, token);

            setProfileInfo(data);
        } catch (error) {
            setProfileInfo(null);

            Store.addNotification({
                title: t('Notification.errorTitle'),
                message: t('Notification.notFoundUserInfo'),
                type: 'danger',
                insert: 'top',
                container: 'top-left',
                animationIn: ['animate__animated', 'animate__fadeIn'],
                animationOut: ['animate__animated', 'animate__fadeOut'],
                dismiss: {
                    duration: 5000,
                },
            });
        }
    }, []);

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const token = `Bearer ${localStorage.getItem('token')}` || '';

        if (!localStorage.getItem('token')) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.notiTitle'),
                message: t('Notification.loginNoti'),
                type: 'default',
                container: 'top-left',
                insert: 'top',
            });
            window.location.assign(`/login?location=${window.location.pathname}`);
            return;
        }
        const target = event.target as HTMLInputElement;
        const { files } = target;
        const maxSize = 10 * 1024 * 1024; // 100MB

        // 업로드가 잘못 되어 데이터가 없을때
        if (!files) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.tryMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        const filesData = files[0];
        const imageType = ['image/jpeg', 'image/png'];

        // 업로드 취소
        if (!filesData) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.tryMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        // JPG, PNG, GIF, SVG 형식 체크
        if (!imageType.includes(filesData.type)) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.profileUploadMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        // 파일 사이즈 체크
        if (filesData.size > maxSize) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.profileFileuploadSize'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        const reseponse = await prepare.signMessage({
            bappName: 'TanTan',
            value: 'ChProfile',
        });

        if (reseponse.request_key && reseponse.request_key !== '') {
            setRequestKey(reseponse.request_key);
            const timerId = setInterval(async () => {
                try {
                    const { data } = await getSignResult(reseponse.request_key);

                    if (data.result) {
                        const formData = new FormData();
                        const { signature } = data.result;
                        const getRecover = await recover(
                            'ChProfile',
                            signature,
                            userAddress.address
                        );
                        const recoverPrams = encrypt(
                            getRecover,
                            process.env.REACT_APP_SIGNATURE_KEY
                        );

                        formData.append('wallet_address', userAddress.address);
                        formData.append('blockchain', 'klaytn');
                        formData.append('signature', signature);
                        formData.append('signature_param', recoverPrams);
                        formData.append('signature_salt', recoverPrams.salt.toString());
                        formData.append('signature_iv', recoverPrams.iv.toString());
                        formData.append('message', 'ChProfile');
                        formData.append('image_profile', filesData);

                        clearInterval(timerId);
                        setRequestKey('');

                        try {
                            const { success } = await Axios('profile-image', formData, token);

                            if (success) {
                                window.location.reload();
                            }
                        } catch (error) {
                            setRequestKey('');
                            clearInterval(timerId);
                            Store.addNotification({
                                ...notiOption,
                                title: t('Notification.errorTitle'),
                                message: t('Notification.tryProfileUpdate'),
                                type: 'danger',
                                container: 'top-left',
                                insert: 'top',
                            });
                        }
                    }
                } catch (error) {
                    Store.addNotification({
                        ...notiOption,
                        title: t('Notification.errorTitle'),
                        message: t('Notification.cancelSign'),
                        type: 'danger',
                        container: 'top-left',
                        insert: 'top',
                    });
                    clearInterval(timerId);
                    setRequestKey('');
                }
            }, 1000);
        }
    };

    const onChangeBanner = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const token = `Bearer ${localStorage.getItem('token')}` || '';

        if (!localStorage.getItem('token')) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.notiTitle'),
                message: t('Notification.loginNoti'),
                type: 'default',
                container: 'top-left',
                insert: 'top',
            });
            window.location.assign(`/login?location=${window.location.pathname}`);
            return;
        }
        const target = event.target as HTMLInputElement;
        const { files } = target;
        const maxSize = 10 * 1024 * 1024; // 10MB

        // 업로드가 잘못 되어 데이터가 없을때
        if (!files) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.tryMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        const filesData = files[0];
        const imageType = ['image/jpeg', 'image/png'];

        // 업로드 취소
        if (!filesData) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.tryMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        // JPG, PNG, GIF, SVG 형식 체크
        if (!imageType.includes(filesData.type)) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.profileUploadMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        // 파일 사이즈 체크
        if (filesData.size > maxSize) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.profileFileuploadSize'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        const reseponse = await prepare.signMessage({
            bappName: 'TanTan',
            value: 'ChUserBanner',
        });

        if (reseponse.request_key && reseponse.request_key !== '') {
            setRequestKey(reseponse.request_key);
            const timerId = setInterval(async () => {
                try {
                    const { data: signData } = await getSignResult(reseponse.request_key);

                    if (signData.result) {
                        const { signature } = signData.result;
                        const getRecover = await recover(
                            'ChUserBanner',
                            signature,
                            userAddress.address
                        );
                        const recoverPrams = encrypt(
                            getRecover,
                            process.env.REACT_APP_SIGNATURE_KEY
                        );
                        const formData = new FormData();

                        formData.append('wallet_address', userAddress.address);
                        formData.append('blockchain', 'klaytn');
                        formData.append('signature', signature);
                        formData.append('signature_param', recoverPrams);
                        formData.append('signature_salt', recoverPrams.salt.toString());
                        formData.append('signature_iv', recoverPrams.iv.toString());
                        formData.append('message', 'ChUserBanner');
                        formData.append('image_banner', filesData);

                        clearInterval(timerId);
                        setRequestKey('');

                        try {
                            const { success } = await Axios('profile-banner', formData, token);

                            if (success) {
                                window.location.reload();
                            }
                        } catch (error) {
                            setRequestKey('');
                            clearInterval(timerId);
                            Store.addNotification({
                                ...notiOption,
                                title: t('Notification.errorTitle'),
                                message: t('Notification.tryProfileUpdate'),
                                type: 'danger',
                                container: 'top-left',
                                insert: 'top',
                            });
                        }
                    }
                } catch (error) {
                    Store.addNotification({
                        ...notiOption,
                        title: t('Notification.errorTitle'),
                        message: t('Notification.cancelSign'),
                        type: 'danger',
                        container: 'top-left',
                        insert: 'top',
                    });
                    setRequestKey('');
                    clearInterval(timerId);
                }
            }, 1000);
        }
    };

    useEffect(() => {
        getProfileInfo();
    }, [getProfileInfo]);

    useEffect(() => {
        if (profileInfo) {
            setValue('user_name', profileInfo.profileInfo.user_name, { shouldValidate: true });
            setValue('user_email', profileInfo.profileInfo.user_email || '', {
                shouldValidate: true,
            });
            setValue('user_bio', profileInfo.profileInfo.user_bio || '', { shouldValidate: true });

            setValue('shipping_addr', profileInfo.profileInfo.shipping_addr || '', {
                shouldValidate: true,
            });
            setValue('shipping_addr2', profileInfo.profileInfo.shipping_addr2 || '', {
                shouldValidate: true,
            });
            setValue('shipping_name', profileInfo.profileInfo.shipping_name || '', {
                shouldValidate: true,
            });
            setValue('phone_num', profileInfo.profileInfo.phone_num || '', {
                shouldValidate: true,
            });
            setValue('zip_code', profileInfo.profileInfo.zip_code || '', { shouldValidate: true });

            setValue('adult', Number(profileInfo.profileInfo.adult) || 0, { shouldValidate: true });
            setValue('birth', profileInfo.profileInfo.birth || '', { shouldValidate: true });
            setValue('foreigner', Number(profileInfo.profileInfo.foreigner) || 0, {
                shouldValidate: true,
            });
            setValue('gender', Number(profileInfo.profileInfo.gender) || 0, {
                shouldValidate: true,
            });
            setValue('name', profileInfo.profileInfo.name || '', { shouldValidate: true });
            setValue('imp_unique_key', profileInfo.profileInfo.imp_unique_key || '', {
                shouldValidate: true,
            });

            if (profileInfo.profileInfo.m_rec_gb === 1 || profileInfo.profileInfo.m_rec_gb === 2) {
                const getValue = profileInfo.profileInfo.m_rec_gb === 2;
                setValue('m_rec_gb', getValue, { shouldValidate: true });
            }
        }
    }, [profileInfo]);

    return (
        <>
            {profileInfo && (
                <ProfileBanner
                    banner={
                        profileInfo.profileInfo.image_banner || '/img/myPage/img_default_banner.png'
                    }
                >
                    <ProfileBannerContainer>
                        <BannerImageBox>
                            <BannerImageUpload>
                                배너이미지 등록
                                <InputFileuploadBanner
                                    id="userProfile"
                                    type="file"
                                    name="file"
                                    onChange={onChangeBanner}
                                />
                            </BannerImageUpload>
                            <BannerInfoText>
                                권장 사이즈: 1920px * 220px (10MB 이하 JPG, PNG)
                            </BannerInfoText>
                        </BannerImageBox>
                    </ProfileBannerContainer>
                </ProfileBanner>
            )}
            {profileInfo && (
                <Container>
                    <EditTitle>{t('ProfileEdit.creatorFormTitle')}</EditTitle>
                    <CreatorProfile>
                        <ProfileImageUpload>
                            <ProfileRound>
                                <Images
                                    src={
                                        profileInfo.profileInfo.image_profile ||
                                        '/img/common/img_default_profile.png'
                                    }
                                    alt="프로필 이미지"
                                />
                                <InputFileupload
                                    id="userProfile"
                                    type="file"
                                    name="file"
                                    onChange={onChange}
                                />
                                <ProfileHover>{t('MyPage.changeProfile')}</ProfileHover>
                            </ProfileRound>
                            <ProfileImageBox>
                                <ProfileIcon src="/img/myPage/ic_fileupload.svg" />
                            </ProfileImageBox>
                        </ProfileImageUpload>
                    </CreatorProfile>
                    <ProfileUploadInfo>
                        <ProfileTitle>프로필 이미지 등록</ProfileTitle>
                        <ProfileInfoText>권장 사이즈: 10MB 이하 JPG, PNG </ProfileInfoText>
                    </ProfileUploadInfo>
                    <ProfileEditContainer onSubmit={handleSubmit(onSubmit)}>
                        <ContentsWrap>
                            {/* 폼 양식 */}
                            <CreateEditForm
                                register={register}
                                errors={errors}
                                setValue={setValue}
                                getValues={getValues}
                                watch={watch}
                                profileInfo={profileInfo}
                            />

                            <ButtonGroup>
                                {!isLogin && (
                                    <CancelButton
                                        onClick={() =>
                                            navigate(`/mypage/${profileInfo.wallet_address}`)
                                        }
                                    >
                                        {t('ProfileEdit.editCancel')}
                                    </CancelButton>
                                )}

                                <Submit
                                    type="submit"
                                    value={t('ProfileEdit.editComplte')}
                                    disabled={!isValid}
                                />
                            </ButtonGroup>
                        </ContentsWrap>
                    </ProfileEditContainer>
                </Container>
            )}
            {!profileInfo && <MypageEditSkeleton />}
        </>
    );
}

const ProfileBanner = styled.div<{ banner: string }>`
    border-bottom: 1px solid ${rgba(colors.Black200, 0.1)};
    background-image: url(${(props) => props.banner});
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
`;

const ProfileBannerContainer = styled.div`
    width: 1280px;
    height: 220px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 500px;
    margin: 0 auto;
`;

const EditTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    color: ${colors.Black100};
    text-align: center;
    margin-top: 40px;
`;

const ProfileEditContainer = styled.form``;

const ContentsWrap = styled.div`
    width: 500px;
    padding-top: 50px;
    padding-bottom: 120px;
`;

const Submit = styled.input`
    flex: 1;
    height: 58px;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background-color: ${colors.Black200};
    color: ${colors.White100};
    cursor: pointer;

    &:disabled {
        background-color: ${colors.BlueGray300};
        color: ${colors.BlueGray500};
        cursor: not-allowed;
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 24px;
`;

const CancelButton = styled.div`
    width: 190px;
    height: 58px;
    background-color: ${colors.White100};
    border: 1px solid ${colors.BlueGray500};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: ${colors.Black100};
    border-radius: 8px;
    cursor: pointer;
    margin-right: 20px;

    &:hover {
        background-color: ${colors.BlueGray300};
    }
`;

const BannerImageBox = styled.div``;

const BannerImageUpload = styled.div`
    width: 190px;
    height: 58px;
    border: 1px solid ${rgba(colors.White100, 0.5)};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin: 0 auto;
    background-color: transparent;
    color: ${colors.White100};
    transition: all 0.2s ease;
    font-size: 16px;
    position: relative;

    &:hover {
        transition: all 0.2s ease;
        background-color: ${rgba(colors.White100, 0.1)};
    }
`;

const InputFileuploadBanner = styled.input`
    opacity: 0;
    width: 190px;
    height: 58px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
`;

const BannerInfoText = styled.div`
    margin-top: 14px;
    font-size: 13px;
    color: ${colors.BlueGray700};
`;

const InputFileupload = styled.input`
    opacity: 0;
    width: 122px;
    height: 122px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
`;

const ProfileHover = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-color: ${rgba(colors.Black100, 0.9)};
    color: ${colors.White100};
    display: none;
    align-items: center;
    justify-content: center;
    transition: all 0.4s ease;
    font-size: 13px;
    text-decoration: underline;
    cursor: pointer;
`;

const ProfileImageUpload = styled.label`
    position: relative;

    &:hover {
        ${ProfileHover} {
            display: flex;
            transition: all 0.4s ease;
        }
    }
`;

const ProfileRound = styled.div`
    width: 128px;
    height: 128px;
    border-radius: 50%;
    border: 3px solid ${colors.White100};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: ${colors.Black200};
`;

const ProfileImageBox = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 50%;
    background-color: ${colors.White100};
    position: absolute;
    right: -5px;
    bottom: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ProfileIcon = styled('img')`
    width: 20px;
`;

const CreatorProfile = styled.div`
    width: 122px;
    margin: 0 auto;
    margin-top: 20px;
`;

const Images = styled('img')`
    width: 122px;
    height: 122px;
    object-fit: cover;
`;

const ProfileUploadInfo = styled.div`
    margin-top: 14px;
    text-align: center;
`;

const ProfileTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    font-weight: 500;
`;

const ProfileInfoText = styled.div`
    margin-top: 4px;
    font-size: 13px;
    color: ${colors.BlueGray700};
`;

export default ProfileEdit;
