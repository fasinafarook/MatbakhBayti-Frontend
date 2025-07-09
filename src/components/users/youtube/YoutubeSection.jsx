"use client"
import { motion } from "framer-motion"
import { Play, Eye, ThumbsUp, Clock, ArrowRight, Youtube, ChefHat, Zap, Award, Users } from "lucide-react"
import { featuredVideos } from "../../../constants/videoData"
import YouTubeButton from "../button/YoutubeButton"



const YouTubeSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Cinematic 3D Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 3D Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,193,7,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,193,7,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              transform: "perspective(1000px) rotateX(60deg) translateZ(-100px)",
            }}
          />
        </div>

        {/* Floating 3D Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.sin(i) * 50, 0],
              rotateZ: [0, 360],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translateZ(${Math.random() * 100}px)`,
            }}
          />
        ))}

        {/* 3D Light Beams */}
        <motion.div
          animate={{
            rotateZ: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-0 left-1/2 w-96 h-96 bg-gradient-conic from-yellow-400/5 via-transparent to-yellow-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20">
        {/* Cinematic Header */}
        <motion.div
          initial={{ opacity: 0, y: 100, rotateX: 30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* 3D Logo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0, rotateY: 180 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{
              rotateY: 15,
              rotateX: -10,
              scale: 1.1,
              z: 50,
            }}
            className="inline-block mb-8"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-yellow-500 p-1 rounded-2xl">
              <div className="bg-black rounded-2xl px-8 py-4 flex items-center space-x-4">
                <Youtube className="w-8 h-8 text-red-500" />
                <div className="text-left">
                  <div className="text-yellow-400 font-bold text-lg">MATBAKH BAYTI</div>
                  <div className="text-gray-400 text-sm">CULINARY STUDIO</div>
                </div>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Award className="w-5 h-5" />
                  <span className="font-bold">500K+</span>
                </div>
              </div>
              {/* 3D Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-2xl blur-xl -z-10 transform scale-110"></div>
            </div>
          </motion.div>

          {/* Cinematic Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <motion.h2
              className="text-6xl md:text-8xl font-black tracking-wider mb-4"
              style={{
                background: "linear-gradient(45deg, #ffffff, #fbbf24, #ffffff)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                textShadow: "0 0 100px rgba(255,193,7,0.5)",
              }}
            >
              KITCHEN
            </motion.h2>
            <motion.h3
              animate={{
                rotateX: [0, 5, 0],
                z: [0, 20, 0],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="text-3xl md:text-5xl font-light text-gray-300 tracking-[0.3em]"
              style={{ transformStyle: "preserve-3d" }}
            >
              CHRONICLES
            </motion.h3>
          </motion.div>

          {/* Cinematic Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-12 mb-8"
          >
            {[
              { icon: Users, number: "500K+", label: "SUBSCRIBERS" },
              { icon: Play, number: "50+", label: "EPISODES" },
              { icon: Award, number: "4.9", label: "RATING" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{
                  rotateY: 15,
                  z: 30,
                  scale: 1.1,
                }}
                className="text-center group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative">
                  <stat.icon className="w-8 h-8 text-yellow-400 mx-auto mb-2 group-hover:text-white transition-colors" />
                  <div className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-500 font-semibold tracking-wider">{stat.label}</div>
                  {/* 3D Glow */}
                  <div className="absolute inset-0 bg-yellow-400/10 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Cinematic Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Immerse yourself in the art of authentic cooking. Each episode is a journey through flavors, techniques, and
            traditions passed down through generations.
          </motion.p>
        </motion.div>

        {/* 3D Video Showcase */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Featured Video - Large */}
          <motion.div
            initial={{ opacity: 0, x: -100, rotateY: 30 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{
              rotateY: -10,
              rotateX: 5,
              z: 50,
              scale: 1.02,
            }}
            className="lg:col-span-2 group relative bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl overflow-hidden border border-yellow-400/20"
            style={{
              boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 100px rgba(255,193,7,0.1)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Video Container */}
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${featuredVideos[0].embed}`}
                title={featuredVideos[0].title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute bottom-6 left-6 right-6">
                  <motion.div
                    whileHover={{ z: 20 }}
                    className="flex items-center justify-between"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {featuredVideos[0].category}
                      </div>
                      <div className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        {featuredVideos[0].difficulty}
                      </div>
                    </div>
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">{featuredVideos[0].duration}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {featuredVideos[0].title}
                </h3>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{featuredVideos[0].views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{featuredVideos[0].likes}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-lg">{featuredVideos[0].description}</p>
            </div>

            {/* 3D Shadow */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent rounded-3xl -z-10 transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
          </motion.div>

          {/* Side Videos */}
          <div className="space-y-6">
            {featuredVideos.slice(1).map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, x: 100, rotateY: -30 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{
                  rotateY: 10,
                  rotateX: -5,
                  z: 30,
                  scale: 1.05,
                }}
                className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl overflow-hidden border border-gray-700/30 hover:border-yellow-400/30 transition-all duration-300"
                style={{
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.embed}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-yellow-400/20 text-yellow-400 text-xs font-bold px-2 py-1 rounded">
                      {video.category}
                    </span>
                    <span className="text-gray-500 text-xs">{video.duration}</span>
                  </div>
                  <h4 className="text-white font-bold group-hover:text-yellow-400 transition-colors">{video.title}</h4>
                  <p className="text-gray-400 text-sm mt-1">{video.description}</p>
                </div>

                {/* 3D Shadow */}
                <div className="absolute inset-0 bg-black/20 rounded-2xl -z-10 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cinematic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.div
            whileHover={{
              rotateX: -5,
              z: 30,
              scale: 1.02,
            }}
            className="inline-flex items-center space-x-8 bg-gradient-to-r from-black via-gray-900 to-black border border-yellow-400/30 rounded-3xl p-8 backdrop-blur-sm"
            style={{
              boxShadow: "0 30px 60px rgba(0,0,0,0.4), 0 0 100px rgba(255,193,7,0.1)",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="flex items-center space-x-4">
              <motion.div
                animate={{
                  rotateY: [0, 360],
                  z: [0, 20, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
                className="w-20 h-20 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-full flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                <ChefHat className="w-10 h-10 text-black" />
              </motion.div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-1">Ready to cooking with Us?</h3>
                <p className="text-gray-400">Join our culinary journey and unlock kitchen secrets</p>
              </div>
            </div>

            <div className="flex space-x-4">
                          <YouTubeButton text="Visit Our Channel" link="https://youtube.com/yourchannel" />

            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default YouTubeSection
