import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { prepare } from 'klip-sdk';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Store } from 'react-notifications-component';
import { Axios, getSignResult, CaverOption } from '@utils/api';
import {
    useChain,
} from '@utils/interact';
import { useTranslation } from 'react-i18next';

// recoil
import { UserAddress, Chain, KlipKey } from '@recoil/auth';

// Components
import CreateImageFileUpload from '@components/create/CreateImageFileUpload';
import CreateVideoFileUpload from '@components/create/CreateVideoFileUpload';
import CreateVideoThumbnail from '@components/create/CreateVideoThumbnail';
import CreateDetailImage from '@components/create/CreateDetailImage';
import CreateModalContainer from '@components/create/CreateModalContainer';

import CreateForm from '@components/create/CreateForm';
import {
    encrypt, recover, getSupplyContractABI,
} from '@utils/help';

const Caver = require('caver-js');

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
    file: File | null;
    itemdetail_image_file: File | null;
    more_info_file: File | null,
    symbol: string;
    description: string;
    royalty_fee: string;
    external_link: string;
    adult_gb: boolean;

    // Default Data
    type: string;
    supply: string;
    network_id: string;
    asset_blockchain: number;
    nft_type: number;
    quantity: number;
}

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
    const caver = new Caver(new Caver.providers.HttpProvider('https://node-api.klaytnapi.com/v1/klaytn', CaverOption));
    const [, setRequestKey] = useRecoilState<string>(KlipKey);
    const [tabType, setTabType] = useState<string>('image');
    const [isRoyalty, setRoyalty] = useState<boolean>(false);
    const [isCategory, setCategory] = useState<boolean>(false);
    const [isBlockChain, setBlockChain] = useState<boolean>(false);
    const [isSupply, setSupply] = useState<boolean>(false);
    const [isFormCheck, setFormCheck] = useState<boolean>(false);
    const [isFormSave, setFormSave] = useState<boolean>(false);
    const [mintLoading, setMintLoading] = useState({
        addAssets: false,
        minting: false,
    });
    const [submitData, setSubmitData] = useState<CreateData | null>(null);
    const navigate = useNavigate();
    const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
    const [detailUrl, setDetailUrl] = useState<string | null>(null);
    const [assetUrl, setAssetUrl] = useState<IAssetUrl>({
        url: null, type: '',
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
    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    const {
        register, control, handleSubmit, setValue, getValues, watch, formState: { isValid, errors },
    } = useForm<CreateData>({
        mode: 'onChange',
        defaultValues: {
            symbol: 'KLAY',
            royalty_fee: '10',
            external_link: '',
            supply: '1', // 발행 수량
            nft_type: 1, // 0: 실물 1: 디지털
        },
    });

    console.log(errors);

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
        const videoType = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'video/ogg', 'video/mp4', 'video/webm'];

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
        if ((type === 'image' && !imageType.includes(filesData.type)) || filesData.name.includes('.jfif')) {
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

    const onMoreChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        await setThumbnailUrl(null);

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
        await setValue('more_info_file', filesData, { shouldValidate: true });

        setThumbnailUrl(url);
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

        setDetailUrl(url);
    };

    const onSubmit = async (createData: any) => {
        if ((chainId && !useChain[chainId]) || (useChain[chainId].symbol !== createData.symbol)) {
            const changeChain = Object.values(useChain).find((chain) => chain.symbol === createData.symbol);

            if (changeChain) {
                return;
            }
        }

        await setSubmitData(createData);
        setFormCheck(true);
    };

    const formCheckCallback = async (action: string) => {
        const setMintData: any = submitData;
        await setFormCheck(false);

        if (action === 'complete') {
            Mint(setMintData);
        }
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
            value: 'Product Create',
        });

        if (reseponse.request_key && reseponse.request_key !== '') {
            setRequestKey(reseponse.request_key);
            const timerId = setInterval(async () => {
                try {
                    const { data: signData } = await getSignResult(reseponse.request_key);

                    if (signData.result) {
                        setFormSave(true);
                        const { signature } = signData.result;
                        const getRecover = await recover('Product Create', signature, userAddress.address);
                        const recoverPrams = encrypt(getRecover, process.env.REACT_APP_SIGNATURE_KEY);
                        const createFormData = {
                            ...createData,
                            supply: Number(createData.supply.replace(',', '')),
                        };
                        const formData = new FormData();

                        formData.append('wallet_address', userAddress.address);
                        formData.append('blockchain', 'klaytn');
                        formData.append('signature', signature);
                        formData.append('signature_param', recoverPrams);
                        formData.append('message', 'Product Create');

                        formData.append('ownership', userAddress.address);
                        formData.append('issuer_nft', userAddress.address);
                        formData.append('contract_address', useChain[chainId].contract);

                        formData.append('network_id', useChain[chainId].networkName);
                        formData.append('asset_blockchain', useChain[chainId].chainId);

                        formData.append('quantity', createFormData.supply);

                        formData.append('type', createData.supply !== 1 ? '1' : '0');

                        Object.keys(createFormData).forEach((key: string) => {
                            // if (tabType === 'image' && key === 'more_info_file') return;
                            if (key === 'adult_gb') {
                                formData.append(key, createFormData[key] ? '1' : '0');
                                return;
                            }

                            formData.append(key, createFormData[key]);
                        });

                        clearInterval(timerId);
                        setRequestKey('');

                        try {
                            const { data, success } = await Axios('addasset', formData, token);
                            if (success) {
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
                                setMintLoading({
                                    addAssets: true,
                                    minting: false,
                                });
                                onListing(listData, signature);
                            }
                        } catch (error: any) {
                            setFormSave(false);
                            setRequestKey('');
                            clearInterval(timerId);
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
                    setFormSave(false);
                    setRequestKey('');
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
        const getRecover = await recover('Product Create', signature, userAddress.address);
        const recoverPrams = encrypt(getRecover, process.env.REACT_APP_SIGNATURE_KEY);

        formData.append('wallet_address', userAddress.address);
        formData.append('blockchain', 'klaytn');
        formData.append('signature', signature);
        formData.append('signature_param', recoverPrams);
        formData.append('message', 'Product Create');
        formData.append('order_signature', signature);
        formData.append('order_recipt', 'Product Create');
        console.log(listingData);

        Object.keys(listingData).forEach((key: string) => {
            formData.append(key, listingData[key]);
        });

        try {
            const freezing = await Axios('assetfreezing', formData, token);
            const { success, data } = await Axios('mint', formData, token);

            setMintLoading({
                addAssets: true,
                minting: true,
            });

            if (freezing.success && success) {
                if (listingData.supply === 1) {
                    await sendSingleTransaction(listingData, freezing.data.assetUpdate.uri_metadata);
                } else {
                    await sendTransaction(listingData, freezing.data.assetUpdate.uri_metadata);
                }

                setTimeout(() => {
                    navigate(`/market-sale/${data.assetMint.contract_address}/${data.assetMint.id}`);
                }, 3000);
            }
        } catch (error: any) {
            setFormSave(false);
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

    const sendTransaction = async (assets: IlistData, tokenUri: string) => {
        const senderPrivateKey = process.env.REACT_APP_FEE_PRIVATE_KEY;

        const keyring = caver.wallet.keyring.createFromPrivateKey(senderPrivateKey);
        caver.wallet.add(keyring);

        caver.klay.accounts.wallet.add(
            caver.klay.accounts.createWithAccountKey(keyring.address, keyring.key.privateKey),
        );

        const myContract = new caver.klay.Contract(getSupplyContractABI(assets.supply).abi, process.env.REACT_APP_KLAYTN_CONTRACT_ADDRESS);

        const tx = await myContract.methods.setMint(assets.token_id, assets.supply, tokenUri, userAddress.address).send({
            from: keyring.address,
            gas: 6000000,
        });

        return tx.transactionHash;
    };

    const sendSingleTransaction = async (assets: IlistData, tokenUri: string) => {
        const senderPrivateKey = process.env.REACT_APP_FEE_PRIVATE_KEY;

        const keyring = caver.wallet.keyring.createFromPrivateKey(senderPrivateKey);
        caver.wallet.add(keyring);

        caver.klay.accounts.wallet.add(
            caver.klay.accounts.createWithAccountKey(keyring.address, keyring.key.privateKey),
        );

        const myContract = new caver.klay.Contract(getSupplyContractABI(assets.supply).abi, process.env.REACT_APP_KLAYTN_SINGLE_CONTRACT_ADDRESS);

        const tx = await myContract.methods.mintSingle(assets.token_id, tokenUri, userAddress.address).send({
            from: keyring.address,
            gas: 6000000,
        });

        return tx.transactionHash;
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

    return (
        <Container>
            <CreateTitle>Product Create</CreateTitle>
            <UserProfile>
                {/* 프로필 이미지 */}
                <ProfileImage>
                    <Images src={userAddress.image_profile || '/img/common/img_default_profile.png'} />
                </ProfileImage>
                <Username>{userAddress.user_name}</Username>
            </UserProfile>
            <NftFormContainer onSubmit={handleSubmit(onSubmit)}>
                <CreateFileUploadContainer>
                    <FileUploadTab>
                        {fileuploadTab.map((tab: IFileTab) => (
                            <Tab
                                key={tab.type}
                                active={tab.active}
                                onClick={() => tabActive(tab)}
                            >
                                {tab.type === 'image' ? t('Create.imageTab') : t('Create.audioTab')}
                            </Tab>
                        ))}
                    </FileUploadTab>
                    <Title>
                        <span>
                            (필수)
                        </span>
                        Product 이미지 등록
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
                            <NoticeTitle>{t('Create.imageUploadNotice')}</NoticeTitle>
                            <NoticeBox>
                                <NoticeItems>
                                    {t('Create.imageUploadNoticeContents_01')}
                                </NoticeItems>
                                <NoticeItems>
                                    {t('Create.imageUploadNoticeContents_02')}
                                </NoticeItems>
                                <NoticeItems>
                                    {t('Create.imageUploadNoticeContents_03')}
                                </NoticeItems>
                                <NoticeItems>
                                    {t('Create.imageUploadNoticeContents_04')}
                                </NoticeItems>
                            </NoticeBox>
                        </FileUploadNotice>
                    )}

                    {tabType === 'video' && (
                        <FileUploadNotice>
                            <NoticeTitle>{t('Create.videoUploadNotice')}</NoticeTitle>
                            <NoticeBox>
                                <NoticeItems>
                                    {t('Create.videoUploadNoticeContents_01')}
                                </NoticeItems>
                                <NoticeItems>
                                    {t('Create.videoUploadNoticeContents_02')}
                                </NoticeItems>
                            </NoticeBox>
                        </FileUploadNotice>
                    )}

                    <CreateVideoThumbnail
                        register={register}
                        onMoreChange={onMoreChange}
                        thumbnailUrl={thumbnailUrl}
                        setThumbnailUrl={setThumbnailUrl}
                        setValue={setValue}
                    />

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
                    <CreateForm
                        register={register}
                        errors={errors}
                        setValue={setValue}
                        getValues={getValues}
                        watch={watch}
                        control={control}
                        setRoyalty={setRoyalty}
                        setCategory={setCategory}
                        setBlockChain={setBlockChain}
                        setSupply={setSupply}
                    />

                    <Submit
                        type="submit"
                        value="상품 등록하기"
                        disabled={!isValid}
                    />
                </FormContainer>
            </NftFormContainer>

            {(isRoyalty || isCategory || isBlockChain || isSupply || isFormCheck || isFormSave) && (
                <CreateModalContainer
                    isCategory={isCategory}
                    isRoyalty={isRoyalty}
                    isFormCheck={isFormCheck}
                    isFormSave={isFormSave}
                    isBlockChain={isBlockChain}
                    isSupply={isSupply}
                    setSupply={setSupply}
                    setRoyalty={setRoyalty}
                    setCategory={setCategory}
                    setBlockChain={setBlockChain}
                    formCheckCallback={formCheckCallback}
                    submitData={submitData}
                    mintLoading={mintLoading}
                    saveTitle="상품 등록하기"
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
    padding: 80px 20px 280px 20px;
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

const CreateTitle = styled.div`
    font-size: 38px;
    font-family: ${fonts.Tinos};
    color: ${colors.Black100};
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.Black100};
`;

const UserProfile = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

const Username = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    margin-left: 8px;
`;

const NftFormContainer = styled.form`
    display: flex;
    margin-top: 24px;
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

const Tab = styled.div<{active: boolean}>`
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

const NoticeTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;

    &::before {
        width: 16px;
        height: 16px;
        content: '';
        background-image: url('/img/create/ic_create_info.svg');
        display: block;
        margin-right: 6px;
    }
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
export default Create;
