import React from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaYoutube,
  FaInstagram,
  FaTruck,
  FaCalendarCheck,
} from "react-icons/fa";

const aboutCards = [
  {
    title: "👩‍🍳 Homemade With Love",
    desc: "Crafted with heart and heritage, our dishes carry the flavors of tradition and care.",
    image:
      "/assets/about1.avif",
  },
  {
    title: "📹 Stories on YouTube",
    desc: "Explore authentic recipes and culinary stories that inspire home cooking and togetherness.",
    image:
      "/assets/about2.jpg",
  },
  {
    title: "🌿 Rooted in Culture",
    desc: "Preserving generational food wisdom, one plate at a time — this is our mission.",
    image:
      "/assets/about3.webp",
  },
];

// Contact info with custom background + animation delay
const contactDetails = [
  {
    icon: <FaPhoneAlt />,
    label: "Phone",
    value: "+91 98765 43210",
    from: "from-yellow-400",
    to: "to-orange-500",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Matbakh Bayti, Kochi, Kerala",
    from: "from-pink-500",
    to: "to-red-400",
  },
  {
    icon: <FaCalendarCheck />,
    label: "Online Booking",
    value: "Available 24/7",
    from: "from-green-400",
    to: "to-teal-500",
  },
  {
    icon: <FaTruck />,
    label: "Delivery",
    value: "Home delivery available",
    from: "from-purple-500",
    to: "to-indigo-500",
  },
  {
    icon: <FaYoutube />,
    label: "YouTube",
    value: (
      <a
        href="https://www.youtube.com/@matbakhbayti3569"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white"
      >
        @matbakhbayti3569
      </a>
    ),
    from: "from-red-500",
    to: "to-yellow-500",
  },
  {
    icon: <FaInstagram />,
    label: "Instagram",
    value: (
      <a
        href="https://www.instagram.com/matbakhbayti"
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-white"
      >
        @matbakhbayti
      </a>
    ),
    from: "from-pink-400",
    to: "to-yellow-300",
  },
];

const AboutUs = () => {
  return (
    <section className="py-28 px-6 md:px-20 bg-black text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-yellow-400">
          Who We Are
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-xl mx-auto font-serif">
          Matbakh Bayti is more than just food — it’s a journey through culture,
          home flavors, and heartfelt storytelling.
        </p>
      </motion.div>

      {/* About Cards */}
      <div className="grid gap-10 md:grid-cols-3 mb-24">
        {aboutCards.map((card, index) => (
          <motion.div
            key={index}
            className="bg-[#1f1f1f] border border-yellow-900/30 rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {card.image && (
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
                loading="lazy"
              />
            )}
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm">{card.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
