import {Product} from "@/src/types/product";

export interface Cart extends Product {
    quantity: number;
}