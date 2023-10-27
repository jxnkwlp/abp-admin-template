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
 * *TODO* GET /api/identity/settings 
 **/
export async function getIdentitySetting(
    options?: { [key: string]: any }
) {
    return request<API.IdentitySettings>(`/api/identity/settings`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/settings 
 **/
export async function updateIdentitySetting(
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
