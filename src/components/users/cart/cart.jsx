import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCart,
  clearCart,
} from "../../../redux/slices/cartAuthSlice";
import {
  fetchUserCart,
  updateCartItemQuantity,
  removeCartItem,
  clearUserCart,
} from "../../../api/user/userApi";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Minus, Plus, Trash2 } from "lucide-react";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const backendCart = await fetchUserCart();
        const formattedItems = backendCart.items.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        }));
        dispatch(setCart(formattedItems));
      } catch (err) {
        console.error("Failed to load cart", err);
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, [dispatch]);

  const handleQuantityUpdate = async (id, newQty) => {
    if (newQty < 1) return;
    try {
      const updated = await updateCartItemQuantity(id, newQty);
      const formattedItems = updated.items.map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      }));
      dispatch(setCart(formattedItems));
    } catch (err) {
      console.error("Quantity update failed", err);
    }
  };

  const handleRemove = async (id) => {
    try {
      const updatedCart = await removeCartItem(id);
      const formattedItems = updatedCart.items.map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      }));
      dispatch(setCart(formattedItems));
    } catch (err) {
      console.error("Remove failed", err);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearUserCart();
      dispatch(clearCart());
      Swal.fire("Cart cleared", "", "success");
    } catch (err) {
      console.error("Clear cart failed", err);
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black text-white">
        <p className="text-xl font-semibold">Loading your cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center bg-black text-white">
        <h2 className="text-3xl font-semibold mb-4">Your Cart is Empty 🛒</h2>
        <Link to="/menu" className="text-yellow-500 hover:underline text-lg">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Your Cart</h1>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row justify-between items-center bg-gray-900 rounded-xl p-4 shadow-md border border-gray-700"
            >
              <div className="flex items-center gap-5 w-full md:w-2/3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 rounded object-cover border border-gray-700"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-400">₹{item.price}</p>
                </div>
              </div>

              <div className="flex items-center justify-end w-full md:w-1/3 mt-4 md:mt-0 gap-4">
                <div className="flex items-center border border-gray-600 rounded">
                  <button
                    onClick={() =>
                      handleQuantityUpdate(item.id, item.quantity - 1)
                    }
                    className="px-2 py-1 text-white hover:bg-gray-700"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityUpdate(item.id, item.quantity + 1)
                    }
                    className="px-2 py-1 text-white hover:bg-gray-700"
                  >
                    <Plus size={18} />
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <h2 className="text-2xl font-bold text-white">
            Total: ₹{" "}
            <span className="text-green-400">{totalAmount.toFixed(2)}</span>
          </h2>

          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={handleClearCart}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
            >
              Clear Cart
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
