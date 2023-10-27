/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 2
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* GET /api/dictionaries/{name} 
 **/
export async function getDictionary(
    name: string,
    options?: { [key: string]: any }
) {
    return request<API.DictionaryResult>(`/api/dictionaries/${name}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/dictionaries/groups/{groupName} 
 **/
export async function getDictionaryListByGroup(
    groupName: string,
    options?: { [key: string]: any }
) {
    return request<API.DictionaryListResult>(`/api/dictionaries/groups/${groupName}`, {
        method: 'GET',
        ...(options || {}),
    });
}
