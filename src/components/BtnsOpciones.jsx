/* eslint-disable react/prop-types */
import "./BtnsOpciones.css";
import { BtnOpc } from "./BtnOpc";
import { useState, useRef, useCallback } from "react";
import { getExampleSentences } from "../services/exampleSentences";

export default function BtnsOpciones({
  ingTxts,
  seleccionado,
  handleChangeSeleccionado,
  objetoPrincipal,
  handleClickVerificar,
  onCorrect,
  onIncorrect,
  resolvedWords,
}) {
  const [feedback, setFeedback] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalSentences, setModalSentences] = useState([]);
  const [showSpanish, setShowSpanish] = useState(false);
  const [showResolved, setShowResolved] = useState(false);
  const [modalWord, setModalWord] = useState(null);
  const lastClickRef = useRef({ palabra: null, time: 0 });

  function openModalForWord(wordObj) {
    const sentences = getExampleSentences(wordObj);
    setModalWord(wordObj);
    setModalSentences(sentences);
    setShowSpanish(false);
    setShowModal(true);
  }

  function handleClickVerif(objetoPrinc, selecc, iTxts) {
    if (disabled) return;
    if (selecc === "-----") return;
    setDisabled(true);

    const acierto = handleClickVerificar(objetoPrinc, selecc, iTxts);
    if (acierto) {
      setFeedback("correcto");
      onCorrect?.();
    } else {
      setFeedback("incorrecto");
      onIncorrect?.();
    }

    setTimeout(() => {
      setFeedback("");
      setDisabled(false);
    }, 1000);
  }

  function highlightWord(sentence, word) {
    if (!word || !sentence) return sentence;
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const parts = sentence.split(new RegExp(`(${escaped})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === word.toLowerCase()
        ? <span key={i} className="text-yellow-300 font-bold underline decoration-yellow-400/50 decoration-2 underline-offset-2">{part}</span>
        : part
    );
  }

  const handleWordClick = useCallback(
    (palabra) => {
      if (disabled) return;
      const now = Date.now();
      if (
        palabra === lastClickRef.current.palabra &&
        now - lastClickRef.current.time < 350
      ) {
        lastClickRef.current = { palabra: null, time: 0 };
        handleClickVerif(objetoPrincipal, palabra, ingTxts);
      } else {
        handleChangeSeleccionado(palabra);
        lastClickRef.current = { palabra, time: now };
      }
    },
    [disabled, handleChangeSeleccionado, handleClickVerif, objetoPrincipal, ingTxts]
  );

  return (
    <>
      <div
        className={`
          grid grid-cols-3 sm:grid-cols-4 text-center flex-wrap mt-2 sm:mt-5
          sm:m-auto sm:w-1/2 sm:justify-center sm:text-center
          transition-all duration-300
          ${disabled ? "opacity-80" : ""}
        `}
      >
        {ingTxts?.map((txtIng) => (
          <BtnOpc
            key={txtIng.id}
            txtIng={txtIng}
            handleWordClick={handleWordClick}
            seleccionado={seleccionado}
            disabled={disabled}
            feedback={feedback}
          />
        ))}
      </div>

      <div className="mt-1 mb-0.5 flex mx-auto justify-center items-center gap-2 sm:gap-10 w-full">
        <div
          className={`
            text-lg sm:text-5xl font-bold transition-all duration-300 px-1 py-0.5 rounded-xl
            ${
              feedback === "correcto"
                ? "text-green-400 scale-110"
                : feedback === "incorrecto"
                ? "text-red-400 animate-fun-shake"
                : "text-blue-500"
            }
          `}
        >
          {seleccionado === "-----" ? "🤔" : seleccionado}
        </div>

        <button
          className={`
            rounded-full transition-all duration-200
            ${feedback === "correcto" ? "bg-green-500 text-white" : ""}
            ${feedback === "incorrecto" ? "bg-red-500 text-white" : ""}
            ${!feedback ? "bg-white/20 text-white/70 hover:text-white hover:bg-white/30" : ""}
          `}
          onClick={() =>
            handleClickVerif(objetoPrincipal, seleccionado, ingTxts)
          }
          disabled={disabled}
        >
          {!feedback && (
            <span className="px-3 py-0.5 text-[10px] sm:text-sm font-medium">
              Verificar
            </span>
          )}
          {feedback === "correcto" && (
            <span className="px-3 py-0.5 text-[10px] sm:text-sm font-bold">
              ¡Bien!
            </span>
          )}
          {feedback === "incorrecto" && (
            <span className="px-3 py-0.5 text-[10px] sm:text-sm font-bold">
              ¡Casi!
            </span>
          )}
        </button>

        <button
          className="rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/25 transition-all duration-200 px-3 py-0.5 text-[10px] sm:text-sm font-medium"
          onClick={() => openModalForWord(objetoPrincipal)}
        >
          📖 Examples
        </button>

        <button
          onClick={() => setShowResolved((prev) => !prev)}
          className={`
            rounded-full transition-all duration-200 px-3 py-0.5 text-[10px] sm:text-sm font-medium flex items-center gap-1.5
            ${showResolved
              ? "bg-gradient-to-r from-amber-600 to-orange-500 text-white shadow-lg shadow-amber-500/30"
              : "bg-white/10 text-white/60 hover:text-white hover:bg-white/25"
            }
          `}
        >
          <span className={`inline-block transition-transform duration-300 ${showResolved ? "rotate-180" : ""}`}>
            📋
          </span>
          <span>Acertados</span>
          <span
            className={`inline-block w-7 h-4 rounded-full transition-colors duration-300 ${
              showResolved ? "bg-white/30" : "bg-white/10"
            }`}
          >
            <span
              className={`block w-3 h-3 rounded-full bg-white shadow transition-all duration-300 mt-0.5 ${
                showResolved ? "ml-3.5" : "ml-0.5"
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showResolved ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mt-2 mb-1 mx-auto w-full sm:w-2/3 bg-gray-800/60 border border-gray-700/50 rounded-xl p-3">
          <h3 className="text-xs sm:text-sm font-bold text-amber-400 mb-2 flex items-center gap-1.5">
            ✅ Palabras acertadas
            <span className="text-[10px] text-gray-400 font-normal">({resolvedWords?.length || 0})</span>
          </h3>
          {resolvedWords?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {resolvedWords.map((w) => (
                <div
                  key={w.id}
                  className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-1 border border-gray-700/30 cursor-pointer hover:bg-white/10 hover:border-amber-500/50 transition-all duration-200"
                  onClick={() => openModalForWord(w)}
                  title={`Ver ejemplos de "${w.ing}"`}
                >
                  <span className="text-[10px]">🇬🇧</span>
                  <span className="text-xs font-semibold text-gray-200">{w.ing}</span>
                  <span className="text-gray-500 text-[10px]">→</span>
                  <span className="text-[10px]">🇪🇸</span>
                  <span className="text-xs font-medium text-emerald-300">{w.esp}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-gray-500 italic text-center py-2">
              Aún no acertaste ninguna palabra en esta categoría
            </p>
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[75vh] overflow-y-auto p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>📖</span>
                Ejemplos con &ldquo;{modalWord?.ing}&rdquo;
              </h2>
              <button
                className="text-gray-400 hover:text-white transition-colors text-xl leading-none"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>

            {modalWord?.url && (
              <div className="flex justify-center mb-4">
                <img src={modalWord.url} alt={modalWord.ing} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border-2 border-gray-700/50 shadow-lg" />
              </div>
            )}

            <div className="space-y-3">
              {modalSentences.map((s) => (
                <div
                  key={s.id}
                  className="bg-white/5 rounded-xl p-4 border border-gray-700/50"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 font-bold text-sm mt-0.5 shrink-0">
                      {s.id}.
                    </span>
                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed">
                        {highlightWord(s.en, modalWord?.ing)}
                      </p>

                      <div
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          showSpanish
                            ? "max-h-40 opacity-100 mt-0"
                            : "max-h-0 opacity-0 mt-0"
                        }`}
                      >
                        <div className="pt-2 border-t border-gray-700/40">
                          <p className="text-sm sm:text-base text-emerald-300 leading-relaxed flex items-start gap-1.5">
                            <span className="text-emerald-500">🌎</span>
                            {s.es || <span className="text-gray-500 italic">Traducción no disponible</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowSpanish((prev) => !prev)}
              className={`
                mt-5 w-full flex items-center justify-center gap-3 py-2.5 rounded-full font-bold text-sm
                transition-all duration-300
                ${
                  showSpanish
                    ? "bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-lg shadow-emerald-500/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }
              `}
            >
              <span className={`inline-block transition-transform duration-300 ${showSpanish ? "rotate-180" : ""}`}>
                🌐
              </span>
              <span>{showSpanish ? "Ocultar español" : "Ver español"}</span>
              <span className="flex items-center relative w-10 h-5 rounded-full bg-white/20 transition-colors duration-300">
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${
                    showSpanish ? "left-5 bg-emerald-400" : "left-0.5"
                  }`}
                />
              </span>
            </button>

            <button
              className="mt-2 w-full py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all duration-200"
              onClick={() => setShowModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
