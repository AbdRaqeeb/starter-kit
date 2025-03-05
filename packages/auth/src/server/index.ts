import { betterAuth } from 'better-auth';
import { bearer, emailOTP, jwt, magicLink, openAPI, username } from 'better-auth/plugins';
import { Pool } from 'pg';

import { redis } from '@workspace/database/redis';
import Config from '@workspace/utils/config';
import {
    OTP_EXPIRY,
    PROJECT_COOKIE_PREFIX,
    PROJECT_NAME,
    PROJECT_SESSION_TOKEN_NAME,
} from '@workspace/utils/constants';

import { NODE_ENV } from '@workspace/utils/types';
import { betterAuthEmails } from './email';
import { hooks } from './hooks';
import { schema } from './schema';

const isProd = Config.nodeEnv === NODE_ENV.PRODUCTION;

// @ts-ignore
export const auth = betterAuth({
    appName: PROJECT_NAME,
    database: new Pool({ connectionString: Config.databaseUrl }),
    secret: Config.betterAuthSecret,
    trustedOrigins: Config.trustedOrigins,
    emailAndPassword: {
        enabled: true,
        sendResetPassword: betterAuthEmails.sendResetPasswordEmail,
        resetPasswordTokenExpiresIn: OTP_EXPIRY.minutes.sixty.value,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: betterAuthEmails.sendVerificationEmail,
    },
    socialProviders: {
        google: {
            clientId: Config.google.client_id,
            clientSecret: Config.google.client_secret,
            redirectURI: `${Config.clientUrl}/api/auth/callback/google`,
            mapProfileToUser: (profile) => {
                return {
                    firstName: profile.given_name,
                    lastName: profile.family_name,
                };
            },
            display: 'popup',
        },
        github: {
            clientId: Config.github.client_id,
            clientSecret: Config.github.client_secret,
        },
    },
    advanced: {
        cookiePrefix: PROJECT_COOKIE_PREFIX,
        cookies: { session_token: { name: PROJECT_SESSION_TOKEN_NAME } },
        crossSubDomainCookies: isProd ? { enabled: true, domain: Config.baseDomain } : { enabled: false },
        useSecureCookies: isProd,
    },
    secondaryStorage: {
        get: async (key) => {
            const value = await redis.get(key);
            return value ? value : null;
        },
        set: async (key, value, ttl) => {
            if (ttl) {
                await redis.set(key, value, 'EX', ttl);
                return;
            }

            await redis.set(key, value);
        },
        delete: async (key) => {
            await redis.del(key);
        },
    },
    user: { ...schema.user, deleteUser: { enabled: true } },
    session: {
        ...schema.session,
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    verification: { ...schema.verification },
    account: { ...schema.account },
    jwks: { ...schema.jwks },
    databaseHooks: { user: { ...hooks.user() } },
    plugins: [
        emailOTP({
            otpLength: 6,
            expiresIn: OTP_EXPIRY.minutes.sixty.value,
            sendVerificationOnSignUp: true,
            disableSignUp: true,
            sendVerificationOTP: betterAuthEmails.sendVerificationOTP,
        }),
        username({
            minUsernameLength: 3,
            usernameValidator: (username) => {
                if (username === 'admin') return false;
            },
        }),
        openAPI(),
        jwt(),
        bearer(),
        magicLink({
            expiresIn: OTP_EXPIRY.minutes.sixty.value,
            sendMagicLink: betterAuthEmails.sendMagicLinkEmail,
        }),
    ],
});
