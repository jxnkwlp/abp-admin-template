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
 * *TODO* DELETE /api/identity/security-logs/{id} 
 **/
export async function deleteIdentitySecurityLog(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/security-logs/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/security-logs/{id} 
 **/
export async function getIdentitySecurityLog(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentitySecurityLog>(`/api/identity/security-logs/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/security-logs 
 **/
export async function getIdentitySecurityLogList(
    params: {
        applicationName?: string | undefined,
        identity?: string | undefined,
        action?: string | undefined,
        userId?: string | undefined,
        userName?: string | undefined,
        clientId?: string | undefined,
        correlationId?: string | undefined,
        startTime?: string | undefined,
        endTime?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentitySecurityLogPagedResult>(`/api/identity/security-logs`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}
