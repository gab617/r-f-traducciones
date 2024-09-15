/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */

import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Contexto/Context";

export function Aciertos() {
  const { keyActual, resueltosObj } = useContext(Context);
  console.log(resueltosObj)

  return (
    <div className="flex flex-col mt-4 justify-center items-center">
      <div
        className="
            
                flex sm:justify-evenly mb-4 items-center
                sm:sticky sm:top-2
                bg-black
                bg-opacity-40
                text-xl
                sm:text-3xl
            "
      >
        <Link className="link-header" to={"/"}>
          Menu
        </Link>

        <Link className="link-header" to={"/categorias"}>
          Categorias
        </Link>

        <Link className="link-header" to={"/seleccion"}>
          Volver {keyActual}
        </Link>
      </div>
      {resueltosObj &&
        Object.keys(resueltosObj).map((key) => {
          if (resueltosObj[key].length == 0) return;
          return (
            <div className="mb-5">
              <div className="w-full flex flex-col sm:flex-row">
                <h1
                  className="
                                    text-transparent 
                                    bg-clip-text bg-gradient-to-r
                                    to-emerald-600
                                    from-sky-400 
                                    text-4xl
                                    text-start
                                    sm:text-end
                                    min-w-[12%]"
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                  {resueltosObj[key]?.map((resuelto) => {
                    return (
                      <div
                        key={resuelto.key}
                        className="
                                flex       
                                mt-1
                                sm:flex-row sm:full ml-2 
                                text-center 
                                justify-center
                                                    "
                      >
                        <div className="flex items-center">
                          <img
                            className="w-full  h-auto"
                            src={resuelto.url}
                            alt=""
                          />
                        </div>
                        <div className="w-1/2 flex flex-col justify-center">
                          <h1 className="text-white sm:text-3xl bg-black bg-opacity-40 p-1">
                            {resuelto.ing}
                          </h1>
                          <h1 className="text-white sm:text-3xl bg-black bg-opacity-40 p-1">
                            {resuelto.esp}
                          </h1>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      {/*                 {
      resueltos && resueltos.map(resuelto => {
          console.log(resuelto)
          return (
              <div
                  key={resuelto.id}
                  className='w-1/12 ml-2'>
                  <img
                      className='w-full-'
                      src={urlRaizApi + resuelto.url} alt=""
                  />
                  <h1 className='text-white'>{resuelto.ing}</h1>
                  <h1 className='text-white'>{resuelto.esp}</h1>
              </div>

          )
      }

      )
  } */}
    </div>
  );
}
