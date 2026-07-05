import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "pistas", label: "💡 Pistas" },
  { id: "destello", label: "⚡ Destello" },
  { id: "abaco", label: "🧮 Ábaco" },
  { id: "ecos", label: "🔊 Ecos" },
];

function TabBar({ active, onChange }) {
  return (
    <div className="flex gap-1 bg-white/5 rounded-xl p-1 overflow-x-auto">
      {TABS.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
            active === t.id
              ? "bg-white/20 text-white shadow-md"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function PistasTab({ remaining, onHintsUsed }) {
  const hintsLeft = 3;
  const [used, setUsed] = useState(0);
  const show = remaining <= 5 && remaining > 0;

  if (!show) return null;

  const useHint = (type) => {
    if (used >= hintsLeft) return;
    setUsed((u) => u + 1);
    onHintsUsed?.(type);
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-xs text-gray-400">
        🔔 Quedan {remaining}s — Comodines disponibles ({hintsLeft - used})
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => useHint("remove")}
          disabled={used >= hintsLeft}
          className="px-3 py-2 rounded-lg bg-purple-600/40 border border-purple-400/30 text-xs font-bold text-purple-200 hover:bg-purple-600/60 disabled:opacity-30 transition-all"
        >
          🔍 Eliminar 2
        </button>
        <button
          onClick={() => useHint("focus")}
          disabled={used >= hintsLeft}
          className="px-3 py-2 rounded-lg bg-amber-600/40 border border-amber-400/30 text-xs font-bold text-amber-200 hover:bg-amber-600/60 disabled:opacity-30 transition-all"
        >
          🎯 Enfoque
        </button>
      </div>
    </div>
  );
}

function DestelloTab({ problem, remaining, onBonusCorrect }) {
  const [cards, setCards] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const show = remaining <= 3 && remaining > 0;
  const prevRemainingRef = useRef(remaining);

  useEffect(() => {
    if (!show || revealed) return;
    if (remaining !== prevRemainingRef.current && remaining <= 3) {
      prevRemainingRef.current = remaining;
      if (cards.length === 0) {
        const distractors = new Set();
        while (distractors.size < 2) {
          const d = problem.answer + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 5) + 1);
          if (d >= 0 && d !== problem.answer) distractors.add(d);
        }
        const shuffled = [...distractors, problem.answer].sort(() => Math.random() - 0.5);
        setCards(shuffled);
      }
    }
  }, [remaining, show, revealed, problem, cards.length]);

  const pick = (val) => {
    if (revealed) return;
    setRevealed(true);
    if (val === problem.answer) {
      onBonusCorrect?.();
    }
  };

  if (!show) return null;

  return (
    <div className="flex flex-col gap-2 items-center">
      <p className="text-xs text-gray-400 animate-pulse">
        ⚡ Destello rápido — tocá una carta antes que termine
      </p>
      <div className="flex gap-3">
        {cards.map((val, i) => {
          let cls = "w-16 h-16 rounded-xl text-xl font-bold transition-all duration-200 border-2 ";
          if (revealed) {
            cls += val === problem.answer
              ? "bg-green-500 border-green-400 text-white scale-110"
              : "bg-white/5 border-white/10 text-white/40";
          } else {
            cls += "bg-gradient-to-br from-indigo-600/60 to-purple-600/60 border-indigo-400/40 text-white hover:scale-105 active:scale-95";
          }
          return (
            <button
              key={`card-${i}`}
              onClick={() => pick(val)}
              disabled={revealed}
              className={cls}
            >
              {revealed ? val : "?"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const ROMAN = [
  "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X",
  "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX",
  "XXI", "XXII", "XXIII", "XXIV", "XXV", "XXVI", "XXVII", "XXVIII", "XXIX", "XXX",
];

function toRoman(n) {
  return n <= 30 ? ROMAN[n] : String(n);
}

function AbacoTab({ problem }) {
  const [beads, setBeads] = useState(0);

  useEffect(() => {
    setBeads(0);
  }, [problem.key]);

  const inc = () => setBeads((b) => Math.min(b + 1, problem.answer));
  const dec = () => setBeads((b) => Math.max(b - 1, 0));

  const answer = problem.answer;
  const totalBeads = Math.min(answer, 30);
  const tensFloor = Math.floor(answer / 10) * 10;
  const tensSize = Math.min(tensFloor, totalBeads);
  const unitsSize = totalBeads - tensSize;

  return (
    <div className="flex flex-col gap-3 items-center">
      <p className="text-xs text-gray-400">
        Armá el resultado:{" "}
        <strong className="text-white text-sm">{beads}</strong>{" "}
        <span className="text-gray-500">/</span>{" "}
        <span className="text-gray-300">{answer}</span>
        <span className="text-white/30 ml-1.5 text-[10px] font-mono">
          {toRoman(beads)}
        </span>
      </p>

      <div className="flex items-center gap-2">
        <button
          onClick={dec}
          disabled={beads === 0}
          className="w-8 h-8 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed text-lg font-bold flex items-center justify-center transition-all active:scale-90"
        >
          −
        </button>

        <div className="flex gap-1.5 flex-wrap justify-center max-w-[300px] px-2 py-2 rounded-2xl bg-white/[0.03]">
          {tensSize > 0 && Array.from({ length: tensSize }, (_, i) => {
            const pos = i + 1;
            const active = i < Math.min(beads, tensSize);
            return (
              <div
                key={`t-${i}`}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold border transition-all duration-200 ${
                  active
                    ? "bg-cyan-500/90 text-white border-cyan-300/50 shadow-md shadow-cyan-500/30 scale-100"
                    : "bg-gray-800/60 text-gray-600 border-gray-700/50"
                }`}
              >
                {toRoman(pos)}
              </div>
            );
          })}
          {tensSize > 0 && unitsSize > 0 && (
            <div className="w-[2px] bg-gradient-to-b from-transparent via-gray-600 to-transparent rounded-full mx-1" />
          )}
          {Array.from({ length: unitsSize }, (_, i) => {
            const pos = tensSize + i + 1;
            const active = i < beads - tensSize;
            return (
              <div
                key={`u-${i}`}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-200 ${
                  active
                    ? "bg-amber-400/90 text-gray-900 border-amber-300/60 shadow-md shadow-amber-400/30 scale-100"
                    : "bg-gray-800/60 text-gray-600 border-gray-700/50"
                }`}
              >
                {toRoman(pos)}
              </div>
            );
          })}
        </div>

        <button
          onClick={inc}
          disabled={beads >= answer}
          className="w-8 h-8 rounded-xl bg-white/10 text-white/70 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed text-lg font-bold flex items-center justify-center transition-all active:scale-90"
        >
          +
        </button>
      </div>

      <div className="flex gap-5 text-[11px]">
        {tensSize > 0 && (
          <span className="text-gray-500">
            <span className="inline-block w-3 h-3 rounded-sm bg-cyan-500/70 align-middle mr-1.5" />
            <span className="text-cyan-300">Decenas</span>
          </span>
        )}
        {unitsSize > 0 && (
          <span className="text-gray-500">
            <span className="inline-block w-3 h-3 rounded-full bg-amber-400/70 align-middle mr-1.5" />
            <span className="text-amber-300">Unidades</span>
          </span>
        )}
      </div>

      {beads === answer && (
        <p className="text-sm text-green-400 font-bold animate-bounce">🎉 ¡Llegaste!</p>
      )}
    </div>
  );
}

function EcosTab({ problem }) {
  const { a, b, operator, answer } = problem;

  const steps = [];
  if (operator === "+") {
    steps.push(`${a} + ${b} = ${answer}`);
    if (a > 10 || b > 10) {
      const aDec = Math.floor(a / 10) * 10;
      const aUni = a % 10;
      const bDec = Math.floor(b / 10) * 10;
      const bUni = b % 10;
      if (aDec > 0) steps.push(`${a} = ${aDec} + ${aUni}`);
      if (bDec > 0) steps.push(`${b} = ${bDec} + ${bUni}`);
      steps.push(`(${aDec} + ${bDec}) + (${aUni} + ${bUni}) = ${a + b}`);
    } else {
      steps.push(`Contar desde ${a}: ${a} → ${a + b}`);
      steps.push(`${b} más allá de ${a} es ${answer}`);
    }
  }
  if (operator === "-") {
    steps.push(`${a} - ${b} = ${answer}`);
    steps.push(`${b} + ${answer} = ${a} (prueba)`);
  }
  if (operator === "×") {
    steps.push(`${a} × ${b} = ${answer}`);
    if (b > 1) {
      const half = Math.floor(b / 2);
      steps.push(`(${a} × ${half}) + (${a} × ${b - half})`);
      steps.push(`${a * half} + ${a * (b - half)} = ${answer}`);
    }
  }
  if (operator === "÷") {
    steps.push(`${a} ÷ ${b} = ${answer}`);
    steps.push(`${b} × ${answer} = ${a}`);
  }

  return (
    <div className="flex flex-col gap-1 items-center">
      <p className="text-xs text-gray-400 mb-1">🔊 Descomposición de la operación</p>
      <div className="flex flex-wrap gap-1.5 justify-center">
        {steps.length === 0 ? (
          <span className="text-[10px] text-gray-500">Muy simple, contalo con los dedos 😄</span>
        ) : (
          steps.map((s, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md bg-white/5 text-gray-300 text-[10px] font-mono"
            >
              {s}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export function MathMiniGames({ problem, timerRunning, customTime, onBonusCorrect, onHintsUsed }) {
  const [tab, setTab] = useState("pistas");
  const [remaining, setRemaining] = useState(customTime);

  useEffect(() => {
    setRemaining(customTime);
  }, [problem, customTime]);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setRemaining((prev) => +(prev - 0.1).toFixed(1));
    }, 100);
    return () => clearInterval(id);
  }, [timerRunning]);

  return (
    <div className="w-full mt-4 border-t border-white/10 pt-3">
      <TabBar active={tab} onChange={setTab} />
      <div className="mt-3 min-h-[80px]">
        {tab === "pistas" && (
          <PistasTab remaining={remaining} onHintsUsed={onHintsUsed} />
        )}
        {tab === "destello" && (
          <DestelloTab
            problem={problem}
            remaining={remaining}
            onBonusCorrect={onBonusCorrect}
          />
        )}
        {tab === "abaco" && <AbacoTab problem={problem} />}
        {tab === "ecos" && <EcosTab problem={problem} />}
      </div>
    </div>
  );
}
