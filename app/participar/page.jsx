import SiteShell, { EventActionLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import { Eyebrow } from "../../components/Visuals";
import layout from "../public.module.css";

export const metadata = { title: "Participar · 2027" };

export default function ParticiparPage() {
  const metrics = [
    ["3–5", "Integrantes", "Se permiten equipos interdisciplinarios e inter-IES."],
    ["13–31", "Enero 2027", "Ventana prevista de convocatoria e inscripciones."],
    ["20", "Equipos", "Capacidad máxima de admisión a la primera fase."],
  ];

  const steps = [
    ["1", "Revisa las bases", "Consulta elegibilidad, requisitos y documentos oficiales cuando se publique la versión 2027."],
    ["2", "Prepara los datos", "Equipo, integrantes, institución, carrera y responsable principal."],
    ["3", "Envía el formulario", "Completa la inscripción entre el 13 y el 31 de enero de 2027, una vez habilitado el formulario oficial."],
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

      <section className={`wrap ${layout.metrics}`}>
        {metrics.map(([value, title, copy]) => (
          <article className={layout.metric} key={title}>
            <b>{value}</b>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </section>

      <section className={layout.surfaceSoft}>
        <div className="wrap">
          <Eyebrow>Proceso</Eyebrow>
          <h2>Tres pasos para participar.</h2>
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
            <Eyebrow tone="dark">Estado de la edición</Eyebrow>
            <h2>La acción disponible cambia con cada etapa.</h2>
            <p>Antes de la apertura puedes revisar el cronograma y preparar tu equipo; durante la convocatoria aparecerá el acceso oficial de inscripción.</p>
          </div>
          <EventActionLink primary />
        </div>
      </section>
    </SiteShell>
  );
}
