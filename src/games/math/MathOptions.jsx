export function MathOptions({ options, correctAnswer, onSelect, disabled, feedback }) {
  const showGreen = feedback && correctAnswer != null;

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-xs mx-auto">
      {options.map((opt, i) => {
        let cls =
          "py-4 text-2xl font-bold rounded-xl transition-all duration-200 border-2";

        if (showGreen && opt === correctAnswer) {
          cls += " bg-green-500 border-green-400 text-white scale-105";
        } else if (disabled) {
          cls += " bg-white/5 border-white/10 text-white/40";
        } else {
          cls +=
            " bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-95";
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
