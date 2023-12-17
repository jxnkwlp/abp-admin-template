import { deleteIdentitySecurityLog, getIdentitySecurityLogList } from '@/services/IdentitySecurityLog';
import { API } from '@/services/typings';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { formatMessage, history, useIntl, useLocation } from '@umijs/max';
import { Card, Popconfirm, Tooltip, message } from 'antd';
import React, { useRef } from 'react';
import { AccountTabList } from '.';
import { getAccountSecurityLogList } from '@/services/AccountSecurityLog';

const SecurityLog: React.FC = () => {
    const tableActionRef = useRef<ActionType>();

    const location = useLocation();
    const intl = useIntl();

    return (
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
            ]}
            form={{
                labelWrap: true,
            }}
            rowKey="id"
            request={async (params) => {
                const { current, pageSize } = params;
                delete params.current;
                delete params.pageSize;
                const skipCount = (current! - 1) * pageSize!;
                const result = await getAccountSecurityLogList({
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
    );
};

export default SecurityLog;
