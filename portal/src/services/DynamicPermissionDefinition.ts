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
 * *TODO* POST /api/permission-management/definitions 
 **/
export async function createDynamicPermissionDefinition(
    payload: API.DynamicPermissionDefinitionCreate,
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionDefinition>(`/api/permission-management/definitions`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/permission-management/definitions/{id} 
 **/
export async function deleteDynamicPermissionDefinition(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/permission-management/definitions/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/permission-management/definitions/all 
 **/
export async function getAllDynamicPermissionDefinitionList(
    params: {
        groupId?: string | undefined,
        parentId?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionDefinitionListResult>(`/api/permission-management/definitions/all`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/permission-management/definitions/{id} 
 **/
export async function getDynamicPermissionDefinition(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionDefinition>(`/api/permission-management/definitions/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/permission-management/definitions 
 **/
export async function getDynamicPermissionDefinitionList(
    params: {
        groupId?: string | undefined,
        parentId?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionDefinitionPagedResult>(`/api/permission-management/definitions`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/permission-management/definitions/{id} 
 **/
export async function updateDynamicPermissionDefinition(
    id: string,
    payload: API.DynamicPermissionDefinitionUpdate,
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionDefinition>(`/api/permission-management/definitions/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
