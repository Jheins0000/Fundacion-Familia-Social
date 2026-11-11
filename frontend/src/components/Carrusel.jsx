import { foto } from '../data/fundacion.js'

// Carrusel infinito hecho con CSS. Las fotos se repiten dos veces
// para que la animación no tenga un "salto" al volver a empezar.
export default function Carrusel({ fotos }) {
  const fotosDobles = [...fotos, ...fotos]

  return (
    <div className="carrusel-wrap">
      <div className="carrusel-track">
        {fotosDobles.map((f, i) => (
          <div className="carrusel-slide" key={i} aria-hidden={i >= fotos.length}>
            <img src={foto(f.archivo)} alt={i < fotos.length ? f.texto : ''} loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  )
}
