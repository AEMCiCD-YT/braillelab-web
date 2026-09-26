export function BrailleDots({ dark = false }) {
  return <div className={`braille-dots ${dark ? "dark" : ""}`} aria-label="Representación de una celda Braille de seis puntos">{[1, 4, 2, 5, 3, 6].map((item) => <span key={item}>{item}</span>)}</div>;
}

export function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}
