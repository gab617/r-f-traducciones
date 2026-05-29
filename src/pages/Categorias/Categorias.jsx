import { Link } from "react-router-dom";
import "./categorias.css";
import { useContext, useMemo } from "react";
import { AppContext } from "../../context/AppContext";
import { Loader2 } from "../../components/Loader2";


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

export default function Categorias() {
  const { loading, keywords, handleClickElemList, resueltosObj, data } = useContext(AppContext);

  const categoryKeys = useMemo(
    () => (keywords ? Object.keys(keywords) : []),
    [keywords]
  );

  const getProgress = (key) => {
    const total = data[key]?.length || 0;
    const done = resueltosObj[key]?.length || 0;
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  return (
    <>
      <div className="px-2 sm:px-4">
        <h1 className="mb-6 text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 font-extrabold text-center">
          Elegí una categoría 🎯
        </h1>

        {loading && (
          <div className="flex justify-center">
            <Loader2 />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 px-2">
          {categoryKeys.map((k, idx) => {
            const emoji = CATEGORY_EMOJIS[k] || "📖";
            const colorClass = CARD_COLORS[idx % CARD_COLORS.length];
            const { done, total, pct } = getProgress(k);
            const terminado = keywords[k]?.terminado;

            return (
              <Link
                key={k}
                to="/seleccion"
                onClick={() => handleClickElemList(k)}
                className="group block"
              >
                <div
                  className={`
                    relative overflow-hidden rounded-2xl p-5
                    bg-gradient-to-br ${colorClass}
                    shadow-lg transition-all duration-300
                    hover:scale-105 hover:shadow-2xl hover:shadow-white/20
                    active:scale-95 cursor-pointer
                    ${terminado ? "ring-4 ring-yellow-400 ring-offset-2 ring-offset-transparent" : ""}
                  `}
                >
                  <div className="absolute -top-4 -right-4 text-6xl opacity-20 select-none group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                    {emoji}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{emoji}</span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-md">
                        {k.charAt(0).toUpperCase() + k.slice(1)}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 h-2 bg-white/30 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background:
                              pct === 100
                                ? "linear-gradient(90deg, #facc15, #22d3ee)"
                                : "linear-gradient(90deg, #fff, #facc15)",
                          }}
                        />
                      </div>
                      <span className="text-white font-bold text-sm min-w-[3rem] text-right">
                        {done}/{total}
                      </span>
                    </div>

                    {terminado && (
                      <div className="absolute top-2 right-2 text-2xl animate-pulse">
                        🏆
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {categoryKeys.length === 0 && !loading && (
          <p className="text-gray-400 text-center mt-10 text-lg">
            No hay categorías disponibles todavía
          </p>
        )}
      </div>

    </>
  );
}
