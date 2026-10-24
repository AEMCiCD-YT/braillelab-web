import SiteShell, { ArrowLink, EventActionLink } from "../SiteShell";
import PageHero from "../PageHero";
import PhaseFlow from "../PhaseFlow";
import TimelineExplorer, { TimelineStatus } from "../TimelineExplorer";
import Section from "../Section";
import { site } from "../../content/site";
import styles from "./cronograma.module.css";
import { buildMetadata } from "../../content/metadata";

export function metadataFor(locale = "es") {
  return buildMetadata(locale === "en" ? {
    path: "/cronograma",
    locale,
    title: "Schedule · BrailleTech 2027",
    description: "See the stages and milestones of BrailleTech Challenge Ecuador 2027. Demo Day: June 12, 2027 at Yachay Tech University, from 10:00.",
    keywords: ["BrailleTech 2027 schedule", "Demo Day June 12 2027"],
  } : {
    path: "/cronograma",
    title: "Cronograma · BrailleTech 2027",
    description: "Consulta las etapas e hitos de BrailleTech Challenge Ecuador 2027. Demo Day: 12 de junio de 2027 en Universidad Yachay Tech, desde las 10h00.",
    keywords: ["cronograma BrailleTech 2027", "Demo Day 12 junio 2027"],
  });
}

const copy = {
  es: {
    heroEyebrow: "Cronograma 2027",
    heroTitle: "Explora cada etapa del proceso.",
    hero: "Cronograma oficial de la edición 2027: de la convocatoria en enero al Demo Day del 12 de junio en la Universidad Yachay Tech.",
    structure: {
      eyebrow: "Estructura del proceso",
      title: "Cuatro momentos para leer el recorrido completo.",
      lede: "Esta vista resume la progresión desde formación y diseño hasta Demo Day; la cronología de abajo conserva todos los hitos.",
    },
    chronology: {
      eyebrow: "Cronología 2027",
      title: "Todos los hitos, por fase.",
      lede: "La lista se abre en la fase del hito vigente; usa los filtros para ver otra fase o todo el proceso.",
    },
    demo: {
      eyebrow: "Jornada final",
      title: "Demo Day · 12 de junio de 2027.",
      lede: `${site.event.venue}. Inicio previsto a las 10h00 y cierre a las 17h00; la jornada puede extenderse hasta las 18h00 según la agenda final, patrocinadores y dinámica del evento.`,
      facts: ["10h00 · inicio", "17h00 · cierre previsto", "18h00 · extensión posible"],
      month: "junio · 2027",
    },
    next: {
      eyebrow: "Acción contextual",
      title: "Sigue el siguiente hito sin perder de vista la ruta completa.",
      fallback: "Revisar recursos",
      action: "Cómo participar",
    },
  },
  en: {
    heroEyebrow: "2027 schedule",
    heroTitle: "Explore each stage of the process.",
    hero: "Official schedule of the 2027 edition: from the call for applications in January to Demo Day on June 12 at Yachay Tech University.",
    structure: {
      eyebrow: "Process structure",
      title: "Four moments to understand the whole journey.",
      lede: "This view summarizes the progression from training and design to Demo Day; the chronology below keeps every milestone.",
    },
    chronology: {
      eyebrow: "2027 chronology",
      title: "Every milestone, by phase.",
      lede: "The list opens on the phase of the current milestone; use the filters to see another phase or the whole process.",
    },
    demo: {
      eyebrow: "Final event",
      title: "Demo Day · June 12, 2027.",
      lede: "Yachay Tech University. Planned to start at 10:00 and end at 17:00; the event may be extended until 18:00 depending on the final agenda, sponsors and the flow of the day.",
      facts: ["10:00 · start", "17:00 · expected end", "18:00 · possible extension"],
      month: "June · 2027",
    },
    next: {
      eyebrow: "What's next",
      title: "Follow the next milestone without losing sight of the whole journey.",
      fallback: "Review resources",
      action: "How to participate",
    },
  },
};

export default function CronogramaPage({ locale = "es" }) {
  const t = copy[locale] || copy.es;

  return (
    <SiteShell>
      <PageHero eyebrow={t.heroEyebrow} title={t.heroTitle} visual="timeline" locale={locale}>
        {t.hero}
      </PageHero>

      <Section
        id="estructura"
        eyebrow={t.structure.eyebrow}
        title={t.structure.title}
        lede={t.structure.lede}
      >
        <PhaseFlow locale={locale} />
      </Section>

      <Section
        id="cronologia"
        tone="soft"
        eyebrow={t.chronology.eyebrow}
        title={t.chronology.title}
        lede={t.chronology.lede}
      >
        <TimelineStatus />
        <TimelineExplorer />
      </Section>

      <Section
        id="demo-day"
        layout="split"
        eyebrow={t.demo.eyebrow}
        title={t.demo.title}
        lede={t.demo.lede}
        intro={(
          <div className={styles.demoFacts}>
            {t.demo.facts.map((fact) => <span key={fact}>{fact}</span>)}
          </div>
        )}
      >
        <div className={styles.date} aria-hidden="true">
          <span>Demo Day</span>
          <strong>12</strong>
          <small>{t.demo.month}</small>
        </div>
      </Section>

      <Section
        id="siguiente-hito"
        tone="soft"
        eyebrow={t.next.eyebrow}
        title={t.next.title}
        action={<>
          <EventActionLink primary avoid={["/participar"]} fallback={{ label: t.next.fallback, href: "/recursos" }} />
          <ArrowLink href="/participar">{t.next.action}</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
