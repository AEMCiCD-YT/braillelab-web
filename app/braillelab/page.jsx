import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import styles from "./braillelab.module.css";

export const metadata = { title: "BrailleLab Ecuador" };

const process = [
  "Investigación aplicada",
  "Diseño",
  "Prueba y revisión",
  "Iteración",
  "Documentación",
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

      <section className="wrap two-column section">
        <div>
          <p className="eyebrow">Cómo trabajamos</p>
          <h2>Del aprendizaje a la documentación.</h2>
        </div>
        <ol className="process-list">
          {process.map((item, index) => (
            <li key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</li>
          ))}
        </ol>
      </section>

      <section className="cloud-section">
        <div className={`wrap two-column ${styles.evidenceGrid}`}>
          <aside className={styles.evidenceState} aria-labelledby="evidence-state-title">
            <span>Edición 2027 · evidencia pública</span>
            <h2 id="evidence-state-title">Aún no publicada</h2>
            <p>No existe todavía fotografía documental 2027 autorizada para mostrarse como evidencia de proceso.</p>
            <dl>
              <div><dt>Fotografía</dt><dd>Con consentimiento y contexto verificable.</dd></div>
              <div><dt>Prototipos</dt><dd>Solo material real, identificado por etapa.</dd></div>
              <div><dt>Accesibilidad</dt><dd>Texto alternativo y pie de foto cuando corresponda.</dd></div>
            </dl>
          </aside>

          <div>
            <p className="eyebrow">Evidencia real</p>
            <h2>El proceso se mostrará con contexto y autorización.</h2>
            <p className="body-copy">
              Fotografías, cuadernos, componentes, sesiones y validaciones se incorporarán únicamente cuando puedan documentarse sin confundir una simulación con un prototipo ni una fase con otra.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
