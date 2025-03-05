import { customAlphabet } from 'nanoid';

export function generateId(len = 15) {
    return customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', len)();
}

export function generateOtp() {
    return customAlphabet('1234567890', 6)();
}

export function generateRandomString(options: { length: number } = { length: 10 }) {
    return customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', options.length)();
}
