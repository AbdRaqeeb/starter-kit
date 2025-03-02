import { ClientConfig } from '../types';

const getClientConfig = (): ClientConfig => {
    return {
        publicAppUrl: process.env.PUBLIC_APP_URL || 'https://client.example.com',
        serverUrl: process.env.SERVER_URL || 'https://server.example.com',
    };
};

export default getClientConfig();
