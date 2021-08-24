// externals
import jwt from 'jsonwebtoken';
// types
import { IAccountConfig, ITokenMap, ITokenPayload } from '../types';
// utils
import { isExpired } from '../../../common/src/utils';
// config
import config from '../../config.json';

class AccountHelper {
    // 90 minutes -- hours * minutes * seconds * milliseconds
    private static readonly EXPIRATION_MILLISECONDS = 1 * 90 * 60 * 1000;
    private static INSTANCE: AccountHelper;
    private currentUserId: string;
    private tokenMap: ITokenMap;
    public static getInstanceOf(): AccountHelper {
        if (!AccountHelper.INSTANCE) {
            AccountHelper.INSTANCE = new AccountHelper();
        }
        return AccountHelper.INSTANCE;
    }
    private constructor() {
        this.tokenMap = this.getTokenMap();
    }
    private getAccountConfigs(): IAccountConfig[] {
        const accountConfigs = config || [];
        return accountConfigs;
    }
    public getUserIds(): string[] {
        const accountConfigs = this.getAccountConfigs();
        const userIds = accountConfigs.map(
            (accountConfig: IAccountConfig) => accountConfig.userId
        );
        return userIds;
    }
    private getExpirationDate() {
        const expirationDate = new Date(
            Date.now() + AccountHelper.EXPIRATION_MILLISECONDS
        );
        return expirationDate;
    }
    private generateToken(accountConfig: IAccountConfig, expirationDate: Date) {
        const { apiKey, apiSecret } = accountConfig;
        const payload: ITokenPayload = {
            exp: expirationDate.getTime(),
            iss: apiKey
        };
        const token = jwt.sign(payload, apiSecret);
        return token;
    }
    private getTokenMap(): ITokenMap {
        const accountConfigs = this.getAccountConfigs();
        const expirationDate = this.getExpirationDate();
        const tokenMap = accountConfigs.reduce(
            (tokenMap: ITokenMap, accountConfig: IAccountConfig) => {
                const token = this.generateToken(accountConfig, expirationDate);
                tokenMap[accountConfig.userId] = {
                    expirationDate,
                    token
                };
                return tokenMap;
            },
            {}
        );
        return tokenMap;
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
            accountConfig => accountConfig.userId === userId
        );
        const tokenMapValue = this.tokenMap[accountConfig?.userId];
        return tokenMapValue;
    }
    public getToken(userId: string = this.currentUserId): string {
        const tokenMapValue = this.getTokenMapValue(userId);
        const expirationDate = tokenMapValue?.expirationDate;
        let token = tokenMapValue?.token;
        if (expirationDate && isExpired(expirationDate)) {
            // reset token map
            this.tokenMap = this.getTokenMap();
            // get new token
            token = this.getToken(userId);
        }
        return token;
    }
}

export const accountHelper = AccountHelper.getInstanceOf();
