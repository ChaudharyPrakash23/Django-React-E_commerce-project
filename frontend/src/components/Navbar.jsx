import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CardContext";
import { clearTokens, getAccessToken } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = !!getAccessToken();
  const handleLogout = () => {
    clearTokens();
    navigate("/login");
  };
  return (
    <nav className="bg-white shadow-medium px-6 py-4 flex justify-between items-center w-full top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-grey-800">
        🛒My cart
      </Link>
      <div className="flex items-center gap-6">
        {/* login/signup and logout */}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="text-gray-800 hover:text-gray-600 font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-gray-800 hover:text-gray-600 font-medium"
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-gray-800 hover:text-gray-600 font-medium"
          >
            Logout
          </button>
        )}
      </div>
      <Link
        to="/cart"
        className="relative text-grey-800 hover:text-grey-600 font-medium"
      >
        🛒Cart{" "}
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
