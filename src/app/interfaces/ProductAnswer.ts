import { Product } from "./Product";

export interface ProductAnswer {
    products: Product[];
    total: number;
    skip: number | null;
    limit: number
}