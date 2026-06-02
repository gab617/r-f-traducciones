import { useState, useEffect, useCallback, useRef } from "react";
import { generateProblem, generateOptions, formatProblem } from "./MathProblem";
import { Timer } from "./Timer";
import { MathOptions } from "./MathOptions";
import { Numpad } from "./Numpad";

const LEVEL_LABEL = {
  semilla: "🌱 Semilla",
  fuego: "🔥 Fuego",
  rayo: "⚡ Rayo",
  cosmos: "🌌 Cosmos",
};

const LEVEL_INPUT = {
  semilla: "options",
  fuego: "numpad",
  rayo: "numpad",
  cosmos: "numpad",
};

export function MathPlay({ level, customTime, activeOps, onBack }) {
  const [inputMode, setInputMode] = useState(LEVEL_INPUT[level]);
  const [problem, setProblem] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [stats, setStats] = useState({ correct: 0, incorrect: 0 });
  const [timerRunning, setTimerRunning] = useState(true);
  const [problemId, setProblemId] = useState(0);
  const historyRef = useRef([]);
  const feedbackTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    };
  }, []);

  const generateNext = useCallback(() => {
    const p = generateProblem(level, activeOps, historyRef.current);
    historyRef.current.push(p.key);
    setProblem(p);
    setInput("");
    setFeedback("");
    setCorrectAnswer(null);
    setTimerRunning(true);
    setProblemId((id) => id + 1);

    if (inputMode === "options") {
      setOptions(generateOptions(p.answer));
    }
  }, [level, activeOps, inputMode]);

  useEffect(() => {
    if (!problem) {
      generateNext();
    }
  }, [problem, generateNext]);

  const handleTimeout = useCallback(() => {
    setFeedback("⏰ Se acabó el tiempo");
    setCorrectAnswer(problem.answer);
    setTimerRunning(false);

    setStats((prev) => ({ ...prev, incorrect: prev.incorrect + 1 }));

    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      generateNext();
    }, 1500);
  }, [problem, generateNext]);

  const handleSubmit = useCallback(
    (value) => {
      if (!problem || !timerRunning) return;
      setTimerRunning(false);

      const isCorrect = value === problem.answer;
      setFeedback(isCorrect ? "✅ ¡Correcto!" : `❌ Incorrecto — Era ${problem.answer}`);
      setCorrectAnswer(problem.answer);
      setStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      }));

      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = setTimeout(() => {
        generateNext();
      }, 1500);
    },
    [problem, timerRunning, generateNext]
  );

  const handleNumPadSubmit = useCallback(() => {
    if (input === "" || !problem) return;
    handleSubmit(Number(input));
  }, [input, problem, handleSubmit]);

  useEffect(() => {
    if (inputMode === "options" && problem) {
      setOptions(generateOptions(problem.answer));
    }
  }, [inputMode, problem]);

  if (!problem) return null;

  return (
    <div className="flex flex-col items-center px-4 pt-6 pb-8 gap-6 max-w-md mx-auto">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10"
        >
          ← Volver
        </button>
        <span className="text-sm font-semibold text-white/80">
          {LEVEL_LABEL[level]}
        </span>
        <span className="text-sm text-gray-400 min-w-[5rem] text-right">
          {stats.correct + stats.incorrect > 0 && (
            <>
              {stats.correct}✅ {stats.incorrect}❌
            </>
          )}
        </span>
      </div>

      <div className="w-full flex items-center justify-center gap-2">
        <button
          onClick={() => setInputMode("numpad")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            inputMode === "numpad"
              ? "bg-white/20 text-white shadow-md"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          ⌨️ Teclado
        </button>
        <button
          onClick={() => setInputMode("options")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            inputMode === "options"
              ? "bg-white/20 text-white shadow-md"
              : "bg-white/5 text-gray-400 hover:text-white"
          }`}
        >
          📋 Opciones
        </button>
      </div>

      <Timer
        key={problemId}
        duration={customTime}
        running={timerRunning}
        onTimeout={handleTimeout}
      />

      <div className="text-center">
        <p className="text-4xl font-bold text-white tracking-wider">
          {formatProblem(problem.a, problem.operator, problem.b)}
        </p>
      </div>

      {inputMode === "numpad" && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="text-5xl font-bold text-white min-h-[3rem]">
            {input || <span className="text-gray-600 font-normal text-2xl">?</span>}
          </div>
          <Numpad value={input} onChange={setInput} onSubmit={handleNumPadSubmit} />
        </div>
      )}

      {inputMode === "options" && (
        <div className="w-full">
          <MathOptions
            options={options}
            correctAnswer={correctAnswer}
            onSelect={handleSubmit}
            disabled={!timerRunning}
          />
        </div>
      )}

      {feedback && (
        <div className="text-lg font-bold animate-pulse">
          {feedback.includes("✅") || feedback.includes("¡Correcto") ? (
            <span className="text-green-400">{feedback}</span>
          ) : (
            <span className="text-red-400">{feedback}</span>
          )}
        </div>
      )}
    </div>
  );
}
