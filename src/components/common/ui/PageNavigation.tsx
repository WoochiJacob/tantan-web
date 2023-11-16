import styled from '@emotion/styled/macro';
import Pagination from 'react-js-pagination';
import { colors } from '@styles/ui_palette';

interface IPagenation {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    pageRangeDisplayed: number;
    onChange: (page: number) => void;
}

function PageNavigation({
    activePage,
    itemsCountPerPage,
    totalItemsCount,
    pageRangeDisplayed,
    onChange,
}: IPagenation) {
    return (
        <Container>
            <Pagination
                activePage={activePage}
                itemsCountPerPage={itemsCountPerPage}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={pageRangeDisplayed}
                prevPageText={(<ArrowIcon src="/img/common/arrow_left.svg" />)}
                firstPageText={(<ArrowIcon src="/img/common/arrow_left_end.svg" />)}
                nextPageText={(<ArrowIcon src="/img/common/arrow_right.svg" />)}
                lastPageText={(<ArrowIcon src="/img/common/arrow_right_end.svg" />)}
                linkClassFirst="button-styled"
                linkClassPrev="button-styled"
                linkClassNext="button-styled"
                linkClassLast="button-styled"
                itemClassFirst="li-button-styled"
                itemClassPrev="li-button-styled"
                itemClassNext="li-button-styled"
                itemClassLast="li-button-styled"
                onChange={onChange}
            />
        </Container>
    );
}

const ArrowIcon = styled('img')``;

const Container = styled.div`
    .pagination {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    ul {
        list-style: none;
        padding: 0;
        display: flex;    
        align-items: center;
        margin: 0;

        & li {
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            margin: 0 8px;
            width: 34px;
            height: 34px;

            &:first-of-type {
                border-radius: 5px 0 0 5px;
            }

            &:last-of-type {
                border-radius: 0 5px 5px 0;
            }

            & a {
                text-decoration: none;
                color: ${colors.Black200};
                font-size: 14px;
                width: 34px;
                height: 34px;
                display: flex;
                justify-content: center;
                align-items: center;

                &:hover {
                    text-decoration: underline;
                }
            }

            &.active a {
                color: ${colors.White100};

                &:hover {
                    text-decoration: underline;
                }
            }

            &.active {
                background-color: ${colors.Black200};
            }

            .button-styled {
                width: 54px;
                height: 54px;
                border-radius: 50%;

                &:hover {
                    background-color: ${colors.BlueGray400};
                }
            }

            &.li-button-styled {
                width: 54px;
                height: 54px;
                border-radius: 50%;

                &:hover {
                    background-color: ${colors.BlueGray400};
                }
            }
        }
    }
`;

export default PageNavigation;
