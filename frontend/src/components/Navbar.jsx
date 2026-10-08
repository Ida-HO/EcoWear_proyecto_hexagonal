import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/productos">
          EcoWear
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarEcoWear"
          aria-controls="navbarEcoWear"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarEcoWear">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink to="/productos" className="nav-link">
                Catálogo
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Ver Compras
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/agregar" className="nav-link">
                Agregar Compra
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
