import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { nl2br } from '@utils/help';

interface IServerCheck {
    message: string;
}

function ServerChecked({ message }: IServerCheck) {
    return (
        <Sections>
            <Container>
                <Title>시스템 점검 중 입니다.</Title>
                <EnTitle>This site is under maintenance</EnTitle>
                <Description>서비스 이용에 불편을 드려 죄송합니다.</Description>
                <MessageBox>
                    <NoticeIcon src="/img/common/ic_notice.svg" />
                    <Messages dangerouslySetInnerHTML={{ __html: nl2br(message) }} />
                </MessageBox>
                <Information>점검의 자세한 내용은 탄탄 고객센터에서 확인하세요.</Information>
                <CustomerButton onClick={() => window.open('https://conuts.zendesk.com/hc/ko')}>
                    고객센터 바로가기
                </CustomerButton>
            </Container>
        </Sections>
    );
}

const Sections = styled.div`
    background-image: url('/img/common/ic_404_bg.svg');
    width: 1920px;
    height: 1080px;
    background-color: ${colors.Black200};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Container = styled.div`
    width: 434px;
    margin: 0 auto;
`;

const Title = styled.div`
    color: ${colors.White100};
    font-size: 40px;
    font-weight: 500;
`;

const EnTitle = styled.div`
    margin-top: 13px;
    color: ${colors.WarmGray600};
`;

const Description = styled.div`
    color: ${colors.White100};
    font-size: 20px;
    margin-top: 8px;
    margin-bottom: 6px;
`;

const Messages = styled.div`
    color: ${colors.White100};
    font-size: 14px;
`;

const Information = styled.div`
    color: ${colors.White100};
    font-size: 14px;
    margin-top: 40px;
`;

const CustomerButton = styled.div`
    width: 200px;
    height: 58px;
    border: 1px solid ${colors.White100};
    border-radius: 8px;
    color: ${colors.White100};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    cursor: pointer;
`;

const MessageBox = styled.div`
    display: flex;
    align-items: flex-start;
`;

const NoticeIcon = styled('img')`
    margin-right: 8px;
`;

export default ServerChecked;
