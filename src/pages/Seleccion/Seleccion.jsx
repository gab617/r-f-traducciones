/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import ImagenPrincipal from "../../components/ImagenPrincipal";
import BtnsOpciones from "../../components/BtnsOpciones";
import { useContext, useState } from "react";
import { Context } from "../../Contexto/Context";

import "./seleccion.css";
import  BtnVolver from "../../components/ButtonVolver";

export default function Seleccion({
  handleClickVolverCategs,
  keyActual,
  handleImagePrincClick,
  urlRaizApi,
  objetoPrincipal,
  dataActual,
  ingTxts /* espTxts ,*/,
  resueltosObj,
}) {
  const [seleccionado, setSeleccionado] = useState("");
  const { handleClickVerificar, reloadCategoria } = useContext(Context);

  function handleChangeSeleccionado(nwSelect) {
    setSeleccionado(nwSelect);
  }

  function reload() {
    console.log("RELOAD A: ", dataActual, ingTxts);
    reloadCategoria();
  }

  return (
    <div className="seleccion mt-2 lg:mt-3">
      <div className="flex items-center justify-between">
        <button className="btn-reload w-1/4 lg:w-[10%] ml-1 sm:ml-3" onClick={reload}>
          <span className=""> REINICIAR {keyActual} </span>
        </button>
        <div className="flex text-center items-center lg:mt-1">
          <h1 className="text-2xl  sm:text-4xl mr-3 text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 text-center ml-2">
            {keyActual.charAt(0).toUpperCase() + keyActual.slice(1)}
          </h1>
          <Link className="w-[37%]" to={"/categorias"} onClick={handleClickVolverCategs}>
            <BtnVolver text={"Categorias"}></BtnVolver>
          </Link>
        </div>
      </div>

      <div className="">
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
          />
        )}
      </div>
      <div>Rengav</div>

      {/*             <div>
                {resueltosObj && resueltosObj[keyActual]?.map(obj => {
                    return (
                        <div>
                            <h1>{obj.esp}</h1>
                        </div>
                    )
                })}
            </div> */}
    </div>
  );
}
