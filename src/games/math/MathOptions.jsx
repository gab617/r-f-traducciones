import { useState, useEffect, useRef } from "react";

export function MathOptions({ options, correctAnswer, selectedAnswer, onSelect, disabled, feedback }) {
  const showFeedback = feedback && correctAnswer != null;
  const [flash, setFlash] = useState(false);
  const prevShowRef = useRef(false);

  useEffect(() => {
    if (showFeedback && !prevShowRef.current) {
      setFlash(true);
      const t1 = setTimeout(() => setFlash(false), 120);
      const t2 = setTimeout(() => setFlash(true), 300);
      const t3 = setTimeout(() => setFlash(false), 420);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
    if (!showFeedback) setFlash(false);
    prevShowRef.current = showFeedback;
  }, [showFeedback]);

  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-xs mx-auto">
      {options.map((opt, i) => {
        const isCorrect = showFeedback && opt === correctAnswer;
        const isWrongPick = showFeedback && opt === selectedAnswer && opt !== correctAnswer;

        let cls = "py-2 text-lg font-bold rounded-lg border transition-all duration-200 ";

        if (isCorrect) {
          cls += "bg-green-500 border-green-400 text-white scale-105 shadow-lg shadow-green-500/40";
          if (flash) cls += " brightness-150";
        } else if (isWrongPick) {
          cls += "bg-red-500/80 border-red-400 text-white scale-95 shadow-md shadow-red-500/30";
          if (flash) cls += " brightness-150";
        } else if (disabled) {
          cls += " bg-white/5 border-white/10 text-white/40";
        } else {
          cls += " bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-95";
        }

        return (
          <button
            key={`${opt}-${i}`}
            onClick={() => onSelect(opt)}
            disabled={disabled}
            className={cls}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
