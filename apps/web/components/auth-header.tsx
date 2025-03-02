'use client';

import Link from 'next/link';
import * as React from 'react';
import { ThemeToggle } from './theme-toggle';

interface AuthHeaderProps {
    appName: string;
    logo?: React.ReactNode;
}

export function AuthHeader({ appName, logo }: AuthHeaderProps) {
    return (
        <header className='sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
            <div className='container flex h-14 items-center px-4 mx-auto max-w-7xl'>
                <div className='flex items-center gap-2 mr-4'>
                    {logo}
                    <Link href='/' className='font-semibold'>
                        {appName}
                    </Link>
                </div>

                <div className='flex flex-1 items-center justify-end'>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
