import SiteShell, { ArrowLink, EventActionLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import PhaseFlow from "../../components/PhaseFlow";
import TimelineExplorer, { TimelineStatus } from "../../components/TimelineExplorer";
import { Eyebrow } from "../../components/Visuals";
import { site } from "../../content/site";
import layout from "../public.module.css";
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

      <section className={styles.overview}>
        <div className="wrap">
          <div className={styles.overviewHeader}>
            <Eyebrow>Estructura del proceso</Eyebrow>
            <h2>Cuatro momentos para leer el recorrido completo.</h2>
            <p>La cronología detallada conserva todos los hitos, mientras esta vista resume la progresión desde formación y diseño hasta Demo Day.</p>
          </div>
          <PhaseFlow />
        </div>
      </section>

      <section className={`wrap ${layout.timelinePage}`}>
        <TimelineStatus />
        <TimelineExplorer />
      </section>

      <section className={layout.surfaceSoft}>
        <div className={`wrap ${styles.demo}`}>
          <div className={styles.date}>
            <span>Demo Day</span>
            <strong>12</strong>
            <small>junio · 2027</small>
          </div>
          <div className={styles.demoCopy}>
            <Eyebrow>Jornada final</Eyebrow>
            <h2>{site.event.venue}</h2>
            <p>Inicio previsto a las 10h00 y cierre previsto a las 17h00.</p>
            <p>La jornada puede extenderse hasta las 18h00 según la agenda final, patrocinadores y dinámica del evento.</p>
            <div className={styles.demoFacts}>
              <span>10h00 · inicio</span>
              <span>17h00 · cierre previsto</span>
              <span>18h00 · extensión posible</span>
            </div>
          </div>
        </div>
      </section>

      <section className={layout.darkCta}>
        <div className={`wrap ${layout.ctaContent}`}>
          <div>
            <Eyebrow tone="dark">Acción contextual</Eyebrow>
            <h2>Sigue el siguiente hito sin perder de vista la ruta completa.</h2>
          </div>
          <div className={layout.actionGroup}>
            <EventActionLink primary avoid={["/participar"]} fallback={{ label: "Revisar recursos", href: "/recursos" }} />
            <ArrowLink href="/participar">Cómo participar</ArrowLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
