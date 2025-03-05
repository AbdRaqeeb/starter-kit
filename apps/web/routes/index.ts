function path(root: string, path: string) {
    return `${root}${path}`;
}

export const ROOT_AUTH = '/auth';

export const PATH_AUTH = {
    login: {
        password: path(ROOT_AUTH, '/login/password'),
        magic: path(ROOT_AUTH, '/login/magic'),
    },
    register: path(ROOT_AUTH, '/register'),
    forgotPassword: path(ROOT_AUTH, '/forgot-password'),
    forgotPasswordSent: path(ROOT_AUTH, '/forgot-password/sent'),
    resetPassword: path(ROOT_AUTH, '/reset-password'),
    verifyEmail: path(ROOT_AUTH, '/verify-email'),
    verifyToken: path(ROOT_AUTH, '/verify-token'),
};

export const PATH = {
    root: '/',
    dashboard: '/dashboard',
};
