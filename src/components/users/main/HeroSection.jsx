"use client";
import { motion } from "framer-motion";
import { Play, Calendar, ChefHat, Star, ArrowRight } from "lucide-react";
import YouTubeButton from "../button/YoutubeButton";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      {/* 3D Background Layers */}
      <div className="absolute inset-0">
        {/* Background Image with Parallax Effect */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://png.pngtree.com/thumb_back/fh260/background/20240204/pngtree-food-composition-for-ramadan-with-space-on-right-image_15589018.png')",
            transform: "translateZ(0)",
          }}
        />

        {/* Gradient Overlays for 3D Depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30"></div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 right-32 w-24 h-24 bg-yellow-400/10 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex items-center min-h-screen px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - 3D Text and Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -100, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="space-y-8 perspective-1000"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Brand Badge */}
              {/* <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-2 backdrop-blur-sm"
                style={{ transform: "translateZ(20px)" }}
              >
                <ChefHat className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Matbakh Bayti</span>
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div> */}

              {/* 3D Heading */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="space-y-4"
                style={{ transform: "translateZ(40px)" }}
              >
<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-wide">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="block text-white drop-shadow-2xl"
                    style={{
                      textShadow:
                        "0 10px 30px rgba(0,0,0,0.5), 0 0 60px rgba(255,255,255,0.1)",
                      transform: "translateZ(10px)",
                    }}
                  >
                    Savor Every Bite
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="block text-yellow-400 drop-shadow-2xl"
                    style={{
                      textShadow:
                        "0 10px 30px rgba(255,193,7,0.3), 0 0 60px rgba(255,193,7,0.2)",
                      transform: "translateZ(20px)",
                    }}
                  >
                    From Our Kitchen
                  </motion.span>
                </h1>
              </motion.div>

              {/* 3D Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="text-gray-300 text-base  leading-relaxed font-serif max-w-xl"
                style={{
                  transform: "translateZ(30px)",
                  textShadow: "0 5px 15px rgba(0,0,0,0.3)",
                }}
              >
                Homemade dishes prepared with passion, rooted in tradition.
                Shared with love from our kitchen to your screen. From biryanis
                to dosa, every bite tells a story.
              </motion.p>

              {/* 3D Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-col sm:flex-row items-start gap-6 pt-4"
                style={{ transform: "translateZ(50px)" }}
              >
                {/* Book Table Button - 3D Effect */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    rotateX: -5,
                    rotateY: 5,
                    z: 20,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative bg-yellow-400 text-black font-bold py-4 px-8 rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    boxShadow:
                      "0 15px 35px rgba(255,193,7,0.3), 0 5px 15px rgba(0,0,0,0.1)",
                    transform: "translateZ(0)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                 <Link
      to="/menu"
      className="relative flex items-center space-x-2 group cursor-pointer"
    >
      <Calendar className="w-5 h-5" />
      <span>Book a Table</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </Link>
                  {/* 3D Shadow */}
                  <div className="absolute inset-0 bg-yellow-600 rounded-2xl -z-10 transform translate-y-2 group-hover:translate-y-1 transition-transform duration-300"></div>
                </motion.button>

                {/* YouTube Button - 3D Effect */}
                <YouTubeButton
                  text="Visit Our Channel"
                  link="https://youtube.com/yourchannel"
                />
              </motion.div>

              {/* Stats Cards - 3D */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className="flex space-x-6 pt-8"
                style={{ transform: "translateZ(60px)" }}
              >
                {[
                  { number: "500+", label: "Happy Customers" },
                  { number: "50+", label: "Dishes" },
                  { number: "4.9", label: "Rating" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      rotateY: 10,
                      z: 10,
                    }}
                    className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10"
                    style={{
                      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                      transform: "translateZ(0)",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="text-2xl font-bold text-yellow-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Content - 3D Food Card */}
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <motion.div
                whileHover={{
                  rotateY: -10,
                  rotateX: 5,
                  z: 30,
                }}
                className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
                style={{
                  boxShadow:
                    "0 25px 50px rgba(0,0,0,0.3), 0 0 100px rgba(255,193,7,0.1)",
                  transform: "translateZ(0)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                      <ChefHat className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Today's Special
                      </h3>
                      <p className="text-yellow-400">Authentic Biryani</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Preparation Time</span>
                      <span className="text-white font-semibold">45 mins</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Serves</span>
                      <span className="text-white font-semibold">
                        2-3 people
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Price</span>
                      <span className="text-yellow-400 font-bold text-xl">
                        ₹299
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-yellow-400 text-black font-bold py-3 rounded-xl hover:bg-yellow-300 transition-colors"
                  >
                    Order Now
                  </motion.button>
                </div>

                {/* 3D Shadow for card */}
                <div className="absolute inset-0 bg-black/20 rounded-3xl -z-10 transform translate-x-2 translate-y-2"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-yellow-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
