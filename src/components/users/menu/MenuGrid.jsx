"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Plus, Minus, ShoppingCart, Clock, Award, ArrowRight, ChefHat } from "lucide-react"
import { featuredMenuItems } from "../../../constants/menuItem"


const MenuHomeSection = () => {
  const handleViewFullMenu = () => {
    // Navigate to menu page
    window.location.href = "/menu" // or use your router navigation
    // For Next.js: router.push('/menu')
  }

  return (
    <section className="py-16 px-6 md:px-20 bg-black text-white overflow-hidden">
      {/* Header */}
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

      {/* Featured Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {featuredMenuItems.map((item, index) => (
          <MenuCard key={item.id} item={item} index={index} />
        ))}
      </div>

      {/* View Full Menu CTA */}
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
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
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
              whileHover={{
                scale: 1.05,
                rotateX: -5,
                z: 20,
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-8 rounded-2xl transition-all duration-300 flex items-center space-x-3"
              style={{
                boxShadow: "0 15px 35px rgba(255, 193, 7, 0.3)",
                transformStyle: "preserve-3d",
              }}
            >
              <span className="text-lg">View Full Menu</span>
              <ArrowRight className="w-5 h-5" />
              {/* 3D Button Shadow */}
              <div className="absolute inset-0 bg-yellow-600 rounded-2xl -z-10 transform translate-y-2 group-hover:translate-y-1 transition-transform duration-300"></div>
            </motion.button>

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-gray-400 pt-2">
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4 text-yellow-400" />
                <span>50+ Dishes</span>
              </div>
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
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

const MenuCard = ({ item, index }) => {
  const [quantity, setQuantity] = useState(1)
  const [isHovered, setIsHovered] = useState(false)

  const increment = () => setQuantity((q) => q + 1)
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1))

  const handleAddToCart = () => {
    const total = (item.price - (item.price * item.discount) / 100) * quantity
    alert(`Added to cart: ${quantity} x ${item.name} = ₹${total.toFixed(2)}`)
  }

  const isVeg = item.type === "Veg"
  const discountedPrice = item.price - (item.price * item.discount) / 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        rotateX: -3,
        rotateY: 3,
        scale: 1.02,
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-yellow-400/50 transition-all duration-500"
      style={{
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Badges */}
      {item.isPopular && (
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
          🔥 Popular
        </div>
      )}

      {item.discount > 0 && (
        <div className="absolute top-3 right-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          {item.discount}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={item.img}
          alt={item.name}
          className="w-full h-48 object-cover"
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.6 }}
        />

        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        >
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                <Clock className="w-3 h-3" />
                <span className="text-xs font-medium">{item.cookTime}</span>
              </div>
              <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs font-medium">{item.rating}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors">
                {item.name}
              </h3>
              <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-green-500" : "bg-red-500"}`} />
            </div>
            <p className="text-gray-400 text-sm">{item.description}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${i < Math.floor(item.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}`}
            />
          ))}
          <span className="text-gray-400 text-xs ml-1">({item.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-xl font-bold text-yellow-400">₹{discountedPrice}</span>
          {item.discount > 0 && <span className="text-gray-500 line-through text-sm">₹{item.price}</span>}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/50">
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-full px-3 py-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={decrement}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
            >
              <Minus className="w-3 h-3" />
            </motion.button>
            <span className="text-sm font-semibold min-w-[1.5rem] text-center">{quantity}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={increment}
              className="w-6 h-6 flex items-center justify-center bg-gray-700 text-yellow-400 rounded-full hover:bg-yellow-400 hover:text-black transition-colors"
            >
              <Plus className="w-3 h-3" />
            </motion.button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-4 py-2 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 flex items-center space-x-1 text-sm"
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Add</span>
          </motion.button>
        </div>
      </div>

      {/* 3D Shadow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-2xl -z-10 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
    </motion.div>
  )
}

export default MenuHomeSection
