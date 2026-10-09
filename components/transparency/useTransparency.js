"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { campaignApi } from "../../content/campaign";

/** Último corte válido de esta visita (solo en memoria): permite decir desde cuándo no hay datos. */
let lastValid = null;

async function getJson(url, signal) {
  const response = await fetch(url, { signal, credentials: "omit", cache: "no-cache", headers: { Accept: "application/json" } });
  const body = await response.json().catch(() => null);
  if (response.ok) return body;
  const error = new Error(String(response.status));
  error.notPublished = response.status === 404 && body?.code === "CAMPAIGN_NOT_PUBLISHED";
  throw error;
}

const queryString = (query) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) if (value) params.set(key, String(value));
  const text = params.toString();
  return text ? `?${text}` : "";
};

/**
 * Lee la campaña (presupuesto, hito, totales) y la transparencia (gastos aprobados y
 * documentos) del mismo corte. Si la versión cambió entre ambas lecturas, se vuelve a leer
 * para no mezclar cortes.
 *
 * state: "loading" | "unconfigured" | "not-published" | "unavailable" | "ready"
 */
export function useTransparency(query) {
  const [result, setResult] = useState({ state: "loading", campaign: null, transparency: null, lastValid });
  const requestRef = useRef(0);

  const load = useCallback(() => {
    const base = campaignApi("");
    if (!base) {
      setResult({ state: "unconfigured", campaign: null, transparency: null, lastValid: null });
      return () => {};
    }
    const controller = new AbortController();
    const request = (requestRef.current += 1);
    setResult((current) => ({ ...current, state: "loading" }));

    (async () => {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const [campaign, transparency] = await Promise.all([
          getJson(base, controller.signal),
          getJson(campaignApi(`/transparency${queryString(query)}`), controller.signal),
        ]);
        if (campaign.publication.version === transparency.publication.version || attempt === 1) {
          return { campaign, transparency };
        }
      }
      return null;
    })()
      .then((data) => {
        if (request !== requestRef.current || !data) return;
        lastValid = { asOf: data.campaign.publication.asOf, version: data.campaign.publication.version };
        setResult({ state: "ready", ...data, lastValid });
      })
      .catch((error) => {
        if (error?.name === "AbortError" || request !== requestRef.current) return;
        setResult({ state: error.notPublished ? "not-published" : "unavailable", campaign: null, transparency: null, lastValid });
      });
    return () => controller.abort();
  }, [query]);

  useEffect(() => load(), [load]);

  return { ...result, retry: load };
}
