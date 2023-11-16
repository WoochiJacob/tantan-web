import React from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { useNavigate } from 'react-router-dom';
import { List } from '@utils/common/footer';
import { useRecoilValue } from 'recoil';

// recoil
import { UserAddress } from '@recoil/auth';

function FooterGnb() {
    const userAddress = useRecoilValue(UserAddress);
    const navigate = useNavigate();
    const footerList = List();
    const handleLogo = () => navigate('/');

    const handdleLink = (category: any) => {
        if (category.type === 'out') {
            window.open(category.url);
            return;
        }

        if (category.url === '/mypage') {
            if (userAddress.address === '') {
                window.location.assign(`/login?location=${window.location.pathname}`);
                return;
            }
            navigate(`${category.url}/${userAddress.address}`);
            return;
        }

        if (category.url === '/create') {
            if (userAddress.address === '') {
                window.location.assign(`/login?location=${window.location.pathname}`);
                return;
            }
            navigate(category.url);
            return;
        }

        navigate(category.url);
    };

    return (
        <FooterGnbSection>
            <FooterGnbContainer>
                <CustomerBox>
                    <Logo onClick={handleLogo}>
                        <LogoImage src="/img/layout/footer/img_footer_logo.png" alt="logo" />
                    </Logo>
                    <CustomerCenter>
                        <CustomerCenterTitle>
                            고객만족센터 (주말 및 공휴일 휴무)
                        </CustomerCenterTitle>
                        <CenterNumberTitle>
                            전화상담 / 카카오톡 상담 가능 시간
                            <span>평일 10:00 ~ 16:00</span>
                        </CenterNumberTitle>
                        <CenterNumberNumber>
                            전화상담
                            <span>02 . 6217 . 3000</span>
                        </CenterNumberNumber>
                    </CustomerCenter>
                </CustomerBox>
                <CategoryGroup>
                    {footerList.map((categoryItems, index) => (
                        <CategoryItem key={`${index}-${categoryItems.title}`}>
                            <CategoryTitle>{categoryItems.title}</CategoryTitle>
                            <GnbList>
                                {categoryItems.item.map((category) => (
                                    <Category key={`${index}-${category.name}-category`}>
                                        <CategoryLink
                                            onClick={() => handdleLink(category)}
                                            isBold={category.bold}
                                        >
                                            {category.name}
                                        </CategoryLink>
                                    </Category>
                                ))}
                            </GnbList>
                        </CategoryItem>
                    ))}
                </CategoryGroup>
            </FooterGnbContainer>
        </FooterGnbSection>
    );
}

const LogoImage = styled('img')`
    width: 261px;
`;

const FooterGnbSection = styled.div``;

const FooterGnbContainer = styled.footer`
    width: 1600px;
    padding-top: 24px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

const Logo = styled.div`
    width: 162px;
    cursor: pointer;
    position: relative;
`;

const CustomerBox = styled.div``;

const CategoryGroup = styled.div`
    flex-basis: 50%;
    display: flex;
    justify-content: flex-end;
`;

const CustomerCenter = styled.div`
    margin-top: 20px;
`;

const CategoryItem = styled.div`
    flex-basis: 15%;
    margin-left: 55px;
`;

const CategoryTitle = styled.div`
    font-size: 20px;
    color: ${colors.Black100};
    font-weight: 700;
`;

const GnbList = styled.div`
    margin-top: 12px;
`;

const Category = styled.div`
    margin-bottom: 10px;
`;

const CategoryLink = styled.span<{ isBold: boolean }>`
    font-size: 13px;
    color: ${colors.Black100};
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: ${(props) => (props.isBold ? '500' : '300')};

    &:hover {
        transition: all 0.2s ease;
        text-decoration: underline;
        color: ${colors.Black100};
    }
`;

const CustomerCenterTitle = styled.div`
    font-size: 16px;
    font-weight: 500;
    color: ${colors.Black100};
`;

const CenterNumberTitle = styled.div`
    margin-top: 10px;
    font-size: 14px;
    color: ${colors.Black100};
    font-weight: 300;

    span {
        font-weight: 400;
        margin-left: 4px;
    }
`;

const CenterNumberNumber = styled.div`
    margin-top: 24px;
    font-size: 14px;
    font-weight: 400;
    color: ${colors.Black100};
    display: flex;
    align-items: center;

    span {
        margin-left: 16px;
        font-size: 28px;
        font-weight: 300;
    }
`;

export default FooterGnb;
