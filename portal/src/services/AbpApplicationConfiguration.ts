/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 1
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* GET /api/abp/application-configuration 
 **/
export async function getAbpApplicationConfiguration(
    params: {
        includeLocalizationResources?: boolean | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.ApplicationConfiguration>(`/api/abp/application-configuration`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}
