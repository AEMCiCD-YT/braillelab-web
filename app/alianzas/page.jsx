import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import { Eyebrow } from "../../components/Visuals";
import { site } from "../../content/site";
import layout from "../public.module.css";
import styles from "./alianzas.module.css";

export const metadata = { title: "Aliados y contacto" };

const support = [
  ["Patrocinio", "Apoyo económico o en especie sujeto a acuerdo aplicable."],
  ["Mentoría", "Acompañamiento técnico o profesional en etapas definidas."],
  ["Difusión", "Conexión con comunidades e instituciones de educación superior."],
  ["Recursos técnicos", "Aportes compatibles con las necesidades y condiciones vigentes."],
  ["Vinculación institucional", "Posibles espacios de colaboración con alcance documentado."],
];

export default function AlianzasPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Aliados y contacto"
        title="La colaboración impulsa soluciones accesibles."
        visual="alliances"
        accent="signal"
      >
        Organizaciones, mentores e instituciones pueden aportar al desarrollo de tecnología Braille abierta y reproducible.
      </PageHero>

      <section className={`wrap ${layout.section} ${styles.coorg}`}>
        <div>
          <Eyebrow>Coorganización 2027</Eyebrow>
          <h2>El Challenge se articula desde la comunidad universitaria.</h2>
          <p>La coorganización vigente se comunica por nombre institucional; los patrocinadores y aliados externos se publican únicamente cuando exista confirmación y autorización para difusión.</p>
        </div>
        <div className={styles.names}>
          <span>AEMCiCD · Universidad Yachay Tech</span>
          <span>IEEE Student Branch · Universidad Yachay Tech</span>
        </div>
      </section>

      <section className={layout.surfaceSoft}>
        <div className="wrap">
          <Eyebrow>Modalidades de colaboración</Eyebrow>
          <h2>Apoyos distintos para necesidades distintas.</h2>
          <div className={layout.support}>
            {support.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`wrap ${layout.section} ${styles.confirmed}`}>
        <div>
          <Eyebrow>Aliados confirmados</Eyebrow>
          <h2>Tu organización puede formar parte de BrailleTech Challenge Ecuador 2027.</h2>
          <p>Los patrocinadores confirmados podrán contar con presencia institucional en este espacio y en las piezas correspondientes, de acuerdo con el alcance acordado.</p>
        </div>
        <aside className={styles.emptyState}>
          <span>Espacio para patrocinadores</span>
          <strong>Tu logo puede estar aquí.</strong>
          <p>Conversemos sobre patrocinio, recursos técnicos o apoyo al Demo Day 2027.</p>
        </aside>
      </section>

      <section className={layout.darkCta}>
        <div className="wrap">
          <Eyebrow tone="dark">Contacto institucional</Eyebrow>
          <h2>Conversemos sobre una colaboración con alcance definido.</h2>
          <p>Escríbenos a <a href={`mailto:${site.contact}`}>{site.contact}</a>.</p>
          <a className="button button-primary" href={`mailto:${site.contact}`}>Contactar a BrailleLab</a>
        </div>
      </section>
    </SiteShell>
  );
}
