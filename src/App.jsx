import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Categorias from "./pages/Categorias/Categorias";
import Seleccion from "./pages/Seleccion/Seleccion";
import { Aciertos } from "./pages/Aciertos/Aciertos";
import { AppContext } from "./context/AppContext";
import { Home } from "./pages/Home/Home";
import { Traducciones } from "./pages/Traducciones/Traducciones";
import { NavBar } from "./components/NavBar/NavBar";
import { MathGame } from "./games/math/MathGame";

function App() {
  const { user, sessionPoints, rachaSession, data } = useContext(AppContext);

  return (
    <div className="sm:w-90 m-auto pb-20">
      <div className="flex sm:gap-3 items-center mx-auto justify-between w-[100%]">
        <h1 className="text-white mt-2 ml-2 sm:ml-0 ">
          Hola!{" "}
          <span className="font-bold text-yellow-400">{`${
            user.user ? user.user : "guest"
          }`}</span>
        </h1>
        <div className="text-white text-end mr-2">
          Puntuacion:{" "}
          <span className="text-yellow-400 font-semibold">
            {" "}
            {sessionPoints}
          </span>{" "}
          Racha actual:{" "}
          <span className="text-yellow-400 font-semibold">{rachaSession}</span>
        </div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={data ? <Categorias /> : null} />
          <Route path="/seleccion" element={data ? <Seleccion /> : null} />
          <Route path="/play/math" element={<MathGame />} />
          <Route path="/acierts" element={<Aciertos />} />
          <Route path="/translations" element={<Traducciones />} />
        </Routes>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
