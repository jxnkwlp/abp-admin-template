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
 * *TODO* POST /api/openiddict/applications 
 **/
export async function createOpenIddictApplication(
    payload: API.CreateOrUpdateOpenIddictApplication,
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictApplication>(`/api/openiddict/applications`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/openiddict/applications/{id} 
 **/
export async function deleteOpenIddictApplication(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/openiddict/applications/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/openiddict/applications/{id} 
 **/
export async function getOpenIddictApplication(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictApplication>(`/api/openiddict/applications/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/openiddict/applications/list 
 **/
export async function getOpenIddictApplicationList(
    options?: { [key: string]: any }
) {
    return request<any>(`/api/openiddict/applications/list`, {
        method: 'GET',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/openiddict/applications 
 **/
export async function getOpenIddictApplicationPagedList(
    params: {
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictApplicationPagedResult>(`/api/openiddict/applications`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/openiddict/applications/find-by-clientid/{clientId} 
 **/
export async function openIddictApplicationFindByClientId(
    clientId: string,
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictApplication>(`/api/openiddict/applications/find-by-clientid/${clientId}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/openiddict/applications/{id} 
 **/
export async function updateOpenIddictApplication(
    id: string,
    payload: API.CreateOrUpdateOpenIddictApplication,
    options?: { [key: string]: any }
) {
    return request<API.OpenIddictApplication>(`/api/openiddict/applications/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
