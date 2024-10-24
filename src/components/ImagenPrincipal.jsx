/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { Loader } from "./Loader";

export default function ImagenPrincipal({
  handleImagePrincClick,
  urlRaizApi,
  objetoPrincipal,
}) {
  const [loading, setLoading] = useState(false);
  const [actualImgUrl, setActualImgUrl] = useState(null);

  useEffect(() => {
    if (objetoPrincipal) {
      setLoading(true); // Muestra el estado de carga mientras se carga la nueva imagen
      setActualImgUrl(objetoPrincipal.url);
      const img = new Image();
      img.src = objetoPrincipal.url;

      // Evento onload para cuando la imagen ha sido cargada
      img.onload = () => {
        setActualImgUrl(`url(${objetoPrincipal.url})`); // Establecer la imagen como fondo
        setLoading(false); // Cambiar el estado de loading
      };
    }
  }, [objetoPrincipal, urlRaizApi]);

  return (
    <div className=" mb-1 mx-auto mt-2 w-[95%] h-[19em] sm:w-[30em] sm:h-[25em] transition-all duration-300">
      {/* Div que encapsula con un alto definido */}
      {loading && <Loader />}
      <div
        className={`w-full h-full bg-center bg-cover bg-no-repeat transition-opacity duration-700 ${
            loading ? 'opacity-0' : 'opacity-100'
          }`}
        style={{ backgroundImage: `url(${actualImgUrl})` }}
        onClick={handleImagePrincClick}
      ></div>
      {/* Imagen para cargar en segundo plano y disparar el onLoad */}
    </div>
  );
}
