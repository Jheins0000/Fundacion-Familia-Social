import { useState } from 'react'
import { enviarMensaje } from '../services/api.js'
import { contactos, foto, fundacion } from '../data/fundacion.js'

const tipos = [
  { id: 'voluntariado', texto: 'Quiero ser voluntario' },
  { id: 'donacion', texto: 'Quiero donar' },
  { id: 'apadrinamiento', texto: 'Apadrinar una comunidad' },
  { id: 'otro', texto: 'Otra consulta' },
]

export default function Contacto({ campanaElegida = '', tipoElegido = '' }) {
  const formularioVacio = {
    nombre: '',
    correo: '',
    telefono: '',
    tipo: tipoElegido || (campanaElegida ? 'donacion' : 'voluntariado'),
    campana: campanaElegida,
    mensaje: '',
  }

  const [form, setForm] = useState(formularioVacio)
  const [estado, setEstado] = useState('') // '', 'enviando', 'ok', 'error'
  const [error, setError] = useState('')

  // Un solo manejador para todos los campos, usando el atributo "name"
  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  function validar() {
    if (form.nombre.trim().length < 3) return 'Escribe tu nombre completo.'
    if (!/^\S+@\S+\.\S+$/.test(form.correo)) return 'Escribe un correo válido.'
    if (form.telefono && !/^[0-9+\s]{7,15}$/.test(form.telefono)) return 'El teléfono solo puede tener números.'
    if (form.mensaje.trim().length < 10) return 'Cuéntanos un poco más en tu mensaje (mínimo 10 letras).'
    return ''
  }

  async function enviar(e) {
    e.preventDefault()
    const problema = validar()
    if (problema) {
      setError(problema)
      return
    }
    setError('')
    setEstado('enviando')
    try {
      await enviarMensaje(form)
      setEstado('ok')
      setForm({ ...formularioVacio, campana: '' })
    } catch (err) {
      setEstado('error')
      setError(err.message === 'Failed to fetch'
        ? 'No pudimos conectar con el servidor. Inténtalo en un minuto o escríbenos por WhatsApp.'
        : err.message)
    }
  }

  return (
    <>
      <section className="campanas-hero">
        <div className="container">
          <h2>Contáctanos</h2>
          <p>Déjanos tu mensaje y el equipo de la fundación se comunicará contigo.</p>
        </div>
      </section>

      <section className="campanas-page-section">
        <div className="container contacto-grid">
          <form className="formulario" onSubmit={enviar} noValidate>
            {estado === 'ok' && (
              <div className="alerta ok">✅ ¡Gracias! Recibimos tu mensaje y te contactaremos pronto.</div>
            )}
            {error && <div className="alerta error">⚠️ {error}</div>}

            <label>
              Nombre completo *
              <input name="nombre" value={form.nombre} onChange={cambiar} placeholder="Ej. María Chimbo" />
            </label>

            <div className="fila">
              <label>
                Correo electrónico *
                <input name="correo" type="email" value={form.correo} onChange={cambiar} placeholder="tucorreo@gmail.com" />
              </label>
              <label>
                Teléfono / WhatsApp
                <input name="telefono" value={form.telefono} onChange={cambiar} placeholder="0991234567" />
              </label>
            </div>

            <fieldset>
              <legend>¿Cómo quieres participar? *</legend>
              <div className="opciones">
                {tipos.map((t) => (
                  <label key={t.id} className={`opcion ${form.tipo === t.id ? 'activa' : ''}`}>
                    <input type="radio" name="tipo" value={t.id} checked={form.tipo === t.id} onChange={cambiar} />
                    {t.texto}
                  </label>
                ))}
              </div>
            </fieldset>

            {form.campana && (
              <label>
                Campaña de interés
                <input name="campana" value={form.campana} onChange={cambiar} />
              </label>
            )}

            <label>
              Mensaje *
              <textarea name="mensaje" rows="5" value={form.mensaje} onChange={cambiar} placeholder="Cuéntanos cómo te gustaría ayudar…" />
            </label>

            <button className="btn-campana" type="submit" disabled={estado === 'enviando'}>
              {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
            </button>
          </form>

          <aside className="contacto-info">
            <img src={foto('mujeres-comunidad.jpg')} alt="Mujeres de una comunidad de Simiatug" loading="lazy" />
            <h3>Otras formas de contactarnos</h3>
            <p>📍 {fundacion.direccion}</p>
            <p>✉️ <a href={`mailto:${fundacion.correo}`}>{fundacion.correo}</a></p>
            {contactos.map((c) => (
              <p key={c.ciudad}>
                💬 {c.ciudad}: <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener">{c.telefono}</a> ({c.nombre})
              </p>
            ))}
          </aside>
        </div>
      </section>
    </>
  )
}
