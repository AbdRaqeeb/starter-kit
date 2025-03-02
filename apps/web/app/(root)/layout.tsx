import { Header } from '@/components/header';
import { PROJECT_NAME } from '@workspace/utils/constants';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <Header appName={PROJECT_NAME} />
            <main className="flex-1">{children}</main>
        </div>
    );
} 