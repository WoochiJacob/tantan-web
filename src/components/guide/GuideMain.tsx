import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nl2br } from '@utils/help';

function Guide() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handdleBack = (): void => {
        navigate('/');
    };

    return (
        <GuideMainSection>
            <Coninater>
                <BackButton onClick={handdleBack}>{t('Guide.backButton')}</BackButton>
                <Title>
                    TanTan Market
                    <br />
                    <span>User guide</span>
                </Title>
                <Contents>
                    <Step>1</Step>
                    <StepTitle>{t('Guide.step_01_Title')}</StepTitle>
                    <StepDescription>
                        <StepDescriptionText
                            dangerouslySetInnerHTML={{ __html: nl2br(t('Guide.step_01_Desc_01')) }}
                        />{' '}
                        <StepDescriptionActiveText
                            dangerouslySetInnerHTML={{ __html: nl2br(t('Guide.step_01_Desc_02')) }}
                        />
                        <StepDescriptionText
                            dangerouslySetInnerHTML={{ __html: nl2br(t('Guide.step_01_Desc_03')) }}
                        />
                    </StepDescription>
                </Contents>
            </Coninater>
        </GuideMainSection>
    );
}

const GuideMainSection = styled.section`
    background-color: ${colors.Black200};
    background-image: url('/img/guide/img_guide_main.png');
    background-repeat: no-repeat;
    width: 100%;
    height: 818px;
`;

const Coninater = styled.div`
    width: 1280px;
    padding: 61px 20px;
    margin: 0 auto;
`;

const BackButton = styled.div`
    font-size: 14px;
    color: ${colors.White100};
    display: flex;
    align-items: center;
    cursor: pointer;

    &:before {
        width: 32px;
        height: 22px;
        background-image: url('/img/guide/ic_back.svg');
        content: '';
        display: block;
        margin-right: 18px;
    }
`;

const Title = styled.div`
    font-size: 48px;
    color: ${colors.White100};
    font-family: ${fonts.Tinos};
    line-height: 1.3;
    text-align: center;
    margin-top: 40px;

    span {
        color: ${colors.Orange100};
        font-family: ${fonts.Tinos};
    }
`;

const Contents = styled.div`
    padding-top: 234px;
    padding-left: 640px;
`;

const Step = styled.div`
    font-size: 34px;
    color: ${colors.White100};
    font-family: ${fonts.Tinos};
    position: relative;

    &:before {
        width: 31px;
        height: 1px;
        display: block;
        background: ${colors.Orange100};
        content: '';
        transform: rotate(-45deg);
        position: absolute;
        bottom: 6px;
        left: 5px;
    }
`;

const StepTitle = styled.div`
    margin-top: 23px;
    font-size: 24px;
    color: ${colors.White100};
    font-weight: 500;
`;

const StepDescription = styled.div`
    margin-top: 34px;
    color: ${colors.WarmGray400};
    font-size: 14px;
`;

const StepDescriptionText = styled.span``;

const StepDescriptionActiveText = styled.span`
    color: ${colors.Orange100};
`;

export default Guide;
