/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 10
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* DELETE /api/account/2fa 
 **/
export async function accountTfaDisable(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/account/2fa/forget-client 
 **/
export async function accountTfaForgetClient(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/forget-client`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/2fa/authenticator/recovery-codes 
 **/
export async function accountTfaGenerateAuthenticatorRecoveryCodes(
    options?: { [key: string]: any }
) {
    return request<API.AccountAuthenticatorRecoveryCodesResult>(`/api/account/2fa/authenticator/recovery-codes`, {
        method: 'PUT',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/2fa/authenticator/reset 
 **/
export async function accountTfaResetAuthenticator(
    payload: API.AccountAuthenticatorCodeVerifyRequest,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/authenticator/reset`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/2fa/{provider}/token 
 **/
export async function accountTfaSendToken(
    provider: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/${provider}/token`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/2fa/{provider}/verify 
 **/
export async function accountTfaVerifyToken(
    provider: string,
    payload: API.AccountTfaVerifyTokenRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountVerifyTokenResult>(`/api/account/2fa/${provider}/verify`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/2fa 
 **/
export async function getAccountTfa(
    options?: { [key: string]: any }
) {
    return request<API.AccountTfa>(`/api/account/2fa`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/2fa/authenticator 
 **/
export async function getAccountTfaAuthenticator(
    options?: { [key: string]: any }
) {
    return request<API.AccountAuthenticatorInfo>(`/api/account/2fa/authenticator`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/2fa/providers 
 **/
export async function getAccountTfaProviders(
    options?: { [key: string]: any }
) {
    return request<API.StringListResult>(`/api/account/2fa/providers`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/2fa/authenticator 
 **/
export async function updateAccountTfaAuthenticator(
    payload: API.AccountAuthenticatorCodeVerifyRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountAuthenticatorRecoveryCodesResult>(`/api/account/2fa/authenticator`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
