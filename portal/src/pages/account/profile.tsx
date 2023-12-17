import { getAccountProfileV2, updateAccountProfile } from '@/services/AccountProfile';
import { API } from '@/services/typings';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Alert, Card, message } from 'antd';
import React, { useState } from 'react';

const Profile: React.FC = () => {
    const intl = useIntl();
    const [data, setData] = useState<API.Profile>();

    return (
        <ProForm
            labelWrap
            request={async () => {
                const result = await getAccountProfileV2();
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
                label={intl.formatMessage({ id: 'page.account.profile.field.userName' })}
                width={'md'}
            />
            <ProFormText
                rules={[{ required: true }, { max: 128 }, { type: 'email' }]}
                name="email"
                label={intl.formatMessage({ id: 'page.account.profile.field.email' })}
                width={'md'}
            />
            <ProFormText
                rules={[{ required: true }, { max: 32 }]}
                name="name"
                label={intl.formatMessage({ id: 'page.account.profile.field.name' })}
                width={'md'}
            />
            <ProFormText
                rules={[{ required: false }, { max: 32 }]}
                name="surname"
                label={intl.formatMessage({ id: 'page.account.profile.field.surname' })}
                width={'md'}
            />
            <ProFormText
                rules={[{ required: false }, { max: 32 }]}
                name="phoneNumber"
                label={intl.formatMessage({ id: 'page.account.profile.field.phoneNumber' })}
                width={'md'}
            />
        </ProForm>
    );
};

export default Profile;
