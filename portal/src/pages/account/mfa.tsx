import {
    accountTfaDisabledEmailTokenProvider,
    accountTfaDisabledPhoneNumberTokenProvider,
    accountTfaEnabled,
    accountTfaEnabledEmailTokenProvider,
    accountTfaEnabledPhoneNumberTokenProvider,
    accountTfaForgetClient,
    accountTfaRemoveAuthenticator,
    getAccountTfa,
} from '@/services/AccountTfa';
import { API } from '@/services/typings';
import { MailOutlined, MobileOutlined, PhoneOutlined } from '@ant-design/icons';
import { ModalForm, PageContainer, ProFormText, ProList } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl } from '@umijs/max';
import { Alert, Avatar, Button, Card, Col, Flex, Form, Input, List, Modal, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';

const Mfa: React.FC = () => {
    const intl = useIntl();
    const [tfaState, setTfaState] = useState<API.AccountTfa>();

    const [disableAuthenticatorAppVisible, setDisableAuthenticatorAppVisible] = useState(false);

    const loadState = async () => {
        const result = await getAccountTfa();
        setTfaState(result ?? {});
    };

    const handleEnableOrDisable = async (provider: string, enabled: boolean) => {
        if (provider == 'Authenticator') {
            if (enabled) {
                history.push('./authenticator');
            } else {
                setDisableAuthenticatorAppVisible(true);
            }
        } else if (provider == 'Email') {
            let result = null;
            if (enabled) result = await accountTfaEnabledEmailTokenProvider();
            else result = await accountTfaDisabledEmailTokenProvider();

            if (result?.ok) {
                message.success(intl.formatMessage({ id: 'common.dict.success' }));
                loadState();
            }
        } else if (provider == 'PhoneNumber') {
            let result = null;
            if (enabled) result = await accountTfaEnabledPhoneNumberTokenProvider();
            else result = await accountTfaDisabledPhoneNumberTokenProvider();
            if (result?.ok) {
                message.success(intl.formatMessage({ id: 'common.dict.success' }));
                loadState();
            }
        }
    };

    const getAction = (provider: string) => {
        if ((tfaState?.providers ?? []).indexOf(provider) >= 0)
            return [
                <Button key="disable" size="small" onClick={() => handleEnableOrDisable(provider, false)}>
                    {<FormattedMessage id="page.account.mfa.providers.disable" />}
                </Button>,
            ];
        return [
            <Button key="enable" size="small" type="primary" onClick={() => handleEnableOrDisable(provider, true)}>
                {<FormattedMessage id="page.account.mfa.providers.enable" />}
            </Button>,
        ];
    };

    useEffect(() => {
        loadState();
    }, []);

    return (
        <>
            {tfaState?.enabled != true && (tfaState?.providers ?? []).length > 0 && (
                <Alert
                    type="warning"
                    showIcon
                    message={<FormattedMessage id="page.account.mfa.enable.tips" />}
                    action={
                        <Button
                            size="small"
                            onClick={async () => {
                                const result = await accountTfaEnabled();
                                if (result.ok) {
                                    loadState();
                                }
                            }}
                        >
                            <FormattedMessage id="page.account.mfa.enable" />
                        </Button>
                    }
                    style={{ marginBottom: 15 }}
                ></Alert>
            )}

            {tfaState?.isMachineRemembered === true && (
                <Flex justify="end">
                    <Button
                        type="primary"
                        danger
                        onClick={async () => {
                            const result = await accountTfaForgetClient();
                            if (result?.ok) {
                                await loadState();
                            }
                        }}
                    >
                        <FormattedMessage id="page.account.mfa.forgetClient" />
                    </Button>
                </Flex>
            )}

            <List
                extra={<Button type="primary">Forget Client</Button>}
                itemLayout="horizontal"
                dataSource={[
                    {
                        provider: 'Email',
                        title: <FormattedMessage id="page.account.mfa.provider.email" />,
                        description: <FormattedMessage id="page.account.mfa.provider.email.tips" />,
                        avatar: <Avatar icon={<MailOutlined />} size="large" />,
                    },
                    {
                        provider: 'PhoneNumber',
                        title: <FormattedMessage id="page.account.mfa.provider.phoneNumber" />,
                        description: <FormattedMessage id="page.account.mfa.provider.phoneNumber.tips" />,
                        avatar: <Avatar icon={<PhoneOutlined />} size="large" />,
                    },
                    {
                        provider: 'Authenticator',
                        title: <FormattedMessage id="page.account.mfa.provider.authenticator" />,
                        description: <FormattedMessage id="page.account.mfa.provider.authenticator.tips" />,
                        avatar: <Avatar icon={<MobileOutlined />} size="large" />,
                    },
                ]}
                renderItem={(item) => (
                    <List.Item actions={getAction(item.provider)}>
                        <List.Item.Meta title={item.title} description={item.description} avatar={item.avatar} />
                    </List.Item>
                )}
            />
            {/* disable authenticator */}
            <ModalForm
                open={disableAuthenticatorAppVisible}
                onOpenChange={setDisableAuthenticatorAppVisible}
                width={280}
                title={intl.formatMessage({ id: 'page.account.mfa.authenticator.disable' })}
                onFinish={async (values: any) => {
                    const result = await accountTfaRemoveAuthenticator(values);
                    if (result?.ok) {
                        setDisableAuthenticatorAppVisible(false);
                        await loadState();
                    }
                }}
            >
                <ProFormText
                    label={intl.formatMessage({ id: 'page.account.mfa.field.code' })}
                    name="code"
                    rules={[{ required: true }, { max: 8 }]}
                />
            </ModalForm>
        </>
    );
};

export default Mfa;
