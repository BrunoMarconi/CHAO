# BRUTAL BURGERS 🍔

Hamburguesería urbana premium — web completa con menú interactivo, carrito, checkout, cálculo de envío por distancia y panel de cocina kanban en tiempo real.

## Deploy en Vercel

### Opción 1 — Vercel CLI (recomendado)
```bash
npm i -g vercel
vercel
```
Sigue las instrucciones. En la primera vez te pedirá login.

### Opción 2 — GitHub + Vercel (más fácil a largo plazo)
1. Sube esta carpeta a un repositorio GitHub
2. Ve a [vercel.com](https://vercel.com) → New Project
3. Importa el repositorio
4. Vercel lo detecta como sitio estático automáticamente
5. Click en **Deploy** — listo

### Opción 3 — Drag & Drop
1. Ve a [vercel.com/new](https://vercel.com/new)
2. Arrastra esta carpeta directamente
3. Deploy automático

## Estructura
```
brutal-burgers/
├── index.html     ← toda la app (HTML + CSS + JS)
├── vercel.json    ← configuración de Vercel
├── package.json   ← metadatos del proyecto
└── README.md
```

## Panel de cocina
- Botón ⚙ abajo a la derecha en la web
- Contraseña: `brutal2025`

## Conectar Firebase (producción)
Busca los comentarios `// 🔥 In production:` en el código para ver exactamente dónde conectar:
- Firestore para pedidos en tiempo real
- Firebase Auth para el panel admin
- Google Maps Geocoding API para cálculo de distancia real
