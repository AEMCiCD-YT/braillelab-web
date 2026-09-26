import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import { site } from "../../content/site";

export const metadata = { title: "Aliados y contacto" };
const support = [["Patrocinio", "Apoyo económico o en especie sujeto a acuerdo aplicable."], ["Mentoría", "Acompañamiento técnico o profesional en etapas definidas."], ["Difusión", "Conexión con comunidades e instituciones de educación superior."], ["Recursos técnicos", "Aportes compatibles con las necesidades y condiciones vigentes."], ["Vinculación institucional", "Posibles espacios de colaboración con alcance documentado."]];

export default function AlianzasPage() {
  return <SiteShell><PageHero eyebrow="Aliados y contacto" title="La colaboración impulsa soluciones accesibles." visual="alliances" accent="signal">Organizaciones, mentores e instituciones pueden aportar al desarrollo de tecnología Braille abierta y reproducible.</PageHero><section className="section wrap support">{support.map(([title, copy]) => <article key={title}><h2>{title}</h2><p>{copy}</p></article>)}</section><section className="dark-cta"><div className="wrap"><p className="eyebrow">Contacto</p><h2>Conversemos sobre una colaboración.</h2><p>Escríbenos a <a href={`mailto:${site.contact}`}>{site.contact}</a>.</p></div></section></SiteShell>;
}
