// FormularioSerie.jsx
// Formulario CONTROLADO para agregar una serie.
// Valida antes de enviar; si el API rechaza los datos, muestra sus mensajes por campo.
// No sabe dónde se guarda la serie: se la entrega a App con onAgregar.
 
import { useState } from 'react'
import { GENEROS } from '../../data/series.js'
import { validarSerie } from '../../utils/validarSerie.js'
 
const VACIO = { titulo: '', genero: '', temporadas: '', miembroId: '' }
 
function FormularioSerie({ miembros, onAgregar }) {
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
 
  // Un solo manejador para todos los campos: usa el atributo name
  function cambiar(event) {
    const { name, value } = event.target
    setDatos({ ...datos, [name]: value })
  }
 
  async function enviar(event) {
    event.preventDefault()
    const nuevosErrores = validarSerie(datos)
    setErrores(nuevosErrores)
 
    if (Object.keys(nuevosErrores).length > 0) {
      return
    }
 
    setEnviando(true)
    try {
      await onAgregar({
        ...datos,
        titulo: datos.titulo.trim(),
        temporadas: Number(datos.temporadas),
      })
      setDatos(VACIO)
    } catch (err) {
      // 400: el API manda un mensaje por campo. Otro error: un mensaje general
      setErrores(err.detalles ?? { general: err.message })
    } finally {
      setEnviando(false)
    }
  }
 
  return (
    <form onSubmit={enviar} noValidate>
      {errores.general && (
        <div className="alert alert-danger">{errores.general}</div>
      )}
 
      <div className="mb-3">
        <label htmlFor="titulo" className="form-label">Título</label>
        <input
          id="titulo"
          name="titulo"
          className={errores.titulo ? 'form-control is-invalid' : 'form-control'}
          value={datos.titulo}
          onChange={cambiar}
        />
        {errores.titulo && <div className="invalid-feedback">{errores.titulo}</div>}
      </div>
 
      <div className="mb-3">
        <label htmlFor="genero" className="form-label">Género</label>
        <select
          id="genero"
          name="genero"
          className={errores.genero ? 'form-select is-invalid' : 'form-select'}
          value={datos.genero}
          onChange={cambiar}
        >
          <option value="">Elija…</option>
          {GENEROS.map((opcion) => (
            <option key={opcion} value={opcion}>{opcion}</option>
          ))}
        </select>
        {errores.genero && <div className="invalid-feedback">{errores.genero}</div>}
      </div>
 
      <div className="mb-3">
        <label htmlFor="temporadas" className="form-label">Temporadas</label>
        <input
          id="temporadas"
          name="temporadas"
          type="number"
          className={errores.temporadas ? 'form-control is-invalid' : 'form-control'}
          value={datos.temporadas}
          onChange={cambiar}
        />
        {errores.temporadas && <div className="invalid-feedback">{errores.temporadas}</div>}
      </div>
 
      <div className="mb-3">
        <label htmlFor="miembroId" className="form-label">Propuesta por</label>
        <select
          id="miembroId"
          name="miembroId"
          className={errores.miembroId ? 'form-select is-invalid' : 'form-select'}
          value={datos.miembroId}
          onChange={cambiar}
        >
          <option value="">Elija…</option>
          {miembros.map((miembro) => (
            <option key={miembro._id} value={miembro._id}>{miembro.nombre}</option>
          ))}
        </select>
        {errores.miembroId && <div className="invalid-feedback">{errores.miembroId}</div>}
      </div>
 
      <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={enviando}
      >
        {enviando ? 'Guardando…' : 'Agregar serie'}
      </button>
    </form>
  )
}
 
export default FormularioSerie