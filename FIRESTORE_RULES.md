# 🔧 Configuración Necesaria de Firestore

> **Actualización (19/11/2026):** las reglas vigentes están en [`firestore.rules`](firestore.rules).
> Copia ese archivo entero en **Firestore → Reglas → Publicar**. Resumen:
> - `orders`: cualquiera puede crear su pedido y seguirlo por su ID; **listar, modificar y borrar
>   pedidos solo el panel de cocina con sesión iniciada** (antes cualquiera podía leerlos y borrarlos).
> - `counters`: el número de pedido diario solo puede empezar en 1 o subir de uno en uno.
> - `clientes`: la web solo da de alta a quien acepta; ver la lista, dar de baja o borrar, solo el admin.
> - Admin = usuario con correo y contraseña (no anónimo). Para limitarlo a una sola cuenta, pon su UID
>   en la función `isAdmin()` (instrucciones dentro del archivo).
> - Como ya no todos los navegadores pueden borrar pedidos, si a las 00:15 no hay ningún panel abierto,
>   el panel borra los pedidos de días anteriores al entrar el admin (a partir de las 06:00).
>
> Las instrucciones de abajo son las originales del proyecto y están desactualizadas.

## ❌ PROBLEMA IDENTIFICADO

Los pedidos no llegan en tiempo real porque probablemente **las reglas de seguridad de Firestore NO están configuradas correctamente**.

## ✅ SOLUCIÓN

### Paso 1: Ir a Firestore Console
1. Ve a: https://console.firebase.google.com
2. Selecciona el proyecto: **brutal-burgers**
3. En el menú izquierdo, ve a **Firestore Database**

### Paso 2: Configurar Reglas de Seguridad

En la pestaña **"Reglas"**, reemplaza TODO el contenido con esto:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir que cualquiera (sin autenticación) lea y escriba pedidos
    // IMPORTANTE: Esto es solo para desarrollo. En producción, implementar autenticación.
    match /orders/{document=**} {
      allow read, write: if true;
    }

    // (Opcional) Admin users con autenticación
    // match /admin/{document=**} {
    //   allow read, write: if request.auth != null;
    // }
  }
}
```

### Paso 3: Publicar las Reglas
1. Haz clic en el botón **"Publicar"** en la esquina superior derecha
2. Espera 1-2 minutos a que se apliquen (verás una confirmación)

---

## 🧪 Prueba que Funciona

### En el Móvil:
1. Ve a la web: `http://[tu-ip]:3000` (reemplaza según tu IP o localhost)
2. Haz un pedido normal
3. Abre la consola del navegador (F12) y busca este mensaje: `✅ Pedido guardado en Firestore: [ID]`

### En el Ordenador (Admin):
1. Abre el panel admin (botón en la esquina superior derecha)
2. Login con: 
   - **Email**: `admin@brutal.es`
   - **Contraseña**: `brutal2025`
3. Abre la consola (F12) y busca: `📡 Pedidos sincronizados: [número]`
4. Deberías ver el pedido del móvil **en tiempo real** ✨

---

## 🚨 SI AÚN NO FUNCIONA

Abre la consola del navegador (F12) en **ambos lados** (móvil y admin) y mira:

### Errores Comunes:

**❌ "permission-denied"**
- Las reglas de Firestore NO están configuradas correctamente
- Solución: Repite los pasos 2 y 3

**❌ "Firebase not loaded yet"**
- Las librerías de Firebase no se cargaron
- Solución: Recarga la página

**❌ No ves logs de "Guardando pedido"**
- `fbSaveOrder()` no se está ejecutando
- Solución: Revisa que el checkout se completa sin errores

---

## 📊 Estructura de Datos en Firestore

Un pedido tiene esta estructura:

```javascript
{
  id: "BB-12345",           // ID local
  fbId: "automatic",        // Generado por Firestore
  name: "Carlos",
  phone: "600123456",
  address: "Calle Larios 5",
  type: "domicilio",        // local, llevar, domicilio
  items: [...],
  subtotal: 12.90,
  shipping: 1.99,
  total: 14.89,
  status: "nuevos",         // nuevos, preparacion, listos, reparto, entregado
  payment: { method: "card" },
  timestamp: 1700000000,
  createdAt: "2024-11-15T15:30:00Z",    // Timestamp del servidor
  isNew: true
}
```

---

## 🎯 Siguiente Paso

Una vez que funcione en tiempo real:
1. **Los pedidos del móvil aparecerán en el admin instantáneamente**
2. **El admin puede cambiar el estado** (nuevos → preparacion → listos → reparto → entregado)
3. **El móvil verá los cambios en tiempo real** sin recargar

¡Listo! 🎉
