import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const URLAPI="https://e-b-js-traduciones.onrender.com"
const localAPI="http://localhost:3000"

export function FormLogin({ actionUserLogin, defUser }) {
  const [formData, setFormData] = useState({
    user_handle: "",
    password_hash: "",
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
    if (formData.user_handle === '' || formData.password_hash === '') {
      setError('Por favor, complete todos los campos.');
      return;
  }
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${URLAPI}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en usuario o contraseña");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      defUser(data)/* data es el usuario logueado */

      // Redirigir a otra página en caso de login exitoso
      navigate("/categorias");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="form-box">
        <form className="form">
          <span className="title">Acceder</span>
          <span className="subtitle">Ingresar con cuenta</span>
          <div className="form-container">
            <input
              name="user_handle"
              onChange={handleChange}
              type="email"
              className="input"
              placeholder="Usuario/ Nick"
            />
            <input
              name="password_hash"
              onChange={handleChange}
              type="password"
              className="input"
              placeholder="Contraseña"
            />
          </div>
          <button onClick={handleSubmit}>Acceder</button>
          <p>{error}</p>
        </form>
        <div className="form-section">
          <p className="text-xl">
            No tienes cuenta?<button onClick={actionUserLogin} className="text-yellow-400 font-bold"> Creala!</button>
          </p>
        </div>
      </div>
    </div>
  );
}
