import { APP_LOGO_FULL, APP_NAME } from '../constants';

export function createMetadata(override: Record<string, any>) {
    return {
        ...override,
        openGraph: {
            title: override.title ?? undefined,
            description: override.description ?? undefined,
            url: process.env.NEXT_PUBLIC_APP_URL,
            images: APP_LOGO_FULL,
            siteName: APP_NAME,
            ...override.openGraph,
        },
        twitter: {
            card: 'summary_large_image',
            title: override.title ?? undefined,
            description: override.description ?? undefined,
            images: APP_LOGO_FULL,
            ...override.twitter,
        },
        metadataBase: override.metadataBase ?? new URL(process.env.NEXT_PUBLIC_APP_URL),
    };
}
