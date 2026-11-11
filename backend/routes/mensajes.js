import { Router } from 'express'
import Mensaje from '../models/Mensaje.js'
import verificarToken from '../middleware/verificarToken.js'

const router = Router()

// POST /api/mensajes → cualquier visitante envía el formulario de contacto
router.post('/', async (req, res) => {
  const { nombre, correo, telefono, tipo, campana, mensaje } = req.body
  const nuevo = await Mensaje.create({ nombre, correo, telefono, tipo, campana, mensaje })
  res.status(201).json({ mensaje: 'Mensaje recibido', id: nuevo._id })
})

// ---- Desde aquí, todas las rutas son solo para el admin ----

// GET /api/mensajes → lista de mensajes (los más nuevos primero)
router.get('/', verificarToken, async (req, res) => {
  const mensajes = await Mensaje.find().sort({ createdAt: -1 })
  res.json(mensajes)
})

// PUT /api/mensajes/:id → marcar como leído / no leído
router.put('/:id', verificarToken, async (req, res) => {
  const actualizado = await Mensaje.findByIdAndUpdate(
    req.params.id,
    { leido: Boolean(req.body.leido) },
    { new: true }
  )
  if (!actualizado) return res.status(404).json({ mensaje: 'Mensaje no encontrado' })
  res.json(actualizado)
})

// DELETE /api/mensajes/:id → eliminar un mensaje
router.delete('/:id', verificarToken, async (req, res) => {
  const eliminado = await Mensaje.findByIdAndDelete(req.params.id)
  if (!eliminado) return res.status(404).json({ mensaje: 'Mensaje no encontrado' })
  res.json({ mensaje: 'Mensaje eliminado' })
})

export default router
