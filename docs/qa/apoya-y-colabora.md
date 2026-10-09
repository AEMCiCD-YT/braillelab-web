# QA · Apoya y colabora (braillelab-web#22)

El 8 de octubre de 2026 se ejecutó con Playwright (Chromium) contra el export estático servido bajo `/braillelab-web/`
y AEMCiCD Platform local. Esta usaba datos sintéticos: un ingreso verificado de USD 250 para KITS, un reconocimiento
publicado e instrucciones marcadas «EJEMPLO SINTÉTICO».

| Comprobación | Resultado |
|---|---|
| Cifras en vivo (efectivo neto, avance, gasto, especie aparte, necesidad pendiente, fecha y versión) | OK |
| Instrucciones de transferencia solo desde la plataforma | OK |
| Apoyos publicados con autorización | OK |
| Navegación «Apoya y colabora» | OK |
| Enviar vacío: resumen de errores con foco y campos con `aria-invalid` | OK |
| Revisión del aviso; al corregir se conservan los datos y el archivo | OK |
| Fallo de red en el primer envío y reintento con la misma `Idempotency-Key` (doble clic incluido) | Un solo aviso `AV-…` en la base |
| Mensaje de éxito «Todavía no es un aporte confirmado» | OK |
| Sin escrituras en `localStorage` ni `sessionStorage` y sin errores de consola | OK |
| API caída: «No pudimos cargar las cifras», ningún monto y formulario cerrado | OK |
| Móvil a 390 px sin desplazamiento horizontal | OK |
| El primer Tab lleva al enlace «Saltar al contenido principal» | OK |
| `/privacidad/#aportes` existe con `basePath` | OK |

Pendiente para el lanzamiento (aemcicd-platform#21): prueba con lector de pantalla real (NVDA y VoiceOver) y con la
API desplegada y su CORS de producción.
