import { useState } from "react";
import { Link } from "react-router-dom";

export function NavbarGlobal() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-t z-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center sm:justify-center gap-4">
        <Link className="text-gray-700 hover:text-blue-500 font-medium text-sm" to="/">
          Inicio
        </Link>
        <Link className="text-gray-700 hover:text-blue-500 font-medium text-sm" to="/acierts">
          Aciertos
        </Link>
        <Link className="text-gray-700 hover:text-blue-500 font-medium text-sm" to="/seleccion">
          Jugar
        </Link>
        <Link className="text-gray-700 hover:text-blue-500 font-medium text-sm" to="/translations">
          Traducciones
        </Link>
      </div>
    </nav>
  );
}
