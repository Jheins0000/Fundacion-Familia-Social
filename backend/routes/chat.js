import { Router } from 'express'
import Campana from '../models/Campana.js'
import { instrucciones } from '../data/conocimiento.js'

const router = Router()

// ------------------------------------------------------------------
// POST /api/chat  → recibe { pregunta, historial } y devuelve { respuesta }
// 1) Si hay GEMINI_API_KEY, pregunta a la IA de Google (Gemini).
// 2) Si no hay clave o la IA falla, usa respuestas programadas.
// La clave vive solo en el backend: nunca se publica en GitHub Pages.
// ------------------------------------------------------------------
router.post('/', async (req, res) => {
  const pregunta = String(req.body.pregunta || '').trim().slice(0, 500)
  if (!pregunta) return res.status(400).json({ mensaje: 'Escribe una pregunta' })

  if (process.env.GEMINI_API_KEY) {
    try {
      const respuesta = await preguntarAGemini(pregunta, req.body.historial)
      return res.json({ respuesta, fuente: 'ia' })
    } catch (error) {
      console.error('Error con Gemini:', error.message)
    }
  }

  res.json({ respuesta: respuestaProgramada(pregunta), fuente: 'programada' })
})

// ---------------- IA: Google Gemini ----------------
async function preguntarAGemini(pregunta, historial) {
  // Agregamos las campañas actuales para que la IA las conozca
  const campanas = await Campana.find()
  const listaCampanas = campanas
    .map((c) => `- ${c.titulo} (${c.subtitulo}): ${c.descripcion} Se necesita: ${c.necesita}.`)
    .join('\n')

  // Convertimos el historial del chat al formato que pide Gemini
  let mensajes = Array.isArray(historial) ? historial.slice(-6) : []
  mensajes = mensajes
    .filter((m) => m && typeof m.texto === 'string')
    .map((m) => ({
      role: m.autor === 'usuario' ? 'user' : 'model',
      parts: [{ text: m.texto.slice(0, 500) }],
    }))
  // La conversación debe empezar con un mensaje del usuario
  while (mensajes.length && mensajes[0].role !== 'user') mensajes.shift()
  if (!mensajes.length) mensajes = [{ role: 'user', parts: [{ text: pregunta }] }]

  const modelo = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelo}:generateContent`

  const respuesta = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': process.env.GEMINI_API_KEY,
    },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: `${instrucciones}\nCAMPAÑAS ACTUALES:\n${listaCampanas}` }],
      },
      contents: mensajes,
      generationConfig: { temperature: 0.4, maxOutputTokens: 1000 },
    }),
    signal: AbortSignal.timeout(15000), // si tarda más de 15 s, se cancela
  })

  if (!respuesta.ok) throw new Error(`Gemini respondió ${respuesta.status}`)

  const datos = await respuesta.json()
  const texto = datos.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim()
  if (!texto) throw new Error('Gemini no devolvió texto')
  return texto
}

// ---------------- Respuestas programadas (plan B) ----------------
// Quita tildes y pasa a minúsculas para comparar más fácil
const normalizar = (texto) => texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

const reglas = [
  {
    palabras: ['violencia', 'me pegan', 'maltrato', 'emergencia', 'peligro', 'abuso'],
    respuesta: 'Lamento mucho lo que estás viviendo. 💛 Si estás en peligro, llama ahora al ECU 911. También puedes escribirnos por WhatsApp al 0990975590 y te orientamos sobre las rutas de atención.',
  },
  {
    palabras: ['apadrin', 'empresa', 'institucion', 'universidad', 'padrino', 'alianza'],
    respuesta: 'Con nuestro modelo de apadrinamiento, una empresa, institución o persona puede apadrinar una comunidad o actividad. 🤝 Nosotros identificamos las necesidades y organizamos la logística; el padrino aporta los recursos acordados. Escríbenos desde el formulario de Contacto.',
  },
  {
    palabras: ['voluntari', 'ayudar', 'participar', 'sumarme', 'unirme'],
    respuesta: '¡Qué alegría que quieras sumarte! 🙌 No necesitas experiencia: antes de cada jornada damos orientación y capacitación. Llena el formulario de Contacto eligiendo "Quiero ser voluntario" o escríbenos al 0990975590.',
  },
  {
    palabras: ['donde', 'ubic', 'simiatug', 'bolivar', 'guaranda', 'trabajan', 'lugar'],
    respuesta: 'Trabajamos en la parroquia Simiatug (cantón Guaranda, provincia de Bolívar), que tiene 39 comunidades rurales. Hasta hoy hemos llegado a 16 de ellas. Nuestra oficina está en Av. Bellavista Alto y Las Moras, Ambato.',
  },
  {
    palabras: ['dona', 'viveres', 'ropa', 'juguete', 'alimento', 'comida', 'aportar', 'regalar'],
    respuesta: 'Puedes donar alimentos no perecibles, ropa, calzado, juguetes, útiles escolares y artículos de primera necesidad. 🎒 Coordina la entrega por WhatsApp al 0990975590 o desde el formulario de Contacto. Revisa la sección Campañas para ver qué se necesita ahora.',
  },
  {
    palabras: ['historia', 'empez', 'inicio', 'nacio', 'origen', 'comenzo', 'cuando'],
    respuesta: 'Familia Social nació el 1 de junio de 2017 con una promesa: una hija le dijo a su madre "yo voy a cumplir tus sueños", y su sueño era ayudar a quienes más lo necesitan. 🌱 La primera actividad fue en la comunidad de Cascarillas, en Simiatug.',
  },
  {
    palabras: ['salud mental', 'taller', 'emocion', 'jovenes', 'adolescente', 'programa'],
    respuesta: 'Tenemos programas de salud mental comunitaria, prevención de la violencia, fortalecimiento familiar, liderazgo juvenil, identidad cultural y envejecimiento saludable. Puedes verlos en la sección Campañas.',
  },
  {
    palabras: ['contact', 'telefono', 'whatsapp', 'correo', 'llamar', 'numero'],
    respuesta: 'Escríbenos por WhatsApp: Ambato 0990975590 (Adriana Guamán), Guaranda 0982500991 (Judith Hurtado) o Quito 0993520893 (Carmen Delgado). Correo: familiasocial450@gmail.com',
  },
  {
    palabras: ['mision', 'que hacen', 'quienes son', 'fundacion'],
    respuesta: 'Somos una fundación que acompaña a niños, jóvenes, familias y adultos mayores de comunidades rurales. Trabajamos en salud mental, prevención de la violencia, ayuda humanitaria e identidad cultural, con el apoyo de voluntarios y aliados.',
  },
  {
    palabras: ['hola', 'buenas', 'buenos dias', 'saludos'],
    respuesta: '¡Hola! 😊 Puedo contarte cómo donar, cómo ser voluntario, dónde trabajamos o cómo nació la fundación. ¿Qué te gustaría saber?',
  },
  {
    palabras: ['gracias'],
    respuesta: '¡Gracias a ti por interesarte! 💛 Juntos sembramos huellitas de solidaridad.',
  },
]

function respuestaProgramada(pregunta) {
  const texto = normalizar(pregunta)
  // Elegimos la regla que tenga más palabras clave dentro de la pregunta
  let regla = null
  let mejorPuntaje = 0
  for (const r of reglas) {
    const puntaje = r.palabras.filter((p) => texto.includes(p)).length
    if (puntaje > mejorPuntaje) {
      regla = r
      mejorPuntaje = puntaje
    }
  }
  return regla
    ? regla.respuesta
    : 'No tengo esa información, pero el equipo te puede ayudar. 😊 Escríbenos por WhatsApp al 0990975590 o desde el formulario de Contacto.'
}

export { respuestaProgramada }
export default router
