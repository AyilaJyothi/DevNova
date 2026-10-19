import React, { useState, useEffect } from 'react';
import { Music, Radio, Bell, Sparkles, MapPin, CheckCircle2, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { SCALE_NOTES, ROUTES_LIST } from '../data/nurseryData';
import './Projects.css';

export default function Projects({
  isNight,
  activePreset,
  onSelectPreset,
  isPlayingMelody,
  onTogglePlayMelody,
  customSequence,
  onUpdateSequenceStep,
  currentStep,
  lanterns,
  onToggleLantern,
  onUpdateLanternGlow,
  selectedRoute,
  isDelivering,
  onDispatchRoute,
  deliveryLogs
}) {
  const { playNote, playPop } = useSound();
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, lanterns.length - visibleCount);

  const handlePrevLantern = () => {
    playPop();
    setCarouselIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextLantern = () => {
    playPop();
    setCarouselIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section id="projects" className="projects-section">
      
      <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 4rem' }}>
        <span className="section-tag font-bubbly">Dream Laboratory</span>
        <h2 className="section-title font-serif-dream" style={{ fontSize: '2.5rem' }}>Interactive Inventions</h2>
        <p style={{ marginTop: '0.75rem', opacity: 0.8 }}>
          Pip doesn’t just design static dreams. Every dream tool is tested and tuned for maximum coziness.
        </p>
      </div>

      <div>
        <div className="project-box" style={{ backgroundColor: isNight ? '#211833' : '#ffffff' }}>
          <div className="project-flex-layout">
            
            <div className="project-info-side">
              <div className="project-tag font-bubbly">
                <Music size={14} /> Project 01 • Sound Synthesizer
              </div>
              <h3 className="font-serif-dream" style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>
                The Lullaby Lab
              </h3>
              <p className="font-bubbly" style={{ fontSize: '0.88rem', lineHeight: 1.6, opacity: 0.8, marginBottom: '1.5rem' }}>
                A procedural celesta music box powered by Web Audio API. Tap individual keys to chime soothing frequencies, or play custom melodic sequences designed to slow restless heartbeats.
              </p>

              <div>
                <span className="font-bubbly" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.7, display: 'block', marginBottom: '0.5rem' }}>
                  Preset Sleep Modes:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['starlight', 'cloud', 'moonlight'].map((key) => (
                    <button
                      key={key}
                      onClick={() => onSelectPreset(key)}
                      className={`preset-btn font-bubbly ${activePreset === key ? 'active' : ''}`}
                    >
                      {key === 'starlight' && '✨ Starlight Waltz'}
                      {key === 'cloud' && '☁️ Cloud Float'}
                      {key === 'moonlight' && '☾ Moon Lullaby'}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <button onClick={onTogglePlayMelody} className="btn-play-box font-bubbly">
                  <Radio size={16} />
                  {isPlayingMelody ? 'Pause Music Box' : 'Play Music Box'}
                </button>
              </div>
            </div>

            <div className="project-interactive-side">
              <div className="sequencer-card" style={{ backgroundColor: isNight ? '#181126' : '#fffbeb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span className="font-bubbly" style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.7 }}>
                    8-Note Dream Sequence:
                  </span>
                  <span style={{ fontSize: '11px', opacity: 0.6, fontFamily: 'monospace' }}>
                    {isPlayingMelody ? `Step ${currentStep + 1}/8` : 'Tap steps to alter note'}
                  </span>
                </div>

                <div className="sequencer-grid">
                  {customSequence.map((noteIdx, stepIdx) => (
                    <button
                      key={stepIdx}
                      onClick={() => onUpdateSequenceStep(stepIdx)}
                      className={`sequencer-step-btn font-bubbly ${currentStep === stepIdx ? 'active-step' : ''}`}
                    >
                      <span>{SCALE_NOTES[noteIdx].name}</span>
                      <span style={{ fontSize: '9px', opacity: 0.6 }}>{stepIdx + 1}</span>
                    </button>
                  ))}
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <span className="font-bubbly" style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.7, display: 'block', marginBottom: '0.5rem' }}>
                    Direct Celesta Bell Keys (Click to Chime):
                  </span>
                  <div className="celesta-keys-grid font-bubbly">
                    {SCALE_NOTES.map((note) => (
                      <button
                        key={note.name}
                        onClick={() => playNote(note.freq, 1.1)}
                        className="celesta-key-btn"
                      >
                        <Bell size={16} color="#a34063" />
                        <span>{note.name}</span>
                        <span style={{ fontSize: '9px', opacity: 0.7 }}>{note.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="project-box" style={{ backgroundColor: isNight ? '#211833' : '#ffffff' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <div className="project-tag font-bubbly" style={{ backgroundColor: 'rgba(244, 114, 182, 0.2)', color: '#a34063' }}>
                <Sparkles size={14} /> Project 02 • Bioluminescent Lighting
              </div>
              <h3 className="font-serif-dream" style={{ fontSize: '1.75rem', margin: '0.4rem 0' }}>
                Nightlight Collection & Dream Lanterns
              </h3>
              <p className="font-bubbly" style={{ fontSize: '0.88rem', opacity: 0.8, maxWidth: '600px' }}>
                Click any lamp to turn it on or off. Drag the glow sliders to calibrate ambient light for toddlers scared of the dark.
              </p>
            </div>

            <div className="carousel-nav-controls">
              <button
                onClick={handlePrevLantern}
                disabled={carouselIndex === 0}
                className="carousel-arrow-btn"
                title="Previous Lanterns"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="carousel-counter font-bubbly">
                {carouselIndex + 1} - {Math.min(carouselIndex + visibleCount, lanterns.length)} of {lanterns.length}
              </span>
              <button
                onClick={handleNextLantern}
                disabled={carouselIndex >= maxIndex}
                className="carousel-arrow-btn"
                title="Next Lanterns"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="lanterns-carousel-viewport">
            <div
              className="lanterns-carousel-track"
              style={{
                transform: `translateX(-${carouselIndex * (100 / visibleCount)}%)`
              }}
            >
              {lanterns.map((lantern) => (
                <div
                  key={lantern.id}
                  className="lantern-carousel-item"
                  style={{
                    flex: `0 0 ${100 / visibleCount}%`
                  }}
                >
                  <div
                    className="lantern-card"
                    style={{
                      backgroundColor: lantern.active
                        ? (isNight ? '#2e1c47' : '#fffbeb')
                        : (isNight ? '#181126' : '#f5f5f4')
                    }}
                  >
                    <div
                      onClick={() => onToggleLantern(lantern.id)}
                      style={{ cursor: 'pointer', margin: '0.5rem 0' }}
                      title="Click to toggle light"
                    >
                      <svg width="100" height="120" viewBox="0 0 100 120" style={{ overflow: 'visible' }}>
                        <path d="M 25 35 Q 50 15 75 35 Z" fill="#5c4033" />
                        <circle cx="50" cy="20" r="5" fill="#ffd166" />
                        <line x1="50" y1="5" x2="50" y2="15" stroke="#5c4033" strokeWidth="3" />
                        <rect x="25" y="35" width="50" height="55" rx="10" fill="none" stroke="#5c4033" strokeWidth="3" />
                        <rect x="20" y="90" width="60" height="12" rx="4" fill="#5c4033" />

                        {lantern.active && (
                          <g>
                            <circle
                              cx="50"
                              cy="62"
                              r={14 + (lantern.glow / 10)}
                              fill={lantern.color}
                              opacity={lantern.glow / 100}
                              filter="blur(6px)"
                            />
                            <circle cx="50" cy="62" r="8" fill="#ffffff" />
                            <circle cx="42" cy="54" r="2" fill="#ffffff" opacity="0.8" />
                            <circle cx="58" cy="70" r="1.5" fill="#ffffff" opacity="0.8" />
                          </g>
                        )}
                      </svg>
                    </div>

                    <h4 className="font-serif-dream lantern-card-title">{lantern.name}</h4>
                    <p className="font-bubbly lantern-card-desc">{lantern.desc}</p>

                    <div className="lantern-slider-container">
                      <div className="font-bubbly lantern-slider-label">
                        <span>Intensity:</span>
                        <strong>{lantern.glow}%</strong>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={lantern.glow}
                        disabled={!lantern.active}
                        onChange={(e) => onUpdateLanternGlow(lantern.id, Number(e.target.value))}
                        className="lantern-slider-input"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="project-box" style={{ backgroundColor: isNight ? '#211833' : '#ffffff' }}>
          <div className="project-flex-layout">
            
            <div className="project-info-side">
              <div className="project-tag font-bubbly" style={{ backgroundColor: 'rgba(52, 211, 153, 0.2)', color: '#34d399' }}>
                <MapPin size={14} /> Project 03 • Star Logistics
              </div>
              <h3 className="font-serif-dream" style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>
                Dream Delivery Routes
              </h3>
              <p className="font-bubbly" style={{ fontSize: '0.88rem', lineHeight: 1.6, opacity: 0.8, marginBottom: '1.5rem' }}>
                Every night at midnight, Pip straps on his dream satchel and navigates the Sky Currents to hand-deliver lullabies and happy thoughts to slumbering fauna and human babes.
              </p>

              <div>
                <span className="font-bubbly" style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', opacity: 0.7, display: 'block', marginBottom: '0.5rem' }}>
                  Select A Destination:
                </span>
                {ROUTES_LIST.map((route) => (
                  <button
                    key={route.id}
                    onClick={() => onDispatchRoute(route)}
                    disabled={isDelivering}
                    className={`route-button font-bubbly ${selectedRoute?.id === route.id ? 'selected' : ''}`}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{route.title}</div>
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>{route.creature}</div>
                    </div>
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>{route.distance}</span>
                  </button>
                ))}
              </div>

              {isDelivering && (
                <div className="font-bubbly" style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '12px', backgroundColor: 'rgba(251, 191, 36, 0.2)', border: '1px solid rgba(251, 191, 36, 0.5)', color: '#fde047', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={16} />
                  <span>Pip is flying through starlight clouds to {selectedRoute?.title}...</span>
                </div>
              )}
            </div>

            <div className="project-interactive-side">
              <div className="delivery-map-canvas">
                <svg viewBox="0 0 500 320" style={{ width: '100%', height: '100%' }}>
                  <defs>
                    <pattern id="skyGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <circle cx="20" cy="20" r="1" fill="#ffffff" opacity="0.15" />
                    </pattern>
                  </defs>
                  <rect width="500" height="320" fill="url(#skyGrid)" />

                  {selectedRoute && (
                    <path
                      d={`M 250 160 Q ${(250 + selectedRoute.coords.x * 5) / 2} ${(160 + selectedRoute.coords.y * 3.2) / 2 - 40} ${selectedRoute.coords.x * 5} ${selectedRoute.coords.y * 3.2}`}
                      fill="none"
                      stroke="#ffd166"
                      strokeWidth="3"
                      strokeDasharray="6 6"
                    />
                  )}

                  <g transform="translate(250, 160)">
                    <circle cx="0" cy="0" r="14" fill="#a34063" stroke="#ffd166" strokeWidth="2.5" />
                    <Moon size={14} color="#ffffff" style={{ transform: 'translate(-7px, -7px)' }} />
                    <text x="0" y="26" textAnchor="middle" fill="#fff8f1" fontSize="10" fontFamily="Fredoka" fontWeight="bold">
                      Midnight Nursery (HQ)
                    </text>
                  </g>

                  {ROUTES_LIST.map((r) => {
                    const posX = r.coords.x * 5;
                    const posY = r.coords.y * 3.2;
                    const isSelected = selectedRoute?.id === r.id;

                    return (
                      <g key={r.id} transform={`translate(${posX}, ${posY})`} onClick={() => onDispatchRoute(r)} style={{ cursor: 'pointer' }}>
                        <circle
                          cx="0"
                          cy="0"
                          r="16"
                          fill={isSelected ? '#ffd166' : '#392852'}
                          stroke={isSelected ? '#ffffff' : '#7c5295'}
                          strokeWidth="2"
                        />
                        <circle cx="0" cy="0" r="4" fill="#ffffff" />
                        <text
                          x="0"
                          y="25"
                          textAnchor="middle"
                          fill={isSelected ? '#ffd166' : '#d1c4e9'}
                          fontSize="9"
                          fontFamily="Fredoka"
                        >
                          {r.title}
                        </text>
                      </g>
                    );
                  })}

                  {isDelivering && selectedRoute && (
                    <g transform={`translate(${selectedRoute.coords.x * 3.5}, ${selectedRoute.coords.y * 2.2})`}>
                      <circle cx="0" cy="0" r="12" fill="#fff8f1" stroke="#5c4033" strokeWidth="2" />
                      <polygon points="0,-16 6,-8 -6,-8" fill="#a34063" />
                      <text x="14" y="4" fill="#ffd166" fontSize="10" fontFamily="Fredoka">Pip Delivering! 🚀</text>
                    </g>
                  )}
                </svg>

                <div className="map-log-strip">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#e9d5ff' }}>
                    <CheckCircle2 size={14} color="#34d399" />
                    Latest: {deliveryLogs[0]?.payload} → {deliveryLogs[0]?.target}
                  </span>
                  <span style={{ color: '#ffd166' }}>{deliveryLogs[0]?.time}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}