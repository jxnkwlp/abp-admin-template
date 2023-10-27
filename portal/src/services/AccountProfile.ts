/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 3
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

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
 * *TODO* GET /api/account/my-profile 
 **/
export async function getAccountProfile(
    options?: { [key: string]: any }
) {
    return request<API.Profile>(`/api/account/my-profile`, {
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
