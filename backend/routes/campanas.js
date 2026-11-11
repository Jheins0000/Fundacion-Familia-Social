import { Router } from 'express'
import Campana from '../models/Campana.js'
import verificarToken from '../middleware/verificarToken.js'

const router = Router()

// Solo aceptamos estos campos (así nadie puede enviar datos extra)
const camposPermitidos = ['titulo', 'subtitulo', 'categoria', 'imagen', 'descripcion', 'detalle', 'necesita', 'avance', 'meta', 'unidad']
const limpiar = (body) =>
  Object.fromEntries(Object.entries(body).filter(([campo]) => camposPermitidos.includes(campo)))

// GET /api/campanas → lista pública de campañas
router.get('/', async (req, res) => {
  const campanas = await Campana.find().sort({ createdAt: 1 })
  res.json(campanas)
})

// GET /api/campanas/:id → una campaña
router.get('/:id', async (req, res) => {
  const campana = await Campana.findById(req.params.id)
  if (!campana) return res.status(404).json({ mensaje: 'Campaña no encontrada' })
  res.json(campana)
})

// POST /api/campanas → crear (solo admin)
router.post('/', verificarToken, async (req, res) => {
  const nueva = await Campana.create(limpiar(req.body))
  res.status(201).json(nueva)
})

// PUT /api/campanas/:id → actualizar (solo admin)
router.put('/:id', verificarToken, async (req, res) => {
  const actualizada = await Campana.findByIdAndUpdate(req.params.id, limpiar(req.body), {
    new: true, // devuelve el documento ya actualizado
    runValidators: true, // vuelve a validar los datos
  })
  if (!actualizada) return res.status(404).json({ mensaje: 'Campaña no encontrada' })
  res.json(actualizada)
})

// DELETE /api/campanas/:id → eliminar (solo admin)
router.delete('/:id', verificarToken, async (req, res) => {
  const eliminada = await Campana.findByIdAndDelete(req.params.id)
  if (!eliminada) return res.status(404).json({ mensaje: 'Campaña no encontrada' })
  res.json({ mensaje: 'Campaña eliminada' })
})

export default router
