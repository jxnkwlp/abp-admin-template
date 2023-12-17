import { getAccountProfile, updateAccountProfile } from '@/services/AccountProfile';
import { API } from '@/services/typings';
import { PageContainer, ProForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, history, useIntl, useLocation } from '@umijs/max';
import { Card, Col, Menu, Row, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Profile from './profile';
import SecurityLog from './security-logs';
import ChangePassword from './change-password';
import Mfa from './mfa';

export const AccountTabList = [
    {
        key: 'center',
        label: 'Profile',
    },
    {
        key: 'change-password',
        label: 'Change Password',
    },
    {
        key: 'security-logs',
        label: 'Security Logs',
    },
];

export const AccountSelect = () => {};

export const Index: React.FC = () => {
    const location = useLocation();
    const intl = useIntl();

    const [menu, setMenu] = useState('profile');

    const handleChangeMenu = (key: string) => {
        setMenu(key);
        history.push('./center#' + key);
    };

    useEffect(() => {
        const hash = location.hash;

        if (hash && hash.length > 2) {
            setMenu(hash.substring(1));
        }
    }, []);

    return (
        <PageContainer>
            <Card>
                <Row gutter={24}>
                    <Col span={6}>
                        <Menu
                            mode="vertical"
                            items={[
                                {
                                    key: 'profile',
                                    label: <FormattedMessage id="page.account.profile" />,
                                },
                                {
                                    key: 'mfa',
                                    label: <FormattedMessage id="page.account.mfa" />,
                                },
                                {
                                    key: 'change-password',
                                    label: <FormattedMessage id="page.account.change-password" />,
                                },
                                {
                                    key: 'security-logs',
                                    label: <FormattedMessage id="page.account.security-logs" />,
                                },
                            ]}
                            onClick={(e) => {
                                handleChangeMenu(e.key);
                            }}
                            selectedKeys={[menu]}
                        ></Menu>
                    </Col>
                    <Col span={18}>
                        {menu == 'profile' && <Profile />}
                        {menu == 'mfa' && <Mfa />}
                        {menu == 'change-password' && <ChangePassword />}
                        {menu == 'security-logs' && <SecurityLog />}
                    </Col>
                </Row>
            </Card>
        </PageContainer>
    );
};

export default Index;
