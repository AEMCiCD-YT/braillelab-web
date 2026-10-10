import { ArrowDown } from "lucide-react";
import styles from "./PageHeroVisual.module.css";
import { brandAssets } from "../content/brand";
import { brailleGridOrder, letterDots } from "../content/braille";
import { resourceGroups, site } from "../content/site";

function SixPointCell({ letter }) {
  const dots = letterDots(letter);
  return (
    <div className={styles.sixCell}>
      {brailleGridOrder.map((dot) => <span key={dot} data-active={dots.includes(dot) || undefined} />)}
    </div>
  );
}

function ChallengeVisual() {
  return (
    <div className={styles.challenge}>
      <div className={styles.visualMeta}><span>CELDA · 6 PUNTOS</span><b className={styles.letterTag}>«r» de reto</b></div>
      <SixPointCell letter="r" />
      <div className={styles.signalLine}><i /><i /><i /></div>
      <small>control electrónico</small>
    </div>
  );
}

function ParticipateVisual() {
  return (
    <div className={styles.participate}>
      <div className={styles.visualMeta}><span>EQUIPO</span><b>3–5</b></div>
      <div className={styles.memberGrid}>
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className={index < 3 ? styles.memberRequired : styles.memberOptional}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <i />
          </div>
        ))}
      </div>
      <small>interdisciplinario · inter-IES permitido</small>
    </div>
  );
}

function TimelineVisual() {
  const phases = [
    ["01", "Bootcamp"],
    ["02", "Review"],
    ["03", "Prototipo"],
    ["04", "Demo"],
  ];

  return (
    <div className={styles.timeline}>
      <div className={styles.visualMeta}><span>RUTA</span><b>2027</b></div>
      <ol>
        {phases.map(([number, label]) => (
          <li key={number}><b>{number}</b><span>{label}</span></li>
        ))}
      </ol>
    </div>
  );
}

function ResourcesVisual() {
  const published = site.resources.filter((item) => item.href);
  return (
    <nav className={styles.resources} aria-label="Índice de documentos">
      <div className={styles.visualMeta}><span>DOCUMENTOS</span><b>{site.event.edition}</b></div>
      <ol className={styles.docStack}>
        {resourceGroups.map((group, index) => (
          <li key={group.id}>
            <a href={`#${group.id}`} aria-label={`${group.name}: ${group.ids.length} documentos`}>
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

function TransparencyVisual() {
  const rows = [
    ["IN", "Recaudado"],
    ["OUT", "Utilizado"],
    ["GAP", "Por cubrir"],
  ];

  return (
    <div className={styles.transparency}>
      <div className={styles.visualMeta}><span>LIBRO</span><b>VERIFICADO</b></div>
      <div className={styles.ledger}>
        {rows.map(([code, label]) => (
          <div key={code}><span>{code}</span><strong>{label}</strong><i /></div>
        ))}
      </div>
      <small>registros de tesorería · sin datos personales</small>
    </div>
  );
}

function LabVisual() {
  return (
    <div className={styles.labBrand}>
      <img
        src={brandAssets.markNegative}
        alt=""
        aria-hidden="true"
      />
      <small>Relieve · activación · sistema modular</small>
    </div>
  );
}

function AlliancesVisual() {
  const nodes = ["Técnico", "Difusión", "Institucional"];

  return (
    <div className={styles.alliances}>
      <div className={styles.visualMeta}><span>COLABORAR</span><b>CON ALCANCE</b></div>
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

export default function PageHeroVisual({ variant = "lab", accent = "cyan" }) {
  // El índice de Recursos tiene enlaces reales; el resto de visuales son decorativos.
  const interactive = variant === "resources";
  const visual = {
    challenge: <ChallengeVisual />,
    participate: <ParticipateVisual />,
    timeline: <TimelineVisual />,
    resources: <ResourcesVisual />,
    transparency: <TransparencyVisual />,
    lab: <LabVisual />,
    alliances: <AlliancesVisual />,
  }[variant] || <LabVisual />;

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
