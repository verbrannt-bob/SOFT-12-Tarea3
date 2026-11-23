// api/seriesApi.js
// Todas las llamadas al API del Maratón en un solo lugar.
// Los componentes no usan fetch directamente: llaman a estas funciones.

const URL_API = import.meta.env.VITE_API_URL   // viene del archivo .env

// Hace la petición y devuelve los datos de la respuesta.
// Si el servidor responde con un error, lanza un Error con su mensaje.
// senal (opcional) permite cancelar la petición con un AbortController.
async function pedir(ruta, metodo = 'GET', datos, senal) {
    const opciones = { method: metodo, signal: senal }
    if (datos !== undefined) {
        opciones.headers = { 'Content-Type': 'application/json' }
        opciones.body = JSON.stringify(datos)
    }

    let respuesta
    try {
        respuesta = await fetch(URL_API + ruta, opciones)
    } catch (err) {
        if (err.name === 'AbortError') {
            throw err                                  // la cancelamos nosotros: se deja pasar
        }
        throw new Error('No se pudo conectar con el API. ¿Está encendido el servidor?')
    }

    if (respuesta.status === 204) {
        return null                                  // DELETE: respuesta sin cuerpo
    }

    const cuerpo = await respuesta.json()
    if (!respuesta.ok) {
        const error = new Error(cuerpo.error.mensaje)
        error.detalles = cuerpo.error.detalles       // 400: un mensaje por campo
        error.estado = respuesta.status              // 404, 400, 500…
        throw error
    }
    return cuerpo
}




export function obtenerSeries() {
    return pedir('/series')
}

export function obtenerSerie(id, senal) {
  return pedir(`/series/${id}`, 'GET', undefined, senal)
}


export function obtenerMiembros() {
    return pedir('/miembros')
}

export function crearSerie(datos) {
    return pedir('/series', 'POST', datos)
}

export function cambiarEstadoSerie(id, estado) {
    return pedir(`/series/${id}/estado`, 'PATCH', { estado })
}

export function eliminarSerie(id) {
    return pedir(`/series/${id}`, 'DELETE')
}

