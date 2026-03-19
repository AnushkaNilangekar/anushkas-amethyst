import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SPARKLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 3,
  size: Math.random() * 2.5 + 1,
  color: i % 3 === 0 ? '#f59e0b' : i % 3 === 1 ? '#c084fc' : '#ffffff',
}));

const Splash = ({ onEnter }) => {
  const [leaving, setLeaving] = useState(false);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 900);
  };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #1a0a2e 0%, #0a0514 100%)',
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
        >
          {/* Ambient sparkles */}
          {SPARKLES.map((s) => (
            <motion.div
              key={s.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                background: s.color,
                filter: 'blur(0.3px)',
              }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{
                duration: 2 + Math.random() * 1.5,
                repeat: Infinity,
                delay: s.delay,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Center content */}
          <div className="text-center z-10 px-6 select-none">
            <motion.p
              className="tracking-[0.5em] uppercase text-xs font-light mb-5"
              style={{ color: 'rgba(192,132,252,0.5)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Welcome to
            </motion.p>

            <motion.h1
              className="font-display font-bold leading-none mb-2"
              style={{
                fontSize: 'clamp(2.8rem, 8vw, 5.5rem)',
                background: 'linear-gradient(135deg, #ddd6fe 0%, #f59e0b 55%, #ddd6fe 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 30px rgba(245,158,11,0.2))',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
            >
              Anushka's Amethyst
            </motion.h1>

            <motion.div
              className="divider my-7 mx-auto"
              style={{ maxWidth: '16rem' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
            />

            <motion.button
              onClick={handleEnter}
              className="px-9 py-3 rounded-full text-xs tracking-[0.25em] uppercase font-medium transition-all duration-300"
              style={{
                border: '1px solid rgba(245,158,11,0.35)',
                color: '#fde68a',
                background: 'rgba(245,158,11,0.04)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.6 }}
              whileHover={{
                background: 'rgba(245,158,11,0.10)',
                boxShadow: '0 0 24px rgba(245,158,11,0.18)',
              }}
              whileTap={{ scale: 0.97 }}
            >
              Enter
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Splash;
