import {
    createIdentityRole,
    deleteIdentityRole,
    getIdentityRole,
    getIdentityRoleList,
    updateIdentityRole,
} from '@/services/IdentityRole';
import { API } from '@/services/typings';
import { ActionType, ModalForm, PageContainer, ProFormSwitch, ProFormText, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, formatMessage, useIntl } from '@umijs/max';
import { Button, Card, Popconfirm, Space, Tag, message } from 'antd';
import React, { useRef, useState } from 'react';
import { PermissionForm } from './permission';

const handleIdentityRoleAdd = async (data: any) => {
    const response = await createIdentityRole(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleIdentityRoleEdit = async (id: string, data: any) => {
    const response = await updateIdentityRole(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleIdentityRoleDelete = async (id: string) => {
    const response = await deleteIdentityRole(id);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const IdentityRole: React.FC = () => {
    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const intl = useIntl();

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.IdentityRole>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    // const [permissionModalVisible, setPermissionModalVisible] = useState<boolean>();
    // const [permissionData, setPermissionData] = useState([]);
    // const [permissionEditData, setPermissionEditData] = useState([]);

    const [permissionKey, setPermissioKey] = useState<string>();
    const [permissionEditVisible, setPermissioVisible] = useState<boolean>();

    return (
        <PageContainer>
            <ProTable<API.IdentityRole>
                actionRef={tableActionRef}
                columns={[
                    {
                        dataIndex: 'filter',
                        title: intl.formatMessage({ id: 'page.identityRole.field.name' }),
                        hideInTable: true,
                    },
                    {
                        dataIndex: 'name',
                        title: intl.formatMessage({ id: 'page.identityRole.field.name' }),
                        search: false,
                        copyable: true,
                        render: (txt, record) => {
                            return (
                                <Space>
                                    <span>{txt}</span>
                                    {record.isStatic ? (
                                        <Tag color="cyan">
                                            <FormattedMessage id="page.identityRole.field.isStatic" />
                                        </Tag>
                                    ) : null}
                                    {record.isDefault ? (
                                        <Tag color="blue">
                                            <FormattedMessage id="page.identityRole.field.isDefault" />
                                        </Tag>
                                    ) : null}
                                    {record.isPublic ? (
                                        <Tag color="orange">
                                            <FormattedMessage id="page.identityRole.field.isPublic" />
                                        </Tag>
                                    ) : null}
                                </Space>
                            );
                        },
                    },
                    {
                        title: intl.formatMessage({ id: 'common.dict.table-action' }),
                        valueType: 'option',
                        align: 'center',
                        width: 150,
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
                            <a
                                key="permission"
                                onClick={() => {
                                    setPermissioKey(record.name);
                                    setPermissioVisible(true);
                                }}
                            >
                                {intl.formatMessage({ id: 'page.identityRole.permission' })}
                            </a>,
                            <Popconfirm
                                key="delete"
                                title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                onConfirm={async () => {
                                    if (await handleIdentityRoleDelete(record.id)) {
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
                    const result = await getIdentityRoleList({
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

            {/* 'Identity Role' Create/Update */}
            <ModalForm
                title={editModalTitle}
                width={580}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                request={async () => {
                    if (!editModalDataId) return {};
                    return await getIdentityRole(editModalDataId);
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleIdentityRoleEdit(editModalDataId, data);
                    } else {
                        success = await handleIdentityRoleAdd(data);
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
                    rules={[{ required: true }, { max: 128 }]}
                    name="name"
                    label={intl.formatMessage({ id: 'page.identityRole.field.name' })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name="isDefault"
                    label={intl.formatMessage({ id: 'page.identityRole.field.isDefault' })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name="isPublic"
                    label={intl.formatMessage({ id: 'page.identityRole.field.isPublic' })}
                />
            </ModalForm>

            {/*  */}
            <PermissionForm
                providerKey={permissionKey}
                providerName={'R'}
                open={permissionEditVisible}
                onOpenChange={setPermissioVisible}
            />
        </PageContainer>
    );
};

export default IdentityRole;
