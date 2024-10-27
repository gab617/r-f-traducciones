import React, { useContext, useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
export function NavBar() {
  const [location, setLocation] = useState(useLocation().pathname);

  const navigate = useNavigate();
  function handleLocationasign(path) {
    console.log(path);
    setLocation(path);
    navigate(path);
  }

  return (
    <div className="button-container md:h-[4em] sm:w-[80%] mx-auto">
      <button
            style={{
              backgroundColor:  location == "/" ? "rgb(32,60,238,.8)" : ""
            }}
        className="button"
        onClick={() => handleLocationasign("/")}
      >
        <Link>
          <img src="/homeimg.png" alt="" />
        </Link>
      </button>
      <button 
      style={{
        backgroundColor:  location == "/categorias" ? "rgb(32,60,238,.8)" : ""
      }}
      className="button" onClick={() => handleLocationasign("/categorias")}>
        <Link>
          <img src="/categs.png" alt="" />
        </Link>
      </button>
      <button
     style={{
      backgroundColor:  location == "/seleccion" ? "rgb(32,60,238,.8)" : ""
    }}
        className="button"
        onClick={() => handleLocationasign("/seleccion")}
      >
        <Link>
          <img src="/play.png" alt="" />
        </Link>
      </button>

      <button
           style={{
            backgroundColor:  location == "/acierts" ? "rgb(32,60,238,.8)" : ""
          }}
        className="button"
        onClick={() => handleLocationasign("/acierts")}
      >
        <Link>
          <img src="/checkimg.png" alt="" />
        </Link>
      </button>
      <button
           style={{
            backgroundColor:  location == "/translations" ? "rgb(32,60,238,.8)" : ""
          }}
        className="button"
        onClick={() => handleLocationasign("/translations")}
      >
        <Link>
          <img src="/brain.png" alt="" />
        </Link>
      </button>
    </div>
  );
}
