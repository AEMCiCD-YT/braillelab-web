"use client";

import ContributionNoticeForm from "./ContributionNoticeForm";
import { useLocale } from "../useLocale";
import { useCampaign } from "./CampaignDataProvider";

/**
 * Bloque «Reportar mi transferencia»: solo aparece cuando la plataforma publica las instrucciones
 * de transferencia. Sin instrucciones no hay a dónde transferir, así que no tiene sentido pedir el
 * reporte (el aviso de instrucciones pendientes ya explica la situación).
 */
export default function ContributionReport({ titleClassName }) {
  const locale = useLocale();
  const { state, data } = useCampaign();
  if (state !== "ready" || !data?.contribute?.transferInstructions) return null;

  return (
    <div>
      <h3 className={titleClassName}>{locale === "en" ? "Report my transfer" : "Reportar mi transferencia"}</h3>
      <ContributionNoticeForm />
    </div>
  );
}
