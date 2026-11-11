// Muestra el avance de una campaña. Si no tiene meta (programa permanente), no muestra nada.
export default function BarraProgreso({ avance, meta, unidad }) {
  if (!meta) return <div className="campana-progress"><span className="programa-permanente">Programa permanente</span></div>

  const porcentaje = Math.min(100, Math.round((avance / meta) * 100))
  const textoAvance = unidad === '%' ? `${avance}% del objetivo` : `${avance} ${unidad}`

  return (
    <div className="campana-progress">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${porcentaje}%` }}></div>
      </div>
      <div className="progress-label">
        <span>{textoAvance}</span>
        <span>{unidad === '%' ? 'Meta: 100%' : `Meta: ${meta}`}</span>
      </div>
    </div>
  )
}
