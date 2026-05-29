/* eslint-disable react/prop-types */
export function BtnOpc({
  txtIng,
  handleWordClick,
  seleccionado,
  disabled,
  feedback,
}) {
  const isSelected = seleccionado === txtIng?.palabra;
  const isCorrectAnswer = feedback === "correcto" && isSelected;
  const isWrongAnswer = feedback === "incorrecto" && isSelected;

  return (
    <div className="w-full mb-1 px-0.5">
      <button
        className={`
          w-full py-1.5 px-1 rounded-lg font-bold text-xs sm:text-lg
          transition-all duration-200
          ${
            txtIng.activo
              ? "btn-opciones btn-opciones-true opacity-50 cursor-not-allowed"
              : isCorrectAnswer
              ? "bg-green-500 text-white scale-105 shadow-lg shadow-green-500/50"
              : isWrongAnswer
              ? "bg-red-500 text-white animate-fun-shake shadow-lg shadow-red-500/50"
              : isSelected
              ? "bg-blue-500 text-white scale-105 shadow-lg shadow-blue-500/40 ring-2 ring-blue-300"
              : "bg-gray-200 text-gray-800 hover:bg-blue-100 hover:scale-105 active:scale-95 cursor-pointer"
          }
          ${disabled && !isSelected ? "opacity-50" : ""}
        `}
        onClick={() => handleWordClick(txtIng?.palabra)}
        disabled={disabled || txtIng.activo}
      >
        {txtIng?.palabra}
      </button>
    </div>
  );
}
