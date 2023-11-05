import {
    createDictionaryGroup,
    updateDictionaryGroup,
    deleteDictionaryGroup,
    getDictionaryGroupList,
    getDictionaryGroup,
} from '@/services/DictionaryGroup';
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

const handleDictionaryGroupAdd = async (data: any) => {
    const response = await createDictionaryGroup(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleDictionaryGroupEdit = async (id: string, data: any) => {
    const response = await updateDictionaryGroup(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleDictionaryGroupDelete = async (id: string) => {
    const response = await deleteDictionaryGroup(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const DictionaryGroup: React.FC = () => {
    const intl = useIntl();
    const access = useAccess();

    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.DictionaryGroup>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    return (
        <PageContainer>
            <Card>
                <ProTable<API.DictionaryGroup>
                    actionRef={tableActionRef}
                    columns={[
                        {
                            dataIndex: 'creationTime',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.creationTime' }),
                            search: false,
                        },
                        {
                            dataIndex: 'creatorId',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.creatorId' }),
                            search: false,
                        },
                        {
                            dataIndex: 'lastModificationTime',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.lastModificationTime' }),
                            search: false,
                        },
                        {
                            dataIndex: 'lastModifierId',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.lastModifierId' }),
                            search: false,
                        },
                        {
                            dataIndex: 'name',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.name' }),
                            search: false,
                        },
                        {
                            dataIndex: 'displayName',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.displayName' }),
                            search: false,
                        },
                        {
                            dataIndex: 'parentName',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.parentName' }),
                            search: false,
                        },
                        {
                            dataIndex: 'description',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.description' }),
                            search: false,
                        },
                        {
                            dataIndex: 'isPublic',
                            title: intl.formatMessage({ id: 'page.dictionaryGroup.field.isPublic' }),
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
                                        if (await handleDictionaryGroupDelete(record.id)) {
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
                        const result = await getDictionaryGroupList({
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

            {/* 'Dictionary Group' Create/Update */}
            <ModalForm
                title={editModalTitle}
                width={580}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                request={async () => {
                    if (!editModalDataId) return {};
                    return await getDictionaryGroup(editModalDataId);
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleDictionaryGroupEdit(editModalDataId, data);
                    } else {
                        success = await handleDictionaryGroupAdd(data);
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
                    rules={[{ required: false }]}
                    name={['name']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.name' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['displayName']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.displayName' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['parentName']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.parentName' })}
                />

                <ProFormText
                    rules={[{ required: false }]}
                    name={['description']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.description' })}
                />

                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['isPublic']}
                    label={intl.formatMessage({ id: 'page.dictionaryGroup.field.isPublic' })}
                />
            </ModalForm>
        </PageContainer>
    );
};

export default DictionaryGroup;
