import { useEffect, useState } from 'react'
import { eliminarMensaje, marcarMensaje, obtenerMensajes } from '../services/api.js'

const nombresTipo = {
  voluntariado: '🙌 Voluntariado',
  donacion: '🎒 Donación',
  apadrinamiento: '🤝 Apadrinamiento',
  otro: '💬 Otro',
}

export default function PanelMensajes() {
  const [mensajes, setMensajes] = useState([])
  const [filtro, setFiltro] = useState('todos')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerMensajes()
      .then(setMensajes)
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  async function cambiarLeido(m) {
    const actualizado = await marcarMensaje(m._id, !m.leido)
    setMensajes(mensajes.map((x) => (x._id === m._id ? actualizado : x)))
  }

  async function borrar(id) {
    if (!window.confirm('¿Eliminar este mensaje?')) return
    await eliminarMensaje(id)
    setMensajes(mensajes.filter((x) => x._id !== id))
  }

  const visibles = mensajes.filter((m) => filtro === 'todos' || m.tipo === filtro)
  const sinLeer = mensajes.filter((m) => !m.leido).length

  if (cargando) return <p className="aviso">Cargando mensajes…</p>
  if (error) return <div className="alerta error">⚠️ {error}</div>

  return (
    <>
      <div className="admin-resumen">
        <div><strong>{mensajes.length}</strong> mensajes</div>
        <div><strong>{sinLeer}</strong> sin leer</div>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
          <option value="todos">Todos los tipos</option>
          {Object.entries(nombresTipo).map(([id, nombre]) => (
            <option key={id} value={id}>{nombre}</option>
          ))}
        </select>
      </div>

      {visibles.length === 0 && <p className="aviso">No hay mensajes todavía.</p>}

      <div className="lista-mensajes">
        {visibles.map((m) => (
          <article key={m._id} className={`mensaje-card ${m.leido ? 'leido' : ''}`}>
            <header>
              <div>
                <strong>{m.nombre}</strong>
                <span className="campana-tag">{nombresTipo[m.tipo] || m.tipo}</span>
              </div>
              <time>{new Date(m.createdAt).toLocaleString('es-EC')}</time>
            </header>
            <p className="mensaje-contacto">
              <a href={`mailto:${m.correo}`}>{m.correo}</a>
              {m.telefono && <> · <a href={`https://wa.me/593${m.telefono.replace(/^0/, '')}`} target="_blank" rel="noopener">{m.telefono}</a></>}
            </p>
            {m.campana && <p className="campana-sub">Campaña: {m.campana}</p>}
            <p>{m.mensaje}</p>
            <div className="mensaje-acciones">
              <button onClick={() => cambiarLeido(m)}>{m.leido ? 'Marcar como no leído' : '✔ Marcar como leído'}</button>
              <button className="peligro" onClick={() => borrar(m._id)}>Eliminar</button>
            </div>
          </article>
        ))}
      </div>
    </>
  )
}
