import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

// Interface
import { IModal } from '@interface/home';

function HomeSlideGuideModal({ toggle, children, title }: IModal) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handdleClick = (e: any) => {
        e.stopPropagation();
        toggle('', '', false);
    };

    return (
        <>
            <Container onClick={handdleClick} />
            <Modals>
                <ModalHead>
                    {title}
                    <CloseButton onClick={() => toggle('', '', false)} />
                </ModalHead>
                <ModalBody>
                    {children}
                    <SnsButton>
                        <Button onClick={() => window.open('https://twitter.com/conutsquareNFT')}>
                            <SnsName>
                                <SnsIcon src="/img/main/modal/ic_twitter.png" />
                                Our Twitter
                            </SnsName>
                        </Button>
                        <Button onClick={() => window.open('https://www.instagram.com/conutsquareNFT')}>
                            <SnsName>
                                <SnsIcon src="/img/main/modal/ic_instargram.png" />
                                Our Instagram
                            </SnsName>
                        </Button>
                    </SnsButton>
                </ModalBody>
            </Modals>
        </>
    );
}

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10001;
    background-color: ${rgba(colors.Black200, 0.8)};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Modals = styled.div`
    width: 500px;
    background-color: ${colors.White100};
    border-radius: 12px;
    min-height: 512px;
    padding: 30px;
    padding-top: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10002;
`;

const ModalHead = styled.div`
    font-size: 18px;
    font-weight: 500;
    color: ${colors.Black100};
    padding: 14px 0;
    border-bottom: 1px solid ${colors.WarmGray200};
    text-align: center;
    position: relative;
`;

const ModalBody = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    min-height: 340px;
`;

const SnsButton = styled.div`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled.div`
    flex-basis: 210px;
    border-radius: 29px;
    height: 58px;
    background-color: ${colors.BlueGray300};
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: ${colors.Black100};
    padding: 0 18px;
    cursor: pointer;
    transition: all .2s ease;

    &::after {
        width: 8px;
        height: 12px;
        background-image: url('/img/main/modal/ic_more_arrow_black.svg');
        cursor: pointer;
        transition: all .2s ease;
        margin-left: 4px;
        content: '';
        display: block;
        transition: all .2s ease;
    }

    &:hover {
        text-decoration: underline;
        background-color: ${colors.BlueGray400};

        &::after {
            transition: all .2s ease;
            background-image: url('/img/main/modal/ic_more_arrow_black.svg');
        }   
    }
`;

const SnsName = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    color: ${colors.Black100};
`;

const SnsIcon = styled('img')`
    width: 24px;
    margin-right: 8px;
`;

const CloseButton = styled.div`
    width: 32px;
    height: 32px;
    background-image: url('/img/main/modal/ic_modal_close.svg');
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    cursor: pointer;
    transition: all .2s ease;

    &:hover {
        transition: all .2s ease;
        background-image: url('/img/main/modal/ic_modal_close_black.svg');
    }
`;

export default HomeSlideGuideModal;
