/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 1
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* GET /api/account/security-logs 
 **/
export async function getAccountSecurityLogsList(
    params: {
        applicationName?: string | undefined,
        identity?: string | undefined,
        action?: string | undefined,
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
    return request<API.IdentitySecurityLogPagedResult>(`/api/account/security-logs`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}
