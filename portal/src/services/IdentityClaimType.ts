/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 5
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/identity/claim-types 
 **/
export async function createIdentityClaimType(
    payload: API.IdentityClaimTypeCreate,
    options?: { [key: string]: any }
) {
    return request<API.IdentityClaimType>(`/api/identity/claim-types`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/identity/claim-types/{id} 
 **/
export async function deleteIdentityClaimType(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/claim-types/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/claim-types/all 
 **/
export async function getAllIdentityClaimTypeList(
    options?: { [key: string]: any }
) {
    return request<API.IdentityClaimTypeListResult>(`/api/identity/claim-types/all`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/claim-types 
 **/
export async function getIdentityClaimTypeList(
    params: {
        filter?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityClaimTypePagedResult>(`/api/identity/claim-types`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/claim-types/{id} 
 **/
export async function updateIdentityClaimType(
    id: string,
    payload: API.IdentityClaimTypeUpdate,
    options?: { [key: string]: any }
) {
    return request<API.IdentityClaimType>(`/api/identity/claim-types/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
