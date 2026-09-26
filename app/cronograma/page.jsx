import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import TimelineExplorer, { TimelineStatus } from "../../components/TimelineExplorer";
import layout from "../public.module.css";

export const metadata = { title: "Cronograma 2027" };

export default function CronogramaPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Cronograma 2027" title="Explora cada etapa del proceso." visual="timeline">
        La ruta C fue seleccionada para la planificación 2027. Las fechas se actualizarán si existe un ajuste formal antes de su publicación definitiva.
      </PageHero>
      <section className={`wrap ${layout.timelinePage}`}>
        <TimelineStatus />
        <TimelineExplorer />
      </section>
    </SiteShell>
  );
}
