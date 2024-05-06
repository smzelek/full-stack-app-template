import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { ApiErrorResponse, ApiSuccessResponse, int } from '../types';
import { logFunction } from './utils';
import { healthController } from './controllers/health.controller';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from './env';
import { ErrorConstant, DOMAIN_ERROR, errors } from './errors';
import { nodeUuid } from './utils';
import { asyncLocalStorage } from './context';

declare global {
    namespace Express {
        interface Locals {
            request_id: string;
            user_id?: int;
            org_id?: int;
        }
    }
}

const PORT = process.env.PORT || 8000;

const errorMiddleware = (error: Error | ErrorConstant, req: Request, res: Response, next: NextFunction): void => {
    if (typeof error === 'object' && "_source" in error && error._source === DOMAIN_ERROR) {
        logFunction(errorMiddleware, { error });
        res.status(error.status).send(error.error);
        return;
    }

    const internalError = { error: error.toString(), stack: (error as Error).stack }
    logFunction(errorMiddleware, internalError);
    res.status(500).send("Internal Server Error");
};

function api(req: Request, res: Response, next: NextFunction) {
    res.locals.request_id = nodeUuid();

    const originalSend = res.send;
    (res.send as any) = function (this: ThisType<{}>, data: any) {
        res.send = originalSend;
        console.log(JSON.stringify({
            tag: "API",
            request_id: res.locals.request_id,
            method: req.method,
            path: req.path,
            status: res.statusCode,
        }));
        if (res.statusCode >= 500) {
            const responseStructure: ApiErrorResponse = {
                meta: {
                    status: res.statusCode,
                    version: 'dev',
                },
                error: "Internal Server Error",
            };
            originalSend.call(this, responseStructure);
        } else if (res.statusCode >= 400) {
            const responseStructure: ApiErrorResponse = {
                meta: {
                    status: res.statusCode,
                    version: 'dev',
                    ...(Array.isArray(data) ? { count: data.length } : {})
                },
                error: data,
            };
            originalSend.call(this, responseStructure);
        } else {
            const responseStructure: ApiSuccessResponse<any> = {
                meta: {
                    status: res.statusCode,
                    version: 'dev',
                    ...(Array.isArray(data) ? { count: data.length } : {})
                },
                data: data,
            };
            originalSend.call(this, responseStructure);
        }
    };
    asyncLocalStorage.run({ request_id: res.locals.request_id }, () => {
        next();
    });
}

// Applying the middleware globally
const app = express();
app.use(cors());
app.use(express.json());
app.use(api);
app.use(healthController);

app.get('*', function (req, res, next) {
    next(errors.NotFoundOrNoDiscoveryForbidden);
});

app.use(errorMiddleware);

const startServer = () => {
    logFunction(startServer, `⚡️[server]: Server is running at http://localhost:${PORT}`);
};
app.listen(PORT, startServer);

