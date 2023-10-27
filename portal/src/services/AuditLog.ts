/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 6
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* DELETE /api/audit-logging/audit-logs/{id} 
 **/
export async function deleteAuditLog(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/audit-logging/audit-logs/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/audit-logging/audit-logs/{id} 
 **/
export async function getAuditLog(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.AuditLog>(`/api/audit-logging/audit-logs/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/audit-logging/audit-logs/entity-changes 
 **/
export async function getAuditLogEntityChangePagedList(
    params: {
        auditLogId?: string | undefined,
        startTime?: string | undefined,
        endTime?: string | undefined,
        changeType?: any | undefined,
        entityId?: string | undefined,
        entityTypeFullName?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.EntityChangePagedResult>(`/api/audit-logging/audit-logs/entity-changes`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/audit-logging/audit-logs/entity-changes-with-username/{entityId} 
 **/
export async function getAuditLogEntityChangesWithUsername(
    entityId: string,
    params: {
        entityTypeFullName?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<any>(`/api/audit-logging/audit-logs/entity-changes-with-username/${entityId}`, {
        method: 'GET',
        params: params,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/audit-logging/audit-logs/entity-change-with-username/{entityChangeId} 
 **/
export async function getAuditLogEntityChangeWithUsername(
    entityChangeId: string,
    options?: { [key: string]: any }
) {
    return request<API.EntityChangeWithUsername>(`/api/audit-logging/audit-logs/entity-change-with-username/${entityChangeId}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/audit-logging/audit-logs 
 **/
export async function getAuditLogPagedList(
    params: {
        startTime?: string | undefined,
        endTime?: string | undefined,
        httpMethod?: string | undefined,
        url?: string | undefined,
        userId?: string | undefined,
        userName?: string | undefined,
        applicationName?: string | undefined,
        clientIpAddress?: string | undefined,
        correlationId?: string | undefined,
        maxExecutionDuration?: number | undefined,
        minExecutionDuration?: number | undefined,
        hasException?: boolean | undefined,
        httpStatusCode?: any | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.AuditLogPagedResult>(`/api/audit-logging/audit-logs`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}
