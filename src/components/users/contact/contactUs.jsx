"use client"
import { motion } from "framer-motion"
import { Phone, MapPin, Clock, Mail, ChefHat, Utensils, Star, Truck } from "lucide-react"
import { contactInfo } from "../../../constants/contacts"

const ContactUs = () => {
  
  return (
<div
  className="relative bg-cover bg-center min-h-screen"
  style={{ backgroundImage: `url('https://img.freepik.com/free-photo/italian-food-with-ingredients_1220-4667.jpg?size=626&ext=jpg')` }}
>
  <div className="absolute inset-0 bg-black/80"></div> {/* Overlay */}
        {/* Header Section */}
          <div className="relative z-10 text-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex justify-center items-center mb-4">
              <ChefHat className="w-8 h-8 text-yellow-400 mr-3" />
              <span className="text-yellow-400 font-semibold text-lg">Matbakh Bayti</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
              Taste the <span className="text-yellow-400">Difference</span>
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto mb-8 font-serif">
              Experience authentic home-style cooking that brings families together. Contact us for reservations,
              catering, or just to share your love for great food!
            </p>

            {/* Rating */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-gray-300 ml-2">4.9/5 from 500+ happy customers</span>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`${item.bgColor} ${item.textColor} p-6 rounded-2xl border-2 border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-300 hover:scale-105`}
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div
                        className={`w-12 h-12 ${item.bgColor === "bg-black" ? "bg-yellow-400 text-black" : "bg-black text-yellow-400"} rounded-full flex items-center justify-center`}
                      >
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="font-semibold">{item.details}</p>
                      <p className="text-sm opacity-80">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Special Offers */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-6 rounded-2xl"
              >
                <h3 className="font-bold text-xl mb-3 flex items-center">
                  <Star className="w-6 h-6 mr-2" />
                  Today's Special Offer
                </h3>
                <p className="text-lg font-semibold mb-2">20% OFF on first online order!</p>
                <p className="text-sm">Use code: MATBAKH20 | Valid till midnight</p>
              </motion.div>

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="border border-yellow-400/30 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Follow Our Food Journey</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.youtube.com/@matbakhbayti3569"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <span className="text-sm font-medium">YouTube</span>
                  </a>
                  <a
                    href="https://www.instagram.com/matbakhbayti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-4 py-2 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447c0-1.297.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323c0 1.297-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.875-.385-.875-.875s.385-.875.875-.875s.875.385.875.875s-.385.875-.875.875zm-4.262 1.781c-1.518 0-2.747 1.229-2.747 2.747s1.229 2.747 2.747 2.747s2.747-1.229 2.747-2.747s-1.229-2.747-2.747-2.747z" />
                    </svg>
                    <span className="text-sm font-medium">Instagram</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 border-4 border-yellow-400">
                <h3 className="text-2xl font-bold text-black mb-2 flex items-center">
                  <Mail className="w-6 h-6 mr-2 text-black" />
                  Get in Touch
                </h3>
                <p className="text-gray-600 mb-6">
                  Ready to experience authentic flavors? Send us a message for reservations, catering inquiries, or just
                  to say hello!
                </p>

                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-black mb-2">First Name *</label>
                      <input
                        type="text"
                        placeholder="John"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black mb-2">Last Name *</label>
                      <input
                        type="text"
                        placeholder="Doe"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-black"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-black mb-2">Email Address *</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-black mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2">What can we help you with?</label>
                    <select className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-black">
                      <option>Table Reservation</option>
                      <option>Catering Services</option>
                      <option>Food Delivery Order</option>
                      <option>Special Event Booking</option>
                      <option>General Inquiry</option>
                      <option>Feedback & Reviews</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Your Message *</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your dining preferences, special requests, or any questions you have..."
                      className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 resize-none text-black"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-black hover:bg-gray-800 text-yellow-400 py-3 text-lg font-bold rounded-lg border-2 border-yellow-400 hover:border-yellow-300 transition-all duration-300 flex items-center justify-center"
                  >
                    <ChefHat className="w-5 h-5 mr-2" />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      {/* <section className="bg-yellow-400 text-black py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Utensils className="w-6 h-6" />
              <span className="font-bold text-lg">Ready to Order?</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="font-semibold">11 AM - 11 PM Daily</span>
              </div>
            </div>
            <button className="bg-black text-yellow-400 px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors">
              Order Now
            </button>
          </div>
        </div>
      </section> */}

      {/* Footer
      <footer className="bg-black border-t border-yellow-400/20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <ChefHat className="w-6 h-6 text-yellow-400 mr-2" />
              <span className="text-yellow-400 font-bold text-xl">Matbakh Bayti</span>
            </div>
            <p className="text-gray-400 mb-4">Authentic home-style cooking • Kochi, Kerala • Since 2020</p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <span>© 2024 Matbakh Bayti. All rights reserved.</span>
              <span>•</span>
              <span>Made with ❤️ for food lovers</span>
            </div>
          </div>
        </div>
      </footer> */}
      </div>
    </div>
    
  )
}

export default ContactUs
