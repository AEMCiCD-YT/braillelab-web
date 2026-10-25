import SiteShell, { ArrowLink } from "../SiteShell";
import PageHero from "../PageHero";
import Section from "../Section";
import styles from "./braillelab.module.css";
import layout from "./public.module.css";
import { buildMetadata } from "../../content/metadata";

export function metadataFor(locale = "es") {
  return buildMetadata(locale === "en" ? {
    path: "/braillelab",
    locale,
    title: "BrailleLab Ecuador",
    description: "BrailleLab Ecuador promotes applied research, learning and documentation of accessible, open and reproducible Braille technology in Ecuador.",
    keywords: ["BrailleLab Ecuador", "applied research", "accessible Braille technology"],
  } : {
    path: "/braillelab",
    title: "BrailleLab Ecuador",
    description: "BrailleLab Ecuador impulsa investigación aplicada, aprendizaje y documentación de tecnología Braille accesible, abierta y reproducible desde Ecuador.",
    keywords: ["BrailleLab Ecuador", "investigación aplicada", "tecnología Braille accesible"],
  });
}

const copy = {
  es: {
    process: ["Investigación aplicada", "Diseño", "Prueba y revisión", "Iteración", "Documentación"],
    system: [
      ["01", "Punto", "La unidad mínima: una decisión concreta de diseño y acceso."],
      ["02", "Celda", "Seis puntos coordinados para formar una interfaz Braille funcional."],
      ["03", "Módulo", "Una arquitectura que puede crecer sin perder claridad ni reparabilidad."],
      ["04", "Sistema", "Conocimiento, hardware y documentación conectados para poder reproducirse."],
    ],
    heroTitle: <>Investigación aplicada, tecnología <em>accesible.</em></>,
    hero: "BrailleLab es la marca madre. BrailleTech Challenge Ecuador 2027 es una iniciativa de aprendizaje, diseño y demostración.",
    systemSection: {
      eyebrow: "Del punto al sistema",
      title: "Una lógica de ingeniería que también organiza la identidad de BrailleLab.",
      lede: "BrailleLab no termina en una competencia: busca conectar aprendizaje, diseño, prueba y documentación en una capacidad técnica que pueda continuar más allá de una sola edición.",
    },
    method: { eyebrow: "Cómo trabajamos", title: "Del aprendizaje a la documentación." },
    evidence: {
      eyebrow: "Evidencia real",
      title: "El proceso se mostrará con contexto y autorización.",
      lede: "Fotografías, cuadernos, componentes, sesiones y validaciones se incorporarán únicamente cuando puedan documentarse sin confundir una simulación con un prototipo ni una fase con otra.",
      state: "Edición 2027 · evidencia pública",
      stateTitle: "Aún no publicada",
      stateCopy: "No existe todavía fotografía documental 2027 autorizada para mostrarse como evidencia de proceso.",
      items: [
        ["Fotografía", "Con consentimiento y contexto verificable."],
        ["Prototipos", "Solo material real, identificado por etapa."],
        ["Accesibilidad", "Texto alternativo y pie de foto cuando corresponda."],
      ],
    },
    continuity: {
      eyebrow: "Continuidad",
      title: "BrailleTech es una iniciativa anual. BrailleLab permanece.",
      lede: "La edición 2027 organiza un ciclo concreto de formación, diseño, prototipado y Demo Day dentro de una línea de trabajo más amplia.",
      primary: "Conocer BrailleTech 2027",
      secondary: "Apoya y colabora",
    },
  },
  en: {
    process: ["Applied research", "Design", "Testing and review", "Iteration", "Documentation"],
    system: [
      ["01", "Dot", "The smallest unit: a concrete design and access decision."],
      ["02", "Cell", "Six coordinated dots that form a working Braille interface."],
      ["03", "Module", "An architecture that can grow without losing clarity or repairability."],
      ["04", "System", "Knowledge, hardware and documentation connected so they can be reproduced."],
    ],
    heroTitle: <>Applied research, <em>accessible</em> technology.</>,
    hero: "BrailleLab is the parent brand. BrailleTech Challenge Ecuador 2027 is a learning, design and demonstration initiative.",
    systemSection: {
      eyebrow: "From dot to system",
      title: "An engineering logic that also shapes BrailleLab's identity.",
      lede: "BrailleLab doesn't end with a competition: it aims to connect learning, design, testing and documentation into technical capacity that can continue beyond a single edition.",
    },
    method: { eyebrow: "How we work", title: "From learning to documentation." },
    evidence: {
      eyebrow: "Real evidence",
      title: "The process will be shown with context and authorization.",
      lede: "Photos, notebooks, components, sessions and validations will be added only when they can be documented without mistaking a simulation for a prototype or one phase for another.",
      state: "2027 edition · public evidence",
      stateTitle: "Not yet published",
      stateCopy: "There is no documentary photography from 2027 authorized to be shown as evidence of the process yet.",
      items: [
        ["Photography", "With consent and verifiable context."],
        ["Prototypes", "Only real material, labeled by stage."],
        ["Accessibility", "Alt text and captions where appropriate."],
      ],
    },
    continuity: {
      eyebrow: "Continuity",
      title: "BrailleTech is an annual initiative. BrailleLab remains.",
      lede: "The 2027 edition organizes a specific cycle of training, design, prototyping and Demo Day within a broader line of work.",
      primary: "Discover BrailleTech 2027",
      secondary: "Support us",
    },
  },
};

export default function BrailleLabPage({ locale = "es" }) {
  const t = copy[locale] || copy.es;

  return (
    <SiteShell>
      <PageHero
        eyebrow="BrailleLab Ecuador"
        title={t.heroTitle}
        visual="lab"
        accent="petrol"
        locale={locale}
      >
        {t.hero}
      </PageHero>

      <Section
        id="sistema"
        layout="split"
        eyebrow={t.systemSection.eyebrow}
        title={t.systemSection.title}
        lede={t.systemSection.lede}
      >
        <div className={styles.systemSteps}>
          {t.system.map(([number, title, text]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="metodo" tone="soft" layout="split" eyebrow={t.method.eyebrow} title={t.method.title}>
        <ol className={layout.processList}>
          {t.process.map((item, index) => (
            <li key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</li>
          ))}
        </ol>
      </Section>

      <Section
        id="evidencia"
        layout="split"
        eyebrow={t.evidence.eyebrow}
        title={t.evidence.title}
        lede={t.evidence.lede}
      >
        <aside className={styles.evidenceState} aria-labelledby="evidence-state-title">
          <span>{t.evidence.state}</span>
          <h3 id="evidence-state-title">{t.evidence.stateTitle}</h3>
          <p>{t.evidence.stateCopy}</p>
          <dl>
            {t.evidence.items.map(([term, detail]) => <div key={term}><dt>{term}</dt><dd>{detail}</dd></div>)}
          </dl>
        </aside>
      </Section>

      <Section
        id="continuidad"
        tone="soft"
        eyebrow={t.continuity.eyebrow}
        title={t.continuity.title}
        lede={t.continuity.lede}
        action={<>
          <ArrowLink href="/reto" primary>{t.continuity.primary}</ArrowLink>
          <ArrowLink href="/alianzas">{t.continuity.secondary}</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
