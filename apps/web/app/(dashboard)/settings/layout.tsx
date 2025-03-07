'use client';

import { Bell, Globe, Palette, Settings, User } from 'lucide-react';

import { Main } from '@/layouts/main';
import { PATH } from '@/routes';
import { Separator } from '@workspace/ui/components/separator';
import SidebarNav from './components/sidebar-nav';

export default function SettingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Main fixed>
            <div className='space-y-0.5'>
                <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>Settings</h1>
                <p className='text-muted-foreground'>Manage your account settings and set e-mail preferences.</p>
            </div>
            <Separator className='my-4 lg:my-6' />
            <div className='flex flex-1 flex-col space-y-2 md:space-y-2 overflow-hidden lg:flex-row lg:space-x-12 lg:space-y-0'>
                <aside className='top-0 lg:sticky lg:w-1/5'>
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className='flex w-full p-1 pr-4 overflow-y-hidden'>{children}</div>
            </div>
        </Main>
    );
}

const sidebarNavItems = [
    {
        title: 'Profile',
        icon: <User size={18} />,
        href: PATH.settings.profile,
    },
    {
        title: 'Account',
        icon: <Settings size={18} />,
        href: PATH.settings.account,
    },
    {
        title: 'Appearance',
        icon: <Palette size={18} />,
        href: PATH.settings.appearance,
    },
    {
        title: 'Notifications',
        icon: <Bell size={18} />,
        href: PATH.settings.notifications,
    },
    {
        title: 'Display',
        icon: <Globe size={18} />,
        href: PATH.settings.display,
    },
];
