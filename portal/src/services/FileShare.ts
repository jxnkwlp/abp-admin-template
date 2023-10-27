/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 3
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/files/{containerName}/{id}/share 
 **/
export async function createFileShare(
    containerName: string,    id: string,
    payload: API.FileShareCreateRequest,
    options?: { [key: string]: any }
) {
    return request<API.FileShareResult>(`/api/files/${containerName}/${id}/share`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/files/share/{token} 
 **/
export async function getFileShare(
    token: string,
    options?: { [key: string]: any }
) {
    return request<API.FileShareResult>(`/api/files/share/${token}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/files/share/{token}/blob 
 **/
export async function getFileShareBlob(
    token: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/files/share/${token}/blob`, {
        method: 'GET',
        getResponse: true,
        ...(options || {}),
    });
}
