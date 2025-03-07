import Cookies from 'js-cookie';

import { CommandMenu } from '@/components/command-menu';
import AppSidebar from '@/layouts/app-sidebar';
import { SidebarProvider } from '@workspace/ui/components/sidebar';

export default function DashboardProviders({ children }: { children: React.ReactNode }) {
    const defaultOpen = Cookies.get('sidebar:state') !== 'false';

    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <main className='container py-6'>
                <CommandMenu />
                <AppSidebar />
                {children}
            </main>
        </SidebarProvider>
    );
}
