import React from 'react';
import { motion } from 'motion/react';
import { ENVIRONMENTS } from './ViewerUtils';

const EnvironmentSwitcher = ({ activeEnvironment, onEnvironmentChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
    >
      <div
        className="flex items-center gap-1 px-2 py-1.5 rounded-xl"
        style={{
          background: 'rgba(10, 10, 20, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}
      >
        {ENVIRONMENTS.map((env) => {
          const isActive = activeEnvironment === env.id;
          return (
            <motion.button
              key={env.id}
              onClick={() => onEnvironmentChange(env.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-3 py-1.5 rounded-lg cursor-pointer transition-colors duration-200"
              style={{
                background: isActive
                  ? 'rgba(99, 102, 241, 0.2)'
                  : 'transparent',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="envHighlight"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.3)',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="text-sm">{env.icon}</span>
                <span
                  className="text-xs font-medium tracking-wide hidden sm:block"
                  style={{
                    color: isActive
                      ? 'rgba(255,255,255,0.9)'
                      : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {env.name}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default EnvironmentSwitcher;
