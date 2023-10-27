import { AvatarDropdown, AvatarName, Footer, SelectLang } from '@/components';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { requestConfig } from './requestConfig';
import { getAbpApplicationConfiguration } from './services/AbpApplicationConfiguration';
import { API } from './services/typings';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/auth/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    configuration?: API.ApplicationConfiguration;
    loading?: boolean;
    fetchConfiguration?: () => Promise<API.ApplicationConfiguration | undefined>;
}> {
    const fetchConfiguration = async () => {
        try {
            return await getAbpApplicationConfiguration(
                { includeLocalizationResources: false },
                {
                    skipErrorHandler: true,
                },
            );
        } catch (error) {
            history.push(loginPath);
        }
        return undefined;
    };
    const configuration = await fetchConfiguration();

    if (!location.pathname.startsWith('/auth/') && configuration?.currentUser?.isAuthenticated != true) {
        history.push(loginPath);
    }

    return {
        fetchConfiguration: fetchConfiguration,
        configuration: configuration,
        settings: defaultSettings as Partial<LayoutSettings>,
    };
}

const valueTypeMap: Record<string, ProRenderFieldPropsType> = {
    trueOrfalse: {
        render(text, props) {
            return text ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />;
        },
    },
};

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    return {
        actionsRender: () => [<SelectLang key="SelectLang" />],
        avatarProps: {
            // src: initialState?.configuration?.currentUser?.avatarUrl,
            title: <AvatarName />,
            render: (_, avatarChildren) => {
                return <AvatarDropdown menu>{avatarChildren}</AvatarDropdown>;
            },
            children:
                (initialState?.configuration?.currentUser?.name ?? '').length > 1
                    ? initialState?.configuration?.currentUser?.name?.substring(0, 1).toUpperCase()
                    : '',
        },
        waterMarkProps: {
            content: initialState?.configuration?.currentUser?.name,
        },
        footerRender: () => <Footer />,
        onPageChange: () => {
            const { location } = history;
            if (!initialState?.configuration && !location.pathname.startsWith('/auth/')) {
                history.push(loginPath);
            }
        },
        layoutBgImgList: [
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
                left: 85,
                bottom: 100,
                height: '303px',
            },
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
                bottom: -68,
                right: -45,
                height: '303px',
            },
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
                bottom: 0,
                left: 0,
                width: '331px',
            },
        ],
        // links: isDev
        //     ? [
        //           <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
        //               <LinkOutlined />
        //               <span>OpenAPI 文档</span>
        //           </Link>,
        //       ]
        //     : [],
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // 增加一个 loading 的状态
        childrenRender: (children) => {
            // if (initialState?.loading) return <PageLoading />;
            return (
                <>
                    {children}
                    {isDev && (
                        <SettingDrawer
                            disableUrlParams
                            enableDarkTheme
                            settings={initialState?.settings}
                            onSettingChange={(settings) => {
                                setInitialState((preInitialState) => ({
                                    ...preInitialState,
                                    settings,
                                }));
                            }}
                        />
                    )}
                </>
            );
        },
        ...initialState?.settings,
    };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
    ...requestConfig,
};
