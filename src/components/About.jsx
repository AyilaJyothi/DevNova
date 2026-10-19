import React from 'react';
import { Star, Heart, Feather } from 'lucide-react';
import './About.css';

export default function About({ isNight }) {
  return (
    <section id="about" className={`about-section ${isNight ? 'night' : 'day'}`}>
      <div className="about-container">
        
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3.5rem' }}>
          <span className="section-tag font-bubbly">Character Dossier</span>
          <h2 className="section-title font-serif-dream">Meet the Dream Crafter</h2>
          <p style={{ marginTop: '0.5rem', opacity: 0.8, fontSize: '0.95rem' }}>
            Small in stature, boundless in comfort. Everything you need to know about Pip.
          </p>
        </div>

        <div className="about-cards-grid">
          
          <div className="about-card" style={{ backgroundColor: isNight ? '#261d3b' : '#ffffff' }}>
            <div className="about-icon-circle" style={{ backgroundColor: 'rgba(251, 191, 36, 0.2)' }}>
              <Star size={24} color="#f59e0b" fill="#f59e0b" />
            </div>
            <h3 className="font-serif-dream" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Vitals & Essence</h3>
            <ul className="about-list font-bubbly">
              <li><strong style={{ color: '#a34063' }}>Species:</strong> Baby Dream Skullling</li>
              <li><strong style={{ color: '#a34063' }}>Role:</strong> Junior Dream Engineer</li>
              <li><strong style={{ color: '#a34063' }}>Division:</strong> Midnight Nursery Sector 7</li>
              <li><strong style={{ color: '#a34063' }}>Diet:</strong> Chamomile vapor & sweet honey drops</li>
              <li><strong style={{ color: '#a34063' }}>Temperament:</strong> Soft-spoken, tender, chronically yawning</li>
            </ul>
          </div>

          <div className="about-card" style={{ backgroundColor: isNight ? '#261d3b' : '#ffffff' }}>
            <div className="about-icon-circle" style={{ backgroundColor: 'rgba(244, 114, 182, 0.2)' }}>
              <Heart size={24} color="#a34063" fill="#a34063" />
            </div>
            <h3 className="font-serif-dream" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Signature Look</h3>
            <ul className="about-list font-bubbly">
              <li><strong style={{ color: '#a34063' }}>Floppy Nightcap:</strong> Navy indigo silk with embroidered gold constellations.</li>
              <li><strong style={{ color: '#a34063' }}>Berry Pink Bow:</strong> Gifted by the Nursery Matron for passing Sleep Safety 101.</li>
              <li><strong style={{ color: '#a34063' }}>Amber Gaze:</strong> Warm glowing eyes that function as cozy reading lanterns.</li>
              <li><strong style={{ color: '#a34063' }}>Crooked Smile:</strong> A sweet little grin that banishes nightmare dust.</li>
            </ul>
          </div>

          <div className="about-card" style={{ backgroundColor: isNight ? '#261d3b' : '#ffffff' }}>
            <div className="about-icon-circle" style={{ backgroundColor: 'rgba(192, 132, 252, 0.2)' }}>
              <Feather size={24} color="#c084fc" />
            </div>
            <h3 className="font-serif-dream" style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Likes & Dislikes</h3>
            <div className="font-bubbly" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem' }}>
              <div>
                <span style={{ fontWeight: 700, color: '#34d399', display: 'block', marginBottom: '0.2rem' }}>❤️ Pip Loves:</span>
                <p style={{ opacity: 0.85, fontSize: '0.8rem', lineHeight: 1.5 }}>
                  Fluffy lavender clouds, tucking sleepy baby stars into bed, snoring caterpillars, and extra heavy flannel quilts.
                </p>
              </div>
              <div>
                <span style={{ fontWeight: 700, color: '#fb7185', display: 'block', marginBottom: '0.2rem' }}>💔 Pip Dislikes:</span>
                <p style={{ opacity: 0.85, fontSize: '0.8rem', lineHeight: 1.5 }}>
                  Loud morning alarm clocks, sour lemons, stepped-on squeaky toys, and cold damp socks.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}