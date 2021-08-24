export interface IAccountConfig {
    apiKey: string;
    apiSecret: string;
    userId: string;
}

export interface ITokenMapValue {
    expirationDate: Date;
    token: string;
}

export interface ITokenMap {
    [key: string]: ITokenMapValue;
}

export interface ITokenPayload {
    exp: number;
    iss: string;
}
