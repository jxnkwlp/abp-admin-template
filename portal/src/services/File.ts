/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 8
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/file-management/{containerName}
 **/
export async function createFile(
    containerName: string,
    payload: API.CreateFileRequest,
    options?: { [key: string]: any }
) {
    return request<API.File>(`/api/file-management/${containerName}`, {
        method: 'POST',
        requestType: 'form',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/file-management/{containerName}/directory
 **/
export async function createFileDirectory(
    containerName: string,
    payload: API.FileDirectoryCreate,
    options?: { [key: string]: any }
) {
    return request<API.File>(`/api/file-management/${containerName}/directory`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/file-management/{containerName}/{id}
 **/
export async function deleteFile(
    containerName: string, id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/file-management/${containerName}/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/file-management/{containerName}/{id}/move
 **/
export async function fileMove(
    containerName: string, id: string,
    payload: API.FileMoveRequest,
    options?: { [key: string]: any }
) {
    return request<API.File>(`/api/file-management/${containerName}/${id}/move`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/file-management/{containerName}/{id}
 **/
export async function getFile(
    containerName: string, id: string,
    options?: { [key: string]: any }
) {
    return request<API.File>(`/api/file-management/${containerName}/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/file-management/{containerName}/{id}/blob
 **/
export async function getFileBlob(
    containerName: string, id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/file-management/${containerName}/${id}/blob`, {
        method: 'GET',
        getResponse: true,
        responseType: 'blob',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/file-management/{containerName}
 **/
export async function getFileList(
    containerName: string,
    params: {
        filter?: string | undefined,
        parentId?: string | undefined,
        isDirectory?: boolean | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.FilePagedResult>(`/api/file-management/${containerName}`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/file-management/{containerName}/{id}
 **/
export async function updateFile(
    containerName: string, id: string,
    payload: API.FileUpdate,
    options?: { [key: string]: any }
) {
    return request<API.File>(`/api/file-management/${containerName}/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
