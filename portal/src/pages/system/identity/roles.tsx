import {
    createIdentityRole,
    deleteIdentityRole,
    getAllIdentityRoleList,
    getIdentityRole,
    getIdentityRoleAssignableClaims,
    getIdentityRoleClaims,
    getIdentityRoleList,
    identityRoleMoveAllUser,
    updateIdentityRole,
    updateIdentityRoleClaim,
} from '@/services/IdentityRole';
import { API } from '@/services/typings';
import { listToOptions } from '@/services/untils';
import {
    ActionType,
    EditableProTable,
    ModalForm,
    PageContainer,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProTable,
    TableDropdown,
} from '@ant-design/pro-components';
import { FormattedMessage, formatMessage, useAccess, useIntl } from '@umijs/max';
import { Button, Modal, Space, Tag, message } from 'antd';
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
    if (response?.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const IdentityRole: React.FC = () => {
    const tableActionRef = useRef<ActionType>();
    const intl = useIntl();
    const access = useAccess();

    const [loading, setLoading] = useState<boolean>(false);

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.IdentityRole>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    // const [permissionModalVisible, setPermissionModalVisible] = useState<boolean>();
    // const [permissionData, setPermissionData] = useState([]);
    // const [permissionEditData, setPermissionEditData] = useState([]);

    const [permissionKey, setPermissioKey] = useState<string>();
    const [permissionEditVisible, setPermissioVisible] = useState<boolean>();

    const [claimsEditVisible, setClaimsEditVisible] = useState(false);
    const [allClaimTypes, setAllClaimTypes] = useState<API.IdentityClaimType[]>([]);
    const [claimsEditValues, setClaimsEditValues] = useState<API.IdentityClaim & { id: string }[]>([]);

    const [moveUserEditVisible, setMoveUserEditVisible] = useState(false);

    const loadAllClaimTypes = async () => {
        const result = await getIdentityRoleAssignableClaims();
        setAllClaimTypes(result?.items ?? []);
    };

    const tableMoreActions = (id: string, record: API.IdentityRole) => {
        return (
            <TableDropdown
                key="more"
                onSelect={async (key) => {
                    setEditModalDataId(id);
                    setEditModalData(record);

                    if (key == 'delete') {
                        Modal.confirm({
                            title: intl.formatMessage({ id: 'common.dict.delete' }),
                            content: intl.formatMessage({ id: 'common.dict.delete.confirm' }),
                            onOk: async () => {
                                if (await handleIdentityRoleDelete(id)) {
                                    tableActionRef.current?.reload();
                                }
                            },
                        });
                    } else if (key == 'claims') {
                        await loadAllClaimTypes();
                        setClaimsEditVisible(true);
                    } else if (key == 'move-users') {
                        setMoveUserEditVisible(true);
                    }
                }}
                menus={[
                    {
                        key: 'claims',
                        name: intl.formatMessage({ id: 'page.identityRole.claims' }),
                    },
                    {
                        key: 'move-users',
                        name: intl.formatMessage({ id: 'page.identityRole.moveUsers' }),
                    },
                    // @ts-ignore
                    { type: 'divider' },
                    {
                        key: 'delete',
                        name: intl.formatMessage({ id: 'common.dict.delete' }),
                        disabled: !access['AbpIdentity.Users.Delete'],
                        danger: true,
                    },
                ]}
            ></TableDropdown>
        );
    };

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

                            tableMoreActions(record.id, record),
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

            {/* claims */}
            <Modal
                title={intl.formatMessage({ id: 'page.identityRole.claims' })}
                width={580}
                open={claimsEditVisible}
                destroyOnClose
                onCancel={() => setClaimsEditVisible(false)}
                onOk={async () => {
                    const result = await updateIdentityRoleClaim(editModalDataId!, { items: claimsEditValues });
                    if (result?.ok) {
                        message.success(intl.formatMessage({ id: 'common.dict.success' }));
                        setClaimsEditVisible(false);
                    }
                }}
            >
                <EditableProTable<API.IdentityClaim & { id: string }>
                    request={async () => {
                        const result = await getIdentityRoleClaims(editModalDataId!);
                        return {
                            success: true,
                            data: (result.items ?? []).map((x, index) => {
                                return { ...x, id: index.toString() };
                            }),
                        };
                    }}
                    value={claimsEditValues}
                    onChange={setClaimsEditValues}
                    columns={[
                        {
                            dataIndex: 'claimType',
                            title: intl.formatMessage({ id: 'page.identityRole.claims.field.type' }),
                            request: async () => {
                                return allClaimTypes.map((x) => {
                                    return {
                                        label: x.name,
                                        value: x.name,
                                    };
                                });
                            },
                            fieldProps: {
                                onChange: () => {},
                            },
                            formItemProps: (form, e) => {
                                return {
                                    rules: [{ required: true }],
                                };
                            },
                            dependencies: ['claimType'],
                        },
                        {
                            dataIndex: 'claimValue',
                            title: intl.formatMessage({ id: 'page.identityRole.claims.field.value' }),
                        },
                        {
                            title: intl.formatMessage({ id: 'common.dict.table-action' }),
                            valueType: 'option',
                            width: 150,
                            render: (text, record, _, action) => [
                                <a
                                    key="editable"
                                    onClick={() => {
                                        action?.startEditable?.(record.id);
                                    }}
                                >
                                    {intl.formatMessage({ id: 'common.dict.edit' })}
                                </a>,
                                <a
                                    key="delete"
                                    onClick={() => {
                                        setClaimsEditValues(claimsEditValues.filter((item) => item.id !== record.id));
                                    }}
                                >
                                    {intl.formatMessage({ id: 'common.dict.delete' })}
                                </a>,
                            ],
                        },
                    ]}
                    rowKey="id"
                    recordCreatorProps={{
                        record: () => ({ id: (Math.random() * 1000000).toFixed(0), claimType: '', claimValue: '' }),
                    }}
                />
            </Modal>

            {/* move users */}

            <ModalForm<API.IdentityRoleMoveAllUserRequest>
                open={moveUserEditVisible}
                onOpenChange={setMoveUserEditVisible}
                modalProps={{ destroyOnClose: true }}
                title={`${intl.formatMessage({ id: 'page.identityRole.moveUsers' })} - ${editModalData?.name}`}
                width={380}
                onFinish={async (value) => {
                    const result = await identityRoleMoveAllUser(editModalDataId!, value);
                    if (result.ok) {
                        message.success(intl.formatMessage({ id: 'common.dict.success' }));
                        setMoveUserEditVisible(false);
                    }
                }}
            >
                <ProFormSelect
                    label={intl.formatMessage({ id: 'page.identityRole.moveUsers.targetName' })}
                    name="targetId"
                    rules={[{ required: true }]}
                    request={async () => {
                        const result = await getAllIdentityRoleList();
                        return listToOptions(result?.items ?? [], 'id', 'name');
                    }}
                />
            </ModalForm>
        </PageContainer>
    );
};

export default IdentityRole;
