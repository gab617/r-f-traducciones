/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Contexto/Context";
import { NavBar } from "../../components/NavBar/NavBar";

export function Aciertos() {
  const { keyActual, resueltosObj } = useContext(Context);
  console.log(resueltosObj);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="hidden sm:block">
        <div
          className=" 
            categorias py-2 sm:flex w-full justify-center sm:justify-center
            "
        >
          <Link className="link-header" to={"/"}>
            Inicio
          </Link>

          <Link className="link-header" to={"/categorias"}>
            Categorias
          </Link>
          <Link className="link-header" to={"/translations"}>
            Traducciones
          </Link>
          <Link className="link-header" to={"/seleccion"}>
            Jugar
          </Link>
        </div>
      </div>
      {Object.keys(resueltosObj).some((key) => resueltosObj[key].length > 0) ? (
        Object.keys(resueltosObj).map((key) => {
          if (resueltosObj[key].length == 0) return;
          return (
            <div className=" sm:mt-7 flex w-full">
              <div className="w-full flex flex-col sm:flex-row ">
                <h1
                  className="
                                    text-transparent 
                                    bg-clip-text bg-gradient-to-r
                                    to-emerald-600
                                    from-sky-400 
                                    text-4xl
                                    text-start
                                    mb-6
                                    sm:text-end
                                    min-w-[12%]"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h1>
                <div className="flex">
                  <div className="sm:w-[100%] w-[97%] mx-auto grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 gap-4">
                    {resueltosObj[key]?.map((resuelto) => {
                      return (
                        <div className="flex sm:w-[8em] mb-4 flex-col rounded-xl bg-black bg-clip-border text-gray-700 shadow-md ">
                          <div
                            style={{
                              backgroundImage: `url(${resuelto.url})`,
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                              backgroundRepeat: "no-repeat",
                            }}
                            className=" transition-all duration-700 mx-1  -mt-6 h-[6em] overflow-hidden rounded-xl bg-blue-gray-500 text-white shadow-lg shadow-blue-gray-500/40"
                          ></div>
                          <div className="ml-3 font-bold text-white">
                            <div className="flex items-center">
                              <img
                                className="w-[13%]"
                                src="/spain.png"
                                alt=""
                              />
                              <p>{resuelto.esp}</p>
                            </div>
                            <div className="flex items-center">
                              <img
                                className="w-[13%]"
                                src="/uk.png
                          "
                                alt=""
                              />
                              <p>{resuelto.ing}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-3xl text-yellow-400">No Hay Aciertos Aún</h1>
      )}
      <div className="sm:hidden">
        <NavBar></NavBar>
      </div>
    </div>
  );
}
