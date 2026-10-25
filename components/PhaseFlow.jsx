import styles from "./PhaseFlow.module.css";
import { ArrowUpRight } from "lucide-react";
import { localizePath } from "../lib/i18n.mjs";

const copy = {
  es: {
    label: "Recorrido de BrailleTech Challenge",
    phases: [
      ["01", "Formación y diseño", "Bootcamp · 15–28 feb. 2027"],
      ["02", "Design Review", "27 mar. 2027"],
      ["03", "Prototipado", "31 mar.–5 jun. 2027"],
      ["04", "Demo Day", "12 jun. 2027 · Yachay Tech"],
    ],
  },
  en: {
    label: "BrailleTech Challenge journey",
    phases: [
      ["01", "Training and design", "Bootcamp · Feb 15–28, 2027"],
      ["02", "Design Review", "Mar 27, 2027"],
      ["03", "Prototyping", "Mar 31–Jun 5, 2027"],
      ["04", "Demo Day", "Jun 12, 2027 · Yachay Tech"],
    ],
  },
};

export default function PhaseFlow({ locale = "es" }) {
  const t = copy[locale] || copy.es;
  return <ol className={styles.journey} aria-label={t.label} data-reveal="" data-stagger="">{t.phases.map(([number, title, detail]) => <li key={number}><a href={localizePath("/cronograma", locale)}><b>{number}</b><span>{title}<small>{detail}</small></span><ArrowUpRight aria-hidden="true" size={18} /></a></li>)}</ol>;
}
