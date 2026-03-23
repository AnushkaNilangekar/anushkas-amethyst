import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_PROMPT = `You are the Crystal Oracle, a mystical spirit that embodies Anushka Nilangekar's portfolio.
Anushka is a full stack software engineer based in San Jose, CA. She graduated from Purdue University with a BS in Computer Science (concentration: Software Engineering, minor: Psychology, GPA: 3.57).
She has experience at PolicyEngine (open-source Python/React), Indiana Farm Bureau Insurance (Java/Spring Boot), Sports.Excitement LLC (React frontend), and Nuvve Corp (ML research).
Her projects include NewsInsight (RAG/LangChain), ResHub (React Native/Spring Boot/AWS), Botaniq (Kotlin/Android), Moonships Game (Java/LibGDX), and a Shell Interpreter (C/C++).
Her skills span full-stack web, mobile (Android/React Native), cloud (AWS), and AI/ML.
Personally: she loves boba, chocolate chip cookies, Brooklyn Nine Nine, kdramas, spring, sudoku, board games, dancing, and crafts. She's a foodie (vegetarian). MBTI: ISFJ.
Answer questions about Anushka warmly and mystically, as if revealing truths from the crystal. Keep responses concise (2-4 sentences). If asked something you don't know, say the crystal is hazy on that topic.`;

const OrbPulse = ({ active }) => (
  <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
    {/* Outer glow rings */}
    <motion.div
      className="absolute inset-0 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute inset-2 rounded-full"
      style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)' }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.7, 0.3, 0.7] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
    />
    {/* Crystal orb */}
    <div
      className="w-16 h-16 rounded-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(circle at 35% 35%, rgba(221,214,254,0.4) 0%, rgba(124,58,237,0.6) 40%, rgba(76,29,149,0.9) 100%)',
        border: '1px solid rgba(192,132,252,0.5)',
        boxShadow: '0 0 30px rgba(124,58,237,0.4), inset 0 0 20px rgba(168,85,247,0.2)',
      }}
    >
      {/* Inner shimmer */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)' }}
        animate={{ opacity: active ? [0.4, 1, 0.4] : [0.2, 0.5, 0.2] }}
        transition={{ duration: active ? 0.8 : 2, repeat: Infinity }}
      />
    </div>
  </div>
);

const CrystalOracle = () => {
  const [open, setOpen]         = useState(false);
  const [input, setInput]       = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'oracle', text: data.text }]);
    } catch {
      setMessages((m) => [...m, { role: 'oracle', text: 'The crystal grows dim... try again shortly.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating orb trigger */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 35% 35%, rgba(221,214,254,0.3) 0%, rgba(124,58,237,0.7) 50%, rgba(76,29,149,0.9) 100%)',
          border: '1px solid rgba(192,132,252,0.4)',
          boxShadow: '0 0 24px rgba(124,58,237,0.35)',
        }}
        whileHover={{ scale: 1.1, boxShadow: '0 0 36px rgba(124,58,237,0.5)' }}
        whileTap={{ scale: 0.95 }}
        title="Ask the Oracle"
      >
        <motion.span
          style={{ fontSize: '1.3rem', filter: 'drop-shadow(0 0 6px rgba(192,132,252,0.8))' }}
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          🔮
        </motion.span>
      </motion.button>

      {/* Oracle panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-[340px] max-h-[520px] glass rounded-2xl flex flex-col overflow-hidden"
            style={{ border: '1px solid rgba(192,132,252,0.2)', boxShadow: '0 0 50px rgba(124,58,237,0.2)' }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-amethyst-light/10 flex items-center justify-between">
              <div>
                <p className="font-display text-sm font-semibold" style={{ color: '#ddd6fe' }}>
                  The Crystal Oracle
                </p>
                <p className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(245,158,11,0.5)' }}>
                  ask me anything about Anushka
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{ color: 'rgba(221,214,254,0.3)', background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center pt-4">
                  <OrbPulse active={false} />
                  <p className="text-xs" style={{ color: 'rgba(221,214,254,0.4)' }}>
                    The crystal awaits your question...
                  </p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className="max-w-[80%] rounded-xl px-3 py-2 text-xs leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? { background: 'rgba(124,58,237,0.25)', border: '1px solid rgba(192,132,252,0.2)', color: 'rgba(221,214,254,0.8)' }
                        : { background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.15)', color: 'rgba(221,214,254,0.75)' }
                    }
                  >
                    {msg.role === 'oracle' && (
                      <span style={{ color: 'rgba(245,158,11,0.6)', fontSize: '0.65rem', marginRight: '0.4rem' }}>🔮</span>
                    )}
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass rounded-xl px-3 py-2" style={{ border: '1px solid rgba(245,158,11,0.15)' }}>
                    <motion.div
                      className="flex gap-1"
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                    >
                      {[0, 1, 2].map((d) => (
                        <div key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: '#c084fc' }} />
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-amethyst-light/10 flex gap-2">
              <input
                className="input-field flex-1 text-xs py-2"
                placeholder="Ask the crystal..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="px-3 py-2 rounded-lg text-xs transition-all duration-200"
                style={{
                  background: input.trim() ? 'rgba(124,58,237,0.35)' : 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(192,132,252,0.2)',
                  color: input.trim() ? '#ddd6fe' : 'rgba(221,214,254,0.3)',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                ✦
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CrystalOracle;
