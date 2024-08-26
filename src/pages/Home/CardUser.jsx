import React from "react";
import './CardUser.css'

export function CardUser({user, closeUser, points} ) {
  return (
    <div class="card">
      <div class="card-details">
        <p class="text-title">{user} </p>
        <p class="text-body">Puntos actuales</p>
        <p>{points} </p>
      </div>
      <button onClick={closeUser} class="card-button">Cerrar sesión</button>
    </div>
  );
}
