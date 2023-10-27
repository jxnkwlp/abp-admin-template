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
 * *TODO* POST /auth/saml2/{name}/logout 
 **/
export async function saml2Logout(
    name: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/auth/saml2/${name}/logout`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /auth/saml2/{name}/metadata 
 **/
export async function saml2Saml2Metadata(
    name: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/auth/saml2/${name}/metadata`, {
        method: 'GET',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /auth/saml2/{name}/endpoint/descriptor 
 **/
export async function saml2Saml2Metadata1(
    name: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/auth/saml2/${name}/endpoint/descriptor`, {
        method: 'GET',
        getResponse: true,
        ...(options || {}),
    });
}
