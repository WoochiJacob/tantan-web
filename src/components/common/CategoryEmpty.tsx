import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

interface IProps {
    title?: string;
}

function CategoryEmpty({ title }: IProps) {
    return (

        <CategoryEmptyBox>
            <EmptyBox>
                <EmptyImage src="/img/common/ic_empty.png" />
                <EmptyText>{title}</EmptyText>
            </EmptyBox>
        </CategoryEmptyBox>

    );
}

const CategoryEmptyBox = styled.div`
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${rgba(colors.White100, 0.2)};
    margin-top: 40px;
    border-radius: 12px;
`;

const EmptyBox = styled.div`
    text-align: center;
`;

const EmptyText = styled.div`
    font-size: 14px;
    margin-top: 10px;
    color: ${colors.BlueGray700};
`;

const EmptyImage = styled('img')`
    width: 144px;
    margin: 0 auto;
`;

export default CategoryEmpty;
