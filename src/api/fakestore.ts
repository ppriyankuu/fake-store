import type { ApiProductsResponse, Product } from "../types";

const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (
    page: number,
    limit: number = 10
): Promise<ApiProductsResponse> => {
    const skip = (page - 1) * limit;

    const resp = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
    const products: Product[] = await resp.json();

    const totalResp = await fetch(`${BASE_URL}/products`);
    const allProducts: Product[] = await totalResp.json();

    return {
        products,
        total: allProducts.length,
        skip,
        limit
    }
}

export const fetchAllProducts = async (): Promise<Product[]> => {
    const resp = await fetch(`${BASE_URL}/products`);
    if (!resp.ok) throw new Error('Failed to fetch products');
    return resp.json();
}

export const fetchCategories = async (): Promise<string[]> => {
    const resp = await fetch(`${BASE_URL}/products/categories`);
    return resp.json();
}