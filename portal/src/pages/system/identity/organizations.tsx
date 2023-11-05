import {
    createOrganizationUnit,
    deleteOrganizationUnit,
    deleteOrganizationUnitRole,
    deleteOrganizationUnitUser,
    getAllOrganizationUnitList,
    getOrganizationUnit,
    getOrganizationUnitAssignableRoles,
    getOrganizationUnitAssignableUsers,
    getOrganizationUnitRoles,
    getOrganizationUnitUsers,
    organizationUnitAddRoles,
    organizationUnitAddUsers,
    updateOrganizationUnit,
} from '@/services/OrganizationUnit';
import { API } from '@/services/typings';
import { loopListToTree } from '@/utils';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import { ActionType, ModalForm, PageContainer, ProColumnType, ProFormText, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, formatMessage, useAccess, useIntl } from '@umijs/max';
import { Button, Card, Col, Dropdown, MenuProps, Modal, Popconfirm, Row, Space, Tag, message } from 'antd';
import type { DataNode } from 'antd/es/tree';
import DirectoryTree from 'antd/es/tree/DirectoryTree';
import React, { useEffect, useRef, useState } from 'react';

const handleAdd = async (data: any) => {
    const response = await createOrganizationUnit(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleEdit = async (id: string, data: any) => {
    const response = await updateOrganizationUnit(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleDelete = async (id: string) => {
    const response = await deleteOrganizationUnit(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const Index: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const intl = useIntl();

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.OrganizationUnit>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    const [treeData, setTreeData] = useState<DataNode[]>();

    const [organizationParentId, setOrganizationParentId] = useState<string>();

    const [selectOrganizationId, setSelectOrganizationId] = useState<string>();

    const [relationshipType, setRelationshipType] = useState<'users' | 'roles' | string>('users');

    const [relationshipListFilter, setRelationshipListFilter] = useState<string>();

    const [relationshipListEditVisible, setRelationshipListEditVisible] = useState(false);
    const [relationshipListEditTitle, setRelationshipListTitle] = useState('Add');
    const [relationshipListEditFilter, setRelationshipListEditFilter] = useState<string>('');
    const [relationshipListEditSelectedRowKeys, setRelationshipListEditSelectedRowKeys] = useState<string[]>([]);

    const loadRoles = () => {
        if (!selectOrganizationId) return;

        // getOrganizationUnitMembersPagedList(selectOrganizationId!, {});
        // getOrganizationUnitRolesPagedList(selectOrganizationId!, {});
    };
    const loadUsers = () => {};

    const handleAddRelationships = async () => {
        if (relationshipListEditSelectedRowKeys.length > 0) {
            if (relationshipType == 'users') {
                const result = await organizationUnitAddUsers(selectOrganizationId!, {
                    userIds: relationshipListEditSelectedRowKeys,
                });

                if (result) actionRef.current?.reload();
            } else if (relationshipType == 'roles') {
                const result = await organizationUnitAddRoles(selectOrganizationId!, {
                    roleIds: relationshipListEditSelectedRowKeys,
                });

                if (result) actionRef.current?.reload();
            }
        }

        setRelationshipListEditSelectedRowKeys([]);
        setRelationshipListEditVisible(false);
    };

    const showEditOrganization = () => {
        setEditModalTitle(intl.formatMessage({ id: 'common.dict.create' }));
        setEditModalVisible(true);
    };

    const load = async () => {
        const result = await getAllOrganizationUnitList();

        const treeData = loopListToTree<API.OrganizationUnit & Record<string, any>>(
            result.items!,
            (item, key) => item.parentId == key,
            (item) => {
                item.key = item.id;
                item.title = item.displayName;
            },
        );
        setTreeData(treeData as unknown as DataNode[]);
    };

    useEffect(() => {
        loadRoles();
        loadUsers();
    }, [selectOrganizationId]);

    useEffect(() => {
        load();
    }, [0]);

    const organizationActionMenus: MenuProps['items'] = [
        {
            label: 'Edit',
            key: 'edit',
            onClick: () => {
                showEditOrganization();
            },
        },
        {
            label: 'Add Sub Item',
            key: 'add',
            onClick: () => {
                setEditModalDataId('');
                showEditOrganization();
            },
        },
        { type: 'divider' },
        {
            label: 'Delete',
            key: 'delete',
            danger: true,
            onClick: () => {
                Modal.confirm({
                    title: intl.formatMessage({
                        id: 'common.dict.delete.confirm',
                    }),
                    onOk: async () => {
                        if (await handleDelete(editModalDataId!)) {
                            load();
                        }
                    },
                });
            },
        },
    ];

    const userColumns: ProColumnType<API.IdentityUser>[] = [
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
                return `${_} ${record.surname ?? ''}`;
            },
        },
        {
            dataIndex: 'isActive',
            title: intl.formatMessage({ id: 'page.identityUser.field.isActive' }),
            search: false,
            align: 'center',
            width: 100,
            valueEnum: {
                true: { text: <CheckCircleTwoTone twoToneColor="#52c41a" /> },
                false: { text: <CloseCircleTwoTone twoToneColor="#eb2f96" /> },
            },
        },
    ];

    const roleColumns: ProColumnType<API.IdentityRole>[] = [
        {
            dataIndex: 'name',
            title: intl.formatMessage({ id: 'page.identityRole.field.name' }),
            copyable: true,
            hideInSearch: true,
            render: (_, record) => {
                return (
                    <Space>
                        <span>{_}</span>
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
    ];

    return (
        <PageContainer>
            <Row gutter={16}>
                <Col span={8}>
                    <Card
                        title={<FormattedMessage id="page.organizationUnit" />}
                        extra={
                            <Button
                                type="primary"
                                onClick={() => {
                                    setEditModalData(undefined);
                                    setEditModalDataId('');
                                    showEditOrganization();
                                }}
                            >
                                Add Root
                            </Button>
                        }
                    >
                        <Dropdown menu={{ items: organizationActionMenus }} trigger={['contextMenu']}>
                            <DirectoryTree
                                treeData={treeData}
                                selectedKeys={selectOrganizationId ? [selectOrganizationId] : []}
                                blockNode
                                onRightClick={(e) => {
                                    const key = e.node.key as unknown as string;
                                    setSelectOrganizationId(key);
                                    setEditModalDataId(key);
                                    setOrganizationParentId(key);
                                }}
                                onSelect={(e) => {
                                    setSelectOrganizationId(e[0].toString());
                                }}
                            />
                        </Dropdown>
                    </Card>
                </Col>
                <Col span={16}>
                    {selectOrganizationId && (
                        <Card
                            tabList={[
                                { key: 'users', label: 'Users' },
                                { key: 'roles', label: 'Roles' },
                            ]}
                            onTabChange={setRelationshipType}
                        >
                            {relationshipType == 'users' && (
                                <ProTable<API.IdentityUser>
                                    actionRef={actionRef}
                                    columns={[
                                        ...userColumns,
                                        {
                                            title: intl.formatMessage({ id: 'common.dict.table-action' }),
                                            valueType: 'option',
                                            align: 'center',
                                            width: 80,
                                            render: (text, record, _, action) => (
                                                <Popconfirm
                                                    key="delete"
                                                    title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                                    onConfirm={async () => {
                                                        if (
                                                            await deleteOrganizationUnitUser(selectOrganizationId!, record.id)
                                                        ) {
                                                            action?.reload();
                                                        }
                                                    }}
                                                >
                                                    <a>{intl.formatMessage({ id: 'common.dict.delete' })}</a>
                                                </Popconfirm>
                                            ),
                                        },
                                    ]}
                                    search={false}
                                    rowKey="id"
                                    params={{ _: selectOrganizationId, filter: relationshipListFilter }}
                                    toolbar={{
                                        search: {
                                            onSearch: (value) => {
                                                setRelationshipListFilter(value);
                                            },
                                        },
                                        actions: [
                                            <Button
                                                key="add"
                                                type="primary"
                                                onClick={() => {
                                                    setRelationshipListEditVisible(true);
                                                }}
                                            >
                                                {intl.formatMessage({ id: 'common.dict.create' })}
                                            </Button>,
                                        ],
                                    }}
                                    request={async (params) => {
                                        const { current, pageSize } = params;
                                        delete params.current;
                                        delete params.pageSize;
                                        const skipCount = (current! - 1) * pageSize!;
                                        const result = await getOrganizationUnitUsers(selectOrganizationId!, {
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
                            )}
                            {relationshipType == 'roles' && (
                                <ProTable<API.IdentityRole>
                                    actionRef={actionRef}
                                    columns={[
                                        ...roleColumns,
                                        {
                                            title: intl.formatMessage({ id: 'common.dict.table-action' }),
                                            valueType: 'option',
                                            align: 'center',
                                            width: 80,
                                            render: (text, record, _, action) => (
                                                <Popconfirm
                                                    key="delete"
                                                    title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                                    onConfirm={async () => {
                                                        if (
                                                            await deleteOrganizationUnitRole(selectOrganizationId!, record.id)
                                                        ) {
                                                            action?.reload();
                                                        }
                                                    }}
                                                >
                                                    <a>{intl.formatMessage({ id: 'common.dict.delete' })}</a>
                                                </Popconfirm>
                                            ),
                                        },
                                    ]}
                                    search={false}
                                    rowKey="id"
                                    params={{ _: selectOrganizationId, filter: relationshipListFilter }}
                                    toolbar={{
                                        // search: {
                                        //     onSearch: (value) => {
                                        //         setRelationshipListFilter(value);
                                        //     },
                                        // },
                                        actions: [
                                            <Button
                                                key="add"
                                                type="primary"
                                                onClick={() => {
                                                    setRelationshipListEditVisible(true);
                                                }}
                                            >
                                                {intl.formatMessage({ id: 'common.dict.create' })}
                                            </Button>,
                                        ],
                                    }}
                                    request={async (params) => {
                                        const { current, pageSize } = params;
                                        delete params.current;
                                        delete params.pageSize;
                                        const skipCount = (current! - 1) * pageSize!;
                                        const result = await getOrganizationUnitRoles(selectOrganizationId!, {
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
                            )}
                        </Card>
                    )}
                </Col>
            </Row>

            {/* Edit */}
            <ModalForm
                title={editModalTitle}
                width={380}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                preserve={false}
                onOpenChange={setEditModalVisible}
                request={async () => {
                    if (!editModalDataId) {
                        return {};
                    }

                    const result = await getOrganizationUnit(editModalDataId);
                    return result ?? {};
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value, parentId: organizationParentId };
                    if (editModalDataId) {
                        success = await handleEdit(editModalDataId, data);
                    } else {
                        success = await handleAdd(data);
                    }

                    if (success) {
                        load();
                    }
                    return success;
                }}
            >
                <ProFormText
                    rules={[{ required: true }, { max: 64 }]}
                    name="displayName"
                    label={intl.formatMessage({ id: 'page.organizationUnit.field.displayName' })}
                />
            </ModalForm>

            {/*  */}
            <Modal
                title={relationshipListEditTitle}
                width={630}
                open={relationshipListEditVisible}
                onCancel={() => setRelationshipListEditVisible(false)}
                destroyOnClose
                onOk={handleAddRelationships}
            >
                <ProTable<API.IdentityRole | API.IdentityUser | any>
                    columns={relationshipType == 'users' ? userColumns : relationshipType == 'roles' ? roleColumns : []}
                    search={false}
                    rowKey="id"
                    toolbar={{
                        search: {
                            onSearch: (value) => {
                                setRelationshipListEditFilter(value);
                            },
                        },
                    }}
                    params={{ filter: relationshipListEditFilter }}
                    rowSelection={{
                        type: 'checkbox',
                        selectedRowKeys: relationshipListEditSelectedRowKeys,
                        onChange: (selectedRows) => {
                            setRelationshipListEditSelectedRowKeys(selectedRows as unknown as string[]);
                        },
                    }}
                    request={async (params) => {
                        const { current, pageSize } = params;
                        delete params.current;
                        delete params.pageSize;
                        const skipCount = (current! - 1) * pageSize!;
                        let result: any = [];
                        if (relationshipType == 'users') {
                            result = await getOrganizationUnitAssignableUsers(selectOrganizationId!, {
                                ...params,
                                skipCount,
                                maxResultCount: pageSize,
                            });
                        } else if (relationshipType == 'roles') {
                            result = await getOrganizationUnitAssignableRoles(selectOrganizationId!, {
                                ...params,
                                skipCount,
                                maxResultCount: pageSize,
                            });
                        }

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
            </Modal>
        </PageContainer>
    );
};

export default Index;
