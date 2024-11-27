import { Link } from "react-router-dom"

import Logo from "../../../assets/img/logo.png"
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid me-auto">
        <Link className="navbar-brand" to="/">
          <img src={Logo} alt="logo" id="logo" />
        </Link>

        <div className="offcanvas offcanvas-end" tabIndex='-1' id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <Link className="offcanvas-title" id="offcanvasNavbarLabel" to="/">
              <img src={Logo} alt="logo" id="logo" />
            </Link>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li className="nav-item">
                <Link to="/" className="nav-link mx-lg-2 active">Home</Link>
              </li>
              
              <li className="nav-item">
                <Link to="/login" className="nav-link mx-lg-2">Login</Link>
              </li>

              <li className="nav-item">
                <Link to="/register" className="nav-link mx-lg-2">Register</Link>
              </li>
            </ul>
          </div>
        </div>

        <Link to='/login' className="login-button" id="login">Login</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar