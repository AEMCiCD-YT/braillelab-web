import SiteShell from "../../components/SiteShell";
import PageHero from "../../components/PageHero";
import BrailleCellDiagram from "../../components/BrailleCellDiagram";
import { Eyebrow } from "../../components/Visuals";
import layout from "../public.module.css";

export const metadata = { title: "El reto · 2027" };

export default function RetoPage() {
  const cards = [
    ["01", "Requisito mínimo", "Una celda Braille refrescable de seis puntos, funcional y controlable electrónicamente."],
    ["02", "Principios de diseño", "Accesible, funcional, abierto, modular, reparable y reproducible."],
    ["03", "Posibilidades", "Multicelda, teclado, conexión a computadora, Bluetooth, batería y modularidad son posibilidades, no requisitos adicionales."],
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

      <section className={`wrap ${layout.section} ${layout.cards}`}>
        {cards.map(([number, title, text]) => (
          <article className={layout.card} key={number}>
            <span className={layout.cardIndex}>{number}</span>
            <h2>{title}</h2>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className={layout.surfaceSoft}>
        <div className={`wrap ${layout.twoColumn}`}>
          <BrailleCellDiagram />
          <div>
            <Eyebrow>Seis puntos</Eyebrow>
            <h2>Una representación clara del reto.</h2>
            <p className={layout.bodyCopy}>
              El equipo deberá demostrar una celda Braille refrescable de seis puntos funcionales y controlables electrónicamente. La Guía Técnica 2027 desarrollará el alcance de diseño, prueba y documentación.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
