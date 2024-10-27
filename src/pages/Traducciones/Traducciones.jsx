import React, { useContext, useState } from "react";
import "../../components/BtnArrow.css";
import { Context } from "../../Contexto/Context";
import { BtnArrow } from "../../components/BtnArrow";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar/NavBar";

export function Traducciones() {
  const { staticData } = useContext(Context);
  const [currentKey, setCurrentKey] = useState("animales");
  console.log(staticData);
  const keywords = Object.keys(staticData);

  function handleKeyword(key) {
    setCurrentKey(key);
  }

  return (
    <div>
      <div>
        <div
          className="hidden sm:block categorias sm:py-2 sm:flex mb-10 justify-center"
          id="headerCategorias"
        >

          <Link className="link-header" to={"/"}>
            Inicio
          </Link>

          <Link className="link-header" to={"/acierts"}>
            Aciertos
          </Link>
          <Link className="link-header" to={"/categorias"}>
            Categorias
          </Link>
          <Link className="link-header" to={"/seleccion"}>
            Jugar
          </Link>
        </div>
      </div>
      <div className="bg-black bg-opacity-40 mb-10 flex justify-center  ">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 text-xl text-white">
          {keywords &&
            keywords?.map((key) => {
              return (
                <li onClick={() => handleKeyword(key)}>
                  <BtnArrow texto={key} currentKey={currentKey}></BtnArrow>
                </li>
              );
            })}
        </ul>
      </div>
      <ul className="mb-3 w-[97%] sm:w-[100%] mx-auto grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 text-xl gap-1 text-white">
        {staticData[currentKey]?.map((obj) => {
          return (
            <li className="mb-10">
              <div className="flex 2xl:w-[17.5rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 sm:shadow-md ">
                <div
                  style={{
                    backgroundImage: `url(${obj.url})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                  }}
                  className="transition-all duration-700  -mt-6 h-[3.9em] sm:h-[5em] xl:h-60 overflow-hidden rounded-xl bg-blue-gray-500 text-white shadow-lg shadow-blue-gray-500/40"
                ></div>
                <div className="ml-3 font-bold text-base sm:text-xl">
                  <div className="flex items-center ">
                    <img className="w-[17%] md:w-[8%]" src="/spain.png" alt="" />
                    <p>{obj.esp}</p>
                  </div>
                  <div className="flex items-center">
                    <img
                      className="w-[16%] md:w-[8%]"
                      src="/uk.png
                    "
                      alt=""
                    />
                    <p>{obj.ing}</p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="sm:hidden">

      <NavBar></NavBar>
      </div>
    </div>
  );
}
