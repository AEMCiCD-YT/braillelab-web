import { faqGroups } from "../content/faq";
import styles from "./Faq.module.css";

export default function Faq() {
  return <div className={styles.faq}>{faqGroups.map((group) => <div className={styles.group} key={group.title}><h3>{group.title}</h3>{group.items.map(([question, answer]) => <details className={styles.item} key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>)}</div>;
}
