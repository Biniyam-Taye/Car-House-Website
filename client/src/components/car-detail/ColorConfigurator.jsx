import React from 'react';
import { motion } from 'motion/react';
import { CAR_COLORS } from './ViewerUtils';

const ColorConfigurator = ({ activeColor, onColorChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 md:bottom-6 md:left-6 md:translate-x-0"
    >
      <div
        className="flex items-center gap-3 px-5 py-3 rounded-2xl"
        style={{
          background: 'rgba(10, 10, 20, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Label */}
        <span
          className="text-xs font-medium tracking-widest uppercase mr-2 hidden sm:block"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Color
        </span>

        {/* Color swatches */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-[280px] sm:max-w-md">
          {CAR_COLORS.map((color) => {
            const isActive = activeColor === color.id;
            return (
              <motion.button
                key={color.id}
                onClick={() => onColorChange(color.id)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                title={color.name}
                className="relative group cursor-pointer"
              >
                {/* Active ring */}
                {isActive && (
                  <motion.div
                    layoutId="colorRing"
                    className="absolute -inset-1.5 rounded-full"
                    style={{
                      border: '2px solid rgba(165, 180, 252, 0.7)',
                      boxShadow: '0 0 12px rgba(99, 102, 241, 0.4)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}

                {/* Color circle */}
                <div
                  className="w-5 h-5 md:w-7 md:h-7 rounded-full relative overflow-hidden"
                  style={{
                    background: color.hex,
                    boxShadow: isActive
                      ? `0 0 15px ${color.hex}40`
                      : '0 2px 6px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Metallic shine effect */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
                    }}
                  />
                </div>

                {/* Tooltip */}
                <div
                  className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
                  style={{
                    background: 'rgba(10, 10, 20, 0.9)',
                    borderRadius: '6px',
                    padding: '3px 8px',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.8)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {color.name}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default ColorConfigurator;
