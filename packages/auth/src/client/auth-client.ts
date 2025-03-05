import {
    emailOTPClient,
    jwtClient,
    magicLinkClient,
    organizationClient,
    usernameClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

import Config from '@workspace/utils/config/client';

export const authClient = createAuthClient({
    baseURL: Config.serverUrl,
    plugins: [magicLinkClient(), emailOTPClient(), organizationClient(), usernameClient(), jwtClient()],
    fetchOptions: {
        // baseURL: Config.serverUrl,
        onError: (ctx) => {
            console.log('Error message', ctx.error.message, ctx.error.cause);
        },
    },
});
