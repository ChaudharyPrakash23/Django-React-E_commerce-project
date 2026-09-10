import { useCart } from "../context/CardContext";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="pt-20 min-h-screen bg-grey-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-grey-600">Your cart is empty</p>
      ) : (
        <div className="max-w-4xl mx-auto bg-white p=6 rounded-lg shadow-md">
          {cartItems.map((item) => (
            <div className="flex item-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold ">{item.name}</h2>
                <p className="text-grey-600 ">Rs:{item.price}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                {item.quantity}
                <button
                  className="bg-gray-300 px-3 py-1 rounded"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="border-t pt-4 mt-4 flex justify-between items-center ">
            <h2 className="text-xl font-bold">Total:</h2>
            <p className="text-xl font-semibold">Rs:{total.toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default CartPage;
