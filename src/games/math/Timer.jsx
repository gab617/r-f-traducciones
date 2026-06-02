import { useState, useEffect, useRef } from "react";

export function Timer({ duration, onTimeout, running }) {
  const [remaining, setRemaining] = useState(duration);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((prev) => {
        const next = +(prev - 0.1).toFixed(1);
        if (next <= 0) {
          clearInterval(id);
          setTimeout(() => onTimeoutRef.current?.(), 0);
          return 0;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  const pct = (remaining / duration) * 100;
  const color =
    pct > 50 ? "bg-green-500" : pct > 25 ? "bg-yellow-500" : "bg-red-500";

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>⏱ {Math.ceil(remaining)}s</span>
      </div>
      <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-100 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
