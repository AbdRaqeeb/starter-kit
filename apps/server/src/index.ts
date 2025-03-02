import Config from '@workspace/utils/config';
import { PROJECT_NAME } from '@workspace/utils/constants';
import logger from '@workspace/utils/logger';

import { createNewServer } from './api';

export default {
    port: Config.port,
    fetch: createNewServer().app.fetch,
};

if (Config.nodeEnv === 'development') {
    logger.info(`${PROJECT_NAME} server is LIVE ⚡️🔥 at port ${Config.port}`);
}

process.on('uncaughtException', (err: Error) => {
    logger.fatal(err, '[UncaughtException] - Shutting down server...');
    process.exit(1);
});

process.on('unhandledRejection', (err: Error) => {
    logger.fatal(err, '[UnhandledRejection] - Shutting down server...');
    process.exit(1);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
    logger.info('[SIGTERM] SIGTERM signal received, shutting down...');
    process.exit(0);
});

process.on('SIGINT', () => {
    logger.info('[SIGINT] SIGINT signal received, shutting down...');
    process.exit(0);
});
