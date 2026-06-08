import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const rotatingPhrases = [
  { text: "luxury sedans", color: "text-orange-400 drop-shadow-[0_0_15px_rgba(251,146,60,0.5)]" },
  { text: "sports cars", color: "text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" },
  { text: "premium SUVs", color: "text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]" },
  { text: "electric vehicles", color: "text-purple-400 drop-shadow-[0_0_15px_rgba(192,132,252,0.5)]" },
];

const Hero = () => {
  const navigate = useNavigate();
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-24 pb-12 px-4 md:px-8 max-w-[1600px] mx-auto flex flex-col font-outfit">
      
      {/* Main Hero Image/Video Area */}
      <div className="relative w-full h-[75vh] min-h-[600px] rounded-[2.5rem] bg-gray-900 overflow-hidden shadow-sm">
        {/* Background Video */}
        <video
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent pointer-events-none"></div>

        {/* Hero Text Content */}
        <div className="absolute top-0 left-0 w-full h-full p-8 md:p-14 flex flex-col z-10 pointer-events-none">
          <div className="max-w-3xl mt-4 md:mt-8 pointer-events-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-semibold tracking-wider mb-6 border border-white/30 shadow-sm">
              Exclusive Inventory
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tight">
              Find Your Dream Ride <br />
              from our collection of <br />
              <span className="inline-block relative min-w-[300px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textIndex}
                    initial={{ y: 30, opacity: 0, rotateX: 40 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    exit={{ y: -30, opacity: 0, rotateX: -40 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`inline-block font-bold ${rotatingPhrases[textIndex].color}`}
                    style={{ perspective: 600 }}
                  >
                    {rotatingPhrases[textIndex].text}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h1>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/cars')}
              className="mt-10 relative overflow-hidden px-8 py-3.5 bg-white text-orange-500 rounded-full font-bold flex items-center gap-3 shadow-[0_8px_30px_rgba(249,115,22,0.2)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.4)] transition-shadow duration-500 group cursor-pointer border border-transparent"
            >
              {/* Sweep Background */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-400 to-orange-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-0 rounded-full"></span>
              
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                View Inventory
              </span>
              <span className="relative z-10 text-orange-500 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </motion.button>
          </div>

          {/* Right side floating text */}
          <div className="absolute right-10 top-[40%] text-white text-sm font-medium text-right opacity-90 hidden md:block">
            Premium Vehicles <br /> For Sale.
          </div>
        </div>

        {/* Bottom Right White Cutout Area */}
        <div className="absolute bottom-0 right-0 w-full md:w-[85%] lg:w-[65%] h-auto pt-8 pl-8 pb-4 pr-4 md:pb-6 md:pr-6 bg-white rounded-tl-[3rem] z-20 flex flex-col justify-end">
          {/* Smooth Inverted Curve Effect */}
          <div className="absolute bottom-0 -left-12 w-12 h-12 bg-transparent rounded-br-[3rem] shadow-[1.5rem_1.5rem_0_0_#ffffff] hidden md:block"></div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {/* Card 1 */}
            <div className="bg-[#2c2c2e] text-white rounded-[1.5rem] p-5 flex flex-col justify-between h-[170px] relative overflow-hidden group shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-8 h-8 bg-white/20 group-hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:text-pink-600 shadow-sm transition-colors duration-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div className="w-7 h-7 bg-[#f5a25d] group-hover:bg-white rounded-full flex items-center justify-center text-white group-hover:text-orange-500 shadow-sm transition-colors duration-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 19L19 5m0 0v10m0-10H9"></path></svg>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-[14px] mb-1">Unmatched Reliability</h3>
                <p className="text-gray-400 group-hover:text-white/90 text-[10px] leading-relaxed transition-colors duration-500">
                  Our vehicles deliver maximum performance, ensuring you get the absolute best value for your investment.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#2c2c2e] text-white rounded-[1.5rem] p-5 flex flex-col justify-between h-[170px] relative overflow-hidden group shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-8 h-8 bg-white/20 group-hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:text-emerald-600 shadow-sm transition-colors duration-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-[14px] mb-1">Eco-Friendly Options</h3>
                <p className="text-gray-400 group-hover:text-white/90 text-[10px] leading-relaxed transition-colors duration-500">
                  Explore our premium selection of hybrid and electric vehicles, offering sustainable driving without compromise.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#2c2c2e] text-white rounded-[1.5rem] p-5 flex flex-col justify-between h-[170px] relative overflow-hidden group shadow-md hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-8 h-8 bg-white/20 group-hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center text-white group-hover:text-indigo-600 shadow-sm transition-colors duration-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="font-bold text-[14px] mb-1">Cutting-Edge Tech</h3>
                <p className="text-gray-400 group-hover:text-white/90 text-[10px] leading-relaxed transition-colors duration-500">
                  Experience the latest in automotive innovation, from advanced safety features to state-of-the-art infotainment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Description Text */}
      <div className="mt-6 md:w-[30%] px-2">
        <p className="text-gray-500 text-xs leading-relaxed">
          Our state-of-the-art luxury vehicles and transparent purchasing process are tailored to meet the needs of every discerning buyer.
        </p>
      </div>

    </div>
  );
};

export default Hero;
