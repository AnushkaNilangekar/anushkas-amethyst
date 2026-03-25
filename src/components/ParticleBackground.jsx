import React, { useEffect, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const PARTICLE_OPTIONS = {
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    number: { value: 55, density: { enable: true, area: 900 } },
    color: { value: ['#c084fc', '#f59e0b', '#ffffff', '#ddd6fe', '#14b8a6'] },
    shape: { type: ['circle', 'star'] },
    opacity: {
      value: { min: 0.08, max: 0.35 },
      animation: { enable: true, speed: 0.4, sync: false },
    },
    size: {
      value: { min: 0.8, max: 2.5 },
      animation: { enable: true, speed: 0.8, sync: false },
    },
    move: {
      enable: true,
      direction: 'bottom',
      speed: { min: 0.2, max: 0.7 },
      straight: false,
      random: true,
      warp: false,
      outModes: { default: 'out', top: 'none' },
    },
    twinkle: {
      particles: { enable: true, frequency: 0.04, opacity: 0.9 },
    },
  },
  detectRetina: true,
};

const ParticleBackground = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      options={PARTICLE_OPTIONS}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default React.memo(ParticleBackground);
