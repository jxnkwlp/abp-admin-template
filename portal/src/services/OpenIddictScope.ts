/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 7
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/openiddict/scopes 
 **/
export async function createOpenIddictScope(
    payload: API.CreateOpenIddictScope,
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictScope>(`/api/openiddict/scopes`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/openiddict/scopes/{id} 
 **/
export async function deleteOpenIddictScope(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/openiddict/scopes/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/openiddict/scopes/{id} 
 **/
export async function getOpenIddictScope(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictScope>(`/api/openiddict/scopes/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/openiddict/scopes/list 
 **/
export async function getOpenIddictScopeList(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/openiddict/scopes/list`, {
        method: 'GET',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/openiddict/scopes 
 **/
export async function getOpenIddictScopePagedList(
    params: {
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictScopePagedResult>(`/api/openiddict/scopes`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/openiddict/scopes/find-by-name/{name} 
 **/
export async function openIddictScopeFindByName(
    name: string,
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictScope>(`/api/openiddict/scopes/find-by-name/${name}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/openiddict/scopes/{id} 
 **/
export async function updateOpenIddictScope(
    id: string,
    payload: API.UpdateOpenIddictScope,
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictScope>(`/api/openiddict/scopes/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
