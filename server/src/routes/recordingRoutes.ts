// externals
import { Request, Response } from 'express';
import express from 'express';
// types
import { TZoomMeetingRecordingsResponse } from '../../../common/src';
// utils
import { getRequest } from '../../../common/src';
import { accountHelper, getUrl, handleError } from '../utils';

export const getRecordings = async (
    req: Request,
    res: Response<TZoomMeetingRecordingsResponse>
) => {
    try {
        const token = accountHelper.getToken();
        const userId = accountHelper.getCurrentUserId();
        const meetingRecordings = await getRequest<
            TZoomMeetingRecordingsResponse
        >({
            method: 'GET',
            token,
            url: getUrl(`users/${userId}/recordings`)
        });
        res.send(meetingRecordings.data);
    } catch (error) {
        handleError(error, res);
    }
};
export const getRecordingsSinceDate = async (
    req: Request<{ year: string; month: string; day: string }>,
    res: Response<TZoomMeetingRecordingsResponse>
) => {
    try {
        const { year, month, day } = req.params;
        const token = accountHelper.getToken();
        const userId = accountHelper.getCurrentUserId();
        let url = getUrl(`users/${userId}/recordings`);
        if (year && month && day) {
            url += `?from=${year}-${month}-${day}`;
        }
        const meetingRecordings = await getRequest<
            TZoomMeetingRecordingsResponse
        >({
            method: 'GET',
            token,
            url
        });
        res.send(meetingRecordings.data);
    } catch (error) {
        handleError(error, res);
    }
};
export const getRecordingRoutes = () => {
    const router = express.Router();
    router.get(
        '/',
        (req: Request, res: Response) => void getRecordings(req, res)
    );
    router.get(
        '/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})',
        (
            req: Request<{ year: string; month: string; day: string }>,
            res: Response
        ) => void getRecordingsSinceDate(req, res)
    );
    return router;
};
