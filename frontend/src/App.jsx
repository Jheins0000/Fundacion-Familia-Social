import { useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Chatbot from './components/Chatbot.jsx'
import Inicio from './pages/Inicio.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Campanas from './pages/Campanas.jsx'
import Contacto from './pages/Contacto.jsx'
import Admin from './pages/Admin.jsx'
import { despertarServidor } from './services/api.js'

// Lee la página actual desde la URL. Ejemplo: "#/contacto?campana=Risas"
// Usamos "#" porque GitHub Pages solo sirve archivos estáticos:
// así, al recargar la página, nunca aparece un error 404.
function leerRuta() {
  const [pagina, consulta] = window.location.hash.replace('#/', '').split('?')
  return { pagina: pagina || 'inicio', params: new URLSearchParams(consulta || '') }
}

export default function App() {
  const [ruta, setRuta] = useState(leerRuta())

  useEffect(() => {
    despertarServidor()
    const alCambiar = () => {
      setRuta(leerRuta())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', alCambiar)
    return () => window.removeEventListener('hashchange', alCambiar)
  }, [])

  const paginas = {
    inicio: <Inicio />,
    nosotros: <Nosotros />,
    campanas: <Campanas />,
    contacto: (
      <Contacto
        // "key" hace que el formulario se reinicie si cambia la campaña elegida
        key={window.location.hash}
        campanaElegida={ruta.params.get('campana') || ''}
        tipoElegido={ruta.params.get('tipo') || ''}
      />
    ),
    admin: <Admin />,
  }

  return (
    <>
      <Navbar paginaActual={ruta.pagina} />
      <main>{paginas[ruta.pagina] || <Inicio />}</main>
      <Footer />
      {ruta.pagina !== 'admin' && <Chatbot />}
    </>
  )
}
