const KEYS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  ["⌫", 0, "✓"],
];

export function Numpad({ value, onInput, onSubmit, disabled }) {
  const maxDigits = 5;

  const handlePress = (key) => {
    if (disabled) return;
    if (key === "⌫") {
      onInput(value.slice(0, -1));
    } else if (key === "✓") {
      if (value.length > 0) onSubmit(parseInt(value, 10));
    } else {
      if (value.length >= maxDigits) return;
      if (value === "0") {
        onInput(String(key));
      } else {
        onInput(value + key);
      }
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-white/5 rounded-xl p-3 mb-3 text-center min-h-[3rem] flex items-center justify-center">
        <span className="text-3xl font-mono font-bold text-white">
          {value || <span className="text-gray-500">0</span>}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {KEYS.flat().map((key) => {
          const isNumber = typeof key === "number";
          const isSubmit = key === "✓";
          const isDelete = key === "⌫";

          let cls =
            "py-4 text-xl font-bold rounded-xl transition-all duration-100 active:scale-95 ";

          if (isSubmit) {
            cls +=
              "bg-gradient-to-br from-green-600 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-400";
          } else if (isDelete) {
            cls += "bg-white/10 text-white/70 hover:bg-white/20";
          } else {
            cls += "bg-white/15 text-white hover:bg-white/25";
          }

          if (disabled && (isSubmit || isDelete)) cls += " opacity-50";

          const label = isSubmit ? "✓" : isDelete ? "⌫" : String(key);

          return (
            <button
              key={`numpad-${key}`}
              onClick={() => handlePress(key)}
              disabled={disabled && (isSubmit || isDelete)}
              className={cls}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
