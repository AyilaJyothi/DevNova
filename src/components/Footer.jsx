import React from 'react';
import { Moon } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import './Footer.css';

export default function Footer({ isNight }) {
  const { playPop } = useSound();

  return (
    <footer className={`footer-wrapper ${isNight ? 'night' : 'day'}`}>
      <div className="footer-content">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <Moon size={16} color="#ffd166" fill="#ffd166" />
            <span className="font-serif-dream" style={{ fontWeight: 700 }}>Pip’s Dream Station</span>
          </div>
          <p className="font-bubbly" style={{ fontSize: '0.75rem', opacity: 0.75 }}>
            Made with love at Midnight Nursery 🌙 • haX.baby Sprint 2026
          </p>
        </div>

        <div className="footer-nav font-bubbly">
          <a href="#hero" onClick={playPop}>Top</a>
          <a href="#about" onClick={playPop}>About</a>
          <a href="#projects" onClick={playPop}>Projects</a>
          <a href="#story" onClick={playPop}>Story</a>
          <a href="#guestbook" onClick={playPop}>Guestbook</a>
        </div>

        <div style={{ fontSize: '11px', fontFamily: 'monospace', opacity: 0.6 }}>
          Colors: #fff8f1 • #a34063 • #5c4033
        </div>
      </div>
    </footer>
  );
}