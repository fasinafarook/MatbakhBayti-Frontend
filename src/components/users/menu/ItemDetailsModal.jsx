import { motion } from "framer-motion";
import { Clock, X, Leaf, Fish } from "lucide-react";
import { handleAddToCart } from "../utils/userAddToCart";
import { useDispatch, useSelector } from "react-redux";

const ItemDetailsModal = ({ item, onClose, openAuthModal }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth?.user);

  const handleAdd = () => {
    if (!user) {
      openAuthModal(); 
      return;
    }

    handleAddToCart(item, 1, dispatch, () => {}, cartItems, onClose);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-black border border-yellow-400 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white">{item.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <div className="space-y-4">
          <p className="text-gray-300">{item.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{item.preparationTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              {item.type === "Veg" ? (
                <Leaf className="w-4 h-4 text-green-400" />
              ) : (
                <Fish className="w-4 h-4 text-red-400" />
              )}
              <span className="text-gray-300">{item.type}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-700">
            <div className="text-2xl font-bold text-yellow-400">
              ₹{item.price}
            </div>
            <button
              onClick={handleAdd}
              className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-2 font-semibold rounded-lg transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ItemDetailsModal;
