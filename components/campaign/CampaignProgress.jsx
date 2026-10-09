"use client";

import Link from "next/link";
import { campaign, dateTimeLabel, usd, TRANSPARENCY_PAGE } from "../../content/campaign";
import { site } from "../../content/site";
import { useCampaign } from "./CampaignDataProvider";
import styles from "./Campaign.module.css";

function percent(basisPoints) {
  return `${(Math.max(0, Math.min(basisPoints, 10_000)) / 100).toLocaleString("es-EC", { maximumFractionDigits: 1 })} %`;
}

function DataNotice({ state, onRetry }) {
  if (state === "loading") {
    return <p className={styles.dataNotice} role="status">Cargando las cifras de la campaña…</p>;
  }
  if (state === "unconfigured") {
    return (
      <p className={styles.dataNotice} role="status">
        Las cifras en vivo todavía no están conectadas a la plataforma de la asociación. Para conocer el avance escribe a{" "}
        <a href={`mailto:${site.contacts.partnerships}`}>{site.contacts.partnerships}</a>.
      </p>
    );
  }
  if (state === "not-published") {
    return (
      <p className={styles.dataNotice} role="status">
        La campaña aún no publica cifras de avance. La meta y el presupuesto de arriba son los aprobados; los montos recibidos se
        mostrarán cuando estén verificados y su publicación esté autorizada.
      </p>
    );
  }
  return (
    <div className={`${styles.dataNotice} ${styles.dataNoticeAlert}`} role="alert">
      <p>No pudimos cargar las cifras en este momento. No mostramos montos para no dar datos incorrectos.</p>
      <button type="button" className="button button-secondary" onClick={onRetry}>Reintentar</button>
    </div>
  );
}

/** Meta, primer hito y cifras verificadas. Efectivo y especie siempre por separado. */
export default function CampaignProgress() {
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
          <span className={styles.label}>Meta técnica total</span>
          <strong className={styles.bigFigure}>{usd(ready ? data.goal : campaign.goal)}</strong>
        </div>
        <div>
          <span className={styles.label}>Primer hito acumulativo</span>
          <strong className={styles.bigFigure}>{usd(milestone?.target ?? campaign.firstMilestone)}</strong>
        </div>
      </div>

      {!ready && <DataNotice state={state} onRetry={retry} />}

      {ready && (
        <>
          {data.publication.freshness === "stale" && (
            <p className={`${styles.dataNotice} ${styles.dataNoticeAlert}`} role="status">
              Datos desactualizados: mostramos el último corte publicado ({dateTimeLabel(data.publication.asOf)}) porque la
              actualización no está disponible ahora.
            </p>
          )}
          {cash ? (
            <>
              <div
                className={styles.bar}
                role="img"
                aria-label={`Avance del primer hito: ${percent(milestone?.progressBasisPoints ?? 0)}, ${usd(milestone?.reachedAmount)} de ${usd(milestone?.target)}`}
              >
                <span style={{ width: `${Math.max(0, Math.min(milestone?.progressBasisPoints ?? 0, 10_000)) / 100}%` }} />
              </div>
              <dl className={styles.figures}>
                <div>
                  <dt>Efectivo recibido y verificado (neto)</dt>
                  <dd>{usd(cash.netReceived)}</dd>
                  <dd className={styles.figureNote}>
                    Bruto {usd(cash.grossIncome)}
                    {cash.refunds !== "0.00" && ` · devoluciones ${usd(cash.refunds)}`}
                    {cash.reversals !== "0.00" && ` · reversos ${usd(cash.reversals)}`}
                  </dd>
                </div>
                <div>
                  <dt>Avance hacia la meta total</dt>
                  <dd>{percent(cash.goalProgressBasisPoints)}</dd>
                  <dd className={styles.figureNote}>Solo cuenta efectivo verificado en el banco.</dd>
                </div>
                {execution && (
                  <div>
                    <dt>Gasto pagado</dt>
                    <dd>{usd(execution.paid)}</dd>
                    <dd className={styles.figureNote}>Comprometido pendiente {usd(execution.committedPending)}</dd>
                  </div>
                )}
                {inKind && (
                  <div>
                    <dt>Aportes en especie (aparte del efectivo)</dt>
                    <dd>{usd(inKind.substituted)}</dd>
                    <dd className={styles.figureNote}>Costo del presupuesto cubierto con bienes aceptados y valorados.</dd>
                  </div>
                )}
                <div>
                  <dt>Necesidad pendiente</dt>
                  <dd>{usd(data.pendingMonetaryNeed)}</dd>
                  <dd className={styles.figureNote}>Meta − efectivo verificado − costo cubierto en especie.</dd>
                </div>
              </dl>
              {data.dataState === "empty" && <p className={styles.muted}>Todavía no hay aportes verificados.</p>}
            </>
          ) : (
            <p className={styles.dataNotice} role="status">Las cifras de avance de esta campaña no están publicadas.</p>
          )}
          <p className={styles.meta}>
            Datos al {dateTimeLabel(data.publication.asOf)} · versión {data.publication.version}. Los avisos de transferencia
            pendientes de revisión, las promesas y las transferencias internas no se suman.
            {TRANSPARENCY_PAGE && (
              <>
                {" "}
                <Link href={TRANSPARENCY_PAGE}>Ver transparencia detallada</Link>.
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}
