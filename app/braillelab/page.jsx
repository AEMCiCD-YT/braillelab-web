import SiteShell, { ArrowLink } from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import Section from "../../components/Section";
import styles from "./braillelab.module.css";
import layout from "../public.module.css";
import { buildMetadata } from "../../content/metadata";

export const metadata = buildMetadata({
  path: "/braillelab",
  title: "BrailleLab Ecuador",
  description: "BrailleLab Ecuador impulsa investigación aplicada, aprendizaje y documentación de tecnología Braille accesible, abierta y reproducible desde Ecuador.",
  keywords: ["BrailleLab Ecuador", "investigación aplicada", "tecnología Braille accesible"],
});

const process = [
  "Investigación aplicada",
  "Diseño",
  "Prueba y revisión",
  "Iteración",
  "Documentación",
];

const system = [
  ["01", "Punto", "La unidad mínima: una decisión concreta de diseño y acceso."],
  ["02", "Celda", "Seis puntos coordinados para formar una interfaz Braille funcional."],
  ["03", "Módulo", "Una arquitectura que puede crecer sin perder claridad ni reparabilidad."],
  ["04", "Sistema", "Conocimiento, hardware y documentación conectados para poder reproducirse."],
];

export default function BrailleLabPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="BrailleLab Ecuador"
        title={<>Investigación aplicada para una tecnología más <em>accesible.</em></>}
        visual="lab"
        accent="petrol"
      >
        BrailleLab es la marca madre. BrailleTech Challenge Ecuador 2027 es una iniciativa de aprendizaje, diseño y demostración.
      </PageHero>

      <Section
        id="sistema"
        layout="split"
        eyebrow="Del punto al sistema"
        title="Una lógica de ingeniería que también organiza la identidad de BrailleLab."
        lede="BrailleLab no termina en una competencia: busca conectar aprendizaje, diseño, prueba y documentación en una capacidad técnica que pueda continuar más allá de una sola edición."
      >
        <div className={styles.systemSteps}>
          {system.map(([number, title, copy]) => (
            <article key={number}>
              <span>{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="metodo" tone="soft" layout="split" eyebrow="Cómo trabajamos" title="Del aprendizaje a la documentación.">
        <ol className={layout.processList}>
          {process.map((item, index) => (
            <li key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</li>
          ))}
        </ol>
      </Section>

      <Section
        id="evidencia"
        layout="split"
        eyebrow="Evidencia real"
        title="El proceso se mostrará con contexto y autorización."
        lede="Fotografías, cuadernos, componentes, sesiones y validaciones se incorporarán únicamente cuando puedan documentarse sin confundir una simulación con un prototipo ni una fase con otra."
      >
        <aside className={styles.evidenceState} aria-labelledby="evidence-state-title">
          <span>Edición 2027 · evidencia pública</span>
          <h3 id="evidence-state-title">Aún no publicada</h3>
          <p>No existe todavía fotografía documental 2027 autorizada para mostrarse como evidencia de proceso.</p>
          <dl>
            <div><dt>Fotografía</dt><dd>Con consentimiento y contexto verificable.</dd></div>
            <div><dt>Prototipos</dt><dd>Solo material real, identificado por etapa.</dd></div>
            <div><dt>Accesibilidad</dt><dd>Texto alternativo y pie de foto cuando corresponda.</dd></div>
          </dl>
        </aside>
      </Section>

      <Section
        id="continuidad"
        tone="soft"
        eyebrow="Continuidad"
        title="BrailleTech es una iniciativa anual. BrailleLab permanece."
        lede="La edición 2027 organiza un ciclo concreto de formación, diseño, prototipado y Demo Day dentro de una línea de trabajo más amplia."
        action={<>
          <ArrowLink href="/reto" primary>Conocer BrailleTech 2027</ArrowLink>
          <ArrowLink href="/alianzas">Apoya y colabora</ArrowLink>
        </>}
      />
    </SiteShell>
  );
}
