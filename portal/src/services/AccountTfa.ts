/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 16
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
 * *TODO* DELETE /api/account/2fa/providers/email 
 **/
export async function accountTfaDisabledEmailTokenProvider(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/providers/email`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/account/2fa/providers/phone-number 
 **/
export async function accountTfaDisabledPhoneNumberTokenProvider(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/providers/phone-number`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/2fa 
 **/
export async function accountTfaEnabled(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa`, {
        method: 'PUT',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/2fa/providers/email 
 **/
export async function accountTfaEnabledEmailTokenProvider(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/providers/email`, {
        method: 'PUT',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/2fa/providers/phone-number 
 **/
export async function accountTfaEnabledPhoneNumberTokenProvider(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/providers/phone-number`, {
        method: 'PUT',
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
 * *TODO* DELETE /api/account/2fa/authenticator 
 **/
export async function accountTfaRemoveAuthenticator(
    params: {
        code: string
    },
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/authenticator`, {
        method: 'DELETE',
        params: params,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/2fa/authenticator/verify 
 **/
export async function accountTfaVerifyAuthenticatorToken(
    payload: API.AccountAuthenticatorCodeVerifyRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountVerifyTokenResult>(`/api/account/2fa/authenticator/verify`, {
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
 * *TODO* GET /api/account/2fa/preferred-provider 
 **/
export async function getAccountTfaPreferredProvider(
    options?: { [key: string]: any }
) {
    return request<API.AccountPreferredProvider>(`/api/account/2fa/preferred-provider`, {
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

/**
 * *TODO* PUT /api/account/2fa/preferred-provider 
 **/
export async function updateAccountTfaPreferredProvider(
    payload: API.AccountUpdatePreferredProvider,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/2fa/preferred-provider`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}
