import { Link } from "react-router-dom";
import React, { useContext } from "react";
import Logo from "../../../assets/img/logo.png";
import { Context } from "../../../context/UserContext";

function Navbar() {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg bg-warning px-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center text-primary fw-bold">
          <img src={Logo} alt="Get A Pet" width="40" className="me-2" />
          <h2 className="m-0">Pegue seu Pet</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link text-primary fw-bold">
                Adotar
              </Link>
            </li>
            {authenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/pet/myadoptions" className="nav-link text-primary fw-bold">
                    Minhas Adoções
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/pet/mypets" className="nav-link text-primary fw-bold">
                    Meus Pets
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user/profile" className="nav-link text-primary fw-bold">
                    Meu Perfil
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link text-primary fw-bold cursor-pointer"
                    onClick={logout}
                  >
                    Sair
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-primary fw-bold">
                    Entrar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-primary fw-bold">
                    Registar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
