import {
    createDictionaryItem,
    updateDictionaryItem,
    deleteDictionaryItem,
    getDictionaryItemList,
    getDictionaryItem,
} from '@/services/DictionaryItem';
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
    ProFormDatePicker,
    ProTable,
} from '@ant-design/pro-components';
import { formatMessage, useIntl, useAccess } from '@umijs/max';
import { Button, Card, Popconfirm, message } from 'antd';
import React, { useEffect, useRef, useState } from 'react';

const handleDictionaryItemAdd = async (data: any) => {
    const response = await createDictionaryItem(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleDictionaryItemEdit = async (id: string, data: any) => {
    const response = await updateDictionaryItem(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleDictionaryItemDelete = async (id: string) => {
    const response = await deleteDictionaryItem(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const DictionaryItem: React.FC = () => {
    const intl = useIntl();
    const access = useAccess();

    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.DictionaryItem>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    return (
        <PageContainer>
            <Card>
                <ProTable<API.DictionaryItem>
                    actionRef={tableActionRef}
                    columns={[
                        {
                            dataIndex: 'creationTime',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.creationTime' }),
                            search: false,
                        },
                        {
                            dataIndex: 'creatorId',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.creatorId' }),
                            search: false,
                        },
                        {
                            dataIndex: 'lastModificationTime',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.lastModificationTime' }),
                            search: false,
                        },
                        {
                            dataIndex: 'lastModifierId',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.lastModifierId' }),
                            search: false,
                        },
                        {
                            dataIndex: 'name',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.name' }),
                            search: false,
                        },
                        {
                            dataIndex: 'displayName',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.displayName' }),
                            search: false,
                        },
                        {
                            dataIndex: 'displayOrder',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.displayOrder' }),
                            search: false,
                        },
                        {
                            dataIndex: 'isEnabled',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.isEnabled' }),
                            search: false,
                        },
                        {
                            dataIndex: 'description',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.description' }),
                            search: false,
                        },
                        {
                            dataIndex: 'value',
                            title: intl.formatMessage({ id: 'page.dictionaryItem.field.value' }),
                            search: false,
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
                                        if (await handleDictionaryItemDelete(record.id)) {
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
                        const result = await getDictionaryItemList({
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
            </Card>

            {/* 'Dictionary Item' Create/Update */}
            <ModalForm
                title={editModalTitle}
                width={580}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                request={async () => {
                    if (!editModalDataId) return {};
                    return await getDictionaryItem(editModalDataId);
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleDictionaryItemEdit(editModalDataId, data);
                    } else {
                        success = await handleDictionaryItemAdd(data);
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
                    rules={[{ required: true }]}
                    name={['creationTime']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.creationTime' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['creatorId']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.creatorId' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['lastModificationTime']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.lastModificationTime' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['lastModifierId']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.lastModifierId' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['name']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.name' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['displayName']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.displayName' })}
                />

                <ProFormDigit
                    rules={[{ required: true }]}
                    name={['displayOrder']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.displayOrder' })}
                />

                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['isEnabled']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.isEnabled' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['description']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.description' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['value']}
                    label={intl.formatMessage({ id: 'page.dictionaryItem.field.value' })}
                />
            </ModalForm>
        </PageContainer>
    );
};

export default DictionaryItem;
