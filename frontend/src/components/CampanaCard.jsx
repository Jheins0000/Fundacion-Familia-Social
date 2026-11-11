import { foto } from '../data/fundacion.js'
import { categorias } from '../data/campanas.js'
import BarraProgreso from './BarraProgreso.jsx'

export default function CampanaCard({ campana, alVerDetalle }) {
  const categoria = categorias.find((c) => c.id === campana.categoria)

  return (
    <article className="campana-detail-card">
      <img className="campana-img" src={foto(campana.imagen)} alt={campana.titulo} loading="lazy" />
      <div className="campana-body">
        <span className="campana-tag">{categoria ? categoria.nombre : campana.categoria}</span>
        <h3>{campana.titulo}</h3>
        <p className="campana-sub">{campana.subtitulo}</p>
        <p className="campana-desc">{campana.descripcion}</p>
        <p className="campana-info-extra">🔎 Se busca: {campana.necesita}</p>
        <BarraProgreso avance={campana.avance} meta={campana.meta} unidad={campana.unidad} />
        <button className="btn-campana" onClick={() => alVerDetalle(campana)}>
          Ver detalles
        </button>
      </div>
    </article>
  )
}
