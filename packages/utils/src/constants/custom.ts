export const DEFAULT_SIZE = 20;
export const SALT_VALUE = 10;
export const PASSWORD_REGEX = '^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\\d]){1,})(?=(.*[\\W]){1,})(?!.*\\s).{8,}$';
export const NO_REPLY = 'no-reply@varteqar.com';
export const REPLY_TO = 'reply-to@varteqar.com';
export const FROM_UPDATE = 'RemindMe <no-reply@updates.varteqar.com>';
export const FROM_BASE = 'RemindMe <no-reply@varteqar.com>';
export const FROM_UPDATE_EMAIL = 'no-reply@updates.varteqar.com';
export const FROM_BASE_EMAIL = 'no-reply@varteqar.com';
export const FROM_NAME = 'Varteqar';
export const COMPANY_ADDRESS = '123, Garki Expressway, Abuja, Nigeria';

export const OTP_EXPIRY = {
    minutes: {
        sixty: {
            value: 60 * 60 * 1000,
            unit: 'minutes',
            display: '60',
        },
    },
};
