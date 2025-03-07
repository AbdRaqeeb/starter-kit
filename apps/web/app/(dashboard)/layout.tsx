import { Search } from '@/components/search';
import { ThemeToggle } from '@/components/theme-toggle';
import { Header } from '@/layouts/header';
import { ProfileDropdown } from '@/layouts/profile-dropdown';
import { cn } from '@workspace/ui/lib/utils';
import DashboardProviders from './providers';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardProviders>
            <div
                id='content'
                className={cn(
                    'max-w-full w-full ml-auto',
                    'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
                    'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
                    'transition-[width] ease-linear duration-200',
                    'h-svh flex flex-col',
                    'group-data-[scroll-locked=1]/body:h-full',
                    'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
                )}
            >
                <Header fixed>
                    <Search />
                    <div className='ml-auto flex items-center space-x-4'>
                        <ThemeToggle />
                        <ProfileDropdown />
                    </div>
                </Header>
                {children}
            </div>
        </DashboardProviders>
    );
}
