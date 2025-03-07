import { Loader2 } from 'lucide-react';

import '@workspace/ui/styles/globals.css';
import { AuthHeader } from '@/components/auth-header';
import { AuthWrapper } from '@/components/auth-wrapper';
import { ClientOnly } from '@/components/client-only';

export default function AuthRootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='flex flex-col min-h-screen bg-background overflow-y-auto overflow-x-hidden'>
            <AuthHeader />
            <main className='flex-1 flex justify-center items-center pt-6 pb-16 px-4 mx-auto max-w-7xl'>
                <ClientOnly
                    fallback={
                        <div className='w-full max-w-md h-[400px] flex items-center justify-center'>
                            <Loader2 className='h-8 w-8 animate-spin text-primary' />
                        </div>
                    }
                >
                    <AuthWrapper>{children}</AuthWrapper>
                </ClientOnly>
            </main>
        </div>
    );
}
