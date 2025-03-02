export enum EmailClient {
    Resend = 'resend',
    Sendgrid = 'sendgrid',
    Brevo = 'brevo',
    Nodemailer = 'nodemailer',
}

export enum EmailTypes {
    WelcomeEmail = 'welcome-email',
    VerifyEmail = 'verify-email',
    VerifyEmailOtp = 'verify-email-otp',
    ForgotPassword = 'forgot-password',
    ForgotPasswordOtp = 'forgot-password-otp',
    SignInOtp = 'sign-in-otp',
    MagicLink = 'magic-link',
}

export interface EmailAdapter {
    emailService: EmailClientService;
}

export interface EmailServiceStore {
    getEmailAdapter: (client?: EmailClient) => EmailAdapter;
}

export type EmailUser = { name?: string; email: string };

export interface SendEmailParams {
    from: string | EmailUser;
    subject?: string;
    to: string | string[] | EmailUser | EmailUser[];
    reply_to?: string | EmailUser;
    send_at?: number;
    delivery_time?: string;
    tags?: string[];
    html?: string;
}

export interface EmailService {
    send<T extends EmailTypes>(
        emailType: T,
        emailTypeParams: EmailTypeParams[T],
        params: SendEmailParams,
        client?: EmailClient
    ): Promise<void>;
}

export interface EmailClientService {
    send(params: SendEmailParams): Promise<void>;
}

export interface ForgotPasswordEmailProps {
    url: string;
    expiry: string;
}

export interface ForgotPasswordOtpEmailProps {
    otp: string;
    otpExpiry: string;
}

export interface VerifyEmailOtpProps {
    otp: string;
    otpExpiry: string;
}

export interface WelcomeEmailProps {
    url: string;
}

export interface VerifyEmailProps {
    url: string;
}

export interface SignInOtpEmailProps {
    otp: string;
    otpExpiry: string;
}

export interface MagicLinkProps {
    link: string;
}

export interface EmailTypeParams {
    [EmailTypes.WelcomeEmail]: WelcomeEmailProps;
    [EmailTypes.VerifyEmail]: VerifyEmailProps;
    [EmailTypes.VerifyEmailOtp]: VerifyEmailOtpProps;
    [EmailTypes.ForgotPassword]: ForgotPasswordEmailProps;
    [EmailTypes.SignInOtp]: SignInOtpEmailProps;
    [EmailTypes.MagicLink]: MagicLinkProps;
}
