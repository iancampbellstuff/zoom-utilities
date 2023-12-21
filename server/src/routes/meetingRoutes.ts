// externals
import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import express from 'express';
// types
import {
    IZoomMeeting,
    IZoomMeetingPatch,
    IZoomMeetingPatchRequestPayload
} from '../../../common/src';
// utils
import { getRequest } from '../../../common/src';
import { AccountHelper, getUrl, handleError } from '../utils';

export const requestMeeting = async (
    req: Request<{ meetingId: string }>,
    res: Response<IZoomMeeting>
) => {
    try {
        const { meetingId } = req.params;
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const meeting = await getRequest<IZoomMeeting>({
            method: 'GET',
            token,
            url: getUrl(`meetings/${meetingId}`)
        });
        res.send(meeting.data);
    } catch (error) {
        handleError(error as AxiosError, res);
    }
};
export const requestMeetings = async (
    req: Request,
    res: Response<IZoomMeeting[]>
) => {
    try {
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const userId = accountHelper.getCurrentUserId();
        const meetingsResponse = await getRequest<{ meetings: IZoomMeeting[] }>(
            {
                method: 'GET',
                token,
                url: getUrl(`users/${userId}/meetings`)
            }
        );
        const meetingRequests = meetingsResponse.data.meetings.map(
            (meeting) => {
                // TODO: reuse requestMeeting if possible
                const meetingRequest = getRequest({
                    method: 'GET',
                    token,
                    url: getUrl(`meetings/${meeting.id}`)
                });
                return meetingRequest;
            }
        );
        const meetingResponses = await Promise.all<any>(meetingRequests);
        const meetings = meetingResponses.map((meetingResponse) => {
            return meetingResponse.data;
        }) as IZoomMeeting[];
        res.send(meetings);
    } catch (error) {
        handleError(error as AxiosError, res);
    }
};
export const requestPatchMeeting = async (
    req: Request<{ meetingId: string }, any, IZoomMeetingPatch>,
    res: Response
) => {
    try {
        const meetingPatch = req.body;
        const { meetingId } = req.params;
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const meetingRequest = getRequest({
            data: meetingPatch,
            method: 'PATCH',
            token,
            url: getUrl(`meetings/${meetingId}`)
        });
        await meetingRequest;
        res.sendStatus(200);
    } catch (error) {
        handleError(error as AxiosError, res);
    }
};
export const requestPatchMeetings = async (
    req: Request<any, any, IZoomMeetingPatchRequestPayload[]>,
    res: Response
) => {
    try {
        const meetingsInfo = req.body;
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const meetingRequests = meetingsInfo.map(
            (meetingPatchRequestPayload) => {
                // TODO: reuse requestPatchMeeting if possible
                const meetingRequest = getRequest({
                    data: meetingPatchRequestPayload.data,
                    method: 'PATCH',
                    token,
                    url: getUrl(`meetings/${meetingPatchRequestPayload.id}`)
                });
                return meetingRequest;
            }
        );
        await Promise.all<any>(meetingRequests);
        res.sendStatus(200);
    } catch (error) {
        handleError(error as AxiosError, res);
    }
};
export const requestDeleteMeeting = async (
    req: Request<{ meetingId: string }, any, IZoomMeetingPatch>,
    res: Response
) => {
    try {
        const meetingPatch = req.body;
        const { meetingId } = req.params;
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const meetingRequest = getRequest({
            data: meetingPatch,
            method: 'DELETE',
            token,
            url: getUrl(`meetings/${meetingId}`)
        });
        await meetingRequest;
        res.sendStatus(200);
    } catch (error) {
        handleError(error as AxiosError, res);
    }
};
export const requestDeleteMeetings = async (
    req: Request<any, any, IZoomMeetingPatchRequestPayload[]>,
    res: Response
) => {
    try {
        const meetingsInfo = req.body;
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const meetingRequests = meetingsInfo.map(
            (meetingPatchRequestPayload) => {
                // TODO: reuse requestDeleteMeeting if possible
                const meetingRequest = getRequest({
                    data: meetingPatchRequestPayload.data,
                    method: 'DELETE',
                    token,
                    url: getUrl(`meetings/${meetingPatchRequestPayload.id}`)
                });
                return meetingRequest;
            }
        );
        await Promise.all<any>(meetingRequests);
        res.sendStatus(200);
    } catch (error) {
        handleError(error as AxiosError, res);
    }
};

/**
 *
 * @returns
 */
export const getMeetingRoutes = () => {
    const router = express.Router();
    router.get(
        '/:meetingId',
        (req: Request<{ meetingId: string }>, res: Response<IZoomMeeting>) =>
            void requestMeeting(req, res)
    );
    router.get(
        '/',
        (req: Request, res: Response<IZoomMeeting[]>) =>
            void requestMeetings(req, res)
    );
    router.patch(
        '/:meetingId',
        (
            req: Request<{ meetingId: string }, any, IZoomMeetingPatch>,
            res: Response
        ) => void requestPatchMeeting(req, res)
    );
    router.patch(
        '/',
        (
            req: Request<any, any, IZoomMeetingPatchRequestPayload[]>,
            res: Response
        ) => void requestPatchMeetings(req, res)
    );
    router.delete(
        '/:meetingId',
        (
            req: Request<{ meetingId: string }, any, IZoomMeetingPatch>,
            res: Response
        ) => void requestDeleteMeeting(req, res)
    );
    router.delete(
        '/',
        (
            req: Request<any, any, IZoomMeetingPatchRequestPayload[]>,
            res: Response
        ) => void requestDeleteMeetings(req, res)
    );
    return router;
};
