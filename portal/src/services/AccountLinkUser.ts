/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 4
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/account/link-user/unlink 
 **/
export async function accountLinkUserUnlink(
    payload: API.AccountUnlink,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/link-user/unlink`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/link-user/token/verify 
 **/
export async function accountLinkUserVerifyLinkToken(
    payload: API.AccountLinkTokenValidationRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountLinkTokenValidationResult>(`/api/account/link-user/token/verify`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/link-user/token 
 **/
export async function createAccountLinkUserLinkToken(
    options?: { [key: string]: any }
) {
    return request<API.AccountLink>(`/api/account/link-user/token`, {
        method: 'POST',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/link-user 
 **/
export async function getAccountLinkUserList(
    params: {
        includeIndirect?: boolean | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.AccountLinkUserListResult>(`/api/account/link-user`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}
