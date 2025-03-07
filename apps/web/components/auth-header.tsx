'use client';

import Link from 'next/link';
import * as React from 'react';

import { PATH } from '@/routes';
import { ThemeToggle } from './theme-toggle';
import Logo from '@/components/logo';

export function AuthHeader() {
    return (
        <header
            className="sticky top-0 pt-3 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4 mx-auto max-w-7xl">
                <Link href={PATH.dashboard} className="font-semibold">
                    <div className="flex items-center gap-2 mr-4">
                        <Logo size={100} />
                    </div>
                </Link>

                <div className="flex flex-1 items-center justify-end">
                    <ThemeToggle/>
                </div>
            </div>
        </header>
    );
}
