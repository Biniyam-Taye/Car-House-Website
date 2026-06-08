import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="group bg-white rounded-[2rem] p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] border border-gray-50 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col relative overflow-hidden"
    >
      {/* Cool Hover Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full -z-10 group-hover:scale-[2.5] transition-transform duration-700 ease-out"></div>

      <div className="relative h-56 rounded-[1.5rem] overflow-hidden bg-gray-100 flex items-center justify-center z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
        <img
          src={car.image}
          alt="car image"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {car.isAvaliable && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-gray-900 text-[10px] font-bold px-3 py-1.5 rounded-full z-20 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Available
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow z-10">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xl font-black text-gray-900 group-hover:text-orange-500 transition-colors duration-300 line-clamp-1">
            {car.brand} {car.model}
          </h3>
        </div>
        <p className="text-gray-400 text-xs font-semibold mb-5 tracking-wide">
          {car.category} <span className="mx-1 text-gray-300">•</span> {car.year}
        </p>

        <div className="grid grid-cols-4 gap-2 mb-6">
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-2 group-hover:bg-orange-50 transition-colors duration-300">
            <img src={assets.users_icon} alt="" className="h-4 mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] text-gray-600 font-bold">{car.seating_capacity}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-2 group-hover:bg-orange-50 transition-colors duration-300">
            <img src={assets.fuel_icon} alt="" className="h-4 mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] text-gray-600 font-bold line-clamp-1">{car.fuel_type}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-2 group-hover:bg-orange-50 transition-colors duration-300">
            <img src={assets.car_icon} alt="" className="h-4 mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] text-gray-600 font-bold line-clamp-1">{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl py-2 group-hover:bg-orange-50 transition-colors duration-300">
            <img src={assets.location_icon} alt="" className="h-4 mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity" />
            <span className="text-[10px] text-gray-600 font-bold truncate w-full text-center px-1">{car.location?.split(',')[0]}</span>
          </div>
        </div>

        <div className="mt-auto flex justify-between items-end pt-4 border-t border-gray-100/80">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Daily Rate</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-gray-900 leading-none">{currency}{car.pricePerDay}</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center group-hover:bg-orange-500 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-500 transform group-hover:-rotate-45">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
