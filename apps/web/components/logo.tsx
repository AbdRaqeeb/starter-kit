'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import { memo } from 'react';

import { cn } from '@workspace/ui/lib/utils';

interface LogoProps {
    className?: string;
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    [key: string]: unknown;
}

function Logo({ className, size = 24, ...props }: LogoProps) {
    const { theme, resolvedTheme } = useTheme();
    const dimensions = typeof size === 'number' ? size : 24;

    const { absoluteStrokeWidth, ref, stroke, fill, ...divProps } = props;

    // Use resolvedTheme which handles 'system' preference by returning the actual theme ('dark' or 'light')
    const actualTheme = resolvedTheme || 'light';

    return (
        <div
            className={cn('relative', className)}
            style={{
                width: dimensions,
                height: dimensions,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            {...divProps}
        >
            <Image
                src={`/images/logos/${actualTheme === 'dark' ? 'light' : 'dark'}-logo.svg`}
                alt='Logo'
                className='hidden dark:block'
                fill
                priority
            />
            <Image src='/images/logos/dark-logo.svg' alt='Logo' className='block dark:hidden' fill priority />
        </div>
    );
}

export default memo(Logo);
