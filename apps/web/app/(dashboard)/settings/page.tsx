import { PATH } from '@/routes';
import { redirect } from 'next/navigation';

export default function SettingsPage() {
    return redirect(PATH.settings.profile);
}
