export interface User {
    id: string;
    first_name?: string;
    last_name?: string;
    full_name: string;
    username: string;
    email: string;
    email_verified: boolean;
    image?: string;
    created_at: Date;
    updatedAt?: Date;
}
