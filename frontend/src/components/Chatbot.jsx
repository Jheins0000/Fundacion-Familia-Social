import { useEffect, useRef, useState } from 'react'
import { preguntarAlChatbot } from '../services/api.js'
import { fundacion } from '../data/fundacion.js'

const sugerencias = [
  '¿Cómo puedo ser voluntario?',
  '¿Qué puedo donar?',
  '¿Dónde trabajan?',
  '¿Cómo empezó la fundación?',
]

const saludo = {
  autor: 'bot',
  texto: '¡Hola! 🌱 Soy Huellita, el asistente virtual de Familia Social. Pregúntame cómo donar, ser voluntario o conocer nuestros programas.',
}

export default function Chatbot() {
  const [abierto, setAbierto] = useState(false)
  const [mensajes, setMensajes] = useState([saludo])
  const [texto, setTexto] = useState('')
  const [cargando, setCargando] = useState(false)
  const finRef = useRef(null)

  // Baja automáticamente al último mensaje
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, abierto])

  async function enviar(pregunta) {
    if (!pregunta.trim() || cargando) return

    const nuevos = [...mensajes, { autor: 'usuario', texto: pregunta }]
    setMensajes(nuevos)
    setTexto('')
    setCargando(true)

    try {
      // Enviamos los últimos mensajes para que la IA recuerde la conversación
      const historial = nuevos.slice(-6)
      const datos = await preguntarAlChatbot(pregunta, historial)
      setMensajes([...nuevos, { autor: 'bot', texto: datos.respuesta }])
    } catch {
      setMensajes([
        ...nuevos,
        { autor: 'bot', texto: 'Ahora no puedo conectarme 😔. Escríbenos por WhatsApp al 099 097 5590 y con gusto te ayudamos.' },
      ])
    } finally {
      setCargando(false)
    }
  }

  return (
    <>
      <a
        href={`https://wa.me/${fundacion.whatsapp}`}
        className="whatsapp-float"
        target="_blank"
        rel="noopener"
        aria-label="Escríbenos por WhatsApp"
      >
        📞
      </a>

      <button className="chat-boton" onClick={() => setAbierto(!abierto)} aria-label="Abrir asistente virtual">
        {abierto ? '×' : '💬'}
      </button>

      {abierto && (
        <section className="chat-ventana" aria-label="Asistente virtual">
          <header className="chat-cabecera">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" />
            <div>
              <strong>Huellita</strong>
              <span>Asistente con IA · Familia Social</span>
            </div>
          </header>

          <div className="chat-mensajes">
            {mensajes.map((m, i) => (
              <p key={i} className={`chat-burbuja ${m.autor}`}>{m.texto}</p>
            ))}
            {cargando && <p className="chat-burbuja bot escribiendo">Escribiendo…</p>}
            {mensajes.length === 1 && (
              <div className="chat-sugerencias">
                {sugerencias.map((s) => (
                  <button key={s} onClick={() => enviar(s)}>{s}</button>
                ))}
              </div>
            )}
            <div ref={finRef}></div>
          </div>

          <form
            className="chat-form"
            onSubmit={(e) => {
              e.preventDefault()
              enviar(texto)
            }}
          >
            <input
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Escribe tu pregunta…"
              maxLength={300}
            />
            <button type="submit" disabled={cargando}>Enviar</button>
          </form>
        </section>
      )}
    </>
  )
}
