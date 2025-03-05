'use client';

import { cn } from '@workspace/ui/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    const { theme } = useTheme();

    return (
        <div className={cn('relative h-8 w-8', className)}>
            <Image
                src={`/images/logos/${theme === 'dark' ? 'light' : 'dark'}-logo.svg`}
                alt='Logo'
                className='hidden dark:block'
                fill
                priority
            />
            <Image src='/images/logos/dark-logo.svg' alt='Logo' className='block dark:hidden' fill priority />
        </div>
    );
}
