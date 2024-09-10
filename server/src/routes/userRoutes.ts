// externals
import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import express from 'express';
// types
import { IZoomMeetingPost } from '@zoom-utilities/common/src/types';
// utils
import { AccountHelper, getUrl, handleError } from '../utils';
import { getRequest } from '@zoom-utilities/common/src/utils';

interface IUserRequestParams {
    userId: string;
}

export const requestUserIds = async (req: Request, res: Response) => {
    const accountHelper = await AccountHelper.requestInstanceOf();
    const userIds = accountHelper.getUserIds();
    return res.send(userIds);
};
export const requestCreateMeeting = async (
    req: Request<IUserRequestParams, null, IZoomMeetingPost>,
    res: Response
) => {
    try {
        const meetingPost = req.body;
        const { userId } = req.params;
        const accountHelper = await AccountHelper.requestInstanceOf();
        const token = await accountHelper.requestToken(userId);
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
        '/:userId/meetings',
        (
            req: Request<IUserRequestParams, null, IZoomMeetingPost>,
            res: Response
        ) => void requestCreateMeeting(req, res)
    );
    return router;
};
