import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = ({ playing, toggleMusic }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-amethyst-light/10' : 'bg-transparent'
      }`}
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="hero" smooth duration={600} className="cursor-pointer">
          <span
            className="font-display text-xl font-bold text-gradient select-none"
            style={{ letterSpacing: '0.05em' }}
          >
            AN
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <Link
                to={item.id}
                spy
                smooth
                duration={600}
                offset={-70}
                className="text-xs tracking-widest uppercase transition-colors duration-200 cursor-pointer"
                style={{ color: 'rgba(221,214,254,0.45)' }}
                activeClass="!text-gold-light"
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fde68a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(221,214,254,0.45)')}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Music toggle */}
          <button
            type="button"
            onClick={toggleMusic}
            onMouseDown={(e) => e.preventDefault()}
            title={playing ? 'Pause music' : 'Play music'}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              border: '1px solid rgba(245,158,11,0.45)',
              background: playing ? 'rgba(245,158,11,0.1)' : 'transparent',
              color: '#f59e0b',
              fontSize: '0.75rem',
              boxShadow: playing ? '0 0 12px rgba(245,158,11,0.2)' : 'none',
            }}
          >
            {playing ? '⏸' : '♪'}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-8 h-8"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{ background: 'transparent', border: 'none', padding: 0 }}
          >
            <motion.span
              className="block w-5 h-px bg-amethyst-pale/60"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
            />
            <motion.span
              className="block w-5 h-px bg-amethyst-pale/60"
              animate={{ opacity: menuOpen ? 0 : 1 }}
            />
            <motion.span
              className="block w-5 h-px bg-amethyst-pale/60"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden glass border-t border-amethyst-light/10 px-6 py-5 flex flex-col gap-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.id}
                to={item.id}
                spy
                smooth
                duration={600}
                offset={-70}
                onClick={() => setMenuOpen(false)}
                className="text-xs tracking-widest uppercase cursor-pointer transition-colors duration-200"
                style={{ color: 'rgba(221,214,254,0.45)' }}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
