// externals
import { Request, Response } from 'express';

// code under test
import {
    getMeeting,
    getMeetings,
    patchMeeting,
    patchMeetings,
    getMeetingRoutes,
    getMeetingRecordings
} from '../meetingRoutes';

// types
import {
    IZoomMeeting,
    IZoomMeetingPatch,
    IZoomMeetingPatchRequestPayload,
    TZoomMeetingRecordingsResponse
} from '../../../../common/src';

// utils
import { accountHelper } from '../../utils';
import * as requestUtils from '../../utils/requestUtils';

// config
import config from '../../../config.example.json';

describe('meetingRoutes', () => {
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
    describe('getMeeting', () => {
        let meetingId: string;
        let request: Request<{ meetingId: string }>;
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
            await getMeeting(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('getMeetingRecordings', () => {
        let meetingId: string;
        let request: Request<{ meetingId: string }>;
        let send: jest.SpyInstance;
        let status: jest.SpyInstance;
        let response: Response<TZoomMeetingRecordingsResponse>;
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
            await getMeetingRecordings(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('getMeetings', () => {
        let request: Request;
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
            await getMeetings(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('patchMeeting', () => {
        let request: Request<{ meetingId: string }, any, IZoomMeetingPatch>;
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
            await patchMeeting(request, response);
            expect(handleError).toHaveBeenCalledWith(
                expect.any(Error),
                response
            );
        });
    });
    describe('patchMeetings', () => {
        let request: Request<any, any, IZoomMeetingPatchRequestPayload[]>;
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
            await patchMeetings(request, response);
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
