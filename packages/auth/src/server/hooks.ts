export const hooks = {
    user: () => ({
        create: {
            before: async (user) => {
                return {
                    data: {
                        ...user,
                        firstName: user?.name?.split(' ')[0] || '',
                        lastName: user?.name?.split(' ')[1] || '',
                    },
                };
            },
            after: async () => {
                // do something
            },
        },
    }),
};
