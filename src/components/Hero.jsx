import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Compass, Wand2, Smile, Heart, Flame } from 'lucide-react';
import PipSvg from './PipSvg';
import { useSound } from '../context/SoundContext';
import './Hero.css';

export default function Hero({
  isNight,
  pipRef,
  pupilOffset,
  capClicks,
  onCapClick,
  dreamsDelivered,
  onIncrementDream,
  odometerBurst
}) {
  const { playPop, playMagic } = useSound();
  const [burstParticles, setBurstParticles] = useState([]);
  const hasBurstRef = useRef(false);

  useEffect(() => {
    if (odometerBurst && !hasBurstRef.current) {
      hasBurstRef.current = true;
      const colors = ['#ffd166', '#a34063', '#f472b6', '#34d399', '#60a5fa', '#f59e0b', '#ffffff'];
      
      const particles = Array.from({ length: 38 }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / 38 + (Math.random() - 0.5) * 0.4;
        const velocity = 80 + Math.random() * 160;
        return {
          id: i,
          dx: Math.cos(angle) * velocity,
          dy: Math.sin(angle) * velocity - 40,
          rotate: Math.random() * 720 - 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 6 + 5,
          isStrip: Math.random() > 0.4
        };
      });

      setBurstParticles(particles);

      setTimeout(() => {
        setBurstParticles([]);
      }, 1600);
    }

    if (!odometerBurst) {
      hasBurstRef.current = false;
    }
  }, [odometerBurst]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid">
        
        {/* Left Side: Pip Character Frame */}
        <div className="hero-avatar-area">
          <div className="hero-tap-hint font-bubbly">
            <span>⭐ Tap nightcap!</span>
            {capClicks > 0 && <span>({capClicks}/5)</span>}
          </div>

          <div
            ref={pipRef}
            className="pip-frame"
            style={{
              position: 'relative',
              width: '320px',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              className={`hero-glow-backdrop ${isNight ? 'night' : 'day'}`}
              style={{
                position: 'absolute',
                inset: '10px',
                borderRadius: '50%',
                filter: 'blur(35px)',
                opacity: 0.6,
                background: isNight
                  ? 'radial-gradient(circle, #a34063, #ffd166)'
                  : 'radial-gradient(circle, #fde68a, #fbcfe8)'
              }}
            />
            <PipSvg pupilOffset={pupilOffset} onCapClick={onCapClick} />
          </div>

          <div className="hero-quote-badge font-serif-dream">
            “Even the smallest skull can hold the sweetest dreams.”
          </div>
        </div>

        {/* Right Side: Introduction & Odometer */}
        <div className="hero-text-area">
          <div className="hero-pill-badge font-bubbly">
            <Sparkles size={14} />
            Track 1 • haX.baby Sprint
          </div>

          <h1 className="hero-headline font-serif-dream">
            Pip, the <span className="hero-headline-accent">Skull Baby</span>
          </h1>

          <h2 className="hero-role-title font-bubbly">
            <Compass size={20} />
            Junior Dream Engineer @ Midnight Nursery
          </h2>

          <p className="hero-bio">
            Hello, sleepy traveler! I’m Pip. While the world doses off, I weave lullabies with spun moonlight, polish glowing nightlights, and chart starry delivery routes to make sure every tired creature gets soft, sweet rest.
          </p>

          <div className="hero-btn-row">
            <a href="#projects" onClick={playMagic} className="btn-primary-dream font-bubbly">
              <Wand2 size={16} />
              Explore My Dreams
            </a>

            <a href="#about" onClick={playPop} className="btn-secondary-meet font-bubbly">
              <Smile size={16} />
              Meet Pip
            </a>
          </div>

          <div className="odometer-strip">
            <span className="font-bubbly" style={{ fontSize: '0.85rem', opacity: 0.85 }}>
              {odometerBurst ? '🎉 5K CELEBRATION:' : 'Nursery Delivery Odometer:'}
            </span>

            <div className={`odometer-dial-container ${odometerBurst ? 'dial-burst-active' : ''}`}>
              {burstParticles.map((p) => (
                <span
                  key={p.id}
                  className="odometer-confetti-particle"
                  style={{
                    '--pdx': `${p.dx}px`,
                    '--pdy': `${p.dy}px`,
                    '--protate': `${p.rotate}deg`,
                    backgroundColor: p.color,
                    width: `${p.size}px`,
                    height: p.isStrip ? `${p.size * 2}px` : `${p.size}px`,
                    borderRadius: p.isStrip ? '2px' : '50%'
                  }}
                />
              ))}

              {odometerBurst && (
                <div className="smoke-cloud-puff">💥</div>
              )}

              <div className="odometer-dial font-mono">
                {String(dreamsDelivered).padStart(6, '0')}
              </div>
              
              {odometerBurst && (
                <div className="odometer-burst-tag font-bubbly">
                  <Flame size={12} color="#ffd166" /> 5,000 DREAMS REACHED!
                </div>
              )}
            </div>

            <button
              onClick={() => {
                playPop();
                onIncrementDream();
              }}
              className="btn-deliver-plus font-bubbly"
            >
              <Heart size={14} fill="#a34063" color="#a34063" /> Deliver +1 Dream
            </button>

            <span style={{ fontSize: '11px', opacity: 0.55, fontStyle: 'italic' }}>
              {odometerBurst ? '(Milestone Celebration ✨)' : '(Demo Counter)'}
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}