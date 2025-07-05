export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'title';
    search?: string;
}

export interface ProductsResponse {
    products: Product[]
    total: number
    hasMore: boolean
}
