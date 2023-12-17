/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 2
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/account/external/callback 
 **/
export async function accountExternalCallback(
    payload: API.AccountExternalLoginCallback,
    options?: { [key: string]: any }
) {
    return request<API.AccountExternalLoginResult>(`/api/account/external/callback`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/external/login 
 **/
export async function accountExternalLogin(
    params: {
        provider?: string | undefined,
        redirectUrl?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/external/login`, {
        method: 'POST',
        params: params,
        getResponse: true,
        ...(options || {}),
    });
}
