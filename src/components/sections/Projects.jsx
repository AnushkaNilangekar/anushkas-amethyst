import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { CONTENT } from '../../data/content';

const Projects = () => {
  const { projects } = CONTENT;

  return (
    <section id="projects" className="relative">
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
            Work
          </p>
          <h2
            className="font-display font-bold text-gradient"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Things I've built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="glass rounded-2xl overflow-hidden group hover-glow transition-all duration-300"
              whileHover={{ y: -6 }}
            >
              {/* Preview image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, #0a0514 0%, rgba(10,5,20,0.5) 50%, transparent 100%)',
                  }}
                />
                {/* Link icons (appear on hover) */}
                <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 glass rounded-full flex items-center justify-center transition-colors duration-200"
                      style={{ color: 'rgba(221,214,254,0.7)' }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = '#f59e0b')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'rgba(221,214,254,0.7)')
                      }
                    >
                      <FontAwesomeIcon icon={faGithub} className="text-xs" />
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 glass rounded-full flex items-center justify-center transition-colors duration-200"
                      style={{ color: 'rgba(221,214,254,0.7)' }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = '#f59e0b')
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = 'rgba(221,214,254,0.7)')
                      }
                    >
                      <FontAwesomeIcon
                        icon={faArrowUpRightFromSquare}
                        className="text-[10px]"
                      />
                    </a>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div className="p-5">
                <h3
                  className="font-display text-base font-semibold mb-2"
                  style={{ color: '#ddd6fe' }}
                >
                  {project.title}
                </h3>
                <p
                  className="text-xs leading-relaxed mb-4"
                  style={{ color: 'rgba(221,214,254,0.45)' }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-full text-[10px]"
                      style={{
                        background: 'rgba(124,58,237,0.18)',
                        border: '1px solid rgba(192,132,252,0.18)',
                        color: '#c084fc',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
