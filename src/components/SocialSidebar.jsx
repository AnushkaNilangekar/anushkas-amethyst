import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { CONTENT } from '../data/content';

const LINKS = [
  { icon: faGithub,     getHref: (p) => p.github,            label: 'GitHub',   blank: true  },
  { icon: faLinkedinIn, getHref: (p) => p.linkedin,          label: 'LinkedIn', blank: true  },
  { icon: faEnvelope,   getHref: (p) => `mailto:${p.email}`, label: 'Email',    blank: false },
];

export default function SocialSidebar() {
  const { personal } = CONTENT;
  const [atContact, setAtContact] = useState(false);

  useEffect(() => {
    const el = document.getElementById('contact');
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setAtContact(e.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      className="fixed left-8 bottom-0 z-40 hidden md:flex flex-col items-center gap-5"
      animate={{ opacity: atContact ? 0 : 1, y: atContact ? 20 : 0 }}
      transition={{ duration: 0.45, ease: 'easeInOut' }}
      style={{ pointerEvents: atContact ? 'none' : 'auto' }}
    >
      {LINKS.map(({ icon, getHref, label, blank }) => (
        <a
          key={label}
          href={getHref(personal)}
          target={blank ? '_blank' : '_self'}
          rel="noopener noreferrer"
          aria-label={label}
          className="transition-colors duration-200"
          style={{ color: 'rgba(192,132,252,0.45)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#f59e0b')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(192,132,252,0.45)')}
        >
          <FontAwesomeIcon icon={icon} style={{ fontSize: '0.88rem' }} />
        </a>
      ))}
      {/* Vertical line */}
      <div
        style={{
          width: 1,
          height: 72,
          background: 'linear-gradient(180deg, rgba(192,132,252,0.28) 0%, transparent 100%)',
        }}
      />
    </motion.div>
  );
}
