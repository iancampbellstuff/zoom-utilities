// externals
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
// types
import { IRequestOptions } from '../types';

/**
 * @link https://github.com/axios/axios/blob/master/lib/helpers/combineURLs.js
 */
export const combineURLs = (baseURL: string, relativeURL: string) => {
    let url = '';
    if (baseURL) {
        url = relativeURL
            ? baseURL.replace(/\/+$/, '') +
              '/' +
              relativeURL.replace(/^\/+/, '')
            : baseURL;
    }
    return url;
};
export const getRequestConfig = (requestOptions: IRequestOptions) => {
    const { data, method, token, url } = requestOptions || {};
    const requestConfig: AxiosRequestConfig = {
        data,
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        method,
        url
    };
    return requestConfig;
};
export const getRequest = <T = any>(requestOptions: IRequestOptions) => {
    const requestConfig = getRequestConfig(requestOptions);
    const axiosRequest: AxiosPromise<T> = axios(requestConfig);
    return axiosRequest;
};
