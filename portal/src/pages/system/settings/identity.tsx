import { getIdentitySettings, updateIdentitySettings } from '@/services/IdentitySettings';
import { IdentityTwofactoryBehaviour } from '@/services/enums';
import { API } from '@/services/typings';
import { enumToOptions } from '@/services/untils';
import { PageContainer, ProForm, ProFormDigit, ProFormSelect, ProFormSwitch, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useAccess, useIntl } from '@umijs/max';
import { Card, Tabs, message } from 'antd';
import React, { useState } from 'react';

const Identity: React.FC = () => {
    const intl = useIntl();

    const [data, setData] = useState<API.IdentitySettings>();

    return (
        <PageContainer>
            <Card>
                <ProForm<API.IdentitySettings>
                    request={async () => {
                        const result = await getIdentitySettings();
                        setData(result ?? {});
                        return result ?? {};
                    }}
                    onFinish={async (values) => {
                        const result = await updateIdentitySettings(Object.assign(data ?? {}, values));

                        if (!result.data) {
                            message.success(intl.formatMessage({ id: 'common.dict.modified.success' }));
                        }
                    }}
                >
                    <Tabs
                        items={[
                            {
                                key: 'user',
                                label: <FormattedMessage id="page.identitySettings.field.user" />,
                                children: (
                                    <>
                                        <ProFormSwitch
                                            name={['user', 'isEmailUpdateEnabled']}
                                            label={
                                                <FormattedMessage id="page.identityUserSettings.field.isEmailUpdateEnabled" />
                                            }
                                        />
                                        <ProFormSwitch
                                            name={['user', 'isUserNameUpdateEnabled']}
                                            label={
                                                <FormattedMessage id="page.identityUserSettings.field.isUserNameUpdateEnabled" />
                                            }
                                        />
                                        <ProFormSwitch
                                            name={['user', 'requireUniqueEmail']}
                                            label={<FormattedMessage id="page.identityUserSettings.field.requireUniqueEmail" />}
                                        />
                                    </>
                                ),
                            },
                            {
                                key: 'password',
                                label: <FormattedMessage id="page.identitySettings.field.password" />,
                                children: (
                                    <>
                                        <ProFormSwitch
                                            name={['password', 'requireDigit']}
                                            label={<FormattedMessage id="page.identityPasswordSettings.field.requireDigit" />}
                                        />
                                        <ProFormSwitch
                                            name={['password', 'requireLowercase']}
                                            label={
                                                <FormattedMessage id="page.identityPasswordSettings.field.requireLowercase" />
                                            }
                                        />
                                        <ProFormSwitch
                                            name={['password', 'requireNonAlphanumeric']}
                                            label={
                                                <FormattedMessage id="page.identityPasswordSettings.field.requireNonAlphanumeric" />
                                            }
                                        />
                                        <ProFormSwitch
                                            name={['password', 'requireUppercase']}
                                            label={
                                                <FormattedMessage id="page.identityPasswordSettings.field.requireUppercase" />
                                            }
                                        />
                                        <ProFormDigit
                                            name={['password', 'requiredLength']}
                                            label={<FormattedMessage id="page.identityPasswordSettings.field.requiredLength" />}
                                            width="sm"
                                        />
                                        <ProFormDigit
                                            name={['password', 'requiredUniqueChars']}
                                            label={
                                                <FormattedMessage id="page.identityPasswordSettings.field.requiredUniqueChars" />
                                            }
                                            width="sm"
                                        />
                                        <ProFormSwitch
                                            name={['password', 'forceUsersToPeriodicallyChangePassword']}
                                            label={
                                                <FormattedMessage id="page.identityPasswordSettings.field.forceUsersToPeriodicallyChangePassword" />
                                            }
                                        />
                                        <ProFormDigit
                                            name={['password', 'passwordChangePeriodDays']}
                                            label={
                                                <FormattedMessage id="page.identityPasswordSettings.field.passwordChangePeriodDays" />
                                            }
                                            width="sm"
                                        />
                                    </>
                                ),
                            },
                            {
                                key: 'lockout',
                                label: <FormattedMessage id="page.identitySettings.field.lockout" />,
                                children: (
                                    <>
                                        <ProFormSwitch
                                            name={['lockout', 'allowedForNewUsers']}
                                            label={
                                                <FormattedMessage id="page.identityLockoutSettings.field.allowedForNewUsers" />
                                            }
                                        />
                                        <ProFormDigit
                                            name={['lockout', 'lockoutDuration']}
                                            label={<FormattedMessage id="page.identityLockoutSettings.field.lockoutDuration" />}
                                            width="sm"
                                        />
                                        <ProFormDigit
                                            name={['lockout', 'maxFailedAccessAttempts']}
                                            label={
                                                <FormattedMessage id="page.identityLockoutSettings.field.maxFailedAccessAttempts" />
                                            }
                                            width="sm"
                                        />
                                    </>
                                ),
                            },
                            {
                                key: 'signIn',
                                label: <FormattedMessage id="page.identitySettings.field.signIn" />,
                                children: (
                                    <>
                                        <ProFormSwitch
                                            name={['signIn', 'enablePhoneNumberConfirmation']}
                                            label={
                                                <FormattedMessage id="page.identitySignInSettings.field.enablePhoneNumberConfirmation" />
                                            }
                                        />
                                        <ProFormSwitch
                                            name={['signIn', 'requireConfirmedEmail']}
                                            label={
                                                <FormattedMessage id="page.identitySignInSettings.field.requireConfirmedEmail" />
                                            }
                                        />
                                        <ProFormSwitch
                                            name={['signIn', 'requireConfirmedPhoneNumber']}
                                            label={
                                                <FormattedMessage id="page.identitySignInSettings.field.requireConfirmedPhoneNumber" />
                                            }
                                        />
                                    </>
                                ),
                            },
                            {
                                key: 'twofactor',
                                label: <FormattedMessage id="page.identitySettings.field.twofactor" />,
                                children: (
                                    <>
                                        <ProFormSwitch
                                            name={['twofactor', 'isRememberBrowserEnabled']}
                                            label={
                                                <FormattedMessage id="page.identityTwofactorSettings.field.isRememberBrowserEnabled" />
                                            }
                                        />
                                        <ProFormSelect
                                            name={['twofactor', 'twoFactorBehaviour']}
                                            label={
                                                <FormattedMessage id="page.identityTwofactorSettings.field.twoFactorBehaviour" />
                                            }
                                            rules={[{ required: true }]}
                                            options={enumToOptions(IdentityTwofactoryBehaviour)}
                                            width="sm"
                                        />
                                        <ProFormSwitch
                                            name={['twofactor', 'usersCanChange']}
                                            label={
                                                <FormattedMessage id="page.identityTwofactorSettings.field.usersCanChange" />
                                            }
                                        />
                                        <ProFormSwitch
                                            name={['twofactor', 'authenticatorEnabled']}
                                            label={
                                                <FormattedMessage id="page.identityTwofactorSettings.field.authenticatorEnabled" />
                                            }
                                        />
                                        <ProFormText
                                            name={['twofactor', 'authenticatorIssuer']}
                                            label={
                                                <FormattedMessage id="page.identityTwofactorSettings.field.authenticatorIssuer" />
                                            }
                                            rules={[{ required: true }]}
                                        />
                                    </>
                                ),
                            },
                            {
                                key: 'organizationUnit',
                                label: <FormattedMessage id="page.identitySettings.field.organizationUnit" />,
                                children: (
                                    <>
                                        <ProFormDigit
                                            name={['organizationUnit', 'maxUserMembershipCount']}
                                            label={
                                                <FormattedMessage id="page.organizationUnitSettings.field.maxUserMembershipCount" />
                                            }
                                            width="sm"
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

export default Identity;
