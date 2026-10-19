import React from 'react';
import './SparkleTrail.css';

export default function SparkleTrail({ sparkles, chaosMode }) {
  return (
    <>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className={`sparkle-star ${chaosMode ? 'chaos-emoji-star' : ''}`}
          style={{
            left: sparkle.x,
            top: sparkle.y,
            fontSize: chaosMode ? '22px' : `${sparkle.size * 1.8}px`,
            color: sparkle.color,
            textShadow: chaosMode 
              ? '0 0 10px rgba(255, 209, 102, 0.8)' 
              : `0 0 8px ${sparkle.color}, 0 0 16px ${sparkle.color}`
          }}
        >
          {sparkle.char || '✦'}
        </span>
      ))}
    </>
  );
}