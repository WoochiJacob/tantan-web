import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';
import { fonts, colors } from '@styles/ui_palette';
import { useTranslation } from 'react-i18next';

// components
import AboutMainVisualImage from '@components/about/AboutMainVisualImage';
import { rgba } from 'emotion-rgba';

function AboutMainVisual() {
    const { t } = useTranslation();

    return (
        <AboutMainVisualSection>
            <Container>
                {/* 메인 타이틀 */}
                <AboutTitleBox>
                    <MainTitle>
                        {t('About.title')}
                        <TitleSpan>{t('About.subTitle')}</TitleSpan>
                    </MainTitle>
                    <SubTitle>
                        탄탄은 즐거움 과 참여라는 새로운 가치로 꾸며진 실물과
                        {' '}
                        <br />
                        디지털의 퓨전마켓플레이스 입니다.
                    </SubTitle>

                    <Guide>
                        <Link to="/guide">{t('About.aboutGuideText')}</Link>
                    </Guide>
                </AboutTitleBox>

                {/* 메인 이미지 */}
                <AboutMainVisualImage />
            </Container>
        </AboutMainVisualSection>
    );
}

const AboutMainVisualSection = styled.section`
    background-color: ${colors.Black200};
    background-image: url('/img/main/main_visual.svg');
    background-repeat: no-repeat;
    width: 100%;
`;

const Container = styled.div`
    width: 1280px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    height: 940px;
`;

const AboutTitleBox = styled.div`
    flex-basis: calc(100% - 474px);
    width: calc(100% - 474px);
    padding-left: 154px;
    padding-top: 100px;
`;

const MainTitle = styled.div`
    font-size: 42px;
    color: ${colors.White100};
    font-family: ${fonts.Tinos};
    line-height: 1.2;
`;

const TitleSpan = styled.div`
    font-family: ${fonts.Tinos};
    color: ${colors.White100};
`;

const SubTitle = styled.div`
    margin-top: 49px;
    font-size: 14px;
    font-weight: 400;
    color: ${colors.White100};
    line-height: 1.7;
`;

const Guide = styled.div`
    margin-top: 250px;
    display: flex;
    align-items: center;
    width: 155px;

    &::before {
        transition: all .2s ease;
        width: 20px;
        height: 20px;
        background-image: url('/img/main/ic_guide.svg');
        content: '';
    }

    a {
        transition: all .2s ease;
        color: ${rgba(colors.White100, 0.3)};
        margin-left: 5px;
    }

    &:hover {
        &::before {
            transition: all .2s ease;
            background-image: url('/img/main/ic_guide_hover.svg');
        }

        a {
            transition: all .2s ease;
            text-decoration: underline;
            color: ${colors.White100};
        }
    }
`;

export default AboutMainVisual;
