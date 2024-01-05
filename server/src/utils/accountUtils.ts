// externals
import axios from 'axios';
import fs from 'fs';
// types
import { IAccountConfig, ITokenMap, ITokenResponse } from '../types';
// utils
import { isExpired } from '../../../common/src/utils';
import { requestModule } from './moduleUtils';
// constants
import { OAUTH_ROUTE } from '../constants';

export class AccountHelper {
    private static INSTANCE: AccountHelper;
    private currentUserId: string;
    private tokenMap: ITokenMap;
    private localConfig: IAccountConfig[];
    public static async requestInstanceOf(): Promise<AccountHelper> {
        if (!AccountHelper.INSTANCE) {
            AccountHelper.INSTANCE = new AccountHelper();
            // set local config
            const localConfig =
                await AccountHelper.INSTANCE.requestAccountConfigs();
            AccountHelper.INSTANCE.localConfig = localConfig;
            // set token map
            const tokenMap = await AccountHelper.INSTANCE.requestTokenMap();
            AccountHelper.INSTANCE.tokenMap = tokenMap;
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
        const tokenMap: ITokenMap = {};
        for (const accountConfig of this.localConfig) {
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
        const userIds = this.localConfig.map(
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
        const accountConfig = this.localConfig.find(
            (accountConfig) => accountConfig.userId === userId
        );
        const tokenMapValue = this.tokenMap[accountConfig?.userId];
        return tokenMapValue;
    }
    public async requestToken(
        userId: string = this.currentUserId
    ): Promise<string | null> {
        let tokenMapValue = this.getTokenMapValue(userId);
        if (tokenMapValue) {
            const { expirationDate, token } = tokenMapValue;
            if (!isExpired(expirationDate)) {
                return token;
            }
        }
        // reset token map
        this.tokenMap = await this.requestTokenMap();
        // get new token
        tokenMapValue = this.getTokenMapValue(userId);
        return tokenMapValue ? tokenMapValue.token : null;
    }
}
