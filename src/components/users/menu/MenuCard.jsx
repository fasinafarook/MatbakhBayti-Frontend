"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Plus,
  Minus,
  ShoppingCart,
  Clock,
  Eye,
  X,
  Leaf,
  Fish,
} from "lucide-react";
import { addItemToCart } from "../../../api/user/userApi";
import { setCart } from "../../../redux/slices/cartAuthSlice";
import Swal from "sweetalert2";

const MenuCard = ({ item, index }) => {
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = async (customItem = item, customQuantity = quantity) => {
    try {
      const updatedCart = await addItemToCart(customItem._id, customQuantity);
      const formattedItems = updatedCart.items.map((i) => ({
        id: i.product._id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      }));

      dispatch(setCart(formattedItems));

      Swal.fire({
        toast: true,
        icon: "success",
        title: `${customQuantity} × ${customItem.name} added to cart`,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        background: "#222",
        color: "#fff",
      });
    } catch (err) {
      console.error("Add to cart failed:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to add to cart",
        text: err?.response?.data?.message || "Something went wrong",
      });
    }
  };

  const isVeg = item.type === "Veg";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8, rotateX: -3, rotateY: 3, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-500"
      style={{
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
        {item.category.name}
      </div>

      <div className="relative overflow-hidden">
        <motion.img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        >
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-medium">{item.preparationTime}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* View Details Button */}
        <button
          onClick={() => setSelectedItem(item)}
          className="absolute top-3 left-3 w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Eye className="w-4 h-4 text-yellow-400" />
        </button>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">{item.name}</h3>
              <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-500" : "bg-red-500"}`} />
            </div>
<p className="text-sm text-gray-400 line-clamp-2">
              {item.description}
            </p>   
                   </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-yellow-400">₹{item.price}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-3 py-1">
            <motion.button onClick={decrement} className="w-6 h-6 flex items-center justify-center bg-gray-700 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
              <Minus className="w-3 h-3" />
            </motion.button>
            <span className="text-sm font-semibold min-w-[1.5rem] text-center">{quantity}</span>
            <motion.button onClick={increment} className="w-6 h-6 flex items-center justify-center bg-gray-700 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-colors">
              <Plus className="w-3 h-3" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleAddToCart()}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-4 py-2 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 flex items-center space-x-1 text-sm"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black border border-yellow-400 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-white">{selectedItem.name}</h3>
                <button onClick={() => setSelectedItem(null)} className="text-gray-400 hover:text-gray-300">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <img
                src={selectedItem.image || "/placeholder.svg"}
                alt={selectedItem.name}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="space-y-4">
                <p className="text-gray-300">{selectedItem.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{selectedItem.preparationTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedItem.type === "Veg" ? (
                      <Leaf className="w-4 h-4 text-green-400" />
                    ) : (
                      <Fish className="w-4 h-4 text-red-400" />
                    )}
                    <span className="text-gray-300">{selectedItem.type}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="text-2xl font-bold text-yellow-400">₹{selectedItem.price}</div>
                  <button
                    onClick={() => {
                      handleAddToCart(selectedItem, 1);
                      setSelectedItem(null);
                    }}
                    className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-2 font-semibold rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl -z-10 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
    </motion.div>
  );
};

export default MenuCard;
