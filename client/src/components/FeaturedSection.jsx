import React, { useState } from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const categories = ["All", "Sedan", "SUV", "Luxury", "Electric", "Sports"];

const FeaturedSection = () => {
  const navigate = useNavigate();
  const { cars } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCars = activeCategory === "All"
    ? cars.slice(0, 6)
    : cars.filter(c => c.category === activeCategory).slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center pt-8 pb-16 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { value: "100+", label: "Premium Vehicles", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
          { value: "50+", label: "City Locations", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
          { value: "10K+", label: "Happy Customers", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
          { value: "4.9★", label: "Average Rating", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`flex flex-col items-center gap-1 py-5 px-4 rounded-2xl ${stat.bg} border ${stat.border} cursor-default transition-all duration-300 shadow-sm hover:shadow-md`}
          >
            <span className={`text-2xl md:text-3xl font-extrabold ${stat.color}`}>{stat.value}</span>
            <span className="text-xs md:text-sm text-gray-500 font-medium text-center">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-2"
      >
        <span className="inline-block px-4 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 text-[11px] font-extrabold uppercase tracking-widest rounded-full mb-4">
          🚗 Handpicked Fleet
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-3">
          Featured{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Vehicles
          </span>
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
          Explore our selection of premium vehicles available for your next adventure. Every car is fully insured and serviced.
        </p>
      </motion.div>

      {/* Category Filter Pills */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-2 mt-6 mb-10"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-250 cursor-pointer
              ${activeCategory === cat
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-md scale-105"
                : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
              }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Cars Grid */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
      >
        {(filteredCars.length > 0 ? filteredCars : cars.slice(0, 6)).map((car, i) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 * i, ease: "easeOut" }}
            key={car._id}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-14"
      >
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { navigate("/cars"); scrollTo(0, 0); }}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
        >
          Explore All Cars
          <img src={assets.arrow_icon} alt="arrow" className="brightness-300 w-4 h-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { navigate("/cars"); scrollTo(0, 0); }}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-full cursor-pointer border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600 transition-all duration-300"
        >
          View Pricing
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedSection;

