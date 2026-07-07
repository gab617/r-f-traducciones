import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "pistas", label: "💡 Desestructurar" },
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

function PalitoRow({ value, color, onComplete }) {
  const [litCount, setLitCount] = useState(0);
  const completed = useRef(false);

  useEffect(() => {
    setLitCount(0);
    completed.current = false;
    if (value === 0) {
      completed.current = true;
      onComplete?.();
    }
  }, [value]);

  const handleFill = () => {
    if (completed.current) return;
    setLitCount(value);
    completed.current = true;
    onComplete?.();
  };

  const done = completed.current;

  if (value === 0) return null;

  return (
    <div className="flex items-center flex-wrap gap-[3px] select-none touch-none">
      {Array.from({ length: value }, (_, i) => (
        <div
          key={i}
          className={`w-[5px] h-3 rounded-sm transition-all duration-100 ${
            i < litCount ? color : "bg-gray-700/50"
          }`}
        />
      ))}
      <button
        onClick={handleFill}
        className={`shrink-0 h-[26px] px-4 rounded-full font-bold text-xs tracking-wider transition-all duration-150 active:scale-95 flex items-center justify-center gap-1 ${
          done
            ? "bg-green-500 text-white shadow shadow-green-500/30"
            : "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow shadow-orange-500/40 animate-pulse"
        }`}
      >
        {done ? "✓" : "▸▸"}
      </button>
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
      steps.push({ text: `${a} = ${aDec} + ${aUni}`, nums: [aDec, aUni], result: "" });
      steps.push({ text: `${b} = ${bDec} + ${bUni}`, nums: [bDec, bUni], result: "" });
      steps.push({ text: `${aDec} + ${bDec} = `, nums: [aDec, bDec], result: aDec + bDec });
      steps.push({ text: `${aUni} + ${bUni} = `, nums: [aUni, bUni], result: aUni + bUni });
      steps.push({ text: `${aDec + bDec} + ${aUni + bUni} = `, nums: [], result: answer });
    } else {
      steps.push({ text: `${a} + ${b} = `, nums: [a, b], result: answer });
    }
  }

  if (operator === "-") {
    const bDec = Math.floor(b / 10) * 10;
    const bUni = b % 10;

    if (b > 10) {
      steps.push({ text: `${a} - ${bDec} = `, nums: [a, bDec], result: a - bDec });
      steps.push({ text: `${a - bDec} - ${bUni} = `, nums: [a - bDec, bUni], result: answer });
    } else {
      steps.push({ text: `${a} - ${b} = `, nums: [a, b], result: answer });
    }
  }

  if (operator === "×") {
    if (b > 1) {
      const halfB = Math.floor(b / 2);
      const otherB = b - halfB;
      steps.push({ text: `${b} = ${halfB} + ${otherB}`, nums: [halfB, otherB], result: "" });
      steps.push({ text: `${a} × ${halfB} = `, nums: [a, halfB], result: a * halfB });
      if (otherB !== halfB) {
        steps.push({ text: `${a} × ${otherB} = `, nums: [a, otherB], result: a * otherB });
      }
      steps.push({ text: `${a * halfB} + ${a * otherB} = `, nums: [a * halfB, a * otherB], result: answer });
    } else {
      steps.push({ text: `${a} × ${b} = `, nums: [a, b], result: answer });
    }
  }

  if (operator === "÷") {
    steps.push({ text: `${b} × ${answer} = `, nums: [b, answer], result: a });
    steps.push({ text: `${a} ÷ ${b} = `, nums: [a, b], result: answer });
  }

  return steps;
}

function PistasTab({ problem }) {
  const steps = problem ? generateGuidedSteps(problem) : [];
  const [rowsDone, setRowsDone] = useState({});
  const stepKey = problem?.key;

  useEffect(() => {
    setRowsDone({});
  }, [stepKey]);

  if (!steps.length) return null;

  const handleRowDone = (stepIdx) => {
    setRowsDone((prev) => {
      const key = stepIdx;
      const current = prev[key] || 0;
      return { ...prev, [key]: current + 1 };
    });
  };

  return (
    <div className="flex flex-col w-full">
      {steps.map((s, i) => {
        const isComplete = (rowsDone[i] || 0) >= s.nums.length;
        return (
          <div key={i}>
            {i > 0 && <hr className="border-t border-white/10 my-3" />}
            <div className="flex flex-col items-start gap-1.5">
              {s.nums.map((n, j) => (
                <div key={j} className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono w-8 text-right shrink-0 transition-all duration-300 ${
                    s.nums.length > 1 && j === s.nums.length - 1 && isComplete
                      ? "text-green-400"
                      : "text-gray-500"
                  }`}>{n}</span>
                  <PalitoRow
                    value={n}
                    color={
                      s.nums.length > 1 && j === s.nums.length - 1
                        ? "bg-green-400/70"
                        : "bg-indigo-400/70"
                    }
                    onComplete={() => handleRowDone(i)}
                  />
                </div>
              ))}
            </div>
            <p className="text-xs font-mono mt-2 transition-all duration-300">
              <span className={isComplete ? "text-green-300" : "text-gray-500"}>
                {s.text}
              </span>
              {s.result !== "" ? (
                isComplete ? (
                  <span className="text-green-300 font-bold animate-pulse">{s.result}</span>
                ) : (
                  <span className="text-gray-600">?</span>
                )
              ) : null}
            </p>
          </div>
        );
      })}
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

export function MathMiniGames({ problem }) {
  const [tab, setTab] = useState("pistas");

  return (
    <div className="w-full mt-4 border-t border-white/10 pt-3">
      <TabBar active={tab} onChange={setTab} />
      <div className="mt-3 min-h-[80px]">
        {tab === "pistas" && <PistasTab problem={problem} />}
        {tab === "abaco" && <AbacoTab problem={problem} />}
        {tab === "ecos" && <EcosTab problem={problem} />}
      </div>
    </div>
  );
}
