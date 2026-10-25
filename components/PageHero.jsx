import { Eyebrow } from "./Visuals";
import PageHeroVisual from "./PageHeroVisual";
import styles from "./PageHero.module.css";

export default function PageHero({ eyebrow, title, children, visual = "lab", accent = "cyan", locale = "es" }) {
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <div data-enter="" style={{ "--enter": ".1s" }}><Eyebrow tone="dark">{eyebrow}</Eyebrow></div>
          <h1 className={styles.title} data-enter="" style={{ "--enter": ".22s" }}>{title}</h1>
          <p className={styles.copy} data-enter="" style={{ "--enter": ".4s" }}>{children}</p>
        </div>
        <div data-enter="" style={{ "--enter": ".5s" }}><PageHeroVisual variant={visual} accent={accent} locale={locale} /></div>
      </div>
    </section>
  );
}
