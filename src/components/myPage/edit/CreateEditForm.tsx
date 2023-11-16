import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { IProfileInfo } from '@interface/mypage';
import { useTranslation } from 'react-i18next';
import DaumPostcodeEmbed from 'react-daum-postcode';
import { Store } from 'react-notifications-component';
import { rgba } from 'emotion-rgba';
import { Axios } from '@utils/api';
import { useRecoilValue } from 'recoil';

// recoil
import { UserAddress } from '@recoil/auth';

// Data
import { profileEditFormData, IProfileEditFormData, ICreateItems } from '@utils/data/profile_edit_data';

// Components
import Input from '@components/common/ui/Input';
import TextArea from '@components/common/ui/TextArea';
import SwichCheckBox from '@components/common/ui/SwichCheckBox';

interface IEditForm {
    register: any;
    errors: any;
    setValue: any;
    getValues: any;
    watch: any;
    profileInfo: IProfileInfo;
}

function CreateEditForm({
    register,
    errors,
    setValue,
    getValues,
    watch,
    profileInfo,
}: IEditForm) {
    const { t } = useTranslation();
    const editForm:IProfileEditFormData[] = profileEditFormData(t);
    const [isPostModal, setPostModal] = useState<boolean>(false);
    const [isCertification, setCertification] = useState<boolean>(false);
    const userAddress = useRecoilValue(UserAddress);

    const handleCertification = (e) => {
        e.preventDefault();

        /* 가맹점 식별코드 */
        const userCode = 'imp75435433';
        const certificationData = {
            merchant_uid: profileInfo.profileInfo.user_id,
        };

        const { IMP } = window;
        IMP.init(userCode);
        IMP.certification(certificationData, certificationCallback);
    };

    const certificationCallback = async (response) => {
        // 로그인 토큰 가져오기
        const token = `Bearer ${localStorage.getItem('token')}` || '';
        const { success, imp_uid } = response;
        const formData = new FormData();

        formData.append('wallet_address', userAddress.address);
        formData.append('blockchain', 'klaytn');
        formData.append('imp_uid', imp_uid);

        if (success) {
            try {
                const { data } = await Axios('profile_imp_uid', formData, token);

                const {
                    birth, birthday, foreigner, gender, name, unique_key, phone,
                } = data.imp_info;

                const isAdult = new Date(birth).getFullYear() <= 1999 ? 1 : 0;

                setValue('adult', isAdult, { shouldValidate: true });
                setValue('birth', birthday, { shouldValidate: true });
                setValue('foreigner', foreigner ? 1 : 0, { shouldValidate: true });
                setValue('gender', gender === 'male' ? 0 : 1, { shouldValidate: true });
                setValue('name', name, { shouldValidate: true });
                setValue('shipping_name', name, { shouldValidate: true });
                setValue('phone_num', phone, { shouldValidate: true });
                setValue('imp_unique_key', unique_key, { shouldValidate: true });
            } catch (e) {
                Store.addNotification({
                    title: '오류',
                    message: '이미 인증된 인증정보입니다.',
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
    };

    const handlePost = (e) => {
        e.preventDefault();

        setPostModal(true);
    };

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
        setValue('shipping_addr', fullAddress, { shouldValidate: true });
        setValue('zip_code', data.zonecode, { shouldValidate: true });

        setPostModal(false);
    };

    // 모달이 뜰때 브라우저 스크롤 숨기기
    useEffect(() => {
        if (isPostModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isPostModal]);

    useEffect(() => {
        setCertification(getValues('name') !== '' && getValues('birth') !== '');
    }, [getValues('birth'), getValues('name')]);

    return (
        <>
            {editForm.map((form: IProfileEditFormData) => (
                <FormBox
                    key={form.label}
                    type={form.type}
                >
                    {/* TITLE FORM */}
                    {(form.type !== 'checkbox' && form.type !== 'radio') && (
                        <>
                            <TitleBox type={form.label}>
                                {/* TITLE */}
                                <Title>
                                    {form.required && (
                                        <span>
                                            (
                                            {t('ProfileEdit.editRequired')}
                                            )
                                        </span>
                                    )}
                                    {form.title}
                                </Title>

                                {/* TITLE SIDE */}
                                {(form.type === 'textarea') && (
                                    <LengthCheck>
                                        {watch(form.label) ? watch(form.label).length : 0}
                                        {' '}
                                        /
                                        {' '}
                                        {t('ProfileEdit.maxText')}
                                        {' '}
                                        {form.maxLength}
                                        {t('ProfileEdit.textUnit')}
                                    </LengthCheck>
                                )}
                            </TitleBox>

                            {form.label === 'user_name' && (
                                <TitleInfo>
                                    {t('ProfileEdit.titleInfoText')}
                                </TitleInfo>
                            )}

                            {form.label === 'user_certification' && (
                                <TitleInfo>
                                    회원 정보를 확인하기 위해 휴대폰 인증을 진행해주세요.
                                </TitleInfo>
                            )}

                        </>
                    )}

                    {/* ADDRESS VIEW */}
                    {form.type === 'address' && (
                        <AddressView>
                            {profileInfo.wallet_address}
                        </AddressView>
                    )}

                    {/* ADDRESS VIEW */}
                    {form.type === 'shipping_address' && (
                        <>
                            <ShppingTitle>우편번호</ShppingTitle>
                            <ShippingBox>
                                <ShippingCode>
                                    {getValues('zip_code')
                                        ? getValues('zip_code')
                                        : <AddressDefaultText>우편번호</AddressDefaultText>}
                                </ShippingCode>
                                <ShippingCodeButton
                                    onClick={handlePost}
                                >
                                    주소검색
                                </ShippingCodeButton>
                            </ShippingBox>
                            <ShppingTitle>주소</ShppingTitle>
                            <ShippingAddress>
                                {getValues('shipping_addr')
                                    ? getValues('shipping_addr')
                                    : <AddressDefaultText>주소를 입력해 주세요.</AddressDefaultText>}
                            </ShippingAddress>
                            <ShppingTitle>상세주소</ShppingTitle>
                            <ShippingOrignAddress>
                                <Input
                                    register={register}
                                    required={form.required}
                                    minLength={form.minLength}
                                    maxLength={form.maxLength}
                                    valueLength={watch(form.label) ? watch(form.label).length : 0}
                                    getValue={getValues(form.label)}
                                    setValue={setValue}
                                    error={!!errors[form.label]}
                                    placeholder={form.message}
                                    errorMessage={form.message}
                                    label={form.label}
                                    type={form.type}
                                    pattern={form.pattern}
                                    patternMessage={form.patternMessage}
                                />
                            </ShippingOrignAddress>
                            <ShippingInfoTitle>
                                <InfoIcon src="/img/myPage/edit/ic_Information.svg" />
                                꼭 읽어주세요.
                            </ShippingInfoTitle>
                            <ShippingInfo>
                                회원이 잘못된 개인정보(배송지주소, 핸드폰, 이메일 등)을 회사에 제공하여,회사가 회원이 제공한개인정보로 상품 또는 제품을 발송하여 발생된 손해(분실, 파손 등)가 발생된 경우에는 모든 책임은회원에게 있습니다.
                            </ShippingInfo>
                        </>
                    )}

                    {/* Phone Number */}
                    {form.type === 'button' && (
                        <CertificationPhone
                            onClick={handleCertification}
                            disabled={isCertification}
                        >
                            <PhoneCertifyIcon src="/img/myPage/edit/ic_phone_certification.svg" />
                            {isCertification ? '휴대폰 인증 완료' : '휴대폰 인증 하기'}
                        </CertificationPhone>
                    )}

                    {/* TEXT FORM */}
                    {form.type === 'text' && (
                        <Input
                            register={register}
                            required={form.required}
                            minLength={form.minLength}
                            maxLength={form.maxLength}
                            valueLength={watch(form.label) ? watch(form.label).length : 0}
                            getValue={getValues(form.label)}
                            setValue={setValue}
                            error={!!errors[form.label]}
                            placeholder={form.message}
                            errorMessage={form.message}
                            label={form.label}
                            type={form.type}
                            pattern={form.pattern}
                            patternMessage={form.patternMessage}
                        />
                    )}

                    {/* TEXT FORM */}
                    {form.type === 'sns' && form.items.map((sns: ICreateItems) => (
                        <SnsInputBox key={sns.label}>
                            <SnsIcons src={`/img/myPage/edit/ic_${sns.icons}.svg`} />
                            <SnsDefaultLink>
                                {sns.defaultAddress}
                            </SnsDefaultLink>
                            <SnsInput
                                {...register(sns.label, {
                                    required: sns.required,
                                    minLength: sns.minLength,
                                    maxLength: sns.maxLength,
                                })}
                                type="text"
                                minLength={sns.minLength}
                                maxLength={sns.maxLength}
                                autoComplete="off"
                            />
                        </SnsInputBox>
                    ))}

                    {/* TEXTAREA FORM */}
                    {form.type === 'textarea' && (
                        <TextArea
                            register={register}
                            label={form.label}
                            required={form.required}
                            minLength={form.minLength}
                            maxLength={form.maxLength}
                            type={form.type}
                            placeholder={form.message}
                            height={140}
                            setValue={setValue}
                            valueLength={watch(form.label) ? watch(form.label).length : 0}
                            error={!!errors[form.label]}
                            errorMessage={form.message}
                        />
                    )}

                    {/* CHECBOX FORM */}
                    {form.type === 'checkbox' && (
                        <CheckedBox>
                            <CheckBoxName>
                                {form.title}

                                <MarketingInfo>
                                    마케팅 수신 동의 미동의 시, 판매등록 성공
                                    {' '}
                                    <br />
                                    이메일을 받을 수 없습니다.
                                </MarketingInfo>
                            </CheckBoxName>
                            <SwichCheckBox
                                register={register}
                                required={form.required}
                                label={form.label}
                                value={getValues(form.label)}
                                setValue={setValue}
                            />
                        </CheckedBox>
                    )}
                </FormBox>
            ))}

            {isPostModal && (
                <PostModal onClick={() => setPostModal(false)}>
                    <ModalContain>
                        <DaumPostcodeEmbed
                            onComplete={handleComplete}
                        />
                    </ModalContain>
                </PostModal>
            )}

        </>
    );
}

const FormBox = styled.div<{type: string}>`
    padding-top: ${(props) => (props.type === 'checkbox' ? '34px' : 0)};
    padding-bottom: ${(props) => (props.type === 'checkbox' ? '36px' : '38px')};
    display: block;
    align-items: ${(props) => (props.type === 'checkbox' ? 'center' : 'interit')};
    justify-content: ${(props) => (props.type === 'checkbox' ? 'space-between' : 'interit')};

    & > div {
        margin-bottom: ${(props) => (props.type === 'checkbox' ? 0 : 'interit')};
    }
`;

const TitleBox = styled.div<{type: string}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => (props.type === 'name' ? '8px' : '8px')};
`;

const Title = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    font-weight: 500;

    span {
        color: ${colors.Red100};
        margin-right: 4px;
    }
`;

const LengthCheck = styled.div`
    font-size: 13px;
    font-weight: 300;
    color: ${colors.BlueGray700};
`;

const CheckedBox = styled.div`
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
`;

const CheckBoxName = styled.div`
    font-size: 13px;
    color: ${colors.Black100};

    span {
        margin-left: 4px;
        font-size: 13px;
        color: ${colors.Red100};
        cursor: pointer;
    }
`;

const AddressView = styled.div`
    background-color: ${colors.BlueGray200};
    margin-top: 10px;
    border-radius: 8px;
    color: ${colors.Black100};
    font-size: 14px;
    height: 50px;
    padding: 0 12px;
    display: flex;
    align-items: center;
`;

const TitleInfo = styled.div`
    color: ${colors.BlueGray700};
    margin-bottom: 8px;
    font-weight: 300;
    font-size: 13px;
`;

const SnsInputBox = styled.div`
    display: flex;
    align-items: center;
    height: 49px;
    border-bottom: 1px solid ${colors.BlueGray500};
    margin-bottom: 16px;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

const SnsInput = styled.input`
    flex: 1;
    border: 0;

    &:focus, &:active, &:focus-visible {
        border: 0;
        outline: 0;
    }
`;

const SnsIcons = styled('img')`
    flex-basis: 44px;
`;

const SnsDefaultLink = styled.div`
    margin: 0 6px;
    font-size: 13px;
    color: ${colors.Black100};
    text-decoration: underline;
`;

const ShippingBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
`;

const ShppingTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
`;

const ShippingCode = styled.div`
    width: 162px;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-bottom: 1px solid ${colors.BlueGray500};
`;

const ShippingCodeButton = styled.button`
    width: 120px;
    height: 50px;
    border: 1px solid ${colors.BlueGray500};
    color: ${colors.Black100};
    background: ${colors.White100};
    border-radius: 8px;
    margin-left: 8px;
    outline: 0;
    cursor: pointer;
`;

const ShippingOrignAddress = styled.div`
    margin-top: 5px;
    margin-bottom: 10px;
`;

const ShippingAddress = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-bottom: 1px solid ${colors.BlueGray500};
    margin-top: 5px;
    margin-bottom: 15px;
`;

const AddressDefaultText = styled.div`
    color: ${colors.WarmGray400};
`;

const PostModal = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: ${rgba(colors.Black200, 0.8)};
    z-index: 9999999;
`;

const ModalContain = styled.div`
    width: 500px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const ShippingInfo = styled.div`
    margin-top: 8px;
    font-size: 13px;
    line-height: 1.5;
    color: ${colors.BlueGray700};
    font-weight: 300;
`;

const CertificationPhone = styled.button`
    width: 290px;
    height: 58px;
    background-color: ${colors.Green100};
    border-radius: 8px;
    color: ${colors.White100};
    border: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0 20px;

    &:hover {
        background-color: ${rgba(colors.Green100, 0.9)};
    }

    &:disabled {
        background-color: ${colors.BlueGray500};
        cursor: not-allowed;

        &:hover {
            background-color: ${colors.BlueGray500};
        }
    }
`;

const PhoneCertifyIcon = styled('img')`
    width: 18px;
    margin-right: 60px;
`;

const ShippingInfoTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    margin-top: 28px;
    display: flex;
    align-items: center;
`;

const InfoIcon = styled('img')`
    width: 16px;
    margin-right: 6px;
`;

const MarketingInfo = styled.div`
    font-size: 13px;
    color: ${colors.BlueGray700};
    margin-top: 7px;
    font-weight: 300;
`;

export default CreateEditForm;
