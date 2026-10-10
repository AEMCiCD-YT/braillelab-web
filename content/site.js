import { getTimelineState } from "./timeline";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path) {
  return path ? `${basePath}${path}` : "";
}

export const site = {
  updatedAt: "2026-10-10",
  updatedAtLabel: "10 de octubre de 2026",
  event: {
    name: "BrailleTech Challenge Ecuador 2027",
    shortName: "BrailleTech Challenge 2027",
    edition: 2027,
    demoDay: "12 de junio de 2027",
    demoDayHours: "10h00–17h00",
    demoDayHoursNote: "Posible extensión hasta 18h00 según la agenda final, patrocinadores y dinámica de la jornada.",
    venue: "Universidad Yachay Tech",
  },
  capacity: {
    teamMin: 3,
    teamMax: 5,
    admittedTeams: 20,
    finalists: 10,
    alternates: 2,
  },
  registration: {
    startsAt: "2027-01-13T09:00:00-05:00",
    endsAt: "2027-01-31T23:59:00-05:00",
    url: process.env.NEXT_PUBLIC_BRAILLETECH_REGISTRATION_URL || "",
    privacyUrl: "/privacidad",
  },
  // Buzones compartidos de braillelab.org, uno por función.
  contacts: {
    general: "info@braillelab.org",
    participants: "brailletech@braillelab.org",
    partnerships: "alianzas@braillelab.org",
    privacy: "privacidad@braillelab.org",
  },
  // PDFs públicos de la edición 2027 (fuentes en el repositorio de documentos de BrailleLab Ecuador).
  resources: [
    { id: "bases", title: "Bases y Reglamento 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/bases-y-reglamento-2027.pdf" },
    { id: "convocatoria", title: "Convocatoria oficial 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/convocatoria-oficial-2027.pdf" },
    { id: "cronograma", title: "Cronograma oficial 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/cronograma-oficial-2027.pdf" },
    { id: "formulario", title: "Formulario de inscripción 2027 · vista previa", version: "La inscripción se hace en línea", href: "/documentos/formulario-de-inscripcion-2027.pdf" },
    { id: "guia", title: "Guía Técnica 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/guia-tecnica-2027.pdf" },
    { id: "bootcamp", title: "Guía del Bootcamp y mentoría 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/guia-bootcamp-y-mentoria-2027.pdf" },
    { id: "rubrica", title: "Rúbrica de evaluación 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/rubrica-de-evaluacion-2027.pdf" },
    { id: "declaracion", title: "Declaración de autoría y licencias 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/declaracion-autoria-licencias-recursos-2027.pdf" },
    { id: "seguridad", title: "Protocolo de seguridad y laboratorios 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/protocolo-seguridad-laboratorios-2027.pdf" },
    { id: "validacion", title: "Protocolo de validación con personas usuarias 2027", version: "Versión 1.0 · 10 oct. 2026", href: "/documentos/protocolo-validacion-personas-usuarias-2027.pdf" },
  ],
};

// Grupos de la página Recursos; `name` es la etiqueta corta del índice del hero.
export const resourceGroups = [
  {
    id: "normativa",
    label: "01 · Marco de participación",
    name: "Marco de participación",
    title: "Primero, entiende las reglas y las fechas.",
    copy: "Bases, convocatoria, cronograma y formulario definen quién participa, cuándo y bajo qué condiciones.",
    ids: ["bases", "convocatoria", "cronograma", "formulario"],
  },
  {
    id: "tecnica",
    label: "02 · Diseño y evaluación",
    name: "Diseño y evaluación",
    title: "Después, trabaja sobre el alcance técnico.",
    copy: "Guía técnica, Bootcamp, rúbrica y declaración de autoría orientan la propuesta y la evaluación.",
    ids: ["guia", "bootcamp", "rubrica", "declaracion"],
  },
  {
    id: "operacion",
    label: "03 · Seguridad y validación",
    name: "Seguridad y validación",
    title: "Finalmente, prepara pruebas responsables.",
    copy: "Los protocolos operativos se vuelven relevantes durante prototipado y validación.",
    ids: ["seguridad", "validacion"],
  },
];

export function registrationAction(now = new Date()) {
  const { startsAt, endsAt, url, privacyUrl } = site.registration;
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const open = now >= start && now <= end;

  if (open && url && privacyUrl) {
    return { label: "Inscribir equipo", href: url, state: "open", external: true };
  }

  if (open) {
    return { label: "Ver cómo participar", href: "/participar", state: "open-pending", external: false };
  }

  if (now > end) {
    return { label: "Consultar cronograma", href: "/cronograma", state: "closed", external: false };
  }

  return { label: "Preparar participación", href: "/participar", state: "upcoming", external: false };
}

export function registrationStatus(now = new Date()) {
  const action = registrationAction(now);
  if (action.state === "open") return "Inscripciones abiertas";
  if (action.state === "open-pending") return "Convocatoria abierta";
  if (action.state === "closed") return "Inscripciones cerradas";
  return "Inscripciones: 13–31 de enero de 2027";
}

export function challengeAction(now = new Date()) {
  const registration = registrationAction(now);
  if (registration.state === "open" || registration.state === "open-pending") return registration;

  const timeline = getTimelineState(now);
  if (timeline.state === "prelaunch") {
    return { label: "Consultar cronograma", href: "/cronograma", state: "prelaunch", external: false };
  }

  if (!timeline.currentEvent && timeline.nextEvent) {
    return { label: "Ver próximo hito", href: "/cronograma", state: "between", external: false };
  }

  const current = timeline.currentEvent;
  if (!current) {
    return { label: "Conocer BrailleLab", href: "/braillelab", state: "complete", external: false };
  }

  if (current.id === "predifusion" || current.id === "countdown") {
    return { label: "Preparar participación", href: "/participar", state: "preparation", external: false };
  }

  if (current.phase === "convocatoria" || current.phase === "diseno") {
    return { label: "Consultar cronograma", href: "/cronograma", state: current.phase, external: false };
  }

  if (current.phase === "prototipado") {
    return { label: "Seguir el proceso", href: "/cronograma", state: "prototipado", external: false };
  }

  if (current.phase === "demo") {
    return { label: "Ver Demo Day", href: "/cronograma", state: "demo", external: false };
  }

  return { label: "Conocer BrailleLab", href: "/braillelab", state: "cierre", external: false };
}

export function challengeStatus(now = new Date()) {
  const timeline = getTimelineState(now);

  if (timeline.currentEvent) {
    return {
      label: timeline.currentEvent.title,
      detail: timeline.currentEvent.date,
      state: "active",
    };
  }

  if (timeline.nextEvent && timeline.state === "prelaunch") {
    return {
      label: "Edición 2027 en preparación",
      detail: `Próximo hito: ${timeline.nextEvent.title} · ${timeline.nextEvent.date}`,
      state: "prelaunch",
    };
  }

  if (timeline.nextEvent) {
    return {
      label: "Próximo hito",
      detail: `${timeline.nextEvent.title} · ${timeline.nextEvent.date}`,
      state: "between",
    };
  }

  return {
    label: "Edición 2027 finalizada",
    detail: "Consulta BrailleLab Ecuador para conocer la continuidad del programa.",
    state: "complete",
  };
}
