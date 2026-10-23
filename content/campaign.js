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

// Traducción al inglés: presupuesto por `code` (null = reserva), hito por posición y modalidades por id.
const budgetGroupsEn = {
  KITS: ["Kits and shipping", "10 XIAO ESP32-S3 kits + Sidekick Basic V2 + USB cable, with international shipping. Only for the 10 teams that pass the Design Review and move on to prototyping."],
  PHASE_I: ["Prototyping phase I", "Additional electronics, actuators and mechanisms, mechanical components, filament, testing and spare parts, printed circuit boards, external fabrication and local visits."],
  PHASE_II: ["Continuity phase II", "Braille line actuation, electronics and power, structure and materials, fabrication and iterations."],
  null: ["Adjustment reserve", "Price changes, receiving and adjustments. Only takes contributions for flexible use."],
};

const milestoneEn = ["Kits", "Kit shipping", "Receiving and adjustment reserve", "PLA filament", "Fasteners", "Partial electronics", "Partial actuation"];

const destinationLabelsEn = {
  KITS: "Kits and shipping for the finalist teams",
  PHASE_I: "Prototyping phase I",
  PHASE_II: "Continuity phase II",
};

const modalitiesEn = {
  donacion: {
    title: "Donation",
    copy: "Bank transfer to AEMCiCD's institutional account, for flexible use or restricted to one budget line. It does not create commercial benefits or sponsorship rights.",
    action: "How to donate",
  },
  patrocinio: {
    title: "Sponsorship",
    copy: "Support from an organization, with benefits set out in an approved written agreement. Without a current agreement there is no logo or sponsor label.",
    action: "Propose a sponsorship",
    subject: "Sponsorship proposal — BrailleLab 2027",
  },
  especie: {
    title: "In-kind contribution",
    copy: "Goods or services compatible with the technical design. They are reviewed and valued before being accepted; they only reduce the need if they replace a budgeted cost.",
    action: "Propose an in-kind contribution",
    subject: "In-kind contribution proposal — BrailleLab 2027",
  },
  mentoria: {
    title: "Mentoring and outreach",
    copy: "Technical or professional guidance, and connections with communities and institutions. No financial contribution required.",
    action: "Offer mentoring or outreach",
    subject: "Mentoring or outreach — BrailleLab 2027",
  },
};

export function getBudgetGroups(locale = "es") {
  if (locale !== "en") return campaign.budgetGroups;
  return campaign.budgetGroups.map((group) => {
    const [title, detail] = budgetGroupsEn[group.code] || [group.title, group.detail];
    return { ...group, title, detail };
  });
}

export function getMilestone(locale = "es") {
  if (locale !== "en") return campaign.milestone;
  return campaign.milestone.map(([label, amount], index) => [milestoneEn[index] || label, amount]);
}

export function getDestinationLabels(locale = "es") {
  return locale === "en" ? destinationLabelsEn : destinationLabels;
}

export function getModalities(locale = "es") {
  if (locale !== "en") return modalities;
  return modalities.map((modality) => ({ ...modality, ...modalitiesEn[modality.id] }));
}

/** Formato de presentación. Los importes viajan como texto decimal y nunca se calculan con flotantes. */
const intlLocale = (locale) => (locale === "en" ? "en-US" : "es-EC");
const unavailable = { es: "No disponible", en: "Not available" };
const noDate = { es: "fecha no disponible", en: "date not available" };

export function usd(amount, locale = "es") {
  if (amount === null || amount === undefined) return unavailable[locale] ?? unavailable.es;
  return new Intl.NumberFormat(intlLocale(locale), { style: "currency", currency: "USD" }).format(Number(amount));
}

export function dateLabel(isoDate, locale = "es") {
  if (!isoDate) return noDate[locale] ?? noDate.es;
  const [year, month, day] = isoDate.slice(0, 10).split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale(locale), { dateStyle: "medium", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function monthLabel(month, locale = "es") {
  const [year, value] = month.split("-").map(Number);
  return new Intl.DateTimeFormat(intlLocale(locale), { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, value - 1, 1)));
}

export function dateTimeLabel(iso, locale = "es") {
  if (!iso) return noDate[locale] ?? noDate.es;
  return new Intl.DateTimeFormat(intlLocale(locale), { dateStyle: "long", timeStyle: "short", timeZone: "America/Guayaquil" }).format(new Date(iso));
}

/**
 * Traducción al inglés de los nombres de rubros y asignaciones que publica la plataforma. La API
 * solo publica español: un nombre que no esté aquí se muestra tal como llega.
 */
const apiLabelsEn = {
  "Kits y envío": "Kits and shipping",
  "Fase I: prototipado": "Phase I: prototyping",
  "Fase II: continuidad": "Phase II: continuity",
  Reserva: "Reserve",
  "10 kits XIAO ESP32-S3 + Sidekick Basic V2 + cable USB": "10 XIAO ESP32-S3 kits + Sidekick Basic V2 + USB cable",
  "Envío internacional de kits (referencia anterior)": "International shipping of kits (earlier estimate)",
  "Electrónica adicional": "Additional electronics",
  "Actuadores y mecanismos alternativos": "Alternative actuators and mechanisms",
  "Componentes mecánicos": "Mechanical components",
  Filamentos: "Filaments",
  "Pruebas y repuestos": "Testing and spare parts",
  "Circuitos impresos": "Printed circuit boards",
  "Impresión 3D externa / corte o mecanizado": "External 3D printing / cutting or machining",
  "Visitas locales de proyecto": "Local project visits",
  "Actuación de línea braille": "Braille line actuation",
  "Electrónica y alimentación": "Electronics and power",
  "Estructura y materiales": "Structure and materials",
  "Fabricación e iteraciones": "Fabrication and iterations",
  "Reserva para ajustes": "Adjustment reserve",
  Kits: "Kits",
  Envío: "Shipping",
  "Reserva de recepción y ajustes": "Receiving and adjustment reserve",
  PLA: "PLA",
  Fijaciones: "Fasteners",
  "Electrónica parcial": "Partial electronics",
  "Actuación parcial": "Partial actuation",
};

export function apiLabel(text, locale = "es") {
  return locale === "en" ? apiLabelsEn[text] ?? text : text;
}
