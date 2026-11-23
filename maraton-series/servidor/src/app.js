// app.js
// Arma la aplicación de Express: middlewares, rutas y manejo de errores, en ese orden.
 
import express from 'express'
import cors from 'cors'
import { config } from './config/env.js'
import { miembrosRouter } from './miembros/miembros.routes.js'
import { seriesRouter } from './series/series.routes.js'
import { rutaNoEncontrada, manejarErrores } from './middlewares/errores.js'
 
export const app = express()
 
app.use(cors({ origin: config.origenCliente }))  // solo el cliente React puede llamar
app.use(express.json())  // convierte el cuerpo JSON en req.body
 
app.use('/api/miembros', miembrosRouter)
app.use('/api/series', seriesRouter)
 
app.use(rutaNoEncontrada)  // si ninguna ruta respondió
app.use(manejarErrores)  // siempre el último
