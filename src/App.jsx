/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import Categorias from "./pages/Categorias/Categorias";
import Seleccion from "./pages/Seleccion/Seleccion";
import { Aciertos } from "./pages/Aciertos/Aciertos";
import { Context } from "./Contexto/Context";
import { Home } from "./pages/Home/Home";

function App() {
  const {
    loading,
    user,
    closeUser,
    points,
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
    reloadPoints
  } = useContext(Context);

  const actualizarPuntos = async (user_id, points) => {
    try {
      const response = await fetch("http://localhost:3000/update-points", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, points }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error al actualizar puntos:", errorData.error);
        return;
      }

      const data = await response.json();
      console.log(data.message); // Debería mostrar "Puntos actualizados con éxito"
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div className="sm:w-90 m-auto">
      <div className="flex gap-3 items-center m-auto justify-center">
        <h1 className="text-white mt-2">
          Hola! {user} Puntuacion: {points}{" "}
        </h1>
        {/* <button className="btn-reload" onClick={reloadPoints}>Reiniciar puntaje</button> */}
{/*         <button onClick={()=>actualizarPuntos(1,10)} className="text-white">Guardar progreso</button>
        <button onClick={closeUser} className="text-white ml-2">Cerrar sesión</button> */}
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<Home loading={loading} />}></Route>

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
          ></Route>

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
          ></Route>

          <Route
            path="/acierts"
            element={
              <Aciertos
                resueltosObj={resueltosObj}
                handleClickElimiarAciertos={handleClickElimiarAciertos}
                urlRaizApi={urlRaizApi}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
