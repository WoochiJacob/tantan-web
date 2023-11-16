import React from 'react';
import styled from '@emotion/styled/macro';

function Swap() {
    return (
        <Container>
            <SwapImage src="/img/swap/img_swap_contents.png" />
        </Container>
    );
}

const Container = styled.div`
    padding: 50px 20px 120px 20px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/img/swap/img_swap_bg.png');
`;

const SwapImage = styled('img')`
    width: 474px;
`;

export default Swap;
