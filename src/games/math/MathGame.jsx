import { useState, useContext } from "react";
import { MathPlay } from "./MathPlay";
import { AppContext } from "../../context/AppContext";

const LEVELS = [
  {
    id: "semilla",
    name: "Semilla",
    icon: "🌱",
    desc: "Sumas y restas sencillas de un dígito.",
    color: "from-green-600 to-emerald-500",
    ops: ["+", "-"],
  },
  {
    id: "fuego",
    name: "Fuego",
    icon: "🔥",
    desc: "Sumas y restas de dos dígitos.",
    color: "from-orange-600 to-red-500",
    ops: ["+", "-"],
  },
  {
    id: "rayo",
    name: "Rayo",
    icon: "⚡",
    desc: "Multiplicaciones y divisiones.",
    color: "from-yellow-500 to-amber-600",
    ops: ["×", "÷"],
  },
  {
    id: "cosmos",
    name: "Cosmos",
    icon: "🌌",
    desc: "Todas las operaciones con números de 1 a 99.",
    color: "from-indigo-600 to-purple-800",
    ops: null,
  },
];

const ALL_OPS = [
  { op: "+", label: "➕ Suma" },
  { op: "-", label: "➖ Resta" },
  { op: "×", label: "✖️ Multi" },
  { op: "÷", label: "➗ Div" },
];

const opColors = {
  "+": "bg-green-700 text-white border-green-400",
  "-": "bg-red-700 text-white border-red-400",
  "×": "bg-yellow-600 text-white border-yellow-400",
  "÷": "bg-blue-700 text-white border-blue-400",
};

function resolveOps(levelId, cosmosOps) {
  if (levelId === "cosmos") return cosmosOps;
  return LEVELS.find((l) => l.id === levelId).ops;
}

export function MathGame() {
  const { user, pointsMath, rachaMath, setPointsMath, setRachaMath, refreshUsers, updateUserScore } = useContext(AppContext);
  const [level, setLevel] = useState(null);
  const [mode, setMode] = useState(null);
  const [customTime, setCustomTime] = useState(20);
  const [activeOps, setActiveOps] = useState(ALL_OPS.map((o) => o.op));

  const toggleOp = (op) => {
    setActiveOps((prev) => {
      if (prev.includes(op)) {
        if (prev.length === 1) return prev;
        return prev.filter((o) => o !== op);
      }
      return [...prev, op];
    });
  };

  if (level && mode) {
    return (
      <MathPlay
        level={level}
        mode={mode}
        customTime={customTime}
        activeOps={resolveOps(level, activeOps)}
        onBack={() => { setLevel(null); setMode(null); }}
        user={user}
        pointsMath={pointsMath}
        rachaMath={rachaMath}
        setPointsMath={setPointsMath}
        setRachaMath={setRachaMath}
        onSaveRefreshUsers={refreshUsers}
        onLocalUserUpdate={updateUserScore}
        userHandle={user?.user_handle || user?.user}
      />
    );
  }

  if (level) {
    return (
      <div className="flex flex-col items-center px-4 pt-6 pb-4 gap-6">
        <button
          onClick={() => setLevel(null)}
          className="self-start text-sm text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10"
        >
          ← Volver
        </button>

        <div className="flex items-center gap-3">
          <span className="text-5xl">{LEVELS.find((l) => l.id === level).icon}</span>
          <div>
            <h2 className="text-2xl font-bold text-white">{LEVELS.find((l) => l.id === level).name}</h2>
            <p className="text-sm text-gray-400">{LEVELS.find((l) => l.id === level).desc}</p>
          </div>
        </div>

        {level === "cosmos" && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {ALL_OPS.map(({ op, label }) => {
              const active = activeOps.includes(op);
              return (
                <button
                  key={op}
                  onClick={() => toggleOp(op)}
                  className={`px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "bg-white/20 text-white shadow-lg shadow-orange-500/50 ring-2 ring-orange-400/30 scale-105 border border-orange-300/30"
                      : "bg-white/5 text-gray-500 hover:text-white/60 border border-transparent"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}

        <div className="flex gap-4 w-full max-w-xs">
          <button
            onClick={() => setMode("campaign")}
            className="flex-1 flex flex-col items-center gap-2 px-6 py-5 rounded-2xl bg-gradient-to-br from-amber-600/40 to-orange-600/40 border border-amber-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-3xl">🎯</span>
            <span className="font-bold text-white">Campaña</span>
            <span className="text-xs text-gray-400 text-center leading-tight">
              Etapas de menor a mayor dificultad
            </span>
          </button>
          <button
            onClick={() => setMode("infinite")}
            className="flex-1 flex flex-col items-center gap-2 px-6 py-5 rounded-2xl bg-gradient-to-br from-blue-600/40 to-cyan-600/40 border border-blue-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-3xl">♾️</span>
            <span className="font-bold text-white">Infinito</span>
            <span className="text-xs text-gray-400 text-center leading-tight">
              Sin presión, jugá a tu ritmo
            </span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4 pt-6 pb-4 gap-4">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          🧮 Matemáticas
        </h2>
        <p className="text-sm text-gray-400 mt-1">
          Elegí un nivel y empezá a practicar
        </p>
      </div>

      <div className="w-full max-w-md flex items-center justify-center gap-2 bg-white/5 rounded-full px-4 py-2">
        <span className="text-gray-400 text-sm">⏱</span>
        <button
          onClick={() => setCustomTime((t) => Math.max(5, t - 5))}
          className="px-2 py-1 text-white/60 hover:text-white transition-colors font-bold text-lg"
        >
          −
        </button>
        <span className="text-white font-mono font-bold text-lg w-8 text-center">{customTime}</span>
        <span className="text-gray-500 text-xs">s</span>
        <button
          onClick={() => setCustomTime((t) => Math.min(30, t + 5))}
          className="px-2 py-1 text-white/60 hover:text-white transition-colors font-bold text-lg"
        >
          +
        </button>
        <span className="text-gray-500 text-xs ml-2">por cuenta</span>
      </div>

      <div className="w-full max-w-md flex flex-col gap-3">
        {LEVELS.map((lvl) => (
          <button
            key={lvl.id}
            onClick={() => setLevel(lvl.id)}
            className={`w-full text-left rounded-2xl overflow-hidden bg-gradient-to-br ${lvl.color} p-4 shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]`}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{lvl.icon}</span>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-white">{lvl.name}</h3>
                <p className="text-xs text-white/70 mt-0.5 leading-tight">{lvl.desc}</p>
              </div>
              <span className="flex gap-1.5 shrink-0">
                {lvl.ops
                  ? lvl.ops.map((op) => (
                      <span key={op} className={`text-sm font-bold px-2.5 py-1 rounded-lg border shadow-sm ${opColors[op] || "bg-gray-700 text-white border-gray-400"}`}>
                        {op}
                      </span>
                    ))
                  : ["➕", "➖", "✖️", "➗"].map((e) => (
                      <span key={e} className="text-sm px-1.5 py-1 rounded-lg bg-white/20 text-white border border-white/20">
                        {e}
                      </span>
                    ))}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
