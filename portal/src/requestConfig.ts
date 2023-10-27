import type { RequestConfig, RequestOptions } from '@umijs/max';
import { App, message } from 'antd';
import { GlobErrorType } from './services/global';

/**
 * @name 错误处理
 * pro 自带的错误处理， 可以在这里做自己的改动
 * @doc https://umijs.org/docs/max/request#配置
 */
export const requestConfig: RequestConfig = {
    timeout: 60 * 1000,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'RequestVerificationToken',
    withCredentials: true,
    validateStatus: () => true,

    // errorConfig: {
    //     errorHandler: (error: any, opts: any) => {
    //         console.log(error);
    //         if (opts?.skipErrorHandler) {
    //             return;
    //         }

    //         if (error.response) {
    //             const { status, data } = error.response;
    //             const msg = data?.error?.message;

    //             if (status == 401) {
    //                 message.error(msg ?? 'Authentication failed, please log in again');
    //             } else if (status == 400 || status == 403) {
    //                 message.error(msg ?? 'Your request is not valid!');
    //             } else if (status >= 500) {
    //                 message.error(msg ?? 'A server error has occurred, please contact your administrator');
    //             } else {
    //                 message.error(msg ?? 'An error occurred, please contact the administrator');
    //             }
    //         } else if (error.request) {
    //             // 请求已经成功发起，但没有收到响应
    //             // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
    //             // 而在node.js中是 http.ClientRequest 的实例
    //             message.error('None response! Please retry.');
    //         } else {
    //             // 发送请求时出了点问题
    //             message.error('Request error, please retry.');
    //         }
    //     },
    // },

    // 请求拦截器
    requestInterceptors: [
        (config: RequestOptions) => {
            // config.skipErrorHandler = true;
            return { ...config };
        },
    ],

    // 响应拦截器
    responseInterceptors: [
        (response) => {
            const { config, status, statusText, data, request } = response;
            if (status >= 300) {
                if (data) {
                    const errorData = data as unknown as GlobErrorType;
                    const msg = errorData.error?.message;

                    if (status == 401) {
                        message.error(msg ?? 'Authentication failed, please log in again');
                    } else if (status == 400 || status == 403) {
                        message.error(msg ?? 'Your request is not valid!');
                    } else if (status >= 500) {
                        message.error(msg ?? 'A server error has occurred, please contact your administrator');
                    } else {
                        message.error(msg ?? 'An error occurred, please contact the administrator');
                    }
                } else if (request) {
                    // 请求已经成功发起，但没有收到响应
                    // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
                    // 而在node.js中是 http.ClientRequest 的实例
                    message.error('None response! Please retry.');
                } else {
                    // 发送请求时出了点问题
                    message.error('Request error, please retry.');
                }

                //
                return { ...response, data: undefined, ok: false };
            }

            //
            return { ...response, ok: true };
        },
    ],
};
