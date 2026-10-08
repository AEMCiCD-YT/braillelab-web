"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CONTRIBUTION_PRIVACY_VERSION, campaignApi, destinationLabels, usd } from "../../content/campaign";
import { site } from "../../content/site";
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

const FIELD_LABELS = {
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

const megabytes = (bytes) => `${(bytes / (1024 * 1024)).toLocaleString("es-EC", { maximumFractionDigits: 1 })} MB`;
const normalizeAmount = (value) => value.trim().replace(",", ".");

/** Mismas reglas que la plataforma; la plataforma vuelve a validar todo. */
function validate(values, file, config) {
  const errors = {};
  if (!values.contactName.trim()) errors.contactName = "Escribe un nombre de contacto.";
  if (!EMAIL.test(values.contactEmail.trim())) errors.contactEmail = "Escribe un correo válido, por ejemplo nombre@dominio.com.";
  const amount = normalizeAmount(values.amount);
  if (!AMOUNT.test(amount) || Number(amount) <= 0) errors.amount = "Escribe el monto en USD con hasta dos decimales, por ejemplo 25.00.";
  if (!values.transferDate) errors.transferDate = "Indica la fecha de la transferencia.";
  else if (values.transferDate > localDate(0)) errors.transferDate = "La fecha no puede estar en el futuro.";
  else if (values.transferDate < localDate(-400)) errors.transferDate = "La fecha es demasiado antigua.";
  if (values.hasReference && !values.bankReference.trim()) errors.bankReference = "Escribe la referencia o marca que no la tienes.";
  if (!values.hasReference && !values.missingReferenceReason.trim()) errors.missingReferenceReason = "Explica brevemente por qué no tienes la referencia.";
  if (values.destination && !config.destinations.includes(values.destination)) errors.destination = "Elige un destino de la lista.";
  if (!file) errors.receipt = "Adjunta el comprobante de la transferencia.";
  else if (!TYPES[file.type] || !EXTENSIONS.test(file.name)) errors.receipt = "El comprobante debe ser PDF, JPEG o PNG.";
  else if (file.size === 0) errors.receipt = "El archivo está vacío.";
  else if (file.size > config.maxReceiptBytes) errors.receipt = `El archivo supera ${megabytes(config.maxReceiptBytes)}.`;
  if (!values.privacyAccepted) errors.privacyAccepted = "Debes aceptar el aviso de privacidad para enviar el aviso.";
  if (values.recognitionConsent && !values.publicName.trim()) errors.publicName = "Escribe el nombre que quieres que aparezca.";
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
    fetch(url, { credentials: "omit" })
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
  const config = useFormConfig();

  if (config.state === "loading") return <p className={styles.status} role="status">Cargando el formulario…</p>;

  const reason =
    config.state === "unconfigured"
      ? "El formulario aún no está conectado a la plataforma de la asociación."
      : config.state === "unavailable"
        ? "No pudimos cargar el formulario en este momento."
        : !config.data.accepting
          ? "La campaña no está recibiendo avisos de aporte en este momento."
          : config.data.privacyNoticeVersion !== CONTRIBUTION_PRIVACY_VERSION
            ? "El aviso de privacidad de aportes se está actualizando. El formulario se habilitará cuando la versión publicada coincida."
            : null;

  if (reason) {
    return (
      <div className={styles.closed} role="status">
        <strong>{reason}</strong>
        <p>
          No envíes comprobantes por otros medios. Si ya transferiste o tienes preguntas, escribe a{" "}
          <a href={`mailto:${site.contact}?subject=${encodeURIComponent("Aporte BrailleLab 2027")}`}>{site.contact}</a>.
        </p>
        {config.state === "unavailable" && (
          <button type="button" className="button button-secondary" onClick={config.reload}>Reintentar</button>
        )}
      </div>
    );
  }

  return <NoticeForm config={config.data} onConfigOutdated={config.reload} />;
}

function NoticeForm({ config, onConfigOutdated }) {
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
    const found = validate(values, file, config);
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
    request.open("POST", campaignApi("/contribution-notices"));
    request.withCredentials = false;
    request.setRequestHeader("Idempotency-Key", keyRef.current);
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
        return;
      }
      handleError(request.status, response, request.getResponseHeader("Retry-After"));
    };
    request.onerror = () => {
      sendingRef.current = false;
      setPhase("review");
      setFailure({
        message: "No se pudo conectar con la plataforma. Tu aviso no quedó confirmado. Revisa tu conexión y vuelve a intentarlo: no se duplicará.",
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
        message: `${response.message || "La plataforma no pudo guardar el aviso."} Tu aviso no quedó completo. Puedes reintentar sin duplicarlo.`,
        retryable: true,
      });
      return;
    }
    if (status === 429) {
      const minutes = retryAfter ? Math.max(1, Math.ceil(Number(retryAfter) / 60)) : null;
      setPhase("review");
      setFailure({ message: `Demasiados envíos seguidos.${minutes ? ` Espera unos ${minutes} min` : " Espera unos minutos"} y vuelve a intentarlo.`, retryable: true });
      return;
    }
    const target = field === "privacyNoticeVersion" ? "privacyAccepted" : field;
    if (target && FIELD_LABELS[target]) {
      showErrors({ [target]: response.message || "Revisa este dato." });
      return;
    }
    setPhase("edit");
    setFailure({ message: response.message || "No se pudo enviar el aviso. Revisa los datos e inténtalo de nuevo.", retryable: false });
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
        <p className={styles.kicker}>Aviso recibido para revisión</p>
        <h3>Identificador: <span className={styles.code}>{receipt.noticeCode}</span></h3>
        <p>
          <strong>Todavía no es un aporte confirmado.</strong> Tesorería revisará el comprobante y lo comparará con el movimiento
          del banco. El aporte cuenta solo cuando se verifica en la cuenta institucional.
        </p>
        {receipt.message && <p className={styles.serverMessage}>{receipt.message}</p>}
        <p>Guarda el identificador por si necesitas consultar con la asociación ({site.contact}).</p>
        <button type="button" className="button button-secondary" onClick={startOver}>Reportar otra transferencia</button>
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
          <strong>{errorList.length ? "Revisa estos datos antes de continuar:" : failure.message}</strong>
          {errorList.length > 0 && (
            <ul>
              {errorList.map(([field, message]) => (
                <li key={field}>
                  <a href={`#notice-${field}`}>{FIELD_LABELS[field] ?? field}: {message}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {phase === "edit" && (
        <form className={styles.form} noValidate onSubmit={review} aria-describedby={ids.reference}>
          <p id={ids.reference} className={styles.hint}>
            Todos los campos son obligatorios salvo los indicados. Tu nombre y correo son privados: solo los usa Tesorería para
            identificar la transferencia y responderte.
          </p>

          <fieldset>
            <legend>Tus datos de contacto (privados)</legend>
            <label className={styles.field} htmlFor="notice-contactName">
              Nombre de contacto
              <input id="notice-contactName" name="contactName" autoComplete="name" maxLength={200} value={values.contactName} onChange={(event) => update("contactName", event.target.value)} aria-invalid={Boolean(errors.contactName)} aria-describedby={describedBy("contactName")} />
              {fieldError("contactName")}
            </label>
            <label className={styles.field} htmlFor="notice-contactEmail">
              Correo de contacto
              <input id="notice-contactEmail" name="contactEmail" type="email" autoComplete="email" inputMode="email" maxLength={320} value={values.contactEmail} onChange={(event) => update("contactEmail", event.target.value)} aria-invalid={Boolean(errors.contactEmail)} aria-describedby={describedBy("contactEmail")} />
              {fieldError("contactEmail")}
            </label>
          </fieldset>

          <fieldset>
            <legend>La transferencia</legend>
            <div className={styles.twoColumns}>
              <label className={styles.field} htmlFor="notice-amount">
                Monto transferido (USD)
                <input id="notice-amount" name="amount" inputMode="decimal" autoComplete="off" placeholder="25.00" maxLength={12} value={values.amount} onChange={(event) => update("amount", event.target.value)} aria-invalid={Boolean(errors.amount)} aria-describedby={describedBy("amount")} />
                {fieldError("amount")}
              </label>
              <label className={styles.field} htmlFor="notice-transferDate">
                Fecha de la transferencia
                <input id="notice-transferDate" name="transferDate" type="date" max={localDate(0)} min={localDate(-400)} value={values.transferDate} onChange={(event) => update("transferDate", event.target.value)} aria-invalid={Boolean(errors.transferDate)} aria-describedby={describedBy("transferDate")} />
                {fieldError("transferDate")}
              </label>
            </div>
            {values.hasReference ? (
              <label className={styles.field} htmlFor="notice-bankReference">
                Referencia o número de comprobante bancario
                <input id="notice-bankReference" name="bankReference" autoComplete="off" maxLength={120} value={values.bankReference} onChange={(event) => update("bankReference", event.target.value)} aria-invalid={Boolean(errors.bankReference)} aria-describedby={describedBy("bankReference")} />
                {fieldError("bankReference")}
              </label>
            ) : (
              <label className={styles.field} htmlFor="notice-missingReferenceReason">
                ¿Por qué no tienes la referencia?
                <input id="notice-missingReferenceReason" name="missingReferenceReason" maxLength={300} value={values.missingReferenceReason} onChange={(event) => update("missingReferenceReason", event.target.value)} aria-invalid={Boolean(errors.missingReferenceReason)} aria-describedby={describedBy("missingReferenceReason")} />
                {fieldError("missingReferenceReason")}
              </label>
            )}
            <label className={styles.check}>
              <input type="checkbox" checked={!values.hasReference} onChange={(event) => update("hasReference", !event.target.checked)} />
              <span>No tengo la referencia bancaria</span>
            </label>
          </fieldset>

          <fieldset id="notice-destination" aria-describedby={describedBy("destination")}>
            <legend>Destino del aporte</legend>
            <label className={styles.radio}>
              <input type="radio" name="destination" value="" checked={values.destination === ""} onChange={() => update("destination", "")} />
              <span>Uso flexible dentro del presupuesto aprobado (incluida la reserva)</span>
            </label>
            {config.destinations.map((code) => (
              <label className={styles.radio} key={code}>
                <input type="radio" name="destination" value={code} checked={values.destination === code} onChange={() => update("destination", code)} />
                <span>Solo para: {destinationLabels[code] ?? code}</span>
              </label>
            ))}
            {fieldError("destination")}
          </fieldset>

          <fieldset>
            <legend>Comprobante</legend>
            <div className={styles.field}>
              <label htmlFor="notice-receipt">Comprobante de la transferencia</label>
              <span id={ids.file} className={styles.hint}>
                Un archivo PDF, JPEG o PNG de hasta {megabytes(config.maxReceiptBytes)}. Solo lo ve Tesorería; nunca se publica.
                {file && ` Archivo elegido: ${file.name} (${megabytes(file.size)}); se conserva aunque corrijas otros datos. Elige otro solo si quieres cambiarlo.`}
              </span>
              <input id="notice-receipt" ref={fileInputRef} name="receipt" type="file" accept="application/pdf,image/jpeg,image/png,.pdf,.jpg,.jpeg,.png" onChange={changeFile} aria-invalid={Boolean(errors.receipt)} aria-describedby={describedBy("receipt", ids.file)} />
              {fieldError("receipt")}
            </div>
          </fieldset>

          <fieldset>
            <legend>Reconocimiento público (opcional)</legend>
            <p className={styles.hint}>Por defecto tu aporte es anónimo. Estas opciones son independientes y puedes retirarlas después.</p>
            <label className={styles.check}>
              <input type="checkbox" checked={values.recognitionConsent} onChange={(event) => update("recognitionConsent", event.target.checked)} />
              <span>Quiero aparecer en la lista de apoyos cuando el aporte esté verificado</span>
            </label>
            {values.recognitionConsent && (
              <>
                <label className={styles.field} htmlFor="notice-publicName">
                  Nombre público (como quieres aparecer)
                  <input id="notice-publicName" name="publicName" maxLength={120} value={values.publicName} onChange={(event) => update("publicName", event.target.value)} aria-invalid={Boolean(errors.publicName)} aria-describedby={describedBy("publicName")} />
                  {fieldError("publicName")}
                </label>
                <label className={styles.check}>
                  <input type="checkbox" checked={values.publicAmountConsent} onChange={(event) => update("publicAmountConsent", event.target.checked)} />
                  <span>También autorizo mostrar el monto de mi aporte junto a mi nombre</span>
                </label>
              </>
            )}
          </fieldset>

          <div className={styles.honeypot} aria-hidden="true">
            <label>
              No completar este campo
              <input name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(event) => update("website", event.target.value)} />
            </label>
          </div>

          <label className={styles.check} id="notice-privacyAccepted">
            <input type="checkbox" checked={values.privacyAccepted} onChange={(event) => update("privacyAccepted", event.target.checked)} aria-invalid={Boolean(errors.privacyAccepted)} aria-describedby={describedBy("privacyAccepted")} />
            <span>
              Leí y acepto el <Link href="/privacidad#aportes">aviso de privacidad de aportes</Link> (versión {CONTRIBUTION_PRIVACY_VERSION}).
            </span>
          </label>
          {fieldError("privacyAccepted")}

          <div className={styles.actions}>
            <button type="submit" className="button button-primary">Revisar aviso</button>
          </div>
        </form>
      )}

      {phase !== "edit" && (
        <div className={styles.review} ref={reviewRef} tabIndex={-1} aria-labelledby="notice-review-title">
          <h3 id="notice-review-title">Revisa tu aviso antes de enviarlo</h3>
          <dl>
            <div><dt>Contacto</dt><dd>{values.contactName} · {values.contactEmail}</dd></div>
            <div><dt>Monto</dt><dd>{usd(normalizeAmount(values.amount))}</dd></div>
            <div><dt>Fecha</dt><dd>{values.transferDate}</dd></div>
            <div><dt>Referencia</dt><dd>{values.hasReference ? values.bankReference : `Sin referencia: ${values.missingReferenceReason}`}</dd></div>
            <div><dt>Destino</dt><dd>{values.destination ? destinationLabels[values.destination] ?? values.destination : "Uso flexible"}</dd></div>
            <div><dt>Comprobante</dt><dd>{file?.name}</dd></div>
            <div><dt>Reconocimiento</dt><dd>{values.recognitionConsent ? `Sí, como «${values.publicName}»${values.publicAmountConsent ? ", con monto" : ", sin monto"}` : "No (anónimo)"}</dd></div>
          </dl>

          {failure && (
            <div className={styles.summary} role="alert">
              <strong>{failure.message}</strong>
            </div>
          )}

          <div aria-live="polite" className={styles.progressArea}>
            {phase === "uploading" && (
              <>
                <span>Subiendo comprobante… {progress} %</span>
                <progress max={100} value={progress} aria-label="Progreso de la subida" />
              </>
            )}
            {phase === "processing" && <span>Procesando: guardando el comprobante de forma privada…</span>}
          </div>

          <div className={styles.actions}>
            <button type="button" className="button button-primary" onClick={send} disabled={busy} aria-disabled={busy}>
              {failure?.retryable ? "Reintentar envío" : "Enviar aviso de aporte"}
            </button>
            <button type="button" className="button button-secondary" onClick={() => setPhase("edit")} disabled={busy}>
              Corregir datos
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
