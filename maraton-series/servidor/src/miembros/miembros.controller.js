// miembros/miembros.controller.js
// Traduce HTTP ↔ servicio.


import * as servicio from './miembros.service.js'
 
export async function listar(req, res) {
  const miembros = await servicio.listar()
  res.json(miembros)
}
