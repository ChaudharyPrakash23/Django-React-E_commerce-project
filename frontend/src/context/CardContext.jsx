import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken } from "../utils/auth";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // fetch cart form backend

  const fetchCart = async () => {
    try {
      const res = await authFetch(`${BASEURL}/api/cart/`);
      if (!res.ok) {
        throw new Error("failed to fetch cart");
      }
      const data = await res.json();
      setCartItems(data.items || []);
      setTotal(data.total || 0);
    } catch (error) {
      console.error("Error fetching cart", error);
    }
  };
  useEffect(() => {
    if (getAccessToken()) {
      fetchCart();
    }
  }, []);

  // Add Product to cart
  // ...existing code...

  const addToCart = async (product) => {
    try {
      const productId = product?.id ?? product?.pk ?? product?.product_id;

      if (!productId) {
        throw new Error("Product ID is missing");
      }

      const response = await authFetch(`${BASEURL}/api/cart/add/`, {
        method: "POST",
        body: JSON.stringify({
          product_id: Number(productId),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Add cart failed: ${response.status} ${JSON.stringify(data)}`,
        );
      }

      await fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Remove product from cart
  const removeFromCart = async (itemId) => {
    try {
      await authFetch(`${BASEURL}/api/cart/remove/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ item_id: itemId }),
      });
      fetchCart();
    } catch (error) {
      console.log("Error removing cart", error);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(itemId);
      return;
    }
    try {
      await authFetch(`${BASEURL}/api/cart/update/`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ item_id: itemId, quantity }),
      });
      fetchCart();
    } catch (error) {
      console.log("error updating cart", error);
    }
  };
  const clearCart = () => {
    (setCartItems([]), setTotal(0));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        total,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
