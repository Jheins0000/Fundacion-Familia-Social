import { useState } from 'react'
import CampanaCard from '../components/CampanaCard.jsx'
import CampanaModal from '../components/CampanaModal.jsx'
import useCampanas from '../services/useCampanas.js'
import { categorias } from '../data/campanas.js'

export default function Campanas() {
  const { campanas, cargando } = useCampanas()
  const [filtro, setFiltro] = useState('todas')
  const [busqueda, setBusqueda] = useState('')
  const [seleccionada, setSeleccionada] = useState(null)

  // Filtramos por categoría y por el texto escrito en el buscador
  const visibles = campanas
    .filter((c) => filtro === 'todas' || c.categoria === filtro)
    .filter((c) =>
      `${c.titulo} ${c.descripcion} ${c.necesita}`.toLowerCase().includes(busqueda.toLowerCase())
    )

  return (
    <>
      <section className="campanas-hero">
        <div className="container">
          <h2>Campañas y programas</h2>
          <p>Suma tu granito de arena participando en nuestras iniciativas comunitarias.</p>
        </div>
      </section>

      <section className="campanas-page-section">
        <div className="container">
          <input
            className="buscador"
            type="search"
            placeholder="🔍 Buscar: víveres, voluntarios, niños…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <div className="filtro-tabs">
            {categorias.map((cat) => (
              <button
                key={cat.id}
                className={`filtro-btn ${filtro === cat.id ? 'active' : ''}`}
                onClick={() => setFiltro(cat.id)}
              >
                {cat.nombre}
              </button>
            ))}
          </div>

          {cargando && <p className="aviso">Actualizando campañas…</p>}

          <div className="campanas-grid-detailed">
            {visibles.map((c) => (
              <CampanaCard key={c._id} campana={c} alVerDetalle={setSeleccionada} />
            ))}
          </div>

          {visibles.length === 0 && (
            <p className="aviso">No encontramos campañas con ese filtro. Prueba con otra búsqueda.</p>
          )}
        </div>
      </section>

      {seleccionada && <CampanaModal campana={seleccionada} alCerrar={() => setSeleccionada(null)} />}
    </>
  )
}
