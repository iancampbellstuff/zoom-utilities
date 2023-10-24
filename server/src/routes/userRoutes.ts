// externals
import { Request, Response } from 'express';
import express from 'express';
// utils
import { AccountHelper } from '../utils';

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
    return router;
};
