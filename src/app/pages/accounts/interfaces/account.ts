export interface Account {
    user_id: number;
    bio: string;
    certificated: string;
    rating_up: number;
    rating_down: number;
    n_identification: string;
    phone_one: string;
    phone_two?: any;
    address_one: string;
    address_two?: any;
    image: string;
    role_id: number;
    birth: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
    user: User;
    role: Role;
    n_doc_iden: any;
    type_doc_iden: any;
}


export interface User {
    id: number;
    name: string;
    last_name: string;
    password: string;
    slug: string;
    email: string;
    email_verified_at: Date;
    account?: Account;
    created_at: Date;
    updated_at: Date;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    updated_at: Date;
    deleted_at?: any;
}

