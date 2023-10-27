import { API } from '@/services/typings';
import { PageContainer, ProForm, ProFormSwitch, ProFormDigit, ProFormText, ProFormSelect } from '@ant-design/pro-components';
import { Card, Tabs, message } from 'antd';
import React, { useState } from 'react';
import { FormattedMessage, useAccess, useIntl } from '@umijs/max';
import { getAccountAdminSettings, updateAccountAdminSettings } from '@/services/AccountAdminSettings';

const Account: React.FC = () => {
    const intl = useIntl();
    const access = useAccess();

    const [data, setData] = useState<API.AccountAdminSettings>();

    return (
        <PageContainer>
            <Card>
                <ProForm<API.AccountAdminSettings>
                    request={async () => {
                        const result = await getAccountAdminSettings();
                        setData(result ?? {});
                        return result ?? {};
                    }}
                    onFinish={async (values) => {
                        const result = await updateAccountAdminSettings(Object.assign(data ?? {}, values));

                        if (!result.data) {
                            message.success(intl.formatMessage({ id: 'common.dict.modified.success' }));
                        }
                    }}
                >
                    <Tabs
                        items={[
                            {
                                key: 'general',
                                label: <FormattedMessage id="page.accountAdminSettings.field.general" />,
                                children: (
                                    <>
                                        <ProFormSwitch
                                            name={['general', 'isSelfRegistrationEnabled']}
                                            label={
                                                <FormattedMessage id="page.accountGeneralSettings.field.isSelfRegistrationEnabled" />
                                            }
                                        />
                                        <ProFormSwitch
                                            name={['general', 'enableLocalLogin']}
                                            label={<FormattedMessage id="page.accountGeneralSettings.field.enableLocalLogin" />}
                                        />
                                    </>
                                ),
                            },
                            {
                                key: 'captcha',
                                label: <FormattedMessage id="page.accountAdminSettings.field.captcha" />,
                                children: (
                                    <>
                                        <ProFormSwitch
                                            name={['captcha', 'enableOnLogin']}
                                            label={<FormattedMessage id="page.accountCaptchaSettings.field.enableOnLogin" />}
                                        />
                                        <ProFormSwitch
                                            name={['captcha', 'enableOnRegistration']}
                                            label={
                                                <FormattedMessage id="page.accountCaptchaSettings.field.enableOnRegistration" />
                                            }
                                        />
                                    </>
                                ),
                            },
                        ]}
                    ></Tabs>
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default Account;
