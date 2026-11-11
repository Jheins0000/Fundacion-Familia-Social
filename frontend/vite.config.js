import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANTE: "base" debe ser el nombre EXACTO de tu repositorio en GitHub,
// entre barras. Si tu repo se llama distinto, cámbialo aquí.
export default defineConfig({
  plugins: [react()],
  base: '/Fundacion-Familia-Social/',
})
