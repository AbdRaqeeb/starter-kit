'use client';

import Logo from '@/components/logo';
import { AudioWaveform, GalleryVerticalEnd, Layout } from 'lucide-react';

import { PATH } from '@/routes';
import { type SidebarData } from '@/types/nav';

export const sidebarData: SidebarData = {
    user: {
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        avatar: '/avatars/shadcn.jpg',
    },
    teams: [
        {
            name: 'Remind Me',
            logo: Logo,
            plan: 'Pro',
        },
        {
            name: 'Acme Inc',
            logo: GalleryVerticalEnd,
            plan: 'Enterprise',
        },
        {
            name: 'Acme Corp.',
            logo: AudioWaveform,
            plan: 'Startup',
        },
    ],
    navGroups: [
        {
            title: 'General',
            items: [
                {
                    title: 'Dashboard',
                    url: PATH.dashboard,
                    icon: Layout,
                },
            ],
        },
    ],
};
