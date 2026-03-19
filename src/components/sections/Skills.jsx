import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../../data/content';

const Skills = () => {
  const { skills } = CONTENT;

  return (
    <section id="skills" className="relative">
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
            Skills
          </p>
          <h2
            className="font-display font-bold text-gradient"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            What I work with
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass rounded-xl p-5 hover-glow transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <h3
                className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4"
                style={{ color: 'rgba(245,158,11,0.6)' }}
              >
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, j) => (
                  <motion.span
                    key={j}
                    className="px-3 py-1 rounded-full text-xs cursor-default"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(192,132,252,0.14)',
                      color: 'rgba(221,214,254,0.6)',
                    }}
                    whileHover={{
                      borderColor: 'rgba(192,132,252,0.4)',
                      color: '#ddd6fe',
                      scale: 1.04,
                    }}
                    transition={{ duration: 0.15 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
