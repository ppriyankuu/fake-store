import { useProductStore } from "../store/useProductStore";
import type { Product } from "../types";

export default function ProductsCard({ product }: { product: Product }) {
    const addToCart = useProductStore((state) => state.addToCart);

    return (
        <div className="flex flex-col h-full bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0 mb-3">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain mx-auto"
                    loading="lazy"
                />
            </div>
            <div className="flex-grow">
                <h3 className="font-semibold text-base mb-1 line-clamp-1">{product.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg text-gray-900">${product.price.toFixed(2)}</span>
                    <span className="text-gray-500 text-sm whitespace-nowrap">★ {product.rating.rate}</span>
                </div>
            </div>
            <button
                onClick={() => addToCart(product)}
                className="w-full py-2 px-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label={`Add ${product.title} to cart`}
            >
                Add to Cart
            </button>
        </div>
    );
}