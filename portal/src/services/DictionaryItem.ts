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
 * *TODO* POST /api/dictionary-management/items 
 **/
export async function createDictionaryItem(
    payload: API.DictionaryItemCreate,
    options?: { [key: string]: any }
) {
    return request<API.DictionaryItem>(`/api/dictionary-management/items`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/dictionary-management/items/{name} 
 **/
export async function deleteDictionaryItem(
    name: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/dictionary-management/items/${name}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/dictionary-management/items/all 
 **/
export async function getAllDictionaryItemList(
    params: {
        filter?: string | undefined,
        groupName?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.DictionaryItemListResult>(`/api/dictionary-management/items/all`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/dictionary-management/items/{name} 
 **/
export async function getDictionaryItem(
    name: string,
    options?: { [key: string]: any }
) {
    return request<API.DictionaryItem>(`/api/dictionary-management/items/${name}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/dictionary-management/items 
 **/
export async function getDictionaryItemList(
    params: {
        filter?: string | undefined,
        groupName?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.DictionaryItemPagedResult>(`/api/dictionary-management/items`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/dictionary-management/items/{name} 
 **/
export async function updateDictionaryItem(
    name: string,
    payload: API.DictionaryItemUpdate,
    options?: { [key: string]: any }
) {
    return request<API.DictionaryItem>(`/api/dictionary-management/items/${name}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
