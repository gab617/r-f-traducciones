/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const EMOJIS = ["⭐", "🌟", "✨", "🎉", "🎊", "💫", "🏆", "👏"];
const COLORS = ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#FF69B4"];

function createParticles(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    size: 1 + Math.random() * 1.5,
    rotation: Math.random() * 360,
    delay: Math.random() * 0.3,
    duration: 1.5 + Math.random() * 1.5,
    drift: (Math.random() - 0.5) * 30,
  }));
}

export function Celebration({ active, type = "correct" }) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }
    setParticles(createParticles(type === "complete" ? 20 : 12));
  }, [active, type]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute text-2xl"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}rem`,
              transform: `rotate(${p.rotation}deg)`,
              animation: `celebration-fall ${p.duration}s ease-out ${p.delay}s forwards`,
              "--drift": `${p.drift}px`,
              color: p.color,
            }}
        >
          {p.emoji}
        </div>
      ))}
      <style>{`
        @keyframes celebration-fall {
          0% {
            opacity: 1;
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) translateX(var(--drift)) rotate(360deg) scale(0.3);
          }
        }
      `}</style>
    </div>
  );
}
