import { getTimelineState } from "./timeline";

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function assetPath(path) {
  return path ? `${basePath}${path}` : "";
}

export const site = {
  updatedAt: "2026-09-26",
  updatedAtLabel: "26 de septiembre de 2026",
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
  resources: [
    { id: "bases", title: "Bases y Reglamento 2027", version: "Edición 2027", href: null },
    { id: "guia", title: "Guía Técnica 2027", version: "Edición 2027", href: null },
    { id: "cronograma", title: "Cronograma 2027", version: "Ruta C seleccionada", href: null },
    { id: "rubrica", title: "Rúbrica de evaluación 2027", version: "Edición 2027", href: null },
    { id: "formulario", title: "Formulario oficial de inscripción 2027", version: "Se habilitará para la convocatoria", href: null },
    { id: "declaracion", title: "Declaración de autoría y licencias 2027", version: "Edición 2027", href: null },
    { id: "seguridad", title: "Protocolo de seguridad y laboratorios 2027", version: "Edición 2027", href: null },
    { id: "validacion", title: "Protocolo de validación con personas usuarias 2027", version: "Edición 2027", href: null },
  ],
};

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
