import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { CONTENT } from '../../data/content';

// Floating role tags
const FLOAT_OFFSETS = [
  { x: 0,  y: 3,  delay: 0,   dur: 5   },  // Full Stack Engineer
  { x: 62, y: 2,  delay: 0.8, dur: 6.5 },  // Mobile Developer
  { x: 24, y: 18, delay: 1.5, dur: 4.5 },  // AI/ML Enthusiast
  { x: 0,  y: 36, delay: 0.3, dur: 7   },  // Open Source Contributor
  { x: 4,  y: 54, delay: 1.1, dur: 5.5 },  // React Developer
  { x: 58, y: 48, delay: 0.5, dur: 6   },  // Backend Engineer
  { x: 80, y: 14, delay: 1.8, dur: 5   },  // Cloud & DevOps
  { x: 18, y: 70, delay: 0.9, dur: 7.5 },  // Python Developer
  { x: 72, y: 63, delay: 1.3, dur: 4.8 },  // Android Developer
  { x: 65, y: 82, delay: 0.2, dur: 6.2 },  // API Designer
  { x: 0,  y: 82, delay: 1.6, dur: 5.3 },  // Boba-fueled Coder
  { x: 78, y: 40, delay: 0.7, dur: 6.8 },  // Lifelong Learner
  { x: 42, y: 30, delay: 1.2, dur: 5.8 },  // Problem Solver
  { x: 48, y: 68, delay: 0.4, dur: 4.3 },  // Detail-Oriented
  { x: 66, y: 22, delay: 1.9, dur: 7.2 },  // CS @ Purdue
];

const FloatingTags = ({ titles }) => (
  <div className="relative w-full h-full">
    {titles.map((title, i) => {
      const off = FLOAT_OFFSETS[i] || FLOAT_OFFSETS[0];
      return (
        /* Framer Motion: pulse opacity in and out */
        <motion.div
          key={title}
          className="absolute"
          style={{ left: `${off.x}%`, top: `${off.y}%` }}
          animate={{ opacity: [0, 1, 1, 0.15, 1, 1, 0] }}
          transition={{ duration: 8 + i * 0.6, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
        >
          {/* CSS animation: bob up and down */}
          <div
            className="tag-float"
            style={{ animationDuration: `${off.dur}s`, animationDelay: `${off.delay}s` }}
          >
            {/* Framer Motion: hover effect only */}
            <motion.div
              className="glass rounded-full px-4 py-2 cursor-default"
              style={{ border: '1px solid rgba(192,132,252,0.18)' }}
              whileHover={{
                borderColor: 'rgba(245,158,11,0.4)',
                boxShadow: '0 0 16px rgba(245,158,11,0.12)',
                scale: 1.05,
              }}
            >
              <span className="text-xs tracking-wide whitespace-nowrap" style={{ color: 'rgba(221,214,254,0.6)' }}>
                {title}
              </span>
            </motion.div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

const Hero = () => {
  const { personal } = CONTENT;

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="section w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: main content */}
          <div className="max-w-2xl">
            <motion.p
              className="text-xs tracking-[0.4em] uppercase mb-7"
              style={{ color: 'rgba(245,158,11,0.55)' }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {personal.location}
            </motion.p>

            <motion.h1
              className="font-display font-bold leading-[1.1] mb-5"
              style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="text-gradient">{personal.name}</span>
            </motion.h1>

            <motion.p
              className="text-sm md:text-base leading-relaxed mb-11 max-w-lg"
              style={{ color: 'rgba(221,214,254,0.5)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
            >
              {personal.tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
            >
              <a
                href={personal.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(245,158,11,0.25))',
                  border: '1px solid rgba(245,158,11,0.3)',
                  color: '#fde68a',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 28px rgba(245,158,11,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
              >
                Resume
              </a>
              <Link
                to="contact"
                smooth duration={700} offset={-70}
                className="px-7 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium cursor-pointer transition-all duration-300"
                style={{ border: '1px solid rgba(192,132,252,0.25)', color: '#c084fc' }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 22px rgba(168,85,247,0.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
              >
                Get in touch
              </Link>
            </motion.div>
          </div>

          {/* Right: floating tags */}
          <motion.div
              className="hidden md:block relative"
              style={{ height: '420px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              <FloatingTags titles={personal.titles} />
            </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: 'rgba(221,214,254,0.2)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-10"
          style={{ background: 'linear-gradient(180deg, rgba(192,132,252,0.35) 0%, transparent 100%)' }}
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
