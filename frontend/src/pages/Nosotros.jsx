import { foto, fundacion, historia, valores } from '../data/fundacion.js'

const poblacion = [
  { icono: '🧒', titulo: 'Niños y niñas', texto: 'Jornadas recreativas y educativas, entrega de juguetes, ropa, útiles y alimentos.' },
  { icono: '🧑‍🎓', titulo: 'Adolescentes y jóvenes', texto: 'Liderazgo, autoestima, proyecto de vida e identidad cultural.' },
  { icono: '👨‍👩‍👧', titulo: 'Madres, padres y parejas', texto: 'Crianza respetuosa, comunicación y prevención de la violencia.' },
  { icono: '👵', titulo: 'Adultos mayores', texto: 'Autocuidado, bienestar emocional y transmisión de saberes.' },
]

export default function Nosotros() {
  return (
    <>
      <section className="campanas-hero">
        <div className="container">
          <h2>Quiénes somos</h2>
          <p>Una promesa familiar que se convirtió en compromiso con las comunidades.</p>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="ayudar-section">
        <div className="container mision-grid">
          <div className="mision-card">
            <span className="ayudar-icon">🎯</span>
            <h3>Misión</h3>
            <p>{fundacion.mision}</p>
          </div>
          <div className="mision-card">
            <span className="ayudar-icon">🔭</span>
            <h3>Visión</h3>
            <p>{fundacion.vision}</p>
          </div>
        </div>
      </section>

      {/* HISTORIA */}
      <section className="carrusel-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Desde 2017</span>
            <h2>Nuestra historia</h2>
          </div>
          <ol className="linea-tiempo">
            {historia.map((h) => (
              <li key={h.anio}>
                <span className="linea-anio">{h.anio}</span>
                <div>
                  <h3>{h.titulo}</h3>
                  <p>{h.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DÓNDE TRABAJAMOS */}
      <section className="quienes-section">
        <div className="container quienes-grid">
          <div className="quienes-photo">
            <img src={foto('simiatug.jpg')} alt="Paisaje de una comunidad rural de Simiatug" loading="lazy" />
          </div>
          <div className="quienes-text">
            <span className="section-eyebrow">Cobertura territorial</span>
            <h2>Simiatug, Bolívar</h2>
            <p>
              Trabajamos principalmente en la parroquia Simiatug, cantón Guaranda, formada por 39 comunidades
              rurales con su propia cultura e historia. Hasta hoy hemos llegado a 16 de ellas con visitas,
              actividades solidarias y jornadas recreativas.
            </p>
            <p>
              Nuestra meta no es solo llegar a las 39 comunidades, sino construir relaciones de confianza que
              permitan acciones sostenibles.
            </p>
          </div>
        </div>
      </section>

      {/* A QUIÉN AYUDAMOS */}
      <section className="ayudar-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Población beneficiaria</span>
            <h2>A quién acompañamos</h2>
          </div>
          <div className="ayudar-grid">
            {poblacion.map((p) => (
              <div className="ayudar-card" key={p.titulo}>
                <div className="ayudar-icon">{p.icono}</div>
                <h3>{p.titulo}</h3>
                <p>{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="carrusel-section">
        <div className="container">
          <div className="section-title">
            <span className="section-eyebrow">Lo que nos mueve</span>
            <h2>Nuestros valores</h2>
          </div>
          <ul className="valores">
            {valores.map((v) => <li key={v}>{v}</li>)}
          </ul>
        </div>
      </section>
    </>
  )
}
