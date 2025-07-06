import {Product} from "@/src/types/product";

export interface CartItem extends Product {
    quantity: number;
}