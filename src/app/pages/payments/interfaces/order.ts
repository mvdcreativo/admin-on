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
}


export interface ProductOrder {
    product_id:number;
    order_id?:number
    quantity:number;
    currency_id:number;
    price:number;
}