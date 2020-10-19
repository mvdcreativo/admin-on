import { Product } from '../../products/interfaces/product';

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    ico?: string;
    color?: string;
    created_at?: Date;
    updated_at?: Date;
    deleted_at?: any;
    courses?: Product[];
}

