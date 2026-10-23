import { ArrowDown } from "lucide-react";
import styles from "./PageHeroVisual.module.css";
import { brandAssets } from "../content/brand";
import { brailleGridOrder, letterDots } from "../content/braille";
import { getResourceGroups, getResources, site } from "../content/site";

const copy = {
  es: {
    cell: "CELDA · 6 PUNTOS", letter: "r", letterTag: "«r» de reto", control: "control electrónico",
    team: "EQUIPO", teamNote: "interdisciplinario · inter-IES permitido",
    route: "RUTA", prototype: "Prototipo",
    docIndex: "Índice de documentos", docs: "DOCUMENTOS", docCount: (group) => `${group.name}: ${group.ids.length} documentos`,
    ledger: "LIBRO", verified: "VERIFICADO", rows: ["Recaudado", "Utilizado", "Por cubrir"], ledgerNote: "registros de tesorería · sin datos personales",
    lab: "Relieve · activación · sistema modular",
    collaborate: "COLABORAR", scope: "CON ALCANCE", nodes: ["Técnico", "Difusión", "Institucional"],
  },
  en: {
    cell: "CELL · 6 DOTS", letter: "c", letterTag: "«c» for challenge", control: "electronic control",
    team: "TEAM", teamNote: "interdisciplinary · multi-institution allowed",
    route: "ROUTE", prototype: "Prototype",
    docIndex: "Document index", docs: "DOCUMENTS", docCount: (group) => `${group.name}: ${group.ids.length} documents`,
    ledger: "LEDGER", verified: "VERIFIED", rows: ["Raised", "Used", "To cover"], ledgerNote: "treasury records · no personal data",
    lab: "Relief · actuation · modular system",
    collaborate: "COLLABORATE", scope: "WITH SCOPE", nodes: ["Technical", "Outreach", "Institutional"],
  },
};

function SixPointCell({ letter }) {
  const dots = letterDots(letter);
  return (
    <div className={styles.sixCell}>
      {brailleGridOrder.map((dot) => <span key={dot} data-active={dots.includes(dot) || undefined} />)}
    </div>
  );
}

function ChallengeVisual({ t }) {
  return (
    <div className={styles.challenge}>
      <div className={styles.visualMeta}><span>{t.cell}</span><b className={styles.letterTag}>{t.letterTag}</b></div>
      <SixPointCell letter={t.letter} />
      <div className={styles.signalLine}><i /><i /><i /></div>
      <small>{t.control}</small>
    </div>
  );
}

function ParticipateVisual({ t }) {
  return (
    <div className={styles.participate}>
      <div className={styles.visualMeta}><span>{t.team}</span><b>3–5</b></div>
      <div className={styles.memberGrid}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={index < 3 ? styles.memberRequired : styles.memberOptional}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
          </div>
        ))}
      </div>
      <small>{t.teamNote}</small>
    </div>
  );
}

function TimelineVisual({ t }) {
  const phases = [
    ["01", "Bootcamp"],
    ["02", "Review"],
    ["03", t.prototype],
    ["04", "Demo"],
  ];

  return (
    <div className={styles.timeline}>
      <div className={styles.visualMeta}><span>{t.route}</span><b>2027</b></div>
      <ol>
        {phases.map(([number, label]) => (
          <li key={number}><b>{number}</b><span>{label}</span></li>
        ))}
      </ol>
    </div>
  );
}

function ResourcesVisual({ t, locale }) {
  const published = getResources(locale).filter((item) => item.href);
  return (
    <nav className={styles.resources} aria-label={t.docIndex}>
      <div className={styles.visualMeta}><span>{t.docs}</span><b>{site.event.edition}</b></div>
      <ol className={styles.docStack}>
        {getResourceGroups(locale).map((group, index) => (
          <li key={group.id}>
            <a href={`#${group.id}`} aria-label={t.docCount(group)}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{group.name}</strong>
              <em>{group.ids.length}<ArrowDown aria-hidden="true" size={16} /></em>
            </a>
          </li>
        ))}
      </ol>
      <small>{published.length} PDF · {published[0]?.version}</small>
    </nav>
  );
}

function TransparencyVisual({ t }) {
  const rows = [
    ["IN", t.rows[0]],
    ["OUT", t.rows[1]],
    ["GAP", t.rows[2]],
  ];

  return (
    <div className={styles.transparency}>
      <div className={styles.visualMeta}><span>{t.ledger}</span><b>{t.verified}</b></div>
      <div className={styles.ledger}>
        {rows.map(([code, label]) => (
          <div key={code}><span>{code}</span><strong>{label}</strong><i /></div>
        ))}
      </div>
      <small>{t.ledgerNote}</small>
    </div>
  );
}

function LabVisual({ t }) {
  return (
    <div className={styles.labBrand}>
      <img
        src={brandAssets.markNegative}
        alt=""
        aria-hidden="true"
      />
      <small>{t.lab}</small>
    </div>
  );
}

function AlliancesVisual({ t }) {
  const nodes = t.nodes;

  return (
    <div className={styles.alliances}>
      <div className={styles.visualMeta}><span>{t.collaborate}</span><b>{t.scope}</b></div>
      <div className={styles.network}>
        <svg className={styles.networkLines} viewBox="0 0 100 100" preserveAspectRatio="none">
          <line x1="50" y1="50" x2="50" y2="18" />
          <line x1="50" y1="50" x2="20" y2="82" />
          <line x1="50" y1="50" x2="80" y2="82" />
        </svg>
        <div className={styles.networkCenter}>BrailleLab</div>
        {nodes.map((label, index) => (
          <div key={label} className={styles.networkNode} data-index={index}>{label}</div>
        ))}
      </div>
    </div>
  );
}

export default function PageHeroVisual({ variant = "lab", accent = "cyan", locale = "es" }) {
  const t = copy[locale] || copy.es;
  // El índice de Recursos tiene enlaces reales; el resto de visuales son decorativos.
  const interactive = variant === "resources";
  const visual = {
    challenge: <ChallengeVisual t={t} />,
    participate: <ParticipateVisual t={t} />,
    timeline: <TimelineVisual t={t} />,
    resources: <ResourcesVisual t={t} locale={locale} />,
    transparency: <TransparencyVisual t={t} />,
    lab: <LabVisual t={t} />,
    alliances: <AlliancesVisual t={t} />,
  }[variant] || <LabVisual t={t} />;

  return (
    <div
      className={variant === "lab" ? `${styles.visual} ${styles.brandVisual}` : styles.visual}
      data-accent={accent}
      aria-hidden={interactive ? undefined : "true"}
    >
      {visual}
    </div>
  );
}
