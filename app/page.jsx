import SiteShell, { ArrowLink, EventActionLink } from "../components/SiteShell";
import { Eyebrow } from "../components/Visuals";
import BrailleCellDiagram from "../components/BrailleCellDiagram";
import PhaseFlow from "../components/PhaseFlow";
import HomeMilestones from "../components/HomeMilestones";
import HomeEventStatus from "../components/HomeEventStatus";
import { site } from "../content/site";
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

function MiniCell({ pattern }) {
  return (
    <div className={styles.miniCell}>
      {Array.from({ length: 6 }).map((_, pointIndex) => (
        <span className={pattern.includes(pointIndex) ? styles.activePoint : styles.point} key={pointIndex} />
      ))}
    </div>
  );
}

function ProgressionVisual() {
  const steps = [
    ["Punto", <span className={styles.singlePoint} key="point" />],
    ["Celda", <MiniCell pattern={[0, 3, 5]} key="cell" />],
    ["Módulo", [[1, 2, 4], [0, 4, 5], [1, 3, 5]].map((pattern, index) => <MiniCell pattern={pattern} key={index} />)],
    ["Sistema", Array.from({ length: 8 }).map((_, index) => <MiniCell pattern={[index % 6, (index + 3) % 6]} key={index} />)],
  ];

  return (
    <ol className={styles.progression} aria-hidden="true">
      {steps.map(([label, visual], index) => (
        <li key={label}>
          <span>{String(index + 1).padStart(2, "0")} · {label}</span>
          <div>{visual}</div>
        </li>
      ))}
    </ol>
  );
}

function AbstractSystemVisual() {
  const patterns = [
    [0, 3, 5],
    [1, 2, 4],
    [0, 4, 5],
    [1, 3, 5],
  ];

  return (
    <div className={styles.systemVisual} aria-hidden="true">
      <div className={styles.systemLabel}>punto</div>
      <div className={styles.systemTrack}>
        {patterns.map((pattern, cellIndex) => (
          <div className={styles.systemCell} key={cellIndex}>
            {Array.from({ length: 6 }).map((_, pointIndex) => (
              <span
                className={pattern.includes(pointIndex) ? styles.activePoint : styles.point}
                key={pointIndex}
              />
            ))}
          </div>
        ))}
      </div>
      <div className={styles.systemLegend}>
        <span>celda</span>
        <span>módulo</span>
        <span>sistema</span>
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
            <p className={styles.visualCaption}>Retícula abstracta 2×3 inspirada en la lógica de una celda Braille de seis puntos. No representa un carácter Braille.</p>
          </div>
        </div>
      </section>

      <HomeEventStatus />

      <section className={styles.factsSection} aria-label="Datos esenciales">
        <div className={`wrap ${styles.factRail}`}>
          {facts.map(([value, label]) => (
            <article key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={`wrap ${styles.challengeSection}`}>
        <div className={styles.sectionCopy}>
          <Eyebrow>El reto en una frase</Eyebrow>
          <h2>Construir una celda Braille refrescable de seis puntos, funcional y controlable electrónicamente.</h2>
          <p>
            La solución debe poder explicarse, probarse y documentarse. La arquitectura concreta queda en manos de cada equipo dentro de las bases y la guía técnica vigentes.
          </p>
          <ArrowLink href="/reto">Ver alcance técnico</ArrowLink>
        </div>
        <BrailleCellDiagram />
      </section>

      <section className={styles.softSection}>
        <div className="wrap">
          <div className={styles.sectionHeading}>
            <div>
              <Eyebrow>Recorrido del Challenge</Eyebrow>
              <h2>Formación, diseño, prototipado y demostración.</h2>
            </div>
            <ArrowLink href="/cronograma">Ver cronograma completo</ArrowLink>
          </div>
          <PhaseFlow />
        </div>
      </section>

      <section className={`wrap ${styles.systemSection}`}>
        <div className={styles.sectionCopy}>
          <Eyebrow>Del punto al sistema</Eyebrow>
          <h2>La identidad visual refleja la misma lógica que persigue la ingeniería.</h2>
          <p>
            Un punto se integra en una celda de seis puntos; varias celdas pueden organizarse en módulos; y los módulos pueden escalar hacia una línea Braille. BrailleLab trabaja esa progresión como arquitectura técnica y como lenguaje visual.
          </p>
          <ul className={styles.values}>
            {values.map(([title, copy]) => (
              <li key={title}><b>{title}</b><span>{copy}</span></li>
            ))}
          </ul>
        </div>
        <div className={styles.systemPanel}>
          <ProgressionVisual />
          <p>Progresión conceptual, no codificación Braille textual.</p>
        </div>
      </section>

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

      <section className={`wrap ${styles.milestonesSection}`}>
        <div className={styles.sectionHeading}>
          <div>
            <Eyebrow>Próximos hitos</Eyebrow>
            <h2>Lo siguiente, desde una única cronología.</h2>
          </div>
          <ArrowLink href="/cronograma">Explorar todas las fechas</ArrowLink>
        </div>
        <HomeMilestones />
      </section>

      <section className={styles.softSection}>
        <div className="wrap">
          <div className={styles.sectionHeading}>
            <div>
              <Eyebrow>Recursos destacados</Eyebrow>
              <h2>Documentación 2027, cuando esté aprobada para publicación.</h2>
            </div>
            <ArrowLink href="/recursos">Ver todos los recursos</ArrowLink>
          </div>
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
        </div>
      </section>

      <section className={styles.coorgSection}>
        <div className={`wrap ${styles.coorgGrid}`}>
          <div>
            <Eyebrow>Coorganización</Eyebrow>
            <h2>Una iniciativa de BrailleLab Ecuador.</h2>
          </div>
          <div className={styles.coorgNames}>
            <span>AEMCiCD</span>
            <i aria-hidden="true">+</i>
            <span>IEEE Student Branch · Universidad Yachay Tech</span>
          </div>
          <ArrowLink href="/alianzas">Apoya y colabora</ArrowLink>
        </div>
      </section>

      <section className={styles.demoShell}>
        <div className={`wrap ${styles.demoSection}`}>
          <div className={styles.demoDate}>
            <span>Demo Day</span>
            <strong>12</strong>
            <small>junio · 2027</small>
          </div>
          <div className={styles.demoCopy}>
            <Eyebrow>Universidad Yachay Tech</Eyebrow>
            <h2>La jornada final comienza a las 10h00.</h2>
            <p>
              El cierre está previsto para las <b>17h00</b>. La agenda final puede extender la jornada hasta las <b>18h00</b> según patrocinadores, actividades y dinámica del evento.
            </p>
            <ArrowLink href="/cronograma">Ver la ruta hasta Demo Day</ArrowLink>
          </div>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={`wrap ${styles.closingGrid}`}>
          <div>
            <Eyebrow tone="dark">Participación 2027</Eyebrow>
            <h2>Equipos de 3 a 5 estudiantes. Inscripciones del 13 al 31 de enero.</h2>
            <p>
              Antes de la apertura puedes revisar el cronograma, formar tu equipo y preparar la información necesaria. El formulario oficial aparecerá únicamente cuando la convocatoria esté habilitada.
            </p>
            <p className={styles.closingContact}>
              Alianzas y consultas institucionales: <a href={`mailto:${site.contact}`}>{site.contact}</a>
            </p>
          </div>
          <div className={styles.closingActions}>
            <EventActionLink primary />
            <ArrowLink href="/participar">Cómo participar</ArrowLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
