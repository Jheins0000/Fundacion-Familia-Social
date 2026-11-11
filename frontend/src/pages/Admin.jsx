import { useEffect, useState } from 'react'
import { iniciarSesion } from '../services/api.js'
import PanelMensajes from '../components/PanelMensajes.jsx'
import PanelCampanas from '../components/PanelCampanas.jsx'

export default function Admin() {
  const [logueado, setLogueado] = useState(Boolean(localStorage.getItem('token')))
  const [pestana, setPestana] = useState('mensajes')

  // Si el backend dice que el token expiró, volvemos al login
  useEffect(() => {
    const salir = () => setLogueado(false)
    window.addEventListener('sesion-expirada', salir)
    return () => window.removeEventListener('sesion-expirada', salir)
  }, [])

  function cerrarSesion() {
    localStorage.removeItem('token')
    setLogueado(false)
  }

  if (!logueado) return <Login alEntrar={() => setLogueado(true)} />

  return (
    <section className="campanas-page-section admin">
      <div className="container">
        <div className="admin-cabecera">
          <h2>Panel de administración</h2>
          <button className="btn-secundario-oscuro" onClick={cerrarSesion}>Cerrar sesión</button>
        </div>

        <div className="filtro-tabs izquierda">
          <button className={`filtro-btn ${pestana === 'mensajes' ? 'active' : ''}`} onClick={() => setPestana('mensajes')}>
            📩 Mensajes recibidos
          </button>
          <button className={`filtro-btn ${pestana === 'campanas' ? 'active' : ''}`} onClick={() => setPestana('campanas')}>
            📋 Campañas
          </button>
        </div>

        {pestana === 'mensajes' ? <PanelMensajes /> : <PanelCampanas />}
      </div>
    </section>
  )
}

function Login({ alEntrar }) {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)

  async function entrar(e) {
    e.preventDefault()
    setCargando(true)
    setError('')
    try {
      const datos = await iniciarSesion(usuario, clave)
      localStorage.setItem('token', datos.token)
      alEntrar()
    } catch (err) {
      setError(err.message === 'Failed to fetch' ? 'No se pudo conectar con el servidor.' : err.message)
    } finally {
      setCargando(false)
    }
  }

  return (
    <section className="campanas-page-section login">
      <form className="formulario login-caja" onSubmit={entrar}>
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="login-logo" />
        <h2>Acceso administrativo</h2>
        <p>Solo para el equipo de Fundación Familia Social.</p>
        {error && <div className="alerta error">⚠️ {error}</div>}
        <label>
          Usuario
          <input value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" required />
        </label>
        <label>
          Contraseña
          <input type="password" value={clave} onChange={(e) => setClave(e.target.value)} autoComplete="current-password" required />
        </label>
        <button className="btn-campana" type="submit" disabled={cargando}>
          {cargando ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </section>
  )
}
