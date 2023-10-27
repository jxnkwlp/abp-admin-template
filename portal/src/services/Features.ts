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
 * *TODO* DELETE /api/feature-management/features 
 **/
export async function deleteFeatures(
    params: {
        providerName?: string | undefined,
        providerKey?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<any>(`/api/feature-management/features`, {
        method: 'DELETE',
        params: params,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/feature-management/features 
 **/
export async function getFeatures(
    params: {
        providerName?: string | undefined,
        providerKey?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.GetFeatureListResult>(`/api/feature-management/features`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/feature-management/features 
 **/
export async function updateFeatures(
    params: {
        providerName?: string | undefined,
        providerKey?: string | undefined
    },
    payload: API.UpdateFeatures,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/feature-management/features`, {
        method: 'PUT',
        params: params,
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}
