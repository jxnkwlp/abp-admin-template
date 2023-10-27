/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 13
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/account/change-password 
 **/
export async function accountLoginChangePassword(
    payload: API.AccountRequiredChangePasswordRequest,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/change-password`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/check-password 
 **/
export async function accountLoginCheckPassword(
    payload: API.AccountLoginRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountLoginResult>(`/api/account/check-password`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/login/has-authenticator 
 **/
export async function accountLoginHasAuthenticator(
    options?: { [key: string]: any }
) {
    return request<API.AccountHasAuthenticatorResult>(`/api/account/login/has-authenticator`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/login 
 **/
export async function accountLoginLogin(
    payload: API.AccountLoginRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountLoginResult>(`/api/account/login`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/login/authenticator/recovery-code 
 **/
export async function accountLoginLoginWithAuthenticatorRecoveryCode(
    payload: API.AccountLoginWithAuthenticatorRecoveryCodeRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountLoginResult>(`/api/account/login/authenticator/recovery-code`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/login/2fa/{provider} 
 **/
export async function accountLoginLoginWithTfa(
    provider: string,
    payload: API.AccountLoginWith2FaRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountLoginResult>(`/api/account/login/2fa/${provider}`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/logout 
 **/
export async function accountLoginLogout(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/logout`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/login/2fa/{provider}/token 
 **/
export async function accountLoginSendTfaToken(
    provider: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/login/2fa/${provider}/token`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/authenticator/verify 
 **/
export async function accountLoginVerifyAuthenticatorToken(
    payload: API.AccountAuthenticatorCodeVerifyRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountAuthenticatorRecoveryCodesResult>(`/api/account/authenticator/verify`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/login/2fa/{provider}/verify 
 **/
export async function accountLoginVerifyTfaToken(
    provider: string,
    payload: API.AccountLoginVerifyTwoFactorToken,
    options?: { [key: string]: any }
) {
    return request<API.AccountVerifyTokenResult>(`/api/account/login/2fa/${provider}/verify`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/login/authenticator 
 **/
export async function getAccountLoginAuthenticatorInfo(
    options?: { [key: string]: any }
) {
    return request<API.AccountAuthenticatorInfo>(`/api/account/login/authenticator`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/login/external-providers 
 **/
export async function getAccountLoginExternalAuthentications(
    options?: { [key: string]: any }
) {
    return request<API.AccountExternalAuthenticationSchameListResult>(`/api/account/login/external-providers`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/login/2fa 
 **/
export async function getAccountLoginTfaStatus(
    options?: { [key: string]: any }
) {
    return request<API.AccountTFaState>(`/api/account/login/2fa`, {
        method: 'GET',
        ...(options || {}),
    });
}
