import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { RotatingSquare } from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';

interface ILoading {
    addAssets: boolean;
    minting: boolean;
}

interface IFormSaveModal {
    mintLoading: ILoading;
    saveTitle: string;
}

function FormSaveModal({ mintLoading, saveTitle }: IFormSaveModal) {
    const { t } = useTranslation();
    return (
        <>
            <ModalHeader>
                {saveTitle}
            </ModalHeader>

            <Images src="/img/create/img_create_nft.png" />

            <LoadingBox>
                <LoadingContents loading={mintLoading.addAssets}>
                    {!mintLoading.addAssets && (
                        <RotatingSquare
                            width={36}
                            height={36}
                            ariaLabel="rotating-square"
                            visible
                            color={colors.Orange100}
                            strokeWidth="10"
                        />
                    )}
                    <span>{t('CreateModal.saveData')}</span>
                </LoadingContents>
                <LoadingContents loading={mintLoading.minting}>
                    {!mintLoading.minting && (
                        <RotatingSquare
                            width={36}
                            height={36}
                            ariaLabel="rotating-square"
                            visible
                            color={colors.Orange100}
                            strokeWidth="10"
                        />
                    )}
                    <span>{t('CreateModal.minting')}</span>
                </LoadingContents>
                <Notifications>
                    {t('CreateModal.saveDataNoti')}
                </Notifications>
            </LoadingBox>

        </>
    );
}

const ModalHeader = styled.div`
    padding: 18px 0;
    text-align: center;
    font-size: 18px;
    font-weight: 500; 
    color: ${colors.Black100};
`;

const LoadingBox = styled.div`
    margin-top: 40px;
`;

const LoadingContents = styled.div<{loading: boolean}>`
    margin: 34px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
        flex-basis: calc(100% - 96px);
        padding-left: 12px;
        font-size: 16px;
        color: ${colors.Black100};
    }

    &::before {
        flex-basis: 36px;
        width: 36px;
        height: 36px;
        display: ${(props) => (props.loading ? 'flex' : 'none')};
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background-color: ${colors.Orange100};
        background-image: url('/img/create/ic_mint_check.svg');
        background-repeat: no-repeat;
        background-position: center center;
        content: '';
    }

    &::after {
        flex-basis: 60px;
        width: 60px;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        background-color: ${(props) => (props.loading ? colors.Orange100 : colors.BlueGray400)};
        color: ${colors.White100};
        content: '완료';
    }
`;

const Images = styled('img')`
    width: 100%;
`;

const Notifications = styled.div`
    color: ${colors.Black100};
    font-size: 13px;
    text-align: center;
    margin-top: 113px;
`;
export default FormSaveModal;
