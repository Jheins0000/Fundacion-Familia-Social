// Información real de la fundación

// Devuelve la ruta correcta de una foto (funciona igual en tu PC y en GitHub Pages)
export const foto = (nombre) => `${import.meta.env.BASE_URL}fotos/${nombre}`

export const fundacion = {
  nombre: 'Fundación Familia Social',
  lema: 'Siembra tu huellita',
  inicio: '1 de junio de 2017',
  direccion: 'Av. Bellavista Alto y Las Moras, Ambato – Ecuador',
  correo: 'familiasocial450@gmail.com',
  whatsapp: '593990975590',
  mision:
    'Contribuir al bienestar integral y al desarrollo humano de personas, familias y comunidades mediante programas y proyectos sociales enfocados en la salud mental comunitaria, la prevención de la violencia, el fortalecimiento familiar, el liderazgo juvenil, la ayuda humanitaria y la preservación de la identidad cultural.',
  vision:
    'Consolidarnos como una organización social referente a nivel local y nacional por nuestro compromiso con el bienestar humano, la transformación social y el desarrollo comunitario, en territorios rurales y urbanos.',
}

// Cifras reales 
export const cifras = [
  { numero: '9', texto: 'Años de trabajo (desde 2017)' },
  { numero: '16', texto: 'Comunidades acompañadas en Simiatug' },
  { numero: '39', texto: 'Comunidades que queremos alcanzar' },
  { numero: '8', texto: 'Líneas de intervención social' },
]

export const contactos = [
  { ciudad: 'Ambato', telefono: '0990975590', whatsapp: '593990975590', nombre: 'Adriana Guamán' },
  { ciudad: 'Guaranda', telefono: '0982500991', whatsapp: '593982500991', nombre: 'Judith Hurtado' },
  { ciudad: 'Quito', telefono: '0993520893', whatsapp: '593993520893', nombre: 'Carmen Delgado' },
]

export const fotosCarrusel = [
  { archivo: 'comunidad-reunida.jpg', texto: 'Encuentro con la comunidad' },
  { archivo: 'madre-hijo.jpg', texto: 'Madre e hijo de la comunidad' },
  { archivo: 'jornada-comunidad.jpg', texto: 'Jornada comunitaria' },
  { archivo: 'regalos.jpg', texto: 'Entrega de juguetes' },
  { archivo: 'abuelito.jpg', texto: 'Adulto mayor de Simiatug' },
  { archivo: 'juegos.jpg', texto: 'Juegos con los niños' },
  { archivo: 'danza.jpg', texto: 'Danza tradicional' },
  { archivo: 'sonrisa.jpg', texto: 'Una sonrisa de la comunidad' },
  { archivo: 'ninos-entrega.jpg', texto: 'Entrega de donaciones a los niños' },
  { archivo: 'evento-comunidad.jpg', texto: 'Evento comunitario' },
]

export const formasDeAyudar = [
  { icono: '🎒', titulo: 'Dona víveres y ropa', texto: 'Alimentos no perecibles, ropa, calzado, juguetes y útiles escolares para las familias de las comunidades.' },
  { icono: '🙌', titulo: 'Sé voluntario', texto: 'Recibes orientación y capacitación antes de cada jornada. Solo necesitas compromiso y respeto por la comunidad.' },
  { icono: '🤝', titulo: 'Apadrina una comunidad', texto: 'Empresas, instituciones, universidades o personas pueden apadrinar una comunidad o una actividad específica.' },
  { icono: '📣', titulo: 'Difunde la causa', texto: 'Comparte nuestras campañas. Muchas veces la ayuda llega gracias a una sola publicación.' },
]

export const historia = [
  { anio: '2017', titulo: 'Una promesa', texto: 'El 1 de junio de 2017 comenzó todo con la promesa de una hija de cumplir el sueño de su madre: ayudar a quienes más lo necesitan. La primera visita fue a la comunidad de Cascarillas, en Simiatug.' },
  { anio: '2018 – 2022', titulo: 'Una acción familiar', texto: 'Las actividades se mantuvieron gracias a la participación familiar y a acciones solidarias, aprendiendo de cada comunidad visitada.' },
  { anio: '2023', titulo: 'Crece el voluntariado', texto: 'Después de la pandemia se fortaleció la organización: capacitación de voluntarios, talleres de salud mental y prevención de la violencia, y nuevas alianzas.' },
  { anio: '2026', titulo: 'Nueve años de compromiso', texto: 'Hoy acompañamos a 16 de las 39 comunidades de Simiatug y seguimos creciendo sin perder la esencia que nos dio origen.' },
]

export const valores = [
  'Solidaridad', 'Humanidad', 'Responsabilidad', 'Empatía',
  'Respeto', 'Interculturalidad', 'Compromiso comunitario', 'Transparencia',
]

export const preguntasFrecuentes = [
  { pregunta: '¿Dónde trabaja la fundación?', respuesta: 'Principalmente en la parroquia Simiatug (cantón Guaranda, provincia de Bolívar), que tiene 39 comunidades rurales. Hasta hoy hemos llegado a 16 de ellas. Nuestra oficina está en Ambato.' },
  { pregunta: '¿Necesito experiencia para ser voluntario?', respuesta: 'No. Antes de cada jornada damos orientación y capacitación sobre trabajo en equipo, ética del voluntariado y respeto a las costumbres locales.' },
  { pregunta: '¿Qué puedo donar?', respuesta: 'Alimentos no perecibles, ropa, calzado, juguetes, útiles escolares y artículos de primera necesidad. Escríbenos para coordinar la entrega.' },
  { pregunta: '¿Mi empresa o institución puede ayudar?', respuesta: 'Sí. Con el modelo de apadrinamiento, una institución puede apadrinar una comunidad o una actividad. La fundación coordina la logística y el contacto con la comunidad.' },
]
