import { useEffect, useState } from 'react'
import { actualizarCampana, crearCampana, eliminarCampana, obtenerCampanas } from '../services/api.js'
import { categorias } from '../data/campanas.js'
import { foto } from '../data/fundacion.js'

// Fotos disponibles en la carpeta public/fotos
const fotosDisponibles = [
  'nina-pinata.jpg', 'nino-pinata.jpg', 'adultos-mayores.jpg', 'adultos-mayores-2.jpg', 'abuelito.jpg',
  'entrega-viveres.jpg', 'juguetes.jpg', 'regalos.jpg', 'taller.jpg', 'dinamica.jpg', 'danza.jpg',
  'bailoterapia.jpg', 'actividad-recreativa.jpg', 'evento-comunidad.jpg', 'juegos.jpg', 'ninos-entrega.jpg',
  'ninos-comunidad.jpg', 'jornada-comunidad.jpg', 'comunidad-reunida.jpg', 'encuentro.jpg', 'simiatug.jpg',
]

const campanaVacia = {
  titulo: '', subtitulo: '', categoria: 'comunidad', imagen: 'evento-comunidad.jpg',
  descripcion: '', detalle: '', necesita: '', avance: 0, meta: 0, unidad: '',
}

export default function PanelCampanas() {
  const [campanas, setCampanas] = useState([])
  const [editando, setEditando] = useState(null) // null = sin formulario abierto
  const [error, setError] = useState('')

  useEffect(() => {
    obtenerCampanas().then(setCampanas).catch((err) => setError(err.message))
  }, [])

  async function guardar(e) {
    e.preventDefault()
    setError('')
    try {
      const datos = { ...editando, avance: Number(editando.avance), meta: Number(editando.meta) }
      if (editando._id) {
        const actualizada = await actualizarCampana(editando._id, datos)
        setCampanas(campanas.map((c) => (c._id === actualizada._id ? actualizada : c)))
      } else {
        const nueva = await crearCampana(datos)
        setCampanas([...campanas, nueva])
      }
      setEditando(null)
    } catch (err) {
      setError(err.message)
    }
  }

  async function borrar(c) {
    if (!window.confirm(`¿Eliminar la campaña "${c.titulo}"?`)) return
    await eliminarCampana(c._id)
    setCampanas(campanas.filter((x) => x._id !== c._id))
  }

  const cambiar = (e) => setEditando({ ...editando, [e.target.name]: e.target.value })

  return (
    <>
      {error && <div className="alerta error">⚠️ {error}</div>}

      {!editando && (
        <button className="btn-campana auto" onClick={() => setEditando(campanaVacia)}>+ Nueva campaña</button>
      )}

      {editando && (
        <form className="formulario admin-form" onSubmit={guardar}>
          <h3>{editando._id ? 'Editar campaña' : 'Nueva campaña'}</h3>
          <div className="fila">
            <label>Título *<input name="titulo" value={editando.titulo} onChange={cambiar} required /></label>
            <label>Subtítulo<input name="subtitulo" value={editando.subtitulo} onChange={cambiar} /></label>
          </div>
          <div className="fila">
            <label>
              Categoría
              <select name="categoria" value={editando.categoria} onChange={cambiar}>
                {categorias.filter((c) => c.id !== 'todas').map((c) => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </label>
            <label>
              Foto
              <select name="imagen" value={editando.imagen} onChange={cambiar}>
                {fotosDisponibles.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </label>
          </div>
          <img className="admin-preview" src={foto(editando.imagen)} alt="Vista previa" />
          <label>Descripción corta *<input name="descripcion" value={editando.descripcion} onChange={cambiar} required /></label>
          <label>Detalle<textarea name="detalle" rows="3" value={editando.detalle} onChange={cambiar} /></label>
          <label>¿Qué se necesita?<input name="necesita" value={editando.necesita} onChange={cambiar} /></label>
          <div className="fila tres">
            <label>Avance<input name="avance" type="number" min="0" value={editando.avance} onChange={cambiar} /></label>
            <label>Meta (0 = permanente)<input name="meta" type="number" min="0" value={editando.meta} onChange={cambiar} /></label>
            <label>Unidad<input name="unidad" value={editando.unidad} onChange={cambiar} placeholder="canastas, %, …" /></label>
          </div>
          <div className="mensaje-acciones">
            <button type="submit" className="btn-campana auto">Guardar</button>
            <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
          </div>
        </form>
      )}

      <div className="tabla-scroll">
        <table className="tabla-admin">
          <thead>
            <tr><th>Campaña</th><th>Categoría</th><th>Avance</th><th></th></tr>
          </thead>
          <tbody>
            {campanas.map((c) => (
              <tr key={c._id}>
                <td><strong>{c.titulo}</strong><br /><small>{c.subtitulo}</small></td>
                <td>{categorias.find((x) => x.id === c.categoria)?.nombre || c.categoria}</td>
                <td>{c.meta ? `${c.avance} / ${c.meta} ${c.unidad}` : 'Permanente'}</td>
                <td className="mensaje-acciones">
                  <button onClick={() => setEditando(c)}>Editar</button>
                  <button className="peligro" onClick={() => borrar(c)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
