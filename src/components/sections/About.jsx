import React from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../../data/content';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const About = () => {
  const { personal, funFacts, hotTakes } = CONTENT;

  return (
    <section id="about" className="relative">
      <div className="divider" />
      <div className="section">
        {/* Heading */}
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
            About
          </p>
          <h2
            className="font-display font-bold text-gradient"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Who I am
          </h2>
        </motion.div>

        {/* Bio + photo */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <p
              className="leading-relaxed text-base"
              style={{ color: 'rgba(221,214,254,0.75)' }}
            >
              {personal.bio}
            </p>
            <p
              className="leading-relaxed text-sm"
              style={{ color: 'rgba(221,214,254,0.45)' }}
            >
              I love building across the stack: mobile apps, cloud
              infrastructure, AI pipelines, you name it. If there's a problem
              worth solving, I want to figure out how :)
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div
              className="aspect-square max-w-[300px] mx-auto rounded-2xl overflow-hidden glass"
              style={{
                boxShadow:
                  '0 0 50px rgba(124,58,237,0.12), 0 0 100px rgba(245,158,11,0.04)',
              }}
            >
              <img
                src="/assets/Grad 1.jpg"
                alt="Anushka Nilangekar"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-3 -right-3 w-16 h-16 glass rounded-xl flex items-center justify-center text-2xl"
              style={{ border: '1px solid rgba(245,158,11,0.2)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              💻
            </motion.div>
          </motion.div>
        </div>

        {/* Fun facts */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h3
            className="font-display text-xl mb-8"
            style={{ color: '#c084fc' }}
          >
            A few things about me
          </h3>

          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {funFacts.map((fact, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass rounded-xl p-4 hover-glow transition-all duration-300"
                whileHover={{ y: -4 }}
              >
                <div className="text-xl mb-2">{fact.emoji}</div>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: 'rgba(221,214,254,0.6)' }}
                >
                  {fact.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hot takes */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-2xl p-6"
          style={{ border: '1px solid rgba(245,158,11,0.1)' }}
        >
          <h3
            className="font-display text-base mb-4"
            style={{ color: 'rgba(245,158,11,0.7)' }}
          >
            Hot takes 🌶
          </h3>
          <div className="flex flex-wrap gap-3">
            {hotTakes.map((take, i) => (
              <span
                key={i}
                className="px-4 py-1.5 rounded-full text-xs"
                style={{
                  border: '1px solid rgba(245,158,11,0.18)',
                  background: 'rgba(245,158,11,0.04)',
                  color: 'rgba(221,214,254,0.6)',
                }}
              >
                {take}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
