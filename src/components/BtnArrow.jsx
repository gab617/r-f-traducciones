import React from "react";

export function BtnArrow({ texto, currentKey }) {
  return (
    <div style={{
        backgroundColor:`${
            texto === currentKey ?
            "aqua":""
        }`
    }}>
      <button className="btnArrow w-[7em] p-1 md:p-4">
        <span>{texto.toUpperCase()}</span>
      </button>
    </div>
  );
}
