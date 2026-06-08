import React from "react";
import { assets } from "../assets/assets";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row md:items-start items-center 
    justify-between px-8 min-md:pl-14 pt-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF]
    max-w-6xl mx-3 md:mx-auto rounded-2xl overflow-hidden"
    >
      <div className="text-white pb-10">
        <h2 className="text-3xl md:text-4xl font-black mb-3">Looking for your Dream Car?</h2>
        <p className="text-lg text-white/95 mb-1 font-medium">
          Browse our exclusive collection of premium vehicles.
        </p>
        <p className="max-w-130 text-white/80 leading-relaxed mb-6">
          We guarantee thorough verification, transparent pricing, and secure documentation so
          you can buy your next car completely hassle-free.
        </p>
        <motion.button
          onClick={() => {
            navigate('/cars');
            window.scrollTo(0, 0);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white hover:bg-slate-50 transition-all 
            text-blue-600 font-bold rounded-full shadow-lg text-sm cursor-pointer"
        >
          View Inventory
        </motion.button>
      </div>

      <motion.img
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        src={assets.banner_car_image}
        alt="car"
        className="max-h-45 mt-10"
      />
    </motion.div>
  );
};

export default Banner;
