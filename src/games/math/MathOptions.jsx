import { useState, useEffect, useRef } from "react";

export function MathOptions({ options, correctAnswer, selectedAnswer, onSelect, disabled, feedback }) {
  const showFeedback = feedback && correctAnswer != null;
  const [flash, setFlash] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const prevShowRef = useRef(false);

  useEffect(() => {
    if (showFeedback && !prevShowRef.current) {
      setFlash(true);
      const pulses = [
        setTimeout(() => setFlash(false), 100),
        setTimeout(() => setFlash(true), 100),
        setTimeout(() => setFlash(false), 100),
        setTimeout(() => setFlash(true), 100),
        setTimeout(() => setFlash(false), 100),
      ];

      if (selectedAnswer !== correctAnswer) {
        setWrongShake(true);
        const shakes = [
          setTimeout(() => setWrongShake(false), 100),
          setTimeout(() => setWrongShake(true), 100),
          setTimeout(() => setWrongShake(false), 100),
          setTimeout(() => setWrongShake(true), 100),
          setTimeout(() => setWrongShake(false), 100),
        ];
        return () => { [...pulses, ...shakes].forEach(clearTimeout); };
      }

      return () => { pulses.forEach(clearTimeout); };
    }
    if (!showFeedback) {
      setFlash(false);
      setWrongShake(false);
    }
    prevShowRef.current = showFeedback;
  }, [showFeedback, selectedAnswer, correctAnswer]);

  const correctGlow = flash ? "scale-[1.15] brightness-150" : "scale-105";

  return (
    <div className="grid grid-cols-2 gap-2 w-full max-w-xs mx-auto">
      {options.map((opt, i) => {
        const isCorrect = showFeedback && opt === correctAnswer;
        const isWrongPick = showFeedback && opt === selectedAnswer && opt !== correctAnswer;

        let cls = "py-2 text-lg font-bold rounded-lg border transition-all duration-150 ";

        if (isCorrect) {
          cls += `bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/40 ${correctGlow}`;
        } else if (isWrongPick) {
          cls += "bg-red-500/80 border-red-400 text-white scale-95 shadow-md shadow-red-500/30";
          if (flash) cls += " brightness-150";
          if (wrongShake) cls += " -rotate-2";
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
