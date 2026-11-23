// series/series.service.js
// Las reglas del negocio. No sabe nada de req ni res: recibe datos y devuelve datos.

import { ObjectId } from 'mongodb'
import * as repositorio from './series.repository.js'
import * as miembros from '../miembros/miembros.service.js'
import { validarSerie, validarEstado } from './series.validacion.js'
import { HttpError } from '../utils/HttpError.js'
import { revisarId } from '../utils/revisarId.js'

export async function listar() {
  return repositorio.listar()
}

export async function crear(datos) {
  const errores = validarSerie(datos)
  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'DATOS_INVALIDOS',
      'Revise los datos enviados.', errores)
  }

  if (!(await miembros.existe(datos.miembroId))) {
    throw new HttpError(400, 'DATOS_INVALIDOS',
      'Revise los datos enviados.', { miembroId: 'Ese miembro no existe.' })
  }

  // Se arma el documento campo por campo: nada extra del cliente entra a la base
  const id = await repositorio.crear({
    titulo: datos.titulo.trim(),
    genero: datos.genero,
    temporadas: datos.temporadas,
    estado: 'Por ver',                       // toda serie nueva empieza así
    miembroId: new ObjectId(datos.miembroId),
    calificaciones: [],
  })
  return repositorio.buscarPorId(id)
}

export async function cambiarEstado(id, datos) {
  revisarId(id)
  const errores = validarEstado(datos)
  if (Object.keys(errores).length > 0) {
    throw new HttpError(400, 'DATOS_INVALIDOS',
      'Revise los datos enviados.', errores)
  }
  const existe = await repositorio.cambiarEstado(id, datos.estado)
  if (!existe) {
    throw new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.')
  }
  return repositorio.buscarPorId(id)
}

export async function eliminar(id) {
  revisarId(id)
  const existia = await repositorio.eliminar(id)
  if (!existia) {
    throw new HttpError(404, 'NO_ENCONTRADA', 'La serie no existe.')
  }
}

