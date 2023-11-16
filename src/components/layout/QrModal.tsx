import React, { useEffect } from 'react';
import styled from '@emotion/styled/macro';
import { KlipKey } from '@recoil/auth';
import { rgba } from 'emotion-rgba';
import { colors } from '@styles/ui_palette';
import QRCode from 'qrcode.react';
import Countdown from 'react-countdown';

// recoil
import { useRecoilState } from 'recoil';

interface ITime {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}

function QrModal() {
    const [requestKey, setRequestKey] = useRecoilState<string>(KlipKey);
    const month = Date.now() + 300000;
    // 300000 5분

    const renderer = ({
        minutes, seconds, completed,
    }: ITime) => {
        if (completed) {
            setRequestKey('');
        }
        // Render a countdown
        return (
            <CountBox>
                <Time>
                    <span>남은시간</span>
                    {minutes.toString().length > 1 ? minutes : `0${minutes}`}
                    :
                    {seconds.toString().length > 1 ? seconds : `0${seconds}`}
                </Time>
            </CountBox>
        );
    };

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <QrModalContainer>
            <QrBox>
                <QrTitle>
                    지갑 서명하기
                    <QrClose
                        src="/img/common/ic_qr_modal_close.svg"
                        onClick={() => setRequestKey('')}
                    />
                </QrTitle>

                <KlipLogo src="/img/common/ic_klip_logo.svg" />
                <KlipInfo>
                    QR코드를 스캔하여 클립지갑을 연결해 주세요.
                </KlipInfo>
                <QrImage>
                    <QRCode
                        value={`https://klipwallet.com/?target=/a2a?request_key=${requestKey}`}
                        renderAs="canvas"
                        size={170}
                    />
                </QrImage>

                <Countdown
                    date={month}
                    renderer={renderer}
                />
            </QrBox>
        </QrModalContainer>
    );
}

const QrClose = styled('img')`
    width: 20px;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    right: 0;
    cursor: pointer;
`;

const KlipLogo = styled('img')`
    width: 80px;
    margin-top: 35px;
`;

const KlipInfo = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    margin-top: 12px;
`;

const QrImage = styled.div`
    margin: 0 auto;
    margin-top: 24px;
    width: 170px;
    height: 170px;
`;

const QrModalContainer = styled.div`
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

const QrBox = styled.div`
    width: 500px;
    height: 540px;
    background-color: ${colors.White100};
    border-radius: 12px;
    padding: 0 30px;
    text-align: center;
`;

const QrTitle = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    color: ${colors.Black100};
    border-bottom: 1px solid ${colors.BlueGray400};
    position: relative;
`;

const Time = styled.span`
    font-size: 14px;
    color: ${colors.Red200};

    span {
        color: ${colors.BlueGray800};
        margin-right: 7px;
    }
`;

const CountBox = styled.div`
    margin: 0 auto;
    margin-top: 24px;
`;

export default QrModal;
