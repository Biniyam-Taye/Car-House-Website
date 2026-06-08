import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.div role="contentinfo"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-[#f9fafb] rounded-[50px] border-[2.5px] border-gray-200 shadow-[0_15px_45px_rgba(0,0,0,0.03)] mt-28 mb-12 mx-6 md:mx-12 pt-20 pb-8 px-6 md:px-12 lg:px-20 xl:px-28 text-sm text-gray-500"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-12 mb-16">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 pr-0 lg:pr-8">
          <div className="flex items-center gap-2.5 mb-5">
            <motion.img
              whileHover={{ scale: 1.1, rotate: -8 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={assets.logo}
              alt="logo"
              className="h-12 md:h-14"
            />
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">DriveLux</span>
          </div>
          <p className="mb-6 leading-relaxed text-gray-500 font-normal">
            Rent your perfect car with us. We offer seamless car rentals, trusted listings, and the best prices to make your journey smooth, comfortable, and memorable.
          </p>
          <div className="flex items-center gap-3">
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:border-pink-300 hover:bg-pink-50/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
              <img src={assets.instagram_logo} alt="instagram" className="w-4 h-4 opacity-75 transition-all" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:border-blue-300 hover:bg-blue-50/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
              <img src={assets.facebook_logo} alt="facebook" className="w-4 h-4 opacity-75 transition-all" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:border-sky-300 hover:bg-sky-50/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
              <img src={assets.twitter_logo} alt="twitter" className="w-4 h-4 opacity-75 transition-all" />
            </a>
            <a href="#" className="w-9 h-9 flex items-center justify-center bg-white rounded-full border border-gray-200 shadow-sm hover:border-red-300 hover:bg-red-50/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md">
              <img src={assets.gmail_logo} alt="email" className="w-4 h-4 opacity-75 transition-all" />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full lg:w-1/3 flex justify-between gap-6">
          <div>
            <h3 className="text-gray-900 font-bold text-xs tracking-widest uppercase mb-6">COMPANY</h3>
            <ul className="flex flex-col gap-3.5">
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">About</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Careers</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Press</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Blog</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Partners</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-bold text-xs tracking-widest uppercase mb-6">RESOURCES</h3>
            <ul className="flex flex-col gap-3.5">
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Help</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Safety</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Cancel</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Support</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium text-gray-500">Access</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full lg:w-1/4">
          <h3 className="text-gray-900 font-bold text-xs tracking-widest uppercase mb-6">STAY UPDATED</h3>
          <p className="mb-4 leading-relaxed text-gray-500">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="mt-4 flex items-center bg-white rounded-full p-1 border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all shadow-sm">
            <input type="email" placeholder="Your email address" className="bg-transparent pl-4 pr-2 py-1.5 w-full text-xs outline-none text-gray-700 font-medium" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-all hover:scale-105 active:scale-95 shadow-sm">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4 leading-normal">
            Subscribe via our <a href="#" className="text-blue-500 hover:underline font-semibold transition-all">Journal</a> page for editorial updates.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200/80 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-400">Copyright ©{new Date().getFullYear()} - Biniyam Taye. All rights reserved.</p>
        <div className="flex gap-6 text-xs font-semibold text-gray-400">
          <Link to="/" className="hover:text-gray-900 transition-colors">Privacy</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors">Terms</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors">Sitemap</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
