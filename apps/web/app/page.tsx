import { redirect } from 'next/navigation';

import { PATH } from '@/routes';

export default function HomePage() {
    return redirect(PATH.dashboard);
}
