// externals
import { AxiosError } from 'axios';

export interface IAccountConfig {
    accountId: string;
    clientId: string;
    clientSecret: string;
    userId: string;
}

export interface ITokenMapValue {
    expirationDate?: Date | string | null;
    token?: string | null;
}

export interface ITokenMap {
    [key: string]: ITokenMapValue;
}

export interface ITokenResponse extends ITokenMapValue {
    error?: AxiosError | Error | null;
}

export interface IZoomTokenResponse {
    access_token: string;
    expires_in: number;
}
