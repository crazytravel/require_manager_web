
export interface Session {
    id: string;
    logged_in: boolean;
    username: string;
    nickname?: string;
    phone?: string;
    email?: string;
    given_name?: string;
    family_name?: string;
    roles: string[];
    authorities?: string[];
}


export interface InternalUser {
    nickname?: string;
    username: string;
    roles: string[];
    phone?: string;
    email?: string;
    active: boolean;
    given_name: string;
    family_name: string;
}
