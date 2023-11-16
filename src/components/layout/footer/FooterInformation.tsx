import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';

function FooterInformation() {
    return (
        <Container>
            <InformationBox>
                탄탄 페이지 내 노출되는 모든 콘텐츠 정보는 상품판매자가 제공하고 있으며, 투자 또는 거래의 권유를 목적으로 하지 않습니다.
                <br />
                해당 정보는 서비스 이용을 위한 보조 자료로 참고해 주시기 바랍니다. 탄탄은 상품 판매 중개자이며, 상품 거래의 당사자가 아닙니다.
                <br />
                상품 거래에 관한 일체의 책임은 판매자가 부담합니다.
            </InformationBox>
        </Container>
    );
}

const Container = styled.div`
    width: 1600px;
    margin: 0 auto;
    display: flex;
    align-content: center;
    justify-content: space-between;
    padding-top: 30px;
    padding-bottom: 52px;
    border-top: 1px solid ${colors.BlueGray400};
`;

const InformationBox = styled.div`
    font-size: 13px;
    font-weight: 400;
    color: ${colors.BlueGray700};
    line-height: 1.4;
`;

export default FooterInformation;
