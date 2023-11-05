import { trueOrfalseEnum } from '@/pages/common';
import {
    createIdentityClient,
    updateIdentityClient,
    deleteIdentityClient,
    getIdentityClientList,
    getIdentityClient,
    identityClientValidate,
} from '@/services/IdentityClient';
import { IdentityProviderType } from '@/services/enums';
import { API } from '@/services/typings';
import { enumToOptions, enumToStatus } from '@/services/untils';
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
    ProFormRadio,
    ProFormDependency,
} from '@ant-design/pro-components';
import { FormattedMessage, formatMessage, useIntl } from '@umijs/max';
import { Button, Card, Popconfirm, Space, Tabs, message } from 'antd';
import React, { useRef, useState } from 'react';

const handleIdentityClientAdd = async (data: any) => {
    const response = await createIdentityClient(data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.created.success' }));
        return true;
    }
    return false;
};

const handleIdentityClientEdit = async (id: string, data: any) => {
    const response = await updateIdentityClient(id, data);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.modified.success' }));
        return true;
    }
    return false;
};

const handleIdentityClientDelete = async (id: string) => {
    const response = await deleteIdentityClient(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const IdentityClient: React.FC = () => {
    const tableActionRef = useRef<ActionType>();

    const [loading, setLoading] = useState<boolean>(false);

    const intl = useIntl();

    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
    const [editModalTitle, setEditModalTitle] = useState<string>('');
    const [editModalData, setEditModalData] = useState<API.IdentityClient>();
    const [editModalDataId, setEditModalDataId] = useState<string>();

    const [identityType, setIdentityType] = useState(1);

    const [configurationVerify, setConfigurationVerify] = useState(false);

    const handleVerify = async () => {
        setConfigurationVerify(true);
        const result = await identityClientValidate(editModalDataId!);
        if (result?.ok) {
            message.success(intl.formatMessage({ id: 'common.dict.success' }));
        }
        setConfigurationVerify(false);
    };

    const oidcConfigurationTabItem = () => ({
        label: intl.formatMessage({
            id: 'page.identityClient.field.openIdConnectConfiguration',
        }),
        key: 'oidc',
        children: (
            <>
                <ProFormText
                    rules={[{ required: true }, { max: 256 }, { type: 'url' }]}
                    name={['openIdConnectConfiguration', 'metadataAddress']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.metadataAddress',
                    })}
                />
                <ProFormText
                    rules={[{ required: true }, { max: 256 }]}
                    name={['openIdConnectConfiguration', 'authority']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.authority',
                    })}
                />
                <ProFormText
                    rules={[{ required: false }]}
                    name={['openIdConnectConfiguration', 'clientId']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.clientId',
                    })}
                />
                <ProFormText.Password
                    rules={[{ required: false }]}
                    name={['openIdConnectConfiguration', 'clientSecret']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.clientSecret',
                    })}
                    fieldProps={{ autoComplete: 'one-time-code' }}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['openIdConnectConfiguration', 'requireHttpsMetadata']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.requireHttpsMetadata',
                    })}
                />
                <ProFormText
                    rules={[{ required: false }]}
                    name={['openIdConnectConfiguration', 'responseMode']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.responseMode',
                    })}
                />
                <ProFormText
                    rules={[{ required: false }]}
                    name={['openIdConnectConfiguration', 'responseType']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.responseType',
                    })}
                />

                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['openIdConnectConfiguration', 'usePkce']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.usePkce',
                    })}
                />
                <ProFormText
                    rules={[{ required: false }]}
                    name={['openIdConnectConfiguration', 'scope']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.scope',
                    })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['openIdConnectConfiguration', 'getClaimsFromUserInfoEndpoint']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.openIdConnectConfiguration.field.getClaimsFromUserInfoEndpoint',
                    })}
                />
            </>
        ),
    });

    const saml2ConfigurationTabItem = () => ({
        label: intl.formatMessage({
            id: 'page.identityClient.field.saml2Configuration',
        }),
        key: 'saml2',
        active: identityType == 2,
        destroyInactiveTabPane: true,
        children: (
            <>
                <ProFormRadio.Group
                    rules={[{ required: true }]}
                    name={['saml2Configuration', 'idpMetadataType']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.idpMetadataType',
                    })}
                    options={[
                        { label: 'Url', value: 'url' },
                        { label: 'Content', value: 'content' },
                    ]}
                />
                <ProFormDependency name={[['saml2Configuration', 'idpMetadataType']]}>
                    {(depValues: { saml2Configuration?: { idpMetadataType?: string } }) => {
                        return depValues?.saml2Configuration?.idpMetadataType == 'url' ? (
                            <ProFormText
                                rules={[{ required: true }, { type: 'url' }]}
                                name={['saml2Configuration', 'idpMetadataUrl']}
                                label={intl.formatMessage({
                                    id: 'page.identityClient.saml2Configuration.field.idpMetadataUrl',
                                })}
                            />
                        ) : (
                            <ProFormTextArea
                                rules={[{ required: true }]}
                                name={['saml2Configuration', 'idpMetadataContent']}
                                label={intl.formatMessage({
                                    id: 'page.identityClient.saml2Configuration.field.idpMetadataContent',
                                })}
                            />
                        );
                    }}
                </ProFormDependency>
                <ProFormText
                    rules={[{ required: true }]}
                    name={['saml2Configuration', 'issuer']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.issuer',
                    })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'forceAuthn']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.forceAuthn',
                    })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'trustCertificate']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.trustCertificate',
                    })}
                />

                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'authnRequestsSigned']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.authnRequestsSigned',
                    })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'requireAssertionsSigned']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.requireAssertionsSigned',
                    })}
                />
                <ProFormTextArea
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'signingCertificatePem']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.signingCertificatePem',
                    })}
                />
                <ProFormTextArea
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'signingCertificateKeyPem']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.signingCertificateKeyPem',
                    })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'useGetAsAssertionConsumerService']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.useGetAsAssertionConsumerService',
                    })}
                />
                <ProFormSwitch
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'useGetAsSingleLogoutService']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.useGetAsSingleLogoutService',
                    })}
                />
                <ProFormText
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'callbackPath']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.callbackPath',
                    })}
                />
                <ProFormText
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'remoteSignOutPath']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.remoteSignOutPath',
                    })}
                />
                <ProFormSelect
                    rules={[{ required: false }]}
                    name={['saml2Configuration', 'nameIDFormats']}
                    label={intl.formatMessage({
                        id: 'page.identityClient.saml2Configuration.field.nameIDFormats',
                    })}
                    mode="tags"
                />
            </>
        ),
    });

    return (
        <PageContainer>
            <ProTable<API.IdentityClient>
                actionRef={tableActionRef}
                columns={[
                    // {
                    //     dataIndex: 'name',
                    //     title: intl.formatMessage({ id: 'page.identityClient.field.name' }),
                    //     hideInTable: true,
                    // },
                    {
                        dataIndex: 'name',
                        title: intl.formatMessage({ id: 'page.identityClient.field.name' }),
                        search: false,
                        copyable: true,
                    },
                    {
                        dataIndex: 'displayName',
                        title: intl.formatMessage({ id: 'page.identityClient.field.displayName' }),
                        search: false,
                    },
                    {
                        dataIndex: 'providerType',
                        title: intl.formatMessage({ id: 'page.identityClient.field.providerType' }),
                        search: false,
                        valueEnum: enumToStatus(IdentityProviderType),
                    },
                    {
                        dataIndex: 'isEnabled',
                        title: intl.formatMessage({ id: 'page.identityClient.field.isEnabled' }),
                        search: false,
                        valueEnum: trueOrfalseEnum,
                        align: 'center',
                    },
                    {
                        dataIndex: 'displayOrder',
                        title: intl.formatMessage({ id: 'page.identityClient.field.displayOrder' }),
                        search: false,
                    },
                    {
                        dataIndex: 'creationTime',
                        title: intl.formatMessage({ id: 'page.identityClient.field.creationTime' }),
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
                                    if (await handleIdentityClientDelete(record.id)) {
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
                    const result = await getIdentityClientList({
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
                search={false}
            />

            {/* 'Identity Client' Create/Update */}
            <ModalForm<API.IdentityClientCreate>
                title={editModalTitle}
                width={680}
                open={editModalVisible}
                modalProps={{ destroyOnClose: true, maskClosable: false }}
                onOpenChange={setEditModalVisible}
                initialValues={editModalData}
                request={async () => {
                    if (!editModalDataId)
                        return { displayOrder: 100, isEnabled: true, providerType: 1 } as API.IdentityClientCreate;
                    let result = (await getIdentityClient(editModalDataId)) as API.IdentityClientCreate;
                    setIdentityType(result?.providerType);
                    result = {
                        ...result,
                        saml2Configuration: {
                            ...(result?.saml2Configuration ?? {}),
                            // @ts-ignore
                            idpMetadataType: result?.saml2Configuration?.idpMetadataUrl ? 'url' : 'content',
                        },
                    };
                    return result;
                }}
                onFinish={async (value) => {
                    let success = false;
                    // @ts-nocheck
                    const data = { ...value };
                    if (editModalDataId) {
                        success = await handleIdentityClientEdit(editModalDataId, data);
                    } else {
                        success = await handleIdentityClientAdd(data);
                    }

                    if (success) {
                        tableActionRef?.current?.reload();
                    }

                    return success;
                }}
                onValuesChange={(values) => {
                    if (values.providerType) setIdentityType(values.providerType);
                }}
                submitter={{
                    render: (props, dom) => {
                        return (
                            <Space>
                                <Button disabled={configurationVerify} onClick={() => handleVerify()}>
                                    <FormattedMessage id="page.identityClient.verify" />
                                </Button>
                                {dom}
                            </Space>
                        );
                    },
                }}
                layout="horizontal"
                labelCol={{ span: 6 }}
                labelWrap
                scrollToFirstError
            >
                <Tabs
                    items={[
                        {
                            label: intl.formatMessage({
                                id: 'page.identityClient.general',
                            }),
                            key: 'overview',
                            children: (
                                <>
                                    <ProFormText
                                        rules={[{ required: true }, { max: 16 }]}
                                        name="name"
                                        label={intl.formatMessage({ id: 'page.identityClient.field.name' })}
                                    />
                                    <ProFormText
                                        rules={[{ required: true }]}
                                        name="displayName"
                                        label={intl.formatMessage({ id: 'page.identityClient.field.displayName' })}
                                    />
                                    <ProFormSelect
                                        rules={[{ required: true }]}
                                        name="providerType"
                                        label={intl.formatMessage({ id: 'page.identityClient.field.providerType' })}
                                        options={enumToOptions(IdentityProviderType, true)}
                                        disabled={!!editModalDataId}
                                    />
                                    <ProFormSwitch
                                        rules={[{ required: false }]}
                                        name="isEnabled"
                                        label={intl.formatMessage({ id: 'page.identityClient.field.isEnabled' })}
                                    />
                                    <ProFormDigit
                                        rules={[{ required: true }]}
                                        name="displayOrder"
                                        label={intl.formatMessage({ id: 'page.identityClient.field.displayOrder' })}
                                    />
                                    <ProFormSelect
                                        rules={[{ required: false }]}
                                        name="requiredClaimTypes"
                                        label={intl.formatMessage({ id: 'page.identityClient.field.requiredClaimTypes' })}
                                        mode="tags"
                                    />
                                    <ProFormSwitch
                                        rules={[{ required: false }]}
                                        name="isDebugMode"
                                        label={intl.formatMessage({ id: 'page.identityClient.field.isDebugMode' })}
                                    />
                                </>
                            ),
                        },
                        identityType == 1 ? oidcConfigurationTabItem() : saml2ConfigurationTabItem(),
                    ]}
                ></Tabs>
            </ModalForm>
        </PageContainer>
    );
};

export default IdentityClient;
