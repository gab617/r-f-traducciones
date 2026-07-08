import { useState, useEffect, useRef } from "react";

const LEVEL_MILESTONES = {
  semilla: [
    { pct: 25, icon: "🌱", msg: "¡Germinando!" },
    { pct: 50, icon: "🌿", msg: "¡Crece!" },
    { pct: 75, icon: "🌳", msg: "¡Casi!" },
    { pct: 100, icon: "🏆", msg: "¡Completado!" },
  ],
  fuego: [
    { pct: 25, icon: "🔥", msg: "¡Chispa!" },
    { pct: 50, icon: "🌋", msg: "¡Arde!" },
    { pct: 75, icon: "💥", msg: "¡Explota!" },
    { pct: 100, icon: "🏆", msg: "¡Completado!" },
  ],
  rayo: [
    { pct: 25, icon: "⚡", msg: "¡Corriente!" },
    { pct: 50, icon: "💫", msg: "¡Brilla!" },
    { pct: 75, icon: "✨", msg: "¡Resplandor!" },
    { pct: 100, icon: "🏆", msg: "¡Completado!" },
  ],
  cosmos: [
    { pct: 25, icon: "🌍", msg: "¡Órbita!" },
    { pct: 50, icon: "⭐", msg: "¡Estrella!" },
    { pct: 75, icon: "🌙", msg: "¡Satélite!" },
    { pct: 100, icon: "🏆", msg: "¡Completado!" },
  ],
};

const DEFAULT_MILESTONES = [
  { pct: 25, icon: "💪", msg: "¡Empezando fuerte!" },
  { pct: 50, icon: "⚡", msg: "¡Mitad de camino!" },
  { pct: 75, icon: "🔥", msg: "¡Casi!" },
  { pct: 100, icon: "🏆", msg: "¡Completado!" },
];

export function MilestoneBar({ level, progress, total, title, label, barColor, accentColor }) {
  const milestones = LEVEL_MILESTONES[level] || DEFAULT_MILESTONES;
  const pct = total > 0 ? Math.min(Math.round((progress / total) * 100), 100) : 0;
  const [reached, setReached] = useState(new Set());
  const [fresh, setFresh] = useState(null);
  const prev = useRef(0);

  useEffect(() => {
    const p = prev.current;
    prev.current = pct;
    for (const m of milestones) {
      if (p < m.pct && pct >= m.pct && !reached.has(m.pct)) {
        setReached(r => new Set(r).add(m.pct));
        setFresh(m.pct);
        setTimeout(() => setFresh(null), 2000);
      }
    }
  }, [pct]);

  const filledDots = Math.round((pct / 100) * 10);

  return (
    <div className="w-full text-center relative">
      <p className={`text-[10px] font-semibold mb-1 transition-colors duration-500 ${accentColor || "text-amber-400"}`}>
        {title}
      </p>

      <div className="relative h-6 mb-0.5">
        {milestones.filter(m => m.pct < 100).map(m => {
          const isReached = reached.has(m.pct);
          const isFresh = fresh === m.pct;
          return (
            <div
              key={m.pct}
              className={`absolute -translate-x-1/2 transition-all duration-500 ease-out ${
                isReached ? "opacity-100 scale-100" : "opacity-0 scale-0"
              } ${isFresh ? "animate-bounce" : ""}`}
              style={{ left: `${m.pct}%` }}
              title={m.msg}
            >
              <span className="text-base drop-shadow-lg cursor-default inline-block">{m.icon}</span>
            </div>
          );
        })}
      </div>

      <div className={`relative w-full h-1.5 rounded-full overflow-hidden ring-1 ring-white/10 transition-all duration-700 ${
        pct >= 100 ? "bg-gray-700/80 shadow-lg shadow-yellow-500/40" : "bg-gray-700/60"
      }`}>
        <div className="absolute inset-0 flex items-center justify-around px-[1px] z-10 pointer-events-none">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className={`w-[3px] h-[3px] rounded-full transition-all duration-500 ${
                i <= filledDots ? "bg-white/70 shadow-sm shadow-white/50" : "bg-gray-600/30"
              }`}
            />
          ))}
        </div>

        <div
          className={`h-full rounded-full transition-all duration-500 ease-out relative ${barColor || "bg-amber-500"}`}
          style={{ width: `${pct}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/15 to-transparent rounded-full" />

          {pct > 0 && pct < 100 && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-full pointer-events-none">
              <div
                className={`w-full h-full rounded-full animate-pulse ${barColor || "bg-amber-500"}`}
                style={{ opacity: 0.2, animationDuration: "1.5s", filter: "blur(4px)" }}
              />
            </div>
          )}
        </div>
      </div>

      {pct >= 100 && reached.has(100) && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
          <span className="text-2xl animate-bounce inline-block drop-shadow-xl">🏆</span>
        </div>
      )}

      <p className="text-[10px] text-gray-400 mt-0.5">{label}</p>
    </div>
  );
}
