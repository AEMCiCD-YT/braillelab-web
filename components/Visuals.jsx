import styles from "./Visuals.module.css";

export function BrailleDots({ dark = false }) {
  return (
    <div
      className={dark ? `${styles.brailleDots} ${styles.dark}` : styles.brailleDots}
      aria-label="Representación de una celda Braille de seis puntos"
    >
      {[1, 4, 2, 5, 3, 6].map((item) => <span key={item}>{item}</span>)}
    </div>
  );
}

export function Eyebrow({ children, tone = "default" }) {
  const className = tone === "dark" ? `${styles.eyebrow} ${styles.onDark}` : styles.eyebrow;
  return <p className={className}>{children}</p>;
}
