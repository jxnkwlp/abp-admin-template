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
 * *TODO* POST /api/dictionary-management/groups 
 **/
export async function createDictionaryGroup(
    payload: API.DictionaryGroupCreate,
    options?: { [key: string]: any }
) {
    return request<API.DictionaryGroup>(`/api/dictionary-management/groups`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/dictionary-management/groups/{name} 
 **/
export async function deleteDictionaryGroup(
    name: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/dictionary-management/groups/${name}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/dictionary-management/groups/all 
 **/
export async function getAllDictionaryGroupList(
    options?: { [key: string]: any }
) {
    return request<API.DictionaryGroupListResult>(`/api/dictionary-management/groups/all`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/dictionary-management/groups/{name} 
 **/
export async function getDictionaryGroup(
    name: string,
    options?: { [key: string]: any }
) {
    return request<API.DictionaryGroup>(`/api/dictionary-management/groups/${name}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/dictionary-management/groups 
 **/
export async function getDictionaryGroupList(
    params: {
        filter?: string | undefined,
        parentName?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.DictionaryGroupPagedResult>(`/api/dictionary-management/groups`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/dictionary-management/groups/{name} 
 **/
export async function updateDictionaryGroup(
    name: string,
    payload: API.DictionaryGroupUpdate,
    options?: { [key: string]: any }
) {
    return request<API.DictionaryGroup>(`/api/dictionary-management/groups/${name}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}
