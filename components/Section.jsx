import { Eyebrow } from "./Visuals";
import styles from "./Section.module.css";

// Sección estándar de las páginas: etiqueta, título, entrada y acción opcional,
// en tono blanco («plain») o gris claro («soft»). Con layout="split" el encabezado
// va a la izquierda y el contenido a la derecha; `intro` se añade bajo la entrada.
export default function Section({
  id,
  tone = "plain",
  layout = "stack",
  eyebrow,
  title,
  lede,
  intro,
  action,
  children,
  className = "",
}) {
  const headingId = id ? `${id}-titulo` : undefined;
  const sectionClass = [styles.section, tone === "soft" ? styles.soft : "", layout === "split" ? styles.split : ""].join(" ");

  const header = title ? (
    <header className={styles.header}>
      <div className={styles.heading}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 id={headingId}>{title}</h2>
        {lede ? <p className={styles.lede}>{lede}</p> : null}
        {intro}
      </div>
      {action ? <div className={styles.action}>{action}</div> : null}
    </header>
  ) : null;

  return (
    <section id={id} className={sectionClass} aria-labelledby={title ? headingId : undefined}>
      <div className={`wrap ${styles.inner} ${className}`}>
        {header}
        {children ? <div className={styles.body}>{children}</div> : null}
      </div>
    </section>
  );
}
