import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { motion } from "motion/react";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");

  const { pickupDate, setPickupDate, navigate, returnDate, setReturnDate } =
    useAppContext();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      "/cars?pickupLocation=" +
        pickupLocation +
        "&pickupDate=" +
        pickupDate +
        "&returnDate=" +
        returnDate
    );
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center gap-12 pt-28 pb-12 px-6 bg-light text-center relative overflow-hidden"
    >
      {/* Dynamic Background Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-[140px] -z-10 pointer-events-none"></div>

      {/* Floating Announcement Bar (Covers Navbar space when hidden at the top) */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute top-8 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-3 px-5 py-2.5 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.02)] text-xs text-gray-600 font-semibold z-10"
      >
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="tracking-wide flex items-center gap-1.5">
            <svg className="w-4 h-4 text-yellow-500 shrink-0" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            Special Offer: Save <span className="text-blue-600 font-extrabold">15% off</span> on premium cars! Code: <span className="font-bold text-gray-900 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded">DRIVE15</span>
          </span>
      </motion.div>

      {/* Hero Header Text & Badges */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100 flex items-center gap-1.5 shadow-sm"
        >
          <span className="text-[11px] font-extrabold text-blue-600 uppercase tracking-widest flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            The Ultimate Drive Experience
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-[1.15] text-gray-900"
        >
          Luxury Cars on Rent for{" "}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Your Premium Journeys
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed mt-2"
        >
          Choose from a fleet of elite, high-performance vehicles. Experience unparalleled comfort, speed, and safety at flat-rate transparent prices.
        </motion.p>
      </div>

      {/* Content Rich Search Widget Bar */}
      <motion.form
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row items-center justify-between p-4 rounded-[30px] lg:rounded-full w-full max-w-5xl bg-white/95 backdrop-blur-sm shadow-[0_15px_45px_rgba(0,0,0,0.06)] border border-gray-150 gap-6 lg:gap-2 z-10"
      >
        <div className="flex flex-col lg:flex-row items-stretch justify-between w-full divide-y lg:divide-y-0 lg:divide-x divide-gray-100 gap-4 lg:gap-0 lg:px-4">
          
          {/* Pickup Location Block */}
          <div className="flex items-center gap-3.5 px-4 py-2 lg:py-0 w-full lg:w-1/3 hover:bg-gray-50/50 rounded-2xl lg:rounded-none transition-colors cursor-pointer group">
            <div className="p-2.5 bg-blue-50 rounded-full text-blue-600 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div className="flex flex-col items-start w-full">
              <label className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">Pickup Location</label>
              <select
                required
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="w-full bg-transparent border-none outline-none font-bold text-gray-800 text-[14px] cursor-pointer appearance-none"
              >
                <option value="">Select Location</option>
                {cityList.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Pickup Date Block */}
          <div className="flex items-center gap-3.5 px-4 py-2 lg:py-0 w-full lg:w-1/3 hover:bg-gray-50/50 rounded-2xl lg:rounded-none transition-colors cursor-pointer group">
            <div className="p-2.5 bg-indigo-50 rounded-full text-indigo-600 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="pickup-date" className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">Pickup Date</label>
              <input
                type="date"
                id="pickup-date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-transparent border-none outline-none font-bold text-gray-800 text-[14px] cursor-pointer"
                required
              />
            </div>
          </div>

          {/* Return Date Block */}
          <div className="flex items-center gap-3.5 px-4 py-2 lg:py-0 w-full lg:w-1/3 hover:bg-gray-50/50 rounded-2xl lg:rounded-none transition-colors cursor-pointer group">
            <div className="p-2.5 bg-purple-50 rounded-full text-purple-600 transition-transform group-hover:scale-110">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="return-date" className="text-[10px] font-extrabold tracking-widest text-gray-400 uppercase">Return Date</label>
              <input
                type="date"
                id="return-date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full bg-transparent border-none outline-none font-bold text-gray-800 text-[14px] cursor-pointer"
                required
              />
            </div>
          </div>

        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all duration-300 w-full lg:w-auto shrink-0"
        >
          <img
            src={assets.search_icon}
            alt="search"
            className="brightness-300 w-4 h-4"
          />
          Find Car
        </motion.button>
      </motion.form>

      {/* Floating Car Wrapper */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative mt-2"
      >
        <motion.img
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          src={assets.main_car}
          alt="car"
          className="max-h-72 drop-shadow-[0_20px_35px_rgba(0,0,0,0.12)] cursor-pointer"
        />
      </motion.div>

      {/* Key Highlights / Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-xs md:text-sm text-gray-500 mt-2 z-10"
      >
        <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-gray-150 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          <span className="font-semibold text-gray-700">100+ Premium Fleet</span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-gray-150 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
          <span className="font-semibold text-gray-700">Flexible Pickups</span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-gray-150 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span className="font-semibold text-gray-700">Transparent Pricing</span>
        </div>
        <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-gray-150 shadow-sm backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-semibold text-gray-700">24/7 Road Support</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;
