# Arquitectura CSS — BrailleLab web

## Principio

La web separa el sistema permanente de BrailleLab de la campaña anual BrailleTech y de los datos de cada edición.

La edición (por ejemplo, 2027) vive en contenido y configuración. No se crean hojas de estilo por año ni capas globales de corrección como `ui-polish.css`.

## Capas

### 1. `app/globals.css`

Solo contiene:

- tokens de marca y tokens semánticos;
- escala tipográfica;
- reset/base del documento;
- tipografía base;
- primitivas realmente globales: `.wrap`, `.sr-only` y botones;
- foco visible y preferencias de movimiento reducido.

No contiene estilos de header, footer, cards, cronograma, rutas o páginas concretas.

### 2. CSS Modules de componentes

Cada componente visual mantiene su superficie local:

- `SiteShell.module.css`: status bar, navegación, firma y footer;
- `PageHero.module.css`: hero común de páginas internas;
- `Visuals.module.css`: eyebrow y visuales reutilizables;
- `TimelineExplorer.module.css`, `PhaseFlow.module.css`, `Faq.module.css`, etc.: comportamiento propio de cada componente.

### 3. `app/public.module.css`

Agrupa patrones de layout compartidos exclusivamente por rutas públicas internas:

- secciones;
- superficies claras;
- grids de cards y métricas;
- pasos;
- listas de proceso;
- CTA oscuro;
- layout de dos columnas.

Es un CSS Module: sus selectores no escapan globalmente.

### 4. CSS Modules de página

Cuando una ruta tiene una superficie única, la conserva en su propio módulo, por ejemplo:

- `app/home.module.css`;
- `app/recursos/recursos.module.css`;
- `app/braillelab/braillelab.module.css`;
- `app/privacidad/privacidad.module.css`.

## Tokens

Los componentes deben consumir `--color-*`, `--type-*`, `--font-*` y demás tokens semánticos.

Los antiguos alias `--night`, `--cyan`, `--petrol`, `--signal`, `--cloud`, `--paper`, `--ink`, `--muted` y `--line` están retirados.

Los tokens `--brand-*` pueden utilizarse cuando el color forma parte explícita de la composición de marca, no como sustituto general de un rol semántico.

## Reglas de evolución

1. No crear `*-polish.css`.
2. No añadir estilos de una sola página a `globals.css`.
3. No codificar una edición en nombres de clases CSS.
4. Preferir un componente compartido o módulo compartido antes que copiar bloques de estilos.
5. No usar `!important` como mecanismo de arquitectura.
6. La accesibilidad global (foco, reducción de movimiento, selección) permanece en `globals.css`.
7. Los cambios visuales de una campaña deben expresarse por tokens/props, no duplicando el sistema base.
