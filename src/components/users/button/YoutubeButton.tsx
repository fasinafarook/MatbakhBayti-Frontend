import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react"; 

const YouTubeButton = ({ text = "Watch Our Story", link = "https://www.youtube.com/@matbakhbayti3569" }) => {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: -5,
        z: 20,
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative bg-transparent border-2 border-white text-white font-bold py-4 px-8 rounded-2xl overflow-hidden transition-all duration-300 hover:border-yellow-400 hover:text-yellow-400"
      style={{
        boxShadow: "0 15px 35px rgba(255,255,255,0.1), 0 5px 15px rgba(0,0,0,0.1)",
        transformStyle: "preserve-3d",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Hover background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Button Content */}
      <div className="relative flex items-center space-x-2 z-10">
        <Play className="w-5 h-5 fill-current" />
        <span>{text}</span>
      </div>

      {/* 3D Shadow */}
      <div className="absolute inset-0 bg-white/10 rounded-2xl -z-10 transform translate-y-2 group-hover:translate-y-1 transition-transform duration-300"></div>
    </motion.a>
  );
};

export default YouTubeButton;
