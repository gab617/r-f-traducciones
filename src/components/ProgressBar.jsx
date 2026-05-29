/* eslint-disable react/prop-types */
export function ProgressBar({ resolved, total, label }) {
  const pct = total > 0 ? Math.round((resolved / total) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto px-4 mb-2">
      <div className="flex justify-between text-sm text-white mb-1">
        <span className="font-semibold">{label}</span>
        <span className="font-semibold text-yellow-400">
          {resolved}/{total}
        </span>
      </div>
      <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background:
              pct === 100
                ? "linear-gradient(90deg, #4ade80, #22d3ee)"
                : "linear-gradient(90deg, #facc15, #f97316)",
            boxShadow: "0 0 8px rgba(250, 204, 21, 0.5)",
          }}
        />
      </div>
      {pct === 100 && (
        <p className="text-center text-yellow-400 font-bold mt-1 animate-pulse text-lg">
          ¡Completado! 🏆
        </p>
      )}
    </div>
  );
}
