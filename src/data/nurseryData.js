export const SCALE_NOTES = [
  { name: 'C5', freq: 523.25, label: 'Do ✦' },
  { name: 'D5', freq: 587.33, label: 'Re ☾' },
  { name: 'E5', freq: 659.25, label: 'Mi ☁' },
  { name: 'G5', freq: 783.99, label: 'Sol ★' },
  { name: 'A5', freq: 880.00, label: 'La ✦' },
  { name: 'C6', freq: 1046.50, label: 'High Do ✧' },
];

export const LULLABY_PRESETS = {
  starlight: [0, 2, 4, 5, 4, 2, 3, 1],
  cloud: [2, 3, 2, 4, 3, 1, 0, 2],
  moonlight: [0, 1, 2, 4, 5, 4, 3, 2]
};

export const INITIAL_LANTERNS = [
  { id: 'star', name: 'Starlight Jar', color: '#ffd166', active: true, glow: 80, desc: 'Filled with fallen stardust from the Big Dipper' },
  { id: 'lavender', name: 'Lavender Mist', color: '#c084fc', active: false, glow: 50, desc: 'Brewed with midnight chamomile vapor' },
  { id: 'aurora', name: 'Aurora Firefly', color: '#34d399', active: true, glow: 70, desc: 'Gentle green slumber spark captured in crystal' },
  { id: 'rose', name: 'Sweet Slumber Quartz', color: '#f472b6', active: false, glow: 60, desc: 'Warm rosy lantern that prevents scary dreams' },
  { id: 'honey', name: 'Honey Amber Drop', color: '#fbbf24', active: true, glow: 75, desc: 'Gleams with soothing wildflower honeycomb essence' },
  { id: 'moonstone', name: 'Crescent Moonstone', color: '#60a5fa', active: false, glow: 65, desc: 'Emits a calm tidal hum for deep sleep cycles' },
  { id: 'peppermint', name: 'Dreamy Mint Flame', color: '#2dd4bf', active: true, glow: 85, desc: 'Distills cool night breezes to clear heavy thoughts' },
  { id: 'peach', name: 'Peach Velvet Beacon', color: '#fb923c', active: false, glow: 55, desc: 'Soft pastel warmth that keeps blanket monsters away' }
];

export const ROUTES_LIST = [
  { id: 'meadow', title: 'The Cloud Meadow', creature: 'Baby Sleepy Sheep 🐑', distance: '1.2 Sky Leagues', cargo: 'Fluffy Strawberry Slumber', coords: { x: 22, y: 28 } },
  { id: 'burrow', title: 'Hollow Tree Burrow', creature: 'Little Wood Owls 🦉', distance: '2.5 Sky Leagues', cargo: 'Warm Twig Melody & Moonlight', coords: { x: 74, y: 35 } },
  { id: 'cradle', title: 'Coral Cradle Bay', creature: 'Baby Dream Whales 🐳', distance: '3.8 Sky Leagues', cargo: 'Deep Sea Bubble Lullaby', coords: { x: 35, y: 76 } },
  { id: 'crib', title: 'Crib 42 (Human World)', creature: 'Toddler Luna 🌙', distance: '4.1 Sky Leagues', cargo: 'Soft Blanket & Teddy Bear Whisper', coords: { x: 80, y: 80 } },
];

export const INITIAL_GUEST_NOTES = [
  { id: 1, author: 'Bramble the Hedge-pup', text: 'Thank you Pip for the dream about the giant strawberry field! 🍓', time: '10 mins ago', hearts: 14 },
  { id: 2, author: 'Moon Moth Nursery Caregiver', text: 'Pip is the most gentle intern we have ever hosted. His nightcap smells like vanilla stars.', time: '1 hour ago', hearts: 29 },
  { id: 3, author: 'Little Robin', text: 'I didn’t wake up once tonight. 10/10 dream quality!', time: 'Yesterday', hearts: 8 }
];

export const STORY_CHAPTERS = [
  {
    num: 1,
    chapter: 'Chapter I',
    title: 'The Fallen Wishing Star',
    desc: 'Pip was not made of bone alone—he was born under a blanket of dandelion seed when a shooting star collided softly into the quietest meadow on Earth. From that star, he inherited warm amber eyes that never fear the pitch black of night.',
    quote: '“When the meadow grass whispered, Pip listened. He didn’t know who he was yet, only that the darkness felt like a soft sweater waiting to be worn.”'
  },
  {
    num: 2,
    chapter: 'Chapter II',
    title: 'The Lost Sleepless Shadows',
    desc: 'While wandering through twilight, Pip encountered creatures who could not sleep: hedgehogs with prickly worries, baby birds startled by thunder, and little toddlers crying in dark bedrooms. Pip offered each one a small hum and a warm pat on the nose.',
    quote: '“He noticed that even scary nightmares dissolved the moment someone smiled at them with sincerity.”'
  },
  {
    num: 3,
    chapter: 'Chapter III',
    title: 'Weaving the First Lullaby',
    desc: 'Using slivers of silver moonbeams and drops of wild lavender dew, Pip spun his first dream melody. When he blew upon the glass jar, glowing motes drifted into open bedroom windows, painting skies with sweet dreams of strawberry clouds and slow rivers.',
    quote: '“Every note he hummed became a tiny pillow where exhausted eyelids could safely rest.”'
  },
  {
    num: 4,
    chapter: 'Chapter IV',
    title: 'The Nightcap of Office',
    desc: 'The Matron of Midnight Nursery watched Pip from her perch on the crescent moon. Descending with a shower of sparkles, she bestowed upon him the Starlight Nightcap with a berry pink bow, proclaiming him Junior Dream Engineer of Sector 7.',
    quote: '“His official duties began at once: to guard bedtime, to engineer sweetness, and to never let a single creature feel lonely after dark.”'
  }
];