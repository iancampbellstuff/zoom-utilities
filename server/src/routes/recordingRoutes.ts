// externals
import { Request, Response } from 'express';
import express from 'express';
// types
import { TZoomMeetingRecordingsResponse } from '../../../common/src';
// utils
import { getRequest } from '../../../common/src';
import { AccountHelper, getUrl, handleError } from '../utils';

export const requestRecordings = async (
    req: Request,
    res: Response<TZoomMeetingRecordingsResponse>
) => {
    try {
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const userId = accountHelper.getCurrentUserId();
        const meetingRecordings =
            await getRequest<TZoomMeetingRecordingsResponse>({
                method: 'GET',
                token,
                url: getUrl(`users/${userId}/recordings`)
            });
        res.send(meetingRecordings.data);
    } catch (error) {
        handleError(error, res);
    }
};
export const requestRecordingsSinceDate = async (
    req: Request<{ year: string; month: string; day: string }>,
    res: Response<TZoomMeetingRecordingsResponse>
) => {
    try {
        const { year, month, day } = req.params;
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken();
        const userId = accountHelper.getCurrentUserId();
        let url = getUrl(`users/${userId}/recordings`);
        if (year && month && day) {
            url += `?from=${year}-${month}-${day}`;
        }
        const meetingRecordings =
            await getRequest<TZoomMeetingRecordingsResponse>({
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
        (req: Request, res: Response) => void requestRecordings(req, res)
    );
    router.get(
        '/:year(\\d{4})-:month(\\d{2})-:day(\\d{2})',
        (
            req: Request<{ year: string; month: string; day: string }>,
            res: Response
        ) => void requestRecordingsSinceDate(req, res)
    );
    return router;
};
