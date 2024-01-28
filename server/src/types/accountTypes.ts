// externals
import { AxiosError } from 'axios';

export interface IAccountConfig {
    accountId: string;
    clientId: string;
    clientSecret: string;
    userId: string;
}

export interface ITokenMapValue {
    expirationDate: Date | string;
    token: string;
}

export interface ITokenMap {
    [key: string]: ITokenMapValue;
}

export interface ITokenResponse extends ITokenMapValue {
    error: AxiosError | Error;
}

export interface IZoomTokenResponse {
    access_token: string;
    expires_in: number;
}
