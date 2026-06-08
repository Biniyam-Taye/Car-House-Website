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
          { value: "100+", label: "Premium Vehicles", color: "group-hover:text-blue-500", gradient: "from-blue-500 to-cyan-400", shadow: "group-hover:shadow-blue-500/20", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg> },
          { value: "50+", label: "City Locations", color: "group-hover:text-indigo-500", gradient: "from-indigo-500 to-purple-500", shadow: "group-hover:shadow-indigo-500/20", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
          { value: "10K+", label: "Happy Customers", color: "group-hover:text-fuchsia-500", gradient: "from-fuchsia-500 to-pink-500", shadow: "group-hover:shadow-fuchsia-500/20", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
          { value: "4.9/5", label: "Average Rating", color: "group-hover:text-emerald-500", gradient: "from-emerald-500 to-teal-400", shadow: "group-hover:shadow-emerald-500/20", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg> },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className={`relative flex flex-col items-center justify-center gap-2 py-5 px-4 rounded-[1.5rem] bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl ${stat.shadow} hover:-translate-y-1.5 cursor-pointer group overflow-hidden transition-all duration-500`}
          >
            {/* Hover Sweep */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 bg-gradient-to-br ${stat.gradient}`}></div>
            
            {/* Animated glowing border line on top */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r ${stat.gradient} group-hover:w-full transition-all duration-500 ease-out`}></div>
            
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 text-gray-400 group-hover:scale-110 group-hover:bg-white group-hover:shadow-sm transition-all duration-500 z-10`}>
                <span className={`transition-colors duration-500 ${stat.color}`}>
                  {stat.icon}
                </span>
            </div>

            <span className={`text-2xl md:text-3xl font-black text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${stat.gradient} transition-all duration-300 z-10 tracking-tight`}>
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs text-gray-400 group-hover:text-gray-600 font-bold tracking-widest uppercase z-10 transition-colors duration-300">{stat.label}</span>
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
        <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 text-blue-600 text-[11px] font-extrabold uppercase tracking-widest rounded-full mb-4">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"/></svg>
          Handpicked Fleet
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
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { navigate("/cars"); scrollTo(0, 0); }}
          className="btn-shimmer btn-lift-glow flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full cursor-pointer shadow-md transition-all duration-300"
        >
          Explore All Cars
          <img src={assets.arrow_icon} alt="arrow" className="brightness-300 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { navigate("/cars"); scrollTo(0, 0); }}
          className="btn-border-trace flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 font-semibold rounded-full cursor-pointer border-2 border-gray-200 hover:text-blue-600 transition-all duration-300"
        >
          View Pricing
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedSection;

