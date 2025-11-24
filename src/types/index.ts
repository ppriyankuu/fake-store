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

export interface ApiProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface CartItem extends Product {
    quantity: number;
}