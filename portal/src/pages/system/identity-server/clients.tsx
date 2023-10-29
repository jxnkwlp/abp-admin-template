import {
    createOpenIddictApplication,
    deleteOpenIddictApplication,
    getOpenIddictApplication,
    getOpenIddictApplicationPagedList,
    updateOpenIddictApplication,
} from '@/services/OpenIddictApplication';
import { API } from '@/services/typings';
import {
    ActionType,
    ModalForm,
    PageContainer,
    ProFormDependency,
    ProFormSelect,
    ProFormText,
    ProTable,
} from '@ant-design/pro-components';
import { formatMessage, useAccess, useIntl } from '@umijs/max';
import { Button, Popconfirm, message } from 'antd';
import React, { useRef, useState } from 'react';

const handleOpenIddictApplicationAdd = async (data: any) => {
    const response = await createOpenIddictApplication(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleOpenIddictApplicationEdit = async (id: string, data: any) => {
    const response = await updateOpenIddictApplication(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleOpenIddictApplicationDelete = async (id: string) => {
    const response = await deleteOpenIddictApplication(id);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const OpenIddictApplication: React.FC = () => {
    const intl = useIntl();
    const access = useAccess();

    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.OpenIddictApplication>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    return (
        <PageContainer>
            <ProTable<API.OpenIddictApplication>
                actionRef={tableActionRef}
                columns={[
                    {
                        dataIndex: 'displayName',
                        title: intl.formatMessage({ id: 'page.openIddictApplication.field.displayName' }),
                        search: false,
                        copyable: true,
                    },
                    {
                        dataIndex: 'clientId',
                        title: intl.formatMessage({ id: 'page.openIddictApplication.field.clientId' }),
                        search: false,
                        copyable: true,
                    },
                    {
                        dataIndex: 'type',
                        title: intl.formatMessage({ id: 'page.openIddictApplication.field.type' }),
                        search: false,
                    },
                    {
                        dataIndex: 'consentType',
                        title: intl.formatMessage({ id: 'page.openIddictApplication.field.consentType' }),
                        search: false,
                    },

                    {
                        dataIndex: 'clientUri',
                        title: intl.formatMessage({ id: 'page.openIddictApplication.field.clientUri' }),
                        search: false,
                    },
                    {
                        dataIndex: 'logoUri',
                        title: intl.formatMessage({ id: 'page.openIddictApplication.field.logo' }),
                        search: false,
                        valueType: 'image',
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
                                    setEditModalTitle(`${intl.formatMessage({ id: 'common.dict.edit' })} - ${record.clientId}`);
                                }}
                            >
                                {intl.formatMessage({ id: 'common.dict.edit' })}
                            </a>,
                            <Popconfirm
                                key="delete"
                                title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                onConfirm={async () => {
                                    if (await handleOpenIddictApplicationDelete(record.id)) {
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
                    const result = await getOpenIddictApplicationPagedList({
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

            {/* 'Open Iddict Application' Create/Update */}
            <ModalForm
                title={editModalTitle}
                width={580}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                request={async () => {
                    if (!editModalDataId)
                        return {
                            type: 'public',
                            consentType: 'implicit',
                            grantTypes: ['implicit'],
                        };
                    return await getOpenIddictApplication(editModalDataId);
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleOpenIddictApplicationEdit(editModalDataId, data);
                    } else {
                        success = await handleOpenIddictApplicationAdd(data);
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
                    name={['displayName']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.displayName' })}
                />
                <ProFormSelect
                    rules={[{ required: true }]}
                    name={['type']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.type' })}
                    options={[
                        { label: 'Confidential', value: 'confidential' },
                        { label: 'Public', value: 'public' },
                    ]}
                />
                <ProFormText
                    rules={[{ required: true }, { max: 64 }]}
                    name={['clientId']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.clientId' })}
                />
                <ProFormDependency name={['type']}>
                    {({ type }) => (
                        <ProFormText
                            rules={[{ required: type == 'confidential' }]}
                            name={['clientSecret']}
                            label={intl.formatMessage({ id: 'page.openIddictApplication.field.clientSecret' })}
                        />
                    )}
                </ProFormDependency>
                <ProFormSelect
                    rules={[{ required: true }]}
                    name={['consentType']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.consentType' })}
                    options={[
                        { label: 'Explicit', value: 'explicit' },
                        { label: 'External', value: 'external' },
                        { label: 'Implicit', value: 'implicit' },
                        { label: 'Systematic', value: 'systematic' },
                    ]}
                />
                <ProFormSelect
                    rules={[{ required: true }]}
                    name={['grantTypes']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.grantTypes' })}
                    mode="tags"
                    options={[
                        { label: 'AuthorizationCode', value: 'authorization_code' },
                        { label: 'Client Credentials', value: 'client_credentials' },
                        { label: 'Device Code', value: 'urn:ietf:params:oauth:grant-type:device_code' },
                        { label: 'Implicit', value: 'implicit' },
                        { label: 'Password', value: 'password' },
                        { label: 'Refresh Token', value: 'refresh_token' },
                    ]}
                />
                <ProFormSelect
                    rules={[{ required: false }]}
                    name={['scopes']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.scopes' })}
                    options={[
                        { label: 'Address', value: 'address' },
                        { label: 'Email', value: 'email' },
                        { label: 'Offline Access', value: 'offline_access' },
                        { label: 'OpenId', value: 'openid' },
                        { label: 'Phone', value: 'phone' },
                        { label: 'Profile', value: 'profile' },
                        { label: 'Roles', value: 'roles' },
                    ]}
                    mode="tags"
                />
                <ProFormText
                    rules={[{ required: false }, { max: 256 }]}
                    name={['clientUri']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.clientUri' })}
                />
                <ProFormText
                    rules={[{ required: false }, { max: 256 }]}
                    name={['logoUri']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.logoUri' })}
                />
                <ProFormSelect
                    rules={[{ required: false }]}
                    name={['redirectUris']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.redirectUris' })}
                    mode="tags"
                />
                <ProFormSelect
                    rules={[{ required: false }]}
                    name={['postLogoutRedirectUris']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.postLogoutRedirectUris' })}
                    mode="tags"
                />
                <ProFormSelect
                    rules={[{ required: false }]}
                    name={['requirements']}
                    label={intl.formatMessage({ id: 'page.openIddictApplication.field.requirements' })}
                    mode="tags"
                />
            </ModalForm>
        </PageContainer>
    );
};

export default OpenIddictApplication;
