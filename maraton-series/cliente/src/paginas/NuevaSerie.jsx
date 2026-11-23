// NuevaSerie.jsx
// La página "/series/nueva": el formulario en su propia página.
// Después de guardar, useNavigate lleva a la lista, que vuelve a pedir las series al API.
 
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { crearSerie, obtenerMiembros } from '../api/seriesApi.js'
import Panel from '../componentes/comunes/Panel.jsx'
import FormularioSerie from '../componentes/formulario/FormularioSerie.jsx'
 
function NuevaSerie() {
  const navigate = useNavigate()
  const [miembros, setMiembros] = useState([])
  const [error, setError] = useState('')
 
  // Los miembros para el select «Propuesta por»
  useEffect(() => {
    async function cargar() {
      try {
        setMiembros(await obtenerMiembros())
      } catch (err) {
        setError(err.message)
      }
    }
    cargar()
  }, [])
 
  // Sin try/catch: si el API rechaza los datos, el error le llega al formulario
  async function agregar(datos) {
    await crearSerie(datos)
    navigate('/series')
  }
 
  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        {error && <div className="alert alert-danger">{error}</div>}
        <Panel titulo="Agregar una serie">
          <FormularioSerie miembros={miembros} onAgregar={agregar} />
        </Panel>
        <Link to="/series">← Volver a las series</Link>
      </div>
    </div>
  )
}
 
export default NuevaSerie
