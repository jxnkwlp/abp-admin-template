import { trueOrfalseEnum } from '@/pages/common';
import {
    createIdentityUser,
    deleteIdentityUser,
    getIdentityUser,
    getIdentityUserAssignableClaims,
    getIdentityUserAssignableOrganizationUnits,
    getIdentityUserAssignableRoles,
    getIdentityUserClaims,
    getIdentityUserList,
    getIdentityUserOrganizationUnits,
    getIdentityUserRoles,
    getIdentityUserTwoFactorEnabled,
    identityUserClearPassword,
    identityUserLock,
    identityUserResetAuthenticator,
    identityUserUnLock,
    updateIdentityUser,
    updateIdentityUserClaim,
    updateIdentityUserEmailConfirmed,
    updateIdentityUserPassword,
    updateIdentityUserPhoneNumberConfirmed,
    updateIdentityUserRoles,
    updateIdentityUserTwoFactorEnabled,
} from '@/services/IdentityUser';
import type { API } from '@/services/typings';
import { loopListToTree } from '@/utils';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import type { ActionType, ProColumnType } from '@ant-design/pro-components';
import {
    EditableProTable,
    ModalForm,
    PageContainer,
    ProFormCheckbox,
    ProFormDateTimePicker,
    ProFormSelect,
    ProFormSwitch,
    ProFormText,
    ProFormTreeSelect,
    ProTable,
    TableDropdown,
} from '@ant-design/pro-components';
import { formatMessage, useAccess, useIntl } from '@umijs/max';
import { Button, Modal, Space, Tabs, Tag, message } from 'antd';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { PermissionForm } from './permission';

const handleIdentityUserAdd = async (data: any) => {
    const response = await createIdentityUser(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleIdentityUserEdit = async (id: string, data: any) => {
    const response = await updateIdentityUser(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleIdentityUserDelete = async (id: string) => {
    const response = await deleteIdentityUser(id);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const Index: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const intl = useIntl();
    const access = useAccess();

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.IdentityUserV2>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    const [editRolesModalVisible, setEditRolesModalVisible] = useState<boolean>(false);

    const [resetPasswordVisible, setResetPasswordVisible] = useState(false);
    const [lockUserVisible, setLockUserVisible] = useState(false);

    const [twoFactorVisible, setTwoFactorVisible] = useState(false);

    const [emailConfirmed, setEmailConfirmed] = useState(false);
    const [phoneNumberConfirmed, setPhoneNumberConfirmed] = useState(false);

    const [permissionKey, setPermissioKey] = useState<string>();
    const [permissionEditVisible, setPermissioVisible] = useState<boolean>();

    const [claimsEditVisible, setClaimsEditVisible] = useState(false);
    const [allClaimTypes, setAllClaimTypes] = useState<API.IdentityClaimType[]>([]);
    const [claimsEditValues, setClaimsEditValues] = useState<API.IdentityClaim & { id: string }[]>([]);

    const loadAllClaimTypes = async () => {
        const result = await getIdentityUserAssignableClaims();
        setAllClaimTypes(result?.items ?? []);
    };

    const tableMoreActions = (id: string, record: API.IdentityUserV2) => {
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
                                if (await handleIdentityUserDelete(id)) {
                                    actionRef.current?.reload();
                                }
                            },
                        });
                    } else if (key == 'lock') {
                        setLockUserVisible(true);
                    } else if (key == 'unlock') {
                        const result = await identityUserUnLock(id);
                        if (!result.data) {
                            message.success(intl.formatMessage({ id: 'common.dict.success' }));
                            actionRef.current?.reload();
                        }
                    } else if (key == 'changePassword') {
                        setResetPasswordVisible(true);
                    } else if (key == 'clearPassword') {
                        Modal.confirm({
                            title: intl.formatMessage({ id: 'common.dict.confirm' }),
                            content: 'Confirm clear user password?',
                            onOk: async () => {
                                const result = await identityUserClearPassword(record.id);
                                if (!result.data) {
                                    message.success(intl.formatMessage({ id: 'common.dict.success' }));
                                    actionRef.current?.reload();
                                }
                            },
                        });
                    } else if (key == 'two-factor') {
                        setTwoFactorVisible(true);
                    } else if (key == 'reset-authenticator') {
                        Modal.confirm({
                            title: intl.formatMessage({ id: 'common.dict.confirm' }),
                            content: 'Confirm reset authenticator?',
                            onOk: async () => {
                                const result = await identityUserResetAuthenticator(record.id);
                                if (!result.data) {
                                    message.success(intl.formatMessage({ id: 'common.dict.success' }));
                                    actionRef.current?.reload();
                                }
                            },
                        });
                    } else if (key == 'email-confirmed') {
                        setEmailConfirmed(true);
                    } else if (key == 'phonenumber-confirmed') {
                        setPhoneNumberConfirmed(true);
                    } else if (key == 'permissions') {
                        setPermissioKey(record.id);
                        setPermissioVisible(true);
                    } else if (key == 'claims') {
                        await loadAllClaimTypes();
                        setClaimsEditVisible(true);
                    }
                }}
                menus={[
                    {
                        key: 'permissions',
                        name: intl.formatMessage({ id: 'page.identityUser.permissions' }),
                    },
                    // @ts-ignore
                    { type: 'divider' },
                    {
                        key: 'changePassword',
                        name: intl.formatMessage({ id: 'page.identityUser.resetPassword' }),
                    },
                    {
                        key: 'clearPassword',
                        name: intl.formatMessage({ id: 'page.identityUser.clearPassword' }),
                    },
                    // @ts-ignore
                    { type: 'divider' },
                    {
                        key: 'claims',
                        name: intl.formatMessage({ id: 'page.identityUser.claims' }),
                    },
                    // @ts-ignore
                    { type: 'divider' },
                    {
                        key: 'lock',
                        name: intl.formatMessage({ id: 'page.identityUser.lock' }),
                        hidden: record.isLockout,
                    },
                    {
                        key: 'unlock',
                        name: intl.formatMessage({ id: 'page.identityUser.unlock' }),
                        hidden: !record.isLockout,
                    },
                    {
                        key: 'two-factor',
                        name: intl.formatMessage({ id: 'page.identityUser.resetTwofactor' }),
                    },

                    {
                        key: 'reset-authenticator',
                        name: intl.formatMessage({ id: 'page.identityUser.resetAuthenticator' }),
                    },
                    // @ts-ignore
                    { type: 'divider' },
                    {
                        key: 'email-confirmed',
                        name: intl.formatMessage({ id: 'page.identityUser.emailConfirmed' }),
                    },
                    {
                        key: 'phonenumber-confirmed',
                        name: intl.formatMessage({ id: 'page.identityUser.phonenumberConfirmed' }),
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

    const columns: ProColumnType<API.IdentityUserV2>[] = [
        {
            dataIndex: 'filter',
            title: intl.formatMessage({ id: 'common.dict.filter' }),
            hideInTable: true,
        },
        {
            dataIndex: 'roleId',
            title: intl.formatMessage({ id: 'page.identityUser.roles' }),
            hideInTable: true,
            request: async () => {
                const result = await getIdentityUserAssignableRoles();
                return (result?.items ?? []).map((x) => {
                    return {
                        label: x.name,
                        value: x.id,
                    };
                });
            },
        },
        {
            dataIndex: 'userName',
            title: intl.formatMessage({ id: 'page.identityUser.field.userName' }),
            search: false,
            copyable: true,
        },
        {
            dataIndex: 'email',
            title: intl.formatMessage({ id: 'page.identityUser.field.email' }),
            search: false,
            copyable: true,
        },
        {
            dataIndex: 'name',
            title: intl.formatMessage({ id: 'page.identityUser.field.name' }),
            search: false,
            copyable: true,
            renderText: (_, record) => {
                return `${_ ?? ''} ${record.surname ?? ''}`;
            },
        },
        {
            dataIndex: 'phoneNumber',
            title: intl.formatMessage({ id: 'page.identityUser.field.phoneNumber' }),
            search: false,
            copyable: true,
        },
        {
            dataIndex: 'isActive',
            title: intl.formatMessage({ id: 'page.identityUser.field.isActive' }),
            search: false,
            align: 'center',
            width: 100,
            valueEnum: trueOrfalseEnum,
        },
        {
            dataIndex: 'lockoutEnabled',
            title: intl.formatMessage({ id: 'page.identityUser.field.lockoutEnabled' }),
            search: false,
            align: 'center',
            width: 100,
            render: (_, record) => (
                <Space direction="vertical">
                    {_ ? <CheckCircleTwoTone /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />}
                    {record.lockoutEnd ? <Tag>{moment(record.lockoutEnd).format()}</Tag> : <></>}
                </Space>
            ),
        },
        {
            dataIndex: 'twoFactorEnabled',
            title: intl.formatMessage({ id: 'page.identityUser.field.twoFactorEnabled' }),
            search: false,
            align: 'center',
            width: 150,
            valueEnum: {
                true: { text: <CheckCircleTwoTone twoToneColor="#52c41a" /> },
                false: { text: <CloseCircleTwoTone twoToneColor="#eb2f96" /> },
            },
        },
        {
            dataIndex: 'creationTime',
            title: intl.formatMessage({ id: 'common.dict.lastModificationTime' }),
            valueType: 'dateTime',
            search: false,
            renderText: (_, record) => {
                return record.lastModificationTime ?? record.creationTime;
            },
        },
        {
            title: intl.formatMessage({ id: 'common.dict.table-action' }),
            valueType: 'option',
            align: 'center',
            width: 160,
            render: (text, record, _, action) => [
                access['AbpIdentity.Users.Update'] && (
                    <a
                        key="edit"
                        onClick={() => {
                            setEditModalData(record);
                            setEditModalDataId(record.id);
                            setEditModalVisible(true);
                            setEditModalTitle(`${intl.formatMessage({ id: 'common.dict.edit' })} - ${record.userName}`);
                        }}
                    >
                        {intl.formatMessage({ id: 'common.dict.edit' })}
                    </a>
                ),
                access['AbpIdentity.Users.Update'] && (
                    <a
                        key="roles"
                        onClick={async () => {
                            setEditModalData(record);
                            setEditModalDataId(record.id);
                            setEditRolesModalVisible(true);
                        }}
                    >
                        {intl.formatMessage({ id: 'page.identityUser.roles' })}
                    </a>
                ),
                tableMoreActions(record.id, record),
            ],
        },
    ];

    return (
        <PageContainer>
            <ProTable<API.IdentityUserV2>
                columns={columns}
                actionRef={actionRef}
                search={{ labelWidth: 140 }}
                rowKey="id"
                toolBarRender={() => [
                    access['AbpIdentity.Users.Create'] && (
                        <Button
                            key="add"
                            type="primary"
                            onClick={() => {
                                setEditModalData(undefined);
                                setEditModalDataId('');
                                setEditModalVisible(true);
                                setEditModalTitle(intl.formatMessage({ id: 'common.dict.create' }));
                            }}
                        >
                            {intl.formatMessage({ id: 'common.dict.create' })}
                        </Button>
                    ),
                ]}
                request={async (params) => {
                    const { current, pageSize } = params;
                    delete params.current;
                    delete params.pageSize;
                    const skipCount = (current! - 1) * pageSize!;
                    const result = await getIdentityUserList({
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

            <ModalForm
                title={editModalTitle}
                width="520px"
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                preserve={false}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                request={async () => {
                    if (!editModalDataId) {
                        return {
                            isActive: true,
                            lockoutEnabled: true,
                        };
                    }

                    const roles = await getIdentityUserRoles(editModalDataId);
                    const organizationUnits = await getIdentityUserOrganizationUnits(editModalDataId);

                    return {
                        ...editModalData,
                        roleNames: roles.items!.map((x) => {
                            return x.name;
                        }),
                        organizationUnitIds: organizationUnits.items!.map((x) => {
                            return x.id;
                        }),
                    };
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleIdentityUserEdit(editModalDataId, { ...editModalData, ...data });
                    } else {
                        success = await handleIdentityUserAdd(data);
                    }

                    if (success) {
                        setEditModalVisible(false);
                        actionRef.current?.reload();
                    }
                }}
                layout="vertical"
            >
                <Tabs
                    defaultActiveKey="basic"
                    items={[
                        {
                            key: 'basic',
                            label: intl.formatMessage({ id: 'page.identityUser.basic' }),
                            children: (
                                <>
                                    <ProFormText
                                        rules={[{ required: true }, { max: 64 }]}
                                        name="userName"
                                        label={intl.formatMessage({ id: 'page.identityUser.field.userName' })}
                                        disabled={!!editModalDataId}
                                    />
                                    <ProFormText
                                        rules={[
                                            { required: true },
                                            { max: 128 },
                                            {
                                                type: 'email',
                                            },
                                        ]}
                                        name="email"
                                        label={intl.formatMessage({ id: 'page.identityUser.field.email' })}
                                    />
                                    <ProFormText
                                        rules={[{ required: false }, { max: 32 }]}
                                        name="surname"
                                        label={intl.formatMessage({ id: 'page.identityUser.field.surname' })}
                                    />
                                    <ProFormText
                                        rules={[{ required: true }, { max: 32 }]}
                                        name="name"
                                        label={intl.formatMessage({ id: 'page.identityUser.field.name' })}
                                    />
                                    <ProFormText
                                        rules={[{ required: false }, { max: 32 }]}
                                        name="phoneNumber"
                                        label={intl.formatMessage({ id: 'page.identityUser.field.phoneNumber' })}
                                    />
                                    <ProFormSwitch
                                        name="isActive"
                                        label={intl.formatMessage({ id: 'page.identityUser.field.isActive' })}
                                    />
                                    <ProFormSwitch
                                        name="lockoutEnabled"
                                        label={intl.formatMessage({ id: 'page.identityUser.field.lockoutEnabled' })}
                                    />
                                    <ProFormSwitch
                                        name="shouldChangePasswordOnNextLogin"
                                        label={intl.formatMessage({
                                            id: 'page.identityUser.field.shouldChangePasswordOnNextLogin',
                                        })}
                                    />
                                    <ProFormText
                                        rules={[{ max: 32 }, { min: 6 }]}
                                        name="password"
                                        label={intl.formatMessage({ id: 'page.identityUser.field.password' })}
                                        fieldProps={{ autoComplete: 'new-password' }}
                                    />
                                </>
                            ),
                        },
                        {
                            key: 'roles',
                            label: intl.formatMessage({ id: 'page.identityUser.roles' }),
                            children: (
                                <>
                                    <ProFormSelect
                                        label={intl.formatMessage({ id: 'page.identityUser.roles' })}
                                        name="roleNames"
                                        mode="multiple"
                                        showSearch
                                        request={async () => {
                                            const result = await getIdentityUserAssignableRoles();
                                            return (result?.items ?? []).map((x) => {
                                                return {
                                                    label: x.name,
                                                    value: x.name,
                                                };
                                            });
                                        }}
                                    />
                                </>
                            ),
                        },
                        {
                            key: 'organizationUnits',
                            label: intl.formatMessage({ id: 'page.identityUser.organizationUnits' }),
                            children: (
                                <>
                                    <ProFormTreeSelect
                                        label={intl.formatMessage({ id: 'page.identityUser.field.organizationUnits' })}
                                        name="organizationUnitIds"
                                        request={async () => {
                                            const result = await getIdentityUserAssignableOrganizationUnits({});
                                            const treeData = loopListToTree<API.OrganizationUnit>(
                                                result.items!,
                                                (item, key) => item.parentId == key,
                                                (item, key) => {
                                                    item.key = item.id;
                                                    item.value = item.id;
                                                    item.title = item.displayName;
                                                    item.label = item.displayName;
                                                },
                                            );
                                            return treeData;
                                        }}
                                        fieldProps={{
                                            showArrow: false,
                                            filterTreeNode: true,
                                            showSearch: true,
                                            popupMatchSelectWidth: false,
                                            autoClearSearchValue: true,
                                            multiple: true,
                                        }}
                                    ></ProFormTreeSelect>
                                </>
                            ),
                        },
                    ]}
                ></Tabs>
            </ModalForm>

            {/* Roles */}
            <ModalForm
                open={editRolesModalVisible}
                onOpenChange={setEditRolesModalVisible}
                title={`${intl.formatMessage({ id: 'page.identityUser.roles' })} - ${editModalData?.userName}`}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onFinish={async (values) => {
                    const result = await updateIdentityUserRoles(editModalDataId!, {
                        roleNames: values.roleNames as string[],
                    });

                    if (result) {
                        message.success(intl.formatMessage({ id: 'common.dict.modified.success' }));
                    }

                    return true;
                }}
                request={async () => {
                    const result = await getIdentityUserRoles(editModalDataId!);
                    return {
                        roleNames: (result.items ?? []).map((x) => {
                            return x.name;
                        }),
                    };
                }}
            >
                <ProFormCheckbox.Group
                    label=""
                    name="roleNames"
                    request={async () => {
                        const result = await getIdentityUserAssignableRoles();
                        return (result?.items ?? []).map((x) => {
                            return {
                                label: x.name,
                                value: x.name,
                            };
                        });
                    }}
                />
            </ModalForm>

            {/* Lock */}
            <ModalForm<API.IdentityUserSetLockoutRequest>
                open={lockUserVisible}
                onOpenChange={setLockUserVisible}
                width={380}
                title={`${intl.formatMessage({ id: 'page.identityUser.resetPassword' })} - ${editModalData?.userName}`}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onFinish={async (values) => {
                    const result = await identityUserLock(editModalDataId!, values);

                    if (result) {
                        message.success(intl.formatMessage({ id: 'common.dict.success' }));
                    }

                    return true;
                }}
            >
                <ProFormDateTimePicker name="endTime" label="EndTime" rules={[{ required: true }]} />
            </ModalForm>

            {/* Change password */}
            <ModalForm<API.IdentityUserUpdatePassword>
                open={resetPasswordVisible}
                onOpenChange={setResetPasswordVisible}
                width={380}
                title={`${intl.formatMessage({ id: 'page.identityUser.resetPassword' })} - ${editModalData?.userName}`}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                preserve={false}
                onFinish={async (values) => {
                    const result = await updateIdentityUserPassword(editModalDataId!, values);

                    if (result) {
                        message.success(intl.formatMessage({ id: 'common.dict.success' }));
                    }

                    return true;
                }}
            >
                <ProFormText.Password
                    name="password"
                    label="Password"
                    rules={[{ required: true }, { min: 6, max: 32 }]}
                    fieldProps={{ autoComplete: 'new-password' }}
                />
            </ModalForm>

            {/* two-factory */}
            <ModalForm<API.IdentityUserTwoFactorEnabled>
                open={twoFactorVisible}
                onOpenChange={setTwoFactorVisible}
                width={380}
                title={`${intl.formatMessage({ id: 'page.identityUser.resetTwofactor' })} - ${editModalData?.userName}`}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                request={async () => {
                    return (await getIdentityUserTwoFactorEnabled(editModalDataId!)) ?? {};
                }}
                onFinish={async (values) => {
                    const result = await updateIdentityUserTwoFactorEnabled(editModalDataId!, values);

                    if (result) {
                        message.success(intl.formatMessage({ id: 'common.dict.success' }));
                        actionRef.current?.reload();
                    }

                    return true;
                }}
            >
                <ProFormSwitch
                    name="enabled"
                    label={intl.formatMessage({ id: 'page.identityUser.field.twoFactorEnabled' })}
                    rules={[{ required: true }]}
                />
            </ModalForm>

            {/* email confirmed */}
            <ModalForm<API.IdentityUserUpdateConfirmed>
                open={emailConfirmed}
                onOpenChange={setEmailConfirmed}
                width={380}
                title={`${intl.formatMessage({ id: 'page.identityUser.emailConfirmed' })} - ${editModalData?.userName}`}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                request={async () => {
                    const result = (await getIdentityUser(editModalDataId!)) ?? {};
                    return {
                        confirmed: result.emailConfirmed,
                    };
                }}
                onFinish={async (values) => {
                    const result = await updateIdentityUserEmailConfirmed(editModalDataId!, values);

                    if (result) {
                        message.success(intl.formatMessage({ id: 'common.dict.success' }));
                        actionRef.current?.reload();
                    }

                    return true;
                }}
            >
                <ProFormSwitch
                    name="confirmed"
                    label={intl.formatMessage({ id: 'page.identityUser.field.emailConfirmed' })}
                    rules={[{ required: true }]}
                />
            </ModalForm>

            {/* phone number confirmed */}
            <ModalForm<API.IdentityUserUpdateConfirmed>
                open={phoneNumberConfirmed}
                onOpenChange={setPhoneNumberConfirmed}
                width={380}
                title={`${intl.formatMessage({ id: 'page.identityUser.phonenumberConfirmed' })} - ${editModalData?.userName}`}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                request={async () => {
                    const result = (await getIdentityUser(editModalDataId!)) ?? {};
                    return {
                        confirmed: result.phoneNumberConfirmed,
                    };
                }}
                onFinish={async (values) => {
                    const result = await updateIdentityUserPhoneNumberConfirmed(editModalDataId!, values);

                    if (result) {
                        message.success(intl.formatMessage({ id: 'common.dict.success' }));
                        actionRef.current?.reload();
                    }

                    return true;
                }}
            >
                <ProFormSwitch
                    name="confirmed"
                    label={intl.formatMessage({ id: 'page.identityUser.field.phoneNumberConfirmed' })}
                    rules={[{ required: true }]}
                />
            </ModalForm>

            {/* Permissions */}
            <PermissionForm
                title={editModalData?.userName}
                providerKey={permissionKey}
                providerName={'U'}
                open={permissionEditVisible}
                onOpenChange={setPermissioVisible}
            />

            {/* claims */}
            <Modal
                title={intl.formatMessage({ id: 'page.identityUser.claims' })}
                width={580}
                open={claimsEditVisible}
                destroyOnClose
                onCancel={() => setClaimsEditVisible(false)}
                onOk={async () => {
                    const result = await updateIdentityUserClaim(editModalDataId!, { items: claimsEditValues });
                    if (result?.ok) {
                        message.success(intl.formatMessage({ id: 'common.dict.success' }));
                        setClaimsEditVisible(false);
                    }
                }}
            >
                <EditableProTable<API.IdentityClaim & { id: string }>
                    request={async () => {
                        const result = await getIdentityUserClaims(editModalDataId!);
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
                            title: intl.formatMessage({ id: 'page.identityUser.claims.field.type' }),
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
                            title: intl.formatMessage({ id: 'page.identityUser.claims.field.value' }),
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
        </PageContainer>
    );
};

export default Index;
