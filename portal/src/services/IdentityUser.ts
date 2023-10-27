/**
 * Generate from url: https://localhost:44361/swagger/v1/swagger.json
 * It is recommended not to modify the document
 * Total count: 26
 **/
// @ts-ignore
/* eslint-disable */
import type { API } from "./typings";
import { request } from '@umijs/max';

/**
 * *TODO* POST /api/identity/users 
 **/
export async function createIdentityUser(
    payload: API.IdentityUserCreateV2,
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserV2>(`/api/identity/users`, {
        method: 'POST',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* DELETE /api/identity/users/{id} 
 **/
export async function deleteIdentityUser(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}`, {
        method: 'DELETE',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/{id} 
 **/
export async function getIdentityUser(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserV2>(`/api/identity/users/${id}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/assignable-claims 
 **/
export async function getIdentityUserAssignableClaims(
    options?: { [key: string]: any }
) {
    return request<API.IdentityClaimTypeListResult>(`/api/identity/users/assignable-claims`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/assignable-organization-units 
 **/
export async function getIdentityUserAssignableOrganizationUnits(
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnitListResult>(`/api/identity/users/assignable-organization-units`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/assignable-roles 
 **/
export async function getIdentityUserAssignableRoles(
    options?: { [key: string]: any }
) {
    return request<API.IdentityRoleListResult>(`/api/identity/users/assignable-roles`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/{id}/claims 
 **/
export async function getIdentityUserClaims(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityClaimListResult>(`/api/identity/users/${id}/claims`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users 
 **/
export async function getIdentityUserList(
    params: {
        filter?: string | undefined,
        emailAddress?: string | undefined,
        roleId?: string | undefined,
        organizationUnitId?: string | undefined,
        isLockedOut?: boolean | undefined,
        isActive?: boolean | undefined,
        isExternal?: boolean | undefined,
        minCreationTime?: string | undefined,
        maxCreationTime?: string | undefined,
        sorting?: string | undefined,
        skipCount?: number | undefined,
        maxResultCount?: number | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserV2PagedResult>(`/api/identity/users`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/{id}/organization-units 
 **/
export async function getIdentityUserOrganizationUnits(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.OrganizationUnitListResult>(`/api/identity/users/${id}/organization-units`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/{id}/roles 
 **/
export async function getIdentityUserRoles(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityRoleListResult>(`/api/identity/users/${id}/roles`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/{id}/should-change-password 
 **/
export async function getIdentityUserShouldChangePassword(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserShouldChangePassword>(`/api/identity/users/${id}/should-change-password`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/{id}/two-factor-enabled 
 **/
export async function getIdentityUserTwoFactorEnabled(
    id: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserTwoFactorEnabled>(`/api/identity/users/${id}/two-factor-enabled`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id}/clear-password 
 **/
export async function identityUserClearPassword(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/clear-password`, {
        method: 'PUT',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/by-email/{userName} 
 **/
export async function identityUserFindByEmail(
    userName: string,
    params: {
        email?: string | undefined
    },
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserV2>(`/api/identity/users/by-email/${userName}`, {
        method: 'GET',
        params: params,
        ...(options || {}),
    });
}

/**
 * *TODO* GET /api/identity/users/by-username/{userName} 
 **/
export async function identityUserFindByUsername(
    userName: string,
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserV2>(`/api/identity/users/by-username/${userName}`, {
        method: 'GET',
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/identity/users/{id}/lock 
 **/
export async function identityUserLock(
    id: string,
    payload: API.IdentityUserSetLockoutRequest,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/lock`, {
        method: 'POST',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/identity/users/{id}/reset-authenticator 
 **/
export async function identityUserResetAuthenticator(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/reset-authenticator`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* POST /api/identity/users/{id}/unlock 
 **/
export async function identityUserUnLock(
    id: string,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/unlock`, {
        method: 'POST',
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id} 
 **/
export async function updateIdentityUser(
    id: string,
    payload: API.IdentityUserUpdateV2,
    options?: { [key: string]: any }
) {
    return request<API.IdentityUserV2>(`/api/identity/users/${id}`, {
        method: 'PUT',
        data: payload,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id}/claims 
 **/
export async function updateIdentityUserClaim(
    id: string,
    payload: API.IdentityUserClaimAddOrUpdate,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/claims`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id}/email-confirmed 
 **/
export async function updateIdentityUserEmailConfirmed(
    id: string,
    payload: API.IdentityUserUpdateConfirmed,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/email-confirmed`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id}/organization-units 
 **/
export async function updateIdentityUserOrganizationUnits(
    id: string,
    payload: API.IdentityUserUpdateOrganizationUnits,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/organization-units`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id}/change-password 
 **/
export async function updateIdentityUserPassword(
    id: string,
    payload: API.IdentityUserUpdatePassword,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/change-password`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id}/phonenumber-confirmed 
 **/
export async function updateIdentityUserPhoneNumberConfirmed(
    id: string,
    payload: API.IdentityUserUpdateConfirmed,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/phonenumber-confirmed`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id}/roles 
 **/
export async function updateIdentityUserRoles(
    id: string,
    payload: API.IdentityUserUpdateRoles,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/roles`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}

/**
 * *TODO* PUT /api/identity/users/{id}/two-factor-enabled 
 **/
export async function updateIdentityUserTwoFactorEnabled(
    id: string,
    payload: API.IdentityUserTwoFactorEnabled,
    options?: { [key: string]: any }
) {
    return request<any>(`/api/identity/users/${id}/two-factor-enabled`, {
        method: 'PUT',
        data: payload,
        getResponse: true,
        ...(options || {}),
    });
}
