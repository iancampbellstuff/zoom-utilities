// externals
import { Request, Response } from 'express';

// code under test
import {
    requestUserIds,
    requestSetCurrentUserId,
    getUserRoutes
} from '../userRoutes';

// utils
import { AccountHelper } from '../../utils';

// config
import config from '../../../config.example.json';

describe('userRoutes', () => {
    beforeAll(() => {
        AccountHelper['getAccountConfigs'] = () => config;
    });
    describe('requestUserIds', () => {
        let request: Request;
        let send: jest.SpyInstance;
        let response: Response;
        beforeEach(() => {
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
            expect(send).toHaveBeenCalledWith(AccountHelper.getUserIds());
        });
    });
    describe('requestSetCurrentUserId', () => {
        let userId: string;
        let request: Request<{ userId: string }>;
        let sendStatus: jest.SpyInstance;
        let response: Response;
        beforeEach(() => {
            const userIds = AccountHelper.getUserIds();
            AccountHelper.setCurrentUserId(userId);
            userId = userIds[0];
            request = { params: { userId } } as any;
            sendStatus = jest.fn();
            response = { sendStatus } as any;
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should request to set the current user id', async () => {
            await requestSetCurrentUserId(request, response);
            expect(sendStatus).toHaveBeenCalledWith(200);
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
