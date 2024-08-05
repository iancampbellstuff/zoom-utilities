// code under test
import { AccountHelper } from '../accountUtils';

// config
import config from '../../../config.example.json';

describe('accountUtils', () => {
    describe('AccountHelper', () => {
        let accountHelper: AccountHelper;
        beforeEach(async () => {
            Object.defineProperty(
                AccountHelper.prototype,
                'requestAccountConfigs',
                {
                    value: () => Promise.resolve(config),
                    configurable: true,
                    writable: true
                }
            );
            accountHelper = await AccountHelper.requestInstanceOf();
        });
        describe('getUserIds', () => {
            it('should get user IDs', () => {
                const result = accountHelper.getUserIds();
                const userIds = config.map(
                    (accountConfig) => accountConfig.userId
                );
                expect(result).toEqual(userIds);
            });
        });
    });
});
