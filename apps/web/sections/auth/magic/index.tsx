'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import Loading from '@/components/loading';
import { PATH, PATH_AUTH } from '@/routes';
import { auth } from '@workspace/auth/client';

export default function Magic() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Guard against server-side execution
        if (typeof window === 'undefined') return;

        const token = searchParams.get('token');
        if (!token) {
            router.push(PATH_AUTH.login.magic);
            return;
        }

        const verify = async () => {
            try {
                const { error } = await auth.magicLink.verify({ query: { token } });

                if (error) {
                    console.error('Error verifying token:', error);
                    router.push(PATH_AUTH.login.magic);
                    return;
                }

                router.push(PATH.dashboard);
            } catch (error) {
                console.error('Verification failed:', error);
                router.push(PATH_AUTH.login.magic);
            }
        };

        verify();
    }, [router, searchParams]);

    return <Loading />;
}
