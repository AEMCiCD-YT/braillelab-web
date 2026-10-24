// Español es la versión principal y vive en la raíz; el inglés vive bajo /en con rutas traducidas,
// igual que aemcicd.org. El contenido y los enlaces internos se escriben siempre con la ruta en
// español y se traducen al mostrarse.
export const LOCALES = ["es", "en"];
export const DEFAULT_LOCALE = "es";

export const EN_ROUTES = {
  "/": "/en",
  "/reto": "/en/challenge",
  "/participar": "/en/participate",
  "/cronograma": "/en/schedule",
  "/recursos": "/en/resources",
  "/braillelab": "/en/braillelab",
  "/alianzas": "/en/support",
  "/transparencia": "/en/transparency",
  "/privacidad": "/en/privacy",
};

const ES_ROUTES = Object.fromEntries(Object.entries(EN_ROUTES).map(([es, en]) => [en, es]));

function trimSlash(path) {
  return path.length > 1 ? path.replace(/\/+$/, "") : path;
}

export function localeFromPath(pathname = "/") {
  return /^\/en(\/|$)/.test(pathname) ? "en" : "es";
}

/** Traduce una ruta interna en español ("/alianzas#aviso") a la del idioma pedido. */
export function localizePath(href, locale = DEFAULT_LOCALE) {
  if (locale === DEFAULT_LOCALE || typeof href !== "string" || !href.startsWith("/")) return href;
  const [path, hash] = href.split("#");
  const target = EN_ROUTES[trimSlash(path) || "/"];
  if (!target) return href;
  return hash === undefined ? target : `${target}#${hash}`;
}

/** Ruta equivalente de la página actual en el otro idioma. */
export function counterpartPath(pathname = "/") {
  const path = trimSlash(pathname) || "/";
  if (localeFromPath(path) === "en") return ES_ROUTES[path] || "/";
  return EN_ROUTES[path] || "/en";
}

/** Elige el texto del idioma: `pick({ es, en }, locale)`. */
export function pick(value, locale = DEFAULT_LOCALE) {
  return value && typeof value === "object" && !Array.isArray(value) && "es" in value ? value[locale] ?? value.es : value;
}
