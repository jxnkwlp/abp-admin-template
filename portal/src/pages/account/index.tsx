import { getAccountProfile, updateAccountProfile } from '@/services/AccountProfile';
import { API } from '@/services/typings';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { history, useIntl, useLocation } from '@umijs/max';
import { Card, message } from 'antd';
import React, { useState } from 'react';

export const AccountTabList = [
    {
        key: 'center',
        label: 'Profile',
    },
    {
        key: 'change-password',
        label: 'Change Password',
    },
    {
        key: 'security-logs',
        label: 'Security Logs',
    },
];

export const AccountSelect = () => {};

export const Index: React.FC = () => {
    const location = useLocation();
    const intl = useIntl();

    const [data, setData] = useState<API.Profile>();

    return (
        <PageContainer>
            <Card
                tabList={AccountTabList}
                activeTabKey={location.pathname.replace('/account/', '')}
                onTabChange={(key) => history.push('/account/' + key)}
            >
                <ProForm
                    layout="horizontal"
                    labelWrap
                    labelCol={{ span: 2 }}
                    request={async () => {
                        const result = await getAccountProfile();
                        setData(result);
                        return result ?? {};
                    }}
                    onFinish={async (values) => {
                        const result = await updateAccountProfile({ ...data, ...values });
                        if (result) {
                            setData(result);
                            message.success(intl.formatMessage({ id: 'common.dict.modified.success' }));
                        }
                    }}
                >
                    <ProFormText
                        disabled
                        rules={[{ required: true }, { max: 128 }]}
                        name="userName"
                        label={intl.formatMessage({ id: 'page.profile.field.userName' })}
                        width={'md'}
                    />
                    <ProFormText
                        rules={[{ required: true }, { max: 128 }, { type: 'email' }]}
                        name="email"
                        label={intl.formatMessage({ id: 'page.profile.field.email' })}
                        width={'md'}
                    />
                    <ProFormText
                        rules={[{ required: true }, { max: 32 }]}
                        name="name"
                        label={intl.formatMessage({ id: 'page.profile.field.name' })}
                        width={'md'}
                    />
                    <ProFormText
                        rules={[{ required: false }, { max: 32 }]}
                        name="surname"
                        label={intl.formatMessage({ id: 'page.profile.field.surname' })}
                        width={'md'}
                    />
                    <ProFormText
                        rules={[{ required: false }, { max: 32 }]}
                        name="phoneNumber"
                        label={intl.formatMessage({ id: 'page.profile.field.phoneNumber' })}
                        width={'md'}
                    />
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default Index;
