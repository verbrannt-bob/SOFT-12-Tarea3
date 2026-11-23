// series/series.validacion.js
// Revisa los datos que llegan del cliente. Devuelve un mensaje por campo con problema.
// Si todo está bien, devuelve un objeto vacío: {}
 
import { ObjectId } from 'mongodb'
 
export const GENEROS = ['Drama', 'Comedia', 'Ciencia ficción', 'Animación', 'Documental']
export const ESTADOS = ['Por ver', 'Viendo', 'Vista']
 
export function validarSerie(datos) {
  const errores = {}
 
  if (typeof datos.titulo !== 'string' || datos.titulo.trim().length < 2) {
    errores.titulo = 'Escriba un título de al menos 2 caracteres.'
  }
 
  if (!GENEROS.includes(datos.genero)) {
    errores.genero = 'Elija un género de la lista.'
  }
 
  const t = datos.temporadas
  if (!Number.isInteger(t) || t < 1 || t > 30) {
    errores.temporadas = 'Indique un número entero entre 1 y 30.'
  }
 
  if (typeof datos.miembroId !== 'string' || !ObjectId.isValid(datos.miembroId)) {
    errores.miembroId = 'Indique quién propone la serie.'
  }
 
  return errores
}

export function validarEstado(datos) {
  const errores = {}
  if (!ESTADOS.includes(datos.estado)) {
    errores.estado = `El estado debe ser: ${ESTADOS.join(', ')}.`
  }
  return errores
}
