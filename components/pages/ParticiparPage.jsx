import SiteShell, { ArrowLink, EventActionLink } from "../SiteShell";
import PageHero from "../PageHero";
import ParticipationState from "../ParticipationState";
import Section from "../Section";
import layout from "./public.module.css";
import styles from "./participar.module.css";
import { buildMetadata } from "../../content/metadata";

export function metadataFor(locale = "es") {
  return buildMetadata(locale === "en" ? {
    path: "/participar",
    locale,
    title: "Participate · BrailleTech 2027",
    description: "Take part in BrailleTech Challenge Ecuador 2027 with a team of 3 to 5 students. Registration is planned from January 13 to 31, 2027.",
    keywords: ["BrailleTech 2027 registration", "university teams"],
  } : {
    path: "/participar",
    title: "Participar · BrailleTech 2027",
    description: "Participa en BrailleTech Challenge Ecuador 2027 con un equipo de 3 a 5 estudiantes. La ventana de inscripción está prevista del 13 al 31 de enero de 2027.",
    keywords: ["inscripciones BrailleTech 2027", "equipos universitarios"],
  });
}

const copy = {
  es: {
    metrics: [
      ["3–5", "Integrantes", "Se permiten equipos interdisciplinarios e inter-IES."],
      ["13–31", "Enero 2027", "Ventana prevista de convocatoria e inscripciones."],
      ["20", "Equipos", "Capacidad máxima de admisión a la primera fase."],
    ],
    preparation: [
      ["Forma el equipo", "Reúne entre 3 y 5 estudiantes y define una persona responsable principal."],
      ["Verifica la IES", "La convocatoria está dirigida a estudiantes matriculados en instituciones de educación superior del Ecuador."],
      ["Prepara los datos", "Ten lista la información de integrantes, institución, carrera y contacto principal."],
      ["Revisa la documentación", "Consulta bases, guía técnica, cronograma y aviso de privacidad cuando estén publicados."],
    ],
    steps: [
      ["1", "Revisa las bases", "Confirma elegibilidad, requisitos y condiciones vigentes de la edición 2027."],
      ["2", "Completa la postulación", "Usa únicamente el formulario oficial durante la ventana de inscripciones."],
      ["3", "Espera la revisión", "La admisión se comunica después de la verificación administrativa; no equivale a ser finalista."],
    ],
    heroEyebrow: "Participar · edición 2027",
    heroTitle: "Forma un equipo y convierte una idea en una demostración.",
    hero: "La convocatoria está dirigida a estudiantes matriculados en instituciones de educación superior del Ecuador.",
    call: {
      eyebrow: "Convocatoria 2027",
      title: "Quién puede participar y cuándo.",
      lede: "Equipos de 3 a 5 estudiantes matriculados en instituciones de educación superior del Ecuador.",
    },
    prep: {
      eyebrow: "Antes de abrir",
      title: "Lo que puedes preparar desde ahora.",
      lede: "El formulario no necesita estar abierto para empezar a organizar una postulación sólida.",
    },
    process: {
      eyebrow: "Proceso de inscripción",
      title: "Tres pasos para entrar al proceso 2027.",
    },
    next: {
      eyebrow: "Mantente en la ruta correcta",
      title: "La siguiente acción cambia conforme avanza la edición.",
      lede: "El botón principal se actualiza con cada etapa del Challenge; cuando abra la convocatoria, llevará al formulario oficial.",
      action: "Revisar recursos",
    },
  },
  en: {
    metrics: [
      ["3–5", "Members", "Interdisciplinary and multi-institution teams are allowed."],
      ["13–31", "January 2027", "Planned window for the call for applications and registration."],
      ["20", "Teams", "Maximum number of teams admitted to the first phase."],
    ],
    preparation: [
      ["Form your team", "Bring together 3 to 5 students and choose a team lead."],
      ["Check your institution", "The call is open to students enrolled in higher education institutions in Ecuador."],
      ["Prepare your information", "Have the members' details, institution, degree program and main contact ready."],
      ["Review the documentation", "Read the rules, technical guide, schedule and privacy notice once they are published."],
    ],
    steps: [
      ["1", "Read the rules", "Confirm eligibility, requirements and the current conditions of the 2027 edition."],
      ["2", "Submit your application", "Use only the official form during the registration window."],
      ["3", "Wait for the review", "Admission is announced after the administrative check; it does not mean being a finalist."],
    ],
    heroEyebrow: "Participate · 2027 edition",
    heroTitle: "Form a team and turn an idea into a demonstration.",
    hero: "The call is open to students enrolled in higher education institutions in Ecuador.",
    call: {
      eyebrow: "2027 call for applications",
      title: "Who can participate and when.",
      lede: "Teams of 3 to 5 students enrolled in higher education institutions in Ecuador. The official form and documents are in Spanish.",
    },
    prep: {
      eyebrow: "Before registration opens",
      title: "What you can prepare right now.",
      lede: "You don't need the form to be open to start putting together a strong application.",
    },
    process: {
      eyebrow: "Registration process",
      title: "Three steps to join the 2027 process.",
    },
    next: {
      eyebrow: "Stay on track",
      title: "The next action changes as the edition moves forward.",
      lede: "The main button updates with each stage of the Challenge; once the call opens, it will take you to the official form.",
      action: "Review resources",
    },
  },
};

export default function ParticiparPage({ locale = "es" }) {
  const t = copy[locale] || copy.es;

  return (
    <SiteShell>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        visual="participate"
        accent="signal"
        locale={locale}
      >
        {t.hero}
      </PageHero>

      <Section
        id="convocatoria"
        eyebrow={t.call.eyebrow}
        title={t.call.title}
        lede={t.call.lede}
      >
        <ParticipationState />
        <div className={layout.metrics}>
          {t.metrics.map(([value, title, text]) => (
            <article className={layout.metric} key={title}>
              <b>{value}</b>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="preparacion"
        tone="soft"
        layout="split"
        eyebrow={t.prep.eyebrow}
        title={t.prep.title}
        lede={t.prep.lede}
      >
        <div className={styles.checklist}>
          {t.preparation.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="proceso" eyebrow={t.process.eyebrow} title={t.process.title}>
        <div className={layout.steps}>
          {t.steps.map(([number, title, text]) => (
            <article className={layout.step} key={number}>
              <b>{number}</b>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="siguiente-accion"
        tone="soft"
        eyebrow={t.next.eyebrow}
        title={t.next.title}
        lede={t.next.lede}
        action={<>
          <EventActionLink primary avoid={["/recursos"]} />
          <ArrowLink href="/recursos">{t.next.action}</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
