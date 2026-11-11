// Campañas iniciales de la fundación.
// - Al arrancar el servidor, si la base de datos está vacía, se cargan solas.
// - Con "npm run seed" se BORRAN las campañas y se vuelven a cargar desde cero.
import 'dotenv/config'
import mongoose from 'mongoose'
import { pathToFileURL } from 'node:url'
import Campana from '../models/Campana.js'

export const campanasIniciales = [
  {
    titulo: 'Risas de Verano',
    subtitulo: 'Campaña por el Día del Niño',
    categoria: 'ninos',
    imagen: 'nina-pinata.jpg',
    descripcion: 'Regalamos alegría y diversión a los niños de las comunidades Pímbalo y Cascarillas.',
    detalle: 'Jornadas recreativas con juegos, cometas y entrega de juguetes. Buscamos voluntarios activos para animar las actividades y donaciones de cometas para cada niño.',
    necesita: 'Voluntarios y cometas',
    avance: 65, meta: 100, unidad: 'cometas',
  },
  {
    titulo: 'Del Corazón a la Mesa',
    subtitulo: 'Canastas para adultos mayores',
    categoria: 'mayores',
    imagen: 'adultos-mayores.jpg',
    descripcion: 'Canastas alimenticias para adultos mayores de las comunidades.',
    detalle: 'Cada canasta lleva arroz, atún, aceite, sal, lentejas, avena y frutos secos. Puedes donar una canasta completa o productos sueltos.',
    necesita: 'Víveres no perecibles',
    avance: 40, meta: 100, unidad: 'canastas',
  },
  {
    titulo: 'Wasiman Kutishpa',
    subtitulo: '"De regreso a casa" · julio a septiembre',
    categoria: 'comunidad',
    imagen: 'entrega-viveres.jpg',
    descripcion: 'Recolección de comida y víveres para sostener la ayuda a las familias durante el trimestre.',
    detalle: 'Proyecto humanitario general. Gestionamos donaciones de alimentos, prendas de vestir, calzado y artículos de primera necesidad para las familias de Simiatug.',
    necesita: 'Víveres, ropa y calzado',
    avance: 55, meta: 100, unidad: '%',
  },
  {
    titulo: 'Salud mental comunitaria',
    subtitulo: 'Programa permanente',
    categoria: 'formacion',
    imagen: 'taller.jpg',
    descripcion: 'Espacios de psicoeducación sobre emociones, autoestima y autocuidado.',
    detalle: 'Talleres para reconocer emociones, fortalecer la autoestima y las redes de apoyo. Buscamos promover una cultura de cuidado y prevención, no solo atender cuando ya existe un problema.',
    necesita: 'Psicólogos y facilitadores voluntarios',
    avance: 0, meta: 0, unidad: '',
  },
  {
    titulo: 'Familias sin violencia',
    subtitulo: 'Prevención y fortalecimiento familiar',
    categoria: 'formacion',
    imagen: 'dinamica.jpg',
    descripcion: 'Talleres para madres, padres y parejas sobre crianza respetuosa y prevención de la violencia.',
    detalle: 'Trabajamos comunicación familiar, corresponsabilidad, resolución de conflictos y rutas de atención: que cada persona sepa a dónde acudir si vive una situación de violencia.',
    necesita: 'Facilitadores y espacios',
    avance: 0, meta: 0, unidad: '',
  },
  {
    titulo: 'Jóvenes líderes y raíces',
    subtitulo: 'Liderazgo juvenil e identidad cultural',
    categoria: 'formacion',
    imagen: 'danza.jpg',
    descripcion: 'Liderazgo, proyecto de vida y valoración de las tradiciones y la lengua materna.',
    detalle: 'Procesos con adolescentes sobre liderazgo, autoestima y toma de decisiones, junto con espacios para rescatar las tradiciones de Simiatug con la participación de los adultos mayores.',
    necesita: 'Voluntarios y materiales',
    avance: 0, meta: 0, unidad: '',
  },
  {
    titulo: 'Envejecimiento saludable',
    subtitulo: 'Cuidado y autocuidado',
    categoria: 'mayores',
    imagen: 'abuelito.jpg',
    descripcion: 'Actividades de autocuidado, hábitos saludables y prevención del aislamiento.',
    detalle: 'Encuentros donde los adultos mayores comparten sus experiencias y conocimientos, fortalecen su bienestar emocional y mantienen viva la memoria de sus comunidades.',
    necesita: 'Voluntarios y kits de cuidado',
    avance: 0, meta: 0, unidad: '',
  },
  {
    titulo: 'Apadrina una comunidad',
    subtitulo: 'Alianzas estratégicas',
    categoria: 'comunidad',
    imagen: 'evento-comunidad.jpg',
    descripcion: 'Empresas, instituciones y personas pueden apadrinar una comunidad o una actividad.',
    detalle: 'La fundación identifica necesidades, organiza la logística y facilita el contacto con la comunidad. El padrino aporta los recursos acordados: donaciones, materiales, servicios o actividades.',
    necesita: 'Padrinos e instituciones aliadas',
    avance: 16, meta: 39, unidad: 'comunidades',
  },
]

export async function sembrarSiEstaVacio() {
  const total = await Campana.countDocuments()
  if (total === 0) {
    await Campana.insertMany(campanasIniciales)
    console.log(`🌱 Se cargaron ${campanasIniciales.length} campañas iniciales`)
  }
}

// Este bloque solo corre con "npm run seed" (no cuando lo importa server.js)
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await mongoose.connect(process.env.MONGODB_URI)
  await Campana.deleteMany({})
  await Campana.insertMany(campanasIniciales)
  console.log(`✅ Base reiniciada con ${campanasIniciales.length} campañas`)
  await mongoose.disconnect()
}
