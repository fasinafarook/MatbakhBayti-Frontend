"use client";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import MenuCard from "../menu/MenuCard";
import { getMenuItems, getAllCategories } from "../../../api/user/userApi";
import { Search } from "lucide-react";
import ItemDetailsModal from "./ItemDetailsModal";
import AuthModal from "../authenticationModal/Modal";

const MainMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleOpenAuthModal = () => setShowAuthModal(true);
  const handleCloseAuthModal = () => setShowAuthModal(false);

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
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => (
                    <MenuCard
                      key={item._id}
                      item={item}
                      index={index}
                      setSelectedItem={setSelectedItem}
                      openAuthModal={handleOpenAuthModal}
                    />
                  ))
                ) : (
                  <p>No matching items found.</p>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {selectedItem && (
                <ItemDetailsModal
                  item={selectedItem}
                  onClose={() => setSelectedItem(null)}
                  openAuthModal={handleOpenAuthModal}
                />
              )}
            </AnimatePresence>
            {showAuthModal && <AuthModal closeModal={handleCloseAuthModal} />}

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
    </div>
  );
};

export default MainMenu;
