import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { usePersistedState } from "../../hooks/usePersistedState";
import { normalizeImageUrl } from "../../services/api";

const FLAGS = {
  es: "/spain.png",
  en: "/uk.png",
};

export function Traducciones() {
  const { staticData } = useContext(AppContext);
  const [currentKey, setCurrentKey] = usePersistedState("traducciones_tab", "animales");
  const keywords = Object.keys(staticData);

  return (
    <div className="min-h-screen flex flex-col px-4 pt-6 pb-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
          📖 Traducciones
        </h1>
        <p className="mt-1 text-sm text-gray-400">
          Explorá el vocabulario por categoría
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {keywords?.map((key) => (
          <button
            key={key}
            onClick={() => setCurrentKey(key)}
            className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200 ${
              key === currentKey
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {staticData[currentKey]?.length > 0 ? (
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-6xl mx-auto w-full">
          {staticData[currentKey]?.map((obj) => (
            <li key={obj.id}>
              <div className="group rounded-xl bg-white/5 border border-gray-700/50 overflow-hidden hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                <div className="relative h-28 sm:h-36 overflow-hidden bg-gray-800">
                  <img
                    src={normalizeImageUrl(obj.url)}
                    alt={obj.esp}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-3 space-y-2">
                  <div className="flex items-center gap-1.5">
                    <img src={FLAGS.es} alt="es" className="w-5 h-auto" />
                    <span className="text-base font-bold text-white">
                      {obj.esp}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <img src={FLAGS.en} alt="en" className="w-5 h-auto" />
                    <span className="text-base font-semibold text-purple-300">
                      {obj.ing}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">
            No hay palabras en esta categoría
          </p>
        </div>
      )}

      <div className="mt-auto pt-6">
      </div>
    </div>
  );
}
