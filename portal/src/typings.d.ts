declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

import type { HTMLAttributes } from 'react';

declare module 'react' {
    interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
        disabled?: boolean;
    }
}

import { AxiosResponseHeaders, AxiosRequestConfig } from 'axios';

declare module 'axios' {
    interface AxiosResponse<T = any> {
        ok?: boolean;
        data?: T;
    }

    export interface AxiosResponse<T = any, D = any> {
        ok?: boolean;
        data: T;
        status: number;
        statusText: string;
        headers: AxiosResponseHeaders;
        config: AxiosRequestConfig<D>;
        request?: any;
    }
}
