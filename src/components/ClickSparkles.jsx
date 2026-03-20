import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const COLORS = ['#f59e0b', '#c084fc', '#fde68a', '#ddd6fe', '#ffffff'];
const COUNT = 8;

const ClickSparkles = () => {
  const [sparks, setSparks] = useState([]);

  const handleClick = useCallback((e) => {
    const batch = Date.now();
    const newSparks = Array.from({ length: COUNT }, (_, i) => {
      const angle = (i / COUNT) * 360;
      const dist = 28 + Math.random() * 28;
      const rad = (angle * Math.PI) / 180;
      return {
        id: `${batch}-${i}`,
        x: e.clientX,
        y: e.clientY,
        dx: Math.cos(rad) * dist,
        dy: Math.sin(rad) * dist,
        size: 2.5 + Math.random() * 3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      };
    });

    setSparks((prev) => [...prev, ...newSparks]);
    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !s.id.startsWith(batch)));
    }, 700);
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  return createPortal(
    <div className="fixed inset-0 pointer-events-none z-[200]" aria-hidden="true">
      <AnimatePresence>
        {sparks.map((s) => (
          <motion.div
            key={s.id}
            className="absolute rounded-full"
            style={{
              left: s.x,
              top: s.y,
              width: s.size,
              height: s.size,
              background: s.color,
              filter: `blur(0.3px) drop-shadow(0 0 ${s.size}px ${s.color})`,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: s.dx, y: s.dy, scale: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  );
};

export default ClickSparkles;
