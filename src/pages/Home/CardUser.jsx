import React, { useContext } from "react";
import "./CardUser.css";
import { Context } from "../../Contexto/Context";

export function CardUser({ closeUser, points }) {
  const { user, sessionPoints,racha, rachaSession } = useContext(Context);
  return (
    <div class="card mt-4">
      <div class="card-details">
        <h1 class="text-title">
          {user?.user?.charAt(0).toUpperCase() + user?.user?.slice(1)}{" "}
        </h1>
        <div className="mb-3">
          <h2>Sesión actual</h2>
          <div>
            <div className="flex flex-col text-sm">
              <p class="text-body">
                <span>{sessionPoints}</span> Puntos actuales
              </p>
              <p class="text-body">
                <span>{rachaSession} </span> Racha de aciertos
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2>Récords</h2>
          <div>
            <div className="flex flex-col text-sm">
              <p class="text-body">
                <span>{points}</span> Puntos globales
              </p>
              <p class="text-body">
                <span>{racha} </span> Mejor racha
              </p>
            </div>
          </div>
        </div>

      </div>
      <button onClick={closeUser} className="card-button">
        Cerrar sesión
      </button>
    </div>
  );
}
