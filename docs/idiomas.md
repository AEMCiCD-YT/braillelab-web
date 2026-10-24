# Idiomas del sitio

El español es la versión principal y vive en la raíz (`/alianzas`). El inglés vive bajo `/en` con rutas traducidas (`/en/support`), igual que aemcicd.org. Cada página tiene un botón EN/ES que lleva a la página equivalente.

## Cómo está organizado

- `lib/i18n.mjs`: tabla de rutas ES ↔ EN, `localizePath` y `counterpartPath`. Pruebas en `tests/i18n.test.mjs`.
- `app/(es)` y `app/en`: un layout raíz por idioma (`<html lang>`) y rutas de pocas líneas que renderizan el mismo cuerpo con `locale="es"` o `locale="en"`.
- `components/pages/*Page.jsx`: cuerpo de cada página, con sus textos en `copy = { es, en }` y `metadataFor(locale)` (canónica y `hreflang`).
- Los enlaces internos se escriben siempre con la ruta en español; `ArrowLink` y la navegación los traducen. Los componentes de cliente leen el idioma con `useLocale()`.
- Contenido compartido: `content/timeline.js`, `content/site.js`, `content/faq.js` y `content/campaign.js` exponen funciones con parámetro `locale`.

## Al cambiar un texto

Edita las dos versiones en el mismo `copy`. Si agregas una página, añádela a `EN_ROUTES`, a `app/sitemap.js` y crea sus dos rutas.

## Lo que sigue en español

- Los PDF oficiales; la página en inglés lo indica.
- El texto que publica la plataforma (instrucciones de transferencia, descripciones de gastos y documentos). Los nombres conocidos de rubros se traducen con `apiLabel` en `content/campaign.js`; un nombre nuevo aparece en español hasta agregarlo allí.
- El formulario oficial de inscripción.
- El aviso de privacidad en inglés es una traducción de cortesía; rige la versión en español.
