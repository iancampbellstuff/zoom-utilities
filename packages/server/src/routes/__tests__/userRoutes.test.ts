// externals
import { Request, Response } from 'express';

// code under test
import { requestUserIds, getUserRoutes } from '../userRoutes';

// utils
import { AccountHelper } from '../../utils';

// config
import config from '../../../config.example.json';

describe('userRoutes', () => {
    beforeAll(() => {
        Object.defineProperty(
            AccountHelper.prototype,
            'requestAccountConfigs',
            {
                value: () => Promise.resolve(config),
                configurable: true,
                writable: true
            }
        );
    });
    describe('requestUserIds', () => {
        let accountHelper: AccountHelper;
        let request: Request;
        let send: jest.SpyInstance;
        let response: Response;
        beforeEach(async () => {
            accountHelper = await AccountHelper.requestInstanceOf();
            request = {} as any;
            send = jest.fn();
            response = {
                send
            } as any;
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should request user IDs', async () => {
            await requestUserIds(request, response);
            expect(send).toHaveBeenCalledWith(accountHelper.getUserIds());
        });
    });
    describe('getUserRoutes', () => {
        it('should get user routes', () => {
            const result = getUserRoutes();
            expect(result.get('/')).toBeDefined();
            expect(result.post('/:userId')).toBeDefined();
        });
    });
});
