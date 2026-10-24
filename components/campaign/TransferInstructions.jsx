"use client";

import { site } from "../../content/site";
import { useLocale } from "../useLocale";
import { useCampaign } from "./CampaignDataProvider";
import styles from "./Campaign.module.css";

const copy = {
  es: {
    loading: "Cargando instrucciones…",
    paused: "La recepción de aportes no está activa.",
    pending: "Las instrucciones de transferencia aún no están publicadas.",
    pendingCopy: "No transfieras a datos que recibas por otros medios sin confirmarlos. Cuando la cuenta institucional y la campaña estén habilitadas, las instrucciones autorizadas aparecerán aquí. Consultas:",
    label: "Instrucciones autorizadas por AEMCiCD",
    note: "La cuenta es institucional, a nombre de la asociación. Después de transferir, reporta tu aporte con el formulario para que Tesorería lo identifique. El aporte cuenta cuando Tesorería lo verifica en el banco.",
  },
  en: {
    loading: "Loading instructions…",
    paused: "Contributions are not being received at the moment.",
    pending: "The transfer instructions have not been published yet.",
    pendingCopy: "Do not transfer to account details you receive through other channels without confirming them. Once the institutional account and the campaign are enabled, the authorized instructions will appear here. Questions:",
    label: "Instructions authorized by AEMCiCD",
    glossary: "The Treasurer publishes these details in Spanish: “Titular” is the account holder, “Banco” the bank, “Tipo de cuenta: Ahorros” a savings account, “Número de cuenta” the account number and “concepto” the payment reference. The «Avisar mi aporte» form mentioned below is “Report my transfer” on this page.",
    note: "The account is institutional, in the association's name. After transferring, report your contribution with the form so the Treasurer can identify it. The contribution counts once the Treasurer verifies it at the bank.",
  },
};

/**
 * Instrucciones de transferencia: solo el texto autorizado que publica la plataforma mientras
 * la campaña está activa. Nunca se escriben en el sitio ni se completan con datos supuestos.
 */
export default function TransferInstructions() {
  const t = copy[useLocale()];
  const { state, data } = useCampaign();
  const instructions = state === "ready" ? data.contribute.transferInstructions : null;

  if (state === "loading") return <p className={styles.dataNotice} role="status">{t.loading}</p>;

  if (!instructions) {
    const paused = state === "ready" && data.campaign.status !== "active";
    return (
      <div className={styles.instructionsPending} role="status">
        <strong>{paused ? t.paused : t.pending}</strong>
        <p>
          {t.pendingCopy} <a href={`mailto:${site.contacts.partnerships}`}>{site.contacts.partnerships}</a>.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.instructions}>
      <p className={styles.label}>{t.label}</p>
      {t.glossary ? <p className={styles.muted}>{t.glossary}</p> : null}
      <p className={styles.instructionsText}>{instructions}</p>
      <p className={styles.muted}>{t.note}</p>
    </div>
  );
}
