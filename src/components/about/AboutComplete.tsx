import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useTranslation } from 'react-i18next';
import { nl2br } from '@utils/help';

function AboutComplete() {
    const { t } = useTranslation();
    const handleMoreLink = () => {
        window.open('https://forms.gle/xmxny3Jt7AzXkKz9A');
    };
    return (
        <SectionConinater>
            <StepSection>
                <StepBox>
                    <Images
                        src="/img/guide/img_guide_complete_emoji.png"
                    />
                    <Title dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutCompleteTitle')) }} />
                    <Description dangerouslySetInnerHTML={{ __html: nl2br(t('About.aboutCompleteDesc')) }} />
                    <Button onClick={handleMoreLink}>
                        {t('About.aboutCompleteButton')}
                    </Button>
                </StepBox>
            </StepSection>
        </SectionConinater>
    );
}

const SectionConinater = styled.div`
    background: ${colors.Black200};
    padding-top: 220px;
    height: 880px;
    background-image: url('/img/about/img_home_story4.png');
`;

const Images = styled('img')`
    width: 205px;
`;

const StepSection = styled.div`
    width: 1280px;
    padding: 0 20px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    padding-right: 100px;
`;

const StepBox = styled.div``;

const Title = styled.div`
    margin-top: 14px;
    font-size: 24px;
    color: ${colors.White100};
    line-height: 1.7;
    font-weight: 500;
`;

const Description = styled.div`
    margin-top: 24px;
    font-size: 14px;
    color: ${colors.BlueGray700};
    line-height: 1.7;
    font-weight: 500;
`;

const Button = styled.button`
    background-color: ${rgba(colors.White100, 0.1)};
    color: ${colors.White100};
    width: 257px;
    height: 50px;
    border-radius: 8px;
    border: 0;
    cursor: pointer;
    margin-top: 74px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    font-size: 14px;

    &::after {
        width: 10px;
        height: 22px;
        display: block;
        background-image: url('/img/about/ic_complete.png');
        content: '';
    }
`;

export default AboutComplete;
