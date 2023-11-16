import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { IMintState } from '@interface/assets';

// Components
import RoyaltyModal from '@components/detail/modals/RoyaltyModal';
import FormCheckModal from '@components/detail/modals/FormCheckModal';
import FormSaveModal from '@components/detail/modals/FormSaveModal';

interface IModal {
    isRoyalty?: boolean;
    isFormCheck?: boolean;
    isFormSave: boolean;
    setRoyalty?: any;
    formCheckCallback?: any;
    submitData?: any;
    mintLoading: IMintState;
    quantity?: number;
}

function CreateModalContainer({
    isRoyalty,
    isFormCheck,
    isFormSave,
    setRoyalty,
    formCheckCallback,
    submitData,
    mintLoading,
    quantity,
}: IModal) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <ModalContainer>
            <ModalBody>
                {isRoyalty && (
                    <RoyaltyModal
                        setRoyalty={setRoyalty}
                    />
                )}

                {isFormCheck && quantity && (
                    <FormCheckModal
                        formCheckCallback={formCheckCallback}
                        submitData={submitData}
                        quantity={quantity}
                    />
                )}

                {isFormSave && (
                    <FormSaveModal
                        mintLoading={mintLoading}
                    />
                )}
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

export default CreateModalContainer;
