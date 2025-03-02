import '@workspace/ui/styles/globals.css';
import { AuthHeader } from '@/components/auth-header';
import { APP_NAME } from '@workspace/utils/constants';

export default function AuthRootLayout({
    children,
}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="flex flex-col min-h-screen bg-background overflow-y-auto overflow-x-hidden">
            <AuthHeader appName={APP_NAME} />
            <main className="flex-1 flex justify-center items-center pt-6 pb-16 px-4 mx-auto max-w-7xl">
                {children}
            </main>
        </div>
    );
}
