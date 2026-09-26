import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import BrailleCellDiagram from "../../components/BrailleCellDiagram";

export const metadata = { title: "El reto · 2027" };

export default function RetoPage() {
  return <SiteShell><PageHero eyebrow="El reto · edición 2027" title={<>Construir una interfaz Braille que <em>responda.</em></>} visual="Diagrama técnico de celda" accent="petrol">La edición 2027 aborda tecnología Braille electrónica refrescable con un enfoque funcional, abierto y reproducible.</PageHero><section className="section wrap cards">{[["01", "Requisito mínimo", "Una celda Braille refrescable de seis puntos, funcional y controlable electrónicamente."], ["02", "Principios de diseño", "Accesible, funcional, abierto, modular, reparable y reproducible."], ["03", "Posibilidades", "Multicelda, teclado, conexión a computadora, Bluetooth, batería y modularidad son posibilidades, no requisitos adicionales."]].map(([number, title, text]) => <article className="card" key={number}><span className="card-index">{number}</span><h2>{title}</h2><p>{text}</p></article>)}</section><section className="cloud-section"><div className="wrap two-column"><BrailleCellDiagram /><div><p className="eyebrow">Seis puntos</p><h2>Una representación clara del reto.</h2><p className="body-copy">El equipo deberá demostrar una celda Braille refrescable de seis puntos funcionales y controlables electrónicamente. La Guía Técnica 2027 desarrollará el alcance de diseño, prueba y documentación.</p></div></div></section></SiteShell>;
}
