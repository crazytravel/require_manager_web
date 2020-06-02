export interface Authority {
    id: number,
    name: string,
    description: string
}

export interface RoleAuthority {
    id: number,
    role_id: number,
    authority_id: number,
}