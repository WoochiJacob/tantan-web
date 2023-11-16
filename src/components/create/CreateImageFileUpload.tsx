/* eslint-disable no-restricted-globals */
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useTranslation } from 'react-i18next';

interface IFileUpload {
    register: any;
    onChange: (event: any, type: string) => Promise<void>;
    assetUrl: IAssetUrl;
    setAssetUrl: any;
    setValue: any;
}

interface IAssetUrl {
    url: string | null;
    type: string;
}

function CreateImageFileUpload({
    register,
    onChange,
    assetUrl,
    setAssetUrl,
    setValue,
}: IFileUpload) {
    const { t } = useTranslation();
    const [isDrag, setIsDrag] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const fileInput = useRef<any>();

    const onClearAttachment = () => {
        setAssetUrl({
            url: null,
            type: '',
        });
        setValue('file', null, { shouldValidate: true });

        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    const clearInput = async (event: any, type: string) => {
        await onChange(event, type);

        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };

    return (
        <>
            {/* 파일 업로드 미리보기 */}
            {assetUrl.url && (
                <PreviewImageBox
                    onMouseEnter={() => setIsDelete(true)}
                    onMouseLeave={() => setIsDelete(false)}
                >
                    <Images
                        src={assetUrl.url}
                    />
                    {isDelete && (
                        <ImagesHover onClick={onClearAttachment}>
                            <div>
                                <DeleteIcon src="/img/create/ic_create_delete.svg" />
                                <DeleteText>{t('Create.deleteImage')}</DeleteText>
                            </div>
                        </ImagesHover>
                    )}
                </PreviewImageBox>
            )}

            {/* 파일업로드 전 */}
            {!assetUrl.url && (
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
                        {t('Create.dragImage')}
                    </FileuploadItems>

                    <InputFileupload
                        {...register('file', { required: !(assetUrl.url !== null) })}
                        id="ImageFileupload"
                        type="file"
                        name="file"
                        ref={fileInput}
                        onChange={() => clearInput(event, 'image')}
                    />
                </FileuploadBox>
            )}
        </>
    );
}

const InputFileupload = styled.input`
    opacity: 0;
    width: 580px;
    height: 580px;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
`;

const FileuploadBox = styled.label<{isDrag: boolean}>`
    width: 580px;
    height: 580px;
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
    width: 580px;
    min-height: 580px;
    border-radius: 12px;
    padding: 12px;
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
    font-size: 16px;
    color: ${colors.Black100};
    text-align: center;
    font-weight: 500;
`;

const Images = styled('img')`
    width: 100%;
`;

const DeleteIcon = styled('img')`
    width: 124px;
`;

const DeleteText = styled.div`
    text-align: center;
    color: ${colors.White100};
    font-size: 14px;
    margin-top: 34px;
`;

const FileuploadImages = styled('img')`
    width: 124px;
    display: block;
    margin: 0 auto;
    margin-bottom: 42px;
`;

export default CreateImageFileUpload;
