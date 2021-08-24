// externals
import { Method } from 'axios';

export interface IRequestOptions<T = any> {
    data?: T;
    method: Method;
    token?: string;
    url: string;
}
