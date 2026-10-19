import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import OriginStory from './components/OriginStory';
import Guestbook from './components/Guestbook';
import BadgeModal from './components/BadgeModal';
import SparkleTrail from './components/SparkleTrail';
import ChaosPlane from './components/ChaosPlane';
import Footer from './components/Footer';

import { useSound } from './context/SoundContext';
import {
  SCALE_NOTES,
  LULLABY_PRESETS,
  INITIAL_LANTERNS,
  INITIAL_GUEST_NOTES
} from './data/nurseryData';

const CHAOS_EMOJIS = ['🎈', '🍭', '💫', '🎀', '🌀', '✨', '⭐', '🦄', '🍓'];

export default function App() {
  const { 
    playPop, 
    playMagic, 
    playNote, 
    playChime, 
    playChaosFanfare, 
    playPlaneSputter, 
    playOdometerBurst,
    playCelebrationBlast 
  } = useSound();

  const [theme, setTheme] = useState('midnight');
  const [chaosMode, setChaosMode] = useState(false);
  const [showChaosPlane, setShowChaosPlane] = useState(false);

  const [capClicks, setCapClicks] = useState(0);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const pipRef = useRef(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);

  const [dreamsDelivered, setDreamsDelivered] = useState(4821);
  const [odometerBurst, setOdometerBurst] = useState(false);

  const [activePreset, setActivePreset] = useState('starlight');
  const [isPlayingMelody, setIsPlayingMelody] = useState(false);
  const [customSequence, setCustomSequence] = useState([0, 2, 3, 2, 4, 3, 1, 0]);
  const [currentStep, setCurrentStep] = useState(-1);
  const playTimerRef = useRef(null);

  const [lanterns, setLanterns] = useState(INITIAL_LANTERNS);

  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isDelivering, setIsDelivering] = useState(false);
  const [deliveryLogs, setDeliveryLogs] = useState([
    { time: '02:14 AM', target: 'Cloud Meadow', payload: 'Lavender Cotton Candy Dream', status: 'Delivered' },
    { time: '01:45 AM', target: 'Hollow Tree', payload: 'Acorn Symphony & Warm Moss', status: 'Delivered' }
  ]);

  const [guestNotes, setGuestNotes] = useState(INITIAL_GUEST_NOTES);

  useEffect(() => {
    let interval = null;
    if (chaosMode) {
      interval = setInterval(() => {
        setDreamsDelivered((prev) => {
          const next = prev + Math.floor(Math.random() * 8) + 3;
          if (next >= 5000 && !odometerBurst) {
            setOdometerBurst(true);
            playCelebrationBlast();
          }
          return next;
        });
      }, 260);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [chaosMode, odometerBurst, playCelebrationBlast]);

  const handleToggleChaos = () => {
    const next = !chaosMode;
    setChaosMode(next);
    playChaosFanfare(next);

    if (next) {
      setShowChaosPlane(true);
      playPlaneSputter();
    } else {
      setShowChaosPlane(false);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const spawnChance = chaosMode ? 0.7 : 0.25;

      if (Math.random() < spawnChance) {
        const id = Date.now() + Math.random();
        const emoji = CHAOS_EMOJIS[Math.floor(Math.random() * CHAOS_EMOJIS.length)];

        setSparkles((prev) => [
          ...prev.slice(chaosMode ? -24 : -15),
          {
            id,
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 8 + 6,
            char: chaosMode ? emoji : '✦',
            color: ['#ffd166', '#ffb5d5', '#c084fc', '#fff'][Math.floor(Math.random() * 4)]
          }
        ]);
        setTimeout(() => {
          setSparkles((prev) => prev.filter((s) => s.id !== id));
        }, chaosMode ? 950 : 850);
      }

      if (pipRef.current) {
        const rect = pipRef.current.getBoundingClientRect();
        const pipCenterX = rect.left + rect.width / 2;
        const pipCenterY = rect.top + rect.height / 2;
        const dx = e.clientX - pipCenterX;
        const dy = e.clientY - pipCenterY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.min(Math.hypot(dx, dy) / 30, chaosMode ? 10 : 7);
        setPupilOffset({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [chaosMode]);

  const handleCapClick = () => {
    playPop();
    const nextCount = capClicks + 1;
    setCapClicks(nextCount);

    if (nextCount === 5) {
      playMagic();
      setShowBadgeModal(true);
      setCapClicks(0);
    }
  };

  const handleSelectPreset = (key) => {
    playPop();
    setActivePreset(key);
    setCustomSequence(LULLABY_PRESETS[key]);
  };

  useEffect(() => {
    if (isPlayingMelody) {
      let step = 0;
      playTimerRef.current = setInterval(() => {
        setCurrentStep(step);
        const noteIndex = customSequence[step];
        const note = SCALE_NOTES[noteIndex];
        if (note) {
          playNote(note.freq, 0.7);
        }
        step = (step + 1) % customSequence.length;
      }, chaosMode ? 260 : 420);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
      setCurrentStep(-1);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlayingMelody, customSequence, chaosMode, playNote]);

  const handleTogglePlayMelody = () => {
    playPop();
    setIsPlayingMelody(!isPlayingMelody);
  };

  const handleUpdateSequenceStep = (stepIdx) => {
    playPop();
    const updated = [...customSequence];
    updated[stepIdx] = (updated[stepIdx] + 1) % SCALE_NOTES.length;
    setCustomSequence(updated);
    playNote(SCALE_NOTES[updated[stepIdx]].freq);
  };

  const handleToggleLantern = (id) => {
    playPop();
    setLanterns(lanterns.map(l => l.id === id ? { ...l, active: !l.active } : l));
  };

  const handleUpdateLanternGlow = (id, val) => {
    setLanterns(lanterns.map(l => l.id === id ? { ...l, glow: val } : l));
  };

  const handleDispatchRoute = (route) => {
    if (isDelivering) return;
    playMagic();
    setSelectedRoute(route);
    setIsDelivering(true);

    setTimeout(() => {
      setIsDelivering(false);
      setDreamsDelivered(prev => prev + 1);
      setDeliveryLogs(prev => [
        {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          target: route.title,
          payload: route.cargo,
          status: 'Delivered ✨'
        },
        ...prev.slice(0, 4)
      ]);
      playChime(880, 'sine', 0.9);
    }, 2800);
  };

  const handleAddGuestNote = (author, text) => {
    const item = {
      id: Date.now(),
      author: author.trim(),
      text: text.trim(),
      time: 'Just now',
      hearts: 1
    };
    setGuestNotes([item, ...guestNotes]);
  };

  const handleToggleHeart = (id) => {
    setGuestNotes(guestNotes.map(n => n.id === id ? { ...n, hearts: n.hearts + 1 } : n));
  };

  const isNight = theme === 'midnight';

  return (
    <div className={`theme-${theme} ${chaosMode ? 'chaos-mode-active' : ''}`} style={{ minHeight: '100vh', position: 'relative' }}>
      
      <SparkleTrail sparkles={sparkles} chaosMode={chaosMode} />

      {showChaosPlane && (
        <ChaosPlane onDismiss={() => setShowChaosPlane(false)} />
      )}

      {chaosMode && (
        <div className="chaos-banner-strip font-bubbly">
          <span>🌀 CHAOS MODE ACTIVATED: STUNT FLIGHT & ODOMETER OVERDRIVE! 🎈</span>
          <button onClick={handleToggleChaos} className="btn-calm-down">
            Calm Nursery 🌙
          </button>
        </div>
      )}

      <div className="bg-ambient">
        {isNight ? (
          <>
            <div className="star-point" style={{ top: '40px', left: '50px', width: '8px', height: '8px', backgroundColor: '#fef08a', animationDelay: '0.2s' }} />
            <div className="star-point" style={{ top: '150px', left: '25%', width: '12px', height: '12px', backgroundColor: '#fbcfe8', animationDelay: '1.2s' }} />
            <div className="star-point" style={{ top: '80px', right: '25%', width: '8px', height: '8px', backgroundColor: '#fef9c3', animationDelay: '0.8s' }} />
            <div className="star-point" style={{ top: '300px', right: '60px', width: '12px', height: '12px', backgroundColor: '#fde68a', animationDelay: '2.1s' }} />
            <div className="nebula-glow" style={{ top: '40px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', backgroundColor: 'rgba(88, 28, 135, 0.15)', filter: 'blur(140px)' }} />
          </>
        ) : (
          <>
            <div style={{ position: 'absolute', top: '50px', left: '40px', width: '100px', height: '50px', backgroundColor: 'rgba(255, 255, 255, 0.6)', borderRadius: '9999px', filter: 'blur(10px)', animation: 'floatSlow 5s ease-in-out infinite' }} />
            <div style={{ position: 'absolute', top: '130px', right: '60px', width: '140px', height: '60px', backgroundColor: 'rgba(255, 255, 255, 0.5)', borderRadius: '9999px', filter: 'blur(10px)', animation: 'floatSlow 5s ease-in-out infinite 2s' }} />
          </>
        )}
      </div>

      <Navbar
        isNight={isNight}
        onToggleTheme={() => setTheme(isNight ? 'day' : 'midnight')}
        chaosMode={chaosMode}
        onToggleChaos={handleToggleChaos}
      />

      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero
          isNight={isNight}
          pipRef={pipRef}
          pupilOffset={pupilOffset}
          capClicks={capClicks}
          onCapClick={handleCapClick}
          dreamsDelivered={dreamsDelivered}
          onIncrementDream={() => setDreamsDelivered(prev => prev + 1)}
          odometerBurst={odometerBurst}
        />

        <About isNight={isNight} />

        <Projects
          isNight={isNight}
          activePreset={activePreset}
          onSelectPreset={handleSelectPreset}
          isPlayingMelody={isPlayingMelody}
          onTogglePlayMelody={handleTogglePlayMelody}
          customSequence={customSequence}
          onUpdateSequenceStep={handleUpdateSequenceStep}
          currentStep={currentStep}
          lanterns={lanterns}
          onToggleLantern={handleToggleLantern}
          onUpdateLanternGlow={handleUpdateLanternGlow}
          selectedRoute={selectedRoute}
          isDelivering={isDelivering}
          onDispatchRoute={handleDispatchRoute}
          deliveryLogs={deliveryLogs}
        />

        <OriginStory isNight={isNight} />

        <Guestbook
          isNight={isNight}
          notes={guestNotes}
          onAddNote={handleAddGuestNote}
          onToggleHeart={handleToggleHeart}
        />
      </main>

      {showBadgeModal && (
        <BadgeModal
          isNight={isNight}
          onClose={() => setShowBadgeModal(false)}
        />
      )}

      <Footer isNight={isNight} />

    </div>
  );
}