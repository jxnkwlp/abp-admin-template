﻿/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 4
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* GET /api/identity/users/lookup/count 
 **/
export async function getIdentityUserLookupCount(
    params: {
        filter?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/lookup/count`, {
        method: 'GET',
        params: params,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/lookup/{id} 
 **/
export async function identityUserLookupFindById(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.UserData>(`/api/identity/users/lookup/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/lookup/by-username/{userName} 
 **/
export async function identityUserLookupFindByUserName(
    userName: string,
    options?: { [key: string]: any }
) {
    return request<API.UserData>(`/api/identity/users/lookup/by-username/${userName}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/lookup/search 
 **/
export async function identityUserLookupSearch(
    params: {
        filter?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.UserDataListResult>(`/api/identity/users/lookup/search`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}
