import {
    createOpenIddictScope,
    deleteOpenIddictScope,
    getOpenIddictScope,
    getOpenIddictScopePagedList,
    updateOpenIddictScope,
} from '@/services/OpenIddictScope';
import { API } from '@/services/typings';
import { ActionType, ModalForm, PageContainer, ProFormSelect, ProFormText, ProTable } from '@ant-design/pro-components';
import { formatMessage, useAccess, useIntl } from '@umijs/max';
import { Button, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';

const handleOpenIddictScopeAdd = async (data: any) => {
    const response = await createOpenIddictScope(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleOpenIddictScopeEdit = async (id: string, data: any) => {
    const response = await updateOpenIddictScope(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleOpenIddictScopeDelete = async (id: string) => {
    const response = await deleteOpenIddictScope(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const OpenIddictScope: React.FC = () => {
    const intl = useIntl();

    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.OpenIddictScope>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    return (
        <PageContainer>
            <ProTable<API.OpenIddictScope>
                actionRef={tableActionRef}
                columns={[
                    {
                        dataIndex: 'name',
                        title: intl.formatMessage({ id: 'page.openIddictScope.field.name' }),
                        search: false,
                        copyable: true,
                    },
                    {
                        dataIndex: 'displayName',
                        title: intl.formatMessage({ id: 'page.openIddictScope.field.displayName' }),
                        search: false,
                        copyable: true,
                    },
                    {
                        dataIndex: 'description',
                        title: intl.formatMessage({ id: 'page.openIddictScope.field.description' }),
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
                                    if (await handleOpenIddictScopeDelete(record.id)) {
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
                search={false}
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
                    const result = await getOpenIddictScopePagedList({
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

            {/* 'Open Iddict Scope' Create/Update */}
            <ModalForm
                title={editModalTitle}
                width={580}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                request={async () => {
                    if (!editModalDataId) return {};
                    return await getOpenIddictScope(editModalDataId);
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleOpenIddictScopeEdit(editModalDataId, data);
                    } else {
                        success = await handleOpenIddictScopeAdd(data);
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
                    rules={[{ required: true }, { max: 64 }]}
                    name={['name']}
                    label={intl.formatMessage({ id: 'page.openIddictScope.field.name' })}
                />
                <ProFormText
                    rules={[{ required: true }, { max: 64 }]}
                    name={['displayName']}
                    label={intl.formatMessage({ id: 'page.openIddictScope.field.displayName' })}
                />
                <ProFormSelect
                    rules={[{ required: true }]}
                    name={['resources']}
                    label={intl.formatMessage({ id: 'page.openIddictScope.field.resources' })}
                    mode="tags"
                />
                <ProFormText
                    rules={[{ required: false }, { max: 128 }]}
                    name={['description']}
                    label={intl.formatMessage({ id: 'page.openIddictScope.field.description' })}
                />
            </ModalForm>
        </PageContainer>
    );
};

export default OpenIddictScope;
