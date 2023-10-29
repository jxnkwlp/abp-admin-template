/**
 * @name umi 的路由配置
 * @description 只支持 path,component,routes,redirect,wrappers,name,icon 的配置
 * @param path  path 只支持两种占位符配置，第一种是动态参数 :id 的形式，第二种是 * 通配符，通配符只能出现路由字符串的最后。
 * @param component 配置 location 和 path 匹配后用于渲染的 React 组件路径。可以是绝对路径，也可以是相对路径，如果是相对路径，会从 src/pages 开始找起。
 * @param routes 配置子路由，通常在需要为多个路径增加 layout 组件时使用。
 * @param redirect 配置路由跳转
 * @param wrappers 配置路由组件的包装组件，通过包装组件可以为当前的路由组件组合进更多的功能。 比如，可以用于路由级别的权限校验
 * @param name 配置路由的标题，默认读取国际化文件 menu.ts 中 menu.xxxx 的值，如配置 name 为 login，则读取 menu.ts 中 menu.login 的取值作为标题
 * @param icon 配置路由的图标，取值参考 https://ant.design/components/icon-cn， 注意去除风格后缀和大小写，如想要配置图标为 <StepBackwardOutlined /> 则取值应为 stepBackward 或 StepBackward，如想要配置图标为 <UserOutlined /> 则取值应为 user 或者 User
 * @doc https://umijs.org/docs/guides/routes
 */
export default [
    {
        path: '/auth',
        layout: false,
        routes: [
            {
                name: 'login',
                path: '/auth/login',
                component: './auth/login/index',
                // component: './auth/login/index2',
            },
        ],
    },
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'DashboardOutlined',
        component: './dashboard',
    },
    {
        path: '/file-management',
        name: 'file-management',
        icon: 'FileSearchOutlined',
        component: './files',
    },
    {
        path: '/management',
        name: 'management',
        icon: 'SettingOutlined',
        routes: [
            // identity
            {
                path: '/management',
                redirect: '/management/users',
            },
            {
                path: '/management/users',
                name: 'users',
                component: './system/identity/users',
            },
            {
                path: '/management/roles',
                name: 'roles',
                component: './system/identity/roles',
            },
            {
                path: '/management/organizations',
                name: 'organizations',
                component: './system/identity/organizations',
            },
            {
                path: '/management/claim-types',
                name: 'claim-types',
                component: './system/identity/claim-types',
            },
            {
                path: '/management/identity-clients',
                name: 'identity-clients',
                component: './system/identity/clients',
            },
            {
                path: '/management/file/containers',
                name: 'file-container',
                component: './files/container',
            },
            {
                path: '/management/settings/identity',
                name: 'settings.identity',
                component: './system/settings/identity',
            },
            {
                path: '/management/settings/account',
                name: 'settings.account',
                component: './system/settings/account',
            },
            {
                path: '/management/settings/emailing',
                name: 'settings.emailing',
                component: './system/settings/emailing',
            },
            {
                path: '/management/security-logs',
                name: 'security-log',
                component: './system/logs/security',
            },
            {
                path: '/management/audit-logs',
                name: 'audit-log',
                component: './system/logs/auditing',
            },
            {
                path: '/management/identity-server',
                name: 'identity-server',
                routes: [
                    {
                        path: '/management/identity-server/clients',
                        name: 'clients',
                        component: './system/identity-server/clients',
                    },
                    {
                        path: '/management/identity-server/scopes',
                        name: 'scopes',
                        component: './system/identity-server/scopes',
                    },
                ],
            },
        ],
    },

    // account
    {
        path: '/account',
        routes: [
            {
                name: 'account.center',
                path: '/account/center',
                component: './account/index',
            },
            {
                name: 'account.change-password',
                path: '/account/change-password',
                component: './account/change-password',
            },
            {
                name: 'account.security-logs',
                path: '/account/security-logs',
                component: './account/security-logs',
            },
        ],
    },

    {
        path: '*',
        layout: false,
        component: './404',
    },
];
