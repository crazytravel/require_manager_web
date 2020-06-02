export interface Role {
    id: number,
    name: string,
    description: string
}

export interface UserRole {
    id: number;
    user_id: number;
    role_id: number;
}