import React from 'react';
import styled from '@emotion/styled/macro';
import moment from 'moment';
import { colors } from '@styles/ui_palette';

// Components
import FooterGnb from '@components/layout/footer/FooterGnb';
import FooterInformation from '@components/layout/footer/FooterInformation';

function Footer() {
    return (
        <>
            <CustomCenterBox>
                <CustomCenter>
                    <Mail href="mailto:cs@tantancarbon.com">
                        이메일 문의하기
                        <CustomCenterIcon src="/img/layout/footer/ic_custom_center.svg" />
                    </Mail>
                </CustomCenter>
            </CustomCenterBox>

            <FooterGnb />

            <CopyRightsSection>
                <CopyRightsContainer>
                    <CopyRightsBox>
                        <CompanyInfo>
                            <Company type="text">(주) e-ETS</Company>
                            <Company type="bar">|</Company>
                            <Company type="text">대표 권한주</Company>
                            <Company type="bar">|</Company>
                            <Company type="text">사업자등록번호 331-87-03009</Company>
                            <Company type="bar">|</Company>
                            <Company type="text">대표전화 02-6217-3000</Company>
                            <Company type="bar">|</Company>
                            <Company type="text">대표메일주소 cs@tantancarbon.com</Company>
                        </CompanyInfo>
                        <CompanyInfo>
                            <Company type="text">
                                (04799) 서울시 성동구 아차산로 17길 57, 일신건영휴먼테코 901호
                            </Company>
                            <Company type="bar">|</Company>
                            <Company type="text">
                                통신판매업신고번호 제 2023-서울성동-1285 호
                            </Company>
                            <Company type="bar">|</Company>
                            <Company type="text">개인정보보호책임자 권한주</Company>
                        </CompanyInfo>
                        <CopyRights>
                            ©{moment().format('YYYY')}
                            E-ETS CO.LTD. ALL RIGHTS RESERVED.
                        </CopyRights>
                    </CopyRightsBox>
                </CopyRightsContainer>
            </CopyRightsSection>

            <FooterInformation />
        </>
    );
}

const CopyRightsSection = styled.div`
    margin-top: 85px;
    padding-bottom: 12px;
`;

const CopyRightsContainer = styled.div`
    width: 1600px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
`;

const CopyRights = styled.div`
    color: ${colors.BlueGray600};
    font-size: 12px;
    font-weight: 300;
`;

const CopyRightsBox = styled.div`
    flex: calc(100% - 355px);
`;

const CompanyInfo = styled.div`
    display: flex;
    align-items: center;
    flex: 1;
`;

const Company = styled.div<{ type: string; active?: boolean }>`
    margin: ${(props: { type: string }) => (props.type === 'bar' ? '0 8px' : 0)};
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 300;
    color: ${(props) => (props.active ? colors.Black100 : colors.BlueGray700)};
`;

const CustomCenterBox = styled.div`
    border-bottom: 1px solid ${colors.BlueGray400};
    border-top: 1px solid ${colors.BlueGray400};
`;

const CustomCenter = styled.div`
    width: 1600px;
    margin: 0 auto;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Mail = styled.a`
    color: ${colors.Black100};
    font-size: 13px;
    display: flex;
    align-items: center;

    &:hover {
        text-decoration: underline;
    }
`;

const CustomCenterIcon = styled('img')`
    margin-left: 4px;
`;

export default Footer;
