import { redirect } from 'next/navigation';

import { PATH_AUTH } from '@/routes';

export default function HomePage() {
    return redirect(PATH_AUTH.login.magic);
}
