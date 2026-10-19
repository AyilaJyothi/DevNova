import React from 'react';
import { Moon, Sun, Volume2, VolumeX, PartyPopper } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import './Navbar.css';

export default function Navbar({ isNight, onToggleTheme, chaosMode, onToggleChaos }) {
  const { isMuted, toggleMute, playPop, playMagic } = useSound();

  return (
    <header className={`navbar-header ${isNight ? 'night' : 'day'}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="#hero" className="navbar-brand" onClick={playPop}>
            <div className="navbar-logo-box">
              <Moon className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="navbar-title font-serif-dream">Pip</span>
              <span className="navbar-subtitle font-bubbly">Midnight Nursery</span>
            </div>
          </a>

          <div className="navbar-duty-badge font-bubbly">
            <span className="navbar-duty-dot" />
            <span>Shift: On Duty (Dreaming ✨)</span>
          </div>
        </div>

        <nav className="navbar-nav font-bubbly">
          <a href="#about" onClick={playPop}>About Pip</a>
          <a href="#projects" onClick={playPop}>Dream Lab</a>
          <a href="#story" onClick={playPop}>Origin Story</a>
          <a href="#guestbook" onClick={playPop}>Guestbook</a>
        </nav>

        <div className="navbar-actions">
          <button
            onClick={() => {
              playMagic();
              onToggleTheme();
            }}
            className="btn-icon-toggle"
            title={`Switch to ${isNight ? 'Day Nursery' : 'Midnight Nursery'}`}
          >
            {isNight ? <Moon size={18} color="#ffd166" /> : <Sun size={18} color="#f59e0b" />}
          </button>

          <button
            onClick={toggleMute}
            className={`btn-icon-toggle ${isMuted ? 'muted' : ''}`}
            title={isMuted ? "Unmute chimes" : "Mute chimes"}
          >
            {isMuted ? <VolumeX size={18} color="#f87171" /> : <Volume2 size={18} />}
          </button>

          <button
            onClick={() => {
              playMagic();
              onToggleChaos();
            }}
            className={`btn-chaos-toggle font-bubbly ${chaosMode ? 'active' : ''}`}
          >
            <PartyPopper size={16} />
            <span>{chaosMode ? 'Chaos Active!' : 'Chaos Mode'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}