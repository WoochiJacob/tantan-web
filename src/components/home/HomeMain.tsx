import React from 'react';
import styled from '@emotion/styled/macro';
import { TypeAnimation } from 'react-type-animation';

function HomeMain() {
    return (
        <Contain>
            <MainTitle />

            <TypeAnimation
                sequence={[
                    '탄탄...',
                    3000,
                    'WEB3 인큐베이팅 플랫폼 ',
                    3000, // Waits 2s
                    'Mixed Reality 마켓플레이스',
                    3000, // Waits 2s
                ]}
                wrapper="span"
                cursor
                speed={20}
                repeat={Infinity}
                style={{ fontSize: '26px', fontWeight: '700', display: 'inline-block' }}
            />
        </Contain>
    );
}

const Contain = styled.div`
    flex-basis: calc(100% - 1054px);
`;

const MainTitle = styled.div`
    background: url('/img/home/img_main_title.svg');
    width: 390px;
    height: 75px;
    margin-bottom: 20px;
`;

export default HomeMain;
