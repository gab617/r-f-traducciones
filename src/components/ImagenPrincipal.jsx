/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { Loader } from "./Loader";
import { normalizeImageUrl } from "../services/api";

const LOAD_TIMEOUT = 10000;

export default function ImagenPrincipal({
  handleImagePrincClick,
  urlRaizApi,
  objetoPrincipal,
}) {
  const [loading, setLoading] = useState(false);
  const [imgKey, setImgKey] = useState(0);
  const [hasError, setHasError] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!objetoPrincipal) return;

    setLoading(true);
    setHasError(false);
    clearTimeout(timeoutRef.current);

    const img = new Image();
    img.src = normalizeImageUrl(objetoPrincipal.url);

    img.onload = () => {
      clearTimeout(timeoutRef.current);
      setImgKey((k) => k + 1);
      setLoading(false);
    };

    img.onerror = () => {
      clearTimeout(timeoutRef.current);
      setHasError(true);
      setLoading(false);
    };

    timeoutRef.current = setTimeout(() => {
      if (!img.complete) {
        img.src = "";
        setHasError(true);
        setLoading(false);
      }
    }, LOAD_TIMEOUT);

    return () => clearTimeout(timeoutRef.current);
  }, [objetoPrincipal?.id, objetoPrincipal?.url]);

  return (
    <div className="relative mx-auto mt-2 w-[95%] h-[15.5em] sm:w-[30em] sm:h-[25em]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/30 rounded-2xl z-10">
          <Loader />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/30 rounded-2xl z-10">
          <p className="text-white/60 text-sm">Error al cargar imagen</p>
        </div>
      )}

      <div
        key={imgKey}
        className={`
          w-full h-full rounded-2xl shadow-2xl
          bg-center bg-cover bg-no-repeat
          transition-all duration-500 ease-out
          ${loading || hasError ? "opacity-0 scale-95" : "opacity-100 scale-100"}
          hover:shadow-3xl cursor-pointer
          ring-2 ring-white/10 hover:ring-yellow-400/50
        `}
        style={{
          backgroundImage: `url(${normalizeImageUrl(objetoPrincipal?.url)})`,
          animation: loading ? "none" : "fun-fade-in 0.5s ease-out",
        }}
        onClick={handleImagePrincClick}
      />

      {objetoPrincipal?.id === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl animate-bounce">🎉</span>
        </div>
      )}
    </div>
  );
}
