import React, { createContext, useContext, useRef, useState, useCallback } from 'react';

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);

  const initContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  const playChime = useCallback((freq = 523.25, type = 'sine', duration = 0.6) => {
    if (isMuted) return;
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, [isMuted, initContext]);

  const playPop = useCallback(() => {
    if (isMuted) return;
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(480, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {}
  }, [isMuted, initContext]);

  const playMagic = useCallback(() => {
    if (isMuted) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      setTimeout(() => playChime(freq, 'sine', 0.8), idx * 80);
    });
  }, [isMuted, playChime]);

  const playCelebrationBlast = useCallback(() => {
    if (isMuted) return;
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const oscPop = ctx.createOscillator();
      const gainPop = ctx.createGain();
      oscPop.type = 'triangle';
      oscPop.frequency.setValueAtTime(140, now);
      oscPop.frequency.exponentialRampToValueAtTime(620, now + 0.12);
      gainPop.gain.setValueAtTime(0.25, now);
      gainPop.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      oscPop.connect(gainPop);
      gainPop.connect(ctx.destination);
      oscPop.start(now);
      oscPop.stop(now + 0.15);

      const chimeNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      chimeNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + 0.08 + i * 0.04);
        gain.gain.setValueAtTime(0.18, now + 0.08 + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1 + i * 0.04);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.08 + i * 0.04);
        osc.stop(now + 1.2 + i * 0.04);
      });
    } catch {}
  }, [isMuted, initContext]);

  const playPlaneSputter = useCallback(() => {
    if (isMuted) return;
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [0, 0.18, 0.36, 0.55].forEach((delay) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110 - delay * 60, now + delay);
        gain.gain.setValueAtTime(0.12, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + delay);
        osc.stop(now + delay + 0.12);
      });

      setTimeout(() => {
        const boing = ctx.createOscillator();
        const boingGain = ctx.createGain();
        boing.type = 'sine';
        boing.frequency.setValueAtTime(220, ctx.currentTime);
        boing.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.25);
        boingGain.gain.setValueAtTime(0.15, ctx.currentTime);
        boingGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
        boing.connect(boingGain);
        boingGain.connect(ctx.destination);
        boing.start();
        boing.stop(ctx.currentTime + 0.4);
      }, 1400);
    } catch {}
  }, [isMuted, initContext]);

  const playOdometerBurst = useCallback(() => {
    if (isMuted) return;
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.45);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);
    } catch {}
  }, [isMuted, initContext]);

  const playChaosFanfare = useCallback((isActivating = true) => {
    if (isMuted) return;
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const fanfareNotes = isActivating 
        ? [440, 554.37, 659.25, 880, 1108.73, 1318.51] 
        : [880, 659.25, 523.25];

      fanfareNotes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = isActivating ? 'square' : 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.08, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.07 + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.22);
      });
    } catch {}
  }, [isMuted, initContext]);

  const playNote = useCallback((frequency, duration = 0.9) => {
    if (isMuted) return;
    initContext();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {}
  }, [isMuted, initContext]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (prev) playPop();
      return !prev;
    });
  }, [playPop]);

  return (
    <SoundContext.Provider value={{ 
      isMuted, 
      toggleMute, 
      playChime, 
      playPop, 
      playMagic, 
      playCelebrationBlast, 
      playChaosFanfare,
      playPlaneSputter,
      playOdometerBurst,
      playNote 
    }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}