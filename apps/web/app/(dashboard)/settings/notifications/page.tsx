import { NotificationSettings } from '@/sections';

export const metadata = {
    title: 'Settings: Notifications',
    description: 'Manage and configure email and push notifications for your app.',
    meta: [{ name: 'robots', content: 'index, follow' }],
};

export default function SettingsNotifications() {
    return <NotificationSettings />;
}
