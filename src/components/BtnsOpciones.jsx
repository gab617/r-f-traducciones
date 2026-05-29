/* eslint-disable react/prop-types */
import "./BtnsOpciones.css";
import { BtnOpc } from "./BtnOpc";
import { useState, useRef, useCallback } from "react";

export default function BtnsOpciones({
  ingTxts,
  seleccionado,
  handleChangeSeleccionado,
  objetoPrincipal,
  handleClickVerificar,
  onCorrect,
  onIncorrect,
}) {
  const [feedback, setFeedback] = useState("");
  const [disabled, setDisabled] = useState(false);
  const lastClickRef = useRef({ palabra: null, time: 0 });

  function handleClickVerif(objetoPrinc, selecc, iTxts) {
    if (disabled) return;
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
      </div>
    </>
  );
}
