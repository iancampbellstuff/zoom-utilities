// externals
import { Request, Response } from 'express';
import express from 'express';
// types
import {
    IZoomMeeting,
    IZoomMeetingPatch,
    IZoomMeetingPatchRequestPayload,
    IZoomMeetingRecording
} from '../../../common/src';
// utils
import { getRequest } from '../../../common/src';
import { accountHelper, getUrl, handleError } from '../utils';

export const getMeeting = async (
    req: Request<{ meetingId: string }>,
    res: Response<IZoomMeeting>
) => {
    try {
        const { meetingId } = req.params;
        const token = accountHelper.getToken();
        const meeting = await getRequest<IZoomMeeting>({
            method: 'GET',
            token,
            url: getUrl(`meetings/${meetingId}`)
        });
        res.send(meeting.data);
    } catch (error) {
        handleError(error, res);
    }
};
export const getMeetings = async (
    req: Request,
    res: Response<IZoomMeeting[]>
) => {
    try {
        const token = accountHelper.getToken();
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
                // TODO: reuse getMeeting if possible
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
        handleError(error, res);
    }
};
export const getMeetingRecordings = async (
    req: Request<{ meetingId: string }>,
    res: Response<IZoomMeetingRecording[]>
) => {
    try {
        const { meetingId } = req.params;
        const token = accountHelper.getToken();
        const meetingRecordings = await getRequest<IZoomMeetingRecording[]>({
            method: 'GET',
            token,
            url: getUrl(`meetings/${meetingId}/recordings`)
        });
        res.send(meetingRecordings.data);
    } catch (error) {
        handleError(error, res);
    }
};
export const patchMeeting = async (
    req: Request<{ meetingId: string }, any, IZoomMeetingPatch>,
    res: Response
) => {
    try {
        const meetingPatch = req.body;
        const { meetingId } = req.params;
        const token = accountHelper.getToken();
        const meetingRequest = getRequest({
            data: meetingPatch,
            method: 'PATCH',
            token,
            url: getUrl(`meetings/${meetingId}`)
        });
        await meetingRequest;
        res.sendStatus(200);
    } catch (error) {
        handleError(error, res);
    }
};
export const patchMeetings = async (
    req: Request<any, any, IZoomMeetingPatchRequestPayload[]>,
    res: Response
) => {
    try {
        const meetingsInfo = req.body;
        const token = accountHelper.getToken();
        const meetingRequests = meetingsInfo.map(
            (meetingPatchRequestPayload) => {
                // TODO: reuse patchMeeting if possible
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
        handleError(error, res);
    }
};
export const getMeetingRoutes = () => {
    const router = express.Router();
    router.get(
        '/:meetingId',
        (req: Request<{ meetingId: string }>, res: Response) =>
            void getMeeting(req, res)
    );
    router.get(
        '/:meetingId/recordings',
        (req: Request<{ meetingId: string }>, res: Response) =>
            void getMeetingRecordings(req, res)
    );
    router.get(
        '/',
        (req: Request, res: Response) => void getMeetings(req, res)
    );
    router.patch(
        '/:meetingId',
        (
            req: Request<{ meetingId: string }, any, IZoomMeetingPatch>,
            res: Response
        ) => void patchMeeting(req, res)
    );
    router.patch(
        '/',
        (
            req: Request<any, any, IZoomMeetingPatchRequestPayload[]>,
            res: Response
        ) => void patchMeetings(req, res)
    );
    return router;
};
