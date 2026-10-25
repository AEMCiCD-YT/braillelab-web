import SiteShell, { ArrowLink, EventActionLink } from "../SiteShell";
import { Eyebrow } from "../Visuals";
import BrailleCellDiagram from "../BrailleCellDiagram";
import Section from "../Section";
import PhaseFlow from "../PhaseFlow";
import HomeMilestones from "../HomeMilestones";
import HomeEventStatus from "../HomeEventStatus";
import { assetPath, getResources, site } from "../../content/site";
import { brailleGridOrder, letterDots } from "../../content/braille";
import styles from "./home.module.css";
import { buildMetadata } from "../../content/metadata";

export function metadataFor(locale = "es") {
  return buildMetadata(locale === "en" ? {
    path: "/",
    locale,
    title: "BrailleTech Challenge Ecuador 2027",
    description: "BrailleTech Challenge Ecuador 2027, a BrailleLab Ecuador initiative to learn, design, build and document refreshable electronic Braille technology. Demo Day: June 12, 2027 at Yachay Tech University, from 10:00.",
    keywords: ["Demo Day 2027", "refreshable Braille cell"],
  } : {
    path: "/",
    title: "BrailleTech Challenge Ecuador 2027",
    description: "BrailleTech Challenge Ecuador 2027, una iniciativa de BrailleLab Ecuador para aprender, diseñar, construir y documentar tecnología Braille electrónica refrescable. Demo Day: 12 de junio de 2027 en Universidad Yachay Tech, desde las 10h00.",
    keywords: ["Demo Day 2027", "celda Braille refrescable"],
  });
}

const copy = {
  es: {
    facts: [
      ["13–31 ene.", "Inscripciones 2027"],
      ["3–5", "Integrantes por equipo"],
      ["Hasta 20", "Equipos admitidos"],
      ["12 jun.", "Demo Day · Yachay Tech"],
    ],
    values: [
      ["Accesibilidad", "Diseñar con personas usuarias, no solo para ellas."],
      ["Abierto", "Hardware y conocimiento documentados para aprender, reparar y reproducir."],
      ["Modular", "Construir desde una unidad funcional hacia sistemas de mayor escala."],
      ["Local", "Desarrollar capacidad técnica y de fabricación desde Ecuador."],
    ],
    steps: ["Punto", "Celda", "Módulo", "Sistema"],
    systemLabel: "Braille · seis puntos",
    heroEyebrow: "BrailleLab Ecuador presenta",
    concept: "Del punto al sistema.",
    heroLede: "Una competencia nacional para aprender, diseñar, construir y documentar tecnología Braille electrónica refrescable desde Ecuador.",
    heroAction: "Conocer el reto",
    heroCaption: "La palabra «tech» escrita en Braille de seis puntos.",
    factsLabel: "Datos esenciales",
    challenge: {
      eyebrow: "El reto en una frase",
      title: "Construir una celda Braille refrescable de seis puntos, funcional y controlable electrónicamente.",
      lede: "La solución debe poder explicarse, probarse y documentarse. La arquitectura concreta queda en manos de cada equipo dentro de las bases y la guía técnica vigentes.",
      action: "Ver alcance técnico",
    },
    journey: {
      eyebrow: "Recorrido del Challenge",
      title: "Formación, diseño, prototipado y demostración.",
      action: "Ver cronograma completo",
      milestones: "Próximos hitos",
    },
    system: {
      eyebrow: "Del punto al sistema",
      title: "La identidad visual refleja la misma lógica que persigue la ingeniería.",
      lede: "Un punto se integra en una celda de seis puntos; varias celdas pueden organizarse en módulos; y los módulos pueden escalar hacia una línea Braille. BrailleLab trabaja esa progresión como arquitectura técnica y como lenguaje visual.",
      caption: "Cada fila está escrita en Braille: «b», «lab» y «ecuador».",
    },
    evidence: {
      eyebrow: "Evidencia de proceso",
      title: "La edición 2027 todavía está en pre-lanzamiento.",
      copy: "Este espacio mostrará únicamente sesiones, componentes, prototipos o validaciones reales cuando exista material autorizado para difusión. No se usarán fotografías de stock ni simulaciones presentadas como evidencia.",
      action: "Conocer cómo trabaja BrailleLab",
      label: "Estado actual de evidencia pública 2027",
      state: "2027 / evidencia pública",
      status: "En preparación",
      steps: ["Investigación aplicada", "Diseño", "Prueba", "Iteración", "Documentación"],
    },
    resources: {
      eyebrow: "Recursos destacados",
      title: "Documentación oficial 2027, lista para descargar.",
      action: "Ver todos los recursos",
      open: "Abrir PDF",
      pending: "Publicación pendiente",
    },
    demo: {
      eyebrow: "Universidad Yachay Tech",
      title: "La jornada final comienza a las 10h00.",
      lede: <>El cierre está previsto para las <b>17h00</b>. La agenda final puede extender la jornada hasta las <b>18h00</b> según patrocinadores, actividades y dinámica del evento.</>,
      action: "Ver la ruta hasta Demo Day",
      month: "junio · 2027",
    },
    participation: {
      eyebrow: "Participación 2027",
      title: "Equipos de 3 a 5 estudiantes. Inscripciones del 13 al 31 de enero.",
      lede: "Antes de la apertura puedes revisar el cronograma, formar tu equipo y preparar la información necesaria. El formulario oficial aparecerá únicamente cuando la convocatoria esté habilitada.",
      contact: "Alianzas y consultas institucionales:",
      action: "Cómo participar",
    },
  },
  en: {
    facts: [
      ["Jan 13–31", "2027 registration"],
      ["3–5", "Members per team"],
      ["Up to 20", "Admitted teams"],
      ["Jun 12", "Demo Day · Yachay Tech"],
    ],
    values: [
      ["Accessibility", "Designing with users, not just for them."],
      ["Open", "Documented hardware and knowledge to learn, repair and reproduce."],
      ["Modular", "Building from a working unit toward larger systems."],
      ["Local", "Developing technical and manufacturing capacity in Ecuador."],
    ],
    steps: ["Dot", "Cell", "Module", "System"],
    systemLabel: "Braille · six dots",
    heroEyebrow: "BrailleLab Ecuador presents",
    concept: "From dot to system.",
    heroLede: "A national competition to learn, design, build and document refreshable electronic Braille technology in Ecuador.",
    heroAction: "Discover the challenge",
    heroCaption: "The word «tech» written in six-dot Braille.",
    factsLabel: "Key facts",
    challenge: {
      eyebrow: "The challenge in one sentence",
      title: "Build a working, electronically controllable six-dot refreshable Braille cell.",
      lede: "The solution must be explainable, testable and documented. Each team chooses its own architecture within the current rules and technical guide.",
      action: "See the technical scope",
    },
    journey: {
      eyebrow: "The Challenge journey",
      title: "Training, design, prototyping and demonstration.",
      action: "See the full schedule",
      milestones: "Upcoming milestones",
    },
    system: {
      eyebrow: "From dot to system",
      title: "The visual identity follows the same logic as the engineering.",
      lede: "A dot becomes part of a six-dot cell; several cells can be organized into modules; and modules can scale up to a Braille line. BrailleLab works with that progression both as technical architecture and as visual language.",
      caption: "Each row is written in Braille: «b», «lab» and «ecuador».",
    },
    evidence: {
      eyebrow: "Evidence of the process",
      title: "The 2027 edition is still in pre-launch.",
      copy: "This space will only show real sessions, components, prototypes or validations once there is material authorized for publication. We will not use stock photos or simulations presented as evidence.",
      action: "Learn how BrailleLab works",
      label: "Current status of public evidence for 2027",
      state: "2027 / public evidence",
      status: "In preparation",
      steps: ["Applied research", "Design", "Testing", "Iteration", "Documentation"],
    },
    resources: {
      eyebrow: "Featured resources",
      title: "Official 2027 documentation, ready to download.",
      action: "See all resources",
      open: "Open PDF (Spanish)",
      pending: "Publication pending",
    },
    demo: {
      eyebrow: "Yachay Tech University",
      title: "The final event starts at 10:00.",
      lede: <>It is expected to end at <b>17:00</b>. The final agenda may extend the event until <b>18:00</b> depending on sponsors, activities and the flow of the day.</>,
      action: "See the road to Demo Day",
      month: "June · 2027",
    },
    participation: {
      eyebrow: "Participation 2027",
      title: "Teams of 3 to 5 students. Registration from January 13 to 31.",
      lede: "Before registration opens you can review the schedule, form your team and prepare the information you need. The official form will appear only once the call for applications is open.",
      contact: "Partnerships and institutional inquiries:",
      action: "How to participate",
    },
  },
};


function cellPoints(letter) {
  const dots = letterDots(letter);
  return brailleGridOrder.map((dot) => dots.includes(dot));
}

function MiniCell({ letter }) {
  return (
    <div className={styles.miniCell}>
      {cellPoints(letter).map((active, pointIndex) => (
        <span className={active ? styles.activePoint : styles.point} key={pointIndex} />
      ))}
    </div>
  );
}

function BrailleWord({ word }) {
  return [...word].map((letter, index) => <MiniCell letter={letter} key={index} />);
}

function ProgressionVisual({ labels }) {
  const steps = [
    [labels[0], null, <span className={styles.singlePoint} key="point" />],
    [labels[1], "b", <BrailleWord word="b" key="cell" />],
    [labels[2], "lab", <BrailleWord word="lab" key="module" />],
    [labels[3], "ecuador", <BrailleWord word="ecuador" key="system" />],
  ];

  return (
    <ol className={styles.progression} aria-hidden="true" data-reveal="" data-stagger="">
      {steps.map(([label, word, visual], index) => (
        <li key={label}>
          <span>
            {String(index + 1).padStart(2, "0")} · {label}
            {word ? <em>«{word}»</em> : null}
          </span>
          <div>{visual}</div>
        </li>
      ))}
    </ol>
  );
}

const heroWord = "tech";

// Envuelve el primer número de una cifra para que cuente al aparecer («Hasta 20»).
function countable(value) {
  const match = /^(Hasta |Up to )(\d+)(.*)$/.exec(value);
  if (!match) return value;
  return <>{match[1]}<b data-count={match[2]}>{match[2]}</b>{match[3]}</>;
}

function AbstractSystemVisual({ label }) {
  return (
    <div className={styles.systemVisual} aria-hidden="true">
      <div className={styles.systemLabel}>{label}</div>
      <div className={styles.systemTrack}>
        {[...heroWord].map((letter, cellIndex) => (
          <div className={styles.systemCell} key={cellIndex}>
            {cellPoints(letter).map((active, pointIndex) => (
              <span
                className={active ? styles.activePoint : styles.point}
                key={pointIndex}
                style={{ "--dot": cellIndex * 6 + pointIndex }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.systemLegend}>
        {[...heroWord].map((letter, index) => <span key={index}>{letter}</span>)}
      </div>
    </div>
  );
}

export default function HomePage({ locale = "es" }) {
  const t = copy[locale] || copy.es;
  const highlightedResources = getResources(locale).slice(0, 3);

  return (
    <SiteShell>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroDots} aria-hidden="true" />
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <div data-enter="" style={{ "--enter": ".1s" }}><Eyebrow tone="dark">{t.heroEyebrow}</Eyebrow></div>
            <h1 data-enter="" style={{ "--enter": ".2s" }}>BrailleTech Challenge <em>Ecuador 2027</em></h1>
            <p className={styles.concept} data-enter="" style={{ "--enter": ".5s" }}>{t.concept}</p>
            <p className={styles.lede} data-enter="" style={{ "--enter": ".62s" }}>{t.heroLede}</p>
            <div className={styles.actions} data-enter="" style={{ "--enter": ".75s" }}>
              <EventActionLink primary />
              <ArrowLink href="/reto">{t.heroAction}</ArrowLink>
            </div>

          </div>
          <div data-enter="" style={{ "--enter": ".35s" }}>
            <AbstractSystemVisual label={t.systemLabel} />
            <p className={styles.visualCaption}>{t.heroCaption}</p>
          </div>
        </div>
      </section>

      <Section id="estado" tone="soft">
        <HomeEventStatus />
        <div className={styles.factRail} aria-label={t.factsLabel} data-reveal="" data-stagger="">
          {t.facts.map(([value, label]) => (
            <article key={label}>
              <strong>{countable(value)}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="reto"
        layout="split"
        eyebrow={t.challenge.eyebrow}
        title={t.challenge.title}
        lede={t.challenge.lede}
        action={<ArrowLink href="/reto">{t.challenge.action}</ArrowLink>}
      >
        <BrailleCellDiagram />
      </Section>

      <Section
        id="recorrido"
        tone="soft"
        eyebrow={t.journey.eyebrow}
        title={t.journey.title}
        action={<ArrowLink href="/cronograma">{t.journey.action}</ArrowLink>}
      >
        <PhaseFlow locale={locale} />
        <h3 className={styles.subheading}>{t.journey.milestones}</h3>
        <HomeMilestones />
      </Section>

      <Section
        id="sistema"
        layout="split"
        eyebrow={t.system.eyebrow}
        title={t.system.title}
        lede={t.system.lede}
        intro={(
          <ul className={styles.values} data-reveal="" data-stagger="">
            {t.values.map(([title, text]) => (
              <li key={title}><b>{title}</b><span>{text}</span></li>
            ))}
          </ul>
        )}
      >
        <div className={styles.systemPanel}>
          <ProgressionVisual labels={t.steps} />
          <p>{t.system.caption}</p>
        </div>
      </Section>

      <section className={styles.evidenceSection}>
        <div className={`wrap ${styles.evidenceGrid}`} data-reveal="">
          <div>
            <Eyebrow tone="dark">{t.evidence.eyebrow}</Eyebrow>
            <h2>{t.evidence.title}</h2>
            <p>{t.evidence.copy}</p>
            <ArrowLink href="/braillelab">{t.evidence.action}</ArrowLink>
          </div>
          <div className={styles.evidenceState} aria-label={t.evidence.label}>
            <span>{t.evidence.state}</span>
            <strong>{t.evidence.status}</strong>
            <ol>
              {t.evidence.steps.map((step) => <li key={step}>{step}</li>)}
            </ol>
          </div>
        </div>
      </section>

      <Section
        id="recursos"
        eyebrow={t.resources.eyebrow}
        title={t.resources.title}
        action={<ArrowLink href="/recursos">{t.resources.action}</ArrowLink>}
      >
        <div className={styles.resourceGrid} data-reveal="" data-stagger="">
          {highlightedResources.map((resource, index) => (
            <article key={resource.id} className="dot-corner">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{resource.title}</h3>
              <p>{resource.version}</p>
              {resource.href ? (
                <a href={assetPath(resource.href)} target="_blank" rel="noreferrer">{t.resources.open}</a>
              ) : (
                <small>{t.resources.pending}</small>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="demo-day"
        tone="soft"
        layout="split"
        eyebrow={t.demo.eyebrow}
        title={t.demo.title}
        lede={t.demo.lede}
        action={<ArrowLink href="/cronograma">{t.demo.action}</ArrowLink>}
      >
        <div className={styles.demoDate} aria-hidden="true">
          <span>Demo Day</span>
          <strong data-count="12">12</strong>
          <small>{t.demo.month}</small>
        </div>
      </Section>

      <Section
        id="participacion"
        eyebrow={t.participation.eyebrow}
        title={t.participation.title}
        lede={t.participation.lede}
        intro={(
          <p className={styles.closingContact}>
            {t.participation.contact} <a href={`mailto:${site.contacts.partnerships}`}>{site.contacts.partnerships}</a>
          </p>
        )}
        action={<>
          <EventActionLink primary avoid={["/participar"]} />
          <ArrowLink href="/participar">{t.participation.action}</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
