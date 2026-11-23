// miembros/miembros.service.js
// Reglas de los miembros. Otros módulos (series) también lo usan.
 
import * as repositorio from './miembros.repository.js'
 
export async function listar() {
  return repositorio.listar()
}
 
export async function existe(id) {
  const miembro = await repositorio.buscarPorId(id)
  return miembro !== null
}
