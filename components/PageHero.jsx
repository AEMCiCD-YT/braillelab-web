import { Eyebrow } from "./Visuals";
import PageHeroVisual from "./PageHeroVisual";
import styles from "./PageHero.module.css";

export default function PageHero({ eyebrow, title, children, visual = "lab", accent = "cyan" }) {
  return (
    <section className={styles.hero}>
      <div className={`wrap ${styles.grid}`}>
        <div>
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.copy}>{children}</p>
        </div>
        <PageHeroVisual variant={visual} accent={accent} />
      </div>
    </section>
  );
}
