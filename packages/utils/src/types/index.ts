export enum NODE_ENV {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export interface Config {
    port: number;
    nodeEnv: NODE_ENV;
    databaseUrl: string;
    databaseSchemas: string[];
    liveTailSourceToken: string;
    jwtSecret: string;
    jwtExpiry: string;
    sendGridApiKey: string;
    brevoApiKey: string;
    resendApiKey: string;
    clientUrl: string;
    serverUrl: string;
    smtp: {
        host: string;
        port: number;
        secure: boolean;
        auth: {
            user: string;
            pass: string;
        };
    };
    google: {
        client_id: string;
        client_secret: string;
    };
    github: {
        client_id: string;
        client_secret: string;
    };
    trustedOrigins: string[];
    redisUrl: string;
    baseDomain: string;
    betterAuthSecret: string;
}

export interface ClientConfig {
    publicAppUrl: string;
    serverUrl: string;
}
