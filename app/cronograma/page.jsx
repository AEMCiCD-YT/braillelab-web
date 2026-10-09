import SiteShell, { ArrowLink, EventActionLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import PhaseFlow from "../../components/PhaseFlow";
import TimelineExplorer, { TimelineStatus } from "../../components/TimelineExplorer";
import Section from "../../components/Section";
import { site } from "../../content/site";
import styles from "./cronograma.module.css";
import { buildMetadata } from "../../content/metadata";

export const metadata = buildMetadata({
  path: "/cronograma",
  title: "Cronograma · BrailleTech 2027",
  description: "Consulta las etapas e hitos de BrailleTech Challenge Ecuador 2027. Demo Day: 12 de junio de 2027 en Universidad Yachay Tech, desde las 10h00.",
  keywords: ["cronograma BrailleTech 2027", "Demo Day 12 junio 2027"],
});

export default function CronogramaPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Cronograma 2027" title="Explora cada etapa del proceso." visual="timeline">
        La ruta C fue seleccionada para la planificación 2027. Las fechas se actualizarán si existe un ajuste formal antes de su publicación definitiva.
      </PageHero>

      <Section
        id="estructura"
        eyebrow="Estructura del proceso"
        title="Cuatro momentos para leer el recorrido completo."
        lede="Esta vista resume la progresión desde formación y diseño hasta Demo Day; la cronología de abajo conserva todos los hitos."
      >
        <PhaseFlow />
      </Section>

      <Section
        id="cronologia"
        tone="soft"
        eyebrow="Cronología 2027"
        title="Todos los hitos, por fase."
        lede="La lista se abre en la fase del hito vigente; usa los filtros para ver otra fase o todo el proceso."
      >
        <TimelineStatus />
        <TimelineExplorer />
      </Section>

      <Section
        id="demo-day"
        layout="split"
        eyebrow="Jornada final"
        title="Demo Day · 12 de junio de 2027."
        lede={`${site.event.venue}. Inicio previsto a las 10h00 y cierre a las 17h00; la jornada puede extenderse hasta las 18h00 según la agenda final, patrocinadores y dinámica del evento.`}
        intro={(
          <div className={styles.demoFacts}>
            <span>10h00 · inicio</span>
            <span>17h00 · cierre previsto</span>
            <span>18h00 · extensión posible</span>
          </div>
        )}
      >
        <div className={styles.date} aria-hidden="true">
          <span>Demo Day</span>
          <strong>12</strong>
          <small>junio · 2027</small>
        </div>
      </Section>

      <Section
        id="siguiente-hito"
        tone="soft"
        eyebrow="Acción contextual"
        title="Sigue el siguiente hito sin perder de vista la ruta completa."
        action={<>
          <EventActionLink primary avoid={["/participar"]} fallback={{ label: "Revisar recursos", href: "/recursos" }} />
          <ArrowLink href="/participar">Cómo participar</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
