// code under test
import { accountHelper } from '../accountUtils';

// config
import config from '../../../config.example.json';

describe('accountUtils', () => {
    describe('accountHelper', () => {
        describe('getUserIds', () => {
            beforeEach(() => {
                accountHelper['getAccountConfigs'] = () => config;
            });
            it('should get user IDs', () => {
                const result = accountHelper.getUserIds();
                const userIds = config.map(
                    accountConfig => accountConfig.userId
                );
                expect(result).toEqual(userIds);
            });
        });
        describe('currentUserId', () => {
            beforeEach(() => {
                accountHelper['getAccountConfigs'] = () => config;
                accountHelper['currentUserId'] = undefined;
            });
            it('should get the current user ID before being set', () => {
                const result = accountHelper.getCurrentUserId();
                expect(result).toBeUndefined();
            });
            it('should get the current user ID after being set', () => {
                // unknown user ID
                let userId = 'unknown@unknown.com';
                accountHelper.setCurrentUserId(userId);
                let result = accountHelper.getCurrentUserId();
                expect(result).toBeUndefined();
                // known user ID
                userId = accountHelper.getUserIds()[0];
                accountHelper.setCurrentUserId(userId);
                result = accountHelper.getCurrentUserId();
                expect(result).toEqual(userId);
            });
        });
        describe('getToken', () => {
            let userId: string;
            beforeAll(() => {
                const userIds = accountHelper.getUserIds();
                userId = userIds[0];
                accountHelper.setCurrentUserId(userId);
                accountHelper['getAccountConfigs'] = () => config;
                accountHelper['tokenMap'] = accountHelper['getTokenMap']();
            });
            it('should get a token for a known user ID', () => {
                const result = accountHelper.getToken(userId);
                expect(result).toBeDefined();
            });
            it('should get a token for an unknown user ID', () => {
                userId = 'unknown@unknown.com';
                const result = accountHelper.getToken(userId);
                expect(result).toBeUndefined();
            });
            it('should get a token for a falsy user ID', () => {
                const result = accountHelper.getToken();
                expect(result).toBeDefined();
            });
        });
    });
});
