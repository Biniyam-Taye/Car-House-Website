import React from 'react';
import { motion } from 'motion/react';
import { formatPrice } from './ViewerUtils';

const VehicleInfoCard = ({ car }) => {
  if (!car) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
      className="absolute top-24 left-4 md:top-1/2 md:-translate-y-1/2 md:left-12 z-20 w-[90%] md:w-96 max-w-sm pointer-events-none"
    >
      <div
        className="pointer-events-auto rounded-3xl p-6 overflow-hidden relative"
        style={{
          background: 'rgba(10, 10, 20, 0.4)',
          backdropFilter: 'blur(25px)',
          WebkitBackdropFilter: 'blur(25px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Subtle gradient glow inside card */}
        <div
          className="absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        />

        {/* Header: Brand & Model */}
        <div className="relative z-10 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {car.brand || 'Luxury'}
            </p>
            <h1 className="text-3xl font-light tracking-wide text-white leading-tight mb-2">
              {car.model || 'Concept Vehicle'}
            </h1>
            <p className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {car.year} • {car.category || 'Premium'}
            </p>
          </motion.div>
        </div>

        {/* Price */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.5 }}
          className="relative z-10 mb-8 pb-6 border-b border-white/10"
        >
          <p className="text-xs font-medium tracking-wider uppercase mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Starting at
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-extralight text-white">
              {formatPrice(car.sale_price)}
            </span>
            {car.sale_price && (
              <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                ETB
              </span>
            )}
          </div>
        </motion.div>

        {/* Quick Specs Grid */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.1, duration: 0.5 }}
          className="relative z-10 grid grid-cols-2 gap-y-5 gap-x-4 mb-8"
        >
          {[
            { label: 'Transmission', value: car.transmission || 'Automatic' },
            { label: 'Fuel Type', value: car.fuel_type || 'Electric' },
            { label: 'Mileage', value: car.mileage || 'New' },
            { label: 'Location', value: car.location || 'Showroom' },
          ].map((spec, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                {spec.label}
              </span>
              <span className="text-sm font-medium text-white truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3, duration: 0.5 }}
          className="relative z-10 flex flex-col gap-3"
        >
          {/* Main Action */}
          <button
            onClick={() => {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }}
            className="w-full py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden group"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-sm font-medium tracking-wider text-white">View Full Details</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-1 transition-transform">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default VehicleInfoCard;
