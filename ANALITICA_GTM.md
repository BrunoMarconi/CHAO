# Analítica de Burger Chao · GTM + GA4

- Google Tag Manager: `GTM-NN34WQZP`
- Google Analytics 4: `G-ETSD4NXFNV`
- Dominio medido: `www.burgerchao.es` (y `burgerchao.es`)

> **Importante:** el código de la web ya está preparado, pero **no envía nada a GA4 hasta que
> se configure y publique el contenedor de GTM** (pasos de la sección 3). El 19/11/2026 el
> contenedor publicado (versión 1) estaba vacío: no tenía ninguna etiqueta.

---

## 1. Qué hace la web

Todo está en un único bloque `<script>` del `<head>` de `index.html` («ANALÍTICA · Consent Mode
básico + Google Tag Manager») y en unas pocas líneas `chaoAnalytics.*` dentro del flujo de carrito
y pedidos.

### Consentimiento (Consent Mode básico)

1. Al cargar se envía `gtag('consent','default', …)` con **todo denegado**
   (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`).
2. Se muestra un aviso de cookies con **Aceptar** y **Rechazar** al mismo nivel.
3. **GTM solo se descarga si el usuario acepta.** Sin consentimiento no se hace ninguna
   petición a Google Tag Manager ni a Google Analytics.
4. Al aceptar: `gtag('consent','update',{analytics_storage:'granted'})` y se carga GTM.
   Los permisos publicitarios siguen denegados (no hay publicidad ni remarketing).
5. Retirar el consentimiento: enlace **«Configurar cookies»** en el pie. Al rechazar se envía
   `consent update → denied`, se desactiva GA4 en la página (`ga-disable-G-ETSD4NXFNV`) y se
   borran las cookies `_ga` y `_ga_*`.
6. La elección se guarda en `localStorage` (`bb_cookie_consent`) y se vuelve a preguntar a los
   12 meses.
7. Sin consentimiento tampoco se escriben eventos de comercio electrónico en el `dataLayer`.

GTM **no se carga en localhost ni en las previews de Vercel**, salvo con el modo Vista previa de
Tag Assistant (que añade `?gtm_debug=` a la URL).

### Equipos del personal

En el navegador donde alguien inicia sesión en el panel de cocina se guarda
`bb_staff_device = 1` y **ese equipo deja de medirse para siempre** (ni GTM ni eventos), aunque
acepte las cookies. Así el ordenador de cocina no ensucia las visitas ni los pedidos.
Para volver a medir un equipo: en la consola del navegador,
`localStorage.removeItem('bb_staff_device')`.

### Eventos que se envían al `dataLayer`

Antes de cada evento de comercio electrónico se envía `{ecommerce: null}`. Moneda siempre `EUR`.

| Evento | Cuándo | `value` |
|---|---|---|
| `view_item` | Se abre la ficha de un producto (tarjeta o botón «+») | Precio del producto |
| `add_to_cart` | «Añadir al carrito», o «+» de cantidad en el carrito | Precio unitario × unidades añadidas |
| `remove_from_cart` | Papelera del carrito, o «−» de cantidad (solo si baja de verdad) | Precio unitario × unidades quitadas |
| `view_cart` | Se abre el carrito con productos | Total del carrito con el −15 % de recogida |
| `begin_checkout` | «Ir al pago» abre el checkout | Total con el −15 % |
| `purchase` | **El servidor (Firestore) confirma que el pedido se ha guardado** | `order.total` (lo mismo que ve el cliente y la cocina) |
| `refund` | El local **cancela** un pedido y el navegador del cliente lo ve | `order.total` del pedido cancelado |
| `click_call` | Clic real en un enlace `tel:` | — |
| `click_whatsapp` | Clic real en un enlace de WhatsApp | — |
| `click_directions` | Clic real en un enlace de Google Maps / Apple Maps | — |

Parámetros de los artículos (`items`): `item_id` (id del producto en la carta), `item_name`,
`item_category`, `item_variant` (menú elegido, bebida y extras), `price` (precio unitario real con
extras) y `quantity`. La bebida gratis de la promo va como `item_id: "promo-bebida"` a 0 €.

`purchase` y `refund`:
- `transaction_id` = ID del documento del pedido en Firestore (único; no es un dato personal).
- Un pedido solo genera **un** `purchase`, aunque se recargue la página, se pulse «Reintentar» o
  el envío llegue tarde (registro en `localStorage`: `bb_ga_tx`). Si el guardado falla, no hay
  `purchase`.
- Parámetros extra de `purchase`: `payment_type` (`tarjeta_en_local` / `efectivo_en_local`) y
  `payment_status: pendiente_cobro_en_local`.
- `refund` solo se envía si ese mismo navegador envió antes el `purchase` del pedido, y una sola vez.

Clics de contacto: parámetro `link_location` (`cabecera`, `pizzas`, `foodtruck`, `visitanos`,
`pie`, `seguimiento_pedido`). Solo cuentan clics reales del usuario (`isTrusted`); un doble clic
cuenta una vez. **Hoy la web no tiene enlaces de WhatsApp ni de «Cómo llegar»**, así que
`click_whatsapp` y `click_directions` no se dispararán hasta que se añadan (se detectan solos:
`wa.me`, `api.whatsapp.com`, `google.com/maps`, `maps.app.goo.gl`, `maps.apple.com`…).

**Nunca** se envían nombre, teléfono, dirección, notas, correo ni importe pagado en efectivo.

---

## 2. Qué significa cada cifra (para el caso de éxito)

- **El pago siempre es en el local** (datáfono o efectivo al recoger). La web no cobra nada.
  Por eso `purchase` = **pedido confirmado / facturación registrada**, **no dinero cobrado**.
  El parámetro `payment_status = pendiente_cobro_en_local` lo deja explícito en los datos.
- **Pedidos cancelados:** se restan con `refund`. En GA4: *Ingresos brutos por compras* (gross) =
  todo lo confirmado; *Ingresos por compras* = descontando cancelaciones.
- **Pagados:** la web no puede verificar el cobro. Para hablar de dinero cobrado hay que cruzarlo
  con la caja / TPV del local.
- **Solo se mide a quien acepta cookies.** GA4 infravalora pedidos y facturación en la proporción
  de gente que rechaza. Para el total real de pedidos hay que usar los registros del local.

---

## 3. Configuración manual en Google Tag Manager

### Opción rápida: importar `gtm-burgerchao-ga4.json`

1. GTM → contenedor `GTM-NN34WQZP` → **Administrar → Importar contenedor**.
2. Archivo: `gtm-burgerchao-ga4.json` (está en la raíz del repositorio; no se publica en la web).
3. Espacio de trabajo: **nuevo** (p. ej. «GA4 Burger Chao»). Opción: **Combinar → Cambiar el
   nombre de las etiquetas, activadores y variables en conflicto**.
4. Revisa que aparecen las 4 etiquetas, 3 activadores y 3 variables de abajo, y sigue en el
   paso «Probar y publicar».

> El JSON no se ha podido probar en tu cuenta de GTM. Si la importación da error, usa la opción
> manual: es lo mismo.

### Opción manual

**Variables** (Variables → Variables integradas → Configurar): activa **Event**.

Variables definidas por el usuario → Nueva → *Variable de capa de datos* (versión 2):

| Nombre | Nombre de la variable de capa de datos |
|---|---|
| `DLV - payment_type` | `payment_type` |
| `DLV - payment_status` | `payment_status` |
| `DLV - link_location` | `link_location` |

**Activadores** (tipo *Evento personalizado*):

| Nombre | Nombre del evento | Usar regex |
|---|---|---|
| `CE - GA4 ecommerce (sin purchase)` | `^(view_item\|add_to_cart\|remove_from_cart\|view_cart\|begin_checkout\|refund)$` | Sí |
| `CE - purchase` | `purchase` | No |
| `CE - Clics de contacto` | `^(click_call\|click_whatsapp\|click_directions)$` | Sí |

(En GTM se escribe sin las barras invertidas: `^(view_item|add_to_cart|…)$`.)

**Etiquetas:**

1. **Google tag - GA4** · tipo *Etiqueta de Google* · ID `G-ETSD4NXFNV` ·
   activador **Initialization - All Pages**.
2. **GA4 - Ecommerce** · tipo *Google Analytics: evento de GA4* · ID de medición `G-ETSD4NXFNV` ·
   nombre del evento `{{Event}}` · Más ajustes → **Enviar datos de comercio electrónico** →
   origen *Capa de datos* · activador `CE - GA4 ecommerce (sin purchase)`.
3. **GA4 - purchase** · igual que la anterior, nombre del evento `purchase`, comercio
   electrónico desde la capa de datos, y parámetros de evento:
   `payment_type` = `{{DLV - payment_type}}`, `payment_status` = `{{DLV - payment_status}}` ·
   activador `CE - purchase`.
4. **GA4 - Clics de contacto** · evento de GA4, nombre `{{Event}}`, parámetro
   `link_location` = `{{DLV - link_location}}`, **sin** datos de comercio electrónico ·
   activador `CE - Clics de contacto`.

`purchase` va en una etiqueta aparte para que `payment_type` no se arrastre a otros eventos.

**Consentimiento** (en cada una de las 4 etiquetas): Configuración avanzada → Configuración de
consentimiento → *Requerir consentimiento adicional* → `analytics_storage`. Es una segunda
barrera: la web ya no carga GTM sin consentimiento. Opcional: Administrar → Configuración del
contenedor → *Habilitar vista general del consentimiento*.

**No** crees otra etiqueta de Google/GA4 ni añadas `gtag.js` en la web: duplicaría los datos.

### Probar y publicar

1. **Vista previa** en GTM → URL `https://www.burgerchao.es/`.
2. En la página que se abre, **pulsa «Aceptar» en el aviso de cookies**: hasta entonces GTM no se
   carga y Tag Assistant no conecta.
3. Abre un producto, añádelo, abre el carrito, pulsa «Ir al pago»: en Tag Assistant deben verse
   `view_item`, `add_to_cart`, `view_cart`, `begin_checkout`, **una vez cada uno**, y las etiquetas
   disparadas. En GA4 → Administrar → **DebugView** deben llegar los eventos con sus artículos.
4. **No hagas pedidos de prueba sin avisar al local:** la web usa la base de datos real, así que
   cualquier pedido llega a cocina e imprime ticket. Si quieres ver un `purchase` real en
   DebugView, coordínalo con el local (pedido pequeño fuera de servicio que la cocina cancela:
   así se prueba también `refund`).
5. **Enviar → Publicar** con un nombre de versión, p. ej. «GA4 + ecommerce + consentimiento».

---

## 4. Ajustes en Google Analytics 4 (propiedad de `G-ETSD4NXFNV`)

- **Administrar → Configuración de la propiedad:** zona horaria *España*, moneda **EUR**.
- **Definiciones personalizadas → Dimensiones** (ámbito *Evento*): `payment_type`,
  `payment_status`, `link_location`.
- **Eventos clave:** `purchase` (ya lo es por defecto), `click_call`, y cuando existan,
  `click_whatsapp` y `click_directions`.
- **Filtros de datos:** activa **Tráfico de desarrolladores** (excluye la Vista previa de GTM y
  DebugView de los informes). Opcional: *Tráfico interno* con la IP del local.
- **Recogida de datos:** deja **Google Signals desactivado** (no se pide consentimiento publicitario).
- **Retención de datos:** 14 meses.

---

## 5. Datos para el periodo de 21 días

| Qué | Dónde en GA4 |
|---|---|
| Tráfico (usuarios, sesiones, páginas) | Informes → Adquisición / Interacción |
| Embudo producto → carrito → pago → pedido | Explorar → Exploración de embudo con `view_item`, `add_to_cart`, `begin_checkout`, `purchase` |
| Pedidos confirmados | Monetización → Compras de comercio electrónico (transacciones) |
| Facturación registrada | *Ingresos brutos por compras* (con cancelaciones) / *Ingresos por compras* (sin ellas) |
| Llamadas desde la web | Evento `click_call` (por `link_location`) |

Para presentar cifras verificables, guarda cada día el número de pedidos y el total del panel de
cocina o de la caja: la web **borra los pedidos de Firestore cada noche a las 00:15**, así que
después no hay un registro del servidor contra el que comparar.
