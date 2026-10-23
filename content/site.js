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
    { id: "rubrica", title: "Rúbrica de evaluación 2027", version: "Versión 1.1 · 10 oct. 2026", href: "/documentos/rubrica-de-evaluacion-2027.pdf" },
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

// Textos de las acciones y estados que cambian con el calendario. Los enlaces se escriben con la
// ruta en español; ArrowLink y la barra de navegación los traducen al idioma de la página.
const runtimeText = {
  es: {
    register: "Inscribir equipo",
    howToParticipate: "Ver cómo participar",
    schedule: "Consultar cronograma",
    prepare: "Preparar participación",
    nextMilestone: "Ver próximo hito",
    aboutBraillelab: "Conocer BrailleLab",
    followProcess: "Seguir el proceso",
    demoDay: "Ver Demo Day",
    registrationOpen: "Inscripciones abiertas",
    callOpen: "Convocatoria abierta",
    registrationClosed: "Inscripciones cerradas",
    registrationWindow: "Inscripciones: 13–31 de enero de 2027",
    preparing: "Edición 2027 en preparación",
    nextLabel: "Próximo hito",
    next: (event) => `Próximo hito: ${event.title} · ${event.date}`,
    finished: "Edición 2027 finalizada",
    finishedDetail: "Consulta BrailleLab Ecuador para conocer la continuidad del programa.",
  },
  en: {
    register: "Register your team",
    howToParticipate: "See how to take part",
    schedule: "View the schedule",
    prepare: "Get ready to take part",
    nextMilestone: "See the next milestone",
    aboutBraillelab: "Discover BrailleLab",
    followProcess: "Follow the process",
    demoDay: "See Demo Day",
    registrationOpen: "Registration open",
    callOpen: "Call for applications open",
    registrationClosed: "Registration closed",
    registrationWindow: "Registration: January 13–31, 2027",
    preparing: "2027 edition in preparation",
    nextLabel: "Next milestone",
    next: (event) => `Next milestone: ${event.title} · ${event.date}`,
    finished: "2027 edition completed",
    finishedDetail: "Visit BrailleLab Ecuador to learn how the program continues.",
  },
};

// Traducción de los documentos y grupos de Recursos. Los PDF solo existen en español.
const resourcesEn = {
  bases: ["2027 Rules and Regulations", "Version 1.0 · Oct 10, 2026"],
  convocatoria: ["2027 Official Call for Applications", "Version 1.0 · Oct 10, 2026"],
  cronograma: ["2027 Official Schedule", "Version 1.0 · Oct 10, 2026"],
  formulario: ["2027 Registration Form · preview", "Registration is completed online"],
  guia: ["2027 Technical Guide", "Version 1.0 · Oct 10, 2026"],
  bootcamp: ["2027 Bootcamp and Mentoring Guide", "Version 1.0 · Oct 10, 2026"],
  rubrica: ["2027 Evaluation Rubric", "Version 1.1 · Oct 10, 2026"],
  declaracion: ["2027 Authorship and Licensing Statement", "Version 1.0 · Oct 10, 2026"],
  seguridad: ["2027 Safety and Laboratory Protocol", "Version 1.0 · Oct 10, 2026"],
  validacion: ["2027 User Validation Protocol", "Version 1.0 · Oct 10, 2026"],
};

const resourceGroupsEn = {
  normativa: {
    label: "01 · Participation framework",
    name: "Participation framework",
    title: "First, understand the rules and the dates.",
    copy: "The rules, call for applications, schedule and form define who can take part, when and under what conditions.",
  },
  tecnica: {
    label: "02 · Design and evaluation",
    name: "Design and evaluation",
    title: "Then, work on the technical scope.",
    copy: "The technical guide, Bootcamp, rubric and authorship statement guide the proposal and its evaluation.",
  },
  operacion: {
    label: "03 · Safety and validation",
    name: "Safety and validation",
    title: "Finally, prepare responsible testing.",
    copy: "The operating protocols become relevant during prototyping and validation.",
  },
};

export function getResources(locale = "es") {
  if (locale !== "en") return site.resources;
  return site.resources.map((resource) => {
    const [title, version] = resourcesEn[resource.id] || [resource.title, resource.version];
    return { ...resource, title, version };
  });
}

export function getResourceGroups(locale = "es") {
  if (locale !== "en") return resourceGroups;
  return resourceGroups.map((group) => ({ ...group, ...resourceGroupsEn[group.id] }));
}

export function registrationAction(now = new Date(), locale = "es") {
  const t = runtimeText[locale] || runtimeText.es;
  const { startsAt, endsAt, url, privacyUrl } = site.registration;
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const open = now >= start && now <= end;

  if (open && url && privacyUrl) {
    return { label: t.register, href: url, state: "open", external: true };
  }

  if (open) {
    return { label: t.howToParticipate, href: "/participar", state: "open-pending", external: false };
  }

  if (now > end) {
    return { label: t.schedule, href: "/cronograma", state: "closed", external: false };
  }

  return { label: t.prepare, href: "/participar", state: "upcoming", external: false };
}

export function registrationStatus(now = new Date(), locale = "es") {
  const t = runtimeText[locale] || runtimeText.es;
  const action = registrationAction(now, locale);
  if (action.state === "open") return t.registrationOpen;
  if (action.state === "open-pending") return t.callOpen;
  if (action.state === "closed") return t.registrationClosed;
  return t.registrationWindow;
}

export function challengeAction(now = new Date(), locale = "es") {
  const t = runtimeText[locale] || runtimeText.es;
  const registration = registrationAction(now, locale);
  if (registration.state === "open" || registration.state === "open-pending") return registration;

  const timeline = getTimelineState(now, locale);
  if (timeline.state === "prelaunch") {
    return { label: t.schedule, href: "/cronograma", state: "prelaunch", external: false };
  }

  if (!timeline.currentEvent && timeline.nextEvent) {
    return { label: t.nextMilestone, href: "/cronograma", state: "between", external: false };
  }

  const current = timeline.currentEvent;
  if (!current) {
    return { label: t.aboutBraillelab, href: "/braillelab", state: "complete", external: false };
  }

  if (current.id === "predifusion" || current.id === "countdown") {
    return { label: t.prepare, href: "/participar", state: "preparation", external: false };
  }

  if (current.phase === "convocatoria" || current.phase === "diseno") {
    return { label: t.schedule, href: "/cronograma", state: current.phase, external: false };
  }

  if (current.phase === "prototipado") {
    return { label: t.followProcess, href: "/cronograma", state: "prototipado", external: false };
  }

  if (current.phase === "demo") {
    return { label: t.demoDay, href: "/cronograma", state: "demo", external: false };
  }

  return { label: t.aboutBraillelab, href: "/braillelab", state: "cierre", external: false };
}

export function challengeStatus(now = new Date(), locale = "es") {
  const t = runtimeText[locale] || runtimeText.es;
  const timeline = getTimelineState(now, locale);

  if (timeline.currentEvent) {
    return {
      label: timeline.currentEvent.title,
      detail: timeline.currentEvent.date,
      state: "active",
    };
  }

  if (timeline.nextEvent && timeline.state === "prelaunch") {
    return {
      label: t.preparing,
      detail: t.next(timeline.nextEvent),
      state: "prelaunch",
    };
  }

  if (timeline.nextEvent) {
    return {
      label: t.nextLabel,
      detail: `${timeline.nextEvent.title} · ${timeline.nextEvent.date}`,
      state: "between",
    };
  }

  return {
    label: t.finished,
    detail: t.finishedDetail,
    state: "complete",
  };
}
