import styled from '@emotion/styled/macro';
import { colors, fonts } from '@styles/ui_palette';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { nl2br } from '@utils/help';

function Error404() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <ErrorBackground>
            <Container>
                <Title>{t('404.title')}</Title>
                <Description>
                    {t('404.subTitle')}
                </Description>
                <Info dangerouslySetInnerHTML={{ __html: nl2br(t('404.description')) }} />
                <ButtonBox>
                    <Button
                        type="button"
                        left
                        onClick={() => navigate(-1)}
                    >
                        {t('404.beforePage')}
                    </Button>
                    <Button
                        type="button"
                        left={false}
                        onClick={() => navigate('/main')}
                    >
                        {t('404.mainPage')}
                    </Button>
                </ButtonBox>
            </Container>
        </ErrorBackground>
    );
}

const ErrorBackground = styled.div`
    background-image: url('/img/common/ic_404_bg.svg');
    width: 1920px;
    height: 1080px;
    background-color: ${colors.Black200};
    display: flex;
    justify-content: center;
`;

const Container = styled.div`
    margin-top: 244px;
`;

const Title = styled.div`
    font-size: 40px;
    font-family: ${fonts.Tinos};
    color: ${colors.White100};
    font-weight: 500;
`;

const Description = styled.div`
    font-size: 20px;
    color: ${colors.White100};
    margin-top: 14px;
`;

const Info = styled.div`
    margin-top: 15px;
    font-size: 14px;
    color: ${colors.White100};
    line-height: 1.6;
`;

const ButtonBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 78px;
`;

const Button = styled.button<{left: boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 58px;
    margin-right: ${(props) => (props.left ? '10px' : 0)};
    margin-left: ${(props) => (props.left ? 0 : '10px')};
    color: ${colors.White100};
    border: 1px solid ${colors.BlueGray600};
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
`;

export default Error404;
