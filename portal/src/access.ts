import { InitialStateType } from './.umi/plugin-initialState/@@initialState';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: InitialStateType) {
    const grantedPolicies = initialState?.configuration?.auth?.grantedPolicies ?? {};
    return { ...grantedPolicies };
}
