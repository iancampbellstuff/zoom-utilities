// externals
import axios from 'axios';
// types
import { IAccountConfig, ITokenMap, ITokenResponse } from '../types';
// utils
import { isExpired } from '../../../common/src/utils';
// config
import config from '../../config.json';
// constants
import { OAUTH_ROUTE } from '../constants';

export class AccountHelper {
    private static INSTANCE: AccountHelper;
    private currentUserId: string;
    private tokenMap: ITokenMap;
    public static async requestInstanceOf(): Promise<AccountHelper> {
        if (!AccountHelper.INSTANCE) {
            AccountHelper.INSTANCE = new AccountHelper();
            const tokenMap = await AccountHelper.INSTANCE.requestTokenMap();
            AccountHelper.INSTANCE.tokenMap = tokenMap;
        }
        return AccountHelper.INSTANCE;
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}
    private getAccountConfigs(): IAccountConfig[] {
        const accountConfigs = config || [];
        return accountConfigs;
    }
    private async generateToken(
        accountConfig: IAccountConfig
    ): Promise<ITokenResponse> {
        try {
            const { accountId, clientId, clientSecret } = accountConfig;
            const request = await axios.post(
                OAUTH_ROUTE,
                `grant_type=account_credentials&account_id=${accountId}`,
                {
                    headers: {
                        Authorization: `Basic ${Buffer.from(
                            `${clientId}:${clientSecret}`
                        ).toString('base64')}`
                    }
                }
            );
            const { access_token: token, expires_in: expirationDate } =
                await request.data;
            return {
                error: null,
                expirationDate,
                token
            };
        } catch (error) {
            return {
                error,
                expirationDate: null,
                token: null
            };
        }
    }
    private async requestTokenMap(): Promise<ITokenMap> {
        const accountConfigs = this.getAccountConfigs();
        const tokenMap: ITokenMap = {};
        for (const accountConfig of accountConfigs) {
            const { token, expirationDate, error } = await this.generateToken(
                accountConfig
            );
            if (error) {
                console.error(error);
            } else {
                tokenMap[accountConfig.userId] = {
                    expirationDate,
                    token
                };
            }
        }
        return tokenMap;
    }
    public getUserIds(): string[] {
        const accountConfigs = this.getAccountConfigs();
        const userIds = accountConfigs.map(
            (accountConfig: IAccountConfig) => accountConfig.userId
        );
        return userIds;
    }
    public getCurrentUserId() {
        return this.currentUserId;
    }
    public setCurrentUserId(userId: string) {
        const userIds = this.getUserIds();
        if (userIds.includes(userId)) {
            this.currentUserId = userId;
        }
    }
    private getTokenMapValue(userId: string) {
        const accountConfigs = this.getAccountConfigs();
        const accountConfig = accountConfigs.find(
            (accountConfig) => accountConfig.userId === userId
        );
        const tokenMapValue = this.tokenMap[accountConfig?.userId];
        return tokenMapValue;
    }
    public async requestToken(
        userId: string = this.currentUserId
    ): Promise<string | null> {
        const tokenMapValue = this.getTokenMapValue(userId);
        if (tokenMapValue) {
            const { expirationDate, token } = tokenMapValue;
            if (expirationDate && isExpired(expirationDate)) {
                // reset token map
                this.tokenMap = await this.requestTokenMap();
                // get new token
                const newToken = await this.requestToken(userId);
                return newToken;
            }
            return token;
        }
        return null;
    }
}
