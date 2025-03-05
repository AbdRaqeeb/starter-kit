import { EmailClient, EmailTypes, emailService } from '@workspace/email';
import Config from '@workspace/utils/config';
import { APP_NAME, FROM_BASE, FROM_UPDATE, FROM_UPDATE_EMAIL, OTP_EXPIRY } from '@workspace/utils/constants';

export type BetterAuthUser = {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
};

type SendVerificationOtp = {
    email: string;
    otp: string;
    type: 'sign-in' | 'email-verification' | 'forget-password';
};

type MagicLinkEmail = {
    email: string;
    url: string;
    token: string;
};

type SendVerificationEmail = {
    user: BetterAuthUser;
    url: string;
    token: string;
};

type ResetPasswordEmail = {
    user: BetterAuthUser;
    url: string;
    token: string;
};

export const betterAuthEmails = {
    sendVerificationOTP: async ({ email, otp, type }: SendVerificationOtp) => {
        if (type === 'email-verification') {
            await emailService.send(
                EmailTypes.VerifyEmailOtp,
                { otp, otpExpiry: `${OTP_EXPIRY.minutes.sixty.display} ${OTP_EXPIRY.minutes.sixty.unit}` },
                {
                    from: FROM_UPDATE_EMAIL,
                    to: email,
                    subject: 'Verify Email',
                },
                EmailClient.Resend
            );
            return;
        }

        if (type === 'forget-password') {
            await emailService.send(
                EmailTypes.ForgotPasswordOtp,
                { otp, otpExpiry: `${OTP_EXPIRY.minutes.sixty.display} ${OTP_EXPIRY.minutes.sixty.unit}` },
                {
                    from: FROM_BASE,
                    to: email,
                    subject: `Forgot Password?`,
                },
                EmailClient.Sendgrid
            );
            return;
        }

        if (type === 'sign-in') {
            await emailService.send(
                EmailTypes.SignInOtp,
                { otp, otpExpiry: `${OTP_EXPIRY.minutes.sixty.value} ${OTP_EXPIRY.minutes.sixty.unit}` },
                {
                    from: FROM_UPDATE,
                    to: email,
                    subject: `Sign In OTP`,
                },
                EmailClient.Resend
            );
            return;
        }
    },
    sendMagicLinkEmail: async ({ email, token }: MagicLinkEmail, request?: any) => {
        const url = new URL(request?.url || Config.clientUrl);
        const params = url.searchParams;
        const newUser = params.get('new_user');

        if (newUser === 'true') {
            await emailService.send(
                EmailTypes.WelcomeEmail,
                { url: `${Config.clientUrl}/magic?token=${token}` },
                { from: FROM_UPDATE_EMAIL, to: email, subject: `Welcome to ${APP_NAME}` },
                EmailClient.Resend
            );
            return;
        }

        await emailService.send(
            EmailTypes.MagicLink,
            { link: `${Config.clientUrl}/magic?token=${token}` },
            { from: FROM_UPDATE_EMAIL, to: email, subject: `Sign In To ${APP_NAME}` },
            EmailClient.Resend
        );
    },
    sendVerificationEmail: async ({ user, token }: SendVerificationEmail, _request?: Request) => {
        await emailService.send(
            EmailTypes.WelcomeEmail,
            { url: `${Config.clientUrl}/magic?token=${token}` },
            { from: FROM_UPDATE_EMAIL, to: user.email, subject: `Welcome to ${APP_NAME}` },
            EmailClient.Resend
        );

        await emailService.send(
            EmailTypes.VerifyEmail,
            { url: `${Config.clientUrl}/auth/verify?token=${token}` },
            {
                from: FROM_UPDATE_EMAIL,
                to: user.email,
                subject: `Verify Email`,
            },
            EmailClient.Resend
        );
    },
    sendResetPasswordEmail: async ({ token, user }: ResetPasswordEmail, _request?: Request) => {
        await emailService.send(
            EmailTypes.ForgotPassword,
            {
                url: `${Config.clientUrl}/auth/reset-password?token=${token}`,
                expiry: `${OTP_EXPIRY.minutes.sixty.display} ${OTP_EXPIRY.minutes.sixty.unit}`,
            },
            { from: FROM_UPDATE_EMAIL, to: user.email, subject: `Forgot Password?` },
            EmailClient.Resend
        );
    },
};
