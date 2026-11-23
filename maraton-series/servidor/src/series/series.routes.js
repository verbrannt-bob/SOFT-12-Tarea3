// series/series.routes.js
// Qué URL y qué verbo atiende cada función del controlador.
 
import { Router } from 'express'
import * as controlador from './series.controller.js'
 
export const seriesRouter = Router()
 
seriesRouter.get('/', controlador.listar)  // GET    /api/series
seriesRouter.post('/', controlador.crear)  // POST   /api/series
seriesRouter.patch('/:id/estado', controlador.cambiarEstado)  // PATCH  /api/series/:id/estado
seriesRouter.delete('/:id', controlador.eliminar)  // DELETE /api/series/:id
