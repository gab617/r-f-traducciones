import React, { useState } from "react";
import "./FormRegister.css";
import { useNavigate } from "react-router-dom";

export function FormRegister({ actionUserLogin, defUser }) {
  const [formData, setFormData] = useState({
    name_user: "",
    user_handle: "",
    password: "",
    passwordR:""
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
      formData.name_user === '' ||
      formData.user_handle === '' ||
      formData.password === '' ||
      formData.passwordR === ''
  ) {
      setError('Por favor, complete todos los campos.');
      return;
  }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      navigate("/categorias");

      // Redirigir a otra página en caso de login exitoso
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
          <button onClick={handleSubmit}>Crear cuenta</button>
          <p>{error} </p>
        </form>
        <div className="form-section">
          <p>
            Ya tenes una cuenta?
            <button onClick={actionUserLogin}> Ingresa!</button>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}