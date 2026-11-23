// NoEncontrada.jsx
// Se muestra cuando la dirección no coincide con ninguna ruta (path="*").
 
import { Link } from 'react-router'
 
function NoEncontrada() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">404</h1>
      <p className="lead">Esa página no existe.</p>
      <Link className="btn btn-outline-primary" to="/">
        Volver al inicio
      </Link>
    </div>
  )
}
 
export default NoEncontrada
