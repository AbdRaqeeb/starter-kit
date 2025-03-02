import { MagicLogin } from '@/sections';

export const metadata = {
    title: 'Login with Magic Link',
    description: 'Password-less login with secure magic links sent to your email.',
};

export default function MagicLoginPage() {
    return <MagicLogin />;
}
