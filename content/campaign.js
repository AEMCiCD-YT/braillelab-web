/**
 * Campaña de aportes BrailleLab Ecuador 2027 (AEMCiCD-YT/aemcicd-platform#15).
 *
 * Aquí solo vive lo aprobado y estable: propósito, meta, presupuesto general y primer hito.
 * Las cifras recibidas, gastadas o disponibles, las instrucciones de transferencia y los
 * apoyos publicados llegan siempre de la API pública de AEMCiCD Platform: nunca se escriben
 * en este repositorio ni se sustituyen por ceros cuando no hay datos.
 */
export const PLATFORM_API_URL = (process.env.NEXT_PUBLIC_PLATFORM_API_URL || "").replace(/\/$/, "");
export const CAMPAIGN_SLUG = process.env.NEXT_PUBLIC_CAMPAIGN_SLUG || "braillelab-ecuador-2027";

export function campaignApi(path = "") {
  if (!PLATFORM_API_URL) return null;
  return `${PLATFORM_API_URL}/api/public/v1/campaigns/${encodeURIComponent(CAMPAIGN_SLUG)}${path}`;
}

/** Página de transparencia detallada (braillelab-web#23). */
export const TRANSPARENCY_PAGE = "/transparencia";

/** Convierte un enlace relativo de la API pública (p. ej. documentos) en una URL absoluta. */
export function platformUrl(path) {
  if (!PLATFORM_API_URL || typeof path !== "string" || !path.startsWith("/api/public/")) return null;
  return `${PLATFORM_API_URL}${path}`;
}

/**
 * Versión del aviso de privacidad de aportes publicada en /privacidad/. El formulario solo se
 * habilita cuando la plataforma usa esta misma versión: nunca se acepta un aviso distinto al
 * que la persona puede leer.
 */
export const CONTRIBUTION_PRIVACY_VERSION = "aportes-2027-v1.0";

export const campaign = {
  name: "BrailleLab Ecuador 2027",
  goal: "6500.00",
  firstMilestone: "1000.00",
  budgetGroups: [
    {
      code: "KITS",
      title: "Kits y envío",
      amount: "467.28",
      detail: "10 kits XIAO ESP32-S3 + Sidekick Basic V2 + cable USB y su envío internacional. Solo para los 10 equipos que superen Design Review y avancen a prototipado.",
    },
    {
      code: "PHASE_I",
      title: "Prototipado fase I",
      amount: "3666.84",
      detail: "Electrónica adicional, actuadores y mecanismos, componentes mecánicos, filamentos, pruebas y repuestos, circuitos impresos, fabricación externa y visitas locales.",
    },
    {
      code: "PHASE_II",
      title: "Continuidad fase II",
      amount: "2032.40",
      detail: "Actuación de línea braille, electrónica y alimentación, estructura y materiales, fabricación e iteraciones.",
    },
    {
      code: null,
      title: "Reserva para ajustes",
      amount: "333.48",
      detail: "Variaciones de precio, recepción y ajustes. Recibe solo aportes de uso flexible.",
    },
  ],
  milestone: [
    ["Kits", "349.90"],
    ["Envío de kits", "117.38"],
    ["Reserva de recepción y ajustes", "200.00"],
    ["Filamento PLA", "90.00"],
    ["Fijaciones", "57.00"],
    ["Electrónica parcial", "85.72"],
    ["Actuación parcial", "100.00"],
  ],
};

/** Etiquetas públicas de los destinos que acepta el formulario. Vacío = uso flexible. */
export const destinationLabels = {
  KITS: "Kits y envío para los equipos finalistas",
  PHASE_I: "Prototipado fase I",
  PHASE_II: "Continuidad fase II",
};

export const modalities = [
  {
    id: "donacion",
    title: "Donación",
    copy: "Transferencia a la cuenta institucional de AEMCiCD con destino flexible o restringido a un rubro. No genera beneficios comerciales ni derechos de patrocinio.",
    action: "Cómo donar",
    href: "#aviso",
  },
  {
    id: "patrocinio",
    title: "Patrocinio",
    copy: "Apoyo de una organización con contraprestaciones escritas en un acuerdo aprobado. Sin acuerdo vigente no hay logo ni etiqueta de patrocinador.",
    action: "Proponer patrocinio",
    subject: "Propuesta de patrocinio — BrailleLab 2027",
  },
  {
    id: "especie",
    title: "Aporte en especie",
    copy: "Bienes o servicios compatibles con el diseño técnico. Se revisan y valoran antes de aceptarlos; solo reducen la necesidad si sustituyen un costo del presupuesto.",
    action: "Proponer aporte en especie",
    subject: "Propuesta de aporte en especie — BrailleLab 2027",
  },
  {
    id: "mentoria",
    title: "Mentoría y difusión",
    copy: "Acompañamiento técnico o profesional, y conexión con comunidades e instituciones. No requiere aporte económico.",
    action: "Ofrecer mentoría o difusión",
    subject: "Mentoría o difusión — BrailleLab 2027",
  },
];

/** Formato de presentación. Los importes viajan como texto decimal y nunca se calculan con flotantes. */
const formatter = new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" });
export function usd(amount) {
  if (amount === null || amount === undefined) return "No disponible";
  return formatter.format(Number(amount));
}

export function dateLabel(isoDate) {
  if (!isoDate) return "fecha no disponible";
  const [year, month, day] = isoDate.slice(0, 10).split("-").map(Number);
  return new Intl.DateTimeFormat("es-EC", { dateStyle: "medium", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function monthLabel(month) {
  const [year, value] = month.split("-").map(Number);
  return new Intl.DateTimeFormat("es-EC", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, value - 1, 1)));
}

export function dateTimeLabel(iso) {
  if (!iso) return "fecha no disponible";
  return new Intl.DateTimeFormat("es-EC", { dateStyle: "long", timeStyle: "short", timeZone: "America/Guayaquil" }).format(new Date(iso));
}
