import { useProductStore } from "../store/useProductStore";

export default function CartSidebar() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useProductStore();

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => (sum + item.price) * item.quantity, 0);

    if (cart.length == 0) {
        return (
            <div className="bg-white p-4 rounded shadow">
                <h2 className="font-bold text-lg mb-2">🛒 Cart</h2>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center mb-3">
                <h2 className="font-bold text-lg">🛒 Cart ({totalItems})</h2>
                <button
                    onClick={clearCart}
                    className="text-sm text-red-500 hover:underline"
                >
                    Clear
                </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 border-b pb-3">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-12 h-12 object-contain"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium line-clamp-1">{item.title}</p>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                            <div className="flex items-center mt-1">
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-6 h-6 flex items-center justify-center border rounded"
                                >
                                    -
                                </button>
                                <span className="mx-2">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-6 h-6 flex items-center justify-center border rounded"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="ml-3 text-red-500 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4 pt-3 border-t font-bold">
                Total: ${totalPrice.toFixed(2)}
            </div>
        </div>
    )
}