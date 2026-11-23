// series/series.repository.js
// ÚNICO lugar que habla con MongoDB para las series. No sabe nada de HTTP.
 
import { ObjectId } from 'mongodb'
import { obtenerDb } from '../config/db.js'
 
const coleccion = () => obtenerDb().collection('series')
 
// Etapas que cambian miembroId por el nombre del miembro (parecido a un JOIN)
const CON_MIEMBRO = [
  { $lookup: {
    from: 'miembros',
    localField: 'miembroId',
    foreignField: '_id',
    as: 'miembro',
  } },
  { $unwind: '$miembro' },                     // [ {…} ]  →  {…}
  { $set: { miembro: '$miembro.nombre' } },     // {…}      →  'Ana'
  { $project: { calificaciones: 0 } },          // no se usan en la pantalla
]
 
export async function listar() {
  return coleccion()
    .aggregate([{ $sort: { _id: 1 } }, ...CON_MIEMBRO])
    .toArray()
}
 
export async function buscarPorId(id) {
  const [serie] = await coleccion()
    .aggregate([{ $match: { _id: new ObjectId(id) } }, ...CON_MIEMBRO])
    .toArray()
  return serie ?? null
}
 
export async function crear(serie) {
  const resultado = await coleccion().insertOne(serie)
  return resultado.insertedId
}

export async function cambiarEstado(id, estado) {
  const resultado = await coleccion().updateOne(
    { _id: new ObjectId(id) },
    { $set: { estado } },
  )
  return resultado.matchedCount === 1
}
 
export async function eliminar(id) {
  const resultado = await coleccion()
    .deleteOne({ _id: new ObjectId(id) })
  return resultado.deletedCount === 1
}
