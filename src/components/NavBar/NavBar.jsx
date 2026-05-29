import { NavLink } from "react-router-dom";

const links = [
  { to: "/", icon: "/homeimg.png", label: "Inicio" },
  { to: "/categorias", icon: "/categs.png", label: "Categorías" },
  { to: "/seleccion", icon: "/play.png", label: "Jugar" },
  { to: "/acierts", icon: "/checkimg.png", label: "Aciertos" },
  { to: "/translations", icon: "/brain.png", label: "Traducciones" },
];

export function NavBar() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full sm:w-[90%] max-w-2xl z-50">
      <div className="flex items-center justify-around bg-gray-900/85 backdrop-blur-lg border-t border-white/10 rounded-t-2xl px-1 py-1 shadow-2xl shadow-black/50">
        {links.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) => `
              flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-xl transition-all duration-200
              ${isActive
                ? "bg-gradient-to-br from-purple-600 to-pink-500 shadow-lg shadow-purple-500/30 scale-105"
                : "hover:bg-white/10 active:scale-95"
              }
            `}
          >
            <img src={icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            <span className="text-[10px] sm:text-xs font-medium text-white/80">
              {label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
