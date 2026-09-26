import styles from "./PhaseFlow.module.css";
import { ArrowUpRight } from "lucide-react";

const phases = [
  ["01", "Formación y diseño", "Bootcamp · 15–28 feb. 2027"],
  ["02", "Design Review", "27 mar. 2027"],
  ["03", "Prototipado", "31 mar.–5 jun. 2027"],
  ["04", "Demo Day", "12 jun. 2027 · Yachay Tech"],
];

export default function PhaseFlow() {
  return <ol className={styles.journey} aria-label="Recorrido de BrailleTech Challenge">{phases.map(([number, title, detail]) => <li key={number}><a href="/cronograma"><b>{number}</b><span>{title}<small>{detail}</small></span><ArrowUpRight aria-hidden="true" size={18} /></a></li>)}</ol>;
}
