/* eslint-disable no-restricted-globals */
import React, { useState, useRef } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';

interface IFileUpload {
    register: any;
    onMoreChange: (event: any) => Promise<void>;
    thumbnailUrl: string | null;
    setThumbnailUrl: any;
    setValue: any;
}

function CreateDetailImage({
    register,
    onMoreChange,
    thumbnailUrl,
    setThumbnailUrl,
    setValue,
}: IFileUpload) {
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const fileInput = useRef<any>();

    const onClearAttachment = () => {
        setThumbnailUrl(null);

        setValue('itemdetail_image_file', null, { shouldValidate: true });
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    const clearInput = async (event: any) => {
        await onMoreChange(event);

        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    return (
        <>
            <Title>
                {/* <span>
                    (필수)
                </span> */}
                상세페이지 이미지 등록
            </Title>
            <Container>
                {/* 파일 업로드 미리보기 */}
                {thumbnailUrl && (
                    <PreviewImageBox
                        onMouseEnter={() => setIsDelete(true)}
                        onMouseLeave={() => setIsDelete(false)}
                    >
                        <Images
                            src={thumbnailUrl}
                        />
                        {isDelete && (
                            <ImagesHover onClick={onClearAttachment}>
                                <DeleteIcon src="/img/create/ic_create_delete.svg" />
                            </ImagesHover>
                        )}
                    </PreviewImageBox>
                )}

                {/* 파일업로드 전 */}
                {!thumbnailUrl && (
                    <FileuploadBox
                        onDragEnter={() => setIsDrag(true)}
                        onDragLeave={() => setIsDrag(false)}
                        onDrop={() => setIsDrag(false)}
                        isDrag={isDrag}
                    >
                        <FileuploadItems>
                            <FileuploadImages
                                src="/img/create/ic_create_image.svg"
                            />
                        </FileuploadItems>

                        <InputFileupload
                            {...register('itemdetail_image_file')}
                            id="ThumbnailFileupload"
                            type="file"
                            name="fileThumbnail"
                            onChange={clearInput}
                        />
                    </FileuploadBox>
                )}
            </Container>

            {/* 파일 업로드 유의사항 */}
            <NoticeItems>
                <NoticeItemText>
                    상세페이지 이미지는 20MB 이하의 JPG, PNG, GIF만 지원합니다.
                </NoticeItemText>
            </NoticeItems>
        </>
    );
}

const Title = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.Black200};
    margin-top: 24px;

    span {
        color: ${colors.Red100};
        margin-right: 4px;
    }
`;

const Container = styled.div`
    display: flex;
    margin-top: 12px;
`;

const InputFileupload = styled.input`
    opacity: 0;
    width: 220px;
    height: 220px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
`;

const FileuploadBox = styled.label<{isDrag: boolean}>`
    width: 100%;
    height: 220px;
    border: 1px solid ${colors.BlueGray500};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    background-color: ${(props) => (props.isDrag ? rgba(colors.Black100, 0.1) : colors.BlueGray200)};
`;

const ImagesHover = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${rgba(colors.Black200, 0.7)};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const PreviewImageBox = styled.div`
    width: 100%;
    border-radius: 12px;
    padding: 6px; 
    background-color: ${colors.BlueGray200};
    border: 1px solid ${colors.BlueGray500};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    overflow: hidden;
`;

const FileuploadItems = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    text-align: center;
`;

const Images = styled('img')`
    width: 100%;
`;

const DeleteIcon = styled('img')`
    width: 110px;
`;

const FileuploadImages = styled('img')`
    width: 110px;
`;

const NoticeItems = styled.div`
    margin-top: 8px;
`;

const NoticeItemText = styled.div`
    margin-bottom: 4px;
    font-size: 13px;
    color: ${colors.BlueGray700};
    position: relative;
    padding-left: 14px;

    &::before {
        width: 3px;
        height: 3px;
        border-radius: 50%;
        content: '';
        background-color: ${colors.BlueGray700};
        display: block;
        position: absolute;
        left: 0;
        top: 8px;
    }
`;

export default CreateDetailImage;
