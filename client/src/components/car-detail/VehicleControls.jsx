import React from 'react';
import { motion } from 'motion/react';

const VehicleControls = ({
  headlightsOn,
  onToggleHeadlights,
  isInteriorMode,
  onToggleInterior,
  autoRotate,
  onToggleAutoRotate,
  showHotspots,
  onToggleHotspots,
}) => {
  const controls = [
    {
      id: 'headlights',
      label: 'Lights',
      isActive: headlightsOn,
      onClick: onToggleHeadlights,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
    },
    {
      id: 'interior',
      label: 'Interior',
      isActive: isInteriorMode,
      onClick: onToggleInterior,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      id: 'rotate',
      label: 'Auto Rotate',
      isActive: autoRotate,
      onClick: onToggleAutoRotate,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
      ),
    },
    {
      id: 'hotspots',
      label: 'Hotspots',
      isActive: showHotspots,
      onClick: onToggleHotspots,
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2"
    >
      {controls.map((ctrl, idx) => (
        <motion.button
          key={ctrl.id}
          onClick={ctrl.onClick}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 + idx * 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`group relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-xl cursor-pointer transition-all duration-300 ${['rotate', 'hotspots'].includes(ctrl.id) ? 'hidden md:flex' : ''}`}
          style={{
            background: ctrl.isActive
              ? 'rgba(99, 102, 241, 0.3)'
              : 'rgba(10, 10, 20, 0.6)',
            backdropFilter: 'blur(15px)',
            border: ctrl.isActive
              ? '1px solid rgba(129, 140, 248, 0.4)'
              : '1px solid rgba(255,255,255,0.06)',
            color: ctrl.isActive
              ? 'rgba(199, 210, 254, 1)'
              : 'rgba(255,255,255,0.5)',
            boxShadow: ctrl.isActive
              ? '0 0 20px rgba(99, 102, 241, 0.2)'
              : '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          {ctrl.icon}

          {/* Tooltip */}
          <div
            className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
            style={{
              background: 'rgba(10, 10, 20, 0.9)',
              borderRadius: '8px',
              padding: '5px 10px',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            }}
          >
            {ctrl.label}
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default VehicleControls;
