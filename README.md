# 🌱 Fundación Familia Social

Sitio web de la **Fundación Familia Social** (Ambato, Ecuador): presenta a la fundación, sus campañas solidarias y permite que las personas se contacten, donen o se sumen como voluntarias.

🔗 **Página:** <https://jheins0000.github.io/Fundacion-Familia-Social/>

## Funcionalidades

- **Inicio, Quiénes Somos y Campañas** con carrusel, cifras, historia, valores y catálogo de campañas con filtros y detalle.
- **Formulario de contacto** que guarda los mensajes en MongoDB.
- **Panel de administración** con login (JWT) para leer mensajes y gestionar campañas.
- **Huellita, asistente virtual con IA** (Google Gemini) que responde preguntas sobre la fundación.

## Tecnologías

| Parte | Tecnologías | Publicado en |
|---|---|---|
| Frontend | React + Vite | GitHub Pages |
| Backend | Node.js + Express + Mongoose | Render |
| Base de datos | MongoDB Atlas | — |
| IA | Google Gemini | — |

## Estructura

```
├── frontend/   ← React: páginas, componentes, servicios y estilos
└── backend/    ← Express: modelos, rutas (campañas, mensajes, auth, chat) y middleware
```

## Ejecutar en local

**Backend**

```bash
cd backend
npm install
npm run dev
```

Necesita un archivo `backend/.env` con: `PORT`, `MONGODB_URI`, `ADMIN_USER`, `ADMIN_PASSWORD`, `JWT_SECRET`, `FRONTEND_URL`, `GEMINI_API_KEY` y `GEMINI_MODEL`.

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Necesita `frontend/.env` con `VITE_API_URL` (ver `frontend/.env.example`). Se abre en <http://localhost:5173/Fundacion-Familia-Social/>.

---

📍 Av. Bellavista Alto y Las Moras, Ambato – Ecuador · ✉️ familiasocial450@gmail.com · 📞 0990975590
