import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';
import { nl2br } from '@utils/help';

interface ICategoryModal {
    setSupply: any;
}

function SupplyModal({ setSupply }: ICategoryModal) {
    const { t } = useTranslation();

    return (
        <>
            <ModalHeader>
                발행수량
            </ModalHeader>
            <CategoryContents>
                <CategoryInfo dangerouslySetInnerHTML={{ __html: nl2br('발행 수량의 수정 버튼을 이용해서\n같은 상품을 여러 개 만들 수 있습니다.') }} />
                <CategoryButton onClick={() => setSupply(false)}>
                    {t('CreateModal.confirm')}
                </CategoryButton>
            </CategoryContents>
        </>
    );
}

const ModalHeader = styled.div`
    padding: 18px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    border-bottom: 1px solid ${colors.BlueGray500};
    color: ${colors.Black100};
`;

const CategoryContents = styled.div`
    margin-top: 27px;
    text-align: center;
`;

const CategoryInfo = styled.div`
    margin-top: 21px;
    font-size: 14px;
    color: ${colors.Black100};
    line-height: 1.7;
    text-align: center;
    margin-bottom: 32px;
`;

const CategoryButton = styled.div`
    margin-top: 32px;
    height: 58px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    

    &:hover {
        background-color: ${colors.BlueGray200};
    }
`;

export default SupplyModal;
