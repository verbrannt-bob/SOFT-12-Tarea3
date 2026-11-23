// Encabezado.jsx
// Barra superior con el nombre de la aplicación y el menú.
// NavLink agrega la clase "active" al enlace de la página actual (Bootstrap la resalta).
 
import { Link, NavLink } from 'react-router'
 
function Encabezado() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">🍿 Maratón de series</Link>
        <div className="navbar-nav">
          <NavLink className="nav-link" to="/">Inicio</NavLink>
          <NavLink className="nav-link" to="/series">Series</NavLink>
        </div>
      </div>
    </nav>
  )
}
 
export default Encabezado
