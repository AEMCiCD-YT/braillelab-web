"use client";

import { site } from "../../content/site";
import { useCampaign } from "./CampaignDataProvider";
import styles from "./Campaign.module.css";

/**
 * Instrucciones de transferencia: solo el texto autorizado que publica la plataforma mientras
 * la campaña está activa. Nunca se escriben en el sitio ni se completan con datos supuestos.
 */
export default function TransferInstructions() {
  const { state, data } = useCampaign();
  const instructions = state === "ready" ? data.contribute.transferInstructions : null;

  if (state === "loading") return <p className={styles.dataNotice} role="status">Cargando instrucciones…</p>;

  if (!instructions) {
    const paused = state === "ready" && data.campaign.status !== "active";
    return (
      <div className={styles.instructionsPending} role="status">
        <strong>{paused ? "La recepción de aportes no está activa." : "Las instrucciones de transferencia aún no están publicadas."}</strong>
        <p>
          No transfieras a datos que recibas por otros medios sin confirmarlos. Cuando la cuenta institucional y la campaña estén
          habilitadas, las instrucciones autorizadas aparecerán aquí. Consultas: <a href={`mailto:${site.contacts.partnerships}`}>{site.contacts.partnerships}</a>.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.instructions}>
      <p className={styles.label}>Instrucciones autorizadas por AEMCiCD</p>
      <p className={styles.instructionsText}>{instructions}</p>
      <p className={styles.muted}>
        La cuenta es institucional, a nombre de la asociación. Después de transferir, reporta tu aporte con el formulario para que
        Tesorería lo identifique. El aporte cuenta cuando Tesorería lo verifica en el banco.
      </p>
    </div>
  );
}
