import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { CONTENT } from '../../data/content';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

const LINKS = [
  {
    label: 'Email',
    icon: '✉',
    getHref: (p) => `mailto:${p.email}`,
    getText: (p) => p.email,
    target: '_self',
  },
  {
    label: 'LinkedIn',
    faIcon: faLinkedinIn,
    getHref: (p) => p.linkedin,
    getText: () => 'linkedin.com/in/anushka-nilangekar',
    target: '_blank',
  },
  {
    label: 'GitHub',
    faIcon: faGithub,
    getHref: (p) => p.github,
    getText: () => 'github.com/AnushkaNilangekar',
    target: '_blank',
  },
  {
    label: 'Resume',
    icon: '↗',
    getHref: (p) => p.resume,
    getText: () => 'View resume',
    target: '_blank',
  },
];

const Contact = () => {
  const { personal } = CONTENT;
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return;
    setStatus('sending');

    const templateParams = {
      from_name: form.name || 'Anonymous',
      from_email: form.email || 'hidden',
      message: form.message,
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative">
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
            style={{ color: 'rgba(245,158,11,0.75)' }}
          >
            Contact
          </p>
          <h2
            className="font-display font-bold text-gradient mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
          >
            Let&apos;s talk
          </h2>
          <p className="text-sm" style={{ color: 'rgba(221,214,254,0.4)' }}>
            Open to opportunities, collabs, coffee chats, or a debate on hot takes.{' '}
            <span style={{ color: 'rgba(192,132,252,0.5)' }}>
              Or ask the oracle in the corner 🔮👀.
            </span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Links */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-5"
          >
            {LINKS.map(({ label, icon, faIcon, getHref, getText, target }) => (
              <a
                key={label}
                href={getHref(personal)}
                target={target}
                rel="noopener noreferrer"
                className="flex items-center gap-4 group no-underline"
                style={{ textDecoration: 'none' }}
              >
                <div
                  className="w-10 h-10 glass rounded-full flex items-center justify-center transition-all duration-200 shrink-0"
                  style={{ color: '#f59e0b', fontSize: faIcon ? '0.75rem' : '0.9rem' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fde68a')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#f59e0b')}
                >
                  {faIcon ? <FontAwesomeIcon icon={faIcon} /> : icon}
                </div>
                <span
                  className="text-sm transition-colors duration-200"
                  style={{ color: 'rgba(253,230,138,0.7)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fde68a')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253,230,138,0.7)')}
                >
                  {getText(personal)}
                </span>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4"
          >
            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-xl p-10 text-center"
              >
                <p className="text-2xl mb-3">✨</p>
                <p className="text-sm" style={{ color: 'rgba(221,214,254,0.7)' }}>
                  Message received. I&apos;ll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-[10px] tracking-widest uppercase mb-1.5"
                      style={{ color: 'rgba(221,214,254,0.35)' }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-[10px] tracking-widest uppercase mb-1.5"
                      style={{ color: 'rgba(221,214,254,0.35)' }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="input-field"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-[10px] tracking-widest uppercase mb-1.5"
                    style={{ color: 'rgba(221,214,254,0.35)' }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="input-field resize-none"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>

                {status === 'error' && (
                  <p className="text-xs" style={{ color: 'rgba(245,158,11,0.7)' }}>
                    Something went wrong — try emailing directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 rounded-full text-xs tracking-widest uppercase font-medium transition-all duration-300"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(245,158,11,0.25))',
                    border: '1px solid rgba(245,158,11,0.28)',
                    color: '#fde68a',
                    opacity: status === 'sending' ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow = '0 0 28px rgba(245,158,11,0.18)')
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  {status === 'sending' ? 'Sending...' : 'Send message'}
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
