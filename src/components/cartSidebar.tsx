import { useProductStore } from "../store/useProductStore";

export default function CartSidebar() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useProductStore();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // ✅ Fixed: totalPrice should accumulate (price * quantity), not multiply cumulatively
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="w-full max-w-md bg-white p-5 rounded-lg shadow-md">
                <h2 className="font-bold text-lg mb-3">🛒 Cart</h2>
                <p className="text-gray-500">Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-md bg-white p-5 rounded-lg shadow-md flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">🛒 Cart ({totalItems})</h2>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:underline focus:outline-none"
                    aria-label="Clear cart"
                >
                    Clear
                </button>
            </div>

            {/* Items List */}
            <div className="space-y-4 overflow-y-auto pr-1 max-h-[400px] flex-grow">
                {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-3 border-b border-gray-100 last:border-0">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-14 h-14 object-contain rounded shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</p>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                            <div className="flex items-center mt-2 gap-2">
                                <button
                                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md text-sm hover:bg-gray-50 focus:outline-none"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-2 text-red-500 text-sm font-medium hover:underline focus:outline-none"
                                    aria-label={`Remove ${item.title} from cart`}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total */}
            <div className="mt-5 pt-4 border-t border-gray-200 font-bold text-lg text-gray-900">
                Total: ${totalPrice.toFixed(2)}
            </div>
        </div>
    );
}