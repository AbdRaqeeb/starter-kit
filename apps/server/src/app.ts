import { emailService } from '@workspace/email';
import Config from '@workspace/utils/config';
import { PROJECT_NAME } from '@workspace/utils/constants';
import { cors } from 'hono/cors';
import { createFactory } from 'hono/factory';
import { requestId } from 'hono/request-id';

import * as httpServices from './api';
import { connection, createPgAdapter } from './database';
import { bodyParser, setHeaders } from './lib';
import { logRequestMiddleware } from './log';
import { createRepositories } from './repositories';
import * as services from './services';
import { Env, Hono, Server } from './types';
import { HttpStatusCode } from './types/enums';

const startNewApplication = () => {
    const factory = createFactory<Env>();

    const app = new Hono<Env>();
    const router = new Hono<Env>();

    const trustedOrigins = [
        ...Config.trustedOrigins,
        'https://accounts.google.com',
        'http://localhost:3278',
        'http://localhost:3754',
    ];

    const corsMiddleware = cors({
        origin: (origin, _context) => {
            if (!origin) return '*';
            return trustedOrigins.includes(origin) ? origin : '*';
        },
        allowHeaders: ['Accept', 'Content-Length', 'Content-Type', 'Authorization', 'Last-Event-ID'],
        allowMethods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        maxAge: 86400,
        credentials: true,
    });

    // set headers
    app.use('*', corsMiddleware);

    // set headers
    app.use(setHeaders);
    router.use(setHeaders);

    // set request id
    app.use('*', requestId());

    // parse json
    app.use(bodyParser);

    // log request
    app.use(logRequestMiddleware());

    app.get('/', (context) => {
        context.status(HttpStatusCode.Ok);
        return context.json({ message: `Welcome to ${PROJECT_NAME}` });
    });

    return { app, factory, router };
};

export const createNewServer = (): Server => {
    const { app, factory, router } = startNewApplication();
    const DB = createPgAdapter(connection);
    const repo = createRepositories(DB);

    const server: Server = {
        app,
        factory,
        userService: services.newUserService(repo.user),
        emailService,
    };

    // mount routes
    httpServices.authHttpService().registerAuthRoutes(router);

    app.route('/api', router);

    return server;
};
