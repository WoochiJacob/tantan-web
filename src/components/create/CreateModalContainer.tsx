import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

// Components
import RoyaltyModal from '@components/create/RoyaltyModal';
import CategoryModal from '@components/create/CategoryModal';
import BlockChainModal from '@components/create/BlockChainModal';
import SupplyModal from '@components/create/SupplyModal';
import FormCheckModal from '@components/create/FormCheckModal';
import MarketFormCheckModal from '@components/create/MarketFormCheckModal';
import FormSaveModal from '@components/create/FormSaveModal';

interface IModal {
    isRoyalty?: boolean;
    isCategory?: boolean;
    isFormCheck?: boolean;
    isMarketFormCheck?: boolean;
    isFormSave?: boolean;
    isBlockChain?: boolean;
    setRoyalty?: any;
    setCategory?: any;
    formCheckCallback?: any;
    submitData: any;
    mintLoading: any;
    setBlockChain?: any;
    isSupply?: any;
    setSupply?: any;
    saveTitle: string;
}

function CreateModalContainer({
    isCategory,
    isRoyalty,
    isFormCheck,
    isMarketFormCheck,
    isFormSave,
    setRoyalty,
    setCategory,
    formCheckCallback,
    submitData,
    mintLoading,
    isBlockChain,
    setBlockChain,
    saveTitle,
    isSupply,
    setSupply,
}
: IModal) {
    const handdleModalClose = () => {
        if (isCategory) {
            setCategory(false);
        }

        if (isRoyalty) {
            setRoyalty(false);
        }

        if (isBlockChain) {
            setBlockChain(false);
        }
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <>
            <ModalContainer onClick={handdleModalClose} />
            <ModalBody>
                {isCategory && (
                    <CategoryModal
                        setCategory={setCategory}
                    />
                )}

                {isBlockChain && (
                    <BlockChainModal
                        setBlockChain={setBlockChain}
                    />
                )}

                {isSupply && (
                    <SupplyModal
                        setSupply={setSupply}
                    />
                )}

                {isRoyalty && (
                    <RoyaltyModal
                        setRoyalty={setRoyalty}
                    />
                )}

                {isFormCheck && (
                    <FormCheckModal
                        formCheckCallback={formCheckCallback}
                        submitData={submitData}
                    />
                )}

                {isMarketFormCheck && (
                    <MarketFormCheckModal
                        formCheckCallback={formCheckCallback}
                        submitData={submitData}
                    />
                )}

                {isFormSave && (
                    <FormSaveModal
                        mintLoading={mintLoading}
                        saveTitle={saveTitle}
                    />
                )}
            </ModalBody>
        </>
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
    z-index: 10001;
`;

const ModalBody = styled.div`
    width: 500px;
    background-color: ${colors.White100};
    border-radius: 12px;
    padding: 53px 30px;
    padding-top: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10002;
`;

export default CreateModalContainer;
