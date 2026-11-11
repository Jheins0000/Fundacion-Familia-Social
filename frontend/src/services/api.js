// Todas las llamadas al backend (Express) están en este archivo.
// La dirección del backend se configura en el archivo .env (VITE_API_URL).

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Función base: hace la petición y convierte la respuesta a JSON
async function peticion(ruta, opciones = {}) {
  const token = localStorage.getItem('token')
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    ...opciones,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...opciones.headers,
    },
  })

  const datos = await respuesta.json().catch(() => ({}))

  // 401 = el token no existe o ya expiró: cerramos la sesión del admin
  if (respuesta.status === 401 && token) {
    localStorage.removeItem('token')
    window.dispatchEvent(new Event('sesion-expirada'))
  }

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || 'Ocurrió un error en el servidor')
  }
  return datos
}

// ---------- Público ----------
export const obtenerCampanas = () => peticion('/api/campanas')

export const enviarMensaje = (mensaje) =>
  peticion('/api/mensajes', { method: 'POST', body: JSON.stringify(mensaje) })

export const preguntarAlChatbot = (pregunta, historial) =>
  peticion('/api/chat', { method: 'POST', body: JSON.stringify({ pregunta, historial }) })

// Despierta el servidor de Render (el plan gratis se "duerme" si nadie lo usa)
export const despertarServidor = () => fetch(`${API_URL}/api/salud`).catch(() => {})

// ---------- Admin (necesitan token) ----------
export const iniciarSesion = (usuario, clave) =>
  peticion('/api/auth/login', { method: 'POST', body: JSON.stringify({ usuario, clave }) })

export const obtenerMensajes = () => peticion('/api/mensajes')

export const marcarMensaje = (id, leido) =>
  peticion(`/api/mensajes/${id}`, { method: 'PUT', body: JSON.stringify({ leido }) })

export const eliminarMensaje = (id) => peticion(`/api/mensajes/${id}`, { method: 'DELETE' })

export const crearCampana = (campana) =>
  peticion('/api/campanas', { method: 'POST', body: JSON.stringify(campana) })

export const actualizarCampana = (id, campana) =>
  peticion(`/api/campanas/${id}`, { method: 'PUT', body: JSON.stringify(campana) })

export const eliminarCampana = (id) => peticion(`/api/campanas/${id}`, { method: 'DELETE' })
