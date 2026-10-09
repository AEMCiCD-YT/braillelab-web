import SiteShell, { ArrowLink, EventActionLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import ParticipationState from "../../components/ParticipationState";
import { Eyebrow } from "../../components/Visuals";
import layout from "../public.module.css";
import styles from "./participar.module.css";
import { buildMetadata } from "../../content/metadata";

export const metadata = buildMetadata({
  path: "/participar",
  title: "Participar · BrailleTech 2027",
  description: "Participa en BrailleTech Challenge Ecuador 2027 con un equipo de 3 a 5 estudiantes. La ventana de inscripción está prevista del 13 al 31 de enero de 2027.",
  keywords: ["inscripciones BrailleTech 2027", "equipos universitarios"],
});

export default function ParticiparPage() {
  const metrics = [
    ["3–5", "Integrantes", "Se permiten equipos interdisciplinarios e inter-IES."],
    ["13–31", "Enero 2027", "Ventana prevista de convocatoria e inscripciones."],
    ["20", "Equipos", "Capacidad máxima de admisión a la primera fase."],
  ];

  const preparation = [
    ["Forma el equipo", "Reúne entre 3 y 5 estudiantes y define una persona responsable principal."],
    ["Verifica la IES", "La convocatoria está dirigida a estudiantes matriculados en instituciones de educación superior del Ecuador."],
    ["Prepara los datos", "Ten lista la información de integrantes, institución, carrera y contacto principal."],
    ["Revisa la documentación", "Consulta bases, guía técnica, cronograma y aviso de privacidad cuando estén publicados."],
  ];

  const steps = [
    ["1", "Revisa las bases", "Confirma elegibilidad, requisitos y condiciones vigentes de la edición 2027."],
    ["2", "Completa la postulación", "Usa únicamente el formulario oficial durante la ventana de inscripciones."],
    ["3", "Espera la revisión", "La admisión se comunica después de la verificación administrativa; no equivale a ser finalista."],
  ];

  return (
    <SiteShell>
      <PageHero
        eyebrow="Participar · edición 2027"
        title="Forma un equipo y convierte una idea en una demostración."
        visual="participate"
        accent="signal"
      >
        La convocatoria está dirigida a estudiantes matriculados en instituciones de educación superior del Ecuador.
      </PageHero>

      <div className={`wrap ${styles.stateWrap}`}>
        <ParticipationState />
      </div>

      <section className={`wrap ${layout.metrics}`}>
        {metrics.map(([value, title, copy]) => (
          <article className={layout.metric} key={title}>
            <b>{value}</b>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className={layout.section}>
        <div className={`wrap ${styles.preparation}`}>
          <div>
            <Eyebrow>Antes de abrir</Eyebrow>
            <h2>Lo que puedes preparar desde ahora.</h2>
            <p>El formulario no necesita estar abierto para empezar a organizar una postulación sólida.</p>
          </div>
          <div className={styles.checklist}>
            {preparation.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={layout.surfaceSoft}>
        <div className="wrap">
          <Eyebrow>Proceso de inscripción</Eyebrow>
          <h2>Tres pasos para entrar al proceso 2027.</h2>
          <div className={layout.steps}>
            {steps.map(([number, title, copy]) => (
              <article className={layout.step} key={number}>
                <b>{number}</b>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={layout.darkCta}>
        <div className={`wrap ${layout.ctaContent}`}>
          <div>
            <Eyebrow tone="dark">Mantente en la ruta correcta</Eyebrow>
            <h2>La siguiente acción cambia conforme avanza la edición.</h2>
            <p>El botón principal se actualiza con cada etapa del Challenge; cuando abra la convocatoria, llevará al formulario oficial.</p>
          </div>
          <div className={layout.actionGroup}>
            <EventActionLink primary />
            <ArrowLink href="/recursos">Revisar recursos</ArrowLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
