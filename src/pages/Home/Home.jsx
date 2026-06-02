import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoaderHamster } from "../../components/LoaderHamster";
import { AppContext } from "../../context/AppContext";
import { register } from "../../services/authService";
import { GAMES } from "../../games/registry";
import "./btn-home.css";

const MEDALS = ["🥇", "🥈", "🥉"];

function Ranking({ users, loading }) {
  const [showRacha, setShowRacha] = useState(false);
  const [usersOrderRacha, setUsersOrderRacha] = useState();

  useEffect(() => {
    if (!users) return;
    setUsersOrderRacha([...users]?.sort((a, b) => b.best_racha - a.best_racha));
  }, [users]);

  if (loading) return null;

  const list = showRacha ? usersOrderRacha : users;

  return (
    <div className="w-72 p-4 rounded-xl border border-gray-700/50 bg-gradient-to-br from-purple-900/60 to-pink-900/40 shadow-xl shadow-purple-500/10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
          🏆 Ranking
        </h2>
        <button
          onClick={() => setShowRacha((p) => !p)}
          className="px-3 py-1 text-xs font-semibold text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        >
          {showRacha ? "Puntos" : "Racha"}
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-2">
        {showRacha ? "Mayor racha" : "Puntuación global"}
      </p>

      <div className="space-y-1 max-h-60 overflow-y-auto">
        {list?.map((u, i) => (
          <div
            key={u.user_handle}
            className="flex items-center justify-between px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 text-sm font-bold text-gray-400">
                {MEDALS[i] || `#${i + 1}`}
              </span>
              <span className="text-sm font-medium text-white">
                {u.user_handle}
              </span>
            </div>
            <span className="text-sm font-bold text-yellow-400">
              {showRacha ? u.best_racha : u.points}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginForm({ onToggle }) {
  const { loginWithData } = useContext(AppContext);
  const [form, setForm] = useState({ user_handle: "", password_hash: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.user_handle || !form.password_hash) {
      setError("Completá todos los campos");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await loginWithData(form);
      navigate("/categorias");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          name="user_handle"
          value={form.user_handle}
          onChange={(e) => setForm({ ...form, user_handle: e.target.value })}
          type="text"
          placeholder="Usuario"
          className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
      <div>
        <input
          name="password_hash"
          value={form.password_hash}
          onChange={(e) =>
            setForm({ ...form, password_hash: e.target.value })
          }
          type="password"
          placeholder="Contraseña"
          className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? "Ingresando..." : "Acceder"}
      </button>
      <p className="text-xs text-center text-gray-400">
        ¿No tenés cuenta?{" "}
        <button
          type="button"
          onClick={onToggle}
          className="text-yellow-400 font-semibold hover:underline"
        >
          Creala
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ onToggle }) {
  const { defUser } = useContext(AppContext);
  const [form, setForm] = useState({
    name_user: "",
    user_handle: "",
    password: "",
    passwordR: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name_user || !form.user_handle || !form.password || !form.passwordR) {
      setError("Completá todos los campos");
      return;
    }
    if (form.password !== form.passwordR) {
      setError("Las contraseñas no coinciden");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await register(form);
      localStorage.setItem("user", JSON.stringify(data));
      defUser(data);
      navigate("/categorias");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        name="name_user"
        value={form.name_user}
        onChange={(e) => setForm({ ...form, name_user: e.target.value })}
        type="text"
        placeholder="Nombre"
        className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
      <input
        name="user_handle"
        value={form.user_handle}
        onChange={(e) => setForm({ ...form, user_handle: e.target.value })}
        type="text"
        placeholder="Usuario / Nick"
        className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
      <input
        name="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
      <input
        name="passwordR"
        value={form.passwordR}
        onChange={(e) => setForm({ ...form, passwordR: e.target.value })}
        type="password"
        placeholder="Repetir contraseña"
        className="w-full px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
      >
        {loading ? "Creando..." : "Crear cuenta"}
      </button>
      <p className="text-xs text-center text-gray-400">
        ¿Ya tenés cuenta?{" "}
        <button
          type="button"
          onClick={onToggle}
          className="text-yellow-400 font-semibold hover:underline"
        >
          Ingresá
        </button>
      </p>
    </form>
  );
}

function ProfileCard() {
  const { user, closeUser, points, racha, sessionPoints, rachaSession } =
    useContext(AppContext);

  return (
    <div className="w-72 p-5 rounded-xl border border-gray-700/50 bg-gradient-to-br from-emerald-900/60 to-teal-900/40 shadow-xl shadow-emerald-500/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl font-bold text-white shadow-lg">
          {user?.user?.charAt(0)?.toUpperCase() || "?"}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">
            {user?.user?.charAt(0).toUpperCase() + user?.user?.slice(1) || "Usuario"}
          </h3>
          <p className="text-xs text-gray-400">Perfil</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 rounded-lg bg-white/5">
          <p className="text-2xl font-bold text-yellow-400">{sessionPoints}</p>
          <p className="text-xs text-gray-400">Puntos sesión</p>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <p className="text-2xl font-bold text-orange-400">{rachaSession}</p>
          <p className="text-xs text-gray-400">Racha actual</p>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <p className="text-2xl font-bold text-emerald-400">{points}</p>
          <p className="text-xs text-gray-400">Puntos totales</p>
        </div>
        <div className="p-3 rounded-lg bg-white/5">
          <p className="text-2xl font-bold text-blue-400">{racha}</p>
          <p className="text-xs text-gray-400">Mejor racha</p>
        </div>
      </div>

      <div className="space-y-2">
        <Link to="/categorias">
          <button className="w-full py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg hover:scale-[1.02] active:scale-95 transition-all">
            Ir a Categorías
          </button>
        </Link>
        <button
          onClick={closeUser}
          className="w-full py-2 text-xs font-semibold text-gray-400 bg-white/5 rounded-lg hover:bg-white/10 hover:text-red-400 transition-all"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const { loading, user, closeUser, points, users, conectBD } =
    useContext(AppContext);

  return (
    <div className="flex flex-col items-center min-h-screen px-4 pt-6 pb-4">
      {loading && (
        <div className="flex flex-col items-center gap-3 mt-20">
          <LoaderHamster />
          <p className="text-white text-lg">Cargando datos...</p>
        </div>
      )}

      {!loading && (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl py-2 sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 break-words">
              🧠 Rengav Studio
            </h1>
            <p className="mt-2 text-sm text-gray-400 max-w-md mx-auto">
               Aprendé palabras en inglés con imágenes, categorizado y
              acompañado de ilustraciones para facilitar la memorización.
            </p>
          </div>

          {conectBD && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-4xl mx-auto">
              {user?.user === "guest" ? (
                <>
                  <div className="w-72 p-5 rounded-xl border border-gray-700/50 bg-gradient-to-br from-indigo-900/60 to-blue-900/40 shadow-xl shadow-blue-500/10">
                    <div className="flex items-center gap-2 mb-4">
                      <button
                        onClick={() => setIsLogin(true)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                          isLogin
                            ? "bg-white text-gray-900 shadow"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Ingresar
                      </button>
                      <button
                        onClick={() => setIsLogin(false)}
                        className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
                          !isLogin
                            ? "bg-white text-gray-900 shadow"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Registrarse
                      </button>
                    </div>
                    {isLogin ? (
                      <LoginForm onToggle={() => setIsLogin(false)} />
                    ) : (
                      <RegisterForm onToggle={() => setIsLogin(true)} />
                    )}
                  </div>

                  <Ranking users={users} loading={loading} />
                </>
              ) : (
                <>
                  <ProfileCard />
                  <Ranking users={users} loading={loading} />
                </>
              )}
            </div>
          )}

        </>
      )}

      <div className="w-full max-w-4xl mx-auto mt-8">
        <h2 className="text-center text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          🎮 Elegí un juego
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4">
          {GAMES.map((game) => (
            <Link key={game.id} to={game.route}>
              <div
                className={`
                  group relative overflow-hidden rounded-2xl p-5
                  bg-gradient-to-br ${game.bgColor}
                  shadow-xl hover:shadow-2xl hover:scale-[1.02]
                  active:scale-[0.98] transition-all duration-200
                  cursor-pointer
                `}
              >
                <div className="flex items-center gap-4">
                  {game.icon.startsWith("/") ? (
                    <img
                      src={game.icon}
                      alt=""
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <span className="text-4xl">{game.icon}</span>
                  )}
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {game.name}
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      {game.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
