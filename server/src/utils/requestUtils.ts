// externals
import { AxiosError } from 'axios';
import { Response } from 'express';
// utils
import { combineURLs } from '../../../common/src';

export const BASE_ROUTE = 'https://api.zoom.us/v2';
export const getUrl = (path: string) => {
    const url = combineURLs(BASE_ROUTE, path);
    return url;
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
