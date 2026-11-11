import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import campanasRouter from './routes/campanas.js'
import mensajesRouter from './routes/mensajes.js'
import authRouter from './routes/auth.js'
import chatRouter from './routes/chat.js'
import { sembrarSiEstaVacio } from './data/seed.js'

const app = express()
const PORT = process.env.PORT || 4000

// ---------- Middlewares ----------
// CORS: solo permitimos peticiones desde nuestro frontend
const origenesPermitidos = [
  'http://localhost:5173',
  ...(process.env.FRONTEND_URL || '').split(',').map((url) => url.trim()).filter(Boolean),
]
app.use(cors({ origin: origenesPermitidos }))
app.use(express.json({ limit: '50kb' })) // convierte el body de las peticiones a JSON

// ---------- Rutas ----------
app.get('/', (req, res) => res.send('API de Fundación Familia Social funcionando 🌱'))
app.get('/api/salud', (req, res) => res.json({ ok: true }))

app.use('/api/campanas', campanasRouter)
app.use('/api/mensajes', mensajesRouter)
app.use('/api/auth', authRouter)
app.use('/api/chat', chatRouter)

// Ruta no encontrada (404)
app.use((req, res) => res.status(404).json({ mensaje: 'Ruta no encontrada' }))

// Manejador de errores general
app.use((err, req, res, next) => {
  // Datos inválidos (por ejemplo, falta un campo obligatorio) → 400
  if (err.name === 'ValidationError') {
    const detalle = Object.values(err.errors).map((e) => e.path).join(', ')
    return res.status(400).json({ mensaje: `Revisa estos campos: ${detalle}` })
  }
  // Un id que no tiene formato de MongoDB → 400
  if (err.name === 'CastError') {
    return res.status(400).json({ mensaje: 'Identificador no válido' })
  }
  console.error(err)
  res.status(500).json({ mensaje: 'Error interno del servidor' })
})

// ---------- Conexión a MongoDB y arranque ----------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log('✅ Conectado a MongoDB')
    await sembrarSiEstaVacio() // carga las campañas iniciales si la base está vacía
    app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`))
  })
  .catch((error) => {
    console.error('❌ No se pudo conectar a MongoDB:', error.message)
    process.exit(1)
  })
