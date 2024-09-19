import React, { useState } from "react";
import "./FormRegister.css";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
const URLAPI = import.meta.env.VITE_URL_API

export function FormRegister({ actionUserLogin, defUser }) {
  const [formData, setFormData] = useState({
    name_user: "",
    user_handle: "",
    password: "",
    passwordR: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name_user === "" ||
      formData.user_handle === "" ||
      formData.password === "" ||
      formData.passwordR === ""
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${URLAPI}/db/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Redirigir a otra página en caso de login exitoso
      const data = await response.json();
      console.log("Login successful:", data);
      defUser(data);
      navigate("/categorias");
    } catch (err) {
      setLoading(false)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="form-box">
        <form className="form">
          <span className="title">Crea tu cuenta!</span>
          <span className="subtitle">Datos</span>
          <div className="form-container">
            <input
              name="name_user"
              onChange={handleChange}
              type="text"
              className="input"
              placeholder="Nombre"
            />

            <input
              name="user_handle"
              onChange={handleChange}
              type="text"
              className="input"
              placeholder="Usuario / Nick"
            />
            <input
              name="password"
              onChange={handleChange}
              type="password"
              className="input"
              placeholder="Contraseña"
            />
            <input
              name="passwordR"
              onChange={handleChange}
              type="password"
              className="input"
              placeholder="Repetir contraseña"
            />
          </div>
              
              <button className={`${loading ? "hidden": "block"} font-bold text-yellow-400`} onClick={handleSubmit}>Crear cuenta</button>
          {error && <p>{error}</p>}

          {loading && (
            <>
              <div class="flex-col gap-4 w-full flex items-center justify-center">
                <div class="w-4 h-4 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                  <div class="w-4 h-4 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
                </div>
              </div>
            </>
          )}
        </form>
        <div className="form-section">
          <p className="text-xl">
            Ya tenes una cuenta?
            
            <button
              onClick={actionUserLogin}
              className="text-yellow-400 font-bold"
            >
              {" "}
              Ingresa!
            </button>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
