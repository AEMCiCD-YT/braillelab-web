import SiteShell, { ArrowLink, EventActionLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import BrailleCellDiagram from "../../components/BrailleCellDiagram";
import Section from "../../components/Section";
import styles from "./reto.module.css";
import { buildMetadata } from "../../content/metadata";

export const metadata = buildMetadata({
  path: "/reto",
  title: "El reto · BrailleTech 2027",
  description: "Conoce el reto técnico de BrailleTech Challenge Ecuador 2027: construir y documentar una celda Braille refrescable de seis puntos, funcional y controlable electrónicamente.",
  keywords: ["reto técnico", "celda Braille de seis puntos"],
});

export default function RetoPage() {
  const proof = [
    ["01", "Funcionar", "La celda debe permitir activar y controlar de forma demostrable cada uno de sus seis puntos."],
    ["02", "Responder", "El comportamiento debe ser controlable electrónicamente y explicable por el equipo."],
    ["03", "Documentar", "La solución debe poder revisarse, probarse y comprenderse a partir de la documentación entregada."],
  ];

  return (
    <SiteShell>
      <PageHero
        eyebrow="El reto · edición 2027"
        title={<>Construir una interfaz Braille que <em>responda.</em></>}
        visual="challenge"
        accent="petrol"
      >
        La edición 2027 aborda tecnología Braille electrónica refrescable con un enfoque funcional, abierto y reproducible.
      </PageHero>

      <Section
        id="alcance"
        eyebrow="Alcance técnico"
        title="Lo mínimo es una celda; escalar es opcional."
        lede="La arquitectura concreta queda en manos de cada equipo, dentro de las bases y la guía técnica vigentes."
      >
        <div className={styles.summary}>
          <article className={styles.minimum}>
            <span>Requisito mínimo</span>
            <h3>Una celda Braille refrescable de seis puntos.</h3>
            <p>Debe ser funcional y controlable electrónicamente. Ese núcleo define la demostración técnica mínima del Challenge.</p>
          </article>
          <article className={styles.optional}>
            <span>Extensiones posibles</span>
            <h3>Escalar es posible; no es obligatorio.</h3>
            <ul>
              <li>Más de una celda.</li>
              <li>Teclado o controles adicionales.</li>
              <li>Conexión a computadora o Bluetooth.</li>
              <li>Batería, modularidad u otras mejoras justificadas.</li>
            </ul>
          </article>
        </div>
      </Section>

      <Section
        id="demostracion"
        tone="soft"
        eyebrow="Qué debe demostrar el equipo"
        title="Funcionar, responder y documentar."
        lede="Prueba la lógica de la celda: activa puntos y observa qué letra forman."
      >
        <div className={styles.proofGrid}>
          <BrailleCellDiagram />
          <div className={styles.proofCards}>
            {proof.map(([number, title, copy]) => (
              <article className={styles.proofCard} key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="siguiente-paso"
        eyebrow="Siguiente paso"
        title="Entiende el alcance y prepara una propuesta técnicamente defendible."
        lede="Los documentos 2027 se publicarán en Recursos cuando estén aprobados."
        action={<>
          <ArrowLink href="/recursos" primary>Ver recursos 2027</ArrowLink>
          <EventActionLink avoid={["/recursos"]} />
        </>}
      />
    </SiteShell>
  );
}
