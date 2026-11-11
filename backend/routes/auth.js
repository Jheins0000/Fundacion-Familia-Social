import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// POST /api/auth/login → si usuario y clave son correctos, devuelve un token
// El usuario y la clave del admin están guardados en el archivo .env (no en el código)
router.post('/login', (req, res) => {
  const { usuario, clave } = req.body

  if (!process.env.ADMIN_USER || !process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(500).json({ mensaje: 'Falta configurar ADMIN_USER, ADMIN_PASSWORD o JWT_SECRET en el .env' })
  }
  if (typeof usuario !== 'string' || typeof clave !== 'string') {
    return res.status(400).json({ mensaje: 'Escribe usuario y contraseña' })
  }

  const esCorrecto = usuario === process.env.ADMIN_USER && clave === process.env.ADMIN_PASSWORD

  if (!esCorrecto) {
    return res.status(401).json({ mensaje: 'Usuario o contraseña incorrectos' })
  }

  // El token dura 8 horas; después el admin debe volver a entrar
  const token = jwt.sign({ usuario }, process.env.JWT_SECRET, { expiresIn: '8h' })
  res.json({ token })
})

export default router
