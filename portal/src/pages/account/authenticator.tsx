import { getAccountTfaAuthenticator, updateAccountTfaAuthenticator } from '@/services/AccountTfa';
import { API } from '@/services/typings';
import { PageContainer } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { useAsyncEffect } from 'ahooks';
import { Button, Card, Form, Input, QRCode, Typography } from 'antd';
import React, { useState } from 'react';

const Authenticator: React.FC = () => {
    const [data, setData] = useState<API.AccountAuthenticatorInfo>();
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>();

    const handleSubmit = async (values: any) => {
        const result = await updateAccountTfaAuthenticator(values);
        if (result?.recoveryCodes) {
            setRecoveryCodes(result.recoveryCodes ?? []);
        }
    };

    useAsyncEffect(async () => {
        const result = await getAccountTfaAuthenticator();
        if (result?.enabled) {
            history.back();
        }
        setData(result ?? {});
    }, []);

    return (
        <PageContainer>
            <Card title={<FormattedMessage id="page.account.mfa.authenticator" />}>
                {!recoveryCodes && (
                    <>
                        <Typography.Paragraph>
                            <p>
                                <FormattedMessage id="page.account.mfa.authenticator.setup.1" />
                            </p>
                        </Typography.Paragraph>
                        <Typography.Paragraph>
                            <ol className="list">
                                {/* <li>
                                    <p>
                                        Download a two-factor authenticator app like Microsoft Authenticator for{' '}
                                        <a
                                            target="_blank"
                                            href="https://go.microsoft.com/fwlink/?Linkid=825072"
                                            rel="noreferrer"
                                        >
                                            Android
                                        </a>{' '}
                                        and{' '}
                                        <a
                                            target="_blank"
                                            href="https://go.microsoft.com/fwlink/?Linkid=825073"
                                            rel="noreferrer"
                                        >
                                            iOS
                                        </a>{' '}
                                        or Google Authenticator for{' '}
                                        <a
                                            target="_blank"
                                            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&amp;hl=en"
                                            rel="noreferrer"
                                        >
                                            Android
                                        </a>{' '}
                                        and{' '}
                                        <a
                                            target="_blank"
                                            href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"
                                            rel="noreferrer"
                                        >
                                            iOS
                                        </a>{' '}
                                        .
                                    </p>
                                </li> */}
                                <li>
                                    <p>
                                        <FormattedMessage id="page.account.mfa.authenticator.setup.2-1" />
                                        <Typography.Text code copyable>
                                            {data?.formatKey}
                                        </Typography.Text>
                                        <FormattedMessage id="page.account.mfa.authenticator.setup.2-2" />
                                    </p>

                                    <div id="qrCode">
                                        <QRCode value={data?.uri ?? ''} status={data?.uri ? 'active' : 'loading'} />
                                    </div>
                                </li>
                                <li>
                                    <p>
                                        <FormattedMessage id="page.account.mfa.authenticator.setup.3" />
                                    </p>
                                    <div>
                                        <Form
                                            layout="inline"
                                            onFinish={(values) => {
                                                handleSubmit(values);
                                            }}
                                        >
                                            <Form.Item name="code" rules={[{ required: true }, { max: 8 }]}>
                                                <Input />
                                            </Form.Item>
                                            <Button type="primary" htmlType="submit">
                                                <FormattedMessage id="common.dict.verify" />
                                            </Button>
                                        </Form>
                                    </div>
                                </li>
                            </ol>
                        </Typography.Paragraph>
                    </>
                )}
                {recoveryCodes && (
                    <Typography.Paragraph>
                        <p>
                            <FormattedMessage id="page.account.mfa.authenticator.setup.4" />
                        </p>
                        <div style={{ maxWidth: 200, textAlign: 'center' }}>
                            <pre>{recoveryCodes?.map((x) => x + '\n')}</pre>
                        </div>
                        <Button
                            type="primary"
                            onClick={() => {
                                history.back();
                            }}
                        >
                            <FormattedMessage id="common.dict.done" />
                        </Button>
                    </Typography.Paragraph>
                )}
            </Card>
        </PageContainer>
    );
};

export default Authenticator;
