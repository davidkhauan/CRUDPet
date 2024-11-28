import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../context/UserContext";

function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <section className="d-flex flex-column align-items-center p-4">
      <h1 className="mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Digite o e-mail"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Digite a senha"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Entrar
        </button>
      </form>
      <p className="mt-3">
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  );
}

export default Login;
