import process from 'node:process';
import { Config, NODE_ENV } from '../types';

export const getConfig = (): Config => {
    const required: string[] = ['NODE_ENV'];

    if (!process.env.CI) {
        // Do not require this check in CI
        required.forEach((variable) => {
            if (!process.env[variable]) throw new Error(`${variable} env not set`);
        });
    }

    return {
        port: Number(process.env.PORT) || 6050,
        nodeEnv: (process.env.NODE_ENV as NODE_ENV) || NODE_ENV.DEVELOPMENT,
        databaseUrl: process.env.DATABASE_URL,
        databaseSchemas: process.env.DATABASE_SCHEMAS?.split(','),
        liveTailSourceToken: process.env.LIVE_TAIL_SOURCE_TOKEN || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        jwtSecret: process.env.JWT_SECRET || 'woohoo',
        jwtExpiry: process.env.JWT_EXPIRY || '2d',
        sendGridApiKey: process.env.SENDGRID_API_KEY || 'SG.xxxxxxxxxxxxxxxxx',
        brevoApiKey: process.env.BREVO_API_KEY || 'xxxxxxxxxxxxxxxxxx',
        resendApiKey: process.env.RESEND_API_KEY || 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        smtp: {
            host: process.env.SMTP_HOST || 'smtp.example.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === '1',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        },
        google: {
            client_id: process.env.GOOGLE_CLIENT_ID || 'xxxxxxxxxxxxxxxxxxx',
            client_secret: process.env.GOOGLE_CLIENT_SECRET || 'xxxxxxxxxxxxxxxxxxx',
        },
        github: {
            client_id: process.env.GITHUB_CLIENT_ID || 'xxxxxxxxxxxxxxxxxxx',
            client_secret: process.env.GITHUB_CLIENT_SECRET || 'xxxxxxxxxxxxxxxxxxx',
        },
        clientUrl: process.env.CLIENT_URL || 'https://client.example.com',
        serverUrl: process.env.SERVER_URL || 'https://server.example.com',
        trustedOrigins: process.env.TRUSTED_ORIGINS?.split(',') || [],
        redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
        baseDomain: process.env.BASE_DOMAIN || 'example.com',
        betterAuthSecret: process.env.BETTER_AUTH_SECRET || 'xxxxxxxxxxxxxxxxxxx',
    };
};
