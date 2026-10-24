import SiteShell, { ArrowLink, EventActionLink } from "../SiteShell";
import PageHero from "../PageHero";
import BrailleCellDiagram from "../BrailleCellDiagram";
import Section from "../Section";
import styles from "./reto.module.css";
import { buildMetadata } from "../../content/metadata";

export function metadataFor(locale = "es") {
  return buildMetadata(locale === "en" ? {
    path: "/reto",
    locale,
    title: "The challenge · BrailleTech 2027",
    description: "Discover the technical challenge of BrailleTech Challenge Ecuador 2027: build and document a working, electronically controllable six-dot refreshable Braille cell.",
    keywords: ["technical challenge", "six-dot Braille cell"],
  } : {
    path: "/reto",
    title: "El reto · BrailleTech 2027",
    description: "Conoce el reto técnico de BrailleTech Challenge Ecuador 2027: construir y documentar una celda Braille refrescable de seis puntos, funcional y controlable electrónicamente.",
    keywords: ["reto técnico", "celda Braille de seis puntos"],
  });
}

const copy = {
  es: {
    proof: [
      ["01", "Funcionar", "La celda debe permitir activar y controlar de forma demostrable cada uno de sus seis puntos."],
      ["02", "Responder", "El comportamiento debe ser controlable electrónicamente y explicable por el equipo."],
      ["03", "Documentar", "La solución debe poder revisarse, probarse y comprenderse a partir de la documentación entregada."],
    ],
    heroEyebrow: "El reto · edición 2027",
    heroTitle: <>Construir una interfaz Braille que <em>responda.</em></>,
    hero: "La edición 2027 aborda tecnología Braille electrónica refrescable con un enfoque funcional, abierto y reproducible.",
    scope: {
      eyebrow: "Alcance técnico",
      title: "Lo mínimo es una celda; escalar es opcional.",
      lede: "La arquitectura concreta queda en manos de cada equipo, dentro de las bases y la guía técnica vigentes.",
      minimumLabel: "Requisito mínimo",
      minimumTitle: "Una celda Braille refrescable de seis puntos.",
      minimumCopy: "Debe ser funcional y controlable electrónicamente. Ese núcleo define la demostración técnica mínima del Challenge.",
      optionalLabel: "Extensiones posibles",
      optionalTitle: "Escalar es posible; no es obligatorio.",
      optional: ["Más de una celda.", "Teclado o controles adicionales.", "Conexión a computadora o Bluetooth.", "Batería, modularidad u otras mejoras justificadas."],
    },
    demo: {
      eyebrow: "Qué debe demostrar el equipo",
      title: "Funcionar, responder y documentar.",
      lede: "Prueba la lógica de la celda: activa puntos y observa qué letra forman.",
    },
    next: {
      eyebrow: "Siguiente paso",
      title: "Entiende el alcance y prepara una propuesta técnicamente defendible.",
      lede: "Las bases, la guía técnica y la rúbrica 2027 están disponibles en Recursos.",
      action: "Ver recursos 2027",
    },
  },
  en: {
    proof: [
      ["01", "Work", "The cell must make it possible to raise and control each of its six dots in a demonstrable way."],
      ["02", "Respond", "Its behavior must be electronically controllable and explainable by the team."],
      ["03", "Document", "The solution must be reviewable, testable and understandable from the documentation submitted."],
    ],
    heroEyebrow: "The challenge · 2027 edition",
    heroTitle: <>Build a Braille interface that <em>responds.</em></>,
    hero: "The 2027 edition tackles refreshable electronic Braille technology with a functional, open and reproducible approach.",
    scope: {
      eyebrow: "Technical scope",
      title: "One cell is the minimum; scaling up is optional.",
      lede: "Each team chooses its own architecture, within the current rules and technical guide.",
      minimumLabel: "Minimum requirement",
      minimumTitle: "A six-dot refreshable Braille cell.",
      minimumCopy: "It must work and be electronically controllable. That core defines the minimum technical demonstration of the Challenge.",
      optionalLabel: "Possible extensions",
      optionalTitle: "Scaling up is possible, not required.",
      optional: ["More than one cell.", "Keyboard or additional controls.", "Computer or Bluetooth connection.", "Battery, modularity or other justified improvements."],
    },
    demo: {
      eyebrow: "What the team must demonstrate",
      title: "Work, respond and document.",
      lede: "Try the logic of the cell: raise dots and see which letter they form.",
    },
    next: {
      eyebrow: "Next step",
      title: "Understand the scope and prepare a technically sound proposal.",
      lede: "The 2027 rules, technical guide and rubric are available in Resources (in Spanish).",
      action: "See 2027 resources",
    },
  },
};

export default function RetoPage({ locale = "es" }) {
  const t = copy[locale] || copy.es;

  return (
    <SiteShell>
      <PageHero
        eyebrow={t.heroEyebrow}
        title={t.heroTitle}
        visual="challenge"
        accent="petrol"
        locale={locale}
      >
        {t.hero}
      </PageHero>

      <Section
        id="alcance"
        eyebrow={t.scope.eyebrow}
        title={t.scope.title}
        lede={t.scope.lede}
      >
        <div className={styles.summary}>
          <article className={styles.minimum}>
            <span>{t.scope.minimumLabel}</span>
            <h3>{t.scope.minimumTitle}</h3>
            <p>{t.scope.minimumCopy}</p>
          </article>
          <article className={styles.optional}>
            <span>{t.scope.optionalLabel}</span>
            <h3>{t.scope.optionalTitle}</h3>
            <ul>
              {t.scope.optional.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
      </Section>

      <Section
        id="demostracion"
        tone="soft"
        eyebrow={t.demo.eyebrow}
        title={t.demo.title}
        lede={t.demo.lede}
      >
        <div className={styles.proofGrid}>
          <BrailleCellDiagram />
          <div className={styles.proofCards}>
            {t.proof.map(([number, title, text]) => (
              <article className={styles.proofCard} key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="siguiente-paso"
        eyebrow={t.next.eyebrow}
        title={t.next.title}
        lede={t.next.lede}
        action={<>
          <ArrowLink href="/recursos" primary>{t.next.action}</ArrowLink>
          <EventActionLink avoid={["/recursos"]} />
        </>}
      />
    </SiteShell>
  );
}
