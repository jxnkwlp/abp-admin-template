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
 * *TODO* POST /api/identity/roles 
 **/
export async function createIdentityRole(
    payload: API.IdentityRoleCreate,
    options?: { [key: string]: any }
) {
    return request<API.IdentityRole>(`/api/identity/roles`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/identity/roles/{id} 
 **/
export async function deleteIdentityRole(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/roles/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/roles/all 
 **/
export async function getAllIdentityRoleList(
    options?: { [key: string]: any }
) {
    return request<API.IdentityRoleListResult>(`/api/identity/roles/all`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/roles/{id} 
 **/
export async function getIdentityRole(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityRole>(`/api/identity/roles/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/roles/assignable-claims 
 **/
export async function getIdentityRoleAssignableClaims(
    options?: { [key: string]: any }
) {
    return request<API.IdentityClaimTypeListResult>(`/api/identity/roles/assignable-claims`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/roles/{id}/claims 
 **/
export async function getIdentityRoleClaims(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityClaimListResult>(`/api/identity/roles/${id}/claims`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/roles 
 **/
export async function getIdentityRoleList(
    params: {
        filter?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityRolePagedResult>(`/api/identity/roles`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/identity/roles/{id}/move-all-users 
 **/
export async function identityRoleMoveAllUser(
    id: string,
    payload: API.IdentityRoleMoveAllUserRequest,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/roles/${id}/move-all-users`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/roles/{id} 
 **/
export async function updateIdentityRole(
    id: string,
    payload: API.IdentityRoleUpdate,
    options?: { [key: string]: any }
) {
    return request<API.IdentityRole>(`/api/identity/roles/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/roles/{id}/claims 
 **/
export async function updateIdentityRoleClaim(
    id: string,
    payload: API.IdentityRoleClaimAddOrUpdate,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/roles/${id}/claims`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}
