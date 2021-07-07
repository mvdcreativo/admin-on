import { Status } from 'src/app/shared/interfaces/status';
import { User } from '../../accounts/interfaces/account';
import { Product } from '../../products/interfaces/product';

export interface Order {
    id?:number;
    address_one: string;
    email: string;
    last_name:string;
    n_doc_iden: string;
    name: string;
    phone_one: string;
    products: ProductOrder[];
    type_doc_iden: string;
    status_mp?:string;
    payment_metod_mp?:string;
    order_status_mp?:string;
    user_id:number;
    user?: User;
    courses?: Product[];
    created_at?: any;
    updated_at?: any;
    payment_status_slug?: string;
    status_id?: number;
    status?:Status;
    cuotas?:number;
    amount_cuota?:any;
}


export interface ProductOrder {
    product_id:number;
    order_id?:number
    quantity:number;
    currency_id:number;
    price:number;
}