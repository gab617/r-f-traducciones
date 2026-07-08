const BLOBS = [
  { x: 15, y: 25, size: 500, anim: 1 },
  { x: 75, y: 60, size: 420, anim: 2 },
  { x: 40, y: 70, size: 360, anim: 3 },
];

const THEMES = {
  semilla: {
    base: ["#022c22", "#064e3b", "#047857"],
    blobColors: [
      "rgba(16,185,129,0.12)",
      "rgba(5,150,105,0.08)",
      "rgba(52,211,153,0.06)",
    ],
  },
  fuego: {
    base: ["#450a0a", "#7f1d1d", "#b45309"],
    blobColors: [
      "rgba(239,68,68,0.12)",
      "rgba(249,115,22,0.08)",
      "rgba(251,146,60,0.06)",
    ],
  },
  rayo: {
    base: ["#422006", "#78350f", "#a16207"],
    blobColors: [
      "rgba(234,179,8,0.12)",
      "rgba(245,158,11,0.08)",
      "rgba(250,204,21,0.06)",
    ],
  },
  cosmos: {
    base: ["#1e1b4b", "#2e1065", "#4c1d95"],
    blobColors: [
      "rgba(139,92,246,0.12)",
      "rgba(99,102,241,0.08)",
      "rgba(168,85,247,0.06)",
    ],
  },
};

export function LevelBackground({ level }) {
  const theme = level ? THEMES[level] : null;
  if (!theme) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-[background] duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(135deg, ${theme.base[0]} 0%, ${theme.base[1]} 50%, ${theme.base[2]} 100%)`,
          backgroundSize: "200% 200%",
          animation: "gb-shift 20s ease-in-out infinite alternate",
        }}
      />

      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="absolute rounded-full transition-colors duration-1000 ease-in-out"
          style={{
            left: `${blob.x}%`,
            top: `${blob.y}%`,
            width: blob.size,
            height: blob.size,
            backgroundColor: theme.blobColors[i],
            filter: "blur(80px)",
            animation: `gb-drift-${blob.anim} 25s ease-in-out infinite alternate`,
          }}
        />
      ))}

      <style>{`
        @keyframes gb-shift {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
        @keyframes gb-drift-1 {
          0% { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(3%, -2.5%) scale(1.15); }
        }
        @keyframes gb-drift-2 {
          0% { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(-2.5%, 3%) scale(0.9); }
        }
        @keyframes gb-drift-3 {
          0% { transform: translate(0%, 0%) scale(1); }
          100% { transform: translate(2%, 1.5%) scale(1.1); }
        }
      `}</style>
    </div>
  );
}
