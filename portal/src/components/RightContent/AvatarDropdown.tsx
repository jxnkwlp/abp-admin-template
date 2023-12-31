import { accountLoginLogout } from '@/services/AccountLogin';
import { LockOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, history, useModel } from '@umijs/max';
import { Spin } from 'antd';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import { flushSync } from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';

export type GlobalHeaderRightProps = {
    menu?: boolean;
    children?: React.ReactNode;
};

export const AvatarName = () => {
    const { initialState } = useModel('@@initialState');
    const { configuration } = initialState || {};
    return <span className="anticon">{configuration?.currentUser?.name}</span>;
};

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu, children }) => {
    /**
     * 退出登录，并且将当前的 url 保存
     */
    const loginOut = async () => {
        await accountLoginLogout();
        const { search, pathname } = window.location;
        const urlParams = new URL(window.location.href).searchParams;
        /** 此方法会跳转到 redirect 参数所在的位置 */
        const redirect = urlParams.get('redirect');
        // Note: There may be security issues, please note
        if (window.location.pathname !== '/auth/login' && !redirect) {
            history.replace({
                pathname: '/auth/login',
                search: stringify({
                    redirect: pathname + search,
                }),
            });
        }
    };
    const actionClassName = useEmotionCss(({ token }) => {
        return {
            display: 'flex',
            height: '48px',
            marginLeft: 'auto',
            overflow: 'hidden',
            alignItems: 'center',
            padding: '0 8px',
            cursor: 'pointer',
            borderRadius: token.borderRadius,
            '&:hover': {
                backgroundColor: token.colorBgTextHover,
            },
        };
    });
    const { initialState, setInitialState } = useModel('@@initialState');

    const onMenuClick = useCallback(
        (event: MenuInfo) => {
            const { key } = event;
            if (key === 'logout') {
                flushSync(() => {
                    setInitialState((s) => ({ ...s, configuration: undefined }));
                });
                loginOut();
                return;
            }
            history.push(`/account/${key}`);
        },
        [setInitialState],
    );

    const loading = (
        <span className={actionClassName}>
            <Spin
                size="small"
                style={{
                    marginLeft: 8,
                    marginRight: 8,
                }}
            />
        </span>
    );

    if (!initialState) {
        return loading;
    }

    const { configuration } = initialState;

    if (configuration?.currentUser?.isAuthenticated != true) {
        return loading;
    }

    const menuItems = [
        ...(menu
            ? [
                  {
                      key: 'center',
                      icon: <UserOutlined />,
                      label: <FormattedMessage id="menu.account.center" />,
                  },
                  {
                      type: 'divider' as const,
                  },
              ]
            : []),
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: <FormattedMessage id="menu.account.logout" />,
        },
    ];

    return (
        <HeaderDropdown
            menu={{
                selectedKeys: [],
                onClick: onMenuClick,
                items: menuItems,
            }}
        >
            {children}
        </HeaderDropdown>
    );
};
