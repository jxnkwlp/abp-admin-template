import { Footer } from '@/components';
import { accountSendPasswordResetCode } from '@/services/Account';
import {
    accountLoginChangePassword,
    accountLoginLogin,
    accountLoginLoginWithTfa,
    accountLoginSendTfaToken,
    accountLoginVerifyAuthenticatorToken,
    getAccountLoginAuthenticatorInfo,
    getAccountLoginTfaStatus,
} from '@/services/AccountLogin';
import { AccountLoginResultType } from '@/services/enums';
import { API } from '@/services/typings';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MailOutlined,
    MobileOutlined,
    PhoneOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import { CheckCard, LoginForm, ModalForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Alert, Avatar, QRCode, Tabs, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const ActionIcons = () => {
    const langClassName = useEmotionCss(({ token }) => {
        return {
            marginLeft: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: '24px',
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
                color: token.colorPrimaryActive,
            },
        };
    });

    return (
        <>
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
        </>
    );
};

const Lang = () => {
    const langClassName = useEmotionCss(({ token }) => {
        return {
            width: 42,
            height: 42,
            lineHeight: '42px',
            position: 'fixed',
            right: 16,
            borderRadius: token.borderRadius,
            ':hover': {
                backgroundColor: token.colorBgTextHover,
            },
        };
    });

    return (
        <div className={langClassName} data-lang>
            {SelectLang && <SelectLang />}
        </div>
    );
};

const Login: React.FC = () => {
    const containerClassName = useEmotionCss(() => {
        return {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage: "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        };
    });

    const { refresh } = useModel('@@initialState');

    const intl = useIntl();

    const [loginType, setLoginType] = useState<'account' | 'mobile'>('account');

    const [forgetPasswordModalOpen, setForgetPasswordModalOpen] = useState(false);

    const [session, setSession] = useState<'login' | 'tfa-code' | 'tfa-providers' | 'change-password' | 'authenticator'>(
        'login',
    );

    const [selectTfaProvider, setSelectTfaProvider] = useState('');
    const [tfaProviders, setTfaProviders] = useState<string[]>([]);

    const [authenticatorInfo, setAuthenticatorInfo] = useState<API.AccountAuthenticatorInfo>();

    useEffect(() => {
        refresh();
    }, [0]);

    useAsyncEffect(async () => {
        // if (session == 'tfa-code') {
        //     if (tfaProvider) {
        //         const result = await accountLoginSendTfaToken(tfaProvider);
        //     }
        // }
        // console.debug('ps=>', session);
    }, [session]);

    const handleOnTfa = async () => {
        const result = await getAccountLoginTfaStatus();
        const providers = result?.providers ?? [];
        setTfaProviders(providers);
        setSelectTfaProvider('');
        if (result?.enabled == true && providers.length > 0) {
            setSelectTfaProvider(providers[0]);
            setSession('tfa-providers');
        } else {
            const result = await getAccountLoginAuthenticatorInfo();
            if (result) {
                setAuthenticatorInfo(result);
                setSession('authenticator');
            }
        }
    };

    const handleOnChangePassword = () => {
        setSession('change-password');
    };

    const handleLoginResult = (result: API.AccountLoginResult) => {
        if (result?.result == AccountLoginResultType.Success) {
            const defaultLoginSuccessMessage = intl.formatMessage({
                id: 'pages.login.result.success',
            });
            message.success(defaultLoginSuccessMessage);

            refresh();

            const urlParams = new URL(window.location.href).searchParams;
            history.replace(urlParams.get('redirect') || '/');
            return;
        } else if (result?.result == AccountLoginResultType.LockedOut) {
            message.error(
                intl.formatMessage({
                    id: 'pages.login.result.lockedOut',
                }),
            );
        } else if (result?.result == AccountLoginResultType.NotAllowed) {
            message.error(
                intl.formatMessage({
                    id: 'pages.login.result.notAllowed',
                }),
            );
        } else if (result?.result == AccountLoginResultType.RequiresTwoFactor) {
            handleOnTfa();
        } else if (result?.result == AccountLoginResultType.RequiresChangePassword) {
            handleOnChangePassword();
        } else {
            message.error(
                intl.formatMessage({
                    id: 'pages.login.result.failure',
                }),
            );
        }
    };

    const handleSubmit = async (values: API.AccountLoginRequest) => {
        const result = await accountLoginLogin(values);

        handleLoginResult(result);
    };

    const handleForgetPassword = async (values: any) => {
        const result = await accountSendPasswordResetCode({ ...values, appName: 'MVC' });
        if (result) {
            setForgetPasswordModalOpen(false);

            message.success(
                intl.formatMessage({
                    id: 'pages.login.forgotPassword.send',
                }),
            );
        }

        return true;
    };

    const handleTfaLogin = async (values: any) => {
        const result = await accountLoginLoginWithTfa(selectTfaProvider, values);
        handleLoginResult(result);
    };

    const handleChangePassword = async (values: any) => {
        const result = await accountLoginChangePassword(values);
        if (result?.ok) {
            message.success(intl.formatMessage({ id: 'common.dict.success' }));
            setSession('login');
            refresh();
        }
    };

    const handleSetupAuthenticator = async (values: any) => {
        const result = await accountLoginVerifyAuthenticatorToken(values);
        if (result?.recoveryCodes) {
            setSession('login');
            refresh();
        }
    };

    return (
        <div className={containerClassName}>
            <Helmet>
                <title>
                    {intl.formatMessage({
                        id: 'menu.login',
                    })}
                    - {Settings.title}
                </title>
            </Helmet>
            <Lang />
            <div
                style={{
                    flex: '1',
                    padding: '32px 0',
                }}
            >
                <LoginForm<API.AccountLoginRequest & API.AccountLoginWithTfaRequest>
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src="/logo.svg" />}
                    title="Admin"
                    subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                    initialValues={{}}
                    actions={
                        session == 'login' && [
                            <FormattedMessage key="loginWith" id="pages.login.loginWith" />,
                            <ActionIcons key="icons" />,
                        ]
                    }
                    onFinish={async (values) => {
                        if (session == 'login') {
                            await handleSubmit(values);
                        } else if (session == 'tfa-code') {
                            await handleTfaLogin(values);
                        } else if (session == 'tfa-providers') {
                            setSession('tfa-code');
                        } else if (session == 'change-password') {
                            await handleChangePassword(values);
                        } else if (session == 'authenticator') {
                            await handleSetupAuthenticator(values);
                        }
                    }}
                    submitter={{
                        searchConfig: {
                            submitText:
                                session == 'tfa-code' || session == 'authenticator'
                                    ? intl.formatMessage({
                                          id: 'pages.login.button.verfiy',
                                      })
                                    : session == 'tfa-providers'
                                    ? intl.formatMessage({
                                          id: 'pages.login.button.next',
                                      })
                                    : session == 'change-password'
                                    ? intl.formatMessage({
                                          id: 'common.dict.submit',
                                      })
                                    : intl.formatMessage({
                                          id: 'pages.login.button.login',
                                      }),
                        },
                    }}
                >
                    {session == 'login' && (
                        <>
                            <Tabs
                                activeKey={loginType}
                                onChange={setLoginType}
                                centered
                                items={[
                                    {
                                        key: 'account',
                                        label: intl.formatMessage({
                                            id: 'pages.login.accountLogin.tab',
                                        }),
                                    },
                                    {
                                        key: 'mobile',
                                        label: intl.formatMessage({
                                            id: 'pages.login.phoneLogin.tab',
                                        }),
                                    },
                                ]}
                            />
                            {loginType === 'account' && (
                                <>
                                    <ProFormText
                                        name="userNameOrEmailAddress"
                                        fieldProps={{
                                            size: 'large',
                                            prefix: <UserOutlined />,
                                            autoComplete: 'off',
                                        }}
                                        placeholder={intl.formatMessage({
                                            id: 'pages.login.username.placeholder',
                                        })}
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="pages.login.username.required" />,
                                            },
                                        ]}
                                    />
                                    <ProFormText.Password
                                        name="password"
                                        fieldProps={{
                                            size: 'large',
                                            prefix: <LockOutlined />,
                                            autoComplete: 'off',
                                        }}
                                        placeholder={intl.formatMessage({
                                            id: 'pages.login.password.placeholder',
                                        })}
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="pages.login.password.required" />,
                                            },
                                        ]}
                                    />
                                </>
                            )}

                            {loginType === 'mobile' && (
                                <>
                                    <ProFormText
                                        fieldProps={{
                                            size: 'large',
                                            prefix: <MobileOutlined />,
                                            autoComplete: 'off',
                                        }}
                                        name="phoneNumber"
                                        placeholder={intl.formatMessage({
                                            id: 'pages.login.phoneNumber.placeholder',
                                        })}
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="pages.login.phoneNumber.required" />,
                                            },
                                            {
                                                pattern: /^1\d{10}$/,
                                                message: <FormattedMessage id="pages.login.phoneNumber.invalid" />,
                                            },
                                        ]}
                                    />
                                    <ProFormCaptcha
                                        fieldProps={{
                                            size: 'large',
                                            prefix: <LockOutlined />,
                                            autoComplete: 'off',
                                        }}
                                        captchaProps={{
                                            size: 'large',
                                        }}
                                        placeholder={intl.formatMessage({
                                            id: 'pages.login.captcha.placeholder',
                                        })}
                                        captchaTextRender={(timing, count) => {
                                            if (timing) {
                                                return `${count} ${intl.formatMessage({
                                                    id: 'pages.getCaptchaSecondText',
                                                })}`;
                                            }
                                            return intl.formatMessage({
                                                id: 'pages.login.phoneLogin.getVerificationCode',
                                            });
                                        }}
                                        name="captcha"
                                        rules={[
                                            {
                                                required: true,
                                                message: <FormattedMessage id="pages.login.captcha.required" />,
                                            },
                                        ]}
                                        onGetCaptcha={async () => {
                                            message.info('TODO');
                                        }}
                                    />
                                </>
                            )}

                            <div
                                style={{
                                    marginBottom: 24,
                                }}
                            >
                                <ProFormCheckbox noStyle name="rememberMe">
                                    <FormattedMessage id="pages.login.rememberMe" />
                                </ProFormCheckbox>
                                <a
                                    style={{
                                        float: 'right',
                                    }}
                                    onClick={() => {
                                        setForgetPasswordModalOpen(true);
                                    }}
                                >
                                    <FormattedMessage id="pages.login.forgotPassword" />
                                </a>
                            </div>
                        </>
                    )}
                    {session == 'tfa-providers' && (
                        <>
                            <CheckCard.Group
                                onChange={(value) => {
                                    console.log(value);
                                    setSelectTfaProvider(value as string);
                                }}
                            >
                                {tfaProviders.indexOf('Email') >= 0 && (
                                    <CheckCard
                                        title={<FormattedMessage id="page.account.mfa.provider.email" />}
                                        avatar={
                                            <Avatar
                                                style={{ backgroundColor: '#1677ffc2' }}
                                                icon={<MailOutlined />}
                                                size="large"
                                            />
                                        }
                                        value="Email"
                                    />
                                )}
                                {tfaProviders.indexOf('PhoneNumber') >= 0 && (
                                    <CheckCard
                                        title={<FormattedMessage id="page.account.mfa.provider.phoneNumber" />}
                                        avatar={
                                            <Avatar
                                                style={{ backgroundColor: '#1677ffc2' }}
                                                icon={<PhoneOutlined />}
                                                size="large"
                                            />
                                        }
                                        value="PhoneNumber"
                                    />
                                )}
                                {tfaProviders.indexOf('Authenticator') >= 0 && (
                                    <CheckCard
                                        title={<FormattedMessage id="page.account.mfa.provider.authenticator" />}
                                        avatar={
                                            <Avatar
                                                style={{ backgroundColor: '#1677ffc2' }}
                                                icon={<MobileOutlined />}
                                                size="large"
                                            />
                                        }
                                        value="Authenticator"
                                    />
                                )}
                            </CheckCard.Group>
                        </>
                    )}
                    {session == 'tfa-code' && (
                        <>
                            {selectTfaProvider === 'Authenticator' ? (
                                <ProFormText
                                    rules={[{ required: true }, { max: 8 }]}
                                    name="code"
                                    label={intl.formatMessage({ id: 'pages.login.tfacode' })}
                                    fieldProps={{ autoComplete: 'one-time-code', maxLength: 8 }}
                                />
                            ) : (
                                <ProFormCaptcha
                                    rules={[{ required: true }, { max: 8 }]}
                                    name="code"
                                    label={intl.formatMessage({ id: 'pages.login.tfacode' })}
                                    fieldProps={{ autoComplete: 'one-time-code', maxLength: 8 }}
                                    onGetCaptcha={async () => {
                                        await accountLoginSendTfaToken(selectTfaProvider);
                                    }}
                                />
                            )}
                        </>
                    )}
                    {session == 'change-password' && (
                        <>
                            <Alert
                                type="warning"
                                message={intl.formatMessage({ id: 'pages.login.changePassword.tips' })}
                                style={{ marginBottom: 15 }}
                            />
                            <ProFormText.Password
                                rules={[{ required: true }, { max: 128 }]}
                                name="password"
                                label={intl.formatMessage({ id: 'page.account.changePassword.field.newPassword' })}
                                fieldProps={{ autoComplete: 'one-time-code' }}
                            />
                            <ProFormText.Password
                                rules={[
                                    { required: true },
                                    { max: 128 },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The new password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                                name="confirmPassword"
                                label={intl.formatMessage({ id: 'page.account.changePassword.field.confirmPassword' })}
                                fieldProps={{ autoComplete: 'one-time-code' }}
                            />
                        </>
                    )}
                    {session == 'authenticator' && (
                        <>
                            <p>
                                <FormattedMessage id="page.account.authenticator.tips1" />{' '}
                                <code>{authenticatorInfo?.formatKey}</code>
                            </p>
                            <div style={{ marginBottom: 10 }}>
                                <QRCode value={authenticatorInfo?.uri ?? ''} style={{ margin: '0 auto' }} />
                            </div>
                            <p>
                                <FormattedMessage id="page.account.authenticator.tips2" />
                            </p>

                            <ProFormText
                                rules={[{ required: true }, { max: 8 }]}
                                name="code"
                                fieldProps={{ autoComplete: 'one-time-code', maxLength: 8 }}
                            />
                        </>
                    )}
                </LoginForm>
            </div>
            <Footer />

            {/* forgetPassword */}
            <ModalForm
                title={intl.formatMessage({
                    id: 'menu.forgetPassword',
                })}
                open={forgetPasswordModalOpen}
                onOpenChange={setForgetPasswordModalOpen}
                modalProps={{ maskClosable: false, destroyOnClose: true }}
                width={380}
                layout="vertical"
                onFinish={(values) => handleForgetPassword(values)}
            >
                <ProFormText
                    label="Email"
                    name="email"
                    fieldProps={{
                        autoComplete: 'off',
                    }}
                    rules={[
                        {
                            type: 'email',
                            required: true,
                        },
                    ]}
                />
            </ModalForm>
        </div>
    );
};

export default Login;
