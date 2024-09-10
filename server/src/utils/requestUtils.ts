// externals
import { AxiosError } from 'axios';
import { Response } from 'express';
// constants
import { BASE_ROUTE } from '../constants';
// utils
import { combineURLs } from '@zoom-utilities/common/src/utils';

export interface IUrlQueryParam {
    key: string;
    value: string;
}

export const getUrl = (path: string, queryParams?: IUrlQueryParam[]) => {
    let baseUrl = combineURLs(BASE_ROUTE, path);
    if (queryParams) {
        const url = new URL(baseUrl);
        for (const queryParam of queryParams) {
            const { key, value } = queryParam;
            url.searchParams.append(key, value);
        }
        url.searchParams.sort();
        const { href } = url;
        baseUrl = decodeURIComponent(href);
    }
    return baseUrl;
};
export const handleError = (axiosError: AxiosError, res: Response) => {
    if (axiosError?.response) {
        const { data, status } = axiosError.response;
        res?.status(status).send(data);
    } else {
        const message = axiosError?.message || 'An unknown error occurred!';
        res?.status(500).send(message);
    }
};
