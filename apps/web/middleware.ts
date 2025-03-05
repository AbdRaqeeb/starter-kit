import { PATH, PATH_AUTH, ROOT_AUTH } from '@/routes';
import { type NextRequest, NextResponse } from 'next/server';

import { auth } from '@workspace/auth/client';

export default async function authMiddleware(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;

        const currentPath = new URL(request.url).pathname;

        const session = await auth.getSession({
            fetchOptions: {
                headers: {
                    cookie: request.headers.get('cookie') || '',
                },
            },
        });

        const { data, error } = session;

        // Always check authentication first
        if (error || !data) {
            const loginUrl = new URL(PATH_AUTH.login.magic, request.url);
            if (pathname !== (PATH_AUTH.login.magic || PATH_AUTH.login.password) && !pathname.startsWith(ROOT_AUTH)) {
                loginUrl.searchParams.set('redirectTo', pathname);
            }

            console.error('Error getting session:', error);
            return NextResponse.redirect(new URL(PATH_AUTH.login.magic, request.url));
        }

        if (pathname.startsWith(ROOT_AUTH)) {
            return NextResponse.redirect(new URL(PATH.dashboard, request.url));
        }

        if (currentPath === '/') {
            return NextResponse.redirect(new URL(PATH.dashboard, request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.log('MIDDLEWARE ERROR', error);
        return NextResponse.redirect(new URL(PATH_AUTH.login.magic, request.url));
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - auth (Auth routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - public asset folders
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|auth|_next/static|_next/image|icons|images|magic|logo|map|theme|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
