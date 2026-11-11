import jwt from 'jsonwebtoken'

// Protege las rutas del admin: solo pasa quien envía un token válido.
// El frontend lo envía en el encabezado:  Authorization: Bearer <token>
export default function verificarToken(req, res, next) {
  const encabezado = req.headers.authorization || ''
  const token = encabezado.startsWith('Bearer ') ? encabezado.slice(7) : null

  if (!token) {
    return res.status(401).json({ mensaje: 'Debes iniciar sesión' })
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET)
    next() // token correcto: continúa a la ruta
  } catch {
    return res.status(401).json({ mensaje: 'Tu sesión expiró, vuelve a iniciar sesión' })
  }
}
