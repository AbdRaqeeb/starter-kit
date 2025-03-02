'use client';

import { Loader2 } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

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
        return (
            fallback || (
                <div className='w-full flex items-center justify-center py-8'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary' />
                </div>
            )
        );
    }

    return <>{children}</>;
}
