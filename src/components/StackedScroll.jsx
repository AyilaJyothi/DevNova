import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const cardsData = [
  {
    id: 1,
    tag: '01 • INGESTION',
    title: 'Autonomous Data Ingestion',
    desc: 'Capture real-time atmospheric shifts and ambient soundwaves directly from nursery sensors.',
    bg: '#251b38',
    color: '#ffd166'
  },
  {
    id: 2,
    tag: '02 • SYNTHESIS',
    title: 'Continuous Melodic Synthesis',
    desc: 'Generate procedural celesta arpeggios that lull irregular breath rhythms into deep sleep.',
    bg: '#1c142b',
    color: '#a34063'
  },
  {
    id: 3,
    tag: '03 • DISPATCH',
    title: 'Dynamic Sky Current Routing',
    desc: 'Route cloud gliders along low-turbulence flight paths for zero sleep disruptions.',
    bg: '#140d20',
    color: '#34d399'
  }
];

function Card({ card, index, progress, range, targetScale }) {
  const containerRef = useRef(null);

  // Shrink the card as you scroll past it
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0
      }}
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${index * 25}px)`,
          backgroundColor: card.bg,
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          borderRadius: '28px',
          width: '90%',
          maxWidth: '850px',
          minHeight: '400px',
          padding: '3rem',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            letterSpacing: '0.08em',
            color: card.color,
            marginBottom: '1rem',
            display: 'inline-block'
          }}
        >
          {card.tag}
        </span>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'serif' }}>
          {card.title}
        </h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.85, lineHeight: 1.6, maxWidth: '600px' }}>
          {card.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function StackedScroll() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={containerRef} style={{ position: 'relative' }}>
      {cardsData.map((card, i) => {
        // Calculate progressive scaling ranges per card
        const targetScale = 1 - (cardsData.length - i) * 0.05;
        return (
          <Card
            key={card.id}
            card={card}
            index={i}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}