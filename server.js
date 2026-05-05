// server.js
// Servidor Express mínimo para servir el build de React en Hostinger.
// Hostinger con Node.js necesita un archivo de entrada que "escuche" un puerto.
// React con Vite genera una Single Page Application (SPA), así que todas las rutas
// deben devolver el index.html y React maneja el routing del lado del cliente.

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// En ESModules no existe __dirname, así que lo reconstruimos
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Puerto: Hostinger inyecta la variable de entorno PORT automáticamente.
// Si no existe (entorno local), usamos 3000.
const PORT = process.env.PORT || 3000;

// Servir los archivos estáticos del build de Vite (carpeta dist/)
app.use(express.static(join(__dirname, 'dist')));

// SPA fallback: cualquier ruta que no sea un archivo estático devuelve index.html
// Esto permite que React Router (si se usa en el futuro) funcione correctamente
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor Agencia Kleos corriendo en puerto ${PORT}`);
});