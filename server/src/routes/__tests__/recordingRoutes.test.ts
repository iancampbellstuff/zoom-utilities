// externals
import { Request, Response } from 'express';

// code under test
import {
    getRecordings,
    getRecordingsSinceDate,
    getRecordingRoutes
} from '../recordingRoutes';

// types
import { TZoomMeetingRecordingsResponse } from '../../../../common/src';

// utils
import { accountHelper } from '../../utils';
import * as requestUtils from '../../utils/requestUtils';

// config
import config from '../../../config.example.json';

describe('recordingRoutes', () => {
    let handleError: jest.SpyInstance;
    beforeAll(() => {
        accountHelper['getAccountConfigs'] = () => config;
        const userIds = accountHelper.getUserIds();
        const userId = userIds[0];
        accountHelper.setCurrentUserId(userId);
        accountHelper['tokenMap'] = accountHelper['getTokenMap']();
    });
    beforeEach(() => {
        handleError = jest.spyOn(requestUtils, 'handleError');
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getRecordings', () => {
        let request: Request;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response<TZoomMeetingRecordingsResponse>;
        beforeEach(() => {
            request = {} as any;
            send = jest.fn();
            status = jest.fn(() => ({ send }));
            response = {
                status
            } as any;
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should handle a request error', async () => {
            await getRecordings(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('getRecordingsSinceDate', () => {
        let request: Request<{ year: string; month: string; day: string }>;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response<TZoomMeetingRecordingsResponse>;
        beforeEach(() => {
            request = {
                params: {
                    year: '2022',
                    month: '08',
                    day: '31'
                }
            } as any;
            send = jest.fn();
            status = jest.fn(() => ({ send }));
            response = {
                status
            } as any;
        });
        afterEach(() => {
            jest.clearAllMocks();
        });
        it('should handle a request error', async () => {
            await getRecordingsSinceDate(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('getRecordingRoutes', () => {
        it('should get recording routes', () => {
            const result = getRecordingRoutes();
            expect(result.get('/')).toBeDefined();
            expect(
                result.get('/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})')
            ).toBeDefined();
        });
    });
});
