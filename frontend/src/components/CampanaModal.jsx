import { useEffect } from 'react'
import { foto } from '../data/fundacion.js'
import BarraProgreso from './BarraProgreso.jsx'

// Ventana con el detalle completo de una campaña
export default function CampanaModal({ campana, alCerrar }) {
  // Cerrar con la tecla Escape
  useEffect(() => {
    const alPresionar = (e) => e.key === 'Escape' && alCerrar()
    window.addEventListener('keydown', alPresionar)
    return () => window.removeEventListener('keydown', alPresionar)
  }, [alCerrar])

  return (
    <div className="modal-fondo" onClick={alCerrar}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <button className="modal-cerrar" onClick={alCerrar} aria-label="Cerrar">×</button>
        <img className="modal-img" src={foto(campana.imagen)} alt={campana.titulo} />
        <div className="modal-cuerpo">
          <h3>{campana.titulo}</h3>
          <p className="campana-sub">{campana.subtitulo}</p>
          <p>{campana.detalle}</p>
          <p className="campana-info-extra">🔎 Se busca: {campana.necesita}</p>
          <BarraProgreso avance={campana.avance} meta={campana.meta} unidad={campana.unidad} />
          <a
            className="btn-campana"
            href={`#/contacto?campana=${encodeURIComponent(campana.titulo)}`}
            onClick={alCerrar}
          >
            Quiero participar
          </a>
        </div>
      </div>
    </div>
  )
}
