// externals
import { Request, Response } from 'express';

// code under test
import {
    getRecordingRoutes,
    IRecordingsRequestQuery,
    requestRecordings
} from '../recordingRoutes';

// types
import { TZoomMeetingRecordingsResponseData } from '../../../../common/src';

// utils
import { AccountHelper } from '../../utils';
import * as requestUtils from '../../utils/requestUtils';

// config
import config from '../../../config.example.json';

describe('recordingRoutes', () => {
    let handleError: jest.SpyInstance;
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
    beforeEach(() => {
        handleError = jest.spyOn(requestUtils, 'handleError');
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('requestRecordings', () => {
        let request: Request<null, null, null, IRecordingsRequestQuery>;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response<TZoomMeetingRecordingsResponseData>;
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
            await requestRecordings(request, response);
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
