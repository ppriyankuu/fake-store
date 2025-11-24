import { useProductStore } from "../store/useProductStore";
import type { Product } from "../types";

export default function ProductsCard({ product }: { product: Product }) {
    const addToCart = useProductStore((state) => state.addToCart);

    return (
        <div className="border rounded p-4 shadow-sm hover:shadow-md transition">
            <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain mb-3"
            />
            <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
            <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 text-sm">★ {product.rating.rate}</span>
            </div>
            <button
                onClick={() => addToCart(product)}
                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Add to Cart
            </button>
        </div>
    );
}