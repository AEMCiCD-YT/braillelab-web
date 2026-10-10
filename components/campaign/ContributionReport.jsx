"use client";

import ContributionNoticeForm from "./ContributionNoticeForm";
import { useCampaign } from "./CampaignDataProvider";

/**
 * Bloque «Reportar mi transferencia»: solo aparece cuando la plataforma publica las instrucciones
 * de transferencia. Sin instrucciones no hay a dónde transferir, así que no tiene sentido pedir el
 * reporte (el aviso de instrucciones pendientes ya explica la situación).
 */
export default function ContributionReport({ titleClassName }) {
  const { state, data } = useCampaign();
  if (state !== "ready" || !data?.contribute?.transferInstructions) return null;

  return (
    <div>
      <h3 className={titleClassName}>Reportar mi transferencia</h3>
      <ContributionNoticeForm />
    </div>
  );
}
