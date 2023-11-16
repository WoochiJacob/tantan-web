import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors, fonts } from '@styles/ui_palette';
import { nl2br, krSymbol, pfpGB } from '@utils/help';
import { IAssetsDetail } from '@interface/assets';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { rgba } from 'emotion-rgba';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Store } from 'react-notifications-component';
import { UserAddress } from '@recoil/auth';

// Components
import AssetsModalContainer from '@components/detail/modals/AssetsModalContainer';

interface AssetsDetail {
    nftAssets: IAssetsDetail;
}

function DetailAssets({ nftAssets }: AssetsDetail) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userAddress = useRecoilValue(UserAddress);
    const [showOriginImage, setShowOriginImage] = useState<boolean>(false);
    const [descriptionModal, setDescriptionModal] = useState<boolean>(false);

    const notiOption = {
        animationIn: ['animate__animated', 'animate__fadeIn'],
        animationOut: ['animate__animated', 'animate__fadeOut'],
        dismiss: {
            duration: 2000,
        },
    };

    const CopyNoti = () => {
        Store.addNotification({
            title: t('Notification.succeseTitle'),
            message: t('Notification.copyMessage'),
            type: 'default',
            insert: 'top',
            container: 'top-left',
            animationIn: ['animate__animated', 'animate__fadeIn'],
            animationOut: ['animate__animated', 'animate__fadeOut'],
            dismiss: {
                duration: 1000,
            },
        });
    };

    // 외부링크 함수
    const handleExternalLink = () => {
        if (!nftAssets.external_link) return;

        window.open(
            nftAssets.external_link.includes('https://')
                ? nftAssets.external_link
                : `https://${nftAssets.external_link}`
        );
    };

    const progress = useCallback((supply: number, quantity: number): number => {
        const perc = ((supply - quantity) / supply) * 100;
        const percParseInt = parseInt(perc.toString(), 10);
        if (!percParseInt) return 0;
        return percParseInt;
    }, []);

    const handleScanLink = (contract: string, symbol: string) => {
        if (symbol === 'KLAY' || symbol === 'KRW') {
            window.open(`https://scope.klaytn.com/account/${contract}`);
        }
    };

    // 모달이 뜰때 브라우저 스크롤 숨기기
    useEffect(() => {
        if (showOriginImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showOriginImage]);

    useEffect(() => {
        if (
            (nftAssets.adult_gb.toString() === '1' && userAddress.adult.toString() === '0') ||
            (nftAssets.adult_gb.toString() === '1' && userAddress.address === '')
        ) {
            navigate('/');

            Store.addNotification({
                ...notiOption,
                title: '오류',
                message: '성인만 이용가능한 서비스입니다.',
                type: 'danger',
                container: 'top-left',
                insert: 'top',
            });
        }
    }, []);

    return (
        <Container supply={pfpGB(nftAssets.pfp_gb)}>
            {/* 유저 프로필 */}
            <UserInformation isKrw={nftAssets.symbol === 'KRW'}>
                <UserContainer>
                    <CreatorUser onClick={() => navigate(`/mypage/${nftAssets.creator_address}`)}>
                        <CreatorImages>
                            <CreatorProfile
                                src={
                                    nftAssets.creator_user_profileImg
                                        ? nftAssets.creator_user_profileImg
                                        : '/img/common/img_default_profile.png'
                                }
                            />
                        </CreatorImages>
                        <CreatorInfo>
                            <CreatorTitle isVip={!!(nftAssets.creator_vip_gb === 1)}>
                                {t('AssetsDetail.creator')}
                            </CreatorTitle>
                            <CreatorName>{nftAssets.creator_user_name}</CreatorName>
                        </CreatorInfo>
                    </CreatorUser>
                    <OwnerUser>
                        <OwnerImages onClick={() => navigate(`/mypage/${nftAssets.owner_address}`)}>
                            <OwnerProfile
                                src={
                                    nftAssets.owner_user_profileImg
                                        ? nftAssets.owner_user_profileImg
                                        : '/img/common/img_default_profile.png'
                                }
                            />
                        </OwnerImages>
                        <CreatorTitle>{t('AssetsDetail.owner')}</CreatorTitle>
                    </OwnerUser>
                </UserContainer>

                {nftAssets.market_quantity > 1 && (
                    <QuantityPercent>
                        {progress(nftAssets.market_supply, nftAssets.market_quantity)}
                        <span>%</span>
                    </QuantityPercent>
                )}
            </UserInformation>

            {/* 판매율 */}
            {nftAssets.market_quantity > 1 && (
                <SupplyQuantityProgressBar>
                    <ProgressBar
                        perc={progress(nftAssets.market_supply, nftAssets.market_quantity)}
                    />
                </SupplyQuantityProgressBar>
            )}

            {/* 판매기간 */}
            <AssetsDateBox>
                <DateTitle>판매기간</DateTitle>
                {nftAssets.start_at && nftAssets.expiration_date && (
                    <AssetsDate>
                        {nftAssets.start_at ? nftAssets.start_at.split(' ')[0] : '-'} ~{' '}
                        {nftAssets.expiration_date ? nftAssets.expiration_date.split(' ')[0] : '-'}
                    </AssetsDate>
                )}
            </AssetsDateBox>

            <AssetsTitle>{nftAssets.asset_name}</AssetsTitle>

            {/* NFT 프리뷰 */}
            {!pfpGB(nftAssets.pfp_gb) && (
                <Preview onClick={() => setShowOriginImage(true)}>
                    {!nftAssets.asset_animation && (
                        <ImageWrap>
                            <ImageBox src={nftAssets.asset_thumbnail} />
                        </ImageWrap>
                    )}

                    {nftAssets.asset_animation && nftAssets.more_info_url && (
                        <VideoFile
                            loop
                            autoPlay
                            controls
                            controlsList="nodownload"
                            poster={nftAssets.more_info_url}
                        >
                            <source src={nftAssets.asset_animation} type="video/mp4" />
                        </VideoFile>
                    )}
                </Preview>
            )}

            {/* NFT 상세 */}
            {nftAssets.itemdetail_image_url && (
                <Preview>
                    <ImageWrap>
                        <ImageBox src={nftAssets.itemdetail_image_url} />
                    </ImageWrap>
                </Preview>
            )}

            {/* 카테고리 */}
            <AssetsCategory>
                <BreadCrumb>{t('AssetsDetail.categroy')}</BreadCrumb>
                <BreadCrumb onClick={() => navigate(`/marketplace?category=${nftAssets.category}`)}>
                    {nftAssets.category}
                </BreadCrumb>
            </AssetsCategory>

            {/* 상품목록 소개 */}
            {nftAssets.product_list && (
                <CreatorBio>
                    <SectionTitle>상품목록 소개</SectionTitle>
                    <CreatorBioText
                        dangerouslySetInnerHTML={{ __html: nl2br(nftAssets.product_list) }}
                    />
                </CreatorBio>
            )}

            {/* 크리에이터 소개 */}
            {nftAssets.creator_user_bio && (
                <CreatorBio>
                    <SectionTitle>크리에이터 소개</SectionTitle>
                    <CreatorBioText
                        dangerouslySetInnerHTML={{ __html: nl2br(nftAssets.creator_user_bio) }}
                    />
                </CreatorBio>
            )}

            {/* 작품 설명 */}
            {nftAssets.asset_description && (
                <CreatorBio>
                    <SectionTitle>{t('AssetsDetail.assetsDesc')}</SectionTitle>
                    <CreatorBioText
                        dangerouslySetInnerHTML={{ __html: nl2br(nftAssets.asset_description) }}
                    />

                    <DescriptionMore onClick={() => setDescriptionModal(true)}>
                        {t('AssetsDetail.moreButton')}
                    </DescriptionMore>
                </CreatorBio>
            )}

            {/* 외부링크 */}
            <AssetsLinkBox onClick={handleExternalLink}>
                <LinkTitle>
                    외부링크
                    {!nftAssets.external_link && '가 없습니다.'}
                </LinkTitle>
                {nftAssets.external_link && <AssetsLink>바로가기</AssetsLink>}
            </AssetsLinkBox>

            {/* 카테고리 권장사항 */}
            <DetailInfoText>
                <DetailInfoIcon src="/img/assets_detail/ic_detail_Info.svg" />
                권장하는 형식의 이미지를 올리는 것을 권장합니다.
            </DetailInfoText>

            {/* NFT 블록체인 정보 */}
            <DetailInformation>
                <InfoBox>
                    <InfoTitle>{t('AssetsDetail.contractAddress')}</InfoTitle>
                    <InfoValue
                        link
                        type="contract"
                        onClick={() => handleScanLink(nftAssets.contract_address, nftAssets.symbol)}
                    >
                        {nftAssets.contract_address}
                    </InfoValue>
                </InfoBox>
                {nftAssets.market_quantity > 1 && (
                    <InfoBox>
                        <InfoTitle>{t('AssetsDetail.tokenId')}</InfoTitle>

                        <CopyToClipboard text={nftAssets.token_id} onCopy={CopyNoti}>
                            <InfoValue link type="token">
                                {nftAssets.token_id}
                            </InfoValue>
                        </CopyToClipboard>
                    </InfoBox>
                )}

                <InfoBox>
                    <InfoTitle>{t('AssetsDetail.tokenType')}</InfoTitle>
                    {nftAssets.market_quantity > 1 && (
                        <InfoValue type="standard">
                            {nftAssets.symbol === 'CONUT' || nftAssets.symbol === 'KRW'
                                ? 'KIP-37'
                                : nftAssets.asset_type}
                        </InfoValue>
                    )}

                    {nftAssets.market_quantity === 1 && (
                        <InfoValue type="standard">
                            {nftAssets.symbol === 'CONUT' || nftAssets.symbol === 'KRW'
                                ? 'KIP-17'
                                : nftAssets.asset_type}
                        </InfoValue>
                    )}
                </InfoBox>
                <InfoBox>
                    <InfoTitle>{t('AssetsDetail.blockchain')}</InfoTitle>
                    <InfoValue type="chain">{krSymbol(nftAssets.symbol)}</InfoValue>
                </InfoBox>
            </DetailInformation>

            {/* 교환 및 반품안내 */}
            <Notice>
                <NoticeTitle>교환 및 반품안내</NoticeTitle>
                <NoticeBox>
                    <NoticeItems>
                        배송기간은 상세페이지 내 설명란을 참고해 주시기바랍니다.
                        <br />
                        (별도 표기가 없으면 1주일 이내 발송)
                    </NoticeItems>
                    <NoticeItems>
                        구매가 완료된 경우 구매취소 또는 환불이 불가능 합니다.
                    </NoticeItems>
                </NoticeBox>
            </Notice>

            {/* 작품설명 모달 */}
            {descriptionModal && (
                <AssetsModalContainer
                    title={t('AssetsDetail.assetsDesc')}
                    contents={nftAssets.asset_description}
                    setDescriptionModal={setDescriptionModal}
                />
            )}

            {showOriginImage && (
                <OriginImageContainer onClick={() => setShowOriginImage(false)}>
                    <OriginImageBox>
                        {!nftAssets.asset_animation && (
                            <ImageWrap>
                                <ImageBox src={nftAssets.asset_thumbnail} />
                            </ImageWrap>
                        )}

                        {nftAssets.asset_animation && nftAssets.more_info_url && (
                            <VideoFile
                                loop
                                autoPlay
                                controls
                                controlsList="nodownload"
                                poster={nftAssets.more_info_url}
                            >
                                <source src={nftAssets.asset_thumbnail} type="video/mp4" />
                            </VideoFile>
                        )}
                    </OriginImageBox>
                </OriginImageContainer>
            )}
        </Container>
    );
}

const Container = styled.div<{ supply: boolean }>`
    flex-basis: calc(100% - 396px);
    margin-top: 44px;
    padding-right: 263px;
    border-right: 1px solid ${colors.BlueGray400};
    border-color: ${(props) => (props.supply ? 'transparent' : colors.BlueGray400)};
`;

const UserInformation = styled.div<{ isKrw: boolean }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid ${colors.BlueGray400};
    border-color: ${colors.BlueGray400};
`;

const SupplyQuantityProgressBar = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${colors.BlueGray400};
    border-radius: 999px;
    overflow: hidden;
`;

const ProgressBar = styled.div<{ perc: number }>`
    width: ${(props) => (props.perc ? `${props.perc}%` : 0)};
    height: 2px;
    border-radius: 999px;
    background: linear-gradient(90deg, #f7941d 0%, #f0dc2d 100%);
`;

const CreatorUser = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 24px;
`;

const CreatorImages = styled.div`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${colors.Black200};
`;

const CreatorProfile = styled('img')`
    width: 34px;
    height: 34px;
    object-fit: cover;
`;

const CreatorInfo = styled.div`
    margin-left: 10px;
`;

const CreatorName = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
`;

const OwnerUser = styled.div`
    display: flex;
    align-items: center;
`;

const CreatorTitle = styled.div<{ isVip?: boolean }>`
    font-family: ${fonts.Tinos};
    font-size: 13px;
    color: ${colors.BlueGray700};
    display: flex;

    &::before {
        width: 14px;
        height: 14px;
        background-image: url('/img/common/ic_user_verify.svg');
        display: block;
        content: '';
        margin-right: 4px;
        display: ${(props) => (props.isVip ? 'block' : 'none')};
    }
`;

const OwnerImages = styled.div`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto;
    cursor: pointer;
    background-color: ${colors.Black200};
    margin-right: 8px;
`;

const OwnerProfile = styled('img')`
    width: 34px;
    height: 34px;
    object-fit: cover;
`;

const UserContainer = styled.div`
    display: flex;
    align-items: center;
`;

const QuantityPercent = styled.div`
    font-size: 24px;
    font-weight: 500;

    span {
        font-size: 13px;
        margin-left: 2px;
    }
`;

const AssetsTitle = styled.div`
    font-size: 20px;
    font-weight: 500;
    color: ${colors.Black200};
    margin-top: 12px;
    word-break: break-all;
`;

const Preview = styled.div`
    margin-top: 24px;
    background-color: ${colors.White100};
    border: 1px solid ${colors.BlueGray500};
    border-radius: 12px;
    padding: 10px;
    cursor: pointer;
`;

const ImageWrap = styled.div`
    width: 100%;
    min-height: 560px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;

const ImageBox = styled('img')`
    width: 100%;
`;

const VideoFile = styled.video`
    width: 100%;
`;

const Notice = styled.div`
    margin-top: 28px;
`;

const NoticeTitle = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
`;

const AssetsCategory = styled.div`
    padding-top: 24px;
    margin-bottom: 24px;
    padding-bottom: 6px;
    border-bottom: 1px solid ${colors.BlueGray400};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BreadCrumb = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    font-weight: 400;
    cursor: pointer;

    &:hover {
        border-color: ${colors.Black100};
    }
`;

const SectionTitle = styled.div<{ icon?: string }>`
    font-size: 16px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    font-weight: 500;

    &::before {
        width: 16px;
        height: 16px;
        content: '';
        background-image: url(${(props) => props.icon});
        background-repeat: no-repeat;
        background-position: center center;
        display: ${(props) => (props.icon ? 'block' : 'none')};
        margin-right: 6px;
    }
`;

const CreatorBio = styled.div`
    margin-top: 16px;
`;

const CreatorBioText = styled.div`
    /* word-break: keep-all; */
    color: ${colors.WarmGray600};
    margin-top: 8px;
`;

const DescriptionMore = styled.div`
    font-size: 14px;
    margin-top: 20px;
    color: ${colors.Black100};
    cursor: pointer;
    display: flex;
    align-items: center;
    width: 70px;

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

const NoticeBox = styled.div`
    margin-top: 8px;
`;

const NoticeItems = styled.div`
    font-size: 13px;
    font-weight: 300;
    color: ${colors.BlueGray700};
    position: relative;
    padding-left: 14px;
    margin-bottom: 4px;

    &:last-of-type {
        margin-bottom: 0;
    }

    &::before {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        content: '';
        background-color: ${colors.BlueGray700};
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
    }
`;

const DetailInformation = styled.div`
    margin-top: 11px;
    background-color: ${colors.BlueGray200};
    border: 1px solid ${colors.BlueGray400};
    border-radius: 8px;
    padding: 16px;
`;

const InfoBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

const InfoTitle = styled.div`
    font-size: 13px;
    color: ${colors.BlueGray800};
    display: flex;
    align-items: center;

    &::before {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        background-color: ${colors.BlueGray800};
        display: block;
        content: '';
        margin-right: 8px;
    }
`;

const InfoValue = styled.div<{ link?: boolean; type: string }>`
    width: ${(props) => (props.type === 'token' ? '350px' : '')};
    font-size: 13px;
    color: ${colors.BlueGray800};
    text-decoration: ${(props) => (props.link ? 'underline' : 'none')};
    cursor: ${(props) => (props.link ? 'pointer' : 'default')};
    line-clamp: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; /* 말줄임 적용 */
    height: 19px;
`;

const OriginImageContainer = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: ${rgba(colors.Black200, 0.9)};
    z-index: 10001;
    overflow-y: auto;
`;

const OriginImageBox = styled.div`
    width: 800px;
    height: 100%;
    margin: 100px 0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
`;

const DetailInfoIcon = styled('img')`
    width: 16px;
    margin-right: 6px;
`;

const DetailInfoText = styled.div`
    display: flex;
    align-items: center;
    /* padding-top: 23px;
    border-top: 1px solid ${colors.BlueGray400}; */
    margin-top: 25px;
`;

const AssetsDateBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
`;

const DateTitle = styled.div`
    font-size: 13px;
    color: ${colors.BlueGray800};
    margin-right: 8px;
`;

const AssetsDate = styled.div`
    font-size: 13px;
    color: ${colors.BlueGray800};
`;

const AssetsLinkBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    background-color: ${rgba(colors.Blue100, 0.05)};
    margin-top: 64px;
    padding: 16px 20px;
    border-radius: 8px;
    cursor: pointer;
    color: ${colors.Blue100};
`;

const LinkTitle = styled.div`
    display: flex;
    font-size: 13px;

    &::before {
        width: 20px;
        height: 20px;
        content: '';
        background-image: url('/img/assets_detail/ic_extra_link.svg');
        background-position: left top;
        display: block;
        margin-right: 2px;
    }
`;

const AssetsLink = styled.div`
    font-size: 13px;
    color: ${colors.Blue100};
`;

export default DetailAssets;
