import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Lenis from 'lenis';
import { Howl } from 'howler';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import ClickSparkles from './components/ClickSparkles';
import CrystalOracle from './components/CrystalOracle';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/Footer';
import SocialSidebar from './components/SocialSidebar';
import './styles/globals.css';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [playing, setPlaying] = useState(false);
  const musicRef = useRef(null);

  useEffect(() => {
    musicRef.current = new Howl({
      src: ['/assets/bg-music.mp3'],
      loop: true,
      volume: 0.25,
    });
    return () => musicRef.current?.unload();
  }, []);

  const handleEnter = () => {
    setShowSplash(false);
    // Start music on Enter
    if (musicRef.current && !playing) {
      musicRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!musicRef.current) return;
    if (playing) {
      musicRef.current.pause();
    } else {
      musicRef.current.play();
    }
    setPlaying((p) => !p);
  };

  useEffect(() => {
    if (showSplash) return;
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [showSplash]);

  return (
    <>
      <Splash onEnter={handleEnter} />
      <ClickSparkles />

      <div style={{ visibility: showSplash ? 'hidden' : 'visible' }}>
        <ParticleBackground />
        <Navbar playing={playing} toggleMusic={toggleMusic} />
        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <CrystalOracle />
        <SocialSidebar />
      </div>
      <Analytics />
    </>
  );
}

export default App;
