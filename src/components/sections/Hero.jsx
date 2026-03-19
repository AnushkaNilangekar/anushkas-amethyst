import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { CONTENT } from '../../data/content';

const useTypewriter = (strings) => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'waiting' | 'deleting'

  useEffect(() => {
    const current = strings[index];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          65
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase('deleting'), 2200);
        return () => clearTimeout(t);
      }
    }

    if (phase === 'deleting') {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length - 1)),
          38
        );
        return () => clearTimeout(t);
      } else {
        setIndex((i) => (i + 1) % strings.length);
        setPhase('typing');
      }
    }
  }, [displayed, phase, index, strings]);

  return displayed;
};

const Hero = () => {
  const { personal } = CONTENT;
  const title = useTypewriter(personal.titles);

  return (
    <section id="hero" className="relative min-h-screen flex items-center">
      <div className="section w-full">
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

          {/* Typewriter */}
          <motion.div
            className="h-9 flex items-center mb-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <span
              className="font-display italic font-light"
              style={{
                fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                color: '#c084fc',
              }}
            >
              {title}
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                style={{ color: '#f59e0b' }}
              >
                |
              </motion.span>
            </span>
          </motion.div>

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
                background:
                  'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(245,158,11,0.25))',
                border: '1px solid rgba(245,158,11,0.3)',
                color: '#fde68a',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 0 28px rgba(245,158,11,0.2)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = 'none')
              }
            >
              Resume
            </a>
            <Link
              to="contact"
              smooth
              duration={700}
              offset={-70}
              className="px-7 py-2.5 rounded-full text-xs tracking-widest uppercase font-medium cursor-pointer transition-all duration-300"
              style={{
                border: '1px solid rgba(192,132,252,0.25)',
                color: '#c084fc',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow =
                  '0 0 22px rgba(168,85,247,0.15)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = 'none')
              }
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ color: 'rgba(221,214,254,0.25)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <span className="text-[10px] tracking-[0.35em] uppercase">Scroll</span>
          <motion.div
            className="w-px h-10"
            style={{
              background:
                'linear-gradient(180deg, rgba(192,132,252,0.4) 0%, transparent 100%)',
            }}
            animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 0.2, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
