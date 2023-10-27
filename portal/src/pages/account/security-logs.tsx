import { deleteIdentitySecurityLog, getIdentitySecurityLogList } from '@/services/IdentitySecurityLog';
import { API } from '@/services/typings';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { formatMessage, history, useIntl, useLocation } from '@umijs/max';
import { Card, Popconfirm, Tooltip, message } from 'antd';
import React, { useRef } from 'react';
import { AccountTabList } from '.';
import { getAccountSecurityLogList } from '@/services/AccountSecurityLog';

const IdentitySecurityLog: React.FC = () => {
    const tableActionRef = useRef<ActionType>();

    const location = useLocation();
    const intl = useIntl();

    return (
        <PageContainer>
            <Card
                tabList={AccountTabList}
                activeTabKey={location.pathname.replace('/account/', '')}
                onTabChange={(key) => history.push('/account/' + key)}
            >
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
            </Card>
        </PageContainer>
    );
};

export default IdentitySecurityLog;
