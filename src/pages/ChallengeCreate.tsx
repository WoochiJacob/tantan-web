import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { prepare } from 'klip-sdk';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Store } from 'react-notifications-component';
import { Axios, getSignResult } from '@utils/api';
import { IAssetsDetail } from '@interface/assets';
import { useChain } from '@utils/interact';
import { useTranslation } from 'react-i18next';

// recoil
import { UserAddress, Chain, KlipKey } from '@recoil/auth';

// Components
import CreateImageFileUpload from '@components/create/CreateImageFileUpload';
import CreateVideoFileUpload from '@components/create/CreateVideoFileUpload';
import CreateDetailImage from '@components/create/CreateDetailImage';
import CreateCheckBox from '@components/common/ui/CreateCheckBox';
import CreateModalContainer from '@components/create/CreateModalContainer';
import ChallengeCreateForm from '@components/challenge-create/ChallengeCreateForm';
import { encrypt, recover } from '@utils/help';

// list Data
interface IlistData {
    category: string;
    contract_address: string;
    creator_address: string;
    expiration_date: number;
    is_display: number;
    is_end: number;
    quantity: number;
    service_fee: number;
    start_at: string;
    supply: number;
    token_id: string;
    token_type: string;
    type_trade: string;
}

type CreateData = {
    category: string;
    name: string;
    file: File | null | number;
    itemdetail_image_file: File | null;
    more_info_file: File | null;
    symbol: string;
    description: string;
    royalty_fee: string;
    external_link: string;
    adult_gb: string;
    notice: boolean;
    policy: boolean;
    token_id: string;
    itemdetail_image_file_gb: number;

    // Default Data
    type: string;
    supply: string;
    network_id: string;
    asset_blockchain: number;
    nft_type: number;
    quantity: number;
};

interface IFileTab {
    name: string;
    active: boolean;
    type: string;
}

interface IAssetUrl {
    url: string | null;
    type: string;
}

function Create() {
    const { t } = useTranslation();
    const userAddress = useRecoilValue(UserAddress);
    const chainId = useRecoilValue(Chain);
    const [searchParams] = useSearchParams();
    const [, setRequestKey] = useRecoilState<string>(KlipKey);
    const [tabType, setTabType] = useState<string>('image');
    const [isFormSave, setFormSave] = useState<boolean>(false);
    const [mintLoading, setMintLoading] = useState({
        addAssets: false,
        minting: false,
    });
    const [submitData, setSubmitData] = useState<CreateData | null>(null);
    const navigate = useNavigate();
    const [detailUrl, setDetailUrl] = useState<string | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);
    const pageType = searchParams.get('type');
    const tokenId = searchParams.get('tokenId');
    const [assetUrl, setAssetUrl] = useState<IAssetUrl>({
        url: null,
        type: '',
    });

    const [fileuploadTab, setFileuploadTab] = useState<IFileTab[]>([
        {
            name: '이미지',
            active: true,
            type: 'image',
        },
        {
            name: '오디오, 영상',
            active: false,
            type: 'video',
        },
    ]);

    const handleLink = (type: string) => {
        const link =
            type === 'notice'
                ? 'https://conuts.zendesk.com/hc/ko/articles/18114045177241-%EB%94%94%EB%84%A4%EC%83%81%EC%8A%A4-%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%B2%98%EB%A6%AC%EB%B0%A9%EC%B9%A8'
                : 'https://conuts.zendesk.com/hc/ko/articles/18114012410393-%EB%94%94%EB%84%A4%EC%83%81%EC%8A%A4-%EC%9D%B4%EC%9A%A9%EC%95%BD%EA%B4%80';

        window.open(link);
    };

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 1000,
        },
    };

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { isValid, errors },
    } = useForm<CreateData>({
        mode: 'onChange',
        defaultValues: {
            symbol: 'KLAY',
            royalty_fee: '10',
            external_link: '',
            supply: '1', // 발행 수량
            nft_type: 1, // 0: 실물 1: 디지털
            more_info_file: null,
            itemdetail_image_file: null,
            adult_gb: '0',
            token_id: '',
            itemdetail_image_file_gb: 0,
        },
    });

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
        await setAssetUrl({
            url: null,
            type: '',
        });

        const target = event.target as HTMLInputElement;
        const { files } = target;
        const maxSize = 20 * 1024 * 1024; // 20MB
        const videomaxSize = 100 * 1024 * 1024; // 100MB

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

        const imageType = ['image/jpeg', 'image/png', 'image/gif'];
        const videoType = [
            'audio/mpeg',
            'audio/ogg',
            'audio/wav',
            'video/ogg',
            'video/mp4',
            'video/webm',
        ];

        if (filesData.name.includes('.jfif')) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.fileuploadMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

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

        await setValue('file', null, { shouldValidate: true });

        // JPG, PNG, GIF, SVG 형식 체크
        if (
            (type === 'image' && !imageType.includes(filesData.type)) ||
            filesData.name.includes('.jfif')
        ) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.fileuploadMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        // MP3 OGG WAV MP4 WEBM 형식 체크
        if (type === 'video' && !videoType.includes(filesData.type)) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.videoFileuploadMessage'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        // 파일 사이즈 체크
        if (type === 'image' && filesData.size > maxSize) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.fileuploadSize'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        // 파일 사이즈 체크
        if (type === 'video' && filesData.size > videomaxSize) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.videoFileuploadSize'),
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
            return;
        }

        const url = URL.createObjectURL(filesData);
        await setValue('file', filesData, { shouldValidate: true });

        setAssetUrl({
            url,
            type: filesData.type,
        });
    };

    const onDetailImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        await setDetailUrl(null);

        const target = event.target as HTMLInputElement;
        const { files } = target;
        const maxSize = 20 * 1024 * 1024; // 10MB

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
        const imageType = ['image/jpeg', 'image/png', 'image/gif'];

        // 업로드가 잘못 되어 데이터가 없을때
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

        await setValue('itemdetail_image_file', null, { shouldValidate: true });
        await setValue('more_info_file', null, { shouldValidate: true });

        // JPG, PNG, GIF, SVG 형식 체크
        if (!imageType.includes(filesData.type) || filesData.name.includes('.jfif')) {
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: t('Notification.fileuploadMessage'),
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

        const url = URL.createObjectURL(filesData);
        await setValue('itemdetail_image_file', filesData, { shouldValidate: true });
        await setValue('more_info_file', filesData, { shouldValidate: true });

        setDetailUrl(url);
    };

    const onSubmit = async (createData: any) => {
        setDisabled(true);

        await setSubmitData(createData);
        Mint(createData);
    };

    const Mint = async (createData: any) => {
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
        const reseponse = await prepare.signMessage({
            bappName: 'TanTan',
            value: pageType === 'edit' ? 'Challenge Modify' : 'Challenge Create',
        });

        if (reseponse.request_key && reseponse.request_key !== '') {
            setRequestKey(reseponse.request_key);
            const timerId = setInterval(async () => {
                try {
                    const { data: signData } = await getSignResult(reseponse.request_key);

                    if (signData.result) {
                        setFormSave(true);

                        const { signature } = signData.result;
                        const getRecover = await recover(
                            pageType === 'edit' ? 'Challenge Modify' : 'Challenge Create',
                            signature,
                            userAddress.address
                        );
                        const recoverPrams = encrypt(
                            getRecover,
                            process.env.REACT_APP_SIGNATURE_KEY
                        );
                        const createFormData = {
                            ...createData,
                            supply: Number(createData.supply.replace(',', '')),
                        };
                        const formData = new FormData();

                        formData.append('wallet_address', userAddress.address);
                        formData.append('blockchain', 'klaytn');
                        formData.append('signature', signature);
                        formData.append('signature_param', recoverPrams);
                        formData.append(
                            'message',
                            pageType === 'edit' ? 'Challenge Modify' : 'Challenge Create'
                        );

                        formData.append('ownership', userAddress.address);
                        formData.append('issuer_nft', userAddress.address);
                        formData.append(
                            'contract_address',
                            process.env.REACT_APP_KLAYTN_SINGLE_CONTRACT_ADDRESS || ''
                        );

                        formData.append('network_id', useChain[chainId].networkName);
                        formData.append('asset_blockchain', useChain[chainId].chainId);

                        formData.append('quantity', createFormData.supply);

                        formData.append('type', createData.supply > 1 ? '1' : '0');

                        if (pageType === 'edit' && tokenId) {
                            formData.append('token_id', tokenId);
                        }

                        Object.keys(createFormData).forEach((key: string) => {
                            formData.append(key, createFormData[key]);
                        });

                        clearInterval(timerId);
                        setRequestKey('');

                        try {
                            const { data, success } = await Axios(
                                pageType === 'edit' ? 'asset_ch_update' : 'addasset_ch_s3',
                                formData,
                                token
                            );

                            setMintLoading({
                                addAssets: true,
                                minting: false,
                            });

                            if (success) {
                                if (pageType === 'edit' && tokenId) {
                                    setMintLoading({
                                        addAssets: true,
                                        minting: true,
                                    });

                                    setTimeout(() => {
                                        navigate(`/creative-challenge-complete?tokenId=${tokenId}`);
                                    }, 3000);

                                    return;
                                }
                                const { resultAsset, resultMetadata } = data;
                                const listData: IlistData = {
                                    contract_address: resultAsset.contract_address,
                                    token_id: resultAsset.token_id,
                                    is_display: 1,
                                    type_trade: '0',
                                    supply: resultAsset.supply,
                                    quantity: resultAsset.quantity,
                                    category: resultAsset.category,
                                    is_end: 0,
                                    service_fee: 2,
                                    start_at: resultMetadata.created_at,
                                    expiration_date: 365,
                                    token_type: resultMetadata.symbol === 'KRW' ? 'krw' : 'klay',
                                    creator_address: resultAsset.creator_address,
                                };
                                onListing(listData, signature);
                            }
                        } catch (error: any) {
                            setRequestKey('');
                            clearInterval(timerId);
                            setDisabled(false);
                            if (error.response.data) {
                                Store.addNotification({
                                    ...notiOption,
                                    title: t('Notification.errorTitle'),
                                    message: error.response.data.message,
                                    type: 'danger',
                                    container: 'top-left',
                                    insert: 'top',
                                });
                                return;
                            }
                        }
                    }
                } catch (error) {
                    setDisabled(false);
                    clearInterval(timerId);
                    Store.addNotification({
                        ...notiOption,
                        title: t('Notification.errorTitle'),
                        message: t('Notification.cancelSign'),
                        type: 'danger',
                        container: 'top-left',
                        insert: 'top',
                    });
                }
            }, 1000);
        }
    };

    const onListing = async (listingData: IlistData, signature: string) => {
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

        const formData = new FormData();
        const getRecover = await recover(
            pageType === 'edit' ? 'Challenge Modify' : 'Challenge Create',
            signature,
            userAddress.address
        );
        const recoverPrams = encrypt(getRecover, process.env.REACT_APP_SIGNATURE_KEY);

        formData.append('wallet_address', userAddress.address);
        formData.append('blockchain', 'klaytn');
        formData.append('signature', signature);
        formData.append('signature_param', recoverPrams);
        formData.append('message', pageType === 'edit' ? 'Challenge Modify' : 'Challenge Create');
        formData.append('order_signature', signature);
        formData.append(
            'order_recipt',
            pageType === 'edit' ? 'Challenge Modify' : 'Challenge Create'
        );
        formData.append('price', '0');
        formData.append('quantity', '0');

        Object.keys(listingData).forEach((key: string) => {
            formData.append(key, listingData[key]);
        });

        try {
            const { success } = await Axios('mint', formData, token);
            const enrollment = await Axios('market-enrollment', formData, token);

            setMintLoading({
                addAssets: true,
                minting: true,
            });

            if (enrollment.success && success) {
                setTimeout(() => {
                    navigate(`/creative-challenge-complete?tokenId=${enrollment.data.asset.id}`);
                }, 3000);
            }
        } catch (error: any) {
            setDisabled(true);
            Store.addNotification({
                ...notiOption,
                title: t('Notification.errorTitle'),
                message: error.response.data.message,
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
        }
    };

    const tabActive = (tab: IFileTab) => {
        if (tabType === tab.type) {
            return;
        }

        const newTabData = fileuploadTab.map((newTab: IFileTab) => {
            const newItem = JSON.parse(JSON.stringify(newTab));

            newItem.active = false;

            if (newItem.type === tab.type) {
                newItem.active = true;
                setTabType(newItem.type);
            }

            return newItem;
        });

        setValue('file', null, { shouldValidate: true });
        setFileuploadTab(newTabData);
        setAssetUrl({
            url: null,
            type: '',
        });
    };

    useEffect(() => {
        setValue('file', getValues('file'), { shouldValidate: true });
    }, [getValues('file')]);

    useEffect(() => {
        setValue('more_info_file', getValues('more_info_file'), { shouldValidate: true });
    }, [getValues('more_info_file')]);

    useEffect(() => {
        if (!userAddress.isCertification) {
            Store.addNotification({
                ...notiOption,
                title: '회원정보 입력',
                message: '판매에 필요한 필수항목을 입력해주세요.',
                type: 'info',
                container: 'top-left',
                insert: 'top',
                dismiss: {
                    duration: 5000,
                },
            });
            navigate(`/mypage/edit?login=true&location=${window.location.pathname}`);
        }
    }, []);

    // NFT 정보 불러오기
    const getAssets = async (id: number) => {
        // api 호출을 위한 정보 가져오기
        const getLocalStorage = localStorage.getItem('loginState');
        try {
            const { data } = await Axios(`assetdetail/${id}`, getLocalStorage);
            const getData: IAssetsDetail[] | null = Object.values(data.assetList_data) || null;

            if (getData) {
                const detailData = getData.filter((_market, index) => index === getData.length - 1);
                const assetDetail = detailData[0];
                await tabActive({
                    name: assetDetail.asset_animation ? '비디오, 영상' : '이미지',
                    active: true,
                    type: assetDetail.asset_animation ? 'video' : 'image',
                });

                setValue('file', 0, { shouldValidate: true });
                setValue('itemdetail_image_file', null, { shouldValidate: true });
                setValue('more_info_file', null, { shouldValidate: true });
                setValue('category', assetDetail.category, { shouldValidate: true });
                setValue('name', assetDetail.asset_name, { shouldValidate: true });
                setValue('description', assetDetail.asset_description, { shouldValidate: true });
                setValue(
                    'external_link',
                    assetDetail.external_link ? assetDetail.external_link : '',
                    { shouldValidate: true }
                );
                setValue('token_id', assetDetail.token_id, { shouldValidate: true });
                setAssetUrl({
                    url: assetDetail.asset_animation
                        ? assetDetail.asset_animation
                        : assetDetail.asset_thumbnail,
                    type: assetDetail.asset_animation ? 'video' : 'image',
                });
                setTabType(assetDetail.asset_animation ? 'video' : 'image');
                console.log(assetDetail.asset_animation);

                setDetailUrl(
                    assetDetail.itemdetail_image_url ? assetDetail.itemdetail_image_url : null
                );
            }
        } catch (error) {
            // 오류 메시지
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
        if (pageType && pageType === 'edit' && tokenId) {
            getAssets(Number(tokenId));
        }
    }, []);

    return (
        <Container>
            <CreateSubTitle>상상은 현실이 된다!</CreateSubTitle>
            <CreateTitle>내 상상 속 아이디어가 히트상품으로!</CreateTitle>
            <UserProfile>
                {/* 프로필 이미지 */}
                <ProfileImage>
                    <Images
                        src={userAddress.image_profile || '/img/common/img_default_profile.png'}
                    />
                </ProfileImage>
                <Username>{userAddress.user_name}</Username>
            </UserProfile>
            <NftFormContainer onSubmit={handleSubmit(onSubmit)}>
                <CreateFileUploadContainer>
                    <FileUploadTab>
                        {fileuploadTab.map((tab: IFileTab) => (
                            <Tab key={tab.type} active={tab.active} onClick={() => tabActive(tab)}>
                                {tab.type === 'image' ? t('Create.imageTab') : t('Create.audioTab')}
                            </Tab>
                        ))}
                    </FileUploadTab>
                    <Title>
                        <span>(필수)</span>
                        썸네일 이미지 등록
                    </Title>

                    {tabType === 'image' && (
                        <CreateImageFileUpload
                            register={register}
                            onChange={onChange}
                            assetUrl={assetUrl}
                            setAssetUrl={setAssetUrl}
                            setValue={setValue}
                        />
                    )}

                    {tabType === 'video' && (
                        <>
                            {/* 오디오 * 비디오 등록 */}
                            <CreateVideoFileUpload
                                onChange={onChange}
                                assetUrl={assetUrl}
                                setAssetUrl={setAssetUrl}
                                setValue={setValue}
                            />
                        </>
                    )}

                    {tabType === 'image' && (
                        <FileUploadNotice>
                            <NoticeBox>
                                <NoticeItems>
                                    썸네일 이미지는 10MB 이하의 JPG, PNG, GIF만 지원합니다.
                                </NoticeItems>
                                <NoticeItems>권장 사이즈: 1200px * 750px</NoticeItems>
                            </NoticeBox>
                        </FileUploadNotice>
                    )}

                    {tabType === 'video' && (
                        <FileUploadNotice>
                            <NoticeBox>
                                <NoticeItems>
                                    영상/오디오는 100MB 이하의 MP4, WEBM, MP3, WAV만 지원합니다.
                                </NoticeItems>
                            </NoticeBox>
                        </FileUploadNotice>
                    )}

                    <CreateDetailImage
                        register={register}
                        onMoreChange={onDetailImageChange}
                        thumbnailUrl={detailUrl}
                        setThumbnailUrl={setDetailUrl}
                        setValue={setValue}
                    />
                </CreateFileUploadContainer>

                {/* 폼 양식 */}
                <FormContainer>
                    <ChallengeCreateForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        watch={watch}
                    />

                    <CheckedBox>
                        <CheckBoxName>
                            <CheckRequired>(필수)</CheckRequired>
                            아이디어 제출 시 필요한 개인정보를 수집 및 이용하는 것에 동의합니다.
                            <CheckBoxDetail onClick={() => handleLink('notice')}>
                                자세히 보기
                            </CheckBoxDetail>
                        </CheckBoxName>
                        <CreateCheckBox
                            register={register}
                            required
                            label="notice"
                            value={getValues('notice')}
                            setValue={setValue}
                        />
                    </CheckedBox>
                    <CheckedBox>
                        <CheckBoxName>
                            <CheckRequired>(필수)</CheckRequired>
                            유의사항을 꼼꼼히 확인하였으며, 이를 준수하는데 동의합니다.
                            <CheckBoxDetail onClick={() => handleLink('policy')}>
                                자세히 보기
                            </CheckBoxDetail>
                        </CheckBoxName>
                        <CreateCheckBox
                            register={register}
                            required
                            label="policy"
                            value={getValues('policy')}
                            setValue={setValue}
                        />
                    </CheckedBox>

                    <Submit type="submit" value="등록하기" disabled={!isValid && !disabled} />
                </FormContainer>
            </NftFormContainer>

            {isFormSave && mintLoading && (
                <CreateModalContainer
                    isFormSave={isFormSave}
                    submitData={submitData}
                    mintLoading={mintLoading}
                    saveTitle="크리에이트 첼린지 등록하기"
                />
            )}
        </Container>
    );
}

const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black200};
    margin-top: 24px;
    margin-bottom: 10px;

    span {
        color: ${colors.Red100};
        margin-right: 4px;
    }
`;

const Container = styled.div`
    width: 1280px;
    padding: 54px 20px 280px 20px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
`;

const CreateFileUploadContainer = styled.div`
    flex-basis: 580px;
`;

const Submit = styled.input`
    margin-bottom: 32px;
    width: 100%;
    height: 58px;
    border: 0;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background-color: ${colors.Black200};
    color: ${colors.White100};
    cursor: pointer;
    margin-top: 24px;

    &:disabled {
        background-color: ${colors.BlueGray300};
        color: ${colors.BlueGray500};
        cursor: not-allowed;
    }
`;

const ProfileImage = styled.div`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-color: ${colors.Black100};
`;

const Images = styled('img')`
    width: 46px;
    height: 46px;
    object-fit: cover;
`;

const CreateSubTitle = styled.div`
    font-size: 16px;
    font-weight: 300;
    color: ${colors.Black100};
`;

const CreateTitle = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: ${colors.Black100};
    margin-top: 8px;
`;

const UserProfile = styled.div`
    display: flex;
    align-items: center;
    margin-top: 24px;
`;

const Username = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    margin-left: 8px;
`;

const NftFormContainer = styled.form`
    display: flex;
    margin-top: 16px;
`;

const FormContainer = styled.div`
    flex-basis: calc(100% - 580px);
    padding-left: 100px;
`;

const FileUploadTab = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 23px;
    border-radius: 8px;
    border: 1px solid ${colors.Black100};
    overflow: hidden;
`;

const Tab = styled.div<{ active: boolean }>`
    flex-basis: 50%;
    height: 58px;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: ${(props) => (props.active ? colors.Black100 : colors.White100)};
    color: ${(props) => (props.active ? colors.White100 : colors.Black100)};
`;

const FileUploadNotice = styled.div`
    margin-top: 10px;
`;

const NoticeBox = styled.div`
    margin-top: 9px;
`;

const NoticeItems = styled.div`
    font-size: 13px;
    color: ${colors.BlueGray700};
    position: relative;
    padding-left: 14px;
    line-height: 1.5;
    margin-bottom: 4px;

    &:last-of-type {
        margin-bottom: 0;
    }

    &::before {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        content: '';
        background-color: ${colors.BlueGray700};
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
    }
`;

const CheckedBox = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const CheckBoxName = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    display: flex;
    /* flex-direction: column; */
`;

const CheckBoxDetail = styled.span`
    margin-left: 12px;
    font-size: 13px;
    color: ${colors.WarmGray500};
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        color: ${colors.Black100};
    }
`;

const CheckRequired = styled.span`
    color: ${colors.Red100};
    font-size: 13px;
    margin-right: 4px;
`;

export default Create;
