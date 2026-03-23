import React from 'react';
import { CONTENT } from '../data/content';

const Footer = () => {
  const { personal } = CONTENT;

  return (
    <footer className="relative py-10">
      <div className="divider mb-8" />
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
        <span className="font-display text-amethyst-pale/25 text-sm">
          © {new Date().getFullYear()} {personal.name}
        </span>
        <span
          className="text-xs tracking-[0.2em] lowercase"
          style={{ color: 'rgba(245,158,11,0.25)' }}
        >
          crafted with love from my amethyst cave :)
        </span>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-3 flex justify-center">
        <span className="text-xs" style={{ color: 'rgba(192,132,252,0.2)' }}>
          ♪ background music: &quot;wizard&apos;s apprentice&quot; by michael ghelfi &amp; filip
          melvan · magical music collection, vol. 1 · ℗ michael ghelfi studios
        </span>
      </div>
    </footer>
  );
};

export default Footer;
