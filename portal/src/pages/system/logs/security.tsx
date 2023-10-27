import { deleteIdentitySecurityLog, getIdentitySecurityLogList } from '@/services/IdentitySecurityLog';
import { API } from '@/services/typings';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { formatMessage, useIntl } from '@umijs/max';
import { Popconfirm, Tooltip, message } from 'antd';
import React, { useRef } from 'react';

const handleIdentitySecurityLogDelete = async (id: string) => {
    const response = await deleteIdentitySecurityLog(id);
    if (response) {
        message.success(formatMessage({ id: 'common.dict.deleted.success' }));
        return true;
    }
    return false;
};

const IdentitySecurityLog: React.FC = () => {
    const tableActionRef = useRef<ActionType>();

    const intl = useIntl();

    return (
        <PageContainer>
            <ProTable<API.IdentitySecurityLog>
                actionRef={tableActionRef}
                columns={[
                    {
                        dataIndex: 'applicationName',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.applicationName' }),
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'browserInfo',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.browserInfo' }),
                        search: false,
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'identity',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.identity' }),
                    },
                    {
                        dataIndex: 'action',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.action' }),
                    },

                    {
                        dataIndex: 'userName',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.userName' }),
                        renderText: (_, record) => <Tooltip title={record.userId}>{_ ?? '-'}</Tooltip>,
                    },
                    // {
                    //     dataIndex: 'tenantName',
                    //     title: intl.formatMessage({ id: 'page.identitySecurityLog.field.tenantName' }),
                    //     search: false,
                    //     renderText: (_, record) => <Tooltip title={record.tenantId}>{_ ?? '-'}</Tooltip>,
                    // },
                    {
                        dataIndex: 'clientId',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.clientId' }),
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'clientIpAddress',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.clientIpAddress' }),
                        search: false,
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'correlationId',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.correlationId' }),
                        ellipsis: true,
                    },
                    {
                        dataIndex: 'creationTime',
                        title: intl.formatMessage({ id: 'page.identitySecurityLog.field.creationTime' }),
                        search: false,
                        valueType: 'dateTime',
                    },
                    {
                        title: intl.formatMessage({ id: 'common.dict.table-action' }),
                        valueType: 'option',
                        align: 'center',
                        width: 120,
                        render: (text, record, _, action) => [
                            <Popconfirm
                                key="delete"
                                title={intl.formatMessage({ id: 'common.dict.delete.confirm' })}
                                onConfirm={async () => {
                                    if (await handleIdentitySecurityLogDelete(record.id)) {
                                        action?.reload();
                                    }
                                }}
                            >
                                <a>{intl.formatMessage({ id: 'common.dict.delete' })}</a>
                            </Popconfirm>,
                        ],
                    },
                ]}
                form={{
                    labelWrap: true,
                    labelWidth: 120,
                }}
                rowKey="id"
                request={async (params) => {
                    const { current, pageSize } = params;
                    delete params.current;
                    delete params.pageSize;
                    const skipCount = (current! - 1) * pageSize!;
                    const result = await getIdentitySecurityLogList({
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
        </PageContainer>
    );
};

export default IdentitySecurityLog;
