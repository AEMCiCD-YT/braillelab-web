"use client";

import Link from "next/link";
import { campaign, dateTimeLabel, usd, TRANSPARENCY_PAGE } from "../../content/campaign";
import { site } from "../../content/site";
import { localizePath } from "../../lib/i18n.mjs";
import { useLocale } from "../useLocale";
import { useCampaign } from "./CampaignDataProvider";
import styles from "./Campaign.module.css";

const copy = {
  es: {
    loading: "Cargando las cifras de la campaña…",
    unconfigured: "Las cifras en vivo todavía no están conectadas a la plataforma de la asociación. Para conocer el avance escribe a",
    notPublished: "La campaña aún no publica cifras de avance. La meta y el presupuesto de arriba son los aprobados; los montos recibidos se mostrarán cuando estén verificados y su publicación esté autorizada.",
    unavailable: "No pudimos cargar las cifras en este momento. No mostramos montos para no dar datos incorrectos.",
    retry: "Reintentar",
    goal: "Meta técnica total",
    milestone: "Primer hito acumulativo",
    stale: (date) => `Datos desactualizados: mostramos el último corte publicado (${date}) porque la actualización no está disponible ahora.`,
    bar: (percent, reached, target) => `Avance del primer hito: ${percent}, ${reached} de ${target}`,
    cash: "Efectivo recibido y verificado (neto)",
    gross: "Bruto",
    refunds: "devoluciones",
    reversals: "reversos",
    goalProgress: "Avance hacia la meta total",
    goalProgressNote: "Solo cuenta efectivo verificado en el banco.",
    paid: "Gasto pagado",
    committed: "Comprometido pendiente",
    inKind: "Aportes en especie (aparte del efectivo)",
    inKindNote: "Costo del presupuesto cubierto con bienes aceptados y valorados.",
    pending: "Necesidad pendiente",
    pendingNote: "Meta − efectivo verificado − costo cubierto en especie.",
    empty: "Todavía no hay aportes verificados.",
    hidden: "Las cifras de avance de esta campaña no están publicadas.",
    asOf: (date, version) => `Datos al ${date} · versión ${version}. Los avisos de transferencia pendientes de revisión, las promesas y las transferencias internas no se suman.`,
    detail: "Ver transparencia detallada",
  },
  en: {
    loading: "Loading campaign figures…",
    unconfigured: "Live figures are not yet connected to the association's platform. To learn about the progress, write to",
    notPublished: "The campaign has not published progress figures yet. The goal and budget above are the approved ones; amounts received will be shown once they are verified and their publication is authorized.",
    unavailable: "We could not load the figures right now. We do not show amounts so as not to give incorrect data.",
    retry: "Try again",
    goal: "Total technical goal",
    milestone: "Cumulative first milestone",
    stale: (date) => `Outdated data: we are showing the last published snapshot (${date}) because the update is not available right now.`,
    bar: (percent, reached, target) => `First milestone progress: ${percent}, ${reached} of ${target}`,
    cash: "Cash received and verified (net)",
    gross: "Gross",
    refunds: "refunds",
    reversals: "reversals",
    goalProgress: "Progress toward the total goal",
    goalProgressNote: "Only cash verified at the bank counts.",
    paid: "Paid expenses",
    committed: "Pending commitments",
    inKind: "In-kind contributions (separate from cash)",
    inKindNote: "Budgeted cost covered by goods that were accepted and valued.",
    pending: "Remaining need",
    pendingNote: "Goal − verified cash − cost covered in kind.",
    empty: "There are no verified contributions yet.",
    hidden: "Progress figures for this campaign are not published.",
    asOf: (date, version) => `Data as of ${date} · version ${version}. Transfer reports pending review, pledges and internal transfers are not counted.`,
    detail: "See detailed transparency",
  },
};

function percent(basisPoints, locale) {
  return `${(Math.max(0, Math.min(basisPoints, 10_000)) / 100).toLocaleString(locale === "en" ? "en-US" : "es-EC", { maximumFractionDigits: 1 })} %`;
}

function DataNotice({ state, onRetry, t }) {
  if (state === "loading") {
    return <p className={styles.dataNotice} role="status">{t.loading}</p>;
  }
  if (state === "unconfigured") {
    return (
      <p className={styles.dataNotice} role="status">
        {t.unconfigured}{" "}
        <a href={`mailto:${site.contacts.partnerships}`}>{site.contacts.partnerships}</a>.
      </p>
    );
  }
  if (state === "not-published") {
    return <p className={styles.dataNotice} role="status">{t.notPublished}</p>;
  }
  return (
    <div className={`${styles.dataNotice} ${styles.dataNoticeAlert}`} role="alert">
      <p>{t.unavailable}</p>
      <button type="button" className="button button-secondary" onClick={onRetry}>{t.retry}</button>
    </div>
  );
}

/** Meta, primer hito y cifras verificadas. Efectivo y especie siempre por separado. */
export default function CampaignProgress() {
  const locale = useLocale();
  const t = copy[locale];
  const money = (amount) => usd(amount, locale);
  const { state, data, retry } = useCampaign();
  const ready = state === "ready" && data;
  const cash = ready ? data.cash : null;
  const execution = ready ? data.execution : null;
  const inKind = ready ? data.inKind : null;
  const milestone = ready ? data.budget?.milestones?.[0] : null;

  return (
    <div className={styles.progress} aria-busy={state === "loading"}>
      <div className={styles.goalRow}>
        <div>
          <span className={styles.label}>{t.goal}</span>
          <strong className={styles.bigFigure}>{money(ready ? data.goal : campaign.goal)}</strong>
        </div>
        <div>
          <span className={styles.label}>{t.milestone}</span>
          <strong className={styles.bigFigure}>{money(milestone?.target ?? campaign.firstMilestone)}</strong>
        </div>
      </div>

      {!ready && <DataNotice state={state} onRetry={retry} t={t} />}

      {ready && (
        <>
          {data.publication.freshness === "stale" && (
            <p className={`${styles.dataNotice} ${styles.dataNoticeAlert}`} role="status">
              {t.stale(dateTimeLabel(data.publication.asOf, locale))}
            </p>
          )}
          {cash ? (
            <>
              <div
                className={styles.bar}
                role="img"
                aria-label={t.bar(percent(milestone?.progressBasisPoints ?? 0, locale), money(milestone?.reachedAmount), money(milestone?.target))}
              >
                <span style={{ width: `${Math.max(0, Math.min(milestone?.progressBasisPoints ?? 0, 10_000)) / 100}%` }} />
              </div>
              <dl className={styles.figures}>
                <div>
                  <dt>{t.cash}</dt>
                  <dd>{money(cash.netReceived)}</dd>
                  <dd className={styles.figureNote}>
                    {t.gross} {money(cash.grossIncome)}
                    {cash.refunds !== "0.00" && ` · ${t.refunds} ${money(cash.refunds)}`}
                    {cash.reversals !== "0.00" && ` · ${t.reversals} ${money(cash.reversals)}`}
                  </dd>
                </div>
                <div>
                  <dt>{t.goalProgress}</dt>
                  <dd>{percent(cash.goalProgressBasisPoints, locale)}</dd>
                  <dd className={styles.figureNote}>{t.goalProgressNote}</dd>
                </div>
                {execution && (
                  <div>
                    <dt>{t.paid}</dt>
                    <dd>{money(execution.paid)}</dd>
                    <dd className={styles.figureNote}>{t.committed} {money(execution.committedPending)}</dd>
                  </div>
                )}
                {inKind && (
                  <div>
                    <dt>{t.inKind}</dt>
                    <dd>{money(inKind.substituted)}</dd>
                    <dd className={styles.figureNote}>{t.inKindNote}</dd>
                  </div>
                )}
                <div>
                  <dt>{t.pending}</dt>
                  <dd>{money(data.pendingMonetaryNeed)}</dd>
                  <dd className={styles.figureNote}>{t.pendingNote}</dd>
                </div>
              </dl>
              {data.dataState === "empty" && <p className={styles.muted}>{t.empty}</p>}
            </>
          ) : (
            <p className={styles.dataNotice} role="status">{t.hidden}</p>
          )}
          <p className={styles.meta}>
            {t.asOf(dateTimeLabel(data.publication.asOf, locale), data.publication.version)}
            {TRANSPARENCY_PAGE && (
              <>
                {" "}
                <Link href={localizePath(TRANSPARENCY_PAGE, locale)}>{t.detail}</Link>.
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}
