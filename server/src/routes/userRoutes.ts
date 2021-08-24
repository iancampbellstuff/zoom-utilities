// externals
import { Request, Response } from 'express';
import express from 'express';
// utils
import { accountHelper } from '../utils';

export const requestUserIds = (req: Request, res: Response) => {
    const userIds = accountHelper.getUserIds();
    return res.send(userIds);
};
export const requestSetCurrentUserId = (
    req: Request<{ userId: string }>,
    res: Response
) => {
    const { userId } = req.params;
    accountHelper.setCurrentUserId(userId);
    return res.sendStatus(200);
};
export const getUserRoutes = () => {
    const router = express.Router();
    router.get('/', (req: Request, res: Response) => requestUserIds(req, res));
    router.post('/:userId', (req: Request<{ userId: string }>, res: Response) =>
        requestSetCurrentUserId(req, res)
    );
    return router;
};
