/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 12
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* PUT /api/account/my-profile/change-email 
 **/
export async function accountProfileChangeEmail(
    payload: API.AccountProfileChangeEmail,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/my-profile/change-email`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/my-profile/change-password 
 **/
export async function accountProfileChangePassword(
    payload: API.ChangePasswordInput,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/my-profile/change-password`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/my-profile/change-phone-number 
 **/
export async function accountProfileChangePhoneNumber(
    payload: API.AccountProfileChangePhoneNumber,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/my-profile/change-phone-number`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/my-profile/change-email/token 
 **/
export async function accountProfileSendChangeEmailToken(
    payload: API.AccountProfileChangeEmailToken,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/my-profile/change-email/token`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/my-profile/change-phone-number/token 
 **/
export async function accountProfileSendChangePhoneNumberToken(
    payload: API.AccountProfileChangePhoneNumberToken,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/my-profile/change-phone-number/token`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/my-profile/email-confirm/token 
 **/
export async function accountProfileSendEmailConfirm(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/my-profile/email-confirm/token`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/my-profile/change-email/verify 
 **/
export async function accountProfileVerifyChangeEmailToken(
    payload: API.AccountProfileChangeEmail,
    options?: { [key: string]: any }
) {
    return request<API.AccountVerifyTokenResult>(`/api/account/my-profile/change-email/verify`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/my-profile/change-phone-number/verify 
 **/
export async function accountProfileVerifyChangePhoneNumberToken(
    payload: API.AccountProfileChangePhoneNumber,
    options?: { [key: string]: any }
) {
    return request<API.AccountVerifyTokenResult>(`/api/account/my-profile/change-phone-number/verify`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/account/my-profile/email-confirm/verify 
 **/
export async function accountProfileVerifyEmailConfirmToken(
    payload: API.AccountVerifyTokenRequest,
    options?: { [key: string]: any }
) {
    return request<API.AccountVerifyTokenResult>(`/api/account/my-profile/email-confirm/verify`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/my-profile 
 **/
export async function getAccountProfileV2(
    options?: { [key: string]: any }
) {
    return request<API.AccountProfile>(`/api/account/my-profile`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/my-profile 
 **/
export async function updateAccountProfile(
    payload: API.UpdateProfile,
    options?: { [key: string]: any }
) {
    return request<API.Profile>(`/api/account/my-profile`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/my-profile/email-confirm 
 **/
export async function updateAccountProfileEmailConfirm(
    payload: API.AccountVerifyTokenRequest,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/my-profile/email-confirm`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}
