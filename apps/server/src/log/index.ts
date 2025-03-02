import logger from '@workspace/utils/logger';
import { Context, Next } from 'hono';

export function logRequestMiddleware() {
    return function (context: Context, next: Next) {
        const requestId = context.get('requestId');

        logger.info(
            {
                route: context.req.path,
                url: context.req.url,
                body: context.get('body'),
                query: context.req.query(),
                params: context.req.param(),
                headers: context.req.header(),
                method: context.req.method,
            },
            requestId
        );
        return next();
    };
}

export default logger;
