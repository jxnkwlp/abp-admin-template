/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 14
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* GET /api/identity/settings 
 **/
export async function getIdentitySettings(
    options?: { [key: string]: any }
) {
    return request<API.IdentitySettings>(`/api/identity/settings`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/settings/lockout 
 **/
export async function getIdentitySettingsLockout(
    options?: { [key: string]: any }
) {
    return request<API.IdentityLockoutSettings>(`/api/identity/settings/lockout`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/settings/organization-unit 
 **/
export async function getIdentitySettingsOrganizationUnit(
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnitSettings>(`/api/identity/settings/organization-unit`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/settings/password 
 **/
export async function getIdentitySettingsPassword(
    options?: { [key: string]: any }
) {
    return request<API.IdentityPasswordSettings>(`/api/identity/settings/password`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/settings/signin 
 **/
export async function getIdentitySettingsSignIn(
    options?: { [key: string]: any }
) {
    return request<API.IdentitySignInSettings>(`/api/identity/settings/signin`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/settings/two-factor 
 **/
export async function getIdentitySettingsTwofactor(
    options?: { [key: string]: any }
) {
    return request<API.IdentityTwofactorSettings>(`/api/identity/settings/two-factor`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/settings/user 
 **/
export async function getIdentitySettingsUser(
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserSettings>(`/api/identity/settings/user`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/settings 
 **/
export async function updateIdentitySettings(
    payload: API.IdentitySettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/settings`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/settings/lockout 
 **/
export async function updateIdentitySettingsLockout(
    payload: API.IdentityLockoutSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/settings/lockout`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/settings/organization-unit 
 **/
export async function updateIdentitySettingsOrganizationUnit(
    payload: API.OrganizationUnitSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/settings/organization-unit`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/settings/password 
 **/
export async function updateIdentitySettingsPassword(
    payload: API.IdentityPasswordSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/settings/password`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/settings/signin 
 **/
export async function updateIdentitySettingsSignIn(
    payload: API.IdentitySignInSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/settings/signin`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/settings/two-factor 
 **/
export async function updateIdentitySettingsTwofactor(
    payload: API.IdentityTwofactorSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/settings/two-factor`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/settings/user 
 **/
export async function updateIdentitySettingsUser(
    payload: API.IdentityUserSettings,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/settings/user`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}
