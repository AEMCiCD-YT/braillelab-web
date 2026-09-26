# BrailleLab web — tipografía y tokens visuales

Este archivo documenta la capa base implementada para BrailleLab Ecuador y BrailleTech Challenge Ecuador 2027.

## Tipografía

| Rol | Fuente | Uso |
| --- | --- | --- |
| Display / marca | Space Grotesk | H1, H2, H3, firma BrailleLab y cifras de alto impacto |
| Texto / interfaz | IBM Plex Sans | cuerpo, navegación, botones, formularios y lectura continua |
| Datos / técnico | IBM Plex Mono | fechas compactas, índices, versiones, código y datos técnicos |

Las fuentes se cargan mediante `next/font/google` y se exponen como variables CSS. No deben añadirse nuevas dependencias directas a Arial, Arial Narrow o `monospace` en componentes.

## Paleta de marca

| Token | Valor | Rol |
| --- | --- | --- |
| `--brand-night` | `#0B132B` | base institucional BrailleLab |
| `--brand-cyan` | `#00AFC7` | tecnología e interacción |
| `--brand-petrol` | `#007C83` | información y accesibilidad |
| `--brand-signal` | `#F4C542` | BrailleTech, hitos y CTA |
| `--brand-coral` | `#F26B4A` | alertas puntuales |
| `--brand-cloud` | `#F6F8FB` | superficies claras |

## Tokens semánticos

Los componentes nuevos deben preferir los tokens semánticos frente a los nombres de color:

- `--color-canvas`: fondo general.
- `--color-surface`: tarjetas y superficies primarias.
- `--color-surface-subtle`: secciones claras secundarias.
- `--color-text`: texto principal.
- `--color-text-muted`: texto secundario.
- `--color-border`: bordes neutrales.
- `--color-brand`: identidad institucional.
- `--color-interactive`: enlaces, indicadores y estados interactivos.
- `--color-info`: información y soporte.
- `--color-accent`: acento competitivo de BrailleTech.
- `--color-alert`: avisos puntuales.
- `--color-focus`: foco de teclado.
- `--color-on-dark`: contenido sobre fondos oscuros.
- `--color-on-accent`: contenido sobre amarillo señal.

Los alias históricos `--night`, `--cyan`, `--petrol`, `--signal`, `--cloud`, `--paper`, `--ink`, `--muted` y `--line` se conservan temporalmente para evitar una migración masiva dentro del issue #4. Su consolidación corresponde al issue #7.

## Escala tipográfica

- `--type-display-xl`: hero principal.
- `--type-display-lg`: hero de páginas internas.
- `--type-heading-lg`: encabezados grandes de sección.
- `--type-heading-md`: encabezados de cards.
- `--type-body-lg`: ledes.
- `--type-body`: lectura general.
- `--type-small`: texto auxiliar.
- `--type-meta`: eyebrows, etiquetas y metadatos.

También se centralizan `--leading-tight`, `--leading-body`, `--tracking-display` y `--tracking-meta`.

## Reglas

1. BrailleLab y BrailleTech comparten las mismas familias tipográficas.
2. BrailleTech se diferencia principalmente mediante el amarillo señal y una composición más energética, no mediante otra familia tipográfica.
3. IBM Plex Mono se reserva para datos y contenido técnico; no debe convertirse en la fuente general de la interfaz.
4. El foco visible usa el token `--color-focus`.
5. El coral se reserva para alertas y no debe usarse como color decorativo dominante.
