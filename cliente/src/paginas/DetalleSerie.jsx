// DetalleSerie.jsx
// La página "/series/:id": el detalle de una serie, pedido al API con el id de la dirección.
// Distingue tres resultados: cargando, error (o serie inexistente) y la serie.

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { obtenerSerie } from '../api/seriesApi.js'
import { claseEstado } from '../utils/series.js'

function DetalleSerie() {
  const { id } = useParams()                 // el :id de la ruta "series/:id"
  const [serie, setSerie] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)   // { mensaje, estado } o null

  // Se ejecuta al montar y cada vez que cambia el id
  useEffect(() => {
    const controlador = new AbortController()

    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        setSerie(await obtenerSerie(id, controlador.signal))
      } catch (err) {
        if (err.name === 'AbortError') return   // la cancelamos nosotros: no es un error
        setError({ mensaje: err.message, estado: err.estado })
      }
      setCargando(false)
    }
    cargar()

    // Limpieza: si el id cambia o se sale de la página, se cancela la petición pendiente
    return () => controlador.abort()
  }, [id])

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando serie…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <h1 className="h3">{error.estado === 404 ? 'Serie no encontrada' : 'No se pudo cargar la serie'}</h1>
        <p className="text-secondary">{error.mensaje}</p>
        <Link className="btn btn-outline-primary" to="/series">← Volver a las series</Link>
      </div>
    )
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <article className="card mb-3">
          <div className="card-body">
            <span className={'badge mb-2 ' + claseEstado(serie.estado)}>{serie.estado}</span>
            <h1 className="h3 card-title">{serie.titulo}</h1>
            <dl className="row mb-0">
              <dt className="col-5">Género</dt>
              <dd className="col-7">{serie.genero}</dd>
              <dt className="col-5">Temporadas</dt>
              <dd className="col-7">{serie.temporadas}</dd>
              <dt className="col-5">Propuesta por</dt>
              <dd className="col-7">{serie.miembro}</dd>
            </dl>
          </div>
        </article>
        <Link to="/series">← Volver a las series</Link>
      </div>
    </div>
  )
}

export default DetalleSerie
