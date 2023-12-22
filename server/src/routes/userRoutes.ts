// externals
import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import express from 'express';
// types
import { IZoomMeetingPost } from '../../../common/src/types';
// utils
import { AccountHelper, getUrl, handleError } from '../utils';
import { getRequest } from '../../../common/src/utils';

export const requestUserIds = async (req: Request, res: Response) => {
    const accountHelper = await AccountHelper.requestInstanceOf();
    const userIds = accountHelper.getUserIds();
    return res.send(userIds);
};
export const requestSetCurrentUserId = async (
    req: Request<{ userId: string }>,
    res: Response
) => {
    const { userId } = req.params;
    const accountHelper = await AccountHelper.requestInstanceOf();
    accountHelper.setCurrentUserId(userId);
    return res.sendStatus(200);
};
export const requestCreateMeeting = async (
    req: Request<any, any, IZoomMeetingPost>,
    res: Response
) => {
    try {
        const { userId } = req.params;
        const meetingPost = req.body;
        const accountHelper = await AccountHelper.requestInstanceOf();
        if (accountHelper.getCurrentUserId() !== userId) {
            res.sendStatus(400);
        }
        const token = await accountHelper.requestToken();
        const meetingRequest = getRequest({
            data: meetingPost,
            method: 'POST',
            token,
            url: getUrl(`users/${userId}/meetings`)
        });
        await meetingRequest;
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        handleError(error as AxiosError, res);
    }
};
export const getUserRoutes = () => {
    const router = express.Router();
    router.get(
        '/',
        (req: Request, res: Response) => void requestUserIds(req, res)
    );
    router.post(
        '/:userId',
        (req: Request<{ userId: string }>, res: Response) =>
            void requestSetCurrentUserId(req, res)
    );
    router.post(
        '/:userId/meetings',
        (
            req: Request<{ userId: string }, any, IZoomMeetingPost>,
            res: Response
        ) => void requestCreateMeeting(req, res)
    );
    return router;
};
