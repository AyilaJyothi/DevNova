import React, { useState } from 'react';
import { Sparkles, X, RotateCcw, Layers, Gift } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import './BadgeModal.css';

import photoCloud from '../assets/pip_avatar_cloud.png';
import photoPortrait from '../assets/pip_portrait.png';
import photoLantern from '../assets/pip_dream_lantern.png';
import photoLullaby from '../assets/pip_lullaby_box.png';

const PIP_PHOTOS = [
  {
    id: 1,
    url: photoCloud,
    title: 'Cloud Napping',
    caption: 'Pip floating on a fresh morning marshmallow cloud.'
  },
  {
    id: 2,
    url: photoPortrait,
    title: 'Official Nursery Portrait',
    caption: 'First day on duty with the starlight nightcap and pink bow.'
  },
  {
    id: 3,
    url: photoLantern,
    title: 'Testing Lantern Glow',
    caption: 'Calibrating amber bioluminescence for gentle bedtime light.'
  },
  {
    id: 4,
    url: photoLullaby,
    title: 'Lullaby Mechanism',
    caption: 'The hand-crafted celesta music box tuning sleepy frequencies.'
  }
];

const CONFETTI_COUNT = 45;

export default function BadgeModal({ isNight, onClose }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isBlasting, setIsBlasting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatingId, setAnimatingId] = useState(null);
  const [confettiPieces, setConfettiPieces] = useState([]);

  const { playPop, playMagic, playChime, playCelebrationBlast } = useSound();

  const handleOpenGift = () => {
    if (isBlasting) return;
    
    playCelebrationBlast();
    setIsBlasting(true);

    const colors = ['#ffd166', '#a34063', '#f472b6', '#34d399', '#60a5fa', '#fff8f1'];
    const generated = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / CONFETTI_COUNT + (Math.random() - 0.5) * 0.4;
      const velocity = 140 + Math.random() * 260;
      return {
        id: i,
        dx: Math.cos(angle) * velocity,
        dy: Math.sin(angle) * velocity - 60,
        rotate: Math.random() * 720 - 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 9 + 6,
        isStar: Math.random() > 0.6
      };
    });
    setConfettiPieces(generated);

    setTimeout(() => {
      setIsOpened(true);
      setIsBlasting(false);
    }, 700);
  };

  const handlePhotoClick = () => {
    if (animatingId !== null) return;
    
    playPop();
    const activePhoto = PIP_PHOTOS[currentIndex];
    setAnimatingId(activePhoto.id);

    setTimeout(() => {
      setAnimatingId(null);
      const nextIndex = (currentIndex + 1) % PIP_PHOTOS.length;
      setCurrentIndex(nextIndex);
      if (nextIndex === 0) {
        playMagic();
      } else {
        playChime(659.25, 'sine', 0.4);
      }
    }, 380);
  };

  const handleReset = (e) => {
    e.stopPropagation();
    playPop();
    setCurrentIndex(0);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {confettiPieces.map((p) => (
        <span
          key={p.id}
          className="confetti-paper"
          style={{
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            '--rotate': `${p.rotate}deg`,
            backgroundColor: p.isStar ? 'transparent' : p.color,
            color: p.color,
            width: p.isStar ? 'auto' : `${p.size}px`,
            height: p.isStar ? 'auto' : `${p.size * 1.6}px`,
            fontSize: `${p.size * 1.8}px`
          }}
        >
          {p.isStar ? '✦' : ''}
        </span>
      ))}

      {!isOpened ? (
        <div 
          className={`gift-box-modal ${isBlasting ? 'gift-burst-active' : ''}`}
          style={{ backgroundColor: isNight ? '#201633' : '#ffffff' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="photo-modal-close" onClick={onClose}>
            <X size={18} />
          </button>

          <div className="gift-tag font-bubbly">
            <Sparkles size={14} color="#ffd166" />
            <span>Surprise Unlocked!</span>
          </div>

          <h3 className="font-serif-dream gift-title">A Gift from Pip</h3>
          <p className="font-bubbly gift-subtitle">
            You discovered Pip's secret! Click the parcel to unwrap your celebration.
          </p>

          <div className="gift-illustration-container" onClick={handleOpenGift}>
            <div className="gift-shockwave-ring" />
            
            <div className="gift-package-box">
              <div className="gift-ribbon-vertical" />
              <div className="gift-ribbon-horizontal" />
              
              <div className="gift-bow-cluster">
                <div className="bow-ear left" />
                <div className="bow-ear right" />
                <div className="bow-knot" />
              </div>

              <div className="gift-icon-center">
                <Gift size={38} color="#ffd166" />
              </div>
            </div>
          </div>

          <button className="btn-unwrap-gift font-bubbly" onClick={handleOpenGift}>
            ✨ Open Mystery Gift ✨
          </button>
        </div>
      ) : (
        <div 
          className="photo-modal-card card-revealed-appear" 
          style={{ backgroundColor: isNight ? '#201633' : '#ffffff' }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="photo-modal-close" onClick={onClose}>
            <X size={18} />
          </button>

          <div className="photo-modal-header">
            <div className="photo-modal-tag font-bubbly">
              <Sparkles size={13} color="#ffd166" />
              <span>Secret Photo Album</span>
            </div>
            <h3 className="font-serif-dream photo-modal-title">Pip’s Polaroids</h3>
            <p className="font-bubbly photo-modal-subtitle">
              Tap the top photo to flip to the next memory!
            </p>
          </div>

          <div className="photo-stack-stage" onClick={handlePhotoClick}>
            {PIP_PHOTOS.map((photo, index) => {
              const depth = (index - currentIndex + PIP_PHOTOS.length) % PIP_PHOTOS.length;
              const isTop = depth === 0;
              const isExiting = animatingId === photo.id;

              return (
                <div
                  key={photo.id}
                  className={`polaroid-card ${isTop ? 'top-card' : ''} ${isExiting ? 'card-swipe-exit' : ''}`}
                  style={{
                    zIndex: PIP_PHOTOS.length - depth,
                    transform: isExiting
                      ? 'translate(120px, -40px) rotate(22deg) scale(0.95)'
                      : `translateY(${depth * 9}px) scale(${1 - depth * 0.045}) rotate(${depth % 2 === 0 ? depth * -2.5 : depth * 3}deg)`,
                    opacity: depth > 2 ? 0 : 1 - depth * 0.15,
                    pointerEvents: isTop ? 'auto' : 'none',
                    backgroundColor: '#fffdfa'
                  }}
                >
                  <div className="polaroid-photo-frame">
                    <img src={photo.url} alt={photo.title} className="polaroid-img" />
                  </div>
                  <div className="polaroid-footer">
                    <span className="polaroid-title font-serif-dream">{photo.title}</span>
                    <p className="polaroid-caption font-bubbly">{photo.caption}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="photo-modal-footer">
            <span className="font-bubbly photo-counter">
              <Layers size={14} style={{ display: 'inline', marginRight: '4px' }} />
              Memory {currentIndex + 1} of {PIP_PHOTOS.length}
            </span>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button className="btn-photo-action font-bubbly" onClick={handleReset} title="Reset stack to first photo">
                <RotateCcw size={14} /> Restart Deck
              </button>
              <button className="btn-photo-close font-bubbly" onClick={onClose}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}