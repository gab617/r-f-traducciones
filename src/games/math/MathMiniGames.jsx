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

function Palitos({ value, color = "bg-indigo-400/60" }) {
  return (
    <div className="flex items-center flex-wrap gap-[3px]">
      {Array.from({ length: value }, (_, i) => (
        <div key={i} className={`w-[5px] h-3 rounded-sm ${color}`} />
      ))}
    </div>
  );
}

function generateGuidedSteps(problem) {
  const { a, b, operator, answer } = problem;
  const steps = [];

  if (operator === "+") {
    const aDec = Math.floor(a / 10) * 10;
    const aUni = a % 10;
    const bDec = Math.floor(b / 10) * 10;
    const bUni = b % 10;

    if (a > 10 || b > 10) {
      steps.push({ text: `${a} = ${aDec} + ${aUni}`, nums: [aDec, aUni] });
      steps.push({ text: `${b} = ${bDec} + ${bUni}`, nums: [bDec, bUni] });
      steps.push({ text: `${aDec} + ${bDec} = ${aDec + bDec}`, nums: [aDec, bDec, aDec + bDec] });
      steps.push({ text: `${aUni} + ${bUni} = ${aUni + bUni}`, nums: [aUni, bUni, aUni + bUni] });
      steps.push({ text: `${aDec + bDec} + ${aUni + bUni} = ${answer}`, nums: [aDec + bDec, aUni + bUni, answer] });
    } else {
      steps.push({ text: `${a} + ${b} = ${answer}`, nums: [a, b, answer] });
    }
  }

  if (operator === "-") {
    const bDec = Math.floor(b / 10) * 10;
    const bUni = b % 10;

    if (b > 10) {
      steps.push({ text: `${a} - ${bDec} = ${a - bDec}`, nums: [a, bDec, a - bDec] });
      steps.push({ text: `${a - bDec} - ${bUni} = ${answer}`, nums: [a - bDec, bUni, answer] });
    } else {
      steps.push({ text: `${a} - ${b} = ${answer}`, nums: [a, b, answer] });
    }
  }

  if (operator === "×") {
    if (b > 1) {
      const halfB = Math.floor(b / 2);
      const otherB = b - halfB;
      steps.push({ text: `${b} = ${halfB} + ${otherB}`, nums: [halfB, otherB] });
      steps.push({ text: `${a} × ${halfB} = ${a * halfB}`, nums: [a, halfB, a * halfB] });
      steps.push({ text: `${a} × ${otherB} = ${a * otherB}`, nums: [a, otherB, a * otherB] });
      steps.push({ text: `${a * halfB} + ${a * otherB} = ${answer}`, nums: [a * halfB, a * otherB, answer] });
    } else {
      steps.push({ text: `${a} × ${b} = ${answer}`, nums: [a, b, answer] });
    }
  }

  if (operator === "÷") {
    steps.push({ text: `${b} × ${answer} = ${a}`, nums: [b, answer, a] });
    steps.push({ text: `${a} ÷ ${b} = ${answer}`, nums: [a, b, answer] });
  }

  return steps;
}

function PistasTab({ problem }) {
  const steps = problem ? generateGuidedSteps(problem) : [];
  if (!steps.length) return null;

  return (
    <div className="flex flex-col w-full">
      {steps.map((s, i) => (
        <div key={i}>
          {i > 0 && <hr className="border-t border-white/10 my-3" />}
          <p className="text-xs font-mono text-gray-200/90 text-center mb-2">{s.text}</p>
          <div className="flex flex-col items-center gap-1.5">
            {s.nums.map((n, j) => (
              <div key={j} className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gray-500 w-8 text-right shrink-0">{n}</span>
                <Palitos
                  value={n}
                  color={
                    s.nums.length > 1 && j === s.nums.length - 1
                      ? "bg-green-400/70"
                      : "bg-indigo-400/70"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DestelloTab({ problem, remaining, onBonusCorrect }) {
  const [speed, setSpeed] = useState(1);
  const [cards, setCards] = useState([]);
  const [revealed, setRevealed] = useState(false);
  const effectiveRemaining = remaining / speed;
  const show = effectiveRemaining <= 3 && effectiveRemaining > 0;
  const prevRemainingRef = useRef(effectiveRemaining);

  useEffect(() => {
    if (!show || revealed) return;
    if (effectiveRemaining !== prevRemainingRef.current && effectiveRemaining <= 3) {
      prevRemainingRef.current = effectiveRemaining;
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
  }, [effectiveRemaining, show, revealed, problem, cards.length]);

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
      <div className="flex gap-1.5 items-center">
        <span className="text-[10px] text-gray-500 mr-1">Vel:</span>
        {[1, 1.5, 2].map((v) => (
          <button
            key={v}
            onClick={() => setSpeed(v)}
            className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
              speed === v
                ? "bg-indigo-500/60 text-white border border-indigo-400/40"
                : "bg-white/5 text-gray-500 hover:text-white border border-transparent"
            }`}
          >
            x{v}
          </button>
        ))}
      </div>
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
          <PistasTab problem={problem} />
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
