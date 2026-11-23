// miembros/miembros.routes.js
// Qué URL y qué verbo atiende cada función del controlador.

import { Router } from 'express'
import * as controlador from './miembros.controller.js'
 
export const miembrosRouter = Router()
 
miembrosRouter.get('/', controlador.listar)  // GET /api/miembros
