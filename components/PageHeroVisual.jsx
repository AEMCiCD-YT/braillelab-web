import styles from "./PageHeroVisual.module.css";
import { brandAssets } from "../content/brand";

const sixDots = [1, 4, 2, 5, 3, 6];

function SixPointCell() {
  return (
    <div className={styles.sixCell}>
      {sixDots.map((dot) => <span key={dot} data-dot={dot} />)}
    </div>
  );
}

function MiniCell({ active = [0, 2, 5] }) {
  return (
    <div className={styles.miniCell}>
      {Array.from({ length: 6 }).map((_, index) => (
        <span key={index} className={active.includes(index) ? styles.active : undefined} />
      ))}
    </div>
  );
}

function ChallengeVisual() {
  return (
    <div className={styles.challenge}>
      <div className={styles.visualMeta}><span>CELDA</span><b>6 PUNTOS</b></div>
      <SixPointCell />
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
  return (
    <div className={styles.resources}>
      <div className={styles.visualMeta}><span>FUENTES</span><b>2027</b></div>
      <div className={styles.docStack}>
        {[
          ["01", "BASES"],
          ["02", "GUÍA"],
          ["03", "CRONO"],
        ].map(([number, label]) => (
          <div key={number}><span>{number}</span><strong>{label}</strong><i /></div>
        ))}
      </div>
      <small>publicación controlada por versión</small>
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
  const visual = {
    challenge: <ChallengeVisual />,
    participate: <ParticipateVisual />,
    timeline: <TimelineVisual />,
    resources: <ResourcesVisual />,
    lab: <LabVisual />,
    alliances: <AlliancesVisual />,
  }[variant] || <LabVisual />;

  return (
    <div
      className={variant === "lab" ? `${styles.visual} ${styles.brandVisual}` : styles.visual}
      data-accent={accent}
      aria-hidden="true"
    >
      {visual}
    </div>
  );
}
