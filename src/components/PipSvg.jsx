import React from 'react';
import './PipSvg.css';

export default function PipSvg({ pupilOffset, onCapClick }) {
  return (
    <svg viewBox="0 0 300 300" className="pip-svg-container animate-float">
      <defs>
        <radialGradient id="skullGradient" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#fff8f1" />
          <stop offset="100%" stopColor="#e8ded4" />
        </radialGradient>
        <radialGradient id="amberEyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffe17d" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
        <linearGradient id="nightcapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c1b4d" />
          <stop offset="50%" stopColor="#432c6e" />
          <stop offset="100%" stopColor="#1a1130" />
        </linearGradient>
      </defs>

      <path
        d="M 90 220 Q 80 270 120 275 L 180 275 Q 220 270 210 220 Q 150 205 90 220 Z"
        fill="#3b2d54"
        stroke="#231738"
        strokeWidth="3.5"
      />
      <polygon points="150,230 153,238 161,238 155,243 157,251 150,246 143,251 145,243 139,238 147,238" fill="#ffd166" />
      <path d="M 120 220 Q 150 235 180 220 Q 150 210 120 220 Z" fill="#fff8f1" stroke="#231738" strokeWidth="2.5" />

      <g>
        <path
          d="M 75 140 C 70 75, 230 75, 225 140 C 225 185, 205 215, 175 220 C 160 223, 140 223, 125 220 C 95 215, 75 185, 75 140 Z"
          fill="url(#skullGradient)"
          stroke="#5c4033"
          strokeWidth="4"
        />
        <ellipse cx="98" cy="172" rx="14" ry="8" fill="#f472b6" opacity="0.45" />
        <ellipse cx="202" cy="172" rx="14" ry="8" fill="#f472b6" opacity="0.45" />
        <ellipse cx="112" cy="148" rx="22" ry="25" fill="#2d1f1c" />
        <ellipse cx="188" cy="148" rx="22" ry="25" fill="#2d1f1c" />

        <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
          <circle cx="112" cy="148" r="14" fill="url(#amberEyeGlow)" className="pupil-amber" />
          <circle cx="108" cy="143" r="4.5" fill="#ffffff" />
          <circle cx="116" cy="152" r="2" fill="#ffffff" opacity="0.8" />

          <circle cx="188" cy="148" r="14" fill="url(#amberEyeGlow)" className="pupil-amber" />
          <circle cx="184" cy="143" r="4.5" fill="#ffffff" />
          <circle cx="192" cy="152" r="2" fill="#ffffff" opacity="0.8" />
        </g>

        <path d="M 150 162 L 146 170 Q 150 172 154 170 Z" fill="#5c4033" />
        <path
          d="M 136 186 Q 148 196 164 186"
          fill="none"
          stroke="#5c4033"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <line x1="144" y1="187" x2="144" y2="192" stroke="#5c4033" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="156" y1="188" x2="156" y2="193" stroke="#5c4033" strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <g onClick={onCapClick} className="pip-nightcap-group" title="Click my nightcap!">
        <path
          d="M 68 120 C 65 50, 160 30, 220 70 C 235 80, 235 110, 220 120 C 180 100, 100 100, 68 120 Z"
          fill="url(#nightcapGrad)"
          stroke="#1a1130"
          strokeWidth="3.5"
        />
        <path
          d="M 75 110 C 35 110, 15 150, 30 190 C 35 200, 50 190, 48 175 C 40 150, 55 125, 78 115 Z"
          fill="url(#nightcapGrad)"
          stroke="#1a1130"
          strokeWidth="3"
        />
        <g transform="translate(30, 192)">
          <circle cx="0" cy="0" r="14" fill="#ffd166" className="pompom-star" />
          <polygon points="0,-9 2,-2 8,-2 3,2 5,8 0,4 -5,8 -3,2 -8,-2 -2,-2" fill="#fff8f1" />
        </g>

        <path
          d="M 65 118 Q 145 92 225 118 Q 145 106 65 118 Z"
          fill="#fff8f1"
          stroke="#5c4033"
          strokeWidth="2.5"
        />

        <polygon points="120,60 122,65 127,65 123,68 125,73 120,70 115,73 117,68 113,65 118,65" fill="#ffd166" opacity="0.9" />
        <polygon points="175,70 177,74 181,74 178,77 179,81 175,78 171,81 172,77 169,74 173,74" fill="#ffd166" opacity="0.8" />
        <polygon points="60,140 61,143 64,143 62,145 63,148 60,146 57,148 58,145 56,143 59,143" fill="#ffd166" opacity="0.9" />

        <g transform="translate(205, 115) rotate(15)">
          <ellipse cx="-10" cy="-6" rx="10" ry="7" fill="#a34063" stroke="#5c4033" strokeWidth="1.8" />
          <ellipse cx="10" cy="-6" rx="10" ry="7" fill="#a34063" stroke="#5c4033" strokeWidth="1.8" />
          <circle cx="0" cy="-6" r="4.5" fill="#ffd166" stroke="#5c4033" strokeWidth="1.5" />
          <path d="M -4 -2 L -8 14 L -2 12 L 0 14" fill="#a34063" stroke="#5c4033" strokeWidth="1.5" />
          <path d="M 4 -2 L 8 14 L 2 12 L 0 14" fill="#a34063" stroke="#5c4033" strokeWidth="1.5" />
        </g>
      </g>
    </svg>
  );
}