import { useState } from 'react'

const enlaces = [
  { ruta: 'inicio', texto: 'Inicio' },
  { ruta: 'nosotros', texto: 'Quiénes Somos' },
  { ruta: 'campanas', texto: 'Campañas' },
]

export default function Navbar({ paginaActual }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const cerrar = () => setMenuAbierto(false)

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <a href="#/inicio" className="logo" onClick={cerrar}>
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Logo Fundación Familia Social" width="48" height="48" />
          <span className="logo-texto">Familia Social</span>
        </a>

        <nav className={`navbar-menu ${menuAbierto ? 'is-open' : ''}`}>
          <ul>
            {enlaces.map((enlace) => (
              <li key={enlace.ruta}>
                <a
                  href={`#/${enlace.ruta}`}
                  className={paginaActual === enlace.ruta ? 'active' : ''}
                  onClick={cerrar}
                >
                  {enlace.texto}
                </a>
              </li>
            ))}
            <li>
              <a href="#/contacto" className="btn-contacto" onClick={cerrar}>Contacto</a>
            </li>
          </ul>
        </nav>

        <button
          className={`nav-toggle ${menuAbierto ? 'is-open' : ''}`}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
