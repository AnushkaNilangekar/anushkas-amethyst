import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    musicRef.current = new Howl({
      src: ['/assets/background-music-2.mp3'],
      loop: true,
      volume: 0.25,
    });
    return () => {
      musicRef.current?.unload();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMusic = () => {
    if (!musicRef.current) return;
    if (playing) {
      musicRef.current.pause();
    } else {
      musicRef.current.play();
    }
    setPlaying((p) => !p);
  };

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
                className="text-xs tracking-widest uppercase text-amethyst-pale/50 hover:text-gold-light transition-colors duration-200 cursor-pointer"
                activeClass="!text-gold-light"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/* Music toggle */}
          <button
            onClick={toggleMusic}
            title={playing ? 'Pause music' : 'Play music'}
            className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
            style={{
              border: '1px solid rgba(192,132,252,0.2)',
              background: 'transparent',
              color: playing ? '#f59e0b' : 'rgba(221,214,254,0.4)',
              fontSize: '0.7rem',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = 'rgba(245,158,11,0.35)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = 'rgba(192,132,252,0.2)')
            }
          >
            {playing ? '⏸' : '♪'}
          </button>

          {/* Hamburger (mobile) */}
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
                className="text-xs tracking-widest uppercase text-amethyst-pale/50 hover:text-gold-light transition-colors cursor-pointer"
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
