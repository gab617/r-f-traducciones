import { useContext, useMemo } from "react";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

const CATEGORY_EMOJIS = {
  animales: "🐾",
  comidas: "🍔",
  colores: "🎨",
  numeros: "🔢",
  cuerpo: "🦵",
  ropa: "👕",
  casa: "🏠",
  escuela: "📚",
  naturaleza: "🌿",
  transportes: "🚗",
  juguetes: "🧸",
  musica: "🎵",
  deportes: "⚽",
  emociones: "😊",
  profesiones: "👨‍⚕️",
};

const CARD_COLORS = [
  "from-pink-500 to-rose-500",
  "from-purple-500 to-indigo-500",
  "from-blue-500 to-cyan-500",
  "from-teal-500 to-emerald-500",
  "from-green-500 to-lime-500",
  "from-yellow-500 to-orange-500",
  "from-orange-500 to-red-500",
  "from-red-500 to-pink-500",
  "from-indigo-500 to-purple-500",
  "from-cyan-500 to-teal-500",
  "from-emerald-500 to-green-500",
  "from-lime-500 to-yellow-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-purple-500",
  "from-fuchsia-500 to-pink-500",
  "from-sky-500 to-indigo-500",
];

function CircularProgress({ pct }) {
  const r = 36;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="8"
        />
        <circle
          cx="50" cy="50" r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
        {pct}%
      </span>
    </div>
  );
}

export function Aciertos() {
  const { keywords, resueltosObj, data, handleClickElemList, loading } = useContext(AppContext);

  const categoriesWithProgress = useMemo(() => {
    return Object.keys(keywords ?? {})
      .map((key, idx) => {
        const done = resueltosObj?.[key]?.length ?? 0;
        const total = data?.[key]?.length ?? 0;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        const completo = done === total && total > 0;
        const emoji = CATEGORY_EMOJIS[key] || "📖";
        const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
        return { key, done, total, pct, completo, emoji, colorClass };
      })
      .sort((a, b) => {
        if (a.completo !== b.completo) return a.completo ? 1 : -1;
        return b.pct - a.pct;
      });
  }, [keywords, resueltosObj, data]);

  const totalResueltos = useMemo(
    () => categoriesWithProgress.reduce((acc, c) => acc + c.done, 0),
    [categoriesWithProgress]
  );
  const totalGeneral = useMemo(
    () => categoriesWithProgress.reduce((acc, c) => acc + c.total, 0),
    [categoriesWithProgress]
  );
  const completadas = useMemo(
    () => categoriesWithProgress.filter((c) => c.completo).length,
    [categoriesWithProgress]
  );

  const tieneProgreso = categoriesWithProgress.some((c) => c.done > 0);

  return (
    <div className="px-3 sm:px-6 pb-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 font-extrabold">
          🏆 Tu Progreso
        </h1>
        <p className="text-gray-400 mt-1 text-sm">
          Cada acierto te acerca más a completar una categoría
        </p>
      </div>

      {tieneProgreso && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-w-md mx-auto">
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-yellow-400">{totalResueltos}</p>
            <p className="text-xs text-gray-400">Aciertos</p>
          </div>
          <div className="bg-white/5 backdrop-blur rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-cyan-400">{completadas}</p>
            <p className="text-xs text-gray-400">Completadas</p>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white/5 backdrop-blur rounded-xl p-3 text-center border border-white/10">
            <p className="text-2xl font-bold text-emerald-400">
              {totalGeneral > 0 ? Math.round((totalResueltos / totalGeneral) * 100) : 0}%
            </p>
            <p className="text-xs text-gray-400">Global</p>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center mt-16 gap-4">
          <span className="text-6xl">📊</span>
          <p className="text-gray-500 text-lg">Cargando categorías...</p>
        </div>
      ) : categoriesWithProgress.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-16 gap-4">
          <span className="text-6xl">📭</span>
          <p className="text-gray-500 text-lg">No hay categorías disponibles</p>
        </div>
      ) : !tieneProgreso ? (
        <div className="flex flex-col items-center justify-center mt-16 gap-4">
          <span className="text-6xl">🎯</span>
          <h2 className="text-2xl text-gray-400 font-semibold">Sin aciertos todavía</h2>
          <p className="text-gray-500 text-sm">Jugá y tus aciertos aparecerán acá</p>
          <Link
            to="/categorias"
            className="mt-2 px-6 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            Ir a jugar 🎮
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {categoriesWithProgress.map((cat) => (
            <Link
              key={cat.key}
              to="/seleccion"
              onClick={() => handleClickElemList(cat.key)} 
              className="group block"
            >
              <div
                className={`
                  relative overflow-hidden rounded-2xl p-5
                  bg-gradient-to-br ${cat.colorClass}
                  shadow-lg transition-all duration-300
                  hover:scale-[1.03] hover:shadow-2xl
                  active:scale-95 cursor-pointer
                  ${cat.completo ? "ring-4 ring-yellow-400 ring-offset-2 ring-offset-transparent" : "ring-1 ring-white/10"}
                `}
              >
                <div className="absolute -top-4 -right-4 text-6xl opacity-20 select-none group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  {cat.emoji}
                </div>

                <div className="relative z-10 flex items-center gap-4">
                  <CircularProgress pct={cat.pct} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{cat.emoji}</span>
                      <h2 className="text-xl font-bold text-white drop-shadow-md truncate">
                        {cat.key.charAt(0).toUpperCase() + cat.key.slice(1)}
                      </h2>
                    </div>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white drop-shadow-lg">
                        {cat.done}
                      </span>
                      <span className="text-white/60 text-lg">/</span>
                      <span className="text-white/80 text-lg">{cat.total}</span>
                      <span className="text-white/50 text-sm ml-1">aciertos</span>
                    </div>
                    <div className="mt-1 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${cat.pct}%`,
                          background:
                            cat.pct === 100
                              ? "linear-gradient(90deg, #facc15, #22d3ee)"
                              : "linear-gradient(90deg, #fff, #facc15)",
                        }}
                      />
                    </div>
                  </div>
                </div>

                {cat.completo && (
                  <div className="absolute top-2 right-2 text-2xl animate-bounce">
                    🏆
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
