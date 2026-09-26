import { Eyebrow } from "./Visuals";
import PageHeroVisual from "./PageHeroVisual";

export default function PageHero({ eyebrow, title, children, visual = "lab", accent = "cyan" }) {
  return (
    <section className="page-hero">
      <div className="wrap page-hero-grid">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{children}</p>
        </div>
        <PageHeroVisual variant={visual} accent={accent} />
      </div>
    </section>
  );
}
