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

// Pellet/tag style hot takes
const HotTakes = ({ hotTakes }) => (
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
);

const About = () => {
  const { personal, funFacts, hotTakes } = CONTENT;

  return (
    <section id="about" className="relative">
      <div className="divider" />
      <div className="section">
        {/* Header + bio + photo */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            <div>
              <p
                className="text-xs tracking-[0.4em] uppercase mb-3"
                style={{ color: 'rgba(245,158,11,0.55)' }}
              >
                About
              </p>
              <h2
                className="font-display font-bold text-gradient mb-5"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
              >
                Who I am
              </h2>
            </div>
            <p className="leading-relaxed text-base" style={{ color: 'rgba(221,214,254,0.75)' }}>
              {personal.bio}
            </p>
            <p className="leading-relaxed text-sm" style={{ color: 'rgba(221,214,254,0.45)' }}>
              I love building across the stack: mobile apps, cloud infrastructure, AI pipelines, you
              name it. If there&apos;s a problem worth solving, I want to figure out how :)
            </p>
          </motion.div>

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative mt-6"
          >
            <div
              className="mx-auto rounded-2xl overflow-hidden glass"
              style={{
                boxShadow: '0 0 50px rgba(124,58,237,0.12), 0 0 100px rgba(245,158,11,0.04)',
              }}
            >
              <img
                src="/assets/Grad.jpg"
                alt="Anushka Nilangekar"
                className="w-full object-cover"
              />
            </div>
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
          <h3 className="font-display text-xl mb-8" style={{ color: '#c084fc' }}>
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
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(221,214,254,0.6)' }}>
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
          <h3 className="font-display text-base mb-5" style={{ color: 'rgba(245,158,11,0.7)' }}>
            Hot takes 🌶
          </h3>
          <HotTakes hotTakes={hotTakes} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
