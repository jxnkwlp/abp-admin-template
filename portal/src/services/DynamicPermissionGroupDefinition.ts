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
 * *TODO* POST /api/permission-management/definitions/groups 
 **/
export async function createDynamicPermissionGroupDefinition(
    payload: API.DynamicPermissionGroupDefinitionCreateOrUpdate,
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionGroupDefinition>(`/api/permission-management/definitions/groups`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/permission-management/definitions/groups/{id} 
 **/
export async function deleteDynamicPermissionGroupDefinition(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/permission-management/definitions/groups/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/permission-management/definitions/groups/all 
 **/
export async function getAllDynamicPermissionGroupDefinitionList(
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionGroupDefinitionListResult>(`/api/permission-management/definitions/groups/all`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/permission-management/definitions/groups/{id} 
 **/
export async function getDynamicPermissionGroupDefinition(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionGroupDefinition>(`/api/permission-management/definitions/groups/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/permission-management/definitions/groups 
 **/
export async function getDynamicPermissionGroupDefinitionList(
    params: {
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionGroupDefinitionPagedResult>(`/api/permission-management/definitions/groups`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/permission-management/definitions/groups/{id} 
 **/
export async function updateDynamicPermissionGroupDefinition(
    id: string,
    payload: API.DynamicPermissionGroupDefinitionCreateOrUpdate,
    options?: { [key: string]: any }
) {
    return request<API.DynamicPermissionGroupDefinition>(`/api/permission-management/definitions/groups/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
