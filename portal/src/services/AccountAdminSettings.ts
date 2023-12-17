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
 * *TODO* GET /api/account/admin/settings 
 **/
export async function getAccountAdminSettings(
    options?: { [key: string]: any }
) {
    return request<API.AccountAdminSettings>(`/api/account/admin/settings`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/admin/settings/captcha 
 **/
export async function getAccountAdminSettingsCaptcha(
    options?: { [key: string]: any }
) {
    return request<API.AccountCaptchaSettings>(`/api/account/admin/settings/captcha`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/admin/settings/external-login 
 **/
export async function getAccountAdminSettingsExternalLogin(
    options?: { [key: string]: any }
) {
    return request<API.AccountExternalLoginSettings>(`/api/account/admin/settings/external-login`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/admin/settings/general 
 **/
export async function getAccountAdminSettingsGeneral(
    options?: { [key: string]: any }
) {
    return request<API.AccountGeneralSettings>(`/api/account/admin/settings/general`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/account/admin/settings/recaptcha 
 **/
export async function getAccountAdminSettingsRecaptcha(
    options?: { [key: string]: any }
) {
    return request<API.AccountRecaptchaSettings>(`/api/account/admin/settings/recaptcha`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/admin/settings 
 **/
export async function updateAccountAdminSettings(
    payload: API.AccountAdminSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/admin/settings`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/admin/settings/captcha 
 **/
export async function updateAccountAdminSettingsCaptcha(
    payload: API.AccountCaptchaSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/admin/settings/captcha`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/admin/settings/external-login 
 **/
export async function updateAccountAdminSettingsExternalLogin(
    payload: API.AccountExternalLoginSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/admin/settings/external-login`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/admin/settings/general 
 **/
export async function updateAccountAdminSettingsGeneral(
    payload: API.AccountGeneralSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/admin/settings/general`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/admin/settings/recaptcha 
 **/
export async function updateAccountAdminSettingsRecaptcha(
    payload: API.AccountRecaptchaSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/account/admin/settings/recaptcha`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}
