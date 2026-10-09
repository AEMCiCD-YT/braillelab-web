import SiteShell, { ArrowLink, EventActionLink } from "../components/SiteShell";
import { Eyebrow } from "../components/Visuals";
import BrailleCellDiagram from "../components/BrailleCellDiagram";
import Section from "../components/Section";
import PhaseFlow from "../components/PhaseFlow";
import HomeMilestones from "../components/HomeMilestones";
import HomeEventStatus from "../components/HomeEventStatus";
import { site } from "../content/site";
import { brailleGridOrder, letterDots } from "../content/braille";
import styles from "./home.module.css";
import { buildMetadata } from "../content/metadata";

export const metadata = buildMetadata({
  path: "/",
  title: "BrailleTech Challenge Ecuador 2027",
  description: "BrailleTech Challenge Ecuador 2027, una iniciativa de BrailleLab Ecuador para aprender, diseñar, construir y documentar tecnología Braille electrónica refrescable. Demo Day: 12 de junio de 2027 en Universidad Yachay Tech, desde las 10h00.",
  keywords: ["Demo Day 2027", "celda Braille refrescable"],
});

const facts = [
  ["13–31 ene.", "Inscripciones 2027"],
  ["3–5", "Integrantes por equipo"],
  ["Hasta 20", "Equipos admitidos"],
  ["12 jun.", "Demo Day · Yachay Tech"],
];

const values = [
  ["Accesibilidad", "Diseñar con personas usuarias, no solo para ellas."],
  ["Abierto", "Hardware y conocimiento documentados para aprender, reparar y reproducir."],
  ["Modular", "Construir desde una unidad funcional hacia sistemas de mayor escala."],
  ["Local", "Desarrollar capacidad técnica y de fabricación desde Ecuador."],
];

const highlightedResources = site.resources.slice(0, 3);

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

function ProgressionVisual() {
  const steps = [
    ["Punto", null, <span className={styles.singlePoint} key="point" />],
    ["Celda", "b", <BrailleWord word="b" key="cell" />],
    ["Módulo", "lab", <BrailleWord word="lab" key="module" />],
    ["Sistema", "ecuador", <BrailleWord word="ecuador" key="system" />],
  ];

  return (
    <ol className={styles.progression} aria-hidden="true">
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

function AbstractSystemVisual() {
  return (
    <div className={styles.systemVisual} aria-hidden="true">
      <div className={styles.systemLabel}>Braille · seis puntos</div>
      <div className={styles.systemTrack}>
        {[...heroWord].map((letter, cellIndex) => (
          <div className={styles.systemCell} key={cellIndex}>
            {cellPoints(letter).map((active, pointIndex) => (
              <span className={active ? styles.activePoint : styles.point} key={pointIndex} />
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

export default function Home() {
  return (
    <SiteShell>
      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={`wrap ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <Eyebrow tone="dark">BrailleLab Ecuador presenta</Eyebrow>
            <h1>BrailleTech Challenge <em>Ecuador 2027</em></h1>
            <p className={styles.concept}>Del punto al sistema.</p>
            <p className={styles.lede}>
              Una competencia nacional para aprender, diseñar, construir y documentar tecnología Braille electrónica refrescable desde Ecuador.
            </p>
            <div className={styles.actions}>
              <EventActionLink primary />
              <ArrowLink href="/reto">Conocer el reto</ArrowLink>
            </div>

          </div>
          <div>
            <AbstractSystemVisual />
            <p className={styles.visualCaption}>La palabra «tech» escrita en Braille de seis puntos.</p>
          </div>
        </div>
      </section>

      <Section id="estado" tone="soft">
        <HomeEventStatus />
        <div className={styles.factRail} aria-label="Datos esenciales">
          {facts.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="reto"
        layout="split"
        eyebrow="El reto en una frase"
        title="Construir una celda Braille refrescable de seis puntos, funcional y controlable electrónicamente."
        lede="La solución debe poder explicarse, probarse y documentarse. La arquitectura concreta queda en manos de cada equipo dentro de las bases y la guía técnica vigentes."
        action={<ArrowLink href="/reto">Ver alcance técnico</ArrowLink>}
      >
        <BrailleCellDiagram />
      </Section>

      <Section
        id="recorrido"
        tone="soft"
        eyebrow="Recorrido del Challenge"
        title="Formación, diseño, prototipado y demostración."
        action={<ArrowLink href="/cronograma">Ver cronograma completo</ArrowLink>}
      >
        <PhaseFlow />
        <h3 className={styles.subheading}>Próximos hitos</h3>
        <HomeMilestones />
      </Section>

      <Section
        id="sistema"
        layout="split"
        eyebrow="Del punto al sistema"
        title="La identidad visual refleja la misma lógica que persigue la ingeniería."
        lede="Un punto se integra en una celda de seis puntos; varias celdas pueden organizarse en módulos; y los módulos pueden escalar hacia una línea Braille. BrailleLab trabaja esa progresión como arquitectura técnica y como lenguaje visual."
        intro={(
          <ul className={styles.values}>
            {values.map(([title, copy]) => (
              <li key={title}><b>{title}</b><span>{copy}</span></li>
            ))}
          </ul>
        )}
      >
        <div className={styles.systemPanel}>
          <ProgressionVisual />
          <p>Cada fila está escrita en Braille: «b», «lab» y «ecuador».</p>
        </div>
      </Section>

      <section className={styles.evidenceSection}>
        <div className={`wrap ${styles.evidenceGrid}`}>
          <div>
            <Eyebrow tone="dark">Evidencia de proceso</Eyebrow>
            <h2>La edición 2027 todavía está en pre-lanzamiento.</h2>
            <p>
              Este espacio mostrará únicamente sesiones, componentes, prototipos o validaciones reales cuando exista material autorizado para difusión. No se usarán fotografías de stock ni simulaciones presentadas como evidencia.
            </p>
            <ArrowLink href="/braillelab">Conocer cómo trabaja BrailleLab</ArrowLink>
          </div>
          <div className={styles.evidenceState} aria-label="Estado actual de evidencia pública 2027">
            <span>2027 / evidencia pública</span>
            <strong>En preparación</strong>
            <ol>
              <li>Investigación aplicada</li>
              <li>Diseño</li>
              <li>Prueba</li>
              <li>Iteración</li>
              <li>Documentación</li>
            </ol>
          </div>
        </div>
      </section>

      <Section
        id="recursos"
        eyebrow="Recursos destacados"
        title="Documentación 2027, cuando esté aprobada para publicación."
        action={<ArrowLink href="/recursos">Ver todos los recursos</ArrowLink>}
      >
        <div className={styles.resourceGrid}>
          {highlightedResources.map((resource, index) => (
            <article key={resource.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{resource.title}</h3>
              <p>{resource.version}</p>
              <small>{resource.href ? "Disponible" : "Publicación pendiente"}</small>
            </article>
          ))}
        </div>
      </Section>

      <Section
        id="demo-day"
        tone="soft"
        layout="split"
        eyebrow="Universidad Yachay Tech"
        title="La jornada final comienza a las 10h00."
        lede={<>El cierre está previsto para las <b>17h00</b>. La agenda final puede extender la jornada hasta las <b>18h00</b> según patrocinadores, actividades y dinámica del evento.</>}
        action={<ArrowLink href="/cronograma">Ver la ruta hasta Demo Day</ArrowLink>}
      >
        <div className={styles.demoDate} aria-hidden="true">
          <span>Demo Day</span>
          <strong>12</strong>
          <small>junio · 2027</small>
        </div>
      </Section>

      <Section
        id="participacion"
        eyebrow="Participación 2027"
        title="Equipos de 3 a 5 estudiantes. Inscripciones del 13 al 31 de enero."
        lede="Antes de la apertura puedes revisar el cronograma, formar tu equipo y preparar la información necesaria. El formulario oficial aparecerá únicamente cuando la convocatoria esté habilitada."
        intro={(
          <p className={styles.closingContact}>
            Alianzas y consultas institucionales: <a href={`mailto:${site.contacts.partnerships}`}>{site.contacts.partnerships}</a>
          </p>
        )}
        action={<>
          <EventActionLink primary avoid={["/participar"]} />
          <ArrowLink href="/participar">Cómo participar</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
