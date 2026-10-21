export const GOOGLE_ADS_ID = "AW-18480905412";
export const CONTRIBUTION_NOTICE_SEND_TO = `${GOOGLE_ADS_ID}/284iCKjIkpgdEMT5sOxE`;

// Solo memoria de la página: no persiste datos del formulario en el navegador.
const recordedSubmissions = new Set();

/** Mide un aviso aceptado, no una donación verificada ni el clic de envío. */
export function recordContributionNoticeConversion(status, response, submissionKey) {
  if (status !== 202 || typeof response?.noticeCode !== "string" || !response.noticeCode.trim()) return false;
  if (typeof submissionKey !== "string" || !submissionKey || recordedSubmissions.has(submissionKey)) return false;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return false;

  try {
    window.gtag("event", "conversion", {
      send_to: CONTRIBUTION_NOTICE_SEND_TO,
      // Identificador aleatorio del envío, nunca referencia bancaria ni datos personales.
      transaction_id: submissionKey,
      transport_type: "beacon",
    });
    recordedSubmissions.add(submissionKey);
    return true;
  } catch {
    // Analítica bloqueada o fallida nunca debe impedir confirmar el aviso.
    return false;
  }
}
