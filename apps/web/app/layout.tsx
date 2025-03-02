import { Geist, Geist_Mono } from 'next/font/google';

import '@workspace/ui/styles/globals.css';
import { CustomToaster } from '@/components/custom-toaster';
import { Providers } from '@/components/providers';
import { APP_NAME, APP_DESCRIPTION } from '@workspace/utils/constants';
import { createMetadata } from '@workspace/utils/metadata';

const fontSans = Geist({
    subsets: ['latin'],
    variable: '--font-sans',
});

const fontMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-mono',
});

export const metadata = createMetadata({
    title: {
        template: `%s | ${APP_NAME}`,
        default: APP_NAME,
    },
    description: APP_DESCRIPTION,
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}>
                <CustomToaster />
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
