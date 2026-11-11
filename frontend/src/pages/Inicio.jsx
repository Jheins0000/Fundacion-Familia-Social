import { useState } from 'react'
import Carrusel from '../components/Carrusel.jsx'
import CampanaCard from '../components/CampanaCard.jsx'
import CampanaModal from '../components/CampanaModal.jsx'
import useCampanas from '../services/useCampanas.js'
import { cifras, foto, formasDeAyudar, fotosCarrusel, preguntasFrecuentes } from '../data/fundacion.js'

export default function Inicio() {
  const { campanas } = useCampanas()
  const [seleccionada, setSeleccionada] = useState(null)

  // Solo mostramos las campañas que tienen una meta (las activas), máximo 3
  const destacadas = campanas.filter((c) => c.meta > 0).slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-icon">🌱</span>
              <span>Siembra tu huellita</span>
            </div>
            <h1>
              Construyendo <span>puentes de solidaridad</span> en cada comunidad
            </h1>
            <p>
              Desde 2017 acompañamos a niños, familias, jóvenes y adultos mayores de las comunidades
              rurales de Simiatug, en la provincia de Bolívar.
            </p>
            <div className="hero-actions">
              <a href="#/campanas" className="btn-primary">Ver campañas activas</a>
              <a href="#/contacto?tipo=voluntariado" className="btn-secondary">Quiero ser voluntario</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-frame">
              <img src={foto('portada.jpg')} alt="Voluntarios de Familia Social junto a niños y madres de una comunidad de Simiatug" />
            </div>
            <div className="hero-visual-badge">
              <span className="hero-visual-badge-number">16 de 39</span>
              <span className="hero-visual-badge-label">comunidades de Simiatug acompañadas</span>
            </div>
            <div className="hero-blob blob-1" aria-hidden="true"></div>
            <div className="hero-blob blob-2" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      {/* CIFRAS REALES */}
      <section className="impact-strip">
        <div className="container impact-grid">
          {cifras.map((c) => (
            <div className="impact-item" key={c.texto}>
              <div className="impact-circle"><span className="impact-number">{c.numero}</span></div>
              <span className="impact-label">{c.texto}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CARRUSEL */}
      <section className="carrusel-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Nuestro trabajo</span>
            <h2>Nuestra labor en la comunidad</h2>
            <p>Imágenes reales de nuestras jornadas en las comunidades de Simiatug.</p>
          </div>
          <Carrusel fotos={fotosCarrusel} />
        </div>
      </section>

      {/* QUIÉNES SOMOS (resumen) */}
      <section className="quienes-section">
        <div className="container quienes-grid">
          <div className="quienes-photo">
            <img src={foto('voluntaria-bebe.jpg')} alt="Voluntaria de la fundación sosteniendo a un bebé de la comunidad" loading="lazy" />
          </div>
          <div className="quienes-text">
            <span className="section-eyebrow">Nuestra identidad</span>
            <h2>Quiénes somos</h2>
            <p>
              Somos una iniciativa de compromiso humano y trabajo comunitario. Creemos que ayudar no es solo
              entregar recursos: también es escuchar, reconocer la realidad de cada persona y crear espacios
              donde encuentre apoyo y nuevas oportunidades.
            </p>
            <p className="quienes-tagline">Siembra tu huella con amor y compromiso social.</p>
            <a href="#/nosotros" className="btn-link">Conoce nuestra historia →</a>
          </div>
        </div>
      </section>

      {/* CÓMO AYUDAR */}
      <section className="ayudar-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Súmate</span>
            <h2>Cómo puedes ayudar</h2>
            <p>Cada aporte, grande o pequeño, se convierte en apoyo real para una familia.</p>
          </div>
          <div className="ayudar-grid">
            {formasDeAyudar.map((f) => (
              <div className="ayudar-card" key={f.titulo}>
                <div className="ayudar-icon">{f.icono}</div>
                <h3>{f.titulo}</h3>
                <p>{f.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPAÑAS DESTACADAS */}
      <section className="campanas-page-section destacadas">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">En curso</span>
            <h2>Campañas activas</h2>
          </div>
          <div className="campanas-grid-detailed">
            {destacadas.map((c) => (
              <CampanaCard key={c._id} campana={c} alVerDetalle={setSeleccionada} />
            ))}
          </div>
          <div className="centrado">
            <a href="#/campanas" className="btn-primary">Ver todas las campañas y programas</a>
          </div>
        </div>
      </section>

      {/* LA PROMESA */}
      <section className="promesa-section">
        <div className="container promesa">
          <div className="quote-icon">“</div>
          <blockquote>Mamá, yo voy a cumplir tus sueños. No te preocupes, yo te voy a apoyar.</blockquote>
          <p>La promesa con la que nació Familia Social en 2017.</p>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="faq-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Dudas comunes</span>
            <h2>Preguntas frecuentes</h2>
          </div>
          <div className="faq-list">
            {preguntasFrecuentes.map((p) => (
              <details className="faq-item" key={p.pregunta}>
                <summary className="faq-question">
                  {p.pregunta}
                  <span className="faq-icon">+</span>
                </summary>
                <div className="faq-answer"><p>{p.respuesta}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {seleccionada && <CampanaModal campana={seleccionada} alCerrar={() => setSeleccionada(null)} />}
    </>
  )
}
