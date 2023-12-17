import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import React from 'react';
import { AccountTabList } from '.';
import { history, useIntl, useLocation } from '@umijs/max';
import { accountProfileChangePassword } from '@/services/AccountProfile';
import { API } from '@/services/typings';
import { useForm } from 'antd/es/form/Form';

const ChangePassword: React.FC = () => {
    const location = useLocation();
    const intl = useIntl();

    const [form] = useForm();

    return (
        <ProForm<API.ChangePasswordInput>
            form={form}
            onFinish={async (values) => {
                const result = await accountProfileChangePassword(values);
                console.log(result);
                if (result?.ok) {
                    message.success(intl.formatMessage({ id: 'common.dict.modified.success' }));
                    form.resetFields();
                }
            }}
        >
            <ProFormText.Password
                rules={[{ required: true }, { max: 128 }]}
                name="currentPassword"
                label={intl.formatMessage({ id: 'page.account.change-password.field.currentPassword' })}
                width={'md'}
                fieldProps={{ autoComplete: 'one-time-code' }}
            />
            <ProFormText.Password
                rules={[{ required: true }, { max: 128 }]}
                name="newPassword"
                label={intl.formatMessage({ id: 'page.account.change-password.field.newPassword' })}
                width={'md'}
                fieldProps={{ autoComplete: 'one-time-code' }}
            />
            <ProFormText.Password
                rules={[
                    { required: true },
                    { max: 128 },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('newPassword') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                        },
                    }),
                ]}
                name="confirmPassword"
                label={intl.formatMessage({ id: 'page.account.change-password.field.confirmPassword' })}
                width={'md'}
                fieldProps={{ autoComplete: 'one-time-code' }}
            />
        </ProForm>
    );
};

export default ChangePassword;
