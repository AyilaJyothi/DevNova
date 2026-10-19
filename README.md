# 🌙 Pip, the Skull Baby — Midnight Nursery Portfolio
> **Track 1:** Junior Dream Engineer at Midnight Nursery | Built with React + Vite

An interactive, cozy portfolio website introducing **Pip, the Skull Baby** as a Junior Dream Engineer at Midnight Nursery. The site blends storytelling, playful physics, procedural audio synthesis, and interactive modules designed according to the official judging rubric.

---

## 🌟 Live Demo & Repository
- **Live Demo:** `https://your-deployment-link.vercel.app` *(Replace with your live URL)*
- **GitHub Repository:** `https://github.com/your-username/hax_baby` *(Replace with your GitHub repo URL)*

---

## 🎨 Official Color Palette
Adheres strictly to the official **haX.baby** color tokens:
- **Warm Cream:** `#fff8f1`
- **Berry Pink:** `#a34063`
- **Rich Brown:** `#5c4033`
- **Midnight Navy:** `#181224`
- **Star Gold:** `#ffd166`

---

## ✨ Features & Checklist Coverage

### 1. Essential Features (Must-Have)
- [x] **Hero Section:**
  - Official character assets integrated.
  - Name: **Pip, the Skull Baby**.
  - Role: **Junior Dream Engineer at Midnight Nursery**.
  - Atmospheric introduction with call-to-action buttons ("Explore My Dreams" and "Meet Pip").
- [x] **Character Profile / About Pip:**
  - Species: Dream Skullling.
  - Sleepy, gentle, and thoughtful personality.
  - Signature floppy nightcap with constellations and berry pink bow (`#a34063`).
  - Warm amber glowing lantern-eyes and tiny crooked smile.
  - Itemized likes, dislikes, habits, and character quotes.
- [x] **Projects / Portfolio Showcase (3 Interactive Modules):**
  - 🎵 **The Lullaby Lab:** A procedural music box powered by the Web Audio API with 3 lullaby presets (Starlight, Cloud, Moonlight) and an interactive 8-step melody sequencer.
  - 🏮 **Nightlight Collection:** A carousel of 8 glowing dream lanterns with toggleable active states and continuous brightness/radiance sliders.
  - 🗺️ **Dream Delivery Routes:** An interactive sky logistics map where visitors click sleepy destinations to dispatch Pip on star cloud deliveries with live telemetry logs.
- [x] **The Dream Telescope Origin Story:**
  - 4 illustrated storybook scenes detailing Pip's path to the nursery.
  - Interactive 3D Z-axis zoom and focus: scenes zoom forward, sharpen, and dissolve into view as you scroll.
  - Mouse-drag lens parallax that lets visitors look around the borders of each chapter card.
  - All scenes strictly under 150 words.

### 2. Required Interactive Features
- [x] **Cursor Eye-Tracking:** Pip's amber pupils smoothly calculate mouse vectors and track the pointer across desktop viewports.
- [x] **Day / Night Mood Toggle:** Instantly switches between a sunlit morning nursery theme and a magical midnight starscape.
- [x] **Hidden Easter Egg:** Tapping Pip's nightcap 5 times triggers an interactive gift box that blasts confetti and unlocks a 4-photo polaroid memory deck.
- [x] **Sound Controls:** Global, accessible mute/unmute switch in the navigation bar. Audio never auto-plays without user interaction.
- [x] **Responsive Layout:** Clean, fluid layouts optimized for desktop, tablet, and mobile displays without horizontal overflow.

### 3. Bonus Features
- [x] **Click Sounds & Mute Toggle (+3 pts):** Procedural harmonic chimes and pop effects synthesized with the native Web Audio API.
- [x] **Sparkle Cursor Trail (+2 pts):** Four-point glowing star particles trail cursor movement across the screen.
- [x] **Retro Visitor Odometer (+1 pt):** Playful odometer-style counter tracking dreams delivered, with an interactive "+1 Dream" button.
- [x] **Live Postcard Guestbook (+2 pts):** Clean 6-card grid with pagination controls, message submission, heart reactions, and full-screen reading modals.
- [x] **Responsive Chaos Mode (+5 pts):**
  - **Stunt Helicopter:** A cartoon helicopter flies in, sputters, and leaves Pip hanging upside-down by his nightcap on a short line on the right side.
  - **Odometer Overdrive & Burst:** The counter spins rapidly in Chaos Mode, shakes, and triggers a confetti explosion upon reaching 5,000 dreams while continuing to count cleanly.
  - **Emoji Cursor Overdrive:** Star trails turn into floating party emojis (`🎈`, `🍭`, `💫`, `🎀`, `🌀`).
  - **Bouncy Physics & Retro Arcade Fanfares:** Wobbling elements, rainbow headings, and 8-bit sound cues.

---

## 🛠️ Tech Stack
- **Framework:** React 18+
- **Build Tool:** Vite
- **Animations:** Framer Motion & CSS3 Keyframes
- **Sound Synthesis:** Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`)
- **Icons:** `lucide-react`
- **Styling:** Modular CSS3 (Zero Tailwind/Bootstrap runtime dependency)

---

## 📁 Project Structure

```text
hax_baby/
├── public/
├── src/
│   ├── assets/
│   │   ├── pip_avatar_cloud.png
│   │   ├── pip_portrait.png
│   │   ├── pip_dream_lantern.png
│   │   └── pip_lullaby_box.png
│   ├── context/
│   │   └── SoundContext.jsx       # Global Web Audio API synthesizer
│   ├── data/
│   │   └── nurseryData.js        # Sequencer notes, lanterns, routes & stories
│   ├── components/
│   │   ├── Navbar.jsx & .css     # Sticky header with mood & audio toggles
│   │   ├── Hero.jsx & .css       # Hero layout and celebratory odometer
│   │   ├── PipSvg.jsx & .css     # Eye-tracking SVG & nightcap Easter egg
│   │   ├── About.jsx & .css      # Character dossier & traits
│   │   ├── Projects.jsx & .css   # Lullaby lab, lantern carousel & route map
│   │   ├── OriginStory.jsx & .css# 3D telescope scroll-zoom cards
│   │   ├── Guestbook.jsx & .css  # 6-card paginated guestbook & modal
│   │   ├── BadgeModal.jsx & .css # Gift blast & 4-polaroid card stack
│   │   ├── ChaosPlane.jsx & .css # Stunt helicopter & hanging Pip sequence
│   │   ├── SparkleTrail.jsx & .css# Cursor sparkle & emoji trail
│   │   └── Footer.jsx & .css     # Nursery sign-off & links
│   ├── App.jsx                   # Central state orchestration
│   ├── index.css                 # Global variables, themes & fonts
│   └── main.jsx                  # Root entry point with SoundProvider
├── index.html
├── package.json
└── vite.config.js
