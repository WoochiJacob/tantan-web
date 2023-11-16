/* eslint-disable no-restricted-globals */
import React, { useRef, useState } from 'react';
import styled from '@emotion/styled/macro';
import { colors } from '@styles/ui_palette';
import { rgba } from 'emotion-rgba';
import { useTranslation } from 'react-i18next';

interface IFileUpload {
    onChange: (event: any, type: string) => Promise<void>;
    assetUrl: IAssetUrl;
    setAssetUrl: any;
    setValue: any;
}
interface IAssetUrl {
    url: string | null;
    type: string;
}

function CreateVideoFileUpload({
    onChange,
    assetUrl,
    setAssetUrl,
    setValue,
}: IFileUpload) {
    const { t } = useTranslation();
    const [isDrag, setIsDrag] = useState<boolean>(false);
    // const videoType = ['video/ogg', 'video/mp4', 'video/webm'];
    // const audioType = ['audio/ogg', 'audio/mpeg', 'audio/wav'];
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
                <>
                    <PreviewImageBox>
                        <VideoBox>
                            <Video
                                loop
                                autoPlay
                                controls
                                controlsList="nodownload"
                            >
                                <source
                                    src={assetUrl.url}
                                    type="video/mp4"
                                />
                            </Video>
                            {/* {audioType.includes(assetUrl.type) && (
                                <Audio
                                    loop
                                    autoPlay
                                    controls
                                    controlsList="nodownload"
                                >
                                    <source
                                        src={assetUrl.url}
                                        type="audio/mpeg"
                                    />
                                </Audio>
                            )} */}
                        </VideoBox>
                    </PreviewImageBox>
                    <PreviewBoxBottom>
                        <FileUploadNotice url>
                            <NoticeTitle>{t('Create.dragVideoTitle')}</NoticeTitle>
                            <NoticeBox>
                                <NoticeItems>
                                    {t('Create.dragVideoContents_01')}
                                </NoticeItems>
                                <NoticeItems>
                                    {t('Create.dragVideoContents_02')}
                                </NoticeItems>
                            </NoticeBox>
                        </FileUploadNotice>

                        <InputFileupload
                            id="VideoFileupload"
                            type="file"
                            name="fileAfter"
                            ref={fileInput}
                            onChange={() => clearInput(event, 'video')}
                            url
                        />
                    </PreviewBoxBottom>
                    <DeleteButton onClick={onClearAttachment}>
                        {t('Create.deleteVideo')}
                    </DeleteButton>
                </>
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
                            src="/img/create/ic_create_video.svg"
                        />

                        <FileUploadNotice url={false}>
                            <NoticeTitle>{t('Create.dragVideoTitle')}</NoticeTitle>
                            <NoticeBox>
                                <NoticeItems>
                                    {t('Create.dragVideoContents_01')}
                                </NoticeItems>
                                <NoticeItems>
                                    {t('Create.dragVideoContents_02')}
                                </NoticeItems>
                            </NoticeBox>
                        </FileUploadNotice>

                    </FileuploadItems>

                    <InputFileupload
                        id="VideoBeforeFileupload"
                        type="file"
                        name="fileBefore"
                        ref={fileInput}
                        onChange={() => clearInput(event, 'video')}
                        url={false}
                    />
                </FileuploadBox>
            )}
        </>
    );
}

const InputFileupload = styled.input<{url: boolean}>`
    opacity: 0;
    width: 580px;
    height: ${(props) => (props.url ? '230px' : '580px')};
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

const PreviewImageBox = styled.div`
    width: 580px;
    border-radius: 12px 12px 0 0;
    padding: 42px 12px 30px 12px;
    background-color: ${colors.BlueGray200};
    border: 1px solid ${colors.BlueGray500};
    border-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;
    overflow: hidden;
`;

const PreviewBoxBottom = styled.label`
    width: 580px;
    border-radius: 0 0 12px 12px;
    background-color: ${colors.BlueGray200};
    border: 1px solid ${colors.BlueGray500};
    border-top: 0;
    padding: 12px 12px 42px 0;
    min-height: 85px;
    display: block;
    cursor: pointer;
    position: relative;
    overflow: hidden;
`;

const FileuploadItems = styled.div`
    font-size: 14px;
    color: ${colors.Black100};
    text-align: center;
`;

const Video = styled('video')`
    width: 100%;
`;

// const Audio = styled('audio')`
//     width: 100%;
// `;

const VideoBox = styled.div`
    width: 100%;
    min-height: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FileuploadImages = styled('img')`
    width: 124px;
    display: block;
    margin: 0 auto;
    margin-bottom: 33px;
`;

const FileUploadNotice = styled.div<{url: boolean}>`
    margin-top: ${(props) => (props.url ? 0 : '108px')};
`;

const NoticeTitle = styled.div`
    font-size: 16px;
    color: ${colors.Black100};
    text-align: center;
    font-weight: 500;
`;

const NoticeBox = styled.div`
    margin-top: 18px;
    text-align: center;
    cursor: pointer;
`;

const DeleteButton = styled.div`
    margin: 0 auto;
    margin-top: 18px;
    text-align: center;
    cursor: pointer;
    width: 200px;
    height: 50px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all .2s ease;
    border: 1px solid transparent;
    
    &:hover {
        transition: all .2s ease;
        background-color: ${colors.BlueGray200};
        border: 1px solid ${colors.BlueGray500}
    }
`;

const NoticeItems = styled.div`
    font-size: 13px;
    color: ${colors.Black100};
    margin-bottom: 8px;

    &:last-of-type {
        margin-bottom: 0;
    }
`;

export default CreateVideoFileUpload;
