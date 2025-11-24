import { useProductStore } from "../store/useProductStore";
import ProductsCard from "./productsCard";

export default function ProductsList() {
    const { filteredProducts, currentPage, itemsPerPage } = useProductStore();

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    if (filteredProducts.length === 0)
        return <p className="text-center py-10">No products found.</p>

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentProducts.map((product) => (
                <ProductsCard key={product.id} product={product} />
            ))}
        </div>
    );
}