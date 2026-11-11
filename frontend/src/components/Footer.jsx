import { contactos, fundacion } from '../data/fundacion.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col">
          <h3>{fundacion.nombre}</h3>
          <p>La solidaridad nos une. El compromiso nos mueve. La comunidad nos inspira.</p>
          <p>📍 {fundacion.direccion}</p>
          <p>✉️ <a href={`mailto:${fundacion.correo}`}>{fundacion.correo}</a></p>
        </div>
        <div className="footer-col">
          <h3>Contactos oficiales</h3>
          {contactos.map((c) => (
            <p key={c.ciudad}>
              📍 {c.ciudad}:{' '}
              <a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener">{c.telefono}</a>{' '}
              ({c.nombre})
            </p>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {fundacion.nombre}. Todos los derechos reservados. ·{' '}
          <a href="#/admin">Administración</a>
        </p>
      </div>
    </footer>
  )
}
