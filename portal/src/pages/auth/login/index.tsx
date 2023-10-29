import { Footer } from '@/components';
import { accountSendPasswordResetCode } from '@/services/Account';
import { accountLoginLogin } from '@/services/AccountLogin';
import { AccountLoginResultType } from '@/services/enums';
import { API } from '@/services/typings';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ModalForm, ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
import { Tabs, message } from 'antd';
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
    const [type, setType] = useState<string>('account');
    const { refresh } = useModel('@@initialState');

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

    useEffect(() => {
        refresh();
    }, [0]);

    const [forgetPasswordModalOpen, setForgetPasswordModalOpen] = useState(false);

    const intl = useIntl();

    const handleSubmit = async (values: API.AccountLoginRequest) => {
        const result = await accountLoginLogin(values);

        if (result?.result == AccountLoginResultType.Success) {
            const defaultLoginSuccessMessage = intl.formatMessage({
                id: 'pages.login.success',
            });
            message.success(defaultLoginSuccessMessage);

            refresh();

            const urlParams = new URL(window.location.href).searchParams;
            history.replace(urlParams.get('redirect') || '/');
            return;
        } else if (result?.result == AccountLoginResultType.LockedOut) {
            message.error(
                intl.formatMessage({
                    id: 'pages.login.lockedOut',
                }),
            );
        } else if (result?.result == AccountLoginResultType.NotAllowed) {
            message.error(
                intl.formatMessage({
                    id: 'pages.login.notAllowed',
                }),
            );
        } else {
            message.error(
                intl.formatMessage({
                    id: 'pages.login.failure',
                }),
            );
        }
    };

    const handleForgetPassword = async (values: any) => {
        const result = await accountSendPasswordResetCode({ ...values, appName: 'MVC' });
        console.log(result);
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
                <LoginForm<API.AccountLoginRequest>
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src="/logo.svg" />}
                    title="Admin"
                    subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                    initialValues={{}}
                    actions={[<FormattedMessage key="loginWith" id="pages.login.loginWith" />, <ActionIcons key="icons" />]}
                    onFinish={async (values) => {
                        await handleSubmit(values);
                    }}
                >
                    <Tabs
                        activeKey={type}
                        onChange={setType}
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

                    {type === 'account' && (
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

                    {type === 'mobile' && (
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
