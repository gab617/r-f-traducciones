import { useState, useRef, useEffect, useCallback } from "react";

const CX = 14;
const CY = 48;

const PLANETS = [
  {
    name: "Mercurio",
    type: "Terrestre",
    diam: "4.879 km",
    distSol: "57.9 M km",
    orbita: "88 días",
    lunas: 0,
    color: "bg-gray-300",
    shadow: "shadow-gray-400/60",
    size: "w-3.5 h-3.5",
    fact: "Es el planeta más pequeño y el más cercano al Sol. Un día en Mercurio dura 59 días terrestres.",
    pos: { top: 43, left: 24 },
  },
  {
    name: "Venus",
    type: "Terrestre",
    diam: "12.104 km",
    distSol: "108.2 M km",
    orbita: "225 días",
    lunas: 0,
    color: "bg-yellow-200",
    shadow: "shadow-yellow-300/60",
    size: "w-4 h-4",
    fact: "Es el planeta más caliente (~460°C) por su efecto invernadero descontrolado. Gira al revés que los demás.",
    pos: { top: 36, left: 34 },
  },
  {
    name: "Tierra",
    type: "Terrestre",
    diam: "12.756 km",
    distSol: "149.6 M km",
    orbita: "365.25 días",
    lunas: 1,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/60",
    size: "w-4 h-4",
    fact: "El único planeta conocido con vida. El 71% de su superficie está cubierta de agua líquida.",
    pos: { top: 42, left: 44 },
  },
  {
    name: "Marte",
    type: "Terrestre",
    diam: "6.792 km",
    distSol: "227.9 M km",
    orbita: "687 días",
    lunas: 2,
    color: "bg-red-500",
    shadow: "shadow-red-500/60",
    size: "w-3.5 h-3.5",
    fact: "Tiene el volcán más grande del sistema solar: Olympus Mons, con 21 km de altura.",
    pos: { top: 54, left: 54 },
  },
  {
    name: "Júpiter",
    type: "Gigante gaseoso",
    diam: "142.984 km",
    distSol: "778.5 M km",
    orbita: "11.86 años",
    lunas: 95,
    color: "bg-amber-400",
    shadow: "shadow-amber-400/60",
    size: "w-10 h-10",
    fact: "Es el planeta más grande. La Gran Mancha Roja es una tormenta más grande que la Tierra que dura siglos.",
    pos: { top: 32, left: 66 },
  },
  {
    name: "Saturno",
    type: "Gigante gaseoso",
    diam: "120.536 km",
    distSol: "1.43 B km",
    orbita: "29.46 años",
    lunas: 146,
    color: "bg-yellow-600",
    shadow: "shadow-yellow-600/60",
    size: "w-[1.2em] h-[1.2em]",
    fact: "Sus anillos están hechos de hielo y roca. Flotaría en agua porque es menos denso que ella.",
    pos: { top: 56, left: 76 },
  },
  {
    name: "Urano",
    type: "Gigante de hielo",
    diam: "51.118 km",
    distSol: "2.87 B km",
    orbita: "84 años",
    lunas: 27,
    color: "bg-cyan-300",
    shadow: "shadow-cyan-300/60",
    size: "w-[1em] h-[1em]",
    fact: "Gira de costado, con una inclinación de 98°. Un día dura solo 17 horas.",
    pos: { top: 28, left: 86 },
  },
  {
    name: "Neptuno",
    type: "Gigante de hielo",
    diam: "49.528 km",
    distSol: "4.5 B km",
    orbita: "164.8 años",
    lunas: 16,
    color: "bg-blue-700",
    shadow: "shadow-blue-700/60",
    size: "w-4 h-4",
    fact: "Tiene los vientos más violentos del sistema solar: hasta 2.100 km/h. Fue predicho matemáticamente antes de ser visto.",
    pos: { top: 60, left: 94 },
  },
  {
    name: "Plutón",
    type: "Planeta enano",
    diam: "2.377 km",
    distSol: "5.9 B km",
    orbita: "248 años",
    lunas: 5,
    color: "bg-stone-300",
    shadow: "shadow-stone-400/60",
    size: "w-3 h-3",
    fact: "Fue el noveno planeta hasta 2006, cuando la UAI lo reclasificó como planeta enano. Su superficie tiene un corazón de hielo (Tombaugh Regio).",
    pos: { top: 54, left: 104 },
  },
];

const ORBITS = [
  { width: 16, height: 10 },
  { width: 26, height: 18 },
  { width: 36, height: 24 },
  { width: 46, height: 32 },
  { width: 58, height: 40 },
  { width: 70, height: 48 },
  { width: 82, height: 56 },
  { width: 94, height: 64 },
  { width: 106, height: 72 },
];

function getDepthScale(y) {
  const norm = y / 100;
  return 0.55 + norm * 0.9;
}

const LIGHT = (id) => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <defs>
      <radialGradient id={id} cx="30%" cy="25%" r="75%" fx="28%" fy="22%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
        <stop offset="25%" stopColor="rgba(255,255,255,0.18)" />
        <stop offset="55%" stopColor="rgba(0,0,0,0.05)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.6)" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill={`url(#${id})`} />
  </svg>
);

const GLOW = (color) => (
  <svg viewBox="0 0 100 100" className="w-full h-full pointer-events-none">
    <circle cx="50" cy="50" r="50" fill="none" stroke={color} strokeWidth="4" opacity="0.15" />
  </svg>
);

const PLANET_VISUALS = {
  Mercurio: {
    detail: (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="50" r="50" fill="#9ca3af" />
        <circle cx="30" cy="35" r="6" fill="#6b7280" opacity="0.5" />
        <circle cx="60" cy="45" r="4" fill="#4b5563" opacity="0.4" />
        <circle cx="45" cy="65" r="8" fill="#6b7280" opacity="0.35" />
        <circle cx="20" cy="55" r="3" fill="#4b5563" opacity="0.5" />
        <circle cx="70" cy="30" r="5" fill="#6b7280" opacity="0.45" />
        <circle cx="55" cy="72" r="3" fill="#4b5563" opacity="0.4" />
        <circle cx="35" cy="20" r="2.5" fill="#6b7280" opacity="0.3" />
        <circle cx="75" cy="60" r="2" fill="#4b5563" opacity="0.35" />
        <circle cx="28" cy="48" r="5" fill="#6b7280" opacity="0.4" />
        <circle cx="62" cy="55" r="3.5" fill="#4b5563" opacity="0.3" />
      </svg>
    ),
    light: LIGHT("light-mercurio"),
    glow: GLOW("rgba(255,255,255,0.15)"),
    speed: 4,
  },
  Venus: {
    detail: (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="50" r="50" fill="#f59e0b" />
        <path d="M 10 30 Q 30 20 50 35 Q 70 50 90 25" fill="none" stroke="#fef3c7" strokeWidth="8" opacity="0.25" />
        <path d="M 5 60 Q 30 45 55 55 Q 80 65 95 50" fill="none" stroke="#fef9c3" strokeWidth="6" opacity="0.2" />
        <path d="M 15 45 Q 40 35 60 48 Q 80 60 85 40" fill="none" stroke="#fbbf24" strokeWidth="5" opacity="0.15" />
        <path d="M 20 75 Q 45 65 65 72 Q 80 78 90 65" fill="none" stroke="#fef9c3" strokeWidth="4" opacity="0.15" />
        <ellipse cx="40" cy="35" rx="10" ry="6" fill="rgba(255,255,255,0.12)" transform="rotate(-15, 40, 35)" />
        <ellipse cx="60" cy="55" rx="8" ry="4" fill="rgba(255,255,255,0.1)" transform="rotate(10, 60, 55)" />
      </svg>
    ),
    light: LIGHT("light-venus"),
    glow: GLOW("rgba(255,200,100,0.2)"),
    speed: 8,
  },
  Tierra: {
    detail: (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="50" r="50" fill="#3b82f6" />
        <path d="M 25 35 Q 35 25 45 38 Q 40 45 30 42 Q 25 40 25 35 Z" fill="#22c55e" opacity="0.7" />
        <path d="M 55 40 Q 70 30 75 45 Q 78 55 70 50 Q 60 48 55 40 Z" fill="#16a34a" opacity="0.65" />
        <path d="M 35 65 Q 45 55 55 68 Q 50 75 40 72 Q 35 70 35 65 Z" fill="#22c55e" opacity="0.6" />
        <path d="M 65 60 Q 75 55 80 65 Q 78 72 70 68 Q 65 65 65 60 Z" fill="#15803d" opacity="0.55" />
        <path d="M 30 50 Q 35 45 40 50 Q 38 55 32 52 Z" fill="#4ade80" opacity="0.5" />
        <path d="M 50 55 Q 55 50 60 58 Q 55 62 50 55 Z" fill="#16a34a" opacity="0.5" />
        <ellipse cx="30" cy="30" rx="14" ry="3" fill="rgba(255,255,255,0.15)" transform="rotate(-10, 30, 30)" />
        <ellipse cx="70" cy="45" rx="10" ry="2.5" fill="rgba(255,255,255,0.12)" transform="rotate(5, 70, 45)" />
        <ellipse cx="50" cy="70" rx="12" ry="2" fill="rgba(255,255,255,0.1)" transform="rotate(-5, 50, 70)" />
        <ellipse cx="45" cy="22" rx="8" ry="2" fill="rgba(255,255,255,0.12)" transform="rotate(-20, 45, 22)" />
        <ellipse cx="65" cy="55" rx="12" ry="3" fill="rgba(255,255,255,0.08)" transform="rotate(15, 65, 55)" />
      </svg>
    ),
    light: LIGHT("light-tierra"),
    glow: GLOW("rgba(96,165,250,0.25)"),
    speed: 6,
  },
  Marte: {
    detail: (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="50" r="50" fill="#dc2626" />
        <path d="M 30 35 Q 50 25 65 40 Q 55 55 35 50 Q 25 45 30 35 Z" fill="#991b1b" opacity="0.5" />
        <path d="M 45 55 Q 60 45 70 60 Q 65 75 50 65 Q 40 60 45 55 Z" fill="#7f1d1d" opacity="0.4" />
        <path d="M 25 50 Q 35 45 40 55 Q 30 60 25 50 Z" fill="#991b1b" opacity="0.35" />
        <ellipse cx="50" cy="10" rx="14" ry="4" fill="rgba(255,255,255,0.5)" />
        <ellipse cx="52" cy="11" rx="10" ry="2.5" fill="rgba(255,255,255,0.6)" />
        <ellipse cx="50" cy="90" rx="12" ry="3.5" fill="rgba(255,255,255,0.4)" />
        <ellipse cx="48" cy="89" rx="8" ry="2" fill="rgba(255,255,255,0.5)" />
        <circle cx="55" cy="35" r="4" fill="#991b1b" opacity="0.3" />
        <circle cx="30" cy="60" r="3" fill="#7f1d1d" opacity="0.4" />
        <circle cx="65" cy="70" r="2.5" fill="#991b1b" opacity="0.35" />
      </svg>
    ),
    light: LIGHT("light-marte"),
    glow: GLOW("rgba(252,165,165,0.2)"),
    speed: 7,
  },
  Júpiter: {
    detail: (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="50" r="50" fill="#d97706" />
        <ellipse cx="50" cy="16" rx="46" ry="6" fill="#f59e0b" opacity="0.7" />
        <ellipse cx="50" cy="25" rx="48" ry="4" fill="#d97706" opacity="0.5" />
        <ellipse cx="50" cy="33" rx="47" ry="7" fill="#fbbf24" opacity="0.6" />
        <ellipse cx="50" cy="43" rx="48" ry="5" fill="#b45309" opacity="0.45" />
        <ellipse cx="50" cy="52" rx="46" ry="6" fill="#f59e0b" opacity="0.55" />
        <ellipse cx="50" cy="60" rx="47" ry="4" fill="#d97706" opacity="0.4" />
        <ellipse cx="50" cy="68" rx="46" ry="5" fill="#92400e" opacity="0.35" />
        <ellipse cx="50" cy="76" rx="44" ry="4" fill="#f59e0b" opacity="0.4" />
        <ellipse cx="36" cy="50" rx="9" ry="5.5" fill="rgba(220,38,38,0.75)" transform="rotate(-5, 36, 50)" />
        <ellipse cx="36" cy="50" rx="5" ry="3" fill="rgba(185,28,28,0.5)" transform="rotate(-5, 36, 50)" />
        <ellipse cx="60" cy="28" rx="3" ry="1.5" fill="rgba(255,255,255,0.12)" />
        <ellipse cx="30" cy="62" rx="4" ry="2" fill="rgba(255,255,255,0.08)" />
      </svg>
    ),
    light: LIGHT("light-jupiter"),
    glow: GLOW("rgba(251,191,36,0.2)"),
    speed: 3,
  },
  Urano: {
    detail: (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="50" r="50" fill="#06b6d4" />
        <ellipse cx="50" cy="22" rx="46" ry="4" fill="#67e8f9" opacity="0.2" />
        <ellipse cx="50" cy="32" rx="47" ry="3" fill="#0891b2" opacity="0.15" />
        <ellipse cx="50" cy="42" rx="46" ry="5" fill="#67e8f9" opacity="0.2" />
        <ellipse cx="50" cy="55" rx="47" ry="4" fill="#0891b2" opacity="0.15" />
        <ellipse cx="50" cy="65" rx="46" ry="3" fill="#67e8f9" opacity="0.15" />
        <ellipse cx="50" cy="75" rx="44" ry="4" fill="#0891b2" opacity="0.1" />
        <ellipse cx="50" cy="50" rx="12" ry="36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" transform="rotate(-15, 50, 50)" />
      </svg>
    ),
    light: LIGHT("light-urano"),
    glow: GLOW("rgba(103,232,249,0.2)"),
    speed: 5,
  },
  Neptuno: {
    detail: (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="50" r="50" fill="#1d4ed8" />
        <ellipse cx="50" cy="25" rx="46" ry="3" fill="#60a5fa" opacity="0.15" />
        <ellipse cx="50" cy="38" rx="47" ry="4" fill="#3b82f6" opacity="0.2" />
        <ellipse cx="50" cy="55" rx="46" ry="5" fill="#2563eb" opacity="0.15" />
        <ellipse cx="50" cy="70" rx="45" ry="3" fill="#60a5fa" opacity="0.12" />
        <ellipse cx="30" cy="50" rx="6" ry="3.5" fill="rgba(15,23,42,0.6)" transform="rotate(-3, 30, 50)" />
        <ellipse cx="30" cy="50" rx="3.5" ry="2" fill="rgba(15,23,42,0.4)" transform="rotate(-3, 30, 50)" />
        <path d="M 40 55 Q 55 48 70 52" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
        <path d="M 45 65 Q 55 60 65 63" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
        <path d="M 55 30 Q 60 28 65 32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
        <ellipse cx="65" cy="42" rx="3" ry="1.5" fill="rgba(255,255,255,0.08)" />
      </svg>
    ),
    light: LIGHT("light-neptuno"),
    glow: GLOW("rgba(147,197,253,0.2)"),
    speed: 6,
  },
  Plutón: {
    detail: (
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <circle cx="50" cy="50" r="50" fill="#a8a29e" />
        <path d="M 35 50 Q 42 38 50 50 Q 55 58 48 60 Q 40 58 35 50 Z" fill="#d6d3d1" opacity="0.8" />
        <path d="M 38 48 Q 42 42 47 48 Q 44 52 40 50 Z" fill="#e7e5e4" opacity="0.5" />
        <circle cx="60" cy="35" r="4" fill="#78716c" opacity="0.5" />
        <circle cx="62" cy="33" r="2" fill="#78716c" opacity="0.4" />
        <circle cx="70" cy="50" r="3" fill="#78716c" opacity="0.35" />
        <circle cx="50" cy="75" r="2.5" fill="#78716c" opacity="0.4" />
        <circle cx="25" cy="55" r="2" fill="#78716c" opacity="0.3" />
        <circle cx="65" cy="65" r="1.5" fill="#78716c" opacity="0.35" />
      </svg>
    ),
    light: LIGHT("light-pluton"),
    glow: GLOW("rgba(255,255,255,0.1)"),
    speed: 10,
  },
  Saturno: {
    speed: 4,
  },
};

const SUN_DATA = {
  name: "Sol",
  type: "Estrella enana amarilla (G2V)",
  diam: "1.391.000 km",
  distSol: "—",
  orbita: "—",
  lunas: 8,
  fact: "Representa el 99,86% de la masa del sistema solar. Su temperatura superficial es de ~5.500°C y en el núcleo alcanza los ~15 millones de °C. La luz solar tarda ~8,3 minutos en llegar a la Tierra.",
};

function SaturnSVG() {
  return (
    <svg viewBox="0 0 120 60" className="w-[3.2em] h-[1.6em] overflow-visible">
      <defs>
        <clipPath id="saturn-sphere">
          <circle cx="60" cy="30" r="12" />
        </clipPath>
        <radialGradient id="saturn-light" cx="35%" cy="25%" r="75%" fx="30%" fy="20%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </radialGradient>
      </defs>
      <g>
        <path d="M 8 30 A 52 11 0 0 1 112 30 L 110 30 A 50 10.6 0 0 0 10 30 Z" fill="rgba(217,119,6,0.35)" />
        <path d="M 11 30 A 49 10.2 0 0 1 109 30 L 105 30 A 45 9.6 0 0 0 15 30 Z" fill="rgba(251,191,36,0.55)" />
        <path d="M 15 30 A 45 9.6 0 0 1 105 30 L 103 30 A 43 9.2 0 0 0 17 30 Z" fill="transparent" />
        <path d="M 17 30 A 43 9.2 0 0 1 103 30 L 95 30 A 35 7.2 0 0 0 25 30 Z" fill="rgba(252,211,77,0.8)" />
        <path d="M 25 30 A 35 7.2 0 0 1 95 30 L 89 30 A 29 5.8 0 0 0 31 30 Z" fill="rgba(180,83,9,0.45)" />
        <path d="M 31 30 A 29 5.8 0 0 1 89 30 L 85 30 A 25 5 0 0 0 35 30 Z" fill="rgba(120,113,108,0.25)" />
      </g>
      <g clipPath="url(#saturn-sphere)">
        <rect x="48" y="18" width="24" height="24" fill="#fcd34d" />
        <rect x="48" y="19" width="24" height="3" fill="#d97706" opacity="0.5" />
        <rect x="48" y="23" width="24" height="2.5" fill="#f59e0b" opacity="0.4" />
        <rect x="48" y="27" width="24" height="4" fill="#b45309" opacity="0.35" />
        <rect x="48" y="32" width="24" height="2" fill="#f59e0b" opacity="0.4" />
        <rect x="48" y="35" width="24" height="3" fill="#d97706" opacity="0.5" />
        <rect x="48" y="39" width="24" height="2" fill="#fbbf24" opacity="0.3" />
      </g>
      <circle cx="60" cy="30" r="12" fill="url(#saturn-light)" />
      <g>
        <path d="M 8 30 A 52 11 0 0 0 112 30 L 110 30 A 50 10.6 0 0 1 10 30 Z" fill="rgba(217,119,6,0.5)" />
        <path d="M 11 30 A 49 10.2 0 0 0 109 30 L 105 30 A 45 9.6 0 0 1 15 30 Z" fill="rgba(251,191,36,0.7)" />
        <path d="M 15 30 A 45 9.6 0 0 0 105 30 L 103 30 A 43 9.2 0 0 1 17 30 Z" fill="transparent" opacity="0.6" />
        <path d="M 17 30 A 43 9.2 0 0 0 103 30 L 95 30 A 35 7.2 0 0 1 25 30 Z" fill="rgba(252,211,77,0.9)" />
        <path d="M 25 30 A 35 7.2 0 0 0 95 30 L 89 30 A 29 5.8 0 0 1 31 30 Z" fill="rgba(180,83,9,0.55)" />
        <path d="M 31 30 A 29 5.8 0 0 0 89 30 L 85 30 A 25 5 0 0 1 35 30 Z" fill="rgba(120,113,108,0.3)" />
      </g>
    </svg>
  );
}

function PlanetBody({ planet, depth, rotating }) {
  const scale = depth ?? 1;
  const vis = PLANET_VISUALS[planet.name];

  if (planet.name === "Saturno") {
    return (
      <span
        className="block transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,200,0,0.5)]"
        style={{ transform: `scale(${scale * 1.5})` }}
      >
        <span
          className={`block ${rotating ? "animate-planet-spin" : ""}`}
          style={{ animationDuration: `${vis?.speed || 6}s` }}
        >
          <SaturnSVG />
        </span>
      </span>
    );
  }

  return (
    <span
      className={`${planet.size} relative rounded-full overflow-hidden ${planet.shadow}
        shadow-lg ring-1 ring-white/20 group-hover:ring-yellow-300/70
        group-hover:shadow-[0_0_25px_rgba(255,200,0,0.5)] transition-all duration-300`}
      style={{ transform: `scale(${scale})` }}
    >
      <span
        className={`absolute inset-0 ${rotating ? "animate-planet-spin" : ""}`}
        style={{ animationDuration: `${vis?.speed || 6}s` }}
      >
        {vis?.detail}
      </span>
      {vis?.light}
    </span>
  );
}

function initAngles() {
  return PLANETS.map((p, i) => {
    const dx = (p.pos.left - CX) / (ORBITS[i].width / 2);
    const dy = (p.pos.top - CY) / (ORBITS[i].height / 2);
    return Math.atan2(dy, dx);
  });
}

export function Cosmos() {
  const [openPlanet, setOpenPlanet] = useState(null);
  const [animating, setAnimating] = useState(true);
  const [angles, setAngles] = useState(initAngles);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const timeRef = useRef(0);
  const decayRef = useRef(1);
  const animRef = useRef(null);
  const gravWaveRef = useRef(0);
  const sunPhaseRef = useRef(0);
  const sceneRef = useRef(null);
  const dragRef = useRef(null);
  const containerRef = useRef(null);

  const handleToggle = (name) => {
    setOpenPlanet((prev) => (prev === name ? null : name));
  };

  useEffect(() => {
    if (!animating) return;
    setHasAnimated(true);

    const animate = (ts) => {
      if (!timeRef.current) timeRef.current = ts;
      const dt = Math.min((ts - timeRef.current) / 1000, 0.05);
      timeRef.current = ts;

      decayRef.current = Math.max(0.75, decayRef.current - dt * 0.005);
      gravWaveRef.current += dt;
      sunPhaseRef.current += dt * 0.25;

      setAngles((prev) =>
        prev.map((a, i) => {
          const speed = 0.7 / (i + 1) ** 0.6;
          return a + speed * dt;
        })
      );

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [animating]);

  const getPos = useCallback(
    (i) => {
      if (!animating && !hasAnimated) return PLANETS[i].pos;
      const d = decayRef.current;
      const sp = sunPhaseRef.current;
      const sx = CX + 25 * Math.sin(0.3 * sp);
      const sy = CY + 12 * Math.cos(0.2 * sp);
      const orbitW = ORBITS[i].width * 1.4;
      const orbitH = ORBITS[i].height * 1.4;
      return {
        top: sy + (orbitH / 2) * d * Math.sin(angles[i]),
        left: sx + (orbitW / 2) * d * Math.cos(angles[i]),
      };
    },
    [animating, hasAnimated, angles]
  );

  const updatePan = useCallback((dx, dy) => {
    setPan((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
  }, []);

  const onPointerDown = useCallback((e) => {
    if (e.pointerType === "touch") return;
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      panX: 0,
      panY: 0,
      moved: false,
    };
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (e.pointerType === "touch") return;
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragRef.current.moved = true;
    }
    const pdx = dx - dragRef.current.panX;
    const pdy = dy - dragRef.current.panY;
    dragRef.current.panX = dx;
    dragRef.current.panY = dy;
    updatePan(pdx, pdy);
  }, [updatePan]);

  const onPointerUp = useCallback(() => {
    dragRef.current = null;
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
  }, []);

  const onTouchStart = useCallback((e) => {
    if (e.touches.length === 1) {
      dragRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        panX: 0,
        panY: 0,
        moved: false,
      };
    }
  }, []);

  const onTouchMove = useCallback((e) => {
    if (e.touches.length !== 1 || !dragRef.current) return;
    const dx = e.touches[0].clientX - dragRef.current.startX;
    const dy = e.touches[0].clientY - dragRef.current.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragRef.current.moved = true;
    }
    const pdx = dx - dragRef.current.panX;
    const pdy = dy - dragRef.current.panY;
    dragRef.current.panX = dx;
    dragRef.current.panY = dy;
    updatePan(pdx, pdy);
  }, [updatePan]);

  const onTouchEnd = useCallback(() => {
    dragRef.current = null;
  }, []);

  const onWheel = useCallback((e) => {
    setZoom((z) => Math.max(0.3, Math.min(3, z - e.deltaY * 0.005)));
  }, []);

  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const prevent = (e) => e.preventDefault();
    el.addEventListener("wheel", prevent, { passive: false });
    return () => el.removeEventListener("wheel", prevent);
  }, []);

  const toggleFullscreen = useCallback(async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* Fullscreen API no disponible */
    }
  }, []);

  const sunPhase = animating ? sunPhaseRef.current : 0;
  const sunPos = {
    left: CX + 25 * Math.sin(0.3 * sunPhase),
    top: CY + 12 * Math.cos(0.2 * sunPhase),
  };

  const selected = openPlanet === "Sol" ? SUN_DATA : PLANETS.find((p) => p.name === openPlanet);
  const selPos = selected ? (selected === SUN_DATA ? sunPos : getPos(PLANETS.indexOf(selected))) : null;
  const topHalf = selPos && selPos.top < 50;

  let tipPos = {};
  if (selPos) {
    if (selPos.left > 66) {
      tipPos = { left: "100%", transform: "translate(calc(-100% - 0.75rem), 0)" };
    } else if (selPos.left < 34) {
      tipPos = { left: "0", transform: "translate(0.75rem, 0)" };
    } else {
      tipPos = { left: `${selPos.left}%`, transform: "translate(-50%, 0)" };
    }
    if (topHalf) {
      tipPos.top = `${Math.max(2, Math.min(85, selPos.top + 5))}%`;
    } else {
      tipPos.bottom = `${Math.max(2, Math.min(85, 100 - selPos.top + 5))}%`;
    }
  }

  const ringCount = 3;

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[90vh] overflow-hidden select-none touch-none"
      onPointerDown={onPointerDown}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {selected && (
        <div className="fixed inset-0 z-40" onClick={() => setOpenPlanet(null)} />
      )}

      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/nightsky.jpg)" }}
      />
      <div className="absolute inset-0 bg-black/30" />

      <div className={`relative z-20 pointer-events-none transition-all duration-500 ${fullscreen ? "p-2" : "p-4"}`}>
        <div className={`text-center mb-4 pointer-events-auto transition-opacity duration-500 ${fullscreen ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
          <h2 className="text-2xl font-bold text-white/90 drop-shadow-lg">
            Sistema Solar
          </h2>
          <p className="text-xs text-white/50 drop-shadow">
            Arrastrá para mover la vista • Tocá un planeta • Viaje: Sol se mueve
          </p>
        </div>
        <div className={`pointer-events-auto transition-all duration-500 ${fullscreen ? "fixed right-2 bottom-2 flex flex-col gap-2 opacity-30 hover:opacity-70" : "flex justify-center gap-2 opacity-100"}`}>
          <button
            onClick={() => { setPan({ x: 0, y: 0 }); setZoom(1); setHasAnimated(false); setAngles(initAngles()); decayRef.current = 1; sunPhaseRef.current = 0; timeRef.current = 0; }}
            className={`rounded-full font-semibold bg-white/10 text-white/60
              hover:bg-white/20 hover:text-white/80 border border-white/10 transition-all ${fullscreen ? "px-2 py-1 text-[10px]" : "px-3 py-2 text-xs"}`}
          >
            ⟲ Centrar
          </button>
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
            className={`rounded-full font-semibold bg-white/10 text-white/60
              hover:bg-white/20 hover:text-white/80 border border-white/10 transition-all ${fullscreen ? "px-2 py-1 text-[10px]" : "px-3 py-2 text-xs"}`}
          >
            ＋
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.25, 0.3))}
            className={`rounded-full font-semibold bg-white/10 text-white/60
              hover:bg-white/20 hover:text-white/80 border border-white/10 transition-all ${fullscreen ? "px-2 py-1 text-[10px]" : "px-3 py-2 text-xs"}`}
          >
            −
          </button>
          <button
            onClick={() => setAnimating((p) => !p)}
            className={`rounded-full font-bold tracking-wide shadow-lg
              transition-all duration-300 active:scale-95 ${fullscreen ? "px-2 py-1 text-[10px]" : "px-5 py-2 text-sm"} ${
              animating
                ? "bg-red-600/80 text-white hover:bg-red-500 shadow-red-600/30"
                : "bg-white/10 text-white/80 hover:bg-white/20 border border-white/20"
            }`}
          >
            {animating ? "⏹ Detener" : "▶ Viaje"}
          </button>
          {animating && (
            <button
              onClick={toggleFullscreen}
              className={`rounded-full font-semibold bg-white/10 text-white/60
                hover:bg-white/20 hover:text-white/80 border border-white/10 transition-all ${fullscreen ? "px-2 py-1 text-[10px]" : "px-3 py-2 text-xs"}`}
            >
              ⛶
            </button>
          )}
        </div>
      </div>

      <div
        ref={sceneRef}
        className="absolute inset-0"
        style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
      >
        {ORBITS.map((orbit, i) => (
          <div
            key={i}
            className={`absolute z-10 rounded-full border border-white/5 transition-opacity duration-700 ${
              animating || hasAnimated ? "opacity-0" : "opacity-100"
            }`}
            style={{
              top: `${CY - orbit.height / 2}%`,
              left: `${CX - orbit.width / 2}%`,
              width: `${orbit.width}%`,
              height: `${orbit.height}%`,
            }}
          />
        ))}

        <div
          className="absolute z-20"
          style={{ top: `${sunPos.top}%`, left: `${sunPos.left}%` }}
        >
          <button
            onClick={() => handleToggle("Sol")}
            className="group relative flex flex-col items-center cursor-pointer"
          >
            <div className="-translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              {animating &&
                Array.from({ length: ringCount }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      rounded-full border border-yellow-400/20 animate-grav-wave"
                    style={{
                      width: "5em",
                      height: "5em",
                      animationDelay: `${i * 1.2}s`,
                      animationDuration: "3.6s",
                    }}
                  />
                ))}
              <div
                className={`w-[5em] h-[5em] rounded-full bg-gradient-to-br from-yellow-300 via-orange-400 to-red-500
                  shadow-[0_0_40px_rgba(255,200,0,0.6)]
                  ring-2 ring-yellow-200/30 transition-all duration-300 ${
                  animating ? "animate-sun-pulse" : ""
                }`}
              />
              <span className="text-[10px] text-yellow-300/80 mt-1 whitespace-nowrap font-medium">
                Sol
              </span>
            </div>
          </button>
        </div>

        {PLANETS.map((planet, i) => {
          const pos = getPos(i);
          const depth = animating || hasAnimated ? getDepthScale(pos.top) : 1;
          return (
            <div
              key={planet.name}
              className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
              style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
            >
              <button
                onClick={() => handleToggle(planet.name)}
                className="group relative flex flex-col items-center cursor-pointer"
              >
                <PlanetBody planet={planet} depth={depth} rotating={animating} />
                <span className="text-[9px] text-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {planet.name}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      {fullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-3 right-3 z-[60] text-xs text-white/70 hover:text-white
            transition-colors tracking-widest uppercase font-medium drop-shadow-lg"
        >
          ✕ Salir
        </button>
      )}

      {selected && selPos && (
        <div className="fixed z-50 w-64 max-w-[calc(100vw-1.5rem)]" style={tipPos}>
          <div className={topHalf ? "mt-2" : "mb-2"}>
            <div
              className="bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl p-4
                shadow-2xl shadow-black/60"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  {selected.name}
                  {selected.name === "Plutón" && (
                    <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-full font-normal">
                      Planeta enano
                    </span>
                  )}
                </h3>
                <button
                  onClick={() => setOpenPlanet(null)}
                  className="text-gray-500 hover:text-white transition-colors text-sm"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-300">
                  <span className="text-gray-500">Tipo:</span> {selected.type}
                </p>
                {selected.name === "Plutón" && (
                  <p className="text-[10px] text-red-400/80 italic">
                    ⚠ Ex-planeta desde 2006 (reclasificado por la UAI)
                  </p>
                )}
                <p className="text-gray-300">
                  <span className="text-gray-500">Diámetro:</span> {selected.diam}
                </p>
                {selected.name !== "Sol" && (<>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Distancia del Sol:</span> {selected.distSol}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-500">Órbita:</span> {selected.orbita}
                  </p>
                </>)}
                <p className="text-gray-300">
                  <span className="text-gray-500">{selected.name === "Sol" ? "Planetas" : "Lunas"}:</span>{" "}
                  <span className="text-yellow-400 font-semibold">{selected.lunas}</span>
                </p>
                <p className="text-gray-400 text-xs mt-2 leading-relaxed border-t border-white/10 pt-2">
                  {selected.fact}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
