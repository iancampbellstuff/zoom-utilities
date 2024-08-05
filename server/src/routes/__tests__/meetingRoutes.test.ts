// externals
import { Request, Response } from 'express';

// code under test
import {
    IMeetingRequestParams,
    IMeetingRequestQuery,
    getMeetingRoutes,
    requestMeeting,
    requestMeetings,
    requestPatchMeeting,
    requestPatchMeetings
} from '../meetingRoutes';

// types
import {
    IZoomMeeting,
    IZoomMeetingPatch,
    IZoomMeetingPatchRequestPayload
} from '../../../../common/src';

// utils
import { AccountHelper } from '../../utils';
import * as requestUtils from '../../utils/requestUtils';

// config
import config from '../../../config.example.json';

describe('meetingRoutes', () => {
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
    describe('requestMeeting', () => {
        let meetingId: string;
        let request: Request<
            IMeetingRequestParams,
            null,
            null,
            IMeetingRequestQuery
        >;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response<IZoomMeeting>;
        beforeEach(() => {
            meetingId = 'test meeting ID';
            request = { params: { meetingId } } as any;
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
            await requestMeeting(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('requestMeetings', () => {
        let request: Request<null, null, null, IMeetingRequestQuery>;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response<IZoomMeeting[]>;
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
            await requestMeetings(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('requestPatchMeeting', () => {
        let request: Request<
            IMeetingRequestParams,
            null,
            IZoomMeetingPatch,
            IMeetingRequestQuery
        >;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response;
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
            await requestPatchMeeting(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('requestPatchMeetings', () => {
        let request: Request<
            null,
            null,
            IZoomMeetingPatchRequestPayload[],
            IMeetingRequestQuery
        >;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response;
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
            await requestPatchMeetings(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('getMeetingRoutes', () => {
        it('should get meeting routes', () => {
            const result = getMeetingRoutes();
            expect(result.get('/:meetingId')).toBeDefined();
            expect(result.get('/')).toBeDefined();
            expect(result.get('/recordings')).toBeDefined();
            expect(result.patch('/:meetingId')).toBeDefined();
            expect(result.patch('/')).toBeDefined();
        });
    });
});
