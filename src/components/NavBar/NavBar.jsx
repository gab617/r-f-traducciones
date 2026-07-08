import { NavLink, useLocation } from "react-router-dom";

const DEFAULT = [{ to: "/", icon: "/homeimg.png", label: "Inicio" }];

const HOME_LINKS = [
  { to: "/", icon: "/homeimg.png", label: "Inicio" },
  { to: "/categorias", icon: "/categs.png", label: "Inglés" },
  { to: "/play/math", icon: "🧮", label: "Matemáticas" },
  { to: "/play/cosmos", icon: "🚀", label: "Cosmos" },
];

const VOCAB_LINKS = [
  { to: "/", icon: "/homeimg.png", label: "Inicio" },
  { to: "/categorias", icon: "/categs.png", label: "Categorías" },
  { to: "/acierts", icon: "/checkimg.png", label: "Aciertos" },
  { to: "/translations", icon: "/brain.png", label: "Traducciones" },
];

const VOCAB_ROUTES = ["/categorias", "/seleccion", "/acierts", "/translations"];

function getLinks(pathname) {
  if (pathname === "/") return HOME_LINKS;
  if (VOCAB_ROUTES.some((r) => pathname.startsWith(r))) return VOCAB_LINKS;
  return DEFAULT;
}

export function NavBar() {
  const { pathname } = useLocation();
  const links = getLinks(pathname);

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
            {icon.startsWith("/") ? (
              <img src={icon} alt="" className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
            ) : (
              <span className="text-lg sm:text-xl leading-none">{icon}</span>
            )}
            <span className="text-[10px] sm:text-xs font-medium text-white/80">
              {label}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
