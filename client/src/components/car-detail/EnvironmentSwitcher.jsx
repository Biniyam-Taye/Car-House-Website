import React from 'react';
import { motion } from 'motion/react';
import { ENVIRONMENTS } from './ViewerUtils';

const EnvIcon = ({ id, isActive }) => {
  const color = isActive ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.6)';
  
  switch (id) {
    case 'showroom':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M2 10l10-6 10 6" />
          <path d="M8 10v10" />
          <path d="M16 10v10" />
        </svg>
      );
    case 'garage':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21V8L12 3l9 5v13" />
          <path d="M13 21v-8a1 1 0 0 0-1-1h-0a1 1 0 0 0-1 1v8" />
          <line x1="8" y1="12" x2="8" y2="12.01" />
          <line x1="16" y1="12" x2="16" y2="12.01" />
        </svg>
      );
    case 'daylight':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M17.66 17.66l1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M6.34 17.66l-1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'sunset':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v2" />
          <path d="M4.93 4.93l1.41 1.41" />
          <path d="M19.07 4.93l-1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="M22 17H2" />
          <path d="M8 17a4 4 0 0 1 8 0" />
        </svg>
      );
    case 'night':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      );
    default:
      return null;
  }
};

const EnvironmentSwitcher = ({ activeEnvironment, onEnvironmentChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
    >
      <div
        className="flex items-center gap-1 px-1 md:px-2 py-1 md:py-1.5 rounded-xl"
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
              className="relative px-2 md:px-3 py-1 md:py-1.5 rounded-lg cursor-pointer transition-colors duration-200"
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
                <span className="text-sm flex items-center justify-center">
                  <EnvIcon id={env.id} isActive={isActive} />
                </span>
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
