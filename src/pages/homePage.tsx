import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import SearchBar from "../components/searchBar";
import ProductsList from "../components/productsList";
import Pagination from "../components/pagination";
import CartSidebar from "../components/cartSidebar";

export default function HomePage() {
    const { loading, error, fetchProductsAndCategories } = useProductStore();

    useEffect(() => {
        fetchProductsAndCategories();
    }, [fetchProductsAndCategories])

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Fake Store</h1>

            <SearchBar />

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                    <div className="mb-4 text-sm text-gray-600">
                        Showing {useProductStore.getState().filteredProducts.length} products
                    </div>
                    <ProductsList />
                    <Pagination />
                </div>

                <div className="lg:w-80">
                    <CartSidebar />
                </div>
            </div>
        </div>
    )
}