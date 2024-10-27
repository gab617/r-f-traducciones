/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import Categorias from "./pages/Categorias/Categorias";
import Seleccion from "./pages/Seleccion/Seleccion";
import { Aciertos } from "./pages/Aciertos/Aciertos";
import { Context } from "./Contexto/Context";
import { Home } from "./pages/Home/Home";
import { Traducciones } from "./pages/Traducciones/Traducciones";

function App() {
  const {
    loading,
    user,
    closeUser,
    sessionPoints,
    rachaSession,
    data,
    dataActual,
    resueltos,
    resueltosObj,
    keyActual,
    keywords,
    espTxts,
    ingTxts,
    reloadApp,
    handleImagePrincClick,
    handleClickElemList,
    handleClickVolverCategs,
    handleClickElimiarAciertos,
    urlRaizApi,
    objetoPrincipal,
    reloadPoints,
    uploadPoints,
    racha,
  } = useContext(Context);

  return (
    <div className="sm:w-90 m-auto">
      <div className="flex sm:gap-3 items-center mx-auto justify-between w-[100%]">
        <h1 className="text-white mt-2 ml-2 sm:ml-0 ">
          Hola!{" "}
          <span className="font-bold text-yellow-400">{`${
            user.user ? user.user : "guest"
          }`}</span>
        </h1>
        <div className="text-white text-end mr-2">
          Puntuacion:{" "}
          <span className="text-yellow-400 font-semibold">
            {" "}
            {sessionPoints}
          </span>{" "}
          Racha actual:{" "}
          <span className="text-yellow-400 font-semibold">{rachaSession}</span>{" "}
          <button
            className="sm:ml-3 sm:px-5 sm:py-1 mt-2 text-white font-semibold sm:font-bold text-lg rounded-full shadow-lg transition-transform transform bg-transparent border sm:border-2 border-white sm:hover:scale-105 hover:border-yellow-600 hover:shadow-yellow-500/50 hover:shadow-2xl focus:outline-none"
            onClick={() => uploadPoints()}
          >
            Guardar progeso
          </button>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home loading={loading} />}/>
          <Route
            path="/categorias"
            element={
              <>
                {data && (
                  <Categorias
                    keywords={keywords}
                    handleClickElemList={handleClickElemList}
                    reloadApp={reloadApp}
                  />
                )}
              </>
            }
          />
          <Route
            path="/seleccion"
            element={
              <>
                {data && (
                  <Seleccion
                    handleClickVolverCategs={handleClickVolverCategs}
                    keyActual={keyActual}
                    handleImagePrincClick={handleImagePrincClick}
                    urlRaizApi={urlRaizApi}
                    objetoPrincipal={objetoPrincipal}
                    dataActual={dataActual}
                    ingTxts={ingTxts}
                    espTxts={espTxts}
                    resueltos={resueltos}
                    resueltosObj={resueltosObj}
                    handleClickElimiarAciertos={handleClickElimiarAciertos}
                  />
                )}
              </>
            }
          />

          <Route
            path="/acierts"
            element={
              <Aciertos
                resueltosObj={resueltosObj}
                handleClickElimiarAciertos={handleClickElimiarAciertos}
                urlRaizApi={urlRaizApi}
              />
            }
          />

          <Route path="/translations" element={<Traducciones />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
