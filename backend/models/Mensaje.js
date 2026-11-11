import mongoose from 'mongoose'

// Mensajes que llegan desde el formulario de contacto
const mensajeSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true, minlength: 3, maxlength: 80 },
    correo: { type: String, required: true, trim: true, lowercase: true, match: /^\S+@\S+\.\S+$/ },
    telefono: { type: String, trim: true, maxlength: 20, default: '' },
    tipo: {
      type: String,
      enum: ['voluntariado', 'donacion', 'apadrinamiento', 'otro'],
      default: 'otro',
    },
    campana: { type: String, trim: true, maxlength: 100, default: '' },
    mensaje: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
    leido: { type: Boolean, default: false },
  },
  { timestamps: true }
)

export default mongoose.model('Mensaje', mensajeSchema)
