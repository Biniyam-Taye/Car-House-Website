import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

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
              Premium Fleet
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white leading-[1.1] tracking-tight">
              Powering Your Journey <br />
              with The Newest <br />
              luxury cars
            </h1>
            
            <button 
              onClick={() => navigate('/cars')}
              className="mt-10 px-8 py-3.5 bg-white text-orange-500 rounded-full font-bold flex items-center gap-3 hover:bg-gray-100 transition-all shadow-lg group cursor-pointer"
            >
              Get Product
              <span className="text-orange-500 group-hover:translate-x-1 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </span>
            </button>
          </div>

          {/* Right side floating text */}
          <div className="absolute right-10 top-[40%] text-white text-sm font-medium text-right opacity-90 hidden md:block">
            Luxury Technology <br /> From DriveLux.
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
                <h3 className="font-bold text-[14px] mb-1">Efficient Performance</h3>
                <p className="text-gray-400 group-hover:text-white/90 text-[10px] leading-relaxed transition-colors duration-500">
                  Our luxury cars deliver maximum efficiency, ensuring you get the most out of every journey.
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
                  Reduce your carbon footprint and contribute to a greener planet with our hybrid fleet.
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
                  Stay ahead with our innovative vehicle technology designed for modern comfort needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Description Text */}
      <div className="mt-6 md:w-[30%] px-2">
        <p className="text-gray-500 text-xs leading-relaxed">
          Our state-of-the-art luxury vehicles and smart booking systems are tailored to meet the needs of both business and leisure travelers.
        </p>
      </div>

    </div>
  );
};

export default Hero;
