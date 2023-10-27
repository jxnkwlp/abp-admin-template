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
 * *TODO* GET /api/account/admin/settings 
 **/
export async function getAccountAdminSetting(
    options?: { [key: string]: any }
) {
    return request<API.AccountAdminSettings>(`/api/account/admin/settings`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/account/admin/settings 
 **/
export async function updateAccountAdminSetting(
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
