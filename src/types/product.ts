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
    page?: string;
    limit?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    sortBy?: 'price-asc' | 'price-desc' | 'rating' | 'title';
    search?: string;
}

export interface ProductsResponse {
    products: Product[]
    total: number
    hasMore: boolean
}
