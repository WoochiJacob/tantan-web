import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { nl2br } from '@utils/help';
import { useTranslation } from 'react-i18next';

interface IModal {
    contents: string;
    title: string;
    setDescriptionModal: any;
}

function AssetsModalContainer({
    contents,
    setDescriptionModal,
    title,
}: IModal) {
    const { t } = useTranslation();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <ModalContainer>
            <ModalBody>

                <ModalHeader>{title}</ModalHeader>
                <AssetsInfoContents>
                    <AssetsInfoDescriptionBox dangerouslySetInnerHTML={{ __html: nl2br(contents) }} />
                    <AssetsInfoButton onClick={() => setDescriptionModal(false)}>{t('AssetsDetail.modalCheck')}</AssetsInfoButton>
                </AssetsInfoContents>

            </ModalBody>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
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
    padding: 53px 30px;
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

const AssetsInfoContents = styled.div`
    margin-top: 27px;
    display: flex;
    flex-direction: column;
    max-height: 700px;
`;

const AssetsInfoDescriptionBox = styled.div`
    margin-top: 21px;
    font-size: 14px;
    color: ${colors.Black100};
    line-height: 1.7;
    max-height: 500px;
    overflow-y: auto;
    margin-bottom: 20px;
`;

const AssetsInfoButton = styled.div`
    margin-top: auto;
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

export default AssetsModalContainer;
