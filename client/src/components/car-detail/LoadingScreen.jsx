import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useProgress } from '@react-three/drei';

const LoadingScreen = ({ isLoaded = false, fallbackProgress = 0 }) => {
  const { progress } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [showScreen, setShowScreen] = useState(true);

  // Smooth progress interpolation
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        // Use actual progress from drei, fallback to the prop if needed
        const actualProgress = progress > 0 ? progress : fallbackProgress;
        const target = isLoaded ? 100 : actualProgress;
        const diff = target - prev;
        if (Math.abs(diff) < 0.5) return target;
        return prev + diff * 0.15;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [progress, isLoaded]);

  // Hide after loaded
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShowScreen(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <AnimatePresence>
      {showScreen && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #06060a 0%, #0d0d18 40%, #0a0a14 100%)',
          }}
        >
          {/* Ambient glow effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute rounded-full blur-3xl opacity-20 animate-pulse"
              style={{
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
                top: '20%',
                left: '30%',
              }}
            />
            <div
              className="absolute rounded-full blur-3xl opacity-15"
              style={{
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(59,130,246,0.3) 0%, transparent 70%)',
                bottom: '20%',
                right: '25%',
                animation: 'pulse 3s ease-in-out infinite reverse',
              }}
            />
          </div>

          {/* Car silhouette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative mb-12"
          >
            <svg
              width="200"
              height="80"
              viewBox="0 0 200 80"
              fill="none"
              className="opacity-30"
            >
              {/* Car body silhouette */}
              <path
                d="M20 55 Q25 55 35 50 Q50 35 65 30 Q80 25 100 25 Q120 25 135 30 Q150 35 165 50 Q175 55 180 55 L185 55 Q190 55 190 60 L190 65 Q190 70 185 70 L175 70 L170 65 Q165 58 155 58 Q145 58 140 65 L135 70 L65 70 L60 65 Q55 58 45 58 Q35 58 30 65 L25 70 L15 70 Q10 70 10 65 L10 60 Q10 55 15 55 Z"
                fill="url(#carGradient)"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(99,102,241,0.3))',
                }}
              >
                <animate
                  attributeName="opacity"
                  values="0.3;0.6;0.3"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Windows */}
              <path
                d="M70 48 Q75 35 85 30 Q95 27 105 27 Q115 27 125 30 Q135 35 140 48 Z"
                fill="rgba(99,102,241,0.15)"
              >
                <animate
                  attributeName="opacity"
                  values="0.1;0.3;0.1"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </path>
              {/* Headlight glow */}
              <circle cx="175" cy="52" r="4" fill="rgba(255,255,255,0.5)">
                <animate
                  attributeName="r"
                  values="3;5;3"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0.3;0.8;0.3"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Taillight glow */}
              <circle cx="22" cy="52" r="3" fill="rgba(239,68,68,0.6)">
                <animate
                  attributeName="r"
                  values="2;4;2"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </circle>
              <defs>
                <linearGradient id="carGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(99,102,241,0.4)" />
                  <stop offset="50%" stopColor="rgba(139,92,246,0.5)" />
                  <stop offset="100%" stopColor="rgba(59,130,246,0.4)" />
                </linearGradient>
              </defs>
            </svg>

            {/* Reflection line sweeping across */}
            <motion.div
              className="absolute top-0 left-0 h-full w-8"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
              }}
              animate={{ x: [-20, 220] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Brand text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center mb-8"
          >
            <h2
              className="text-xl font-light tracking-[0.3em] uppercase mb-2"
              style={{ color: 'rgba(255,255,255,0.7)' }}
            >
              Virtual Showroom
            </h2>
            <p
              className="text-sm tracking-[0.15em]"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              Preparing your experience
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0.8 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-64 relative"
          >
            {/* Track */}
            <div
              className="h-[2px] rounded-full overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.08)' }}
            >
              {/* Fill */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${Math.round(displayProgress)}%`,
                  background: 'linear-gradient(90deg, #6366f1, #818cf8, #a78bfa)',
                  boxShadow: '0 0 20px rgba(99,102,241,0.5)',
                  transition: 'width 0.3s ease-out',
                }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-between items-center mt-3">
              <span
                className="text-xs font-mono tracking-wider"
                style={{ color: 'rgba(255,255,255,0.25)' }}
              >
                Loading model
              </span>
              <span
                className="text-xs font-mono tracking-wider"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {Math.round(displayProgress)}%
              </span>
            </div>
          </motion.div>

          {/* Bottom decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-px"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
