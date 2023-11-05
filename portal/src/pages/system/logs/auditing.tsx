import { deleteAuditLog, getAuditLog, getAuditLogPagedList } from '@/services/AuditLog';
import { API } from '@/services/typings';
import { ActionType, ModalForm, PageContainer, ProDescriptions, ProTable } from '@ant-design/pro-components';
import { formatMessage, useIntl } from '@umijs/max';
import { Card, Modal, Popconfirm, Space, Table, Tabs, Tag, Tooltip, message } from 'antd';
import React, { useRef, useState } from 'react';

const handleAuditLogDelete = async (id: string) => {
    const response = await deleteAuditLog(id);
    if (response.ok) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const AuditLog: React.FC = () => {
    const tableActionRef = useRef<ActionType>();

    const intl = useIntl();

    // const [id, setId] = useState<string>();
    const [showDetail, setShowDetail] = useState(false);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<API.AuditLog>();

    const loadDetails = async (id: string) => {
        setLoading(true);
        setShowDetail(true);
        const result = (await getAuditLog(id!)) ?? {};
        setData(result);
        setLoading(false);
    };

    return (
        <PageContainer>
            <ProTable<API.AuditLog>
                actionRef={tableActionRef}
                columns={[
                    {
                        dataIndex: 'applicationName',
                        title: intl.formatMessage({ id: 'page.auditLog.field.request' }),
                        search: false,
                        render: (_, record) => (
                            <Space size="small">
                                {record.httpStatusCode! < 400 && <Tag color="success">{record.httpStatusCode}</Tag>}
                                {record.httpStatusCode! >= 400 && record.httpStatusCode! < 500 && (
                                    <Tag color="warning">{record.httpStatusCode}</Tag>
                                )}
                                {record.httpStatusCode! >= 500 && <Tag color="error">{record.httpStatusCode}</Tag>}
                                {record.httpMethod == 'DELETE' ? (
                                    <Tag color="error">{record.httpMethod}</Tag>
                                ) : (
                                    <Tag color="success">{record.httpMethod}</Tag>
                                )}
                                {record.url}
                            </Space>
                        ),
                        width: '30%',
                    },
                    {
                        dataIndex: 'url',
                        title: intl.formatMessage({ id: 'page.auditLog.field.url' }),
                        hideInTable: true,
                    },
                    {
                        dataIndex: 'httpMethod',
                        title: intl.formatMessage({ id: 'page.auditLog.field.httpMethod' }),
                        hideInTable: true,
                    },
                    {
                        dataIndex: 'httpStatusCode',
                        title: intl.formatMessage({ id: 'page.auditLog.field.httpStatusCode' }),
                        hideInTable: true,
                    },
                    {
                        dataIndex: 'applicationName',
                        title: intl.formatMessage({ id: 'page.auditLog.field.applicationName' }),
                    },
                    {
                        dataIndex: 'userName',
                        title: intl.formatMessage({ id: 'page.auditLog.field.userName' }),
                        renderText: (_, record) => <Tooltip title={record.userId}>{_ ?? '-'}</Tooltip>,
                    },
                    // {
                    //     dataIndex: 'tenantName',
                    //     title: intl.formatMessage({ id: 'page.auditLog.field.tenantName' }),
                    //     search: false,
                    //     renderText: (_, record) => <Tooltip title={record.tenantId}>{_ ?? '-'}</Tooltip>,
                    // },

                    {
                        dataIndex: 'clientIpAddress',
                        title: intl.formatMessage({ id: 'page.auditLog.field.clientIpAddress' }),
                    },
                    {
                        dataIndex: 'executionTime',
                        title: intl.formatMessage({ id: 'page.auditLog.field.executionTime' }),
                        valueType: 'dateTime',
                        search: false,
                    },
                    {
                        dataIndex: 'executionTime',
                        title: intl.formatMessage({ id: 'page.auditLog.field.executionTime' }),
                        valueType: 'dateTimeRange',
                        hideInTable: true,
                        search: {
                            transform: (value) => ({ startTime: value[0], endTime: value[1] }),
                        },
                    },
                    {
                        dataIndex: 'executionDuration',
                        title: intl.formatMessage({ id: 'page.auditLog.field.executionDuration' }),
                        search: false,
                    },
                    {
                        dataIndex: 'executionDuration',
                        title: intl.formatMessage({ id: 'page.auditLog.field.executionDuration' }),
                        valueType: 'digitRange',
                        hideInTable: true,
                        search: {
                            transform: (value) => ({ minExecutionDuration: value[0], maxExecutionDuration: value[1] }),
                        },
                    },
                    {
                        dataIndex: 'clientName',
                        title: intl.formatMessage({ id: 'page.auditLog.field.clientName' }),
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'correlationId',
                        title: intl.formatMessage({ id: 'page.auditLog.field.correlationId' }),
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'browserInfo',
                        title: intl.formatMessage({ id: 'page.auditLog.field.browserInfo' }),
                        ellipsis: true,
                    },
                    {
                        title: intl.formatMessage({ id: 'common.dict.table-action' }),
                        valueType: 'option',
                        align: 'center',
                        width: 110,
                        render: (text, record, _, action) => [
                            <a
                                key="details"
                                onClick={() => {
                                    loadDetails(record.id);
                                }}
                            >
                                {intl.formatMessage({ id: 'common.dict.details' })}
                            </a>,
                            <Popconfirm
                                key="delete"
                                title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                onConfirm={async () => {
                                    if (await handleAuditLogDelete(record.id)) {
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
                form={{
                    labelWrap: true,
                    labelWidth: 120,
                }}
                request={async (params) => {
                    const { current, pageSize } = params;
                    delete params.current;
                    delete params.pageSize;
                    const skipCount = (current! - 1) * pageSize!;
                    const result = await getAuditLogPagedList({
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

            <Modal
                open={showDetail}
                onCancel={() => setShowDetail(false)}
                title={intl.formatMessage({ id: 'common.dict.details' })}
                width={800}
                footer={false}
                destroyOnClose
            >
                <Tabs
                    items={[
                        {
                            label: intl.formatMessage({ id: 'page.auditLog.overview' }),
                            key: 'overview',
                            children: (
                                <ProDescriptions
                                    loading={loading}
                                    dataSource={data}
                                    column={1}
                                    columns={[
                                        {
                                            dataIndex: 'applicationName',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.applicationName' }),
                                        },
                                        {
                                            dataIndex: 'url',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.url' }),
                                            copyable: true,
                                        },
                                        {
                                            dataIndex: 'httpMethod',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.httpMethod' }),
                                            copyable: true,
                                        },

                                        {
                                            dataIndex: 'httpStatusCode',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.httpStatusCode' }),
                                            copyable: true,
                                        },
                                        {
                                            dataIndex: 'userId',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.userId' }),
                                        },
                                        {
                                            dataIndex: 'userName',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.userName' }),
                                            copyable: true,
                                        },
                                        {
                                            dataIndex: 'executionTime',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.executionTime' }),
                                            valueType: 'dateTime',
                                        },
                                        {
                                            dataIndex: 'executionDuration',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.executionDuration' }),
                                        },
                                        {
                                            dataIndex: 'clientIpAddress',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.clientIpAddress' }),
                                            copyable: true,
                                        },
                                        {
                                            dataIndex: 'clientName',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.clientName' }),
                                        },
                                        {
                                            dataIndex: 'clientId',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.clientId' }),
                                        },
                                        {
                                            dataIndex: 'correlationId',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.correlationId' }),
                                            copyable: true,
                                        },
                                        {
                                            dataIndex: 'browserInfo',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.browserInfo' }),
                                            copyable: true,
                                        },
                                        {
                                            dataIndex: 'impersonatorUserId',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.impersonatorUserId' }),
                                        },
                                        {
                                            dataIndex: 'impersonatorTenantId',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.impersonatorTenantId' }),
                                        },
                                        {
                                            dataIndex: 'impersonatorTenantName',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.impersonatorTenantName' }),
                                        },
                                        {
                                            dataIndex: 'tenantId',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.tenantId' }),
                                        },
                                        {
                                            dataIndex: 'tenantName',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.tenantName' }),
                                        },
                                        {
                                            dataIndex: 'exceptions',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.exceptions' }),
                                            copyable: true,
                                            valueType: 'code',
                                            renderText: (_) => (_ ? _ : '{}'),
                                        },
                                        {
                                            dataIndex: 'comments',
                                            title: intl.formatMessage({ id: 'page.auditLog.field.comments' }),
                                            copyable: true,
                                        },
                                    ]}
                                />
                            ),
                        },
                        {
                            label: intl.formatMessage({ id: 'page.auditLog.actions' }),
                            key: 'actions',
                            children: (
                                <ProTable
                                    dataSource={data?.actions ?? []}
                                    rowKey="id"
                                    search={false}
                                    toolBarRender={false}
                                    pagination={false}
                                    columns={[
                                        {
                                            dataIndex: 'serviceName',
                                            title: intl.formatMessage({ id: 'page.auditLog.action.field.serviceName' }),
                                            copyable: true,
                                        },
                                        {
                                            dataIndex: 'methodName',
                                            title: intl.formatMessage({ id: 'page.auditLog.action.field.methodName' }),
                                            ellipsis: true,
                                            copyable: true,
                                        },
                                        {
                                            dataIndex: 'executionDuration',
                                            title: intl.formatMessage({
                                                id: 'page.auditLog.action.field.executionDuration',
                                            }),
                                        },
                                        {
                                            dataIndex: 'executionTime',
                                            title: intl.formatMessage({ id: 'page.auditLog.action.field.executionTime' }),
                                            valueType: 'dateTime',
                                        },
                                        {
                                            dataIndex: 'parameters',
                                            title: intl.formatMessage({ id: 'page.auditLog.action.field.parameters' }),
                                            copyable: true,
                                        },
                                    ]}
                                />
                            ),
                        },
                    ]}
                ></Tabs>
            </Modal>
        </PageContainer>
    );
};

export default AuditLog;
