import SiteShell, { ArrowLink, EventActionLink, EventStatusLine } from "../components/SiteShell";
import { Eyebrow, SolidPlaceholder } from "../components/Visuals";
import BrailleCellDiagram from "../components/BrailleCellDiagram";
import PhaseFlow from "../components/PhaseFlow";

const facts = [
  ["13–31 ene.", "Inscripciones 2027"],
  ["3 a 5", "Integrantes por equipo"],
  ["Hasta 20", "Equipos admitidos"],
  ["12 jun.", "Demo Day · Yachay Tech"],
];

export default function Home() {
  return <SiteShell>
    <section className="hero"><div className="hero-glow" aria-hidden="true" /><div className="wrap hero-grid"><div className="reveal"><Eyebrow>BrailleLab Ecuador presenta</Eyebrow><h1>BrailleTech <em>Challenge</em> Ecuador 2027</h1><p className="lede">Un reto para diseñar y demostrar tecnología Braille electrónica refrescable desde Ecuador.</p><div className="actions"><EventActionLink primary /><ArrowLink href="/reto">Conocer el reto</ArrowLink></div><p className="hero-note"><EventStatusLine /></p></div><SolidPlaceholder label="Diagrama o macro de prototipo" accent="night" /></div></section>
    <section className="wrap fact-rail" aria-label="Datos esenciales">{facts.map(([value, label]) => <article key={value}><strong>{value}</strong><span>{label}</span></article>)}</section>
    <section className="wrap challenge-intro"><div><Eyebrow>El desafío</Eyebrow><h2>Una celda. Seis puntos.<br />Muchas posibilidades.</h2><p>El requisito competitivo mínimo es una celda Braille refrescable de seis puntos funcional y controlable electrónicamente.</p><ArrowLink href="/reto">Ver alcance técnico</ArrowLink></div><BrailleCellDiagram /></section>
    <section className="cloud-section"><div className="wrap"><Eyebrow>Recorrido 2027</Eyebrow><h2>Del diseño a la demostración pública.</h2><PhaseFlow /></div></section>
    <section className="wrap value-section"><div><Eyebrow>Por qué importa</Eyebrow><h2>Tecnología que puede abrirse, repararse y reproducirse.</h2></div><ul>{["Accesibilidad", "Funcionalidad", "Conocimiento abierto", "Modularidad", "Reparación", "Reproducibilidad"].map((value) => <li key={value}>{value}</li>)}</ul></section>
    <section className="dark-cta"><div className="wrap cta-content"><div><Eyebrow>Próximo paso</Eyebrow><h2>Consulta las fases y prepara a tu equipo.</h2><p>La inscripción 2027 se habilitará únicamente mediante el formulario oficial publicado por la organización.</p></div><EventActionLink primary /></div></section>
  </SiteShell>;
}
