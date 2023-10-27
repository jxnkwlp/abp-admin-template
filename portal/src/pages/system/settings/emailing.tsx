import { PageContainer, ProForm, ProFormDigit, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { Card, message } from 'antd';
import React from 'react';
import { useIntl, useLocation } from '@umijs/max';
import { API } from '@/services/typings';
import { useForm } from 'antd/es/form/Form';
import { getEmailSettings, updateEmailSettings } from '@/services/EmailSettings';

const Emailing: React.FC = () => {
    const location = useLocation();
    const intl = useIntl();

    const [form] = useForm();

    return (
        <PageContainer>
            <Card title={intl.formatMessage({ id: 'page.emailSettings' })}>
                <ProForm<API.UpdateEmailSettings>
                    layout="horizontal"
                    labelWrap
                    labelCol={{ span: 2 }}
                    form={form}
                    request={async () => {
                        const result = await getEmailSettings();
                        // setData(result ?? {});
                        return (result ?? {}) as API.UpdateEmailSettings;
                    }}
                    onFinish={async (values) => {
                        const result = await updateEmailSettings(values);
                        console.log(result);
                        if (result?.ok) {
                            message.success(intl.formatMessage({ id: 'common.dict.modified.success' }));
                        }
                    }}
                >
                    <ProFormText
                        rules={[{ required: true }, { max: 128 }]}
                        name="smtpHost"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.smtpHost' })}
                        width="md"
                    />
                    <ProFormDigit
                        rules={[{ required: true }]}
                        name="smtpPort"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.smtpPort' })}
                        fieldProps={{ precision: 0 }}
                        min={0}
                        max={51024}
                        width="md"
                    />
                    <ProFormText
                        rules={[{ required: false }, { max: 128 }]}
                        name="smtpUserName"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.smtpUserName' })}
                        width="md"
                        fieldProps={{ autoComplete: 'one-time-code' }}
                    />
                    <ProFormText.Password
                        rules={[{ required: false }, { max: 128 }]}
                        name="smtpPassword"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.smtpPassword' })}
                        width="md"
                        fieldProps={{ autoComplete: 'one-time-code' }}
                    />
                    <ProFormText
                        rules={[{ required: false }, { max: 128 }]}
                        name="smtpDomain"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.smtpDomain' })}
                        width="md"
                    />
                    <ProFormSwitch
                        rules={[{ required: false }]}
                        name="smtpEnableSsl"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.smtpEnableSsl' })}
                        width="md"
                    />
                    <ProFormSwitch
                        rules={[{ required: false }]}
                        name="smtpUseDefaultCredentials"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.smtpUseDefaultCredentials' })}
                        width="md"
                    />
                    <ProFormText
                        rules={[{ required: true }, { max: 128 }, { type: 'email' }]}
                        name="defaultFromAddress"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.defaultFromAddress' })}
                        width="md"
                    />
                    <ProFormText
                        rules={[{ required: true }, { max: 128 }]}
                        name="defaultFromDisplayName"
                        label={intl.formatMessage({ id: 'page.emailSettings.field.defaultFromDisplayName' })}
                        width="md"
                    />
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default Emailing;
