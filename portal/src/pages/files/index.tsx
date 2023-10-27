import { createFile, createFileDirectory, deleteFile, getFileBlob, getFileList } from '@/services/File';
import { getAllFileContainerList } from '@/services/FileContainer';
import { createFileShare } from '@/services/FileShare';
import { API } from '@/services/typings';
import { showDownloadFile } from '@/services/untils';
import { FileOutlined, FolderOutlined } from '@ant-design/icons';
import {
    ActionType,
    ModalForm,
    PageContainer,
    ProForm,
    ProFormDateTimePicker,
    ProFormText,
    ProFormUploadDragger,
    ProTable,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Breadcrumb, Button, Card, Dropdown, Form, Image, Modal, Popconfirm, Select, Space, Typography, message } from 'antd';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';

const handleFileDownload = async (containerName: string, file: API.File) => {
    if (file.isDirectory) return;

    const result = await getFileBlob(containerName, file.id, { responseType: 'blob' });

    showDownloadFile(file.fileName!, result.data, 'application/stream');
};

const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
};

const dateTimePickerDisbladTimeFunc = (current) => {
    if (current) {
        return {
            disabledHours: range(0, 24),
            disabledMinutes: range(0, 30),
            disabledSeconds: range(0, 60),
        };
    } else {
        return {
            disabledHours: range(0, 24),
            disabledMinutes: range(0, 60),
            disabledSeconds: range(0, 60),
        };
    }
};

const Index: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const intl = useIntl();

    const [editFileId, setEditFileId] = useState<string>();

    const [containerList, setContainerList] = useState<API.FileContainer[]>([]);
    const [containerName, setContainerName] = useState('');

    const [fileEditModalVisible, setFileEditModalVisible] = useState(false);
    const [fileEditModalTitle, setFileEditModalTitle] = useState('');

    const [fileListFilter, setFileListFilter] = useState<string | undefined>();
    const [fileListFilterValue, setFileListFilterValue] = useState<string>();
    const [uploadModalVisible, setUploadModalVisible] = useState(false);

    const [fileParentId, setFileParentId] = useState<string>();
    const [directories, setDirectories] = useState<API.File[]>([]);

    const [imageList, setImaegList] = useState<API.File[]>([]);
    const [imagePreviewVisible, setImagePreviewVisible] = useState(false);
    const [imagePreviewIndex, setImagePreviewIndex] = useState(0);

    const [fileShareViewVisible, setFileShareViewVisible] = useState(false);
    const [fileShareResult, setFileShareResult] = useState<API.FileShareResult>();

    const handleShreFile = async (containerName: string, file: API.File) => {
        if (file.isDirectory) return;
        setFileShareResult(undefined);
        setFileShareViewVisible(true);
    };

    const handleOnFileClick = async (file: API.File) => {
        if (file.isDirectory) {
            setFileParentId(file.id);
            setDirectories([...directories, file]);
        } else {
            if (file.mimeType?.startsWith('image/')) {
                setImagePreviewVisible(true);
                setImagePreviewIndex(imageList.map((x) => x.id).indexOf(file.id));
            } else await handleFileDownload(containerName, file);
        }
    };

    const handleGoUp = () => {
        if (directories.length == 0) return;
        const latest = directories[directories.length - 2];
        setFileParentId(latest?.id);
        const directoriesCopy = [...directories];
        setDirectories(directoriesCopy.slice(0, directories.length - 1));
    };

    useEffect(() => {
        setFileListFilterValue('');
        setFileListFilter('');
        setFileParentId('');
        setDirectories([]);
    }, [containerName]);

    const loadContainers = async () => {
        const list = await getAllFileContainerList({});
        setContainerList(list?.items ?? []);
    };

    useEffect(() => {
        if (containerList.length > 0) {
            setContainerName(containerList[0].name!);
        }
    }, [containerList]);

    useAsyncEffect(async () => {
        await loadContainers();
    }, [0]);

    const getBreadcrumb = () => {
        const dirs = directories.map((item) => {
            return { title: item.fileName };
        });
        return [{ title: containerName }, ...dirs];
    };

    return (
        <PageContainer>
            <Card title={<Breadcrumb separator=">" items={getBreadcrumb()} />}>
                <ProTable<API.File>
                    actionRef={actionRef}
                    columns={[
                        {
                            dataIndex: 'fileName',
                            title: intl.formatMessage({ id: 'page.file.field.fileName' }),
                            search: false,
                            render: (text, record) => (
                                <Space>
                                    {record.isDirectory ? <FolderOutlined /> : <FileOutlined />}
                                    <Typography.Text copyable={{ text: record.fileName }} style={{ width: '100%' }}>
                                        <a onClick={() => handleOnFileClick(record)}>{text}</a>
                                    </Typography.Text>
                                </Space>
                            ),
                        },
                        {
                            dataIndex: 'length',
                            title: intl.formatMessage({ id: 'page.file.field.length' }),
                            search: false,
                            valueType: 'digit',
                            renderText: (text, record) => (record.isDirectory ? undefined : text),
                        },
                        {
                            dataIndex: 'hash',
                            title: intl.formatMessage({ id: 'page.file.field.hash' }),
                            search: false,
                            ellipsis: true,
                        },
                        {
                            dataIndex: 'creationTime',
                            title: intl.formatMessage({ id: 'page.file.field.creationTime' }),
                            search: false,
                            valueType: 'dateTime',
                        },
                        {
                            title: intl.formatMessage({ id: 'common.dict.table-action' }),
                            valueType: 'option',
                            align: 'center',
                            width: 220,
                            render: (text, record, _, action) => [
                                <a
                                    disabled={record.isDirectory}
                                    key="download"
                                    onClick={async () => {
                                        setEditFileId(record.id);
                                        await handleFileDownload(containerName, record);
                                    }}
                                >
                                    {intl.formatMessage({ id: 'page.file.download' })}
                                </a>,
                                <a
                                    disabled={record.isDirectory}
                                    key="share"
                                    onClick={async () => {
                                        setEditFileId(record.id);
                                        await handleShreFile(containerName, record);
                                    }}
                                >
                                    {intl.formatMessage({ id: 'page.file.share' })}
                                </a>,
                                <Popconfirm
                                    key="delete"
                                    title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                    onConfirm={async () => {
                                        setEditFileId(record.id);
                                        if (await deleteFile(containerName!, record.id)) {
                                            action?.reload();
                                        }
                                    }}
                                >
                                    <a>{intl.formatMessage({ id: 'common.dict.delete' })}</a>
                                </Popconfirm>,
                            ],
                        },
                    ]}
                    search={false}
                    rowKey="id"
                    params={{ _: containerName, filter: fileListFilter, parentId: fileParentId }}
                    toolbar={{
                        search: {
                            onSearch: (value) => {
                                setFileListFilter(value);
                            },
                            onChange: (e) => setFileListFilterValue(e.target.value),
                            value: fileListFilterValue,
                        },
                        actions: [
                            containerList.length > 0 && (
                                <Select
                                    key="containers"
                                    value={containerName}
                                    options={containerList.map((x) => {
                                        return {
                                            value: x.name,
                                            label: x.name!,
                                        };
                                    })}
                                    onSelect={(v) => setContainerName(v)}
                                ></Select>
                            ),
                            <Button key="goback" disabled={directories.length == 0} onClick={handleGoUp}>
                                Go Up
                            </Button>,
                            <Dropdown.Button
                                key="add"
                                type="primary"
                                onClick={() => {
                                    setUploadModalVisible(true);
                                }}
                                menu={{
                                    items: [
                                        {
                                            label: 'Create Folder',
                                            key: 'folder',
                                            onClick: () => {
                                                setFileEditModalVisible(true);
                                                setFileEditModalTitle('Create Folder');
                                            },
                                        },
                                    ],
                                }}
                            >
                                Upload
                            </Dropdown.Button>,
                        ],
                    }}
                    request={async (params) => {
                        if (!containerName) {
                            return {
                                success: false,
                            };
                        }
                        const { current, pageSize } = params;
                        delete params.current;
                        delete params.pageSize;
                        const skipCount = (current! - 1) * pageSize!;
                        const result = await getFileList(containerName!, {
                            ...params,
                            skipCount,
                            maxResultCount: pageSize,
                        });
                        setImaegList((result.items ?? []).filter((x) => x.mimeType?.startsWith('image/')));
                        if (result)
                            return {
                                success: true,
                                data: result.items,
                                total: result.totalCount,
                            };
                        else {
                            return {
                                success: false,
                            };
                        }
                    }}
                />
            </Card>

            {/* Folder */}
            <ModalForm<{ fileName: string }>
                title={fileEditModalTitle}
                width={380}
                visible={fileEditModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                preserve={false}
                onVisibleChange={setFileEditModalVisible}
                onFinish={async (values) => {
                    let result = await createFileDirectory(containerName, {
                        ...values,
                        parentId: fileParentId,
                    });
                    if (result?.id) {
                        actionRef.current?.reload();
                        return true;
                    }

                    return false;
                }}
            >
                <ProFormText
                    rules={[{ required: true }, { max: 64 }]}
                    name="fileName"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.name' })}
                />
            </ModalForm>

            {/* Upload */}
            <Modal
                title="Upload"
                open={uploadModalVisible}
                footer={false}
                onCancel={() => {
                    setUploadModalVisible(false);
                    actionRef.current?.reload();
                }}
                destroyOnClose
            >
                <ProForm submitter={false}>
                    <ProFormUploadDragger
                        fieldProps={{
                            multiple: true,
                            listType: 'picture',
                            withCredentials: true,
                            customRequest: async (o) => {
                                // console.log(o);

                                const formData = new FormData();
                                formData.append('file', o.file);
                                formData.append('parentId', fileParentId ?? '');

                                o?.onProgress?.({ percent: 1 });
                                // @ts-ignore
                                const result = await createFile(containerName, formData);
                                // console.log(result);

                                if (result?.id) {
                                    o?.onSuccess?.({});
                                    message.success("File '" + o.file.name + "' upload success");
                                } else {
                                    o?.onError?.({ name: '', message: result?.error?.message });
                                }
                            },
                            onRemove: (file) => {
                                console.log(file);
                            },
                        }}
                        action="/"
                    ></ProFormUploadDragger>
                </ProForm>
            </Modal>

            <Image.PreviewGroup
                preview={{
                    visible: imagePreviewVisible,
                    onVisibleChange: (v) => setImagePreviewVisible(v),
                    current: imagePreviewIndex,
                    onChange: (c) => setImagePreviewIndex(c),
                }}
                items={imageList.map((x) => `/api/file-management/${containerName}/${x.id}/blob`)}
            ></Image.PreviewGroup>

            {/* share */}
            <Modal
                title={intl.formatMessage({ id: 'page.file.share' })}
                open={fileShareViewVisible}
                onCancel={() => setFileShareViewVisible(false)}
                footer={false}
                destroyOnClose
            >
                <ProForm<{ expiration?: string }>
                    submitter={false}
                    layout="inline"
                    onFinish={async (values) => {
                        let seconds = 0;
                        if (values.expiration) seconds = moment(values.expiration).diff(moment()) / 1000;
                        const result = await createFileShare(containerName, editFileId!, {
                            expirationSecond: parseInt(seconds),
                        });
                        if (result) {
                            message.success(intl.formatMessage({ id: 'common.dict.success' }));
                            setFileShareResult(result);
                        }
                    }}
                >
                    <ProFormDateTimePicker
                        label={intl.formatMessage({ id: 'page.file.share.field.expiration' })}
                        name="expiration"
                        fieldProps={{
                            disabledDate: (current) => current && current <= moment().endOf('minutes'),
                            // disabledTime: dateTimePickerDisbladTimeFunc,
                            // // showSecond: false,
                            // showNow: false,
                            // showTime: {
                            //     defaultValue: moment('00:00:00', 'HH:mm:ss'),
                            // },
                            // format: 'YYYY-MM-DD HH:mm:ss',
                        }}
                    />
                    <Button htmlType="submit" type="primary">
                        {intl.formatMessage({ id: 'page.file.share' })}
                    </Button>
                </ProForm>

                {fileShareResult && (
                    <div style={{ marginTop: 24 }}>
                        <label>{intl.formatMessage({ id: 'page.file.share.link' })}</label>{' '}
                        <Typography.Link target="_blank" code copyable href={fileShareResult.downloadUrl}>
                            {fileShareResult.downloadUrl}
                        </Typography.Link>
                    </div>
                )}
            </Modal>
        </PageContainer>
    );
};

export default Index;
