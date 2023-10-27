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
 * *TODO* POST /api/file-management/containers 
 **/
export async function createFileContainer(
    payload: API.FileContainerCreate,
    options?: { [key: string]: any }
) {
    return request<API.FileContainer>(`/api/file-management/containers`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/file-management/containers/{id} 
 **/
export async function deleteFileContainer(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/file-management/containers/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/file-management/containers/all 
 **/
export async function getAllFileContainerList(
    options?: { [key: string]: any }
) {
    return request<API.FileContainerListResult>(`/api/file-management/containers/all`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/file-management/containers/{id} 
 **/
export async function getFileContainer(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.FileContainer>(`/api/file-management/containers/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/file-management/containers/by-name/{name} 
 **/
export async function getFileContainerByName(
    name: string,
    options?: { [key: string]: any }
) {
    return request<API.FileContainer>(`/api/file-management/containers/by-name/${name}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/file-management/containers 
 **/
export async function getFileContainerList(
    params: {
        filter?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.FileContainerPagedResult>(`/api/file-management/containers`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/file-management/containers/{id} 
 **/
export async function updateFileContainer(
    id: string,
    payload: API.FileContainerUpdate,
    options?: { [key: string]: any }
) {
    return request<API.FileContainer>(`/api/file-management/containers/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
