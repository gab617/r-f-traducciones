/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const CORRECT_MSGS = [
  "¡Muy bien! 🎉",
  "¡Excelente! ⭐",
  "¡Genial! 🌟",
  "¡Sos un crack! 💪",
  "¡Perfecto! 👏",
  "¡Increíble! 🚀",
  "¡Lo sabías! 🧠",
  "¡Fantástico! ✨",
];

const INCORRECT_MSGS = [
  "¡Casi! Seguí intentando 💪",
  "No te rindas, vos podés 🌟",
  "¡Otra vez! La próxima la tenés 🎯",
  "Casi casi, ¡dale! 🙌",
];

export function FunMessage({ type, active }) {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    const pool = type === "correct" ? CORRECT_MSGS : INCORRECT_MSGS;
    setMsg(pool[Math.floor(Math.random() * pool.length)]);
    setVisible(true);
    setKey((k) => k + 1);

    const timer = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timer);
  }, [active, type]);

  if (!visible) return null;

  return (
    <div
      key={key}
      className="fixed top-1/3 left-1/2 z-40 pointer-events-none"
    >
      <div className="-translate-x-1/2 text-center">
        <span
          className={`inline-block text-xl sm:text-5xl font-bold px-3 py-1.5 sm:px-6 sm:py-3 rounded-2xl shadow-xl ${
            type === "correct"
              ? "bg-green-500 text-white"
              : "bg-orange-500 text-white"
          }`}
          style={{
            animation: visible
              ? type === "correct"
                ? "fun-bounce-in 0.5s ease-out"
                : "fun-shake 0.5s ease-out"
              : "none",
          }}
        >
          {msg}
        </span>
      </div>
    </div>
  );
}
