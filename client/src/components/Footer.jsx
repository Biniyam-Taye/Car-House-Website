import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Footer = () => {
  return (
    <motion.div role="contentinfo"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-[#f8f9fa] rounded-t-[50px] shadow-[0_-10px_40px_rgba(0,0,0,0.04)] mt-20 pt-16 pb-8 px-8 md:px-16 lg:px-24 xl:px-32 text-sm text-gray-500"
    >
      <div className="flex flex-wrap justify-between gap-12 mb-12">
        {/* Left Section */}
        <div className="w-full lg:w-1/3">
          <div className="flex items-center gap-2 mb-4">
            <motion.img 
              whileHover={{ scale: 1.1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={assets.logo} 
              alt="logo" 
              className="h-10 md:h-12" 
            />
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">HotelDemo</span>
          </div>
          <p className="mb-6 leading-relaxed">
            Book your perfect stay with us. We offer seamless hotel reservations, trusted listings, and the best prices to make your travel experience smooth, comfortable, and memorable.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-75 transition-all transform hover:scale-110 hover:-translate-y-1"><img src={assets.instagram_logo} alt="instagram" className="w-5 h-5 opacity-60 grayscale hover:grayscale-0 transition-all" /></a>
            <a href="#" className="hover:opacity-75 transition-all transform hover:scale-110 hover:-translate-y-1"><img src={assets.facebook_logo} alt="facebook" className="w-5 h-5 opacity-60 grayscale hover:grayscale-0 transition-all" /></a>
            <a href="#" className="hover:opacity-75 transition-all transform hover:scale-110 hover:-translate-y-1"><img src={assets.twitter_logo} alt="twitter" className="w-5 h-5 opacity-60 grayscale hover:grayscale-0 transition-all" /></a>
            <a href="#" className="hover:opacity-75 transition-all transform hover:scale-110 hover:-translate-y-1"><img src={assets.gmail_logo} alt="email" className="w-5 h-5 opacity-60 hover:text-red-500 transition-all" /></a>
          </div>
        </div>

        {/* Links Section */}
        <div className="w-full lg:w-1/3 flex justify-between gap-8">
          <div>
            <h3 className="text-gray-900 font-semibold tracking-wider mb-6">COMPANY</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">About</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Careers</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Press</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Blog</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Partners</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-900 font-semibold tracking-wider mb-6">RESOURCES</h3>
            <ul className="flex flex-col gap-3">
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Help</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Safety</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Cancel</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Support</Link></li>
              <li><Link to="/" className="hover:text-blue-600 transition-colors font-medium">Access</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="w-full lg:w-1/4">
          <h3 className="text-gray-900 font-semibold tracking-wider mb-6">STAY UPDATED</h3>
          <p className="mb-4 leading-relaxed">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <p className="text-xs text-gray-400 mt-6">
            Subscribe via our <a href="#" className="text-blue-500 hover:underline font-medium">Journal</a> page for editorial updates.
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p>Copyright ©{new Date().getFullYear()} - Biniyam Taye. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-900 transition-colors font-medium">Privacy</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors font-medium">Terms</Link>
          <Link to="/" className="hover:text-gray-900 transition-colors font-medium">Sitemap</Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
