import { Footer } from '@/components';
import { loginLogin } from '@/services/Login';
import { LoginResultType } from '@/services/enums';
import { AlipayCircleOutlined, LockOutlined, TaobaoCircleOutlined, UserOutlined, WeiboCircleOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
import { message } from 'antd';
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

const Index: React.FC = () => {
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

    const intl = useIntl();

    const handleSubmit = async (values) => {
        const result = await loginLogin(values);

        if (result?.result == LoginResultType.Success) {
            const defaultLoginSuccessMessage = intl.formatMessage({
                id: 'pages.login.success',
                defaultMessage: '登录成功！',
            });
            message.success(defaultLoginSuccessMessage);

            refresh();

            const urlParams = new URL(window.location.href).searchParams;
            history.replace(urlParams.get('redirect') || '/');
            return;
        } else if (result?.result == LoginResultType.LockedOut) {
            message.success(
                intl.formatMessage({
                    id: 'pages.login.lockedOut',
                }),
            );
        } else if (result?.result == LoginResultType.NotAllowed) {
            message.success(
                intl.formatMessage({
                    id: 'pages.login.notAllowed',
                }),
            );
        } else if (result?.result == LoginResultType.RequiresTwoFactor) {
            // TODO
        } else {
            message.success(
                intl.formatMessage({
                    id: 'pages.login.failure',
                }),
            );
        }
    };

    return (
        <div className={containerClassName}>
            <Helmet>
                <title>
                    {intl.formatMessage({
                        id: 'menu.forgetPassword',
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
                <LoginForm
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    title={intl.formatMessage({
                        id: 'menu.forgetPassword',
                    })}
                    subTitle=""
                    initialValues={{}}
                    onFinish={async (values) => {
                        await handleSubmit(values);
                    }}
                >
                    <div style={{ marginTop: '30px' }}>
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
                                autoComplete: 'one-time-code',
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
                    </div>
                </LoginForm>
            </div>
            <Footer />
        </div>
    );
};

export default Index;
