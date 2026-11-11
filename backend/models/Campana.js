import mongoose from 'mongoose'

// Estructura de una campaña o programa en la base de datos
const campanaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true, trim: true, maxlength: 100 },
    subtitulo: { type: String, trim: true, maxlength: 150, default: '' },
    categoria: {
      type: String,
      enum: ['ninos', 'mayores', 'comunidad', 'formacion'],
      default: 'comunidad',
    },
    imagen: { type: String, default: 'evento-comunidad.jpg' },
    descripcion: { type: String, required: true, trim: true, maxlength: 300 },
    detalle: { type: String, trim: true, maxlength: 1500, default: '' },
    necesita: { type: String, trim: true, maxlength: 150, default: '' },
    avance: { type: Number, min: 0, default: 0 },
    meta: { type: Number, min: 0, default: 0 }, // 0 = programa permanente
    unidad: { type: String, trim: true, maxlength: 30, default: '' },
  },
  { timestamps: true } // agrega createdAt y updatedAt automáticamente
)

export default mongoose.model('Campana', campanaSchema)
