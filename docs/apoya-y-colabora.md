# Apoya y colabora (`/alianzas/`)

Implementa braillelab-web#22 sobre la API pública de AEMCiCD Platform (aemcicd-platform#17 y #20). La URL se
mantiene; la navegación dice «Apoya y colabora».

## Qué es estático y qué viene de la plataforma

| Contenido | Origen |
|---|---|
| Propósito, meta USD 6.500, primer hito USD 1.000, presupuesto por grupo y modalidades | `content/campaign.js` (decisiones aprobadas en aemcicd-platform#15) |
| Efectivo verificado, gasto, compromisos, especie, necesidad pendiente, fecha y versión de los datos | `GET /api/public/v1/campaigns/:slug` |
| Instrucciones de transferencia | La misma respuesta (`contribute.transferInstructions`): solo con la regla editorial aprobada y la campaña activa |
| Apoyos publicados | `GET …/supporters` |
| Formulario de aviso | `GET …/contribution-notice-form` y `POST …/contribution-notices` |

El repositorio nunca contiene números de cuenta, instrucciones bancarias ni cifras de avance.

## Estados

- **Sin configurar** (`NEXT_PUBLIC_PLATFORM_API_URL` vacío): se muestran meta y presupuesto aprobados, sin cifras ni
  formulario, con el correo de contacto.
- **No publicada** (404 `CAMPAIGN_NOT_PUBLISHED`): igual, con el texto «aún no publica cifras».
- **No disponible** (error o red): aviso con «Reintentar» y ningún monto. Nunca se muestran ceros.
- **Desactualizada** (`freshness: "stale"`): se muestra el último corte con su fecha y un aviso.
- **Formulario cerrado**: la campaña no acepta avisos, el servicio no responde o la versión del aviso de privacidad de
  la plataforma no coincide con `CONTRIBUTION_PRIVACY_VERSION` publicada en `/privacidad/#aportes`.

## Formulario

Recorrido: edición → revisión → subiendo (con progreso) → procesando → recibido, que muestra el identificador
`AV-…` y aclara que todavía no es un aporte confirmado.

- **Validación:** el navegador aplica las mismas reglas que la plataforma y la plataforma vuelve a validarlo todo.
- **Accesibilidad de los errores:** un resumen recibe el foco y enlaza a cada campo, que se marca con
  `aria-invalid` y `aria-describedby`.
- **Datos conservados:** al corregir se mantienen los datos y el archivo elegido.
- **Reintento sin duplicar:** el `Idempotency-Key` se genera en el navegador. Reintentar sin cambios reutiliza la
  misma clave; cualquier cambio en los datos crea una nueva. El botón se bloquea mientras se envía.
- **Anti-bots:** un campo trampa (honeypot) accesible, sin CAPTCHA.
- **Privacidad en el navegador:** no se usa `localStorage` ni `sessionStorage`, no hay analítica, no hay tokens y
  las peticiones no envían credenciales (`credentials: "omit"`).

## Configuración

Variables del repositorio en GitHub, usadas por `deploy-pages.yml`:

| Variable | Uso |
|---|---|
| `PLATFORM_API_URL` | Origen de la API, por ejemplo `https://api.example.org`. Vacía = estado «sin configurar» |
| `TRANSPARENCY_PAGE_ENABLED` | `true` cuando exista `/transparencia/` (braillelab-web#23) |

Opcional en el build: `NEXT_PUBLIC_CAMPAIGN_SLUG` (por defecto `braillelab-ecuador-2027`).

En la plataforma, antes de recibir avisos reales:

- `PUBLIC_WEB_ORIGINS` debe incluir `https://aemcicd-yt.github.io`.
- `CONTRIBUTION_PRIVACY_NOTICE_VERSION` debe ser `aportes-2027-v0.1`, o la versión que se publique aquí.
- Reglas editoriales aprobadas en la pestaña «Publicación».
- Campaña `ACTIVE` con cuenta e instrucciones configuradas en privado.

El aviso de privacidad de aportes está en borrador hasta que la asociación lo apruebe (aemcicd-platform#22).

## Verificación

[`qa/apoya-y-colabora.md`](qa/apoya-y-colabora.md).
