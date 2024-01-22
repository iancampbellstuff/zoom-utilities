// externals
import { Method } from 'axios';

export interface IRequestParamsOptions {
    [param: string]: string;
}

export interface IRequestOptions<T = any> {
    data?: T;
    method: Method;
    params?: IRequestParamsOptions;
    token?: string;
    url: string;
}
