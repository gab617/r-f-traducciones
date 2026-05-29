import { Link } from "react-router-dom";
import ImagenPrincipal from "../../components/ImagenPrincipal";
import BtnsOpciones from "../../components/BtnsOpciones";
import { useContext, useState, useEffect, useCallback } from "react";
import { AppContext } from "../../context/AppContext";
import { Celebration } from "../../components/Celebration";
import { FunMessage } from "../../components/FunMessage";
import { ProgressBar } from "../../components/ProgressBar";
import { playCorrect, playIncorrect, playComplete } from "../../components/SoundEffects";

import "./seleccion.css";
import BtnVolver from "../../components/ButtonVolver";

const MASCOT_STATES = {
  idle: "🧑‍🏫",
  correct: "🎉",
  incorrect: "🤔",
  streak: "🔥",
  complete: "🏆",
};

export default function Seleccion() {
  const [seleccionado, setSeleccionado] = useState("-----");
  const [celebration, setCelebration] = useState({ active: false, type: "correct" });
  const [funMsg, setFunMsg] = useState({ active: false, type: "correct" });
  const [mascot, setMascot] = useState(MASCOT_STATES.idle);
  const [totalResolved, setTotalResolved] = useState(0);
  const [wasComplete, setWasComplete] = useState(false);

  const {
    handleClickVerificar, reloadCategoria, handleClickVolverCategs,
    keyActual, handleImagePrincClick, urlRaizApi, objetoPrincipal,
    dataActual, ingTxts, resueltosObj, rachaSession,
  } = useContext(AppContext);

  const totalItems = dataActual?.length || 0;

  useEffect(() => {
    if (!keyActual) return;
    const done = resueltosObj[keyActual]?.length || 0;
    setTotalResolved(done);
    setWasComplete(false);
  }, [keyActual, resueltosObj, objetoPrincipal?.id]);

  useEffect(() => {
    setSeleccionado("-----");
  }, [objetoPrincipal?.id]);

  useEffect(() => {
    if (!objetoPrincipal) return;
    if (objetoPrincipal.id === 0 && !wasComplete) {
      setWasComplete(true);
      setCelebration({ active: true, type: "complete" });
      setMascot(MASCOT_STATES.complete);
      playComplete();
      setTimeout(() => setCelebration({ active: false, type: "complete" }), 2500);
    }
  }, [objetoPrincipal, wasComplete]);

  const handleCorrect = useCallback(() => {
    setCelebration({ active: true, type: "correct" });
    setFunMsg({ active: true, type: "correct" });
    setMascot(MASCOT_STATES.correct);
    playCorrect();
    setTotalResolved((prev) => prev + 1);

    setTimeout(() => {
      setCelebration({ active: false, type: "correct" });
      setFunMsg({ active: false, type: "correct" });
      setMascot(MASCOT_STATES.idle);
    }, 1500);
  }, []);

  const handleIncorrect = useCallback(() => {
    setFunMsg({ active: true, type: "incorrect" });
    setMascot(MASCOT_STATES.incorrect);
    playIncorrect();

    setTimeout(() => {
      setFunMsg({ active: false, type: "incorrect" });
      setMascot(MASCOT_STATES.idle);
    }, 1500);
  }, []);

  function handleChangeSeleccionado(nwSelect) {
    setSeleccionado(nwSelect);
  }

  function reload() {
    reloadCategoria();
    setSeleccionado("-----");
    setMascot(MASCOT_STATES.idle);
    setWasComplete(false);
  }

  if (!keyActual) {
    return (
      <div className="flex flex-col items-center mt-20 gap-4">
        <span className="text-6xl">🧑‍🏫</span>
        <p className="text-white text-xl">Seleccioná una categoría para empezar</p>
        <Link
          to="/categorias"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
        >
          Ir a categorías
        </Link>
      </div>
    );
  }

  return (
    <div className="seleccion mt-2 lg:mt-3">
      <Celebration active={celebration.active} type={celebration.type} />
      <FunMessage active={funMsg.active} type={funMsg.type} />

      <div className="flex items-center justify-between px-1">
        <button
          className="px-3 py-1 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-lg"
          onClick={reload}
        >
          🔄 {keyActual}
        </button>

        <div className="flex items-center gap-2">
          <h1 className="text-lg sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 font-bold">
            {keyActual.charAt(0).toUpperCase() + keyActual.slice(1)}
          </h1>

          <Link
            className="hidden sm:block"
            to="/categorias"
            onClick={handleClickVolverCategs}
          >
            <BtnVolver text="Categorias" />
          </Link>
        </div>

        <div className="text-center">
          <div className="text-xl sm:text-4xl transition-all duration-300 hover:scale-110 cursor-default">
            {mascot}
          </div>
          {rachaSession > 0 && (
            <div className="text-yellow-400 font-bold text-[10px] animate-pulse">
              🔥 {rachaSession}
            </div>
          )}
        </div>
      </div>

      <div className="mt-1">
        <ProgressBar
          resolved={totalResolved}
          total={totalItems}
          label={`Progreso en ${keyActual}`}
        />
      </div>

      <div>
        {dataActual && (
          <ImagenPrincipal
            handleImagePrincClick={handleImagePrincClick}
            urlRaizApi={urlRaizApi}
            objetoPrincipal={objetoPrincipal}
          />
        )}
        {dataActual && (
          <BtnsOpciones
            ingTxts={ingTxts}
            handleChangeSeleccionado={handleChangeSeleccionado}
            seleccionado={seleccionado}
            objetoPrincipal={objetoPrincipal}
            handleClickVerificar={handleClickVerificar}
            onCorrect={handleCorrect}
            onIncorrect={handleIncorrect}
          />
        )}
      </div>

      <div className="my-2 text-center">
        {objetoPrincipal?.id === 0 ? (
          <Link
            to="/categorias"
            className="inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-lg rounded-full hover:scale-105 active:scale-95 transition-transform shadow-xl"
          >
            🏆 Volver a Categorías
          </Link>
        ) : (
          <p className="text-gray-500 text-[10px] sm:text-sm">Rengav Studio - Aprendé jugando 🎮</p>
        )}
      </div>

    </div>
  );
}
