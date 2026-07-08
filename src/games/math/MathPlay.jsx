import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { generateProblem, generateOptions, formatProblem } from "./MathProblem";
import { Timer } from "./Timer";
import { MathOptions } from "./MathOptions";
import { Numpad } from "./Numpad";
import { MathMiniGames } from "./MathMiniGames";
import { MilestoneBar } from "./MilestoneBar";
import { uploadPointsMath } from "../../services/userService";
import { AppContext } from "../../context/AppContext";

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

const CAMPAIGN_STAGES = [3, 5, 10, 20, 25, 30];
const MIN_SAVE_INTERVAL = 30000;

const LEVEL_STAGE_STYLES = {
  semilla: [
    { border: "border-emerald-500/30", bar: "bg-emerald-400", accent: "text-emerald-300", shadow: "", icon: "🌱", label: "Etapa 1" },
    { border: "border-emerald-600/30", bar: "bg-emerald-500", accent: "text-emerald-400", shadow: "shadow-emerald-500/20", icon: "🌿", label: "Etapa 2" },
    { border: "border-green-600/30", bar: "bg-green-500", accent: "text-green-400", shadow: "shadow-green-500/30", icon: "🌳", label: "Etapa 3" },
    { border: "border-teal-600/40", bar: "bg-teal-500", accent: "text-teal-400", shadow: "shadow-teal-500/40", icon: "🔥", label: "Etapa 4" },
    { border: "border-emerald-500/40", bar: "bg-emerald-600", accent: "text-emerald-400", shadow: "shadow-emerald-600/50", icon: "⚡", label: "Etapa 5" },
    { border: "border-green-400/50", bar: "bg-green-400", accent: "text-green-300", shadow: "shadow-green-400/60", icon: "👑", label: "Etapa 6" },
  ],
  fuego: [
    { border: "border-red-500/30", bar: "bg-red-400", accent: "text-red-300", shadow: "", icon: "🌱", label: "Etapa 1" },
    { border: "border-red-600/30", bar: "bg-red-500", accent: "text-red-400", shadow: "shadow-red-500/20", icon: "🌿", label: "Etapa 2" },
    { border: "border-orange-600/30", bar: "bg-orange-500", accent: "text-orange-400", shadow: "shadow-orange-500/30", icon: "🌳", label: "Etapa 3" },
    { border: "border-red-700/40", bar: "bg-red-600", accent: "text-red-400", shadow: "shadow-red-600/40", icon: "🔥", label: "Etapa 4" },
    { border: "border-rose-500/40", bar: "bg-rose-500", accent: "text-rose-400", shadow: "shadow-rose-500/50", icon: "⚡", label: "Etapa 5" },
    { border: "border-yellow-500/50", bar: "bg-yellow-500", accent: "text-yellow-400", shadow: "shadow-yellow-500/60", icon: "👑", label: "Etapa 6" },
  ],
  rayo: [
    { border: "border-yellow-500/30", bar: "bg-yellow-400", accent: "text-yellow-300", shadow: "", icon: "🌱", label: "Etapa 1" },
    { border: "border-amber-500/30", bar: "bg-amber-500", accent: "text-amber-400", shadow: "shadow-amber-500/20", icon: "🌿", label: "Etapa 2" },
    { border: "border-yellow-600/30", bar: "bg-yellow-500", accent: "text-yellow-400", shadow: "shadow-yellow-500/30", icon: "🌳", label: "Etapa 3" },
    { border: "border-orange-500/40", bar: "bg-orange-500", accent: "text-orange-400", shadow: "shadow-orange-500/40", icon: "🔥", label: "Etapa 4" },
    { border: "border-amber-600/40", bar: "bg-amber-600", accent: "text-amber-400", shadow: "shadow-amber-600/50", icon: "⚡", label: "Etapa 5" },
    { border: "border-yellow-300/50", bar: "bg-yellow-300", accent: "text-yellow-200", shadow: "shadow-yellow-300/60", icon: "👑", label: "Etapa 6" },
  ],
  cosmos: [
    { border: "border-indigo-500/30", bar: "bg-indigo-400", accent: "text-indigo-300", shadow: "", icon: "🌱", label: "Etapa 1" },
    { border: "border-purple-500/30", bar: "bg-purple-500", accent: "text-purple-400", shadow: "shadow-purple-500/20", icon: "🌿", label: "Etapa 2" },
    { border: "border-violet-500/30", bar: "bg-violet-500", accent: "text-violet-400", shadow: "shadow-violet-500/30", icon: "🌳", label: "Etapa 3" },
    { border: "border-indigo-600/40", bar: "bg-indigo-600", accent: "text-indigo-400", shadow: "shadow-indigo-600/40", icon: "🔥", label: "Etapa 4" },
    { border: "border-fuchsia-500/40", bar: "bg-fuchsia-500", accent: "text-fuchsia-400", shadow: "shadow-fuchsia-500/50", icon: "⚡", label: "Etapa 5" },
    { border: "border-amber-400/50", bar: "bg-amber-400", accent: "text-amber-300", shadow: "shadow-amber-400/60", icon: "👑", label: "Etapa 6" },
  ],
};

const INFINITE_COLORS = {
  semilla: { bar: "bg-emerald-500", accent: "text-emerald-400" },
  fuego: { bar: "bg-red-500", accent: "text-red-400" },
  rayo: { bar: "bg-yellow-500", accent: "text-yellow-400" },
  cosmos: { bar: "bg-purple-500", accent: "text-purple-400" },
};

export function MathPlay({
  level, mode, customTime, activeOps, onBack,
  user, pointsMath, rachaMath,
  setPointsMath, setRachaMath, onSaveRefreshUsers,
  onLocalUserUpdate, userHandle,
}) {
  const { mathSessionPoints, setMathSessionPoints, mathRachaSession, setMathRachaSession } = useContext(AppContext);
  const [inputMode, setInputMode] = useState(LEVEL_INPUT[level]);
  const [problem, setProblem] = useState(null);
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [timerRunning, setTimerRunning] = useState(true);
  const [problemId, setProblemId] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const historyRef = useRef([]);
  const feedbackTimeoutRef = useRef(null);

  const [correctInStage, setCorrectInStage] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [freeProgress, setFreeProgress] = useState(0);

  const sessionPointsRef = useRef(0);
  const lastSavedPointsRef = useRef(0);
  const mathRachaRef = useRef(0);
  const bestRachaKnownRef = useRef(rachaMath || 0);
  const lastSaveRef = useRef(0);
  const userRef = useRef(user);
  const pointsMathRef = useRef(pointsMath);
  const rachaMathRef = useRef(rachaMath);
  const rachaDebounceRef = useRef(null);
  const mountedRef = useRef(true);

  useEffect(() => { userRef.current = user; }, [user]);
  useEffect(() => { bestRachaKnownRef.current = rachaMath || 0; }, [rachaMath]);
  useEffect(() => { sessionPointsRef.current = mathSessionPoints; }, [mathSessionPoints]);
  useEffect(() => { mathRachaRef.current = mathRachaSession; }, [mathRachaSession]);
  useEffect(() => { pointsMathRef.current = pointsMath; }, [pointsMath]);
  useEffect(() => { rachaMathRef.current = rachaMath; }, [rachaMath]);
  useEffect(() => {
    setMathSessionPoints(0);
    setMathRachaSession(0);
  }, []);
  useEffect(() => { return () => { mountedRef.current = false; }; }, []);

  useEffect(() => {
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (rachaDebounceRef.current) clearTimeout(rachaDebounceRef.current);
    };
  }, []);

  const isInFixedStage = mode === "campaign" && stageIndex < CAMPAIGN_STAGES.length;
  const stageStyles = LEVEL_STAGE_STYLES[level] || LEVEL_STAGE_STYLES.cosmos;
  const stageStyleIdx = mode === "campaign"
    ? Math.min(stageIndex, stageStyles.length - 1)
    : stageStyles.length - 1;
  const stageStyle = stageStyles[stageStyleIdx];
  const infiniteColor = INFINITE_COLORS[level] || INFINITE_COLORS.cosmos;

  const mathUserData = useCallback(() => ({
    ...userRef.current,
    points_math: pointsMathRef.current,
    best_racha_math: rachaMathRef.current,
  }), []);

  const doSave = useCallback((deltaPoints, deltaRacha) => {
    const u = userRef.current;
    if (!u || u.user === "guest") return;

    const newTotal = pointsMathRef.current + Math.max(deltaPoints, 0);
    const newBestRacha = Math.max(rachaMathRef.current, deltaRacha);
    setPointsMath(newTotal);
    setRachaMath((prev) => (deltaRacha > prev ? deltaRacha : prev));

    if (onLocalUserUpdate && userHandle) {
      onLocalUserUpdate(userHandle, {
        points_math: newTotal,
        best_racha_math: newBestRacha,
      });
    }

    uploadPointsMath(mathUserData(), Math.max(deltaPoints, 0), deltaRacha)
      .then(() => {
        if (!mountedRef.current) return;
        lastSavedPointsRef.current = sessionPointsRef.current;
        if (onSaveRefreshUsers) onSaveRefreshUsers();
      })
      .catch(() => {});
  }, [setPointsMath, setRachaMath, onSaveRefreshUsers, mathUserData, onLocalUserUpdate, userHandle]);

  const saveNow = useCallback(() => {
    const sp = sessionPointsRef.current;
    const mr = mathRachaRef.current;
    const lp = lastSavedPointsRef.current;
    const u = userRef.current;

    if (!u || u.user === "guest") return;
    const deltaPuntos = sp - lp;
    if (deltaPuntos <= 0 && mr <= bestRachaKnownRef.current) return;

    lastSaveRef.current = Date.now();
    lastSavedPointsRef.current = sp;
    doSave(deltaPuntos, mr);
  }, [doSave]);

  const saveProgress = useCallback(() => {
    const now = Date.now();
    if (now - lastSaveRef.current < MIN_SAVE_INTERVAL) return;
    saveNow();
  }, [saveNow]);

  const scheduleRachaSave = useCallback((currentRacha) => {
    if (rachaDebounceRef.current) clearTimeout(rachaDebounceRef.current);
    rachaDebounceRef.current = setTimeout(() => {
      if (!mountedRef.current) return;
      const sp = sessionPointsRef.current;
      const lp = lastSavedPointsRef.current;
      const u = userRef.current;
      if (!u || u.user === "guest") return;
      if (sp - lp <= 0 && currentRacha <= bestRachaKnownRef.current) return;
      lastSaveRef.current = Date.now();
      lastSavedPointsRef.current = sp;
      doSave(sp - lp, currentRacha);
    }, 1500);
  }, [doSave]);

  const generateNext = useCallback(() => {
    const p = generateProblem(level, activeOps, historyRef.current);
    historyRef.current.push(p.key);
    setProblem(p);
    setInput("");
    setFeedback("");
    setCorrectAnswer(null);
    setSelectedAnswer(null);
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

  const advanceProgress = useCallback(() => {
    const stageCompleted = isInFixedStage
      ? correctInStage + 1 >= CAMPAIGN_STAGES[stageIndex]
      : freeProgress + 1 >= 10;

    if (stageCompleted) {
      sessionPointsRef.current += 1;
      setMathSessionPoints(sessionPointsRef.current);

      if (isInFixedStage) {
        setStageIndex((s) => s + 1);
        setCorrectInStage(0);
      } else {
        setFreeProgress(0);
      }
      saveNow();
    } else {
      if (isInFixedStage) {
        setCorrectInStage((p) => p + 1);
      } else {
        setFreeProgress((p) => p + 1);
      }
    }
  }, [isInFixedStage, stageIndex, correctInStage, freeProgress, saveNow]);

  const handleTimeout = useCallback(() => {
    setFeedback("⏰ Se acabó el tiempo");
    setCorrectAnswer(problem.answer);
    setTimerRunning(false);

    const oldRacha = mathRachaRef.current;
    mathRachaRef.current = 0;
    setMathRachaSession(0);
    if (oldRacha > bestRachaKnownRef.current) {
      doSave(sessionPointsRef.current - lastSavedPointsRef.current, oldRacha);
    }

    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => {
      generateNext();
    }, 1500);
  }, [problem, generateNext, doSave]);

  const handleSubmit = useCallback(
    (value) => {
      if (!problem || !timerRunning) return;
      setTimerRunning(false);
      setSelectedAnswer(value);

      const isCorrect = value === problem.answer;

      if (isCorrect) {
        const newRacha = mathRachaRef.current + 1;
        mathRachaRef.current = newRacha;
        setMathRachaSession(newRacha);
        if (newRacha > bestRachaKnownRef.current) {
          scheduleRachaSave(newRacha);
        }
        advanceProgress();
        setFeedback("✅ ¡Correcto!");
      } else {
        setFeedback(`❌ Incorrecto — Era ${problem.answer}`);
        const oldRacha = mathRachaRef.current;
        mathRachaRef.current = 0;
        setMathRachaSession(0);
        if (oldRacha > bestRachaKnownRef.current) {
          doSave(sessionPointsRef.current - lastSavedPointsRef.current, oldRacha);
        }
      }

      setCorrectAnswer(problem.answer);

      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      feedbackTimeoutRef.current = setTimeout(() => {
        generateNext();
      }, 1500);
    },
    [problem, timerRunning, generateNext, advanceProgress, scheduleRachaSave, doSave]
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

  useEffect(() => {
    const intervalId = setInterval(() => saveProgress(), MIN_SAVE_INTERVAL);
    return () => clearInterval(intervalId);
  }, [saveProgress]);

  const saveOnExit = useCallback(() => {
    const sp = sessionPointsRef.current;
    const mr = mathRachaRef.current;
    const u = userRef.current;
    const deltaPuntos = sp - lastSavedPointsRef.current;

    if (!u || u.user === "guest") return;
    if (deltaPuntos <= 0 && mr <= bestRachaKnownRef.current) return;

    lastSavedPointsRef.current = sp;

    const mathU = { ...u, points_math: pointsMathRef.current, best_racha_math: rachaMathRef.current };

    fetch(`${import.meta.env.VITE_URL_API}/db/upl-points-math`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userData: mathU,
        newPunt: Math.max(deltaPuntos, 0),
        rachaSession: mr,
      }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden") saveOnExit();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("beforeunload", saveOnExit);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("beforeunload", saveOnExit);
    };
  }, [saveOnExit]);

  if (!problem) return null;

  const containerStyle = mode === "campaign"
    ? `border ${stageStyle.border} rounded-3xl px-4 pt-6 pb-8 ${stageStyle.shadow} ${stageStyleIdx >= 3 ? "shadow-lg" : ""}`
    : "px-4 pt-6 pb-8";

  return (
    <div className={`flex flex-col items-center gap-6 max-w-md mx-auto ${containerStyle}`}>
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
          {mathSessionPoints > 0 && (
            <>{mathSessionPoints}🧮</>
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

      {mode === "campaign" && stageIndex < CAMPAIGN_STAGES.length && (
        <MilestoneBar
          key={stageIndex}
          level={level}
          progress={correctInStage}
          total={CAMPAIGN_STAGES[stageIndex]}
          title={`${stageStyle.icon} ${stageStyle.label} · ${stageIndex + 1}/${CAMPAIGN_STAGES.length}`}
          label={`${correctInStage}/${CAMPAIGN_STAGES[stageIndex]} correctas`}
          barColor={stageStyle.bar}
          accentColor={stageStyle.accent}
        />
      )}

      {(mode === "infinite" || stageIndex >= CAMPAIGN_STAGES.length) && (
        <MilestoneBar
          level={level}
          progress={freeProgress}
          total={10}
          title="♾️ Progreso"
          label={`${freeProgress}/10 para +1 🧮`}
          barColor={infiniteColor.bar}
          accentColor={infiniteColor.accent}
        />
      )}

      <div className="flex items-center gap-4 text-sm">
        {mathSessionPoints > 0 && (
          <span className="text-amber-400 font-bold">+{mathSessionPoints} 🧮</span>
        )}
        {mathRachaSession > 0 && (
          <span className="text-green-400 font-bold">🔥 {mathRachaSession}</span>
        )}
      </div>

      <div className="relative w-full">
        {mode === "campaign" && stageStyleIdx >= 2 && (
          <div className={`absolute -inset-4 rounded-3xl opacity-20 blur-xl pointer-events-none transition-all duration-700 ${
            stageStyleIdx >= 4 ? "bg-gradient-to-br from-pink-500 via-purple-500 to-yellow-500 animate-pulse" :
            stageStyleIdx >= 3 ? "bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 animate-pulse" :
            "bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-500"
          }`} />
        )}
        <Timer
          key={problemId}
          duration={customTime}
          running={timerRunning}
          onTimeout={handleTimeout}
        />

        <div className="text-center relative z-10">
          <p className={`font-bold tracking-wider transition-all duration-500 ${
            stageStyleIdx >= 5 ? "text-5xl text-yellow-300 drop-shadow-lg" :
            stageStyleIdx >= 4 ? "text-4xl text-pink-200 drop-shadow-md" :
            stageStyleIdx >= 3 ? "text-4xl text-amber-200" :
            stageStyleIdx >= 2 ? "text-4xl text-purple-200" :
            "text-4xl text-white"
          }`}>
            {formatProblem(problem.a, problem.operator, problem.b)}
          </p>
        </div>
      </div>

      {inputMode === "numpad" && (
        <div className="w-full flex flex-col items-center gap-4">
          <div className="text-5xl font-bold text-white min-h-[3rem]">
            {input || <span className="text-gray-600 font-normal text-2xl">?</span>}
          </div>
          <Numpad value={input} onInput={setInput} onSubmit={handleNumPadSubmit} />
        </div>
      )}

      {inputMode === "options" && (
        <div className="w-full">
          <MathOptions
            options={options}
            correctAnswer={correctAnswer}
            selectedAnswer={selectedAnswer}
            onSelect={handleSubmit}
            disabled={!timerRunning}
            feedback={feedback}
          />
          <MathMiniGames problem={problem} />
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
