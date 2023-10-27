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
 * *TODO* POST /api/account/impersonations/{userId}/login 
 **/
export async function accountImpersonationLogin(
    userId: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/impersonations/${userId}/login`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/impersonations/{userId}/link-login 
 **/
export async function accountImpersonationLoginLogin(
    userId: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/impersonations/${userId}/link-login`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}
