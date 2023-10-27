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
 * *TODO* GET /auth/external/callback 
 **/
export async function authenticationCallback(
    params: {
        returnUrl?: string | undefined,
        returnUrlHash?: string | undefined,
        remoteError?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<any>(`/auth/external/callback`, {
        method: 'GET',
        params: params,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /auth/external/{provider}/login 
 **/
export async function authenticationLogin(
    provider: string,
    params: {
        returnUrl?: string | undefined,
        returnUrlHash?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<any>(`/auth/external/${provider}/login`, {
        method: 'GET',
        params: params,
        getResponse: true,
        ...(options || {}),
    });
}
