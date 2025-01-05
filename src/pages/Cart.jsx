import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, updateCartItemQuantity, removeCartItem } =
    useContext(CartContext);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button
            className="p-2 text-purple-600 hover:text-purple-800 transition-colors duration-200 flex items-center group"
            onClick={() => navigate(-1)}
          >
            <BiLeftArrowAlt className="text-2xl group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="ml-1 text-lg">Continue Shopping</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Shopping Cart
          </h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500 mb-8">Your cart is empty</p>
              <button
                onClick={() => navigate("/")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-colors duration-200"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center border-b border-gray-100 pb-6 last:border-0"
                  >
                    <div className="w-32 h-32 bg-gray-50 rounded-lg p-2 flex items-center justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 ml-6">
                      <h2 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.title}
                      </h2>
                      <p className="text-sm text-gray-500 capitalize mb-4">
                        {item.category}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <button
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity - 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors duration-200"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItemQuantity(item.id, item.quantity + 1)
                            }
                            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>

                        <p className="text-lg font-semibold text-purple-600">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        removeCartItem(item.id);
                        toast.success("Removed from cart");
                      }}
                      className="ml-6 p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      aria-label="Remove item"
                    >
                      <BsTrash className="text-xl" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg text-gray-600">Subtotal</span>
                  <span className="text-2xl font-bold text-gray-800">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Shipping and taxes calculated at checkout
                </p>
                <button className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-lg font-semibold transition-colors duration-200">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
