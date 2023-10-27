/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 16
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/identity/organization-units 
 **/
export async function createOrganizationUnit(
    payload: API.OrganizationUnitCreate,
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnit>(`/api/identity/organization-units`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/identity/organization-units/{id} 
 **/
export async function deleteOrganizationUnit(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/organization-units/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/identity/organization-units/{id}/roles/{roleId} 
 **/
export async function deleteOrganizationUnitRole(
    id: string,    roleId: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/organization-units/${id}/roles/${roleId}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/identity/organization-units/{id}/users/{userId} 
 **/
export async function deleteOrganizationUnitUser(
    id: string,    userId: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/organization-units/${id}/users/${userId}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units/children/{parentId}/all 
 **/
export async function getAllOrganizationUnitChildrenList(
    parentId: string,
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnitListResult>(`/api/identity/organization-units/children/${parentId}/all`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units/all 
 **/
export async function getAllOrganizationUnitList(
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnitListResult>(`/api/identity/organization-units/all`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units/{id} 
 **/
export async function getOrganizationUnit(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnit>(`/api/identity/organization-units/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units/{id}/assignable-roles 
 **/
export async function getOrganizationUnitAssignableRoles(
    id: string,
    params: {
        filter?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityRolePagedResult>(`/api/identity/organization-units/${id}/assignable-roles`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units/{id}/assignable-users 
 **/
export async function getOrganizationUnitAssignableUsers(
    id: string,
    params: {
        filter?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserPagedResult>(`/api/identity/organization-units/${id}/assignable-users`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units/children/{parentId} 
 **/
export async function getOrganizationUnitChildrenList(
    parentId: string,
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnitListResult>(`/api/identity/organization-units/children/${parentId}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units 
 **/
export async function getOrganizationUnitList(
    params: {
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnitPagedResult>(`/api/identity/organization-units`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units/{id}/roles 
 **/
export async function getOrganizationUnitRoles(
    id: string,
    params: {
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityRolePagedResult>(`/api/identity/organization-units/${id}/roles`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/organization-units/{id}/users 
 **/
export async function getOrganizationUnitUsers(
    id: string,
    params: {
        filter?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserPagedResult>(`/api/identity/organization-units/${id}/users`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/identity/organization-units/{id}/roles 
 **/
export async function organizationUnitAddRoles(
    id: string,
    payload: API.OrganizationUnitAddRoleRequest,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/organization-units/${id}/roles`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/identity/organization-units/{id}/users 
 **/
export async function organizationUnitAddUsers(
    id: string,
    payload: API.OrganizationUnitAddUserRequest,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/organization-units/${id}/users`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/organization-units/{id} 
 **/
export async function updateOrganizationUnit(
    id: string,
    payload: API.OrganizationUnitUpdate,
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnit>(`/api/identity/organization-units/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
