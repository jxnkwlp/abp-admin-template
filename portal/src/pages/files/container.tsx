import {
    createFileContainer,
    updateFileContainer,
    deleteFileContainer,
    getFileContainerList,
    getFileContainer,
} from '@/services/FileContainer';
import { FileAccessMode, FileOverrideBehavior } from '@/services/enums';
import { API } from '@/services/typings';
import {
    ActionType,
    ModalForm,
    PageContainer,
    ProFormDigit,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProFormTextArea,
    ProTable,
} from '@ant-design/pro-components';
import { FormattedMessage, formatMessage, useIntl } from '@umijs/max';
import { Button, Card, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';

const handleFileContainerAdd = async (data: any) => {
    const response = await createFileContainer(data);
    if (response) {
        message.success(<FormattedMessage id={'common.dict.created.success'} />);
        return true;
    }
    return false;
};

const handleFileContainerEdit = async (id: string, data: any) => {
    const response = await updateFileContainer(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleFileContainerDelete = async (id: string) => {
    const response = await deleteFileContainer(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const FileContainer: React.FC = () => {
    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const intl = useIntl();

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.FileContainer>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    return (
        <PageContainer>
            <ProTable<API.FileContainer>
                actionRef={tableActionRef}
                columns={[
                    {
                        dataIndex: 'filter',
                        title: intl.formatMessage({ id: 'page.fileContainer.field.name' }),
                        hideInTable: true,
                    },
                    {
                        dataIndex: 'name',
                        title: intl.formatMessage({ id: 'page.fileContainer.field.name' }),
                        search: false,
                    },
                    {
                        dataIndex: 'description',
                        title: intl.formatMessage({ id: 'page.fileContainer.field.description' }),
                        search: false,
                    },
                    {
                        dataIndex: 'accessMode',
                        title: intl.formatMessage({ id: 'page.fileContainer.field.accessMode' }),
                        search: false,
                    },
                    {
                        dataIndex: 'overrideBehavior',
                        title: intl.formatMessage({ id: 'page.fileContainer.field.overrideBehavior' }),
                        search: false,
                    },
                    {
                        dataIndex: 'filesCount',
                        title: intl.formatMessage({ id: 'page.fileContainer.field.filesCount' }),
                        search: false,
                    },
                    {
                        dataIndex: 'creationTime',
                        title: intl.formatMessage({ id: 'page.fileContainer.field.creationTime' }),
                        search: false,
                        valueType: 'dateTime',
                    },
                    {
                        title: intl.formatMessage({ id: 'common.dict.table-action' }),
                        valueType: 'option',
                        align: 'center',
                        width: 80,
                        render: (text, record, _, action) => [
                            <a
                                key="edit"
                                onClick={() => {
                                    setEditModalData(record);
                                    setEditModalDataId(record.id);
                                    setEditModalVisible(true);
                                    setEditModalTitle(`${intl.formatMessage({ id: 'common.dict.edit' })} - ${record.name}`);
                                }}
                            >
                                {intl.formatMessage({ id: 'common.dict.edit' })}
                            </a>,
                            <Popconfirm
                                key="delete"
                                title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                onConfirm={async () => {
                                    if (await handleFileContainerDelete(record.id)) {
                                        action?.reload();
                                    }
                                }}
                            >
                                <a>{intl.formatMessage({ id: 'common.dict.delete' })}</a>
                            </Popconfirm>,
                        ],
                    },
                ]}
                rowKey="id"
                toolBarRender={() => [
                    <Button
                        key="add"
                        type="primary"
                        onClick={() => {
                            setEditModalData(undefined);
                            setEditModalDataId('');
                            setEditModalTitle(intl.formatMessage({ id: 'common.dict.create' }));
                            setEditModalVisible(true);
                        }}
                    >
                        {intl.formatMessage({ id: 'common.dict.create' })}
                    </Button>,
                ]}
                request={async (params) => {
                    const { current, pageSize } = params;
                    delete params.current;
                    delete params.pageSize;
                    const skipCount = (current! - 1) * pageSize!;
                    const result = await getFileContainerList({
                        ...params,
                        skipCount,
                        maxResultCount: pageSize,
                    });
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

            {/* Container */}
            <ModalForm
                title={editModalTitle}
                width={580}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                request={async () => {
                    if (!editModalDataId) return {};
                    return await getFileContainer(editModalDataId);
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleFileContainerEdit(editModalDataId, data);
                    } else {
                        success = await handleFileContainerAdd(data);
                    }

                    if (success) {
                        tableActionRef?.current?.reload();
                    }

                    return success;
                }}
                layout="horizontal"
                labelCol={{ span: 6 }}
                labelWrap
            >
                <ProFormText
                    rules={[{ required: true }, { max: 32 }]}
                    disabled={!!editModalDataId}
                    name="name"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.name' })}
                />
                <ProFormTextArea
                    rules={[{ required: false }, { max: 128 }]}
                    name="description"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.description' })}
                    fieldProps={{ rows: 2 }}
                />
                <ProFormSelect
                    rules={[{ required: true }]}
                    name="accessMode"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.accessMode' })}
                    request={async () => {
                        return Object.keys(FileAccessMode)
                            .filter((x) => parseInt(x) >= 0)
                            .map((key) => {
                                return {
                                    value: parseInt(key),
                                    label: FileAccessMode[parseInt(key)],
                                };
                            });
                    }}
                />
                <ProFormDigit
                    rules={[{ required: false }]}
                    name="maximumEachFileSize"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.maximumEachFileSize' })}
                />
                <ProFormDigit
                    rules={[{ required: false }]}
                    name="maximumFileQuantity"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.maximumFileQuantity' })}
                />
                <ProFormSelect
                    rules={[{ required: true }]}
                    name="overrideBehavior"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.overrideBehavior' })}
                    request={async () => {
                        return Object.keys(FileOverrideBehavior)
                            .filter((x) => parseInt(x) >= 0)
                            .map((key) => {
                                return {
                                    value: parseInt(key),
                                    label: FileOverrideBehavior[parseInt(key)],
                                };
                            });
                    }}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name="allowAnyFileExtension"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.allowAnyFileExtension' })}
                />
                <ProFormTextArea
                    rules={[{ required: false }]}
                    name="allowedFileExtensions"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.allowedFileExtensions' })}
                    fieldProps={{ rows: 2 }}
                />
                <ProFormTextArea
                    rules={[{ required: false }]}
                    name="prohibitedFileExtensions"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.prohibitedFileExtensions' })}
                    fieldProps={{ rows: 2 }}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name="autoDeleteBlob"
                    label={intl.formatMessage({ id: 'page.fileContainer.field.autoDeleteBlob' })}
                />
            </ModalForm>
        </PageContainer>
    );
};

export default FileContainer;
