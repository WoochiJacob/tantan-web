import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { useNavigate } from 'react-router-dom';
import { colors, fonts } from '@styles/ui_palette';
import { nl2br, pfpGB } from '@utils/help';
import { IAssetsDetail } from '@interface/assets';
import { useTranslation } from 'react-i18next';
import { rgba } from 'emotion-rgba';

// Components
import AssetsModalContainer from '@components/detail/modals/AssetsModalContainer';

interface AssetsDetail {
    nftAssets: IAssetsDetail;
}

function DetailAssets({ nftAssets }: AssetsDetail) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [showOriginImage, setShowOriginImage] = useState<boolean>(false);
    const [descriptionModal, setDescriptionModal] = useState<boolean>(false);

    // 외부링크 함수
    const handleExternalLink = () => {
        if (!nftAssets.external_link) return;

        window.open(nftAssets.external_link.includes('https://') ? nftAssets.external_link : `https://${nftAssets.external_link}`);
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

    return (

        <Container supply={pfpGB(nftAssets.pfp_gb)}>
            {/* 유저 프로필 */}
            <UserInformation isKrw={nftAssets.symbol === 'KRW'}>
                <UserContainer>
                    <CreatorUser
                        onClick={() => navigate(`/mypage/${nftAssets.creator_address}`)}
                    >
                        <CreatorImages>
                            <CreatorProfile
                                src={nftAssets.creator_user_profileImg ? nftAssets.creator_user_profileImg : '/img/common/img_default_profile.png'}
                            />
                        </CreatorImages>
                        <CreatorInfo>
                            <CreatorTitle isVip={!!(nftAssets.creator_vip_gb === 1)}>{t('AssetsDetail.creator')}</CreatorTitle>
                            <CreatorName>{nftAssets.creator_user_name}</CreatorName>
                        </CreatorInfo>
                    </CreatorUser>
                </UserContainer>
            </UserInformation>

            {/* 판매기간 */}
            <AssetsDateBox>
                <DateTitle>참여기간</DateTitle>
                {nftAssets.start_at && nftAssets.expiration_date && (
                    <AssetsDate>
                        {nftAssets.start_at ? nftAssets.start_at.split(' ')[0] : '-'}
                        {' '}
                        ~
                        {' '}
                        {nftAssets.expiration_date ? nftAssets.expiration_date.split(' ')[0] : '-'}
                    </AssetsDate>
                )}
            </AssetsDateBox>

            <AssetsTitle>
                {nftAssets.asset_name}
            </AssetsTitle>

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
                            <source
                                src={nftAssets.asset_animation}
                                type="video/mp4"
                            />
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
                <BreadCrumb>
                    {t('AssetsDetail.categroy')}

                </BreadCrumb>
                <BreadCrumb
                    onClick={() => navigate(`/creative-challenge?category=${nftAssets.category}`)}
                >
                    {nftAssets.category}
                </BreadCrumb>
            </AssetsCategory>

            {/* 상품목록 소개 */}
            {nftAssets.product_list && (
                <CreatorBio>
                    <SectionTitle>
                        상품목록 소개
                    </SectionTitle>
                    <CreatorBioText dangerouslySetInnerHTML={{ __html: nl2br(nftAssets.product_list) }} />
                </CreatorBio>
            )}

            {/* 크리에이터 소개 */}
            {nftAssets.creator_user_bio && (
                <CreatorBio>
                    <SectionTitle>
                        크리에이터 소개
                    </SectionTitle>
                    <CreatorBioText dangerouslySetInnerHTML={{ __html: nl2br(nftAssets.creator_user_bio) }} />
                </CreatorBio>
            )}

            {/* 작품 설명 */}
            {nftAssets.asset_description && (
                <CreatorBio>
                    <SectionTitle>
                        {t('AssetsDetail.assetsDesc')}
                    </SectionTitle>
                    <CreatorBioText dangerouslySetInnerHTML={{ __html: nl2br(nftAssets.asset_description) }} />

                    <DescriptionMore
                        onClick={() => setDescriptionModal(true)}
                    >
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
                {nftAssets.external_link && (
                    <AssetsLink>
                        바로가기
                    </AssetsLink>
                )}
            </AssetsLinkBox>

            {/* 교환 및 반품안내 */}
            <Notice>
                <NoticeTitle>
                    유의사항
                </NoticeTitle>
                <NoticeBox>
                    <NoticeItems>
                        참가 콘텐츠 및 아이디어는 제3자의 저작권을 침해하지 않도록 주의 의무를 다해야 하며 초상권, 저작권,
                        <br />
                        소유권, 대여권 등의 법적인 문제 발생 시 해당 크리에이터에게 책임이 있음.
                    </NoticeItems>
                    <NoticeItems>
                        1인 다작 참여가 가능하나 중복 시상은 불가함.
                    </NoticeItems>
                    <NoticeItems>
                        탄탄에 게시된 콘텐츠, 아이디어 및 상품에 한하여 홍보에 활용될 수 있음.
                    </NoticeItems>
                    <NoticeItems>
                        최종 선발된 크리에이터는 상품화와 관련해 회사(㈜화현관광개발)와 별도의 계약을 체결하여 진행함.
                    </NoticeItems>
                    <NoticeItems>
                        신청결과 적합한 콘텐츠 및 아이디어가 없을 경우, 수상내역을 조정하거나 수상작을 선정하지 않을 수도 있음.
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
                                <source
                                    src={nftAssets.asset_thumbnail}
                                    type="video/mp4"
                                />
                            </VideoFile>
                        )}
                    </OriginImageBox>
                </OriginImageContainer>
            )}
        </Container>
    );
}

const Container = styled.div<{supply: boolean}>`
    flex-basis: calc(100% - 396px);
    margin-top: 44px;
    padding-right: 263px;
    border-right: 1px solid ${colors.BlueGray400};
    border-color: ${(props) => (props.supply ? 'transparent' : colors.BlueGray400)};
`;

const UserInformation = styled.div<{isKrw: boolean}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 8px;
    border-bottom: 1px solid ${colors.BlueGray400};
    border-color: ${colors.BlueGray400};
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

const CreatorTitle = styled.div<{isVip?: boolean}>`
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

const UserContainer = styled.div`
    display: flex;
    align-items: center;
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

const SectionTitle = styled.div<{icon?: string}>`
    font-size: 16px;
    color: ${colors.Black100};
    display: flex;
    align-items: center;
    font-weight: 500;

    &::before {
        width: 16px;
        height: 16px;
        content: '';
        background-image: url(${(props) => (props.icon)});
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
