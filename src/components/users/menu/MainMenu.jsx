// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch } from "react-redux";
// import Swal from "sweetalert2";

// import { addItemToCart } from "../../../api/user/userApi";
// import { setCart } from "../../../redux/slices/cartAuthSlice";
// import {
//   Star,
//   Plus,
//   Minus,
//   ShoppingCart,
//   Clock,
//   Search,
//   ChefHat,
//   X,
//   Leaf,
//   Fish,
//   Eye,
// } from "lucide-react";

// import { getMenuItems, getAllCategories } from "../../../api/user/userApi";

// const MainMenu = () => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const [menuItems, setMenuItems] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [productsRes, categoriesRes] = await Promise.all([
//           getMenuItems(),
//           getAllCategories(),
//         ]);

//         setMenuItems(productsRes.data.data);
//         setCategories([
//           { name: "All", count: productsRes.data.data.length },
//           ...categoriesRes.data.data.map((cat) => ({
//             name: cat.name,
//             count: productsRes.data.data.filter(
//               (p) => p.category.name === cat.name
//             ).length,
//           })),
//         ]);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Filter items
//   const filteredItems = menuItems.filter((item) => {
//     const matchesCategory =
//       selectedCategory === "All" || item.category?.name === selectedCategory;
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   return (
//     <div className="min-h-screen bg-black">
//       {/* Simple Header */}
//       <header className="sticky top-0 z-40 bg-black border-b border-yellow-400">
//         <div className="max-w-7xl mx-auto px-6 py-4">
//           <div className="flex items-center justify-between">
//             {/* Brand */}
//             <div className="flex items-center space-x-3"></div>
//           </div>
//         </div>
//       </header>

//       <div className="max-w-7xl mx-auto px-6 py-8 bg-black min-h-screen">
//         {/* Search */}
//         <div className="mb-8">
//           <div className="relative max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search dishes..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-10 w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none rounded-lg px-3 py-2"
//             />
//           </div>
//         </div>

//         <div className="grid lg:grid-cols-4 gap-8">
//           {/* Categories Sidebar */}
//           <div className="lg:col-span-1">
//             <div className="sticky top-32">
//               <h3 className="text-lg font-semibold text-white mb-4">
//                 Categories
//               </h3>
//               <div className="space-y-2">
//                 {categories.map((category) => (
//                   <button
//                     key={category.name}
//                     onClick={() => setSelectedCategory(category.name)}
//                     className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
//                       selectedCategory === category.name
//                         ? "bg-yellow-400 text-black font-semibold"
//                         : "text-gray-300 hover:bg-gray-800 border border-gray-700"
//                     }`}
//                   >
//                     <div className="flex items-center justify-between">
//                       <span className="font-medium">{category.name}</span>
//                       <span
//                         className={`text-sm ${
//                           selectedCategory === category.name
//                             ? "text-black"
//                             : "text-gray-500"
//                         }`}
//                       >
//                         {category.count}
//                       </span>
//                     </div>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Menu Items */}
//           <div className="lg:col-span-3">
//             <div className="mb-6">
//               <h2 className="text-2xl font-bold text-white">
//                 {selectedCategory === "All" ? "All Dishes" : selectedCategory}
//               </h2>
//               <p className="text-gray-400 mt-1">
//                 {filteredItems.length} items available
//               </p>
//             </div>

//             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               <AnimatePresence>
//                 {filteredItems.map((item, index) => (
//                   <SimpleMenuCard
//                     key={item._id}
//                     item={item}
//                     index={index}
//                     onAddToCart={async (item, quantity) => {
//                       try {
//                         const updatedCart = await addItemToCart(
//                           item._id,
//                           quantity
//                         );

//                         const formattedItems = updatedCart.items.map((i) => ({
//                           id: i.product._id,
//                           name: i.product.name,
//                           price: i.product.price,
//                           quantity: i.quantity,
//                           image: i.product.image,
//                         }));

//                         dispatch(setCart(formattedItems));

//                         Swal.fire({
//                           toast: true,
//                           icon: "success",
//                           title: `${quantity} × ${item.name} added to cart`,
//                           position: "top-end",
//                           showConfirmButton: false,
//                           timer: 1500,
//                           background: "#222",
//                           color: "#fff",
//                         });
//                       } catch (err) {
//                         console.error("Add to cart failed:", err);
//                         Swal.fire({
//                           icon: "error",
//                           title: "Failed to add to cart",
//                           text:
//                             err?.response?.data?.message ||
//                             "Something went wrong",
//                         });
//                       }
//                     }}
//                     onViewDetails={setSelectedItem}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>

//             {filteredItems.length === 0 && (
//               <div className="text-center py-12">
//                 <div className="text-gray-400 text-lg mb-4">
//                   No dishes found
//                 </div>
//                 <button
//                   onClick={() => {
//                     setSearchQuery("");
//                     setSelectedCategory("All");
//                   }}
//                   className="text-yellow-400 hover:text-yellow-300 font-medium"
//                 >
//                   Clear filters
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Item Details Modal */}
//       <AnimatePresence>
//         {selectedItem && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
//             onClick={() => setSelectedItem(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-black border border-yellow-400 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               <div className="flex justify-between items-start mb-4">
//                 <h3 className="text-2xl font-bold text-white">
//                   {selectedItem.name}
//                 </h3>
//                 <button
//                   onClick={() => setSelectedItem(null)}
//                   className="text-gray-400 hover:text-gray-300"
//                 >
//                   <X className="w-6 h-6" />
//                 </button>
//               </div>

//               <img
//                 src={selectedItem.image || "/placeholder.svg"}
//                 alt={selectedItem.name}
//                 className="w-full h-64 object-cover rounded-lg mb-4"
//               />

//               <div className="space-y-4">
//                 <p className="text-gray-300">{selectedItem.description}</p>

//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div className="flex items-center space-x-2">
//                     <Clock className="w-4 h-4 text-gray-400" />
//                     <span className="text-gray-300">
//                       {selectedItem.preparationTime}
//                     </span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     {selectedItem.type === "Veg" ? (
//                       <Leaf className="w-4 h-4 text-green-400" />
//                     ) : (
//                       <Fish className="w-4 h-4 text-red-400" />
//                     )}
//                     <span className="text-gray-300">{selectedItem.type}</span>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-gray-700">
//                   <div>
//                     <div className="text-2xl font-bold text-yellow-400">
//                       ₹{selectedItem.price}
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => {
//                       addItemToCart(selectedItem);
//                       setSelectedItem(null);
//                     }}
//                     className="bg-yellow-400 text-black hover:bg-yellow-500 px-6 py-2 font-semibold rounded-lg transition-colors"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// const SimpleMenuCard = ({ item, index, onAddToCart, onViewDetails }) => {
//   const [quantity, setQuantity] = useState(1);

//   const increment = () => setQuantity((q) => q + 1);
//   const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
//   const isVeg = item.type === "Veg";

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -20 }}
//       transition={{ duration: 0.3, delay: index * 0.1 }}
//       className="group bg-gray-900 border border-gray-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:border-yellow-400 transition-all duration-300"
//     >
//       {/* Popular Badge */}
//       {/* {item.isPopular && (
//         <div className="absolute top-3 left-3 z-10 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-full">
//           Popular
//         </div>
//       )} */}

//       {/* Discount Badge */}
//       {/* {item.discount > 0 && (
//         <div className="absolute top-3 right-3 z-10 bg-white text-black text-xs font-bold px-2 py-1 rounded-full">
//           {item.discount}% OFF
//         </div>
//       )} */}

//       {/* Image */}
//       <div className="relative overflow-hidden">
//         <img
//           src={item.image || "/placeholder.svg"}
//           alt={item.name}
//           className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//         />
//         <button
//           onClick={() => onViewDetails(item)}
//           className="absolute top-3 left-3 w-8 h-8 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//         >
//           <Eye className="w-4 h-4 text-yellow-400" />
//         </button>
//         <div className="absolute top-2 right-2 z-10 bg-red-500 text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
//           {item.category.name}
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4 space-y-3">
//         {/* Header */}
//         <div className="flex items-start justify-between">
//           <div className="flex-1">
//             <div className="flex items-center space-x-2 mb-1">
//               <h3 className="font-semibold text-white">{item.name}</h3>
//               <div
//                 className={`w-2 h-2 rounded-full ${
//                   isVeg ? "bg-green-500" : "bg-red-500"
//                 }`}
//               />
//             </div>
//             <p className="text-sm text-gray-400 line-clamp-2">
//               {item.description}
//             </p>
//           </div>
//         </div>

//         {/* Rating & Time */}
//         <div className="flex items-center justify-between text-sm">
//           <div className="flex items-center space-x-1 text-gray-400">
//             <Clock className="w-4 h-4" />
//             <span>{item.preparationTime}</span>
//           </div>
//         </div>

//         {/* Price */}
//         <div className="flex items-center space-x-2">
//           <span className="text-xl font-bold text-yellow-400">
//             ₹{item.price}
//           </span>
//         </div>

//         {/* Actions */}
//         <div className="flex items-center justify-between pt-3 border-t border-gray-700">
//           {/* Quantity */}
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={decrement}
//               className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:bg-gray-800 text-white"
//             >
//               <Minus className="w-4 h-4" />
//             </button>
//             <span className="w-8 text-center font-medium text-white">
//               {quantity}
//             </span>
//             <button
//               onClick={increment}
//               className="w-8 h-8 flex items-center justify-center border border-gray-600 rounded hover:bg-gray-800 text-white"
//             >
//               <Plus className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Add to Cart */}
//           <button
//             onClick={() => onAddToCart(item, quantity)}
//             className="bg-yellow-400 text-black px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors flex items-center space-x-2 font-semibold"
//           >
//             <ShoppingCart className="w-4 h-4" />
//             <span>Add</span>
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default MainMenu;
"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import MenuCard from "../menu/MenuCard";
import { addItemToCart, getMenuItems, getAllCategories } from "../../../api/user/userApi";
import { setCart } from "../../../redux/slices/cartAuthSlice";
import {
  Search,
  Clock,
  X,
  Leaf,
  Fish,
} from "lucide-react";

const MainMenu = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          getMenuItems(),
          getAllCategories(),
        ]);

        const allItems = productsRes.data.data;
        setMenuItems(allItems);
        setCategories([
          { name: "All", count: allItems.length },
          ...categoriesRes.data.data.map((cat) => ({
            name: cat.name,
            count: allItems.filter((p) => p.category.name === cat.name).length,
          })),
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category?.name === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = async (item, quantity = 1) => {
    try {
      const updatedCart = await addItemToCart(item._id, quantity);
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
        title: `${quantity} × ${item.name} added to cart`,
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

  return (
    <div className="min-h-screen bg-black">
      <header className="sticky top-0 z-40 bg-black border-b border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 py-4"></div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 bg-black min-h-screen">
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 focus:outline-none rounded-lg px-3 py-2"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <h3 className="text-lg font-semibold text-white mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.name
                        ? "bg-yellow-400 text-black font-semibold"
                        : "text-gray-300 hover:bg-gray-800 border border-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <span
                        className={`text-sm ${
                          selectedCategory === category.name
                            ? "text-black"
                            : "text-gray-500"
                        }`}
                      >
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white">
                {selectedCategory === "All" ? "All Dishes" : selectedCategory}
              </h2>
              <p className="text-gray-400 mt-1">
                {filteredItems.length} items available
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredItems.map((item, index) => (
                  <MenuCard
                    key={item._id}
                    item={item}
                    index={index}
                    onAddToCart={handleAddToCart}
                    onViewDetails={() => setSelectedItem(item)}
                  />
                ))}
              </AnimatePresence>
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No dishes found
                </div>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="text-yellow-400 hover:text-yellow-300 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
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
                <h3 className="text-2xl font-bold text-white">
                  {selectedItem.name}
                </h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-300"
                >
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
                    <span className="text-gray-300">
                      {selectedItem.preparationTime}
                    </span>
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
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">
                      ₹{selectedItem.price}
                    </div>
                  </div>
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
    </div>
  );
};

export default MainMenu;
