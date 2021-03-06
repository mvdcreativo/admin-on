import { User as UserImport } from "src/app/pages/accounts/interfaces/account";
// export interface User {
//     id?: number;
//     name?: string;
//     lastname: any;
//     email: string;
//     password: string;
//     role: string;
//     email_verified_at?: any;
//     city:string;
//     neighborhood_id:number;
//     address: any;
//     discount?: any;
//     company?: any;
//     rut?: any;
//     ci?: any;
//     phone?: any;
//     created_at: string;
//     updated_at: string;
//     state: any;
//     id_cliente_cobrosya?:any;

// }
export interface User extends UserImport {}

export interface CurrentUser {
    token: string;
    token_type: string;
}
