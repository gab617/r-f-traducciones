export function MathOptions({ options, correctAnswer, selectedAnswer, onSelect, disabled, feedback }) {
  const showFeedback = feedback && correctAnswer != null;

  return (
    <>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1.05); }
        }
        @keyframes borderFlash {
          0%, 100% { border-color: var(--bc); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          15% { border-color: #fff; box-shadow: 0 0 10px 3px rgba(255,255,255,0.3), 0 0 0 2px rgba(255,255,255,0.08); }
          35% { border-color: var(--bc); box-shadow: 0 0 4px 1px rgba(255,255,255,0.08); }
          55% { border-color: #fff; box-shadow: 0 0 8px 2px rgba(255,255,255,0.25), 0 0 0 1px rgba(255,255,255,0.05); }
          75% { border-color: var(--bc); box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
      `}</style>
      <div className="grid grid-cols-2 gap-2 w-full max-w-xs mx-auto">
        {options.map((opt, i) => {
          const isCorrect = showFeedback && opt === correctAnswer;
          const isWrongPick = showFeedback && opt === selectedAnswer && opt !== correctAnswer;

          let cls =
            "py-2 text-lg font-bold rounded-lg border transition-all duration-200 ";

          if (isCorrect) {
            cls +=
              "bg-green-500 border-green-400 text-white scale-105 shadow-lg shadow-green-500/40";
          } else if (isWrongPick) {
            cls +=
              "bg-red-500/80 border-red-400 text-white scale-95 shadow-md shadow-red-500/30";
          } else if (disabled) {
            cls += " bg-white/5 border-white/10 text-white/40";
          } else {
            cls +=
              " bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-95";
          }

          const borderColor = isCorrect ? "#4ade80" : isWrongPick ? "#f87171" : undefined;

          return (
            <button
              key={`${opt}-${i}`}
              onClick={() => onSelect(opt)}
              disabled={disabled}
              className={cls}
              style={
                isCorrect
                  ? { animation: "pop 0.4s ease-out forwards, borderFlash 0.8s ease-out", "--bc": borderColor }
                  : isWrongPick
                  ? { animation: "shake 0.45s ease-out, borderFlash 0.8s ease-out", "--bc": borderColor }
                  : undefined
              }
            >
              {opt}
            </button>
          );
        })}
      </div>
    </>
  );
}
