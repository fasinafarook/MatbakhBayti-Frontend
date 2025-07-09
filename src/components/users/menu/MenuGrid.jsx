"use client"
import { motion } from "framer-motion"
import { ChefHat, ArrowRight, Award, Star } from "lucide-react"
import { menuItems } from "../../../constants/menuItem"
import MenuCard from "../menu/MenuCard" 

const MenuHomeSection = () => {
  const handleViewFullMenu = () => {
    window.location.href = "/menu"
  }

  return (
    <section className="py-16 px-6 md:px-20 bg-black text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-6 py-2 mb-4"
        >
          <ChefHat className="w-5 h-5 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">Featured Dishes</span>
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
          Our <span className="text-yellow-400">Signature</span> Menu
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover our most loved dishes crafted with authentic recipes and fresh ingredients
        </p>
      </motion.div>

      {/* ✅ Render the imported MenuCard component */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {menuItems.map((item, index) => (
          <MenuCard key={item.id} item={item} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <ChefHat className="w-6 h-6 text-black" />
              </motion.div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white">Craving for More?</h3>
                <p className="text-gray-400 text-sm">Explore our complete menu with 50+ dishes</p>
              </div>
            </div>

            <motion.button
              onClick={handleViewFullMenu}
              whileHover={{ scale: 1.05, rotateX: -5, z: 20 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-8 rounded-2xl transition-all duration-300 flex items-center space-x-3"
              style={{
                boxShadow: "0 15px 35px rgba(255, 193, 7, 0.3)",
                transformStyle: "preserve-3d",
              }}
            >
              <span className="text-lg">View Full Menu</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center space-x-6 text-sm text-gray-400 pt-2">
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>50+ Dishes</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span>4.8 Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default MenuHomeSection
