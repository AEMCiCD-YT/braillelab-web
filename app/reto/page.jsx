import SiteShell, { ArrowLink, EventActionLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import BrailleCellDiagram from "../../components/BrailleCellDiagram";
import { Eyebrow } from "../../components/Visuals";
import layout from "../public.module.css";
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

      <section className={`wrap ${layout.section} ${styles.summary}`}>
        <article className={styles.minimum}>
          <span>Requisito mínimo</span>
          <h2>Una celda Braille refrescable de seis puntos.</h2>
          <p>Debe ser funcional y controlable electrónicamente. Ese núcleo define la demostración técnica mínima del Challenge.</p>
        </article>
        <article className={styles.optional}>
          <span>Extensiones posibles</span>
          <h2>Escalar es posible; no es obligatorio.</h2>
          <ul>
            <li>Más de una celda.</li>
            <li>Teclado o controles adicionales.</li>
            <li>Conexión a computadora o Bluetooth.</li>
            <li>Batería, modularidad u otras mejoras justificadas.</li>
          </ul>
        </article>
      </section>

      <section className={layout.surfaceSoft}>
        <div className={`wrap ${styles.proofGrid}`}>
          <BrailleCellDiagram />
          <div>
            <Eyebrow>Qué debe demostrar el equipo</Eyebrow>
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
        </div>
      </section>

      <section className={layout.darkCta}>
        <div className={`wrap ${layout.ctaContent}`}>
          <div>
            <Eyebrow tone="dark">Siguiente paso</Eyebrow>
            <h2>Entiende el alcance y prepara una propuesta técnicamente defendible.</h2>
            <p>Los documentos 2027 se publicarán en Recursos cuando estén aprobados.</p>
          </div>
          <div className={layout.actionGroup}>
            <ArrowLink href="/recursos" primary>Ver recursos 2027</ArrowLink>
            <EventActionLink avoid={["/recursos"]} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
