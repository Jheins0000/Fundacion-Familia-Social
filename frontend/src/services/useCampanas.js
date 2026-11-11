import { useEffect, useState } from 'react'
import { obtenerCampanas } from './api.js'
import { campanasRespaldo } from '../data/campanas.js'

// Hook personalizado: trae las campañas desde el backend.
// Mientras tanto (o si el backend falla) muestra las campañas de respaldo.
export default function useCampanas() {
  const [campanas, setCampanas] = useState(campanasRespaldo)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerCampanas()
      .then((datos) => {
        if (datos.length > 0) setCampanas(datos)
      })
      .catch(() => console.log('Backend no disponible: se muestran campañas de respaldo'))
      .finally(() => setCargando(false))
  }, [])

  return { campanas, cargando }
}
