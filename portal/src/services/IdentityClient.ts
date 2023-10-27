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
 * *TODO* POST /api/identity-management/clients 
 **/
export async function createIdentityClient(
    payload: API.IdentityClientCreate,
    options?: { [key: string]: any }
) {
    return request<API.IdentityClient>(`/api/identity-management/clients`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/identity-management/clients/{id} 
 **/
export async function deleteIdentityClient(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity-management/clients/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity-management/clients/{id} 
 **/
export async function getIdentityClient(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityClient>(`/api/identity-management/clients/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity-management/clients 
 **/
export async function getIdentityClientList(
    params: {
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityClientPagedResult>(`/api/identity-management/clients`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/identity-management/clients/{id}/validate 
 **/
export async function identityClientValidate(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity-management/clients/${id}/validate`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity-management/clients/{id} 
 **/
export async function updateIdentityClient(
    id: string,
    payload: API.IdentityClientUpdate,
    options?: { [key: string]: any }
) {
    return request<API.IdentityClient>(`/api/identity-management/clients/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
