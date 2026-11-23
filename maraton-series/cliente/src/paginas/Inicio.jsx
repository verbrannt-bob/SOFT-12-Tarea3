// Inicio.jsx
// Página de bienvenida ("/").
 
import { Link } from 'react-router'
 
function Inicio() {
  return (
    <div className="text-center py-5">
      <h1>Bienvenidos al Maratón de series</h1>
      <p className="lead">Organicen lo que el club quiere ver.</p>
      <Link className="btn btn-primary" to="/series">
        Ver series
      </Link>
    </div>
  )
}
 
export default Inicio
