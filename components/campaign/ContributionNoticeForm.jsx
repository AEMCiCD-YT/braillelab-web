"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CONTRIBUTION_PRIVACY_VERSION, campaignApi, getDestinationLabels, usd } from "../../content/campaign";
import { site } from "../../content/site";
import { recordContributionNoticeConversion } from "../../lib/google-ads.mjs";
import { localizePath } from "../../lib/i18n.mjs";
import { useLocale } from "../useLocale";
import styles from "./ContributionNoticeForm.module.css";

/*
 * Aviso de aporte (aemcicd-platform#17): sin login ni tokens. El comprobante y los datos de la
 * persona solo viajan a la plataforma; no se guardan en el navegador (ni localStorage ni
 * sessionStorage) ni se envían a analítica.
 */

const AMOUNT = /^(0|[1-9]\d{0,6})(\.\d{1,2})?$/;
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
const TYPES = { "application/pdf": "PDF", "image/jpeg": "JPEG", "image/png": "PNG" };
const EXTENSIONS = /\.(pdf|jpe?g|png)$/i;

const EMPTY = {
  contactName: "",
  contactEmail: "",
  amount: "",
  transferDate: "",
  hasReference: true,
  bankReference: "",
  missingReferenceReason: "",
  destination: "",
  privacyAccepted: false,
  recognitionConsent: false,
  publicName: "",
  publicAmountConsent: false,
  website: "",
};

// Textos del formulario por idioma. Los mensajes que devuelve la plataforma se muestran tal cual.
const copy = {
  es: {
    fieldLabels: {
      contactName: "Nombre de contacto",
      contactEmail: "Correo de contacto",
      amount: "Monto transferido",
      transferDate: "Fecha de la transferencia",
      bankReference: "Referencia bancaria",
      missingReferenceReason: "Motivo de no tener referencia",
      destination: "Destino",
      receipt: "Comprobante",
      privacyAccepted: "Aviso de privacidad",
      publicName: "Nombre público",
    },
    errors: {
      contactName: "Escribe un nombre de contacto.",
      contactEmail: "Escribe un correo válido, por ejemplo nombre@dominio.com.",
      amount: "Escribe el monto en USD con hasta dos decimales, por ejemplo 25.00.",
      transferDate: "Indica la fecha de la transferencia.",
      futureDate: "La fecha no puede estar en el futuro.",
      oldDate: "La fecha es demasiado antigua.",
      bankReference: "Escribe la referencia o marca que no la tienes.",
      missingReferenceReason: "Explica brevemente por qué no tienes la referencia.",
      destination: "Elige un destino de la lista.",
      receipt: "Adjunta el comprobante de la transferencia.",
      receiptType: "El comprobante debe ser PDF, JPEG o PNG.",
      receiptEmpty: "El archivo está vacío.",
      receiptSize: (size) => `El archivo supera ${size}.`,
      privacyAccepted: "Debes aceptar el aviso de privacidad para enviar el aviso.",
      publicName: "Escribe el nombre que quieres que aparezca.",
    },
    loading: "Cargando el formulario…",
    unconfigured: "El formulario aún no está conectado a la plataforma de la asociación.",
    unavailable: "No pudimos cargar el formulario en este momento.",
    notAccepting: "La campaña no está recibiendo avisos de aporte en este momento.",
    privacyUpdating: "El aviso de privacidad de aportes se está actualizando. El formulario se habilitará cuando la versión publicada coincida.",
    closedHelp: "No envíes comprobantes por otros medios. Si ya transferiste o tienes preguntas, escribe a",
    closedSubject: "Aporte BrailleLab 2027",
    retry: "Reintentar",
    networkError: "No se pudo conectar con la plataforma. Tu aviso no quedó confirmado. Revisa tu conexión y vuelve a intentarlo: no se duplicará.",
    serverError: "La plataforma no pudo guardar el aviso.",
    serverRetry: "Tu aviso no quedó completo. Puedes reintentar sin duplicarlo.",
    tooMany: (minutes) => `Demasiados envíos seguidos.${minutes ? ` Espera unos ${minutes} min` : " Espera unos minutos"} y vuelve a intentarlo.`,
    checkField: "Revisa este dato.",
    sendError: "No se pudo enviar el aviso. Revisa los datos e inténtalo de nuevo.",
    receivedKicker: "Aviso recibido para revisión",
    receivedId: "Identificador:",
    receivedNotYet: "Todavía no es un aporte confirmado.",
    receivedCopy: "Tesorería revisará el comprobante y lo comparará con el movimiento del banco. El aporte cuenta solo cuando se verifica en la cuenta institucional.",
    keepId: (email) => `Guarda el identificador por si necesitas consultar con la asociación (${email}).`,
    another: "Reportar otra transferencia",
    reviewErrors: "Revisa estos datos antes de continuar:",
    intro: "Todos los campos son obligatorios salvo los indicados. Tu nombre y correo son privados: solo los usa Tesorería para identificar la transferencia y responderte.",
    contactLegend: "Tus datos de contacto (privados)",
    transferLegend: "La transferencia",
    amountLabel: "Monto transferido (USD)",
    referenceLabel: "Referencia o número de comprobante bancario",
    missingReferenceLabel: "¿Por qué no tienes la referencia?",
    noReference: "No tengo la referencia bancaria",
    destinationLegend: "Destino del aporte",
    flexible: "Uso flexible dentro del presupuesto aprobado (incluida la reserva)",
    onlyFor: "Solo para:",
    receiptLegend: "Comprobante",
    receiptLabel: "Comprobante de la transferencia",
    receiptHint: (size) => `Un archivo PDF, JPEG o PNG de hasta ${size}. Solo lo ve Tesorería; nunca se publica.`,
    receiptChosen: (name, size) => ` Archivo elegido: ${name} (${size}); se conserva aunque corrijas otros datos. Elige otro solo si quieres cambiarlo.`,
    recognitionLegend: "Reconocimiento público (opcional)",
    recognitionHint: "Por defecto tu aporte es anónimo. Estas opciones son independientes y puedes retirarlas después.",
    recognitionConsent: "Quiero aparecer en la lista de apoyos cuando el aporte esté verificado",
    publicNameLabel: "Nombre público (como quieres aparecer)",
    publicAmountConsent: "También autorizo mostrar el monto de mi aporte junto a mi nombre",
    honeypot: "No completar este campo",
    privacyBefore: "Leí y acepto el ",
    privacyLink: "aviso de privacidad de aportes",
    privacyVersion: (version) => ` (versión ${version}).`,
    reviewButton: "Revisar aviso",
    reviewTitle: "Revisa tu aviso antes de enviarlo",
    reviewContact: "Contacto",
    reviewAmount: "Monto",
    reviewDate: "Fecha",
    reviewReference: "Referencia",
    noReferenceValue: (reason) => `Sin referencia: ${reason}`,
    reviewDestination: "Destino",
    flexibleShort: "Uso flexible",
    reviewReceipt: "Comprobante",
    reviewRecognition: "Reconocimiento",
    recognitionYes: (name, withAmount) => `Sí, como «${name}»${withAmount ? ", con monto" : ", sin monto"}`,
    recognitionNo: "No (anónimo)",
    uploading: (progress) => `Subiendo comprobante… ${progress} %`,
    uploadProgress: "Progreso de la subida",
    processing: "Procesando: guardando el comprobante de forma privada…",
    retrySend: "Reintentar envío",
    send: "Enviar aviso de aporte",
    edit: "Corregir datos",
  },
  en: {
    fieldLabels: {
      contactName: "Contact name",
      contactEmail: "Contact email",
      amount: "Amount transferred",
      transferDate: "Transfer date",
      bankReference: "Bank reference",
      missingReferenceReason: "Reason for not having a reference",
      destination: "Allocation",
      receipt: "Proof of payment",
      privacyAccepted: "Privacy notice",
      publicName: "Public name",
    },
    errors: {
      contactName: "Enter a contact name.",
      contactEmail: "Enter a valid email address, for example name@domain.com.",
      amount: "Enter the amount in USD with up to two decimals, for example 25.00.",
      transferDate: "Enter the transfer date.",
      futureDate: "The date cannot be in the future.",
      oldDate: "The date is too far in the past.",
      bankReference: "Enter the reference or check that you don't have it.",
      missingReferenceReason: "Briefly explain why you don't have the reference.",
      destination: "Choose an allocation from the list.",
      receipt: "Attach the proof of payment for the transfer.",
      receiptType: "The proof of payment must be a PDF, JPEG or PNG file.",
      receiptEmpty: "The file is empty.",
      receiptSize: (size) => `The file is larger than ${size}.`,
      privacyAccepted: "You must accept the privacy notice to submit the report.",
      publicName: "Enter the name you want to be shown.",
    },
    loading: "Loading the form…",
    unconfigured: "The form is not yet connected to the association's platform.",
    unavailable: "We could not load the form right now.",
    notAccepting: "The campaign is not accepting contribution reports at the moment.",
    privacyUpdating: "The contributions privacy notice is being updated. The form will be enabled once the published version matches.",
    closedHelp: "Do not send proof of payment through other channels. If you have already transferred or have questions, write to",
    closedSubject: "BrailleLab 2027 contribution",
    retry: "Try again",
    networkError: "We could not connect to the platform. Your report was not confirmed. Check your connection and try again: it will not be duplicated.",
    serverError: "The platform could not save the report.",
    serverRetry: "Your report was not completed. You can try again without duplicating it.",
    tooMany: (minutes) => `Too many submissions in a row.${minutes ? ` Wait about ${minutes} min` : " Wait a few minutes"} and try again.`,
    checkField: "Check this field.",
    sendError: "The report could not be sent. Check your details and try again.",
    receivedKicker: "Report received for review",
    receivedId: "Reference code:",
    receivedNotYet: "This is not yet a confirmed contribution.",
    receivedCopy: "The Treasurer will review the proof of payment and match it with the bank transaction. The contribution counts only once it is verified in the institutional account.",
    keepId: (email) => `Keep this code in case you need to contact the association (${email}).`,
    another: "Report another transfer",
    reviewErrors: "Check these fields before continuing:",
    intro: "All fields are required unless marked otherwise. Your name and email are private: they are used only by the Treasurer to identify the transfer and reply to you.",
    contactLegend: "Your contact details (private)",
    transferLegend: "The transfer",
    amountLabel: "Amount transferred (USD)",
    referenceLabel: "Bank reference or receipt number",
    missingReferenceLabel: "Why don't you have the reference?",
    noReference: "I don't have the bank reference",
    destinationLegend: "Allocation of your contribution",
    flexible: "Flexible use within the approved budget (including the reserve)",
    onlyFor: "Only for:",
    receiptLegend: "Proof of payment",
    receiptLabel: "Proof of payment for the transfer",
    receiptHint: (size) => `A PDF, JPEG or PNG file up to ${size}. Only the Treasurer sees it; it is never published.`,
    receiptChosen: (name, size) => ` Selected file: ${name} (${size}); it is kept even if you correct other details. Choose another only if you want to replace it.`,
    recognitionLegend: "Public recognition (optional)",
    recognitionHint: "By default your contribution is anonymous. These options are independent and you can withdraw them later.",
    recognitionConsent: "I want to appear in the list of supporters once the contribution is verified",
    publicNameLabel: "Public name (how you want to appear)",
    publicAmountConsent: "I also authorize showing the amount of my contribution next to my name",
    honeypot: "Do not fill in this field",
    privacyBefore: "I have read and accept the ",
    privacyLink: "contributions privacy notice",
    privacyVersion: (version) => ` (version ${version}).`,
    reviewButton: "Review report",
    reviewTitle: "Review your report before sending it",
    reviewContact: "Contact",
    reviewAmount: "Amount",
    reviewDate: "Date",
    reviewReference: "Reference",
    noReferenceValue: (reason) => `No reference: ${reason}`,
    reviewDestination: "Allocation",
    flexibleShort: "Flexible use",
    reviewReceipt: "Proof of payment",
    reviewRecognition: "Recognition",
    recognitionYes: (name, withAmount) => `Yes, as “${name}”${withAmount ? ", with amount" : ", without amount"}`,
    recognitionNo: "No (anonymous)",
    uploading: (progress) => `Uploading proof of payment… ${progress} %`,
    uploadProgress: "Upload progress",
    processing: "Processing: storing the proof of payment privately…",
    retrySend: "Retry submission",
    send: "Submit contribution report",
    edit: "Edit details",
  },
};

function newKey() {
  if (globalThis.crypto?.randomUUID) return `aviso-${globalThis.crypto.randomUUID()}`;
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  return `aviso-${Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
}

function localDate(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  const pad = (value) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

const megabytes = (bytes, locale = "es") => `${(bytes / (1024 * 1024)).toLocaleString(locale === "en" ? "en-US" : "es-EC", { maximumFractionDigits: 1 })} MB`;
const normalizeAmount = (value) => value.trim().replace(",", ".");

/** Mismas reglas que la plataforma; la plataforma vuelve a validar todo. */
function validate(values, file, config, locale = "es") {
  const t = copy[locale].errors;
  const errors = {};
  if (!values.contactName.trim()) errors.contactName = t.contactName;
  if (!EMAIL.test(values.contactEmail.trim())) errors.contactEmail = t.contactEmail;
  const amount = normalizeAmount(values.amount);
  if (!AMOUNT.test(amount) || Number(amount) <= 0) errors.amount = t.amount;
  if (!values.transferDate) errors.transferDate = t.transferDate;
  else if (values.transferDate > localDate(0)) errors.transferDate = t.futureDate;
  else if (values.transferDate < localDate(-400)) errors.transferDate = t.oldDate;
  if (values.hasReference && !values.bankReference.trim()) errors.bankReference = t.bankReference;
  if (!values.hasReference && !values.missingReferenceReason.trim()) errors.missingReferenceReason = t.missingReferenceReason;
  if (values.destination && !config.destinations.includes(values.destination)) errors.destination = t.destination;
  if (!file) errors.receipt = t.receipt;
  else if (!TYPES[file.type] || !EXTENSIONS.test(file.name)) errors.receipt = t.receiptType;
  else if (file.size === 0) errors.receipt = t.receiptEmpty;
  else if (file.size > config.maxReceiptBytes) errors.receipt = t.receiptSize(megabytes(config.maxReceiptBytes, locale));
  if (!values.privacyAccepted) errors.privacyAccepted = t.privacyAccepted;
  if (values.recognitionConsent && !values.publicName.trim()) errors.publicName = t.publicName;
  return errors;
}

function useFormConfig() {
  const [config, setConfig] = useState({ state: "loading", data: null });
  const load = useCallback(() => {
    const url = campaignApi("/contribution-notice-form");
    if (!url) {
      setConfig({ state: "unconfigured", data: null });
      return;
    }
    setConfig({ state: "loading", data: null });
    fetch(url, { credentials: "omit", cache: "no-cache" })
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        setConfig({ state: "ready", data: await response.json() });
      })
      .catch(() => setConfig({ state: "unavailable", data: null }));
  }, []);
  useEffect(load, [load]);
  return { ...config, reload: load };
}

export default function ContributionNoticeForm() {
  const locale = useLocale();
  const t = copy[locale];
  const config = useFormConfig();

  if (config.state === "loading") return <p className={styles.status} role="status">{t.loading}</p>;

  const reason =
    config.state === "unconfigured"
      ? t.unconfigured
      : config.state === "unavailable"
        ? t.unavailable
        : !config.data.accepting
          ? t.notAccepting
          : config.data.privacyNoticeVersion !== CONTRIBUTION_PRIVACY_VERSION
            ? t.privacyUpdating
            : null;

  if (reason) {
    return (
      <div className={styles.closed} role="status">
        <strong>{reason}</strong>
        <p>
          {t.closedHelp}{" "}
          <a href={`mailto:${site.contacts.partnerships}?subject=${encodeURIComponent(t.closedSubject)}`}>{site.contacts.partnerships}</a>.
        </p>
        {config.state === "unavailable" && (
          <button type="button" className="button button-secondary" onClick={config.reload}>{t.retry}</button>
        )}
      </div>
    );
  }

  return <NoticeForm config={config.data} onConfigOutdated={config.reload} locale={locale} />;
}

function NoticeForm({ config, onConfigOutdated, locale }) {
  const t = copy[locale];
  const destinationLabels = getDestinationLabels(locale);
  const [values, setValues] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [phase, setPhase] = useState("edit"); // edit | review | uploading | processing | received
  const [progress, setProgress] = useState(0);
  const [failure, setFailure] = useState(null); // { message, retryable }
  const [receipt, setReceipt] = useState(null);
  const keyRef = useRef(newKey());
  const sendingRef = useRef(false);
  const summaryRef = useRef(null);
  const reviewRef = useRef(null);
  const resultRef = useRef(null);
  const fileInputRef = useRef(null);
  const ids = { errors: useId(), file: useId(), reference: useId() };

  useEffect(() => {
    if (phase === "review") reviewRef.current?.focus();
    if (phase === "received") resultRef.current?.focus();
  }, [phase]);

  /** Cambiar cualquier dato crea un envío nuevo; reintentar sin cambios reutiliza la misma clave. */
  function update(field, value) {
    keyRef.current = newKey();
    setFailure(null);
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function changeFile(event) {
    keyRef.current = newKey();
    setFailure(null);
    const next = event.target.files?.[0] ?? null;
    setFile(next);
    setErrors((current) => {
      const updated = { ...current };
      delete updated.receipt;
      return updated;
    });
  }

  function showErrors(found) {
    setErrors(found);
    setPhase("edit");
    window.requestAnimationFrame(() => summaryRef.current?.focus());
  }

  function review(event) {
    event.preventDefault();
    const found = validate(values, file, config, locale);
    if (Object.keys(found).length) {
      showErrors(found);
      return;
    }
    setErrors({});
    setPhase("review");
  }

  function send() {
    if (sendingRef.current) return; // evita el doble clic
    sendingRef.current = true;
    setFailure(null);
    setProgress(0);
    setPhase("uploading");

    const body = new FormData();
    body.append("contactName", values.contactName.trim());
    body.append("contactEmail", values.contactEmail.trim());
    body.append("amount", normalizeAmount(values.amount));
    body.append("transferDate", values.transferDate);
    if (values.hasReference) body.append("bankReference", values.bankReference.trim());
    else body.append("missingReferenceReason", values.missingReferenceReason.trim());
    if (values.destination) body.append("destination", values.destination);
    body.append("privacyNoticeVersion", config.privacyNoticeVersion);
    body.append("privacyAccepted", "true");
    if (values.recognitionConsent) {
      body.append("recognitionConsent", "true");
      body.append("publicName", values.publicName.trim());
      if (values.publicAmountConsent) body.append("publicAmountConsent", "true");
    }
    body.append("website", values.website);
    body.append("receipt", file, file.name);

    const request = new XMLHttpRequest();
    const submissionKey = keyRef.current;
    request.open("POST", campaignApi("/contribution-notices"));
    request.withCredentials = false;
    request.setRequestHeader("Idempotency-Key", submissionKey);
    request.responseType = "json";
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) setProgress(Math.round((event.loaded / event.total) * 100));
    };
    request.upload.onload = () => setPhase("processing");
    request.onload = () => {
      sendingRef.current = false;
      const response = request.response ?? {};
      if (request.status === 202) {
        setReceipt(response);
        setPhase("received");
        recordContributionNoticeConversion(request.status, response, submissionKey);
        return;
      }
      handleError(request.status, response, request.getResponseHeader("Retry-After"));
    };
    request.onerror = () => {
      sendingRef.current = false;
      setPhase("review");
      setFailure({
        message: t.networkError,
        retryable: true,
      });
    };
    request.send(body);
  }

  function handleError(status, response, retryAfter) {
    const field = response.field;
    if (status === 409 && response.code === "PRIVACY_NOTICE_OUTDATED") {
      onConfigOutdated();
      return;
    }
    if (status === 503 || status >= 500) {
      setPhase("review");
      setFailure({
        message: `${response.message || t.serverError} ${t.serverRetry}`,
        retryable: true,
      });
      return;
    }
    if (status === 429) {
      const minutes = retryAfter ? Math.max(1, Math.ceil(Number(retryAfter) / 60)) : null;
      setPhase("review");
      setFailure({ message: t.tooMany(minutes), retryable: true });
      return;
    }
    const target = field === "privacyNoticeVersion" ? "privacyAccepted" : field;
    if (target && t.fieldLabels[target]) {
      showErrors({ [target]: response.message || t.checkField });
      return;
    }
    setPhase("edit");
    setFailure({ message: response.message || t.sendError, retryable: false });
    window.requestAnimationFrame(() => summaryRef.current?.focus());
  }

  function startOver() {
    keyRef.current = newKey();
    setValues(EMPTY);
    setFile(null);
    setReceipt(null);
    setProgress(0);
    setPhase("edit");
  }

  if (phase === "received" && receipt) {
    return (
      <div className={styles.received} ref={resultRef} tabIndex={-1} role="status" aria-live="polite">
        <p className={styles.kicker}>{t.receivedKicker}</p>
        <h3>{t.receivedId} <span className={styles.code}>{receipt.noticeCode}</span></h3>
        <p>
          <strong>{t.receivedNotYet}</strong> {t.receivedCopy}
        </p>
        {receipt.message && <p className={styles.serverMessage}>{receipt.message}</p>}
        <p>{t.keepId(site.contacts.partnerships)}</p>
        <button type="button" className="button button-secondary" onClick={startOver}>{t.another}</button>
      </div>
    );
  }

  const errorList = Object.entries(errors);
  const busy = phase === "uploading" || phase === "processing";
  const describedBy = (field, extra) => [errors[field] ? `${ids.errors}-${field}` : null, extra].filter(Boolean).join(" ") || undefined;
  const fieldError = (field) =>
    errors[field] ? <span id={`${ids.errors}-${field}`} className={styles.error}>{errors[field]}</span> : null;

  return (
    <div className={styles.wrapper}>
      {(errorList.length > 0 || (failure && phase === "edit")) && (
        <div className={styles.summary} ref={summaryRef} tabIndex={-1} role="alert">
          <strong>{errorList.length ? t.reviewErrors : failure.message}</strong>
          {errorList.length > 0 && (
            <ul>
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#notice-${field}`}>{t.fieldLabels[field] ?? field}: {message}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {phase === "edit" && (
        <form className={styles.form} noValidate onSubmit={review} aria-describedby={ids.reference}>
          <p id={ids.reference} className={styles.hint}>{t.intro}</p>

          <fieldset>
            <legend>{t.contactLegend}</legend>
            <label className={styles.field} htmlFor="notice-contactName">
              {t.fieldLabels.contactName}
              <input id="notice-contactName" name="contactName" autoComplete="name" maxLength={200} value={values.contactName} onChange={(event) => update("contactName", event.target.value)} aria-invalid={Boolean(errors.contactName)} aria-describedby={describedBy("contactName")} />
              {fieldError("contactName")}
            </label>
            <label className={styles.field} htmlFor="notice-contactEmail">
              {t.fieldLabels.contactEmail}
              <input id="notice-contactEmail" name="contactEmail" type="email" autoComplete="email" inputMode="email" maxLength={320} value={values.contactEmail} onChange={(event) => update("contactEmail", event.target.value)} aria-invalid={Boolean(errors.contactEmail)} aria-describedby={describedBy("contactEmail")} />
              {fieldError("contactEmail")}
            </label>
          </fieldset>

          <fieldset>
            <legend>{t.transferLegend}</legend>
            <div className={styles.twoColumns}>
              <label className={styles.field} htmlFor="notice-amount">
                {t.amountLabel}
                <input id="notice-amount" name="amount" inputMode="decimal" autoComplete="off" placeholder="25.00" maxLength={12} value={values.amount} onChange={(event) => update("amount", event.target.value)} aria-invalid={Boolean(errors.amount)} aria-describedby={describedBy("amount")} />
                {fieldError("amount")}
              </label>
              <label className={styles.field} htmlFor="notice-transferDate">
                {t.fieldLabels.transferDate}
                <input id="notice-transferDate" name="transferDate" type="date" max={localDate(0)} min={localDate(-400)} value={values.transferDate} onChange={(event) => update("transferDate", event.target.value)} aria-invalid={Boolean(errors.transferDate)} aria-describedby={describedBy("transferDate")} />
                {fieldError("transferDate")}
              </label>
            </div>
            {values.hasReference ? (
              <label className={styles.field} htmlFor="notice-bankReference">
                {t.referenceLabel}
                <input id="notice-bankReference" name="bankReference" autoComplete="off" maxLength={120} value={values.bankReference} onChange={(event) => update("bankReference", event.target.value)} aria-invalid={Boolean(errors.bankReference)} aria-describedby={describedBy("bankReference")} />
                {fieldError("bankReference")}
              </label>
            ) : (
              <label className={styles.field} htmlFor="notice-missingReferenceReason">
                {t.missingReferenceLabel}
                <input id="notice-missingReferenceReason" name="missingReferenceReason" maxLength={300} value={values.missingReferenceReason} onChange={(event) => update("missingReferenceReason", event.target.value)} aria-invalid={Boolean(errors.missingReferenceReason)} aria-describedby={describedBy("missingReferenceReason")} />
                {fieldError("missingReferenceReason")}
              </label>
            )}
            <label className={styles.check}>
              <input type="checkbox" checked={!values.hasReference} onChange={(event) => update("hasReference", !event.target.checked)} />
              <span>{t.noReference}</span>
            </label>
          </fieldset>

          <fieldset id="notice-destination" aria-describedby={describedBy("destination")}>
            <legend>{t.destinationLegend}</legend>
            <label className={styles.radio}>
              <input type="radio" name="destination" value="" checked={values.destination === ""} onChange={() => update("destination", "")} />
              <span>{t.flexible}</span>
            </label>
            {config.destinations.map((code) => (
              <label className={styles.radio} key={code}>
                <input type="radio" name="destination" value={code} checked={values.destination === code} onChange={() => update("destination", code)} />
                <span>{t.onlyFor} {destinationLabels[code] ?? code}</span>
              </label>
            ))}
            {fieldError("destination")}
          </fieldset>

          <fieldset>
            <legend>{t.receiptLegend}</legend>
            <div className={styles.field}>
              <label htmlFor="notice-receipt">{t.receiptLabel}</label>
              <span id={ids.file} className={styles.hint}>
                {t.receiptHint(megabytes(config.maxReceiptBytes, locale))}
                {file && t.receiptChosen(file.name, megabytes(file.size, locale))}
              </span>
              <input id="notice-receipt" ref={fileInputRef} name="receipt" type="file" accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png" onChange={changeFile} aria-invalid={Boolean(errors.receipt)} aria-describedby={describedBy("receipt", ids.file)} />
              {fieldError("receipt")}
            </div>
          </fieldset>

          <fieldset>
            <legend>{t.recognitionLegend}</legend>
            <p className={styles.hint}>{t.recognitionHint}</p>
            <label className={styles.check}>
              <input type="checkbox" checked={values.recognitionConsent} onChange={(event) => update("recognitionConsent", event.target.checked)} />
              <span>{t.recognitionConsent}</span>
            </label>
            {values.recognitionConsent && (
              <>
                <label className={styles.field} htmlFor="notice-publicName">
                  {t.publicNameLabel}
                  <input id="notice-publicName" name="publicName" maxLength={120} value={values.publicName} onChange={(event) => update("publicName", event.target.value)} aria-invalid={Boolean(errors.publicName)} aria-describedby={describedBy("publicName")} />
                  {fieldError("publicName")}
                </label>
                <label className={styles.check}>
                  <input type="checkbox" checked={values.publicAmountConsent} onChange={(event) => update("publicAmountConsent", event.target.checked)} />
                  <span>{t.publicAmountConsent}</span>
                </label>
              </>
            )}
          </fieldset>

          <div className={styles.honeypot} aria-hidden="true">
            <label>
              {t.honeypot}
              <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} />
            </label>
          </div>

          <label className={styles.check} id="notice-privacyAccepted">
            <input type="checkbox" checked={values.privacyAccepted} onChange={(event) => update("privacyAccepted", event.target.checked)} aria-invalid={Boolean(errors.privacyAccepted)} aria-describedby={describedBy("privacyAccepted")} />
            <span>
              {t.privacyBefore}<Link href={localizePath("/privacidad#aportes", locale)}>{t.privacyLink}</Link>{t.privacyVersion(CONTRIBUTION_PRIVACY_VERSION)}
            </span>
          </label>
          {fieldError("privacyAccepted")}

          <div className={styles.actions}>
            <button type="submit" className="button button-primary">{t.reviewButton}</button>
          </div>
        </form>
      )}

      {phase !== "edit" && (
        <div className={styles.review} ref={reviewRef} tabIndex={-1} aria-labelledby="notice-review-title">
          <h3 id="notice-review-title">{t.reviewTitle}</h3>
          <dl>
            <div><dt>{t.reviewContact}</dt><dd>{values.contactName} · {values.contactEmail}</dd></div>
            <div><dt>{t.reviewAmount}</dt><dd>{usd(normalizeAmount(values.amount), locale)}</dd></div>
            <div><dt>{t.reviewDate}</dt><dd>{values.transferDate}</dd></div>
            <div><dt>{t.reviewReference}</dt><dd>{values.hasReference ? values.bankReference : t.noReferenceValue(values.missingReferenceReason)}</dd></div>
            <div><dt>{t.reviewDestination}</dt><dd>{values.destination ? destinationLabels[values.destination] ?? values.destination : t.flexibleShort}</dd></div>
            <div><dt>{t.reviewReceipt}</dt><dd>{file?.name}</dd></div>
            <div><dt>{t.reviewRecognition}</dt><dd>{values.recognitionConsent ? t.recognitionYes(values.publicName, values.publicAmountConsent) : t.recognitionNo}</dd></div>
          </dl>

          {failure && (
            <div className={styles.summary} role="alert">
              <strong>{failure.message}</strong>
            </div>
          )}

          <div aria-live="polite" className={styles.progressArea}>
            {phase === "uploading" && (
              <>
                <span>{t.uploading(progress)}</span>
                <progress max={100} value={progress} aria-label={t.uploadProgress} />
              </>
            )}
            {phase === "processing" && <span>{t.processing}</span>}
          </div>

          <div className={styles.actions}>
            <button type="button" className="button button-primary" onClick={send} disabled={busy} aria-disabled={busy}>
              {failure?.retryable ? t.retrySend : t.send}
            </button>
            <button type="button" className="button button-secondary" onClick={() => setPhase("edit")} disabled={busy}>
              {t.edit}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

