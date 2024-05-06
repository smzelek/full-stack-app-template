import { NextFunction, Request, Response, Router } from "express";

export const healthController = Router();

const elbStatus = async (req: Request<null, null>, res: Response, next: NextFunction) => {
    res.send('OK');
};
healthController.get('/elb-status', elbStatus);
