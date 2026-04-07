# 🚀 Pasos Finales para Hacer Funcionar Todo

## 1. Guardar Cambios en Git

```powershell
cd C:\Users\Lenovo\Downloads\brutal-burgers
git add .
git commit -m "Fix: Mejorar sincronización de Firestore con logs detallados"
git push
```

## 2. Ejecutar la Aplicación Localmente

```powershell
npm start
```

Esto abrirá la app en: `http://localhost:3000` (o similar)

## 3. Probar en Móvil

Para acceder desde el móvil, necesitas:

### Opción A: Mismo WiFi (Recomendado para desarrollo)
1. En Windows, abre PowerShell:
```powershell
ipconfig
```
2. Busca tu IP local (ej: 192.168.1.50)
3. En el móvil, ve a: `http://192.168.1.50:3000` (reemplaza con TU IP)

### Opción B: GitHub Pages / Vercel
- Tu proyecto ya tiene `vercel.json` configurado
- Si haces `git push`, se desplegará automáticamente
- Lo puedes acceder desde cualquier lugar

## 4. Verificar que Funciona

### En el Móvil (o pestaña cliente):
1. Abre DevTools: **F12**
2. Ve a la pestaña **Console**
3. Haz un pedido
4. Busca estos logs:
   ```
   ✅ Firebase inicializado correctamente
   💾 Guardando pedido: BB-XXXXX
   ✅ Pedido guardado en Firestore: [ID-FIRESTORE]
   👂 Iniciando suscripción a pedidos...
   📡 Pedidos sincronizados: 1
   ```

### En el Admin (Ordenador):
1. Abre DevTools: **F12**
2. Ve a la pestaña **Console**
3. Haz login en el panel admin
4. Busca estos logs:
   ```
   ✅ Firebase inicializado correctamente
   👤 Sesión admin restaurada: admin@brutal.es
   👂 Iniciando suscripción a pedidos...
   📡 Pedidos sincronizados: 1
   ```

Si ves estos logs, ¡está funcionando! 🎉

## 5. Reglas de Seguridad de Firestore (CRÍTICO)

**ANTES de probar, debes configurar las reglas de Firestore.**

Ver: `FIRESTORE_RULES.md`

---

## 🐛 Debugging

Si algo no funciona:

1. **Abre la consola en ambos lados (F12)**
2. **Busca mensajes de error (en rojo)**
3. Lee: `FIRESTORE_RULES.md` si ves "permission-denied"

Errores comunes:
- ❌ `permission-denied` → Falta configurar reglas de Firestore
- ❌ `undefined` → Firebase no está cargado
- ❌ No ves logs → Recarga la página

---

## ✨ Lo que Debería Pasar

```
MÓVIL                          ORDENADOR (ADMIN)
│                              │
├─ Hace pedido ─────┐          │
│                   ├─ Escribir en Firestore
│                   │          │
│                   └─────────>│
│                              ├─ Leer en tiempo real
│                              │
│                   <──────────┤ Mostrarlo al admin
│                              │
│ <- Cambios de estado <────── ├─ Admin cambia estado
│    en tiempo real            │
│                              │
```

---

¡Buena suerte! 🍔
