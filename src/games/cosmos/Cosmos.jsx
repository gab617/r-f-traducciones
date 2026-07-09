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

const PLANET_VISUALS = {
  Mercurio: {
    bg: "radial-gradient(circle at 30% 30%, #d1d5db, #9ca3af, #6b7280)",
    detail: (
      <span className="absolute top-[30%] left-[55%] w-[2px] h-[2px] rounded-full bg-gray-700/60" />
    ),
    speed: 4,
  },
  Venus: {
    bg: "radial-gradient(circle at 30% 30%, #fef9c3, #f59e0b, #b45309)",
    detail: (
      <span className="absolute top-[35%] left-[30%] w-[5px] h-[1.5px] bg-yellow-100/60 rounded-full rotate-[20deg]" />
    ),
    speed: 8,
  },
  Tierra: {
    bg: "radial-gradient(circle at 30% 30%, #60a5fa, #2563eb, #1e3a5f)",
    detail: (
      <>
        <span className="absolute top-[30%] left-[35%] w-[2.5px] h-[2px] rounded-sm bg-green-400/80" />
        <span className="absolute top-[45%] left-[55%] w-[1.5px] h-[1.5px] rounded-sm bg-green-500/60" />
      </>
    ),
    speed: 6,
  },
  Marte: {
    bg: "radial-gradient(circle at 30% 30%, #fca5a5, #dc2626, #991b1b)",
    detail: (
      <>
        <span className="absolute top-1/2 left-[40%] w-[2px] h-[2px] rounded-full bg-red-900/60" />
        <span className="absolute top-[35%] left-[55%] w-[1.5px] h-[1px] rounded-full bg-red-900/40" />
      </>
    ),
    speed: 7,
  },
  Júpiter: {
    bg: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35) 0%, transparent 55%), repeating-linear-gradient(180deg, #d97706 0px, #d97706 5px, #92400e 5px, #92400e 9px, #f59e0b 9px, #f59e0b 13px, #b45309 13px, #b45309 17px, #fbbf24 17px, #fbbf24 20px, #b45309 20px, #b45309 24px, #d97706 24px, #d97706 28px)",
    detail: (
      <span className="absolute top-[55%] left-[38%] w-[5px] h-[3.5px] rounded-full bg-red-500/80" />
    ),
    speed: 3,
  },
  Urano: {
    bg: "radial-gradient(circle at 30% 30%, #67e8f9, #06b6d4, #0e7490)",
    detail: (
      <span className="absolute top-[5%] left-1/2 w-[1px] h-[90%] bg-cyan-200/40 -translate-x-1/2" />
    ),
    speed: 5,
  },
  Saturno: {
    bg: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), repeating-linear-gradient(180deg, #fcd34d 0px, #fcd34d 4px, #d97706 4px, #d97706 7px, #f59e0b 7px, #f59e0b 10px, #b45309 10px, #b45309 13px, #fcd34d 13px, #fcd34d 16px)",
    speed: 4,
  },
  Neptuno: {
    bg: "radial-gradient(circle at 30% 30%, #93c5fd, #3b82f6, #1d4ed8)",
    detail: (
      <span className="absolute top-[45%] left-[52%] w-[2px] h-[2.5px] rounded-full bg-blue-950/60" />
    ),
    speed: 6,
  },
  Plutón: {
    bg: "radial-gradient(circle at 30% 30%, #d6d3d1, #a8a29e, #78716c)",
    detail: (
      <span className="absolute top-[40%] left-[45%] w-[1px] h-[1px] rounded-full bg-white/70" />
    ),
    speed: 10,
  },
};

function PlanetBody({ planet, depth, rotating }) {
  const scale = depth ?? 1;
  const vis = PLANET_VISUALS[planet.name];

  if (planet.name !== "Saturno") {
    return (
      <span
        className={`${planet.size} relative rounded-full overflow-hidden ${planet.shadow}
          shadow-lg ring-1 ring-white/20 group-hover:ring-yellow-300/70
          group-hover:shadow-[0_0_25px_rgba(255,200,0,0.5)] transition-all duration-300`}
        style={{ transform: `scale(${scale})`, background: vis?.bg }}
      >
        <span
          className={`absolute inset-0 ${rotating ? "animate-planet-spin" : ""}`}
          style={{ animationDuration: `${vis?.speed || 6}s` }}
        >
          {vis?.detail}
        </span>
      </span>
    );
  }

  return (
    <span
      className="transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(255,200,0,0.5)]"
      style={{ transform: `scale(${scale * 1.5})` }}
    >
      <span
        className={`relative flex items-center justify-center ${rotating ? "animate-planet-spin" : ""}`}
        style={{ animationDuration: `${vis?.speed || 6}s` }}
      >
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-14 h-[6px] rounded-full
            bg-gradient-to-b from-amber-200/50 via-amber-300/60 to-amber-200/50
            rotate-[10deg]"
        />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-[3.25rem] h-[2px] rounded-full
            bg-amber-800/40 rotate-[7deg]"
        />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-12 h-[7px] rounded-full
            bg-gradient-to-b from-amber-300/80 via-amber-400/90 to-amber-300/80
            border border-amber-300/70 rotate-[8deg] shadow-lg shadow-amber-400/20"
        />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-10 h-[3px] rounded-full
            bg-gradient-to-b from-amber-600/50 to-amber-700/40
            border border-amber-600/20 rotate-[5deg]"
        />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-8 h-[2px] rounded-full
            bg-gradient-to-b from-yellow-200/30 to-amber-300/20
            -rotate-[2deg]"
        />
        <span
          className="w-4 h-4 rounded-full relative z-10
            shadow-[0_0_30px_rgba(217,119,6,0.6)] ring-1 ring-amber-300/30"
          style={{ background: vis?.bg }}
        />
      </span>
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

  const selected = openPlanet ? PLANETS.find((p) => p.name === openPlanet) : null;
  const selPos = selected ? getPos(PLANETS.indexOf(selected)) : null;
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

  const sunPhase = animating ? sunPhaseRef.current : 0;
  const sunPos = {
    left: CX + 25 * Math.sin(0.3 * sunPhase),
    top: CY + 12 * Math.cos(0.2 * sunPhase),
  };

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
        <div className={`flex justify-center gap-2 pointer-events-auto transition-all duration-500 ${fullscreen ? "opacity-30 hover:opacity-70" : "opacity-100"}`}>
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
                <p className="text-gray-300">
                  <span className="text-gray-500">Distancia del Sol:</span> {selected.distSol}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">Órbita:</span> {selected.orbita}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">Lunas:</span>{" "}
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
