import { accountResetPassword, accountVerifyPasswordResetToken } from '@/services/Account';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Helmet, history, useIntl, useSearchParams } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Card, Modal, message } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import React, { useEffect, useState } from 'react';
import Settings from '../../../../config/defaultSettings';

const Index: React.FC = () => {
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

    const intl = useIntl();
    const [query] = useSearchParams();

    const [urlData, setUrlData] = useState<any>();

    useEffect(() => {
        setUrlData({
            userId: query.get('userId'),
            resetToken: query.get('resetToken'),
        });
    }, [0]);

    useAsyncEffect(async () => {
        if (urlData) {
            const result = await accountVerifyPasswordResetToken(urlData);
            if (result?.data != true) {
                Modal.error({
                    title: intl.formatMessage({ id: 'common.dict.error.tips' }),
                    content: intl.formatMessage({ id: 'page.login.reset-password.invalid-token' }),
                    onOk: () => {
                        history.back();
                    },
                });
            }
        }
    }, [urlData]);

    const handleSubmit = async (values) => {
        const result = await accountResetPassword({
            ...urlData,
            password: values.password,
        });
        if (result?.ok) {
            message.success(intl.formatMessage({ id: 'common.dict.success' }));
            history.push('./login');
        }
    };

    return (
        <div className={containerClassName}>
            <Helmet>
                <title>
                    {intl.formatMessage({
                        id: 'menu.reset-password',
                    })}
                    - {Settings.title}
                </title>
            </Helmet>
            <div
                style={{
                    flex: '1',
                    padding: '32px 0',
                    width: 328,
                    minWidth: 280,
                    maxWidth: '75vw',
                    margin: '0 auto',
                }}
            >
                <Card
                    title={intl.formatMessage({
                        id: 'menu.reset-password',
                    })}
                >
                    <ProForm onFinish={handleSubmit}>
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
                    </ProForm>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Index;
