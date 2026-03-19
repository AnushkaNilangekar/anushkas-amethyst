import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../../data/content';

const Experience = () => {
  const { experience } = CONTENT;

  return (
    <section id="experience" className="relative">
      <div className="divider" />
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-3"
            style={{ color: 'rgba(245,158,11,0.55)' }}
          >
            Experience
          </p>
          <h2
            className="font-display font-bold text-gradient"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Where I've worked
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute top-0 bottom-0"
            style={{
              left: '0.5rem',
              width: '1px',
              background:
                'linear-gradient(180deg, rgba(192,132,252,0.35) 0%, rgba(245,158,11,0.15) 100%)',
            }}
          />

          <div className="space-y-8 pl-10">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute rounded-full bg-amethyst"
                  style={{
                    left: '-2.1rem',
                    top: '1.4rem',
                    width: '10px',
                    height: '10px',
                    border: '2px solid rgba(245,158,11,0.4)',
                    boxShadow: '0 0 8px rgba(124,58,237,0.4)',
                  }}
                />

                <div className="glass rounded-xl p-6 hover-glow transition-all duration-300">
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                    <div>
                      <h3
                        className="font-display text-lg font-semibold"
                        style={{ color: '#ddd6fe' }}
                      >
                        {exp.role}
                      </h3>
                      <p
                        className="text-sm mt-0.5"
                        style={{ color: 'rgba(245,158,11,0.65)' }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span
                      className="text-xs tracking-wide"
                      style={{ color: 'rgba(221,214,254,0.3)' }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-sm leading-relaxed"
                        style={{ color: 'rgba(221,214,254,0.5)' }}
                      >
                        <span
                          className="shrink-0 mt-1"
                          style={{ color: 'rgba(245,158,11,0.45)' }}
                        >
                          ▸
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
