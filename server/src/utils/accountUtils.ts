// externals
import axios, { AxiosResponse } from 'axios';
import fs from 'fs';
// types
import {
    IAccountConfig,
    ITokenMap,
    ITokenMapValue,
    ITokenResponse,
    IZoomTokenResponse
} from '../types';
// utils
import { getExpirationDate, isExpired } from '../../../common/src/utils';
import { requestModule } from './moduleUtils';
// constants
import { OAUTH_ROUTE } from '../constants';

export class AccountHelper {
    private static INSTANCE: AccountHelper;
    private localConfig: IAccountConfig[];
    private tokenMap: ITokenMap;
    public static async requestInstanceOf(): Promise<AccountHelper> {
        if (!AccountHelper.INSTANCE) {
            AccountHelper.INSTANCE = new AccountHelper();
            // set local config
            const localConfig =
                await AccountHelper.INSTANCE.requestAccountConfigs();
            AccountHelper.INSTANCE.localConfig = localConfig;
            // set token map
            AccountHelper.INSTANCE.tokenMap = {};
        }
        return AccountHelper.INSTANCE;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
    private async requestAccountConfigs(): Promise<IAccountConfig[]> {
        let accountConfigs = [];
        try {
            const config = fs
                .readFileSync(process.env.CONFIG_FILE, 'utf8')
                .trim();
            accountConfigs = JSON.parse(config);
        } catch (error) {
            accountConfigs = await requestModule<IAccountConfig[]>(
                '../../config.json'
            );
        }
        return accountConfigs;
    }
    private getAccountConfig(userId: string): IAccountConfig | null {
        let accountConfig: IAccountConfig;
        for (const config of this.localConfig) {
            if (userId === config.userId) {
                accountConfig = config;
                break;
            }
        }
        return accountConfig;
    }
    private async generateToken(userId: string): Promise<ITokenResponse> {
        let response: ITokenResponse;
        try {
            const accountConfig = this.getAccountConfig(userId);
            if (!accountConfig) {
                throw new EvalError(`Invalid user ID ${userId}!`);
            }
            const { accountId, clientId, clientSecret } = accountConfig;
            const request: AxiosResponse<IZoomTokenResponse, null> =
                await axios.post(
                    OAUTH_ROUTE,
                    `grant_type=account_credentials&account_id=${accountId}`,
                    {
                        headers: {
                            Authorization: `Basic ${Buffer.from(
                                `${clientId}:${clientSecret}`
                            ).toString('base64')}`,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                );
            const { access_token: token, expires_in: expirationSeconds } =
                request.data;
            const expirationDate = getExpirationDate(expirationSeconds);
            response = {
                error: null,
                expirationDate,
                token
            };
        } catch (error) {
            response = {
                error,
                expirationDate: null,
                token: null
            };
        }
        return response;
    }
    public getUserIds(): string[] {
        const userIds = this.localConfig.map(
            (accountConfig: IAccountConfig) => accountConfig.userId
        );
        return userIds;
    }
    private getTokenMapValue(userId: string): ITokenMapValue {
        const accountConfig = this.localConfig.find(
            (accountConfig) => accountConfig.userId === userId
        );
        const tokenMapValue = this.tokenMap[accountConfig?.userId];
        return tokenMapValue;
    }
    public async requestToken(userId: string): Promise<string | null> {
        const tokenMapValue = this.getTokenMapValue(userId);
        if (tokenMapValue) {
            const { expirationDate, token } = tokenMapValue;
            if (!isExpired(expirationDate)) {
                return token;
            }
        }
        const tokenResponse = await this.generateToken(userId);
        const { error, ...ITokenMapValue } = tokenResponse;
        if (error) {
            console.error(error);
            return null;
        } else {
            this.tokenMap[userId] = ITokenMapValue;
            return ITokenMapValue.token;
        }
    }
}
