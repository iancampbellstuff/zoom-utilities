// externals
import { Request, Response } from 'express';
// code under test
import {
    IZoomMeetingRequestParams,
    IZoomMeetingRequestQuery,
    getMeetingRoutes,
    requestLiveMeetings,
    requestMeeting,
    requestMeetings,
    requestPatchMeeting,
    requestPatchMeetings
} from '../meetingRoutes';
// config
import config from '../../../config.example.json';
// types
import {
    IZoomLiveMeetingsResponse,
    IZoomMeeting,
    IZoomMeetingPatch,
    IZoomMeetingPatchRequestPayload
} from '@zoom-utilities/common/src/types';
// utils
import { AccountHelper } from '../../utils';
import * as requestUtils from '../../utils/requestUtils';

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
            IZoomMeetingRequestParams,
            null,
            null,
            IZoomMeetingRequestQuery
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
        let request: Request<null, null, null, IZoomMeetingRequestQuery>;
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
    describe('requestLiveMeetings', () => {
        let request: Request<null, null, null, IZoomMeetingRequestQuery>;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response<IZoomLiveMeetingsResponse>;
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
            await requestLiveMeetings(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('requestPatchMeeting', () => {
        let request: Request<
            IZoomMeetingRequestParams,
            null,
            IZoomMeetingPatch,
            IZoomMeetingRequestQuery
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
            IZoomMeetingRequestQuery
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
