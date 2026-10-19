import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { Sparkles, Eye } from 'lucide-react';
import { STORY_CHAPTERS } from '../data/nurseryData';
import { useSound } from '../context/SoundContext';
import './OriginStory.css';

function TelescopeChapterCard({ item, index, total, scrollYProgress, isNight, mouseTilt }) {
  const step = 1 / total;
  const start = Math.max(0, index * step);
  const peak = Math.min(1, start + step * 0.45);
  const end = Math.min(1, (index + 1) * step);
  const preStart = Math.max(0, start - step * 0.15);

  const isEven = index % 2 === 1;

  const scale = useTransform(
    scrollYProgress,
    index === 0 
      ? [0, peak, end] 
      : [preStart, start, peak, end],
    index === 0 
      ? [1.0, 1.05, 1.3] 
      : [0.75, 0.9, 1.0, 1.3]
  );

  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, peak, end - step * 0.1, end]
      : [preStart, start, peak, end - step * 0.1, end],
    index === 0
      ? [1, 1, 0.4, 0]
      : [0, 0.9, 1, 0.4, 0]
  );

  const zTranslate = useTransform(
    scrollYProgress,
    index === 0
      ? [0, peak, end]
      : [preStart, peak, end],
    index === 0
      ? [0, 40, 180]
      : [-200, 0, 180]
  );

  const blurValue = useTransform(
    scrollYProgress,
    index === 0
      ? [0, peak, end]
      : [preStart, peak, end],
    index === 0
      ? [0, 0, 12]
      : [8, 0, 12]
  );
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  const badgeColors = {
    1: { bg: '#a34063', text: '#ffffff' },
    2: { bg: '#ffd166', text: '#5c4033' },
    3: { bg: '#a34063', text: '#ffffff' },
    4: { bg: '#10b981', text: '#ffffff' }
  };

  return (
    <motion.div
      className="telescope-card-frame"
      style={{
        scale,
        opacity,
        filter,
        z: zTranslate,
        rotateX: mouseTilt.y,
        rotateY: mouseTilt.x
      }}
    >
      <div
        className={`telescope-card ${isEven ? 'reverse' : ''}`}
        style={{
          backgroundColor: isNight ? 'rgba(33, 24, 51, 0.92)' : 'rgba(255, 255, 255, 0.94)',
          borderColor: isNight ? 'rgba(163, 64, 99, 0.35)' : 'rgba(92, 64, 51, 0.2)'
        }}
      >
        <div className="telescope-text-col" style={{ textAlign: isEven ? 'left' : 'right' }}>
          <span className="story-chapter-tag font-bubbly">
            {item.chapter}
          </span>
          <h3 className="story-chapter-title font-serif-dream">
            {item.title}
          </h3>
          <p className="story-chapter-desc font-bubbly">
            {item.desc}
          </p>
        </div>

        <div
          className="story-num-badge font-serif-dream"
          style={{
            backgroundColor: badgeColors[item.num]?.bg || '#a34063',
            color: badgeColors[item.num]?.text || '#ffffff'
          }}
        >
          {item.num}
        </div>

        <div
          className="story-quote-card font-bubbly"
          style={{
            backgroundColor: isNight ? 'rgba(255, 255, 255, 0.05)' : 'rgba(163, 64, 99, 0.06)',
            borderColor: isNight ? 'rgba(163, 64, 99, 0.25)' : 'rgba(163, 64, 99, 0.2)'
          }}
        >
          {item.quote}
        </div>
      </div>
    </motion.div>
  );
}

export default function OriginStory({ isNight }) {
  const containerRef = useRef(null);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState(0);
  const { playPop } = useSound();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const step = 1 / STORY_CHAPTERS.length;
      const index = Math.min(
        STORY_CHAPTERS.length - 1,
        Math.max(0, Math.floor(latest / step))
      );
      setActiveStep(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="story"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`telescope-zoom-section ${isNight ? 'night' : 'day'}`}
    >
      <div className="telescope-sticky-stage">
        <div className="telescope-lens-ring outer-ring" />
        <div className="telescope-lens-ring inner-ring" />
        <div className="telescope-crosshair horizontal" />
        <div className="telescope-crosshair vertical" />

        <div className="telescope-header">
          <div className="telescope-pill font-bubbly">
            <Sparkles size={13} color="#ffd166" />
            <span>The Dream Telescope • Lens Focus</span>
          </div>
          <h2 className="section-title font-serif-dream" style={{ fontSize: '2.4rem' }}>
            The Making of a Dream Engineer
          </h2>
          <p className="telescope-hint font-bubbly">
            <Eye size={13} style={{ display: 'inline', marginRight: '4px' }} />
            Scroll to zoom through space & drag mouse to look around lens borders
          </p>
        </div>

        <div className="telescope-viewport-3d">
          {STORY_CHAPTERS.map((item, index) => (
            <TelescopeChapterCard
              key={item.num}
              item={item}
              index={index}
              total={STORY_CHAPTERS.length}
              scrollYProgress={scrollYProgress}
              isNight={isNight}
              mouseTilt={mouseTilt}
            />
          ))}
        </div>

        <div className="telescope-chapter-tracker font-bubbly">
          {STORY_CHAPTERS.map((ch, idx) => (
            <div
              key={ch.num}
              onClick={() => playPop()}
              className={`tracker-dot ${activeStep === idx ? 'active' : ''}`}
              title={ch.title}
            >
              <span className="tracker-tooltip">{ch.chapter}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}