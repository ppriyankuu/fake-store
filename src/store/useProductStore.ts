import { create } from "zustand";
import type { CartItem, Product } from "../types";
import { fetchAllProducts, fetchCategories } from "../api/fakestore";

interface ProductStore {
    // products and filters
    products: Product[];
    filteredProducts: Product[];
    categories: string[];
    searchTerm: string;
    selectedCategory: string;
    loading: boolean;
    error: string | null;

    // pagination
    currentPage: number;
    itemsPerPage: number;

    // cart
    cart: CartItem[];

    // actions
    fetchProductsAndCategories: () => Promise<void>;
    setSearchTerm: (term: string) => void;
    setSelectedCategory: (category: string) => void;
    setCurrentPage: (page: number) => void;

    applyFilters: () => void;
    resetFilters: () => void;

    // cart actions
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    filteredProducts: [],
    categories: [],
    searchTerm: '',
    selectedCategory: '',
    loading: false,
    error: null,
    currentPage: 1,
    itemsPerPage: 10,
    cart: [],

    fetchProductsAndCategories: async () => {
        set({ loading: true, error: null });
        try {
            const [products, categories] = await Promise.all([
                fetchAllProducts(),
                fetchCategories(),
            ]);
            set({
                products,
                filteredProducts: products,
                categories: ['All', ...categories],
                selectedCategory: 'All',
            });
        } catch (err) {
            set({ error: (err as Error).message || 'Failed to load data' });
        } finally {
            set({ loading: false });
        }
    },

    applyFilters: () => {
        const { products, searchTerm, selectedCategory } = get();
        let result = products;

        // Category filter
        if (selectedCategory && selectedCategory !== 'All') {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // Search filter
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(term) ||
                    p.category.toLowerCase().includes(term) ||
                    p.description.toLowerCase().includes(term)
            );
        }

        set({ filteredProducts: result, currentPage: 1 });
    },

    setSearchTerm: (term: string) => {
        set({ searchTerm: term }, false);
        get().applyFilters();
    },

    setSelectedCategory: (category: string) => {
        set({ selectedCategory: category }, false);
        get().applyFilters();
    },

    setCurrentPage: (page: number) => set({ currentPage: page }),

    resetFilters: () => {
        set({
            searchTerm: '',
            selectedCategory: 'All',
            currentPage: 1,
        });
        const { products } = get();
        set({ filteredProducts: products });
    },

    // Cart logic
    addToCart: (product: Product) => {
        set((state) => {
            const existing = state.cart.find((item) => item.id === product.id);
            if (existing) {
                return {
                    cart: state.cart.map((item) =>
                        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                    ),
                };
            } else {
                return { cart: [...state.cart, { ...product, quantity: 1 }] };
            }
        });
    },

    removeFromCart: (id: number) => {
        set((state) => ({
            cart: state.cart.filter((item) => item.id !== id),
        }));
    },

    updateQuantity: (id: number, quantity: number) => {
        if (quantity < 1) return;
        set((state) => ({
            cart: state.cart.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ),
        }));
    },

    clearCart: () => set({ cart: [] }),
}));