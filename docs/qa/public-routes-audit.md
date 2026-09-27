# Auditoría pública — responsive, accesibilidad y motion

Issue: #9  
Edición auditada: BrailleTech Challenge Ecuador 2027

## Alcance

Rutas públicas:

- `/`
- `/reto`
- `/participar`
- `/cronograma`
- `/recursos`
- `/braillelab`
- `/alianzas`
- `/privacidad`

Viewports manuales requeridos antes del merge:

| Ruta | 320 px | 390 px | 768 px | ≥1280 px |
| --- | --- | --- | --- | --- |
| / | ☐ | ☐ | ☐ | ☐ |
| /reto | ☐ | ☐ | ☐ | ☐ |
| /participar | ☐ | ☐ | ☐ | ☐ |
| /cronograma | ☐ | ☐ | ☐ | ☐ |
| /recursos | ☐ | ☐ | ☐ | ☐ |
| /braillelab | ☐ | ☐ | ☐ | ☐ |
| /alianzas | ☐ | ☐ | ☐ | ☐ |
| /privacidad | ☐ | ☐ | ☐ | ☐ |

Estas casillas corresponden a validación visual/manual y no se consideran completadas únicamente por revisión estática.

## Auditoría estática completada

### Teclado y navegación

- Skip link visible al recibir foco y enfoque programático real de `<main>`.
- Menú móvil expone `aria-expanded` y `aria-controls`.
- Al abrir el menú, el foco entra en la navegación.
- `Escape` cierra el menú y devuelve el foco al botón.
- Enlaces de navegación usan `aria-current="page"` cuando corresponde.
- Timeline usa botones nativos y `aria-pressed` para filtros e hitos.
- Explorador Braille usa botones nativos y `aria-pressed`.
- FAQ usa `details/summary` nativos.
- Botones/links principales usan targets de al menos 44–50 px en los patrones compartidos.

### Semántica y estados

- Los estados no dependen únicamente del color: incluyen texto, `aria-pressed`, `aria-current` o labels visibles.
- Los visuales de hero redundantes/decorativos están ocultos al árbol accesible.
- La celda Braille interactiva mantiene etiqueta y estado verbal.
- El countdown visual D/H/M/S está oculto a lectores de pantalla; se expone el nombre y fecha del próximo hito sin anunciar segundos continuamente.
- Los componentes temporales usan un estado neutral de “sincronizando” durante hidratación para no mostrar estados fechados incorrectos.

### Contraste de tokens principales

Ratios calculados con WCAG relative luminance:

| Uso | Par | Contraste |
| --- | --- | ---: |
| texto informativo sobre blanco | #007C83 / #FFFFFF | 4.99:1 |
| texto secundario sobre blanco | #52606F / #FFFFFF | 6.44:1 |
| cian sobre azul noche | #00AFC7 / #0B132B | 6.97:1 |
| amarillo sobre azul noche | #F4C542 / #0B132B | 11.30:1 |
| azul noche sobre CTA amarillo | #0B132B / #F4C542 | 11.30:1 |
| texto informativo sobre superficie verde clara | #007C83 / #EEF8F4 | 4.60:1 |

Los pares anteriores cumplen AA para texto normal (≥4.5:1).

### Motion

- Microinteracciones activas: 180–200 ms.
- No se detectaron duraciones superiores a 250 ms en los estilos auditados.
- No hay parallax ni fondos animados necesarios para comprender contenido.
- `prefers-reduced-motion` elimina:
  - transición/traslación de botones;
  - movimiento de cards;
  - padding animado en listas de proceso;
  - movimiento de PhaseFlow;
  - escalado de puntos Braille;
  - transición de FAQ;
  - transición del indicador de navegación;
  - glow decorativo de Home.

### Responsive / overflow

- `--wrap` reduce márgenes a 16 px por lado en móvil.
- Grids principales pasan a una columna en sus breakpoints.
- Countdown pasa de cuatro a dos unidades en móvil.
- Facts y recursos pasan a una columna.
- Timeline deja de usar panel sticky en móvil.
- Demo Day apila fecha y copy.
- Footer pasa a una columna.
- CTA permiten wrapping y `max-width: 100%`.
- Grids críticos definen `min-width: 0` en hijos para evitar overflow por contenido.
- Textos largos usan `overflow-wrap: break-word`.
- Menú móvil limita altura y permite scroll vertical en pantallas cortas.

## Coherencia operativa 2027

Revisión estática de las rutas públicas:

- No aparece “BrailleTech Challenge Ecuador 2026”.
- No aparece Hotel Ajaví como sede vigente.
- No aparece la antigua ventana 1–14 septiembre.
- Inscripciones 2027: 13–31 enero.
- Demo Day: 12 junio 2027.
- Sede: Universidad Yachay Tech.
- Inicio: 10h00.
- Cierre previsto: 17h00.
- 18h00 se presenta únicamente como posible extensión.
- La referencia a diciembre de 2026 corresponde exclusivamente a la predifusión de la edición 2027.
- Antes de la predifusión, el estado se presenta como edición 2027 en preparación.

## Validación manual antes del merge

En cada viewport:

1. Recorrer la página con `Tab` y `Shift+Tab`.
2. Activar el skip link.
3. En ≤900 px:
   - abrir menú;
   - comprobar foco en el primer enlace;
   - pulsar `Escape`;
   - comprobar retorno del foco al botón.
4. Verificar que no exista scroll horizontal.
5. Abrir/cerrar FAQ con teclado.
6. Operar filtros e hitos del cronograma.
7. Operar los seis puntos de la celda Braille.
8. Activar `prefers-reduced-motion: reduce` en DevTools y repetir hover/foco.
9. Confirmar que Demo Day no corta sede/horarios.
10. Confirmar que textos largos de recursos, privacidad y footer no desbordan.

## Validación técnica

El repositorio no define script `lint`. Antes del merge ejecutar:

```powershell
npm ci
npm run build
npm run dev
```
