import React from 'react';
import { X } from 'lucide-react';
import './ChaosPlane.css';

export default function ChaosPlane({ onDismiss }) {
  return (
    <div className="chaos-copter-viewport">
      {/* Short right-side line anchor */}
      <div className="short-right-line-anchor">
        <div className="line-anchor-post left-post" />
        <div className="line-wire-segment" />
        <div className="line-anchor-post right-post" />
        <div className="wire-peg" />
      </div>

      {/* Flying Helicopter Actor */}
      <div className="stunt-copter-actor">
        <svg viewBox="0 0 170 110" className="cartoon-helicopter-svg">
          {/* Top Rotor Mast & Spinning Blades */}
          <rect x="68" y="16" width="6" height="12" fill="#5c4033" rx="2" />
          <g className="copter-top-blades">
            <ellipse cx="71" cy="16" rx="65" ry="4" fill="#a34063" stroke="#5c4033" strokeWidth="1.5" />
            <circle cx="71" cy="16" r="4.5" fill="#ffd166" />
          </g>

          {/* Tail Boom & Tail Rotor */}
          <path d="M 95 56 L 155 46 L 155 52 L 95 62 Z" fill="#ffd166" stroke="#5c4033" strokeWidth="2.5" />
          <path d="M 152 35 L 158 35 L 155 60 Z" fill="#a34063" stroke="#5c4033" strokeWidth="1.5" />
          <g className="copter-tail-blades">
            <line x1="155" y1="36" x2="155" y2="60" stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />
            <circle cx="155" cy="48" r="3" fill="#ffd166" />
          </g>

          {/* Main Bubble Body */}
          <ellipse cx="68" cy="60" rx="36" ry="26" fill="#ffd166" stroke="#5c4033" strokeWidth="3" />

          {/* Landing Skids */}
          <line x1="52" y1="86" x2="52" y2="95" stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />
          <line x1="84" y1="86" x2="84" y2="95" stroke="#5c4033" strokeWidth="3" strokeLinecap="round" />
          <path d="M 36 96 L 98 96 Q 104 96 106 91" fill="none" stroke="#5c4033" strokeWidth="3.5" strokeLinecap="round" />

          {/* Cockpit Window & Pip inside */}
          <path d="M 38 58 Q 44 38 68 38 L 68 76 Q 44 76 38 58 Z" fill="#60a5fa" opacity="0.85" stroke="#5c4033" strokeWidth="2.5" />
          
          {/* Baby Pip Pilot in Cockpit */}
          <circle cx="56" cy="56" r="10" fill="#fff8f1" stroke="#5c4033" strokeWidth="1.5" />
          <circle cx="53" cy="55" r="2.5" fill="#f59e0b" />
          <circle cx="60" cy="55" r="2.5" fill="#f59e0b" />
          <path d="M 48 48 Q 56 38 64 48 Z" fill="#2c1b4d" />
          <circle cx="64" cy="45" r="2.5" fill="#ffd166" />
        </svg>

        {/* Engine Smoke Sputter */}
        <div className="smoke-bubble s-1">💨</div>
        <div className="smoke-bubble s-2">💨</div>
        <div className="smoke-bubble s-3">⚡</div>
      </div>

      {/* Right Side: Hanging Pip after engine stalls */}
      <div className="right-hanging-pip-container">
        <svg viewBox="0 0 110 130" className="hanging-pip-svg">
          {/* Nightcap wrapped around wire */}
          <path d="M 55 5 C 65 15, 68 35, 55 55 C 42 35, 45 15, 55 5 Z" fill="#2c1b4d" stroke="#5c4033" strokeWidth="2.5" />
          <circle cx="55" cy="5" r="7" fill="#ffd166" />
          
          {/* Skull Head */}
          <circle cx="55" cy="80" r="26" fill="#fff8f1" stroke="#5c4033" strokeWidth="3" />
          
          {/* Amber Eyes */}
          <ellipse cx="44" cy="82" rx="7" ry="9" fill="#2d1f1c" />
          <ellipse cx="66" cy="82" rx="7" ry="9" fill="#2d1f1c" />
          <circle cx="44" cy="82" r="4.5" fill="#f59e0b" />
          <circle cx="66" cy="82" r="4.5" fill="#f59e0b" />
          
          {/* Gentle Smile */}
          <path d="M 48 97 Q 55 92 62 97" fill="none" stroke="#5c4033" strokeWidth="2.5" strokeLinecap="round" />
          <ellipse cx="38" cy="88" rx="5" ry="3" fill="#f472b6" opacity="0.6" />
          <ellipse cx="72" cy="88" rx="5" ry="3" fill="#f472b6" opacity="0.6" />
          
          {/* Pajamas Body */}
          <ellipse cx="55" cy="115" rx="14" ry="12" fill="#3b2d54" stroke="#231738" strokeWidth="2" />
          
          {/* Bow on Cap */}
          <g transform="translate(68, 55) rotate(-20)">
            <ellipse cx="-5" cy="-3" rx="6" ry="4" fill="#a34063" />
            <ellipse cx="5" cy="-3" rx="6" ry="4" fill="#a34063" />
            <circle cx="0" cy="-3" r="2.5" fill="#ffd166" />
          </g>
        </svg>

        {/* Hanging Speech Tag */}
        <div className="pip-hanging-dialogue font-bubbly">
          <span>“Copter stalled... hanging out here!” 🚁🎀</span>
          <button onClick={onDismiss} className="btn-dismiss-stunt" title="Close stunt">
            <X size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}