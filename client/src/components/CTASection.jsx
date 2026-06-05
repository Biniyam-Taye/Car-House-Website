import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CTASection = () => {
  const navigate = useNavigate();
  const { setShowLogin, user } = useAppContext();

  const perks = [
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: "Fully Insured",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "24/7 Support",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      label: "No Hidden Fees",
    },
    {
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      label: "Free Delivery",
    },
  ];

  return (
    <div className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 py-12 bg-white">
      {/* Soft blue-indigo gradient band across the top edge for subtle depth */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

      {/* Very subtle background tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40 -z-10" />

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left – text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight tracking-tight mb-3">
            Your Dream Ride{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Starts Right Here.
            </span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
            Join thousands of drivers who experience premium car rentals with zero stress. Sign up in seconds — completely hassle-free.
          </p>

          {/* Perks inline */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-3">
            {perks.map((perk, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-gray-600 text-xs font-medium hover:bg-blue-100 hover:border-blue-200 hover:text-blue-700 transition-all duration-300"
              >
                <span className="text-blue-500">{perk.icon}</span>
                {perk.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right – buttons */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              if (user) { navigate("/cars"); scrollTo(0, 0); }
              else { setShowLogin(true); }
            }}
            className="relative group w-full sm:w-auto lg:w-52 px-8 py-3.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm shadow-[0_6px_24px_rgba(59,130,246,0.3)] hover:shadow-[0_10px_32px_rgba(59,130,246,0.45)] transition-all duration-300 overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
            <span className="relative flex items-center justify-center gap-2">
              {user ? "Browse Cars" : "Join Now — Free"}
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => { navigate("/cars"); scrollTo(0, 0); }}
            className="w-full sm:w-auto lg:w-52 px-8 py-3.5 rounded-full bg-white border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Fleet
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default CTASection;
