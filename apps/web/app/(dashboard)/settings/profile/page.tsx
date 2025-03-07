import { ProfileSettings } from '@/sections';

export const metadata = {
    title: 'Settings Profile',
    meta: [
        { name: 'description', content: 'Settings Profile Page' },
        { property: 'og:title', content: 'Settings Profile' },
        { property: 'og:description', content: 'Settings Profile Page' },
    ],
};

export default function SettingsProfile() {
    return <ProfileSettings />;
}
