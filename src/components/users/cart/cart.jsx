import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCart, clearCart } from "../../../redux/slices/cartAuthSlice";
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const backendCart = await fetchUserCart();
        const formattedItems = backendCart.items.map((item) => {
          if (!item.product || !item.product.price) {
            throw new Error("Invalid product data received");
          }
          return {
            id: item.product._id,
            name: item.product.name,
            price: Number(item.product.price) || 0,
            quantity: Number(item.quantity) || 1,
            image: item.product.image,
          };
        });
        dispatch(setCart(formattedItems));
      } catch (err) {
        console.error("Failed to load cart", err);
        setError("Failed to load cart. Please try again later.");
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
        price: Number(item.product.price) || 0,
        quantity: Number(item.quantity) || 1,
        image: item.product.image,
      }));
      dispatch(setCart(formattedItems));
    } catch (err) {
      console.error("Quantity update failed", err);
      Swal.fire("Error", "Failed to update quantity", "error");
    }
  };

  const handleRemove = async (id) => {
    try {
      const updatedCart = await removeCartItem(id);
      const formattedItems = updatedCart.items.map((item) => ({
        id: item.product._id,
        name: item.product.name,
        price: Number(item.product.price) || 0,
        quantity: Number(item.quantity) || 1,
        image: item.product.image,
      }));
      dispatch(setCart(formattedItems));
    } catch (err) {
      console.error("Remove failed", err);
      Swal.fire("Error", "Failed to remove item", "error");
    }
  };

  const handleClearCart = async () => {
    try {
      await clearUserCart();
      dispatch(clearCart());
      Swal.fire("Cart cleared", "", "success");
    } catch (err) {
      console.error("Clear cart failed", err);
      Swal.fire("Error", "Failed to clear cart", "error");
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return acc + price * quantity;
  }, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-700 border-t-yellow-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-xl font-semibold mt-4 text-white">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center bg-black p-4">
        <div className="max-w-md p-8 rounded-xl glass-effect border border-gray-800">
          <h2 className="text-3xl font-semibold mb-4 text-white">Error Loading Cart</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center text-center bg-black p-4">
        <div className="max-w-md p-8 rounded-xl glass-effect border border-gray-800">
          <h2 className="text-3xl font-semibold mb-4 text-white">Your Cart is Empty</h2>
          <p className="text-gray-300 mb-6">Looks like you haven't added anything to your cart yet</p>
          <Link 
            to="/menu" 
            className="inline-block px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition duration-300"
          >
            Browse Our Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
    style={{
        backgroundImage:
          'url("https://img.freepik.com/premium-photo/black-table-with-black-background-with-bowl-cheese-vegetables_1223760-774.jpg")',
      }}>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">Your Cart</h1>

        {/* Main Content - Split Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Cart Items */}
          <div className="lg:w-2/3">
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-yellow-500">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Subtotal
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {cartItems.map((item) => {
                    const price = Number(item?.price) || 0;
                    const quantity = Number(item?.quantity) || 0;
                    const subtotal = price * quantity;

                    return (
                      <tr key={item.id} className="hover:bg-gray-900/50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16">
                              <img 
                                className="h-16 w-16 rounded-md object-cover border border-gray-700" 
                                src={item.image || '/placeholder-product.jpg'} 
                                alt={item.name || 'Product'} 
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {item.name || 'Unknown Product'}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">₹{price.toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center border border-gray-600 rounded-md w-24 bg-black/50">
                            <button
                              onClick={() => handleQuantityUpdate(item.id, quantity - 1)}
                              className="px-2 py-1 text-white hover:bg-yellow-500/20"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-2 py-1 text-center flex-grow text-white">{quantity}</span>
                            <button
                              onClick={() => handleQuantityUpdate(item.id, quantity + 1)}
                              className="px-2 py-1 text-white hover:bg-yellow-500/20"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            ₹{subtotal.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {cartItems.map((item) => {
                const price = Number(item?.price) || 0;
                const quantity = Number(item?.quantity) || 0;
                const subtotal = price * quantity;

                return (
                  <div key={item.id} className="glass-effect p-4 rounded-lg border border-gray-700">
                    <div className="flex items-start gap-4">
                      <img 
                        className="w-20 h-20 rounded-md object-cover border border-gray-600" 
                        src={item.image || '/placeholder-product.jpg'} 
                        alt={item.name || 'Product'} 
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{item.name || 'Unknown Product'}</h3>
                        <p className="text-yellow-500 mt-1">₹{price.toFixed(2)}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-gray-600 rounded-md bg-black/50">
                            <button
                              onClick={() => handleQuantityUpdate(item.id, quantity - 1)}
                              className="px-2 py-1 text-white hover:bg-yellow-500/20"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-3 py-1 text-center text-white">{quantity}</span>
                            <button
                              onClick={() => handleQuantityUpdate(item.id, quantity + 1)}
                              className="px-2 py-1 text-white hover:bg-yellow-500/20"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="text-red-500 hover:text-red-400 ml-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <div className="mt-2 text-right">
                          <p className="text-white text-sm">Subtotal: <span className="font-medium">₹{subtotal.toFixed(2)}</span></p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Order Summary and Actions */}
          <div className="lg:w-1/3">
            <div className="glass-effect p-6 rounded-lg border border-gray-700 backdrop-blur-sm sticky top-4">
              <h3 className="text-lg font-medium text-white mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="font-medium text-white">₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-300">Shipping</span>
                  <span className="font-medium text-white">Free</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="text-lg font-bold text-yellow-500">₹{totalAmount.toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout">
                <button className="w-full mt-6 bg-yellow-500 hover:bg-yellow-600 text-black py-3 px-4 rounded-md font-medium transition duration-300">
                  Proceed to Checkout
                </button>
              </Link>
              
              
            </div>
            <div>
              <button
                onClick={handleClearCart}
                className="flex items-center justify-center gap-2 w-full mt-4 border border-red-500 text-red-500 hover:bg-red-500/10 py-3 px-4 rounded-md font-medium transition duration-300"
              >
                <Trash2 size={18} />
                Clear Cart
              </button>
              
              <Link 
                to="/menu" 
                className="flex items-center justify-center gap-2 w-full mt-4 border border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 py-3 px-4 rounded-md font-medium transition duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add this to your global CSS or in a style tag */}
      <style jsx>{`
        .glass-effect {
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default CartPage;