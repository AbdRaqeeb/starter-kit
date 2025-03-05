'use client';

import { ReactNode, useEffect, useState } from 'react';

import Loading from './loading';

interface ClientOnlyProps {
    children: ReactNode;
    fallback?: ReactNode;
}

/**
 * ClientOnly component ensures that the wrapped content only renders on the client side.
 * This helps prevent hydration errors by avoiding server-side rendering of components
 * that might have client/server differences.
 */
export function ClientOnly({ children, fallback }: ClientOnlyProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return fallback || <Loading />;
    }

    return <>{children}</>;
}
