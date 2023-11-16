import React, { useEffect, useMemo } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { IOwnerList } from '@interface/assets';
import { useNavigate } from 'react-router-dom';

interface IModal {
    ownerList: IOwnerList[] | null;
    setOwnerListModal: any;
    tokenId: number;
}

function OwnerLIstModal({
    ownerList,
    setOwnerListModal,
    tokenId,
}: IModal) {
    const navigate = useNavigate();

    // 현재 판매자
    const sellerOwner = useMemo(():any => {
        if (!ownerList) return null;

        return ownerList.find((owner) => owner.nft_asset_id === tokenId);
    }, [ownerList]);

    // 판매자를 제외한 보유자
    const otherOwner = useMemo(():any => {
        if (!ownerList) return null;

        return ownerList.filter((owner) => owner.nft_asset_id !== tokenId);
    }, [ownerList]);

    // 클릭하면 해당 상세 페이지로 이동
    const handleOwnerLink = (owner: IOwnerList) => {
        // 모달 닫고
        setOwnerListModal(false);

        // 해당 링크로 이동
        navigate(`/marketplace/${owner.contract_address}/${owner.nft_asset_id}`);
    };

    // 모달이 켜져있을때 브라우저 스크롤 잠금
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <OwnerModalContainer>
            <ModalBody>
                <ModalHeader>보유자 목록</ModalHeader>

                <ModalContents>
                    {sellerOwner && (
                        <OwnerListGroup>
                            <OwnerListHead type="seller">
                                <OwnerItemTitle type="title">판매자</OwnerItemTitle>
                                <OwnerItemTitle type="title">보유중인 수량</OwnerItemTitle>
                                <OwnerItemTitle type="title">판매가격</OwnerItemTitle>
                                <OwnerItemTitle type="title">판매현황</OwnerItemTitle>
                            </OwnerListHead>
                            <OwnerListItems>
                                <OwnerItemTitle>
                                    <OwnerProfileBox>
                                        <OwerProfileImage
                                            src={sellerOwner.image_profile ? sellerOwner.image_profile : '/img/common/img_default_profile.png'}
                                        />
                                        <CertifyOwner />
                                    </OwnerProfileBox>
                                    <OwnerName>
                                        {sellerOwner.user_name}
                                    </OwnerName>
                                </OwnerItemTitle>
                                <OwnerItemTitle>
                                    {sellerOwner.quantity.toLocaleString()}
                                </OwnerItemTitle>
                                <OwnerItemTitle>
                                    {sellerOwner.price.toLocaleString()}
                                </OwnerItemTitle>
                                <OwnerItemTitle>
                                    <StateBox isEnd={sellerOwner.is_display === 0}>
                                        {sellerOwner.is_display === 0 ? '판매종료' : '판매중'}
                                    </StateBox>
                                </OwnerItemTitle>
                            </OwnerListItems>
                        </OwnerListGroup>
                    )}

                    {otherOwner.length > 0 && (
                        <OwnerListGroup>
                            <OwnerListHead>
                                <OwnerItemTitle type="title">보유자</OwnerItemTitle>
                                <OwnerItemTitle type="title">보유중인 수량</OwnerItemTitle>
                                <OwnerItemTitle type="title">판매가격</OwnerItemTitle>
                                <OwnerItemTitle type="title">판매현황</OwnerItemTitle>
                            </OwnerListHead>
                            {otherOwner.map((owner: IOwnerList) => (
                                <OwnerListItems
                                    key={owner.nft_asset_id}
                                    onClick={() => handleOwnerLink(owner)}
                                >
                                    <OwnerItemTitle>
                                        <OwnerProfileBox>
                                            <OwerProfileImage src={owner.image_profile ? owner.image_profile : '/img/common/img_default_profile.png'} />
                                            <CertifyOwner />
                                        </OwnerProfileBox>
                                        <OwnerName>
                                            {owner.user_name}
                                        </OwnerName>
                                    </OwnerItemTitle>
                                    <OwnerItemTitle>
                                        {owner.quantity.toLocaleString()}
                                    </OwnerItemTitle>
                                    <OwnerItemTitle>
                                        {owner.price.toLocaleString()}
                                    </OwnerItemTitle>
                                    <OwnerItemTitle>
                                        <StateBox isEnd={owner.is_display === 0}>
                                            {owner.is_display === 0 ? '판매종료' : '판매중'}
                                        </StateBox>
                                    </OwnerItemTitle>
                                </OwnerListItems>
                            ))}

                        </OwnerListGroup>
                    )}
                </ModalContents>
                <ButtonBox>
                    <CloseBoutton
                        onClick={() => setOwnerListModal(false)}
                    >
                        확인
                    </CloseBoutton>
                </ButtonBox>
            </ModalBody>
        </OwnerModalContainer>
    );
}

const OwnerModalContainer = styled.div`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${rgba(colors.Black200, 0.8)};
    z-index: 99999;
`;

const ModalBody = styled.div`
    width: 500px;
    background-color: ${colors.White100};
    border-radius: 12px;
    padding: 53px 0;
    padding-top: 0;
`;

const ModalHeader = styled.div`
    padding: 18px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid ${colors.BlueGray500};
    color: ${colors.Black100};
`;

const ModalContents = styled.div`
    padding-top: 21px;
`;

const OwnerListGroup = styled.div`
    padding-bottom: 21px;
    border-bottom: 1px solid ${colors.BlueGray500};
    margin-bottom: 21px;
    max-height: 400px;
    overflow-y: auto;

    &:last-of-type {
        border: 0;
        padding-bottom: 57px;
        margin-bottom: 0;
    }
`;

const OwnerListHead = styled.div<{type?: string}>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${(props) => (props.type === 'seller' ? 0 : '20px')};
    padding: 0 30px;
`;

const OwnerItemTitle = styled.div<{type?: string}>`
    flex-basis: 23%;
    font-size: 14px;
    font-weight: ${(props) => (props.type === 'title' ? 500 : 400)};
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-of-type {
        flex-basis: 31%;
        justify-content: left;
    }
`;

const OwnerListItems = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 68px;
    margin-top: 8px;
    padding: 0 30px;
    cursor: pointer;

    &:first-of-type {
        margin-top: 0;
    }

    &:hover {
        background-color: ${colors.BlueGray300};
    }
`;

const OwnerProfileBox = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    background-color: ${colors.Black200};
`;

const OwerProfileImage = styled('img')`
    object-fit: cover;
    width: 32px;
    height: 32px;
`;

const CertifyOwner = styled('img')``;

const OwnerName = styled.div`
    font-size: 13px;
    margin-left: 7px;
`;

const StateBox = styled.div<{isEnd: boolean}>`
    width: 80px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: ${(props) => (props.isEnd ? rgba(colors.BlueGray500, 0.3) : rgba(colors.Red200, 0.1))};
    color: ${(props) => (props.isEnd ? colors.BlueGray500 : colors.Red200)};
`;

const CloseBoutton = styled.div`
    width: 100%;
    height: 58px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background-color: ${colors.BlueGray350};
    }
`;

const ButtonBox = styled.div`
    padding: 0 30px;
`;

export default OwnerLIstModal;
