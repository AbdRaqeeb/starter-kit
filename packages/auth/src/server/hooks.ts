export const hooks = {
    user: () => ({
        create: {
            before: async (user, _ctx) => {
                const [firstName, lastName] = user?.name?.split(' ') ?? [];
                const username = user?.email?.split('@')[0];
                return {
                    data: {
                        ...user,
                        username: user?.username ?? username,
                        first_name: firstName ?? '',
                        last_name: lastName ?? '',
                    },
                };
            },
            after: async () => {
                // do something
            },
        },
    }),
};
