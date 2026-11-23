// series/series.controller.js
// Traduce HTTP ↔ servicio: lee req, llama al servicio, responde con el código correcto.
 
import * as servicio from './series.service.js'
 
export async function listar(req, res) {
  const series = await servicio.listar()
  res.json(series)
}
 
export async function crear(req, res) {
  const serie = await servicio.crear(req.body ?? {})
  res.status(201).json(serie)
}

export async function cambiarEstado(req, res) {
  const serie = await servicio.cambiarEstado(req.params.id, req.body ?? {})
  res.json(serie)
}
 
export async function eliminar(req, res) {
  await servicio.eliminar(req.params.id)
  res.status(204).end()
}

