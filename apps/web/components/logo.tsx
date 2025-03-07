'use client';

import { cn } from '@workspace/ui/lib/utils';
import { useTheme } from 'next-themes';
import Image from 'next/image';

interface LogoProps {
    className?: string;
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    [key: string]: any;
}

export default function Logo({ className, size = 24, ...props }: LogoProps) {
    const { theme } = useTheme();
    const dimensions = typeof size === 'number' ? size : 24;

    // Filter out SVG-specific props that shouldn't be passed to a div
    const { absoluteStrokeWidth, ref, stroke, fill, ...divProps } = props;

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
